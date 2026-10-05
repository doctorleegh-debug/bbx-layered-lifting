/* R05 real-time 3D explanatory cutaway. Photo references sit alongside the
 * geometric contact study; this is neither an exact CAD model nor clinical simulation. */
window.createInmodeSkin=(view,skin,getTime,getMode)=>{
 'use strict';const T=window.THREE;if(!T)return null;let renderer;
 try{renderer=new T.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});}catch(_){return null;}
 renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.75));renderer.outputEncoding=T.sRGBEncoding;
 renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=.94;
 renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;renderer.setClearColor(0x000000,0);
 renderer.domElement.setAttribute('aria-hidden','true');view.prepend(renderer.domElement);
 const scene=new T.Scene(),camera=new T.OrthographicCamera(-3.8,3.8,3,-3,.1,70);
 camera.position.set(4.5,3.3,9.5);camera.lookAt(0,.72,0);
 const rgb=c=>new T.Color(c).convertSRGBToLinear();
 // Softboxes create genuine reflections on metal and glossy medical polymer.
 const studio=new T.Scene();studio.background=new T.Color(.17,.14,.15);
 for(const [x,y,z,w,h,power] of [[-4,5,3,5,6,3],[4,3,-1,3,5,2],[0,6,-5,8,3,2]]){
  const panel=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({color:new T.Color(power,power*.97,power*.94),side:T.DoubleSide}));panel.position.set(x,y,z);panel.lookAt(0,0,0);studio.add(panel);
 }
 const pmrem=new T.PMREMGenerator(renderer),environment=pmrem.fromScene(studio,.04);scene.environment=environment.texture;
 scene.add(new T.HemisphereLight(0xffefe6,0x9b7187,.32));
 const key=new T.DirectionalLight(0xfff6ed,1.25);key.position.set(-3,7,6);key.castShadow=true;key.shadow.mapSize.set(1024,1024);key.shadow.normalBias=.025;key.shadow.bias=-.0002;
 Object.assign(key.shadow.camera,{left:-5,right:5,top:5,bottom:-5,near:.1,far:20});scene.add(key);
 const fill=new T.DirectionalLight(0xf4d6e0,.38);fill.position.set(5,2,-4);scene.add(fill);
 const mat=(c,p={})=>new T.MeshPhysicalMaterial({color:rgb(c),roughness:.53,metalness:0,envMapIntensity:.22,...p});
 const skinMat=mat(0xdca285,{roughness:.62,clearcoat:.1}),dermisMat=mat(0xc67c84,{roughness:.64}),fatMat=mat(0xf2d29b,{roughness:.39,clearcoat:.15});
 const white=mat(0xf3f0eb,{roughness:.22,clearcoat:.65,envMapIntensity:1}),black=mat(0x19191e,{roughness:.27,clearcoat:.75,envMapIntensity:1.3}),metal=mat(0xc9c5c4,{metalness:.94,roughness:.19,envMapIntensity:1.5});
 const study=new T.Group();study.position.set(-.1,-.17,0);scene.add(study);
 const layers=[],warm=rgb(0xeeb080);let seed=9025;const rand=()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296};
 const surface=(x,z)=>.022*Math.sin(x*5.1+z*2.1)+.011*Math.sin(z*9.3-x*3.5);
 function layer(name,top,bottom,material){const vertices=[],indices=[],uvs=[];
  function grid(n,m,fn,flip=false){const base=vertices.length/3;for(let j=0;j<=m;j++)for(let i=0;i<=n;i++){vertices.push(...fn(i/n,j/m));uvs.push(i/n,j/m)}for(let j=0;j<m;j++)for(let i=0;i<n;i++){const a=base+j*(n+1)+i,b=a+1,c=a+n+1;indices.push(...(flip?[a,b,c,b,c+1,c]:[a,c,b,b,c,c+1]))}}
  grid(64,26,(u,v)=>{const x=(u-.5)*4.6,z=(v-.5)*2;return[x,top+surface(x,z),z]});
  grid(64,12,(u,v)=>{const x=(u-.5)*4.6;return[x,bottom+(top-bottom)*v+surface(x,1)*v,1]},true);
  grid(26,12,(u,v)=>[2.3,bottom+(top-bottom)*v+surface(2.3,(u-.5)*2)*v,(u-.5)*2]);
  grid(26,12,(u,v)=>[-2.3,bottom+(top-bottom)*v+surface(-2.3,(u-.5)*2)*v,(u-.5)*2],true);
  const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(vertices,3));geo.setAttribute('uv',new T.Float32BufferAttribute(uvs,2));geo.setIndex(indices);geo.computeVertexNormals();
  const colors=new Float32Array(vertices.length);for(let i=0;i<colors.length;i+=3){const shade=.93+rand()*.07;colors[i]=shade;colors[i+1]=shade;colors[i+2]=shade;}geo.setAttribute('color',new T.BufferAttribute(colors,3));material.vertexColors=true;material.side=T.DoubleSide;
  const mesh=new T.Mesh(geo,material);mesh.name=name;mesh.castShadow=true;mesh.receiveShadow=true;study.add(mesh);layers.push({mesh,base:Float32Array.from(vertices)});return mesh;
 }
 const tissue=document.createElement('canvas');tissue.width=tissue.height=512;const ctx=tissue.getContext('2d');
 if(ctx){const im=ctx.createImageData(512,512);for(let i=0;i<im.data.length;i+=4){const v=140+rand()*65;im.data[i]=im.data[i+1]=im.data[i+2]=v;im.data[i+3]=255;}ctx.putImageData(im,0,0);const tex=new T.CanvasTexture(tissue);tex.wrapS=tex.wrapT=T.RepeatWrapping;tex.repeat.set(3,2);skinMat.bumpMap=tex;skinMat.bumpScale=.018;dermisMat.bumpMap=tex;dermisMat.bumpScale=.025;}
 layer('epidermis',.66,.48,skinMat);layer('dermis',.477,-.4,dermisMat);layer('hypodermis',-.403,-1.15,fatMat);
 const dummy=new T.Object3D(),fat=new T.InstancedMesh(new T.SphereGeometry(1,24,16),mat(0xffffff,{roughness:.48,clearcoat:.12}),28);
 const fatColors=[0xe7bd7d,0xe6b778,0xdcac76,0xeccb8e];let k=0;
 for(let row=0;row<2;row++)for(let col=0;col<14;col++){
  dummy.position.set(-2.12+col*.317+(row%2)*.10,-.60-row*.32+(rand()-.5)*.09,1.018+rand()*.1);
  dummy.scale.set(.175+rand()*.065,.205+rand()*.055,.13+rand()*.06);dummy.rotation.set(rand(),rand(),rand());dummy.updateMatrix();fat.setMatrixAt(k,dummy.matrix);fat.setColorAt(k++,rgb(fatColors[Math.floor(rand()*4)]));
 }fat.castShadow=true;fat.receiveShadow=true;study.add(fat);
 // Curved, irregular collagen bundles are embedded in the front cut surface.
 const fiberGeometries=[],fiberMat=mat(0xf9d6ca,{roughness:.66,envMapIntensity:.25});
 for(let i=0;i<35;i++){const pts=[],phase=rand()*6.28,amp=.035+rand()*.035,base=-.38+rand()*.78,slope=(rand()-.5)*.2;
  for(let j=0;j<=28;j++){const x=-2.29+j*4.58/28;pts.push(new T.Vector3(x,Math.max(-.39,Math.min(.465,base+amp*Math.sin(x*4+phase)+slope*x)),1.011+.03*Math.sin(x*1.6+phase)));}
  fiberGeometries.push(new T.TubeGeometry(new T.CatmullRomCurve3(pts),60,.004+rand()*.004,4,false));
 }
 // One merged mesh avoids a separate draw call for every fibre.
 const pos=[],norm=[],ids=[];for(const g of fiberGeometries){const base=pos.length/3;pos.push(...g.attributes.position.array);norm.push(...g.attributes.normal.array);for(const ix of g.index.array)ids.push(ix+base);g.dispose()}
 const fg=new T.BufferGeometry();fg.setAttribute('position',new T.Float32BufferAttribute(pos,3));fg.setAttribute('normal',new T.Float32BufferAttribute(norm,3));fg.setIndex(ids);const fibers=new T.Mesh(fg,fiberMat);fibers.receiveShadow=true;study.add(fibers);
 function rounded(w,h,d,r,material){const s=new T.Shape(),x=-w/2,y=-h/2;s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);const g=new T.ExtrudeGeometry(s,{depth:d-r*2,bevelEnabled:true,bevelThickness:r,bevelSize:r*.65,bevelSegments:5,steps:1,curveSegments:8});g.translate(0,0,-d/2+r);const m=new T.Mesh(g,material);m.castShadow=m.receiveShadow=true;return m;}
 function put(parent,mesh,x,y,z){mesh.position.set(x,y,z);parent.add(mesh);return mesh;}
 const forma=new T.Group(),fx=new T.Group();study.add(forma,fx);
 // Contact geometry uses the manufacturer's black Forma tip and white MiniFX shell.
 put(forma,rounded(.82,.34,.65,.10,black),0,.25,0);
 for(const x of [-.29,.29])for(const z of [-.2,0,.2])put(forma,new T.Mesh(new T.SphereGeometry(.085,16,12),metal),x,.047,z);
 const fHandle=new T.Group();fHandle.rotation.z=-.32;forma.add(fHandle);
 put(fHandle,new T.Mesh(new T.CylinderGeometry(.13,.22,.47,32),black),0,.56,0);
 put(fHandle,new T.Mesh(new T.CylinderGeometry(.135,.135,1.08,32),metal),0,1.24,0);
 for(let j=0;j<15;j++){const ring=new T.Mesh(new T.TorusGeometry(.137,.01,4,28),metal);ring.rotation.x=Math.PI/2;put(fHandle,ring,0,.82+j*.025,0);}
 put(fHandle,new T.Mesh(new T.CylinderGeometry(.13,.14,.25,24),black),0,1.88,0);
 const cablePts=[new T.Vector3(0,2,0),new T.Vector3(.1,2.35,0),new T.Vector3(.55,2.63,-.08),new T.Vector3(1,2.73,-.12)];
 fHandle.add(new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(cablePts),24,.045,8),mat(0xc6c2c1)));
 put(fx,rounded(1.15,.8,1.1,.13,white),0,.96,-.05);
 put(fx,rounded(1.04,.17,.92,.085,black),0,.48,0);
 // Open-front cutaway chamber reveals the vacuum-drawn tissue between electrodes.
 for(const x of [-.46,.46])put(fx,rounded(.16,.35,.8,.045,metal),x,.18,0);
 put(fx,rounded(.76,.32,.08,.03,black),0,.2,-.38);
 const windowMat=mat(0xf5e9e8,{transparent:true,opacity:.12,depthWrite:false,roughness:.1});put(fx,rounded(.72,.29,.025,.008,windowMat),0,.22,.38);
 put(fx,rounded(.65,.2,.64,.07,white),0,1.41,-.06);
 const fxCable=[new T.Vector3(.25,1.2,-.55),new T.Vector3(.75,1.35,-.65),new T.Vector3(1.3,1.85,-.6),new T.Vector3(1.5,2.15,-.6)];fx.add(new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(fxCable),24,.045,8),black));
 // Replace procedural loading fallbacks with the photograph-derived meshes.
 const handpieceState={fx:'loading',forma:'loading'};
 function loadHandpiece(name,parent,rotation,scale,offsetZ){
  if(!T.GLTFLoader){handpieceState[name]='fallback';return;}
  new T.GLTFLoader().load('assets/'+(name==='fx'?'minifx':'forma')+'-3d.glb?v=equipment-r05',g=>{
   const holder=new T.Group(),object=g.scene;holder.add(object);object.rotation.set(...rotation);object.scale.setScalar(scale);holder.updateMatrixWorld(true);
   const box=new T.Box3().setFromObject(object);object.position.y=-box.min.y;object.position.z=offsetZ;
   object.traverse(o=>{if(o.isMesh){o.castShadow=o.receiveShadow=true;const mats=Array.isArray(o.material)?o.material:[o.material];mats.forEach(m=>{m.envMapIntensity=.35;m.metalness=.12;m.roughness=.48;});}});
   parent.children.forEach(c=>c.visible=false);parent.add(holder);handpieceState[name]='ready';skin.dataset.handpieces=JSON.stringify(handpieceState);draw(getTime(),getMode());
  },undefined,()=>{handpieceState[name]='fallback';skin.dataset.handpieces=JSON.stringify(handpieceState)});
 }
 loadHandpiece('fx',fx,[Math.PI/2,0,0],1.22,-.50);
 loadHandpiece('forma',forma,[0,0,Math.PI/2-.19],1.05,0);
 const field=new T.Group();study.add(field);const fieldMats=[],fieldDots=[];
 for(let i=0;i<6;i++){const pts=[],radius=.31+i*.095;for(let j=0;j<=40;j++){const a=j/40*Math.PI;pts.push(new T.Vector3(Math.cos(a)*radius,.45-Math.sin(a)*(.19+i*.13),1.14));}
  const m=new T.MeshBasicMaterial({color:rgb(i%2?0xd58c6c:0xa94369),toneMapped:false,transparent:true,opacity:0,depthWrite:false,depthTest:false});fieldMats.push(m);const arc=new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pts),40,.012,5,false),m);arc.renderOrder=12;field.add(arc);}
 for(let i=0;i<4;i++){const m=new T.MeshBasicMaterial({color:0xffedce,transparent:true,opacity:0,depthWrite:false});const dot=new T.Mesh(new T.SphereGeometry(.028,8,6),m);field.add(dot);fieldDots.push(dot);}
 const shadowCanvas=document.createElement('canvas');shadowCanvas.width=256;shadowCanvas.height=128;const sc=shadowCanvas.getContext('2d');
 if(sc){const gr=sc.createRadialGradient(128,64,2,128,64,100);gr.addColorStop(0,'rgba(104,57,70,.32)');gr.addColorStop(1,'rgba(104,57,70,0)');sc.fillStyle=gr;sc.fillRect(0,0,256,128);const sm=new T.Mesh(new T.PlaneGeometry(6,3.6),new T.MeshBasicMaterial({map:new T.CanvasTexture(shadowCanvas),transparent:true,depthWrite:false}));sm.rotation.x=-Math.PI/2;sm.position.y=-1.36;study.add(sm);}
 const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)),ease=x=>{x=clamp(x);return x*x*(3-2*x)},r=(t,a,b)=>ease((t-a)/(b-a));
 const projected=new T.Vector3(),tags=[...view.querySelectorAll('[data-layer]')];
 function pin(el,x,y,z){projected.set(x,y,z);study.localToWorld(projected);projected.project(camera);const w=view.clientWidth,h=view.clientHeight;el.style.left=clamp((projected.x*.5+.5)*w,8,w-el.offsetWidth-8)+'px';el.style.top=clamp((-.5*projected.y+.5)*h-8,8,h-el.offsetHeight-8)+'px';}
 function resize(){const w=view.clientWidth,h=view.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);const width=w<400?6.6:6.8,height=width*h/w;camera.left=-width/2;camera.right=width/2;camera.top=height/2;camera.bottom=-height/2;camera.updateProjectionMatrix();}
 function draw(t,mode){const mini=mode==='fx',contact=r(t,.25,1.55)*(1-r(t,7.9,9.2)),heat=r(t,1.8,2.7)*(1-r(t,6.6,8.1)),vac=mini?r(t,1.25,2.5)*(1-r(t,7.1,8.7)):0,x=mini?-.24:-.7+1.15*r(t,1.7,6.7);
  forma.visible=!mini;fx.visible=mini;const head=mini?fx:forma;head.position.set(x,.68+(1-contact)*.5,.28);field.position.x=x;
  for(const l of layers){const a=l.mesh.geometry.attributes.position,c=l.mesh.geometry.attributes.color;for(let i=0;i<a.count;i++){const px=l.base[i*3],y=l.base[i*3+1],z=l.base[i*3+2];const zone=Math.exp(-((px-x)**2/.23+(z-.28)**2/.26));a.array[i*3+1]=y+vac*.25*zone*clamp((y+.4)/1.06);const q=heat*Math.exp(-((px-x)**2/.45+(z-.5)**2/1.6))*clamp((y+.6)/1.3);c.array[i*3]=1;c.array[i*3+1]=1-q*.24;c.array[i*3+2]=1-q*.26;}a.needsUpdate=c.needsUpdate=true;l.mesh.geometry.computeVertexNormals();}
  fieldMats.forEach((m,i)=>m.opacity=heat*(.38+.4*(.5+.5*Math.sin(t*2.7-i*.48))));fieldDots.forEach((dot,i)=>{const q=((t*.24+i/4)%1)*Math.PI;dot.position.set(Math.cos(q)*.7,.45-Math.sin(q)*.73,1.155);dot.material.opacity=heat*.95;});
  study.rotation.y=-.05+.018*Math.sin(t*Math.PI*2/9.6);scene.updateMatrixWorld(true);camera.updateMatrixWorld(true);pin(tags[0],2.29,.53,.95);pin(tags[1],2.31,.02,1.02);pin(tags[2],2.30,-.84,1.08);renderer.render(scene,camera);
 }
 resize();let ro;if('ResizeObserver'in window){ro=new ResizeObserver(()=>{resize();draw(getTime(),getMode())});ro.observe(view);}const onResize=()=>{resize();draw(getTime(),getMode())};if(!ro)window.addEventListener('resize',onResize);
 renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();skin.dataset.ready='false';skin.dataset.unavailable='true';skin.dataset.userPaused='true';skin.dispatchEvent(new CustomEvent('inmode:playback'));});
 renderer.domElement.addEventListener('webglcontextrestored',()=>{skin.dataset.ready='true';delete skin.dataset.unavailable;draw(getTime(),getMode());});
 skin.dataset.ready='true';return{draw,resize,scene,renderer,dispose(){ro?.disconnect();window.removeEventListener('resize',onResize);scene.traverse(o=>{o.geometry?.dispose();if(o.material){const list=Array.isArray(o.material)?o.material:[o.material];list.forEach(m=>{m.map?.dispose();m.bumpMap?.dispose();m.dispose()})}});environment.dispose();pmrem.dispose();renderer.dispose()}};
};
