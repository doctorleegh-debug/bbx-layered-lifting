(()=>{'use strict';
const section=document.querySelector('.su-equipment');if(!section)return;
const reduced=matchMedia('(prefers-reduced-motion:reduce)'),connection=navigator.connection;
let visible=false,leaving=false;
function sync(){const run=visible&&!document.hidden&&!leaving&&!reduced.matches&&!connection?.saveData;section.dataset.running=String(run);if(run)section.dataset.entered='true';}
if('IntersectionObserver'in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{threshold:.12}).observe(section);else visible=true;
document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);connection?.addEventListener?.('change',sync);
window.addEventListener('pagehide',()=>{leaving=true;sync()});window.addEventListener('pageshow',()=>{leaving=false;sync()});sync();
})();
