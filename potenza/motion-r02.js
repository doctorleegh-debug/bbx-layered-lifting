/* Layered medical illustration + animated 3D cartridge. Concept only, no clinical dimensions. */
(()=>{'use strict';
const art=document.querySelector('.pt-science-art'),host=art?.querySelector('.pt-scene-canvas'),T=window.THREE;if(!art||!host||!T)return;
let renderer,resizeObserver,disposed=false;
function fallback(){art.dataset.renderer='fallback';art.dataset.running='false';art.dispatchEvent(new Event('pt-renderer-failed'));}
try{
renderer=new T.WebGLRenderer({antialias:true,alpha:false,powerPreference:'low-power'});renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));renderer.outputEncoding=T.sRGBEncoding;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=.82;renderer.setClearColor(0x292226);host.append(renderer.domElement);
const scene=new T.Scene(),camera=new T.OrthographicCamera(-3,3,2,-2,.1,40);camera.position.set(0,0,10);camera.lookAt(0,0,0);
// A photographic tissue plate keeps microscopic texture in the illustration.
const loader=new T.TextureLoader();let ready=false,loaded=0;let lastState=[0,1,0];
function assetReady(){if(++loaded<2)return;ready=true;art.dataset.renderer='webgl';art.dispatchEvent(new Event('pt-renderer-ready'));render(...lastState);}
loader.load('assets/skin-plate-r02.webp',texture=>{if(disposed){texture.dispose();return;}texture.encoding=T.sRGBEncoding;const plate=new T.Mesh(new T.PlaneGeometry(6,4),new T.MeshBasicMaterial({map:texture,toneMapped:false}));plate.position.z=-1.8;scene.add(plate);assetReady();},undefined,fallback);
// Studio light cards produce restrained, real reflections in the metal and acrylic.
const envScene=new T.Scene();envScene.background=new T.Color(0x221c19);
for(const [x,y,z,w,h,power] of [[-4,2,2,2,6,1.1],[4,1,3,1.3,5,.7],[0,6,0,6,2,.8]]){const card=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({color:new T.Color(power,power*.95,power*.9)}));card.position.set(x,y,z);card.lookAt(0,0,0);envScene.add(card);}
const pmrem=new T.PMREMGenerator(renderer),env=pmrem.fromScene(envScene,.05);scene.environment=env.texture;pmrem.dispose();envScene.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});
scene.add(new T.HemisphereLight(0xfff5e7,0x795f66,.35));const key=new T.DirectionalLight(0xfff6e6,1.1);key.position.set(-5,3,3);scene.add(key);const rim=new T.DirectionalLight(0xffffff,.55);rim.position.set(4,3,2);scene.add(rim);
const head=new T.Group();head.position.set(-.13,.30,1.0);scene.add(head);
// Reference-rendered transparent cartridge plane retains brushed metal and optical detail.
loader.load('assets/tip-r02.webp',texture=>{if(disposed){texture.dispose();return;}texture.encoding=T.sRGBEncoding;const tip=new T.Mesh(new T.PlaneGeometry(1.7,2.55),new T.MeshBasicMaterial({map:texture,transparent:true,alphaTest:.005,depthWrite:false,toneMapped:false}));tip.position.set(0,.70,.4);head.add(tip);assetReady();},undefined,fallback);
const needles=new T.Group();needles.position.y=.025;head.add(needles);const needleMetal=new T.MeshStandardMaterial({color:0xe1bd70,metalness:.85,roughness:.25});
for(let row=0;row<3;row++)for(let col=0;col<5;col++){const x=(col-2)*.145,z=(row-1)*.14;const shaft=new T.Mesh(new T.CylinderGeometry(.011,.008,.56,8),needleMetal);shaft.position.set(x,-.28,z);needles.add(shaft);const tip=new T.Mesh(new T.ConeGeometry(.009,.12,8),needleMetal);tip.rotation.z=Math.PI;tip.position.set(x,-.62,z);needles.add(tip);}
// Localized warm pulses illustrate RF energy; not an anatomical measurement.
const glowMaterial=new T.ShaderMaterial({transparent:true,depthWrite:false,blending:T.AdditiveBlending,uniforms:{power:{value:0},time:{value:0}},vertexShader:'varying vec2 uvp;void main(){uvp=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',fragmentShader:'varying vec2 uvp;uniform float power;uniform float time;void main(){vec2 p=(uvp-.5)*2.;float d=length(p);float core=exp(-d*d*6.);float ring=exp(-pow((d-mod(time*.24,1.))*12.,2.))*.16;float a=(core+ring)*(1.-smoothstep(.65,1.,d))*power;gl_FragColor=vec4(1.,.38,.09,a);}' });
const glowGroup=new T.Group();glowGroup.position.set(-.13,-.26,1.3);scene.add(glowGroup);
for(let i=0;i<5;i++){const glow=new T.Mesh(new T.PlaneGeometry(.52,.75),glowMaterial);glow.position.x=(i-2)*.145;glowGroup.add(glow);}
const ease=t=>{t=Math.max(0,Math.min(1,t));return t*t*(3-2*t);};
function render(step,progress,time){lastState=[step,progress,time];if(disposed||!ready||art.dataset.renderer!=='webgl')return;
 const t=ease(progress*2.5);head.position.y=step===0?.30+(1-t)*.28:.30;needles.scale.y=step===0?.025:step===1?.025+t*.975:1;
 glowMaterial.uniforms.power.value=step===2?ease(progress*3)*(.55+Math.sin(time*2.1)*.12):0;glowMaterial.uniforms.time.value=time;
 renderer.render(scene,camera);art.dataset.renderStep=String(step);art.dataset.needleExtension=needles.scale.y.toFixed(3);art.dataset.energy=glowMaterial.uniforms.power.value.toFixed(3);
}
art._ptRender=render;
function resize(){if(disposed)return;const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);render(...lastState);}
resizeObserver=new ResizeObserver(resize);resizeObserver.observe(host);resize();
renderer.domElement.addEventListener('webglcontextlost',event=>{event.preventDefault();fallback();});
renderer.domElement.addEventListener('webglcontextrestored',()=>{if(ready){art.dataset.renderer='webgl';art.dispatchEvent(new Event('pt-renderer-ready'));resize();}});
window.addEventListener('pagehide',e=>{if(e.persisted)return;disposed=true;resizeObserver.disconnect();scene.traverse(o=>{o.geometry?.dispose();if(o.material){for(const m of Array.isArray(o.material)?o.material:[o.material]){m.map?.dispose();m.dispose();}}});env.dispose();renderer.dispose();delete art._ptRender;},{once:true});
}catch{resizeObserver?.disconnect();renderer?.dispose();fallback();}
})();
