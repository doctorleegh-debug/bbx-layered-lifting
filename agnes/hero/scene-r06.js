import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

// One deterministic, eleven-second shot. Procedural geometry, no remote assets.
const DURATION = 11;
const clamp = THREE.MathUtils.clamp;
const mix = THREE.MathUtils.lerp;
const ramp = (a, b, t) => { const x = clamp((t - a) / (b - a), 0, 1); return x * x * (3 - 2 * x); };
const appear = (t, a, b, c, d) => ramp(a, b, t) * (1 - ramp(c, d, t));

function mount(stage) {
  if (stage.dataset.mounted) return;
  stage.dataset.mounted = 'true';
  const host = stage.querySelector('.ag-motion-canvas');
  const button = stage.querySelector('.ag-hero-toggle');
  const bar = stage.querySelector('.ag-motion-progress span');
  const number = stage.querySelector('[data-motion-number]');
  const title = stage.querySelector('[data-motion-title]');
  const description = stage.querySelector('[data-motion-description]');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const connection = navigator.connection;
  const params = new URLSearchParams(location.search);
  const rawFrame = params.get('ag-frame');
  const fixedTime = rawFrame !== null && Number.isFinite(Number(rawFrame)) ? clamp(Number(rawFrame), 0, DURATION) : null;
  let renderer, envTarget, scene, camera, pmrem, resizeObserver, observer;
  let elapsed = 0, last = 0, visible = true, paused = false, ended = false, lost = false, disposed = false;
  let phase = '', root, blob, skin, needle, gland, petals, halo, particleMesh, shadow;
  let bases, frameCount = 0;
  const resources = new Set(), materials = new Set();
  const own = x => { resources.add(x); return x; };
  const mat = options => { const m = own(new THREE.MeshPhysicalMaterial(options)); materials.add(m); return m; };
  const constrained = () => reduced.matches || !!connection?.saveData;

  function caption(t) {
    const next = t < 3.7 ? 'target' : t < 6 ? 'precision' : t < 8.6 ? 'rf' : 'blossom';
    if (phase === next) return;
    phase = next; stage.dataset.phase = next;
    const copy = {
      target: ['01 / 03', 'THE TARGET', 'Begin beneath the surface.'],
      precision: ['02 / 03', 'PRECISION', 'An insulated microneedle.'],
      rf: ['03 / 03', 'FOCUSED RF', 'Energy at the selected point.'],
      blossom: ['BEAUTY BLOSSOM', 'AGNES', 'A precise approach to skin.']
    }[next];
    number.textContent = copy[0]; title.textContent = copy[1]; description.textContent = copy[2];
  }

  function create() {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power', preserveDrawingBuffer: fixedTime !== null });
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, innerWidth < 768 ? 1.5 : 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    host.append(renderer.domElement);
    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera(-6.4, 6.4, 3.6, -3.6, .1, 50);
    camera.position.set(0, 1.9, 12); camera.lookAt(0, 0, 0);
    pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    envTarget = pmrem.fromScene(room, .04); scene.environment = envTarget.texture;
    room.dispose(); pmrem.dispose(); pmrem = null;
    const ambient = new THREE.HemisphereLight(0xfff6ff, 0x98758d, 2.0); scene.add(ambient);
    const key = new THREE.DirectionalLight(0xfff5f8, 3.0); key.position.set(-3, 7, 5); scene.add(key);
    const rim = new THREE.DirectionalLight(0xe9dcff, 3.2); rim.position.set(4, 2, -3); scene.add(rim);
    root = new THREE.Group(); root.position.set(2.45, .4, 0); scene.add(root);

    const geo = own(new THREE.SphereGeometry(1, 56, 36));
    bases = Float32Array.from(geo.attributes.position.array);
    const jelly = mat({color:0xe9a9c7,metalness:.08,roughness:.16,transmission:.48,thickness:1.0,ior:1.4,clearcoat:1,clearcoatRoughness:.1,transparent:true,opacity:1,depthWrite:false});
    blob = new THREE.Mesh(geo,jelly); root.add(blob);

    skin = new THREE.Group(); root.add(skin);
    const layer = (w,h,d,r,y,color) => {
      const m = mat({color,roughness:.35,clearcoat:.6,transparent:true,opacity:0,depthWrite:false});
      const mesh = new THREE.Mesh(own(new RoundedBoxGeometry(w,h,d,4,r)),m); mesh.position.y=y; skin.add(mesh); return mesh;
    };
    layer(3.05,1.30,1.20,.17,-.15,0xeac2cc);
    layer(3.10,.19,1.24,.085,.60,0xf7a9bf);
    layer(2.93,.19,1.16,.085,-.85,0xf5d8cd);
    const gold = mat({color:0xf2c07c,roughness:.21,metalness:.20,clearcoat:1,transparent:true,opacity:0,depthWrite:false});
    gland = new THREE.Group(); gland.position.set(.28,-.13,.69); skin.add(gland);
    const lobuleGeo = own(new THREE.SphereGeometry(.21,24,16));
    for(let i=0;i<5;i++){
      const m = new THREE.Mesh(lobuleGeo,gold); const a=i*Math.PI*2/5;
      m.position.set(Math.cos(a)*.15,Math.sin(a)*.16,Math.sin(a)*.035); m.scale.set(1.12,.96,.55); gland.add(m);
    }
    const duct = new THREE.CatmullRomCurve3([new THREE.Vector3(.28,-.13,.72),new THREE.Vector3(.12,.12,.72),new THREE.Vector3(.03,.36,.72),new THREE.Vector3(.03,.67,.42)]);
    skin.add(new THREE.Mesh(own(new THREE.TubeGeometry(duct,24,.055,10,false)),gold));
    // Subtle cellular texture at the front of the illustrative cutaway.
    const cellMat = mat({color:0xffe6dd,roughness:.45,transparent:true,opacity:0,depthWrite:false});
    particleMesh = new THREE.InstancedMesh(own(new THREE.SphereGeometry(.05,8,6)),cellMat,24);
    const dummy = new THREE.Object3D();
    for(let i=0;i<24;i++){
      const x=((i*37)%23)/23*2.65-1.325,y=((i*17)%19)/19*.8-.63;
      dummy.position.set(x,y,.62);dummy.scale.setScalar(.65+(i%4)*.15);dummy.updateMatrix();particleMesh.setMatrixAt(i,dummy.matrix);
    } skin.add(particleMesh);

    needle = new THREE.Group(); root.add(needle);
    const metal = mat({color:0xe4dfe9,metalness:.85,roughness:.19,transparent:true,opacity:0});
    const insulation = mat({color:0xc7afdc,metalness:.15,roughness:.23,clearcoat:1,transparent:true,opacity:0});
    const piece = (g,m,y) => {const mesh=new THREE.Mesh(own(g),m);mesh.position.y=y;needle.add(mesh);return mesh;};
    piece(new THREE.CylinderGeometry(.033,.033,1.4,20),metal,.83);
    piece(new THREE.CylinderGeometry(.055,.055,1.13,20),insulation,.97);
    const tip=piece(new THREE.ConeGeometry(.033,.15,20),metal,.075);tip.rotation.z=Math.PI;
    piece(new THREE.CylinderGeometry(.15,.13,.37,32),insulation,1.72);
    piece(new THREE.TorusGeometry(.13,.018,8,32),metal,1.55).rotation.x=Math.PI/2;

    halo = new THREE.Group(); halo.position.set(.28,-.13,.94);root.add(halo);
    const ringGeo=own(new THREE.TorusGeometry(.31,.012,8,64));
    for(let i=0;i<3;i++){
      const m=own(new THREE.MeshBasicMaterial({color:i===1?0xf4c28e:0xe68eaa,transparent:true,opacity:0,depthWrite:false}));
      const ring=new THREE.Mesh(ringGeo,m);ring.userData.index=i;halo.add(ring);
    }
    petals = new THREE.Group(); root.add(petals);
    const petalGeo=own(new THREE.SphereGeometry(1,32,24));
    for(let i=0;i<5;i++){
      const p=new THREE.Mesh(petalGeo,mat({color:[0xe7b3d5,0xf1bed1,0xcab5e6,0xf7c9c7,0xd7b8e6][i],roughness:.18,metalness:.06,transmission:.25,thickness:.5,clearcoat:1,transparent:true,opacity:0,depthWrite:false}));petals.add(p);
    }
    const shadowCanvas=document.createElement('canvas');shadowCanvas.width=128;shadowCanvas.height=128;
    const ctx=shadowCanvas.getContext('2d'),gradient=ctx.createRadialGradient(64,64,3,64,64,63);
    gradient.addColorStop(0,'rgba(108,58,91,.24)');gradient.addColorStop(.45,'rgba(108,58,91,.10)');gradient.addColorStop(1,'rgba(108,58,91,0)');ctx.fillStyle=gradient;ctx.fillRect(0,0,128,128);
    const texture=own(new THREE.CanvasTexture(shadowCanvas));
    shadow=new THREE.Mesh(own(new THREE.PlaneGeometry(4.7,2.7)),own(new THREE.MeshBasicMaterial({map:texture,transparent:true,depthWrite:false})));shadow.position.set(2.45,-1.35,-.3);shadow.rotation.x=-Math.PI/2;scene.add(shadow);
    resize();
    renderer.domElement.addEventListener('webglcontextlost',contextLost,false);
    renderer.domElement.addEventListener('webglcontextrestored',contextRestored,false);
  }

  function render(t) {
    const box = appear(t,1.65,3.25,8.15,9.5);
    const bloom = ramp(8.6,10.7,t);
    const details = appear(t,2.65,3.7,8.2,9.2);
    const wobble = Math.sin(t*2.4)*.06*(1-box)*(1-bloom);
    const positions=blob.geometry.attributes.position;
    for(let i=0;i<positions.count;i++){
      const j=i*3,nx=bases[j],ny=bases[j+1],nz=bases[j+2],max=Math.max(Math.abs(nx),Math.abs(ny),Math.abs(nz),.001);
      const neck=1-.3*Math.max(0,ny),ripple=1+.028*Math.sin(ny*8+t*3)*Math.cos(nx*5+t);
      const dx=nx*1.03*neck*ripple,dy=ny*1.18+(ny>0?ny*ny*.19:0),dz=nz*1.03*neck*ripple;
      const tx=(nx/max*.8+nx*.2)*1.66,ty=(ny/max*.8+ny*.2)*.94,tz=(nz/max*.8+nz*.2)*.70;
      positions.setXYZ(i,mix(dx,tx,box)*(1+wobble),mix(dy,ty,box)*(1-wobble),mix(dz,tz,box));
    }
    positions.needsUpdate=true;blob.geometry.computeVertexNormals();
    blob.scale.setScalar(mix(1.05,.38,bloom));
    blob.material.opacity=mix(1,.18,details);blob.material.transmission=mix(.48,.88,details);
    blob.position.y=Math.sin(t*1.1)*.07*(1-box)*(1-bloom);
    blob.rotation.z=Math.sin(t*.8)*.06*(1-box)*(1-bloom);
    skin.visible=details>.001;skin.scale.setScalar(.83+.17*details);
    skin.traverse(o=>{if(o.isMesh)o.material.opacity=details*(o === particleMesh ? .7 : 1);});
    const needleOpacity=appear(t,3.6,4.3,7.9,8.65);
    needle.visible=needleOpacity>.001;needle.traverse(o=>{if(o.isMesh)o.material.opacity=needleOpacity;});
    const descend=ramp(4.0,5.6,t),withdraw=ramp(7.7,8.5,t);
    needle.position.set(.28,-.13+mix(1.65,0,descend)+withdraw*1.0,.86);
    needle.rotation.z=0;
    const rf=appear(t,5.6,6.0,7.9,8.4);
    halo.visible=rf>.001;
    halo.children.forEach((ring,i)=>{
      const pulse=((Math.max(0,t-5.6)*.55+i/3)%1);ring.scale.setScalar(.8+pulse*2.1);ring.material.opacity=rf*(1-pulse)*.65;
    });
    root.rotation.y=mix(-.23,.16,ramp(2,7,t))*(1-bloom);
    root.rotation.x=.04;
    petals.children.forEach((p,i)=>{const a=i*Math.PI*2/5+.1;p.position.set(Math.sin(a)*.69*bloom,Math.cos(a)*.69*bloom,0);p.scale.set(.39*bloom,.68*bloom,.38*bloom);p.rotation.z=-a;p.material.opacity=bloom;});
    petals.rotation.z=(1-bloom)*.7;
    shadow.scale.set(1+box*.2,1+box*.05,1);shadow.material.opacity=.9;
    caption(t);bar.style.transform=`scaleX(${t/DURATION})`;
    renderer.render(scene,camera);frameCount++;stage.dataset.time=t.toFixed(3);stage.dataset.frames=String(frameCount);
  }

  function resize() {
    if(!renderer||lost||disposed)return;
    const {width,height}=stage.getBoundingClientRect();if(!width||!height)return;
    renderer.setSize(width,height);camera.left=-3.6*width/height;camera.right=3.6*width/height;camera.updateProjectionMatrix();
    if(root)render(fixedTime??(constrained()?6.8:elapsed));
  }
  function updateButton() {
    button.hidden=constrained()||lost;
    button.textContent=ended?'Replay ↻':paused?'Play motion ▷':'Pause motion Ⅱ';
    button.setAttribute('aria-label',ended?'Replay AGNES introduction':paused?'Play AGNES introduction':'Pause AGNES introduction');
    button.setAttribute('aria-pressed',String(paused));
  }
  function sync() {
    if(!renderer||disposed)return;
    renderer.setAnimationLoop(null);last=0;
    updateButton();
    if(lost)return;
    if(constrained()){caption(6.8);render(6.8);return;}
    if(fixedTime!==null){render(fixedTime);return;}
    if(!visible||document.hidden||paused||ended){if(paused||ended)render(elapsed);return;}
    renderer.setAnimationLoop(now=>{
      if(!last){last=now;render(elapsed);return;}
      elapsed=Math.min(DURATION,elapsed+(now-last)/1000);last=now;render(elapsed);
      if(elapsed>=DURATION){ended=true;sync();}
    });
  }
  function toggle() {if(ended){ended=false;paused=false;elapsed=0;}else paused=!paused;sync();}
  function contextLost(e) {e.preventDefault();lost=true;stage.dataset.state='fallback';caption(6.8);bar.style.transform='scaleX(0)';sync();}
  function contextRestored() {lost=false;resize();stage.dataset.state='ready';sync();}
  function pageHide(e) {if(e.persisted){renderer?.setAnimationLoop(null);last=0;}else dispose();}
  function dispose() {
    if(disposed)return;disposed=true;renderer?.setAnimationLoop(null);observer?.disconnect();resizeObserver?.disconnect();
    document.removeEventListener('visibilitychange',sync);window.removeEventListener('pageshow',sync);window.removeEventListener('pagehide',pageHide);
    reduced.removeEventListener('change',sync);connection?.removeEventListener?.('change',sync);button.removeEventListener('click',toggle);
    renderer?.domElement.removeEventListener('webglcontextlost',contextLost);renderer?.domElement.removeEventListener('webglcontextrestored',contextRestored);
    resources.forEach(r=>r.dispose());envTarget?.dispose();pmrem?.dispose();renderer?.dispose();
  }
  try {
    create();
    observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{threshold:0.05});observer.observe(stage);
    resizeObserver=new ResizeObserver(resize);resizeObserver.observe(stage);
    document.addEventListener('visibilitychange',sync);window.addEventListener('pageshow',sync);window.addEventListener('pagehide',pageHide);
    reduced.addEventListener('change',sync);connection?.addEventListener?.('change',sync);button.addEventListener('click',toggle);
    render(fixedTime??(constrained()?6.8:0));stage.dataset.state='ready';sync();
    // Explicit read-only proof surface. It never writes application/user state.
    if(fixedTime!==null)stage.agnesProof={seek:t=>{elapsed=clamp(t,0,DURATION);render(elapsed);},capture:()=>renderer.domElement.toDataURL('image/png'),memory:()=>({...renderer.info.memory}),dispose};
  } catch(error) {
    stage.dataset.state='fallback';stage.dataset.failure=error.name||'RenderError';button.hidden=true;dispose();
  }
}
document.querySelectorAll('[data-agnes-motion]').forEach(mount);
