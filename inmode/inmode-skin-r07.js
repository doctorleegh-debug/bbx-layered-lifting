/* Detailed tissue mesh and photographic handpieces in a shared three-dimensional scene. */
window.createInmodeSkin=(view,skin,getTime,getMode)=>{
 'use strict';const T=window.THREE;if(!T?.GLTFLoader)return null;let renderer;
 try{renderer=new T.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'})}catch(_){return null}
 renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.6));renderer.outputEncoding=T.sRGBEncoding;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=.86;renderer.setClearColor(0,0);renderer.domElement.setAttribute('aria-hidden','true');view.prepend(renderer.domElement);
 const scene=new T.Scene(),camera=new T.OrthographicCamera(-4,4,3,-3,.1,50),study=new T.Group();scene.add(study);camera.position.set(4.2,3.9,7);camera.lookAt(0,.6,0);
 scene.add(new T.HemisphereLight(0xfffaf7,0x9e7a77,.55));for(const[x,y,z,p]of[[-3,6,5,.90],[4,2,3,.22],[0,5,-4,.28]]){const l=new T.DirectionalLight(0xfffaf6,p);l.position.set(x,y,z);scene.add(l)}
 const fx=new T.Group(),forma=new T.Group();study.add(fx,forma);let disposed=false,lost=false;const status={fx:'loading',forma:'loading',tissue:'loading'},uniforms=[];
 const loader=new T.GLTFLoader(),tags=[...view.querySelectorAll('[data-layer]')],point=new T.Vector3();
 function ready(){skin.dataset.handpieces=JSON.stringify({fx:status.fx,forma:status.forma});skin.dataset.tissue=status.tissue;skin.dataset.ready=String(status.tissue==='ready'&&!lost);draw(getTime(),getMode())}
 loader.load('assets/skin-tissue-r07.glb',g=>{
  if(disposed)return;g.scene.traverse(o=>{if(!o.isMesh)return;o.frustumCulled=false;const m=o.material;m.metalness=0;m.roughness=.72;m.normalScale?.set(.55,.55);if(m.map)m.map.anisotropy=Math.min(renderer.capabilities.getMaxAnisotropy(),8);
   const u={heat:{value:0},center:{value:0}};uniforms.push(u);
   m.onBeforeCompile=shader=>{shader.uniforms.rfHeat=u.heat;shader.uniforms.rfCenter=u.center;shader.vertexShader='varying vec3 tissuePosition;\n'+shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\ntissuePosition = position;');shader.fragmentShader='uniform float rfHeat;uniform float rfCenter;varying vec3 tissuePosition;\n'+shader.fragmentShader.replace('#include <dithering_fragment>','float field=exp(-pow((tissuePosition.x-rfCenter)*1.7,2.0)-pow((tissuePosition.y-.1)*1.2,2.0));gl_FragColor.rgb+=vec3(.14,.033,.009)*field*rfHeat;\n#include <dithering_fragment>');};
  });study.add(g.scene);status.tissue='ready';ready();
 },undefined,()=>{status.tissue='failed';skin.dataset.unavailable='true';ready();skin.dispatchEvent(new CustomEvent('inmode:playback'))});
 function handpiece(name,parent,rotation,scale,z){loader.load('assets/'+(name==='fx'?'minifx':'forma')+'-3d.glb?v=equipment-r05',g=>{
  if(disposed)return;const object=g.scene;object.rotation.set(...rotation);object.scale.setScalar(scale);object.updateMatrixWorld(true);const box=new T.Box3().setFromObject(object);object.position.y=-box.min.y;object.position.z=z;object.traverse(o=>{if(o.isMesh){o.material.roughness=.49;o.material.metalness=.12}});parent.add(object);status[name]='ready';ready();
 },undefined,()=>{status[name]='failed';ready()})}
 handpiece('fx',fx,[Math.PI/2,0,0],1.10,-.45);handpiece('forma',forma,[0,0,Math.PI/2-.19],.92,0);
 const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)),ease=x=>{x=clamp(x);return x*x*(3-2*x)},range=(t,a,b)=>ease((t-a)/(b-a));
 function pin(el,x,y,z){point.set(x,y,z);study.localToWorld(point);point.project(camera);el.style.left=clamp((point.x*.5+.5)*view.clientWidth,6,view.clientWidth-el.offsetWidth-6)+'px';el.style.top=clamp((.5-point.y*.5)*view.clientHeight,6,view.clientHeight-el.offsetHeight-6)+'px'}
 function draw(t,mode){if(disposed||lost)return;const mini=mode==='fx',contact=range(t,.25,1.55)*(1-range(t,7.9,9.2)),heat=range(t,1.8,2.7)*(1-range(t,6.6,8.1)),x=mini?-.20:-.7+1.1*range(t,1.7,6.7);
  fx.visible=mini&&status.fx==='ready';forma.visible=!mini&&status.forma==='ready';(mini?fx:forma).position.set(x,1.23+(1-contact)*.55,.24);
  uniforms.forEach(u=>{u.heat.value=heat*(.88+.12*Math.sin(t*2));u.center.value=x});study.rotation.y=-.08+.025*Math.sin(t*Math.PI*2/9.6);scene.updateMatrixWorld(true);camera.updateMatrixWorld(true);pin(tags[0],1.95,1.03,.65);pin(tags[1],1.99,.15,.95);pin(tags[2],1.95,-.78,1.10);renderer.render(scene,camera);
 }
 function resize(){const w=view.clientWidth,h=view.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);const width=7.7,height=width*h/w;camera.left=-width/2;camera.right=width/2;camera.top=height/2;camera.bottom=-height/2;camera.updateProjectionMatrix()}
 const onResize=()=>{resize();draw(getTime(),getMode())};let ro;if('ResizeObserver'in window){ro=new ResizeObserver(onResize);ro.observe(view)}else addEventListener('resize',onResize);
 renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();lost=true;skin.dataset.ready='false';skin.dataset.unavailable='true';skin.dispatchEvent(new CustomEvent('inmode:playback'))});renderer.domElement.addEventListener('webglcontextrestored',()=>{lost=false;delete skin.dataset.unavailable;ready()});resize();
 return{draw,resize,scene,renderer,dispose(){disposed=true;ro?.disconnect();removeEventListener('resize',onResize);scene.traverse(o=>{o.geometry?.dispose();o.material?.dispose()});renderer.dispose()}};
};
