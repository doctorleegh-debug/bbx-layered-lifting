/* Original vanilla implementation, informed by Kinetics spring interactions. */
(()=>{'use strict';
const root=document.querySelector('#bb-thermage');if(!root)return;
const reduce=matchMedia('(prefers-reduced-motion:reduce)'),fine=matchMedia('(hover:hover) and (pointer:fine)'),connection=navigator.connection;
const allowed=()=>!document.hidden&&!reduce.matches&&!connection?.saveData;
let raf=0,last=0;
const springs=[];
// Semi-implicit Euler, bounded 1/240s substeps; no reset on interruption.
function axis(value){return {x:value,v:0,target:value}}
function advance(a,dt){a.v+=(240*(a.target-a.x)-30*a.v)*dt;a.x+=a.v*dt;return Math.abs(a.target-a.x)>.005||Math.abs(a.v)>.01}
function wake(){if(!raf&&allowed()){last=0;raf=requestAnimationFrame(frame)}}
function frame(t){raf=0;if(!allowed())return;const elapsed=last?Math.min((t-last)/1000,.04):1/60;last=t;let pending=false;
 for(const s of springs){if(s.section?.dataset.motion!=='playing')continue;let moving=false;const n=Math.ceil(elapsed*240);for(let i=0;i<n;i++)for(const a of s.axes)moving=advance(a,elapsed/n)||moving;s.draw();pending=moving||pending;}
 if(pending)raf=requestAnimationFrame(frame);else last=0;
}
const hero=root.querySelector('.tf-hero');
function policy(){root.dataset.saveData=String(!!connection?.saveData);if(!allowed()){cancelAnimationFrame(raf);raf=0;last=0;for(const s of springs){for(const a of s.axes){a.x=a.target;a.v=0}s.draw()}}else wake();if(hero?.dataset.visible==='true'&&!hero.hasAttribute('data-entered'))hero.dataset.entered='true'}
for(const card of root.querySelectorAll('.tf-feature-grid article')){
 const rx=axis(0),ry=axis(0),section=card.closest('.cr-motion'),s={axes:[rx,ry],section,draw(){card.style.setProperty('--rx',rx.x+'deg');card.style.setProperty('--ry',ry.x+'deg')}};springs.push(s);
 card.addEventListener('pointermove',e=>{if(!fine.matches||!allowed()||e.pointerType==='touch')return;const b=card.getBoundingClientRect();rx.target=Math.max(-3,Math.min(3,(.5-(e.clientY-b.top)/b.height)*6));ry.target=Math.max(-4,Math.min(4,((e.clientX-b.left)/b.width-.5)*8));wake()},{passive:true});
 const reset=()=>{rx.target=ry.target=0;if(!allowed()||!fine.matches){rx.x=ry.x=rx.v=ry.v=0;s.draw()}else wake()};card.addEventListener('pointerleave',reset);fine.addEventListener('change',reset);reduce.addEventListener('change',reset);
}
const tabs=root.querySelector('.tf-tabs'),list=tabs?.querySelector('[role=tablist]');
if(list){const pill=document.createElement('span');pill.className='tf4-pill';pill.setAttribute('aria-hidden','true');list.prepend(pill);const x=axis(0),w=axis(0);let ready=false;
 const s={axes:[x,w],section:tabs.closest('.cr-motion'),draw(){pill.style.transform='translateX('+x.x+'px)';pill.style.width=Math.max(0,w.x)+'px'}};springs.push(s);
 function measure(){const active=list.querySelector('[aria-selected=true]');if(!active)return;x.target=active.offsetLeft;w.target=active.offsetWidth;pill.style.top=active.offsetTop+'px';pill.style.height=active.offsetHeight+'px';if(!ready||!allowed()||s.section.dataset.motion!=='playing'){x.x=x.target;w.x=w.target;x.v=w.v=0;ready=true;s.draw()}tabs.dataset.glide='true';wake()}
 new MutationObserver(measure).observe(list,{subtree:true,attributes:true,attributeFilter:['aria-selected']});new ResizeObserver(measure).observe(list);document.fonts?.ready.then(measure);measure();
}
new MutationObserver(()=>{for(const s of springs)if(s.section?.dataset.motion!=='playing'){for(const a of s.axes){a.x=a.target;a.v=0}s.draw()}policy()}).observe(root,{subtree:true,attributes:true,attributeFilter:['data-motion']});
document.addEventListener('visibilitychange',policy);reduce.addEventListener('change',policy);connection?.addEventListener?.('change',policy);window.addEventListener('pagehide',()=>{cancelAnimationFrame(raf);raf=0});window.addEventListener('pageshow',policy);policy();
})();
