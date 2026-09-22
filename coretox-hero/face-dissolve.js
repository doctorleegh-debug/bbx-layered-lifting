(()=>{'use strict';
const reduced=matchMedia('(prefers-reduced-motion: reduce)'),connection=navigator.connection;
document.querySelectorAll('[data-face-dissolve]').forEach(root=>{
 let visible=false,hidden=false;
 const sync=()=>{root.dataset.play=String(visible&&!hidden&&!document.hidden&&!reduced.matches&&!connection?.saveData)};
 if('IntersectionObserver'in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync()},{threshold:.15}).observe(root);else visible=true;
 document.addEventListener('visibilitychange',sync);window.addEventListener('pagehide',()=>{hidden=true;sync()});window.addEventListener('pageshow',()=>{hidden=false;sync()});reduced.addEventListener('change',sync);connection?.addEventListener?.('change',sync);sync();
});})();
