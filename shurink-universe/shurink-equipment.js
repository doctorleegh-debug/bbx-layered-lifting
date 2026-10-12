(()=>{'use strict';
const section=document.querySelector('.su-equipment');if(!section)return;
const reduced=matchMedia('(prefers-reduced-motion:reduce)'),connection=navigator.connection;
let visible=false,leaving=false;
function sync(){
 const allowed=!reduced.matches&&!connection?.saveData;
 const run=visible&&!document.hidden&&!leaving&&allowed;
 section.dataset.motion=allowed?'rolling':'static';
 section.dataset.running=String(run);
 if(run)section.dataset.entered='true';
}
const target=section.querySelector('.su-equipment-families')||section;
if('IntersectionObserver'in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{threshold:.12}).observe(target);else visible=true;
document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);connection?.addEventListener?.('change',sync);
window.addEventListener('pagehide',()=>{leaving=true;sync()});window.addEventListener('pageshow',()=>{leaving=false;sync()});sync();
})();
