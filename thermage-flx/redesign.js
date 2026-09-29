(()=>{'use strict';const section=document.querySelector('#tf-treatment-cycle');if(!section)return;
const steps=[...section.querySelectorAll('[data-cycle-step]')],reduce=matchMedia('(prefers-reduced-motion:reduce)');let active=0,visible=false,timer=null;
function paint(){section.dataset.cycle=String(active);steps.forEach((el,i)=>el.dataset.active=String(i===active))}
function schedule(){clearTimeout(timer);timer=null;if(document.hidden||reduce.matches||navigator.connection?.saveData||!visible)return;timer=setTimeout(()=>{if(document.hidden||reduce.matches||navigator.connection?.saveData||!visible){schedule();return}active=(active+1)%steps.length;paint();schedule()},3200)}
const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;schedule()},{threshold:.25});observer.observe(section.querySelector('.tf5-cycle-visual'));
document.addEventListener('visibilitychange',schedule);reduce.addEventListener('change',schedule);navigator.connection?.addEventListener?.('change',schedule);window.addEventListener('pagehide',()=>clearTimeout(timer));window.addEventListener('pageshow',schedule);paint();
})();
