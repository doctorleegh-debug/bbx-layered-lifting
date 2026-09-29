/* Independent controls: never join the existing ECM tab group. */
(()=>{'use strict';const root=document.querySelector('#bb-cellredm');if(!root||root.dataset.cr7Ready)return;root.dataset.cr7Ready='true';
const reduced=matchMedia('(prefers-reduced-motion:reduce)'),allowed=()=>!reduced.matches&&!document.hidden&&!navigator.connection?.saveData;const animations=new Set();
for(const group of root.querySelectorAll('[data-cr7-switcher]')){
 const buttons=[...group.querySelectorAll('[data-cr7-target]')];const panels=buttons.map(b=>document.getElementById(b.dataset.cr7Target));if(!buttons.length||panels.some(p=>!p))continue;
 let animation=null;const select=(index,focus=false)=>{animation?.cancel();if(animation)animations.delete(animation);buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));panels.forEach((p,i)=>p.hidden=i!==index);if(allowed()){animation=panels[index].animate([{opacity:.4,transform:'translateY(7px)'},{opacity:1,transform:'translateY(0)'}],{duration:350,easing:'ease-out'});animations.add(animation);animation.onfinish=()=>animations.delete(animation)}if(focus)buttons[index].focus()};
 buttons.forEach((b,i)=>{b.addEventListener('click',()=>select(i));b.addEventListener('keydown',e=>{let n;if(e.key==='ArrowRight')n=(i+1)%buttons.length;if(e.key==='ArrowLeft')n=(i+buttons.length-1)%buttons.length;if(e.key==='Home')n=0;if(e.key==='End')n=buttons.length-1;if(n!==undefined){e.preventDefault();select(n,true)}})});select(0);
}
const sync=()=>{if(!allowed()){for(const a of animations)a.cancel();animations.clear()}};reduced.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);navigator.connection?.addEventListener?.('change',sync);
})();
