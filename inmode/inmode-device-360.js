/* Actual GLB turntable. One lazy model request; photo fallback remains until a frame renders. */
(()=>{'use strict';const root=document.getElementById('bb-inmode'),host=root?.querySelector('.im-equipment-hero');if(!host)return;
const reduced=matchMedia('(prefers-reduced-motion: reduce)'),connection=navigator.connection,view=host.querySelector('.im-device-viewport'),toggle=host.querySelector('.im-device-rotate');
let renderer,scene,camera,pivot,model,ready=false,loading=false,failed=false,visible=false,paused=reduced.matches||!!connection?.saveData,raf=0,last=0,angle=0,tilt=0,drag=null,destroyed=false;
const allowed=()=>!destroyed&&!document.hidden&&!reduced.matches&&!connection?.saveData;
function draw(){if(!ready||!renderer)return;pivot.rotation.y=angle;pivot.rotation.x=tilt;renderer.render(scene,camera);}
function resize(){if(!renderer)return;const w=view.clientWidth,h=view.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();draw();}
function tick(now){raf=0;const dt=last?Math.min((now-last)/1000,.05):0;last=now;if(ready&&visible&&allowed()&&!paused&&!drag){angle=(angle+dt*Math.PI*2/32)%(Math.PI*2);draw();raf=requestAnimationFrame(tick);}else last=0;}
function wake(){if(!raf&&ready&&visible&&allowed()&&!paused&&!drag){last=0;raf=requestAnimationFrame(tick);}if(!allowed()||!visible||paused){cancelAnimationFrame(raf);raf=0;last=0;}toggle.setAttribute('aria-pressed',String(paused));toggle.textContent=paused?'자동 회전 재생':'자동 회전 정지';}
function fail(){ready=false;loading=false;failed=true;host.dataset.deviceReady='false';host.dataset.deviceError='true';toggle.hidden=true;host.querySelector('.im-device-reset').hidden=true;host.querySelector('.im-device-hint').textContent='인모드 장비 사진';cancelAnimationFrame(raf);raf=0;renderer?.dispose();renderer?.domElement.remove();renderer=null;}
function init(){if(loading||ready||failed)return;loading=true;const T=window.THREE;if(!T?.GLTFLoader)return fail();
 try{renderer=new T.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});}catch(_){return fail()}
 renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.7));renderer.outputEncoding=T.sRGBEncoding;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=.88;renderer.setClearColor(0x000000,0);renderer.domElement.setAttribute('aria-hidden','true');view.append(renderer.domElement);
 scene=new T.Scene();camera=new T.PerspectiveCamera(29,1,.1,50);camera.position.set(0,3.45,7.1);camera.lookAt(0,1.52,0);pivot=new T.Group();pivot.position.y=.16;scene.add(pivot);
 scene.add(new T.HemisphereLight(0xfffaf6,0xb47c97,.8));
 for(const [x,y,z,intensity,color] of [[-4,6,5,.9,0xffffff],[4,3,1,.4,0xffe4eb],[0,5,-4,.7,0xffffff]]){const light=new T.DirectionalLight(color,intensity);light.position.set(x,y,z);scene.add(light);}
 const studio=new T.Scene();studio.background=new T.Color(.22,.22,.22);for(const [x,y,z,w,h] of [[-3,3,2,3,5],[3,2,-2,2,5],[0,5,0,5,5]]){const box=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({color:new T.Color(2,2,2),side:T.DoubleSide}));box.position.set(x,y,z);box.lookAt(0,1,0);studio.add(box)}
 const pmrem=new T.PMREMGenerator(renderer);const env=pmrem.fromScene(studio,.04);scene.environment=env.texture;pmrem.dispose();
 new T.GLTFLoader().load('assets/device-360.glb?v=equipment-r05',gltf=>{if(failed)return;model=gltf.scene;loading=false;const bounds=new T.Box3().setFromObject(model),size=bounds.getSize(new T.Vector3()),center=bounds.getCenter(new T.Vector3());if(!Number.isFinite(size.y)||size.y<=0)return fail();
 const scale=2.8/size.y;model.scale.setScalar(scale);model.position.set(-center.x*scale,-bounds.min.y*scale,-center.z*scale);model.traverse(o=>{if(o.isMesh){o.frustumCulled=false;const mats=Array.isArray(o.material)?o.material:[o.material];mats.forEach(m=>{m.envMapIntensity=.1;m.metalness=.03;m.roughness=.6;m.normalMap=null;m.emissive.set(0);m.emissiveMap=null;m.metalnessMap=null;m.roughnessMap=null;m.needsUpdate=true;})}});pivot.add(model);ready=true;resize();draw();host.dataset.deviceReady='true';delete host.dataset.deviceError;toggle.hidden=false;host.querySelector('.im-device-hint').textContent='드래그해서 360° 살펴보기';wake();
 },undefined,fail);
 renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();fail()});
 if('ResizeObserver'in window)new ResizeObserver(resize).observe(view);else window.addEventListener('resize',resize);resize();
}
view.addEventListener('pointerdown',e=>{if(!ready||e.button>0)return;drag={id:e.pointerId,x:e.clientX,y:e.clientY,angle,tilt};view.setPointerCapture(e.pointerId);cancelAnimationFrame(raf);raf=0;view.classList.add('is-dragging');});
view.addEventListener('pointermove',e=>{if(!drag||drag.id!==e.pointerId)return;angle=drag.angle+(e.clientX-drag.x)*.012;tilt=Math.max(-.15,Math.min(.15,drag.tilt+(e.clientY-drag.y)*.0015));draw();});
function endDrag(e){if(!drag||drag.id!==e.pointerId)return;drag=null;view.classList.remove('is-dragging');paused=true;wake();}view.addEventListener('pointerup',endDrag);view.addEventListener('pointercancel',endDrag);view.addEventListener('lostpointercapture',endDrag);
view.addEventListener('keydown',e=>{if(!ready)return;if(['ArrowLeft','ArrowRight','Home'].includes(e.key)){e.preventDefault();paused=true;angle=e.key==='Home'?0:angle+(e.key==='ArrowLeft'?-.22:.22);tilt=0;draw();wake();}});
toggle.addEventListener('click',()=>{paused=!paused;wake()});host.querySelector('.im-device-reset').addEventListener('click',()=>{angle=tilt=0;paused=true;draw();wake()});
function policy(){if(reduced.matches||connection?.saveData){paused=true;}wake();}reduced.addEventListener('change',policy);connection?.addEventListener?.('change',policy);document.addEventListener('visibilitychange',wake);
if('IntersectionObserver'in window){new IntersectionObserver(es=>{visible=es.some(e=>e.isIntersecting);if(visible)init();wake()},{threshold:.08}).observe(host)}else{visible=true;init();}
window.addEventListener('pagehide',()=>{destroyed=true;cancelAnimationFrame(raf);raf=0;});window.addEventListener('pageshow',()=>{destroyed=false;wake()});
window.__inmodeDevice={state:()=>({ready,loading,angle,paused,visible,raf:!!raf,triangles:renderer?.info.render.triangles}),seek(degrees){if(!Number.isFinite(Number(degrees)))return;paused=true;angle=Number(degrees)*Math.PI/180;draw();wake()}};
})();
