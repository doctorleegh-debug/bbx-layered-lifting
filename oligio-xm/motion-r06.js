(() => {
  'use strict';
  const root = document.getElementById('xm');
  if (!root || root.dataset.motionReady) return;
  const mq = matchMedia('(prefers-reduced-motion: reduce)'), connection = navigator.connection;
  let mediaReduced = mq.matches;
  const reduced = () => mediaReduced || !!connection?.saveData;
  let suspended = false, raf = 0, last = 0;
  const scenes = [], watched = new Map();
  let carousel=null;
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
    if(s.type.startsWith('h')){
      const fy=s.type==='h30'?325:410;
      [228,250,272].forEach((x,i)=>{
        // Soft overlapping light volumes: no outlined triangles, rails or target rings.
        for(let j=0;j<20;j++){
          const q=j/19,y=234+(fy-234)*q,w=15*(1-q)+3;
          const pulse=.55+.45*Math.sin(t*2.1-q*7+i*.55);
          halo(c,x,y,w,11,.09+.065*pulse,'255,183,126');
        }
        for(let j=0;j<2;j++){
          const q=(t*.32+j*.5+i*.08)%1,fade=Math.sin(Math.PI*q);
          halo(c,x,234+(fy-234)*q,12*(1-q)+3,14,.48*fade,'255,209,160');
        }
        const glow=.74+.16*Math.sin(t*2.1-i*.55);
        halo(c,x,fy,19,12,glow*.68,'255,155,112');
        halo(c,x,fy,7,4.5,glow,'255,226,181');
      });
    }else{
      const pulse=.48+.08*Math.sin(t*1.65);
      halo(c,250,281,106,64,pulse,'255,172,120');halo(c,250,241,36,18,.48,'255,218,159');
      for(let i=0;i<4;i++){
        const q=(t*.17+i/4)%1,y=238+76*q,w=25+78*q,fade=Math.sin(Math.PI*q)*(1-q);
        for(let j=0;j<16;j++){
          const a=Math.PI*j/15;
          halo(c,250+Math.cos(a)*w,y+Math.sin(a)*(12+9*q),12,7,.23*fade,'255,212,160');
        }
      }
    }
    c.restore();s.el.dataset.energyFrame=String(Math.round(t*100));
  }
  root.querySelectorAll('.energy-scene').forEach(el=>{
    const canvas=el.querySelector('canvas');let ctx;try{ctx=canvas?.getContext('2d');}catch(_){return;}if(!ctx)return;
    const scale=1.5;canvas.width=600*scale;canvas.height=500*scale;
    const s={kind:'energy',el,ctx,canvas,scale,time:.7,type:el.dataset.energy,visible:false};scenes.push(s);drawEnergy(s,.7);el.dataset.canvasReady='true';observe(el,s);
  });
  const variants=[...root.querySelectorAll('[data-energy-variant]')], energyButtons=[...root.querySelectorAll('[data-energy-button]')], stage=root.querySelector('.energy-stage');
  const DISSOLVE=1500,HOLD=3500;
  function paintEnergy(){
    if(!carousel)return;
    variants.forEach((v,i)=>{
      const active=i===carousel.current,shown=carousel.weights[i]>.00001||active;
      v.style.opacity=String(carousel.weights[i]);v.classList.toggle('is-energy-visible',shown);v.classList.toggle('is-energy-current',active);
      v.setAttribute('aria-hidden',String(!active));v.inert=!active;
    });
    energyButtons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.energyButton===variants[carousel.current].dataset.energyVariant)));
    stage.dataset.energyActive=variants[carousel.current].dataset.energyVariant;
    stage.dataset.energyTransition=carousel.mix?'dissolving':'holding';
  }
  function settleEnergy(){
    if(!carousel)return;
    carousel.mix=null;carousel.elapsed=0;carousel.weights=variants.map((_,i)=>Number(i===carousel.current));paintEnergy();
  }
  function setEnergy(index,animate){
    if(!carousel||index<0||index>=variants.length)return;
    carousel.current=index;carousel.elapsed=0;
    if(animate&&!reduced())carousel.mix={from:carousel.weights.slice(),time:0};else {settleEnergy();return;}
    paintEnergy();
  }
  function selectEnergy(type){
    const i=variants.findIndex(v=>v.dataset.energyVariant===type);if(i<0||!carousel)return;
    if(i===carousel.current){carousel.elapsed=0;return;}
    setEnergy(i,running()&&carousel.visible);sync();
  }
  function updateCarousel(dt){
    if(!carousel||!carousel.visible)return;
    if(carousel.mix){
      carousel.mix.time+=dt;const q=Math.min(1,carousel.mix.time/DISSOLVE),ease=q*q*(3-2*q);
      carousel.weights=carousel.mix.from.map((w,i)=>w*(1-ease)+(i===carousel.current?ease:0));
      if(q===1)settleEnergy();else paintEnergy();
    }else{
      carousel.elapsed+=dt;if(carousel.elapsed>=HOLD)setEnergy((carousel.current+1)%variants.length,true);
    }
  }
  if(stage&&variants.length===3&&energyButtons.length===3){
    carousel={kind:'carousel',el:stage,visible:false,current:0,elapsed:0,mix:null,weights:[1,0,0]};
    root.dataset.carouselReady='true';stage.dataset.dissolveMs=String(DISSOLVE);
    variants.forEach(v=>{v.hidden=false;});observe(stage,carousel);settleEnergy();
    root.querySelector('.energy-options').hidden=false;
    energyButtons.forEach(b=>b.addEventListener('click',()=>selectEnergy(b.dataset.energyButton)));
  }
  function canDraw(s){const v=s.el.closest('[data-energy-variant]');return s.visible&&!s.el.closest('[hidden]')&&(!carousel||!v||v.classList.contains('is-energy-visible'));}
  function needFrame(){return running()&&(!!carousel?.visible||scenes.some(canDraw));}
  function tick(now){
    raf=0;if(!needFrame()){last=0;return;}
    const elapsed=last?Math.max(0,now-last):16,dt=Math.min(elapsed,80);last=now;
    updateCarousel(elapsed);
    scenes.forEach(s=>{if(!canDraw(s))return;s.time+=dt/1000;drawEnergy(s,s.time);});
    if(needFrame())raf=requestAnimationFrame(tick);
  }
  function sync(){
    if(reduced()){cancelFace();settleEnergy();}
    else if(face.el&&face.animations.length===0)makeFace();
    face.animations.forEach(a=>{if(running()&&face.visible)a.play();else a.pause();});
    if(needFrame()&&!raf){last=0;raf=requestAnimationFrame(tick);}else if(!needFrame()&&raf){cancelAnimationFrame(raf);raf=0;last=0;}
  }
  root.dataset.motionReady='r06';
  document.addEventListener('visibilitychange',sync);
  window.addEventListener('pagehide',()=>{suspended=true;sync();});window.addEventListener('pageshow',()=>{suspended=false;sync();});
  mq.addEventListener('change',event=>{mediaReduced=event.matches;sync();});connection?.addEventListener?.('change',sync);
  if(!observer)window.addEventListener('scroll',()=>{watched.forEach(s=>{s.visible=visible(s.el);});sync();},{passive:true});
  sync();
})();
