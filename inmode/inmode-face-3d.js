/* A textured portrait mesh. Every region vertex is projected onto that mesh once,
   then shares its transform: the markings stay on the face through all views. */
(()=>{'use strict';
const host=document.querySelector('#bb-inmode .im-face-3d');if(!host)return;
const view=host.querySelector('.im-face-viewport'),reset=host.querySelector('.im-face-reset'),hint=host.querySelector('.im-face-view-tools span');
const reduced=matchMedia('(prefers-reduced-motion: reduce)'),connection=navigator.connection;
let T,renderer,scene,camera,pivot,model,regions={},ready=false,loading=false,failed=false,visible=false,raf=0,destroyed=false,drag=null,yaw=0,pitch=0,transition=null,selected=host.dataset.area;
let anchorCount=0,misses=0,maxOffset=0;
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n)),moving=()=>!reduced.matches&&!connection?.saveData&&!document.hidden&&!destroyed;
function draw(){if(!ready)return;pivot.rotation.set(pitch,yaw,0);renderer.render(scene,camera);}
function resize(){if(!renderer)return;const w=view.clientWidth,h=view.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);const height=Math.max(2.55,2.12/(w/h));camera.left=-height*w/h/2;camera.right=-camera.left;camera.top=height/2;camera.bottom=-height/2;camera.updateProjectionMatrix();draw();}
function stop(){cancelAnimationFrame(raf);raf=0;transition=null;}
function tick(now){raf=0;if(!transition||!ready)return;if(!visible||!moving()){yaw=transition.yaw;pitch=transition.pitch;transition=null;draw();return;}const t=clamp((now-transition.start)/850,0,1),k=1-Math.pow(1-t,3);yaw=transition.fromYaw+(transition.yaw-transition.fromYaw)*k;pitch=transition.fromPitch+(transition.pitch-transition.fromPitch)*k;draw();if(t<1)raf=requestAnimationFrame(tick);else transition=null;}
function toAngle(y,p,animate=true){stop();if(!animate||!visible||!moving()){yaw=y;pitch=p;draw();return;}transition={start:performance.now(),fromYaw:yaw,fromPitch:pitch,yaw:y,pitch:p};raf=requestAnimationFrame(tick);}
function choose(area,animate=true){selected=regions[area]?area:'chin';Object.entries(regions).forEach(([key,g])=>g.visible=key===selected);host.dataset.faceRegion=selected;const angles={chin:[-.07,-.075],jaw:[.10,0],firm:[-.08,0]};toAngle(...angles[selected],animate);}
function fail(){failed=true;ready=false;loading=false;stop();host.dataset.faceReady='false';host.dataset.faceError='true';reset.hidden=true;hint.textContent='상담 부위는 우측 항목에서 확인해 주세요';renderer?.dispose();renderer?.domElement.remove();renderer=null;}
function makeRegions(data){
 anchorCount=data.stats.anchors;misses=data.stats.misses;maxOffset=data.stats.max_offset;
 for(const [name,polygons]of Object.entries(data.regions)){
  const group=new T.Group();group.name='region-'+name;group.visible=false;
  for(const polygon of polygons){
   const geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.Float32BufferAttribute(polygon.positions,3));geometry.computeVertexNormals();
   const patch=new T.Mesh(geometry,new T.MeshBasicMaterial({color:0xbb6887,transparent:true,opacity:name==='chin'?.22:.16,depthWrite:false,side:T.DoubleSide,polygonOffset:true,polygonOffsetFactor:-1}));patch.renderOrder=1;group.add(patch);
   const outline=polygon.outline.map(p=>new T.Vector3(...p));outline.push(outline[0].clone());const path=new T.CatmullRomCurve3(outline,false,'centripetal');
   const line=new T.Mesh(new T.TubeGeometry(path,outline.length*2,.0027,5,false),new T.MeshBasicMaterial({color:0xfff7ee,transparent:true,opacity:.94,depthWrite:false}));line.renderOrder=2;group.add(line);
  }
  pivot.add(group);regions[name]=group;
 }
}
function init(){if(loading||ready||failed)return;loading=true;T=window.THREE;if(!T?.GLTFLoader)return fail();
 try{renderer=new T.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});}catch(_){return fail();}
 renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.7));renderer.outputEncoding=T.sRGBEncoding;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=.90;renderer.setClearColor(0,0);renderer.domElement.setAttribute('aria-hidden','true');view.append(renderer.domElement);
 scene=new T.Scene();camera=new T.OrthographicCamera(-1,1,1.4,-1.4,.1,30);camera.position.set(0,2.55,6);camera.lookAt(0,2.32,0);pivot=new T.Group();pivot.position.y=2.2;scene.add(pivot);
 scene.add(new T.HemisphereLight(0xfffaf6,0xa78c91,.72));for(const[x,y,z,p]of[[-3,5,5,.85],[4,3,3,.30],[1,5,-3,.45]]){const l=new T.DirectionalLight(0xffffff,p);l.position.set(x,y,z);scene.add(l);}
 Promise.all([new Promise((resolve,reject)=>new T.GLTFLoader().load('assets/face-portrait.glb?v=face-r06-final',resolve,undefined,reject)),fetch('assets/face-regions.json?v=face-r06-final').then(r=>{if(!r.ok)throw new Error('Face regions unavailable');return r.json();})]).then(([gltf,data])=>{if(failed)return;model=gltf.scene;model.position.y-=2.2;model.traverse(o=>{if(o.isMesh){o.frustumCulled=false;if(o.material.map){o.material.map.minFilter=T.LinearFilter;o.material.map.generateMipmaps=false;o.material.map.anisotropy=4;o.material.map.needsUpdate=true;}o.material.roughness=.85;o.material.metalness=0;o.material.roughnessMap=null;o.material.normalScale?.set(.45,.45);o.material.envMapIntensity=0;}});pivot.add(model);scene.updateMatrixWorld(true);makeRegions(data);loading=false;ready=true;resize();choose(host.dataset.area,false);host.dataset.faceReady='true';delete host.dataset.faceError;reset.hidden=false;}).catch(fail);
 renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();fail();});
 if('ResizeObserver'in window)new ResizeObserver(resize).observe(view);else addEventListener('resize',resize);resize();
}
host.addEventListener('inmode:area',()=>{if(ready)choose(host.dataset.area);});
view.addEventListener('pointerdown',e=>{if(!ready||e.button>0)return;stop();drag={id:e.pointerId,x:e.clientX,y:e.clientY,yaw,pitch};view.setPointerCapture(e.pointerId);view.classList.add('is-dragging');});
view.addEventListener('pointermove',e=>{if(!drag||e.pointerId!==drag.id)return;yaw=clamp(drag.yaw+(e.clientX-drag.x)*.006,-.40,.40);pitch=clamp(drag.pitch+(e.clientY-drag.y)*.002,-.10,.10);draw();});
function end(e){if(!drag||e.pointerId!==drag.id)return;drag=null;view.classList.remove('is-dragging');}['pointerup','pointercancel','lostpointercapture'].forEach(n=>view.addEventListener(n,end));
view.addEventListener('keydown',e=>{if(!ready||!['ArrowLeft','ArrowRight','Home'].includes(e.key))return;e.preventDefault();toAngle(e.key==='Home'?0:clamp(yaw+(e.key==='ArrowLeft'?-.10:.10),-.40,.40),0,false);});
reset.addEventListener('click',()=>toAngle(0,0));
function policy(){if(!moving()&&transition)toAngle(transition.yaw,transition.pitch,false);}reduced.addEventListener('change',policy);connection?.addEventListener?.('change',policy);document.addEventListener('visibilitychange',policy);
if('IntersectionObserver'in window)new IntersectionObserver(es=>{visible=es.some(e=>e.isIntersecting);if(visible)init();else if(transition)toAngle(transition.yaw,transition.pitch,false);},{threshold:.06}).observe(host);else{visible=true;init();}
addEventListener('pagehide',()=>{destroyed=true;stop();});addEventListener('pageshow',()=>{destroyed=false;draw();});
window.__inmodeFace={state:()=>({ready,loading,failed,selected,yaw,pitch,visible,raf:!!raf,anchorCount,misses,maxOffset,triangles:renderer?.info.render.triangles,regions:Object.keys(regions)}),seek(degrees){if(!Number.isFinite(Number(degrees)))return;toAngle(clamp(Number(degrees)*Math.PI/180,-.4,.4),0,false);}};
})();
