(() => {
  'use strict';
  const root = document.getElementById('xm');
  if (!root || root.dataset.motionReady) return;
  const mq = matchMedia('(prefers-reduced-motion: reduce)'), connection = navigator.connection;
  let mediaReduced = mq.matches;
  const reduced = () => mediaReduced || !!connection?.saveData;
  let suspended = false, raf = 0, last = 0;
  const scenes = [], watched = new Map();
  const visible = el => {const r=el.getBoundingClientRect();return r.bottom>65&&r.top<innerHeight-20&&!el.closest('[hidden]');};
  const running = () => !document.hidden && !suspended && !reduced();
  function observe(el, state) {watched.set(el,state);state.visible=visible(el);observer?.observe(el);}
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(e => {const s=watched.get(e.target);if(!s)return;s.visible=e.isIntersecting&&!e.target.closest('[hidden]');});
    sync();
  },{rootMargin:'-65px 0px -20px 0px',threshold:0}) : null;

  const portrait=root.querySelector('.portrait-stage'), zoneGroups=[...root.querySelectorAll('.portrait-zone')], areaButtons=[...root.querySelectorAll('[data-area-button]')];
  const face={kind:'face',el:portrait,visible:false,animations:[],selected:0};
  function cancelFace(){face.animations.forEach(a=>a.cancel());face.animations=[];}
  function makeFace(){
    if(reduced()||typeof Element.prototype.animate!=='function')return;
    const zone=zoneGroups[face.selected];if(!zone)return;
    face.animations=[zone.querySelector('.zone-sweep').animate([{transform:'translateX(-250px)',opacity:0},{opacity:1,offset:.15},{opacity:1,offset:.75},{transform:'translateX(1700px)',opacity:0}],{duration:3400,iterations:Infinity,easing:'ease-in-out'}),zone.querySelector('.zone-glow').animate([{opacity:.12},{opacity:.36},{opacity:.12}],{duration:3400,iterations:Infinity,easing:'ease-in-out'})];
  }
  function selectArea(value){
    const i=Number(value);if(!Number.isInteger(i)||i<0||i>=zoneGroups.length)return;
    cancelFace();face.selected=i;portrait.dataset.activeArea=String(i);
    zoneGroups.forEach((g,n)=>g.classList.toggle('is-active',n===i));
    areaButtons.forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.areaButton)===i)));
    root.querySelectorAll('[data-area-detail]').forEach(a=>a.classList.toggle('is-active',Number(a.dataset.areaDetail)===i));
    makeFace();sync();
  }
  if(portrait&&zoneGroups.length===6){
    observe(portrait,face);areaButtons.forEach(b=>{b.disabled=false;b.addEventListener('click',()=>selectArea(b.dataset.areaButton));});
    root.querySelector('.portrait-points').hidden=false;selectArea(0);
  }

  function halo(ctx,x,y,rx,ry,alpha,color='255,112,91'){
    ctx.save();ctx.translate(x,y);ctx.scale(rx,ry);const g=ctx.createRadialGradient(0,0,0,0,0,1);
    g.addColorStop(0,'rgba(255,255,233,'+alpha+')');g.addColorStop(.16,'rgba(255,226,163,'+alpha*.95+')');g.addColorStop(.48,'rgba('+color+','+alpha*.65+')');g.addColorStop(1,'rgba('+color+',0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,1,0,Math.PI*2);ctx.fill();ctx.restore();
  }
  function drawEnergy(s,t){
    const c=s.ctx;c.setTransform(s.scale,0,0,s.scale,0,0);c.clearRect(0,0,600,500);c.save();c.beginPath();c.rect(120,230,265,195);c.clip();
    const hifu=s.type.startsWith('h'),pulse=.84+.12*Math.sin(t*2.2);
    if(hifu){
      const fy=s.type==='h30'?325:410;
      [228,250,272].forEach((x,i)=>{
        const phase=(t*.56+i*.21)%1;
        const g=c.createLinearGradient(x,232,x,fy);g.addColorStop(0,'rgba(255,205,92,.16)');g.addColorStop(.65,'rgba(255,167,67,.3)');g.addColorStop(1,'rgba(255,249,198,.88)');
        c.fillStyle=g;c.beginPath();c.moveTo(x-12,232);c.lineTo(x,fy);c.lineTo(x+12,232);c.closePath();c.fill();
        c.beginPath();c.moveTo(x-12,232);c.lineTo(x,fy);c.lineTo(x+12,232);c.strokeStyle='rgba(239,103,35,.88)';c.lineWidth=2.8;c.stroke();
        for(let j=0;j<6;j++){
          const q=(phase+j/6)%1,y=232+(fy-232)*q,spread=12*(1-q);
          c.beginPath();c.moveTo(x-spread,y);c.quadraticCurveTo(x,y+3,x+spread,y);c.strokeStyle='rgba(255,249,220,'+(.55+.4*q)+')';c.lineWidth=1.8+q;c.stroke();
        }
        const glow=.8+.15*Math.sin(t*2.2-i*.7);halo(c,x,fy,23,16,glow,'255,94,32');halo(c,x,fy,6,4,1);
        c.beginPath();c.ellipse(x,fy,7.5,5,0,0,Math.PI*2);c.strokeStyle='#fff8d9';c.lineWidth=1.7;c.stroke();
      });
    }else{
      halo(c,250,282,111,65,pulse);halo(c,250,245,57,23,.95);
      for(let i=0;i<7;i++){
        const q=(t*.22+i/7)%1,y=235+95*q,w=27+83*q;
        c.beginPath();c.ellipse(250,y,w,12+8*q,0,0,Math.PI);c.strokeStyle='rgba(235,100,29,'+((1-q)*.85)+')';c.lineWidth=4;c.stroke();
        c.strokeStyle='rgba(255,246,180,'+((1-q)*.98)+')';c.lineWidth=1.8;c.shadowBlur=5;c.shadowColor='#ffba5c';c.stroke();c.shadowBlur=0;
      }
      for(let i=0;i<12;i++){
        const q=(t*.17+i*.109)%1,x=180+(i*29%140),y=236+q*87;halo(c,x,y,2,3,.85*(1-q));
      }
    }
    c.restore();s.el.dataset.energyFrame=String(Math.round(t*100));
  }
  root.querySelectorAll('.energy-scene').forEach(el=>{
    const canvas=el.querySelector('canvas');let ctx;try{ctx=canvas?.getContext('2d');}catch(_){return;}if(!ctx)return;
    const scale=1.5;canvas.width=600*scale;canvas.height=500*scale;
    const s={kind:'energy',el,ctx,canvas,scale,time:.7,type:el.dataset.energy,visible:false};scenes.push(s);drawEnergy(s,.7);el.dataset.canvasReady='true';observe(el,s);
  });
  const variants=[...root.querySelectorAll('[data-energy-variant]')], energyButtons=[...root.querySelectorAll('[data-energy-button]')];
  function selectEnergy(type){
    if(!variants.some(v=>v.dataset.energyVariant===type))return;
    variants.forEach(v=>{v.hidden=v.dataset.energyVariant!==type;});energyButtons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.energyButton===type)));
    scenes.forEach(s=>{s.visible=visible(s.el);if(s.type===type){s.time=.7;drawEnergy(s,.7);}});sync();
  }
  energyButtons.forEach(b=>b.addEventListener('click',()=>selectEnergy(b.dataset.energyButton)));
  if(variants.length===3&&energyButtons.length===3){root.querySelector('.energy-options').hidden=false;selectEnergy('h45');}
  function needFrame(){return running()&&scenes.some(s=>s.visible&&!s.el.closest('[hidden]'));}
  function tick(now){
    raf=0;if(!needFrame()){last=0;return;}
    const dt=last?Math.min(now-last,80):16;last=now;
    scenes.forEach(s=>{if(!s.visible||s.el.closest('[hidden]'))return;s.time+=dt/1000;drawEnergy(s,s.time);});
    if(needFrame())raf=requestAnimationFrame(tick);
  }
  function sync(){
    if(reduced()){cancelFace();}
    else if(face.el&&face.animations.length===0)makeFace();
    face.animations.forEach(a=>{if(running()&&face.visible)a.play();else a.pause();});
    if(needFrame()&&!raf){last=0;raf=requestAnimationFrame(tick);}else if(!needFrame()&&raf){cancelAnimationFrame(raf);raf=0;last=0;}
  }
  root.dataset.motionReady='r05';
  document.addEventListener('visibilitychange',sync);
  window.addEventListener('pagehide',()=>{suspended=true;sync();});window.addEventListener('pageshow',()=>{suspended=false;sync();});
  mq.addEventListener('change',event=>{mediaReduced=event.matches;sync();});connection?.addEventListener?.('change',sync);
  if(!observer)window.addEventListener('scroll',()=>{watched.forEach(s=>{s.visible=visible(s.el);});sync();},{passive:true});
  sync();
})();
