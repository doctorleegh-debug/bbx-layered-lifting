(()=>{'use strict';const section=document.querySelector('#tf-treatment-cycle');if(!section)return;
const steps=[...section.querySelectorAll('[data-cycle-step]')],reduce=matchMedia('(prefers-reduced-motion:reduce)');if(!steps.length)return;
let active=0,visible=false,timer=null,paused=false,hover=false;
const count=section.querySelector('.tf6-step-count'),toggle=document.createElement('button');
toggle.type='button';toggle.className='tf6-cycle-toggle';toggle.textContent='자동 재생 일시정지';toggle.setAttribute('aria-pressed','false');steps[0].parentElement.after(toggle);
function allowed(){return !document.hidden&&!reduce.matches&&!navigator.connection?.saveData&&visible&&!paused&&!hover&&!steps.some(el=>el.matches(':focus-within'))}
function paint(){section.dataset.cycle=String(active);steps.forEach((el,i)=>{el.dataset.active=String(i===active);el.querySelector('button')?.setAttribute('aria-pressed',String(i===active))});if(count)count.textContent=String(active+1).padStart(2,'0')+' / '+String(steps.length).padStart(2,'0')}
function schedule(){clearTimeout(timer);timer=null;section.dataset.running=String(allowed());if(!allowed())return;timer=setTimeout(()=>{timer=null;if(!allowed()){schedule();return}active=(active+1)%steps.length;paint();schedule()},3200)}
steps.forEach((el,i)=>{el.querySelector('button')?.addEventListener('click',()=>{active=i;paint();schedule()});el.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'){hover=true;schedule()}});el.addEventListener('pointerleave',()=>{hover=false;schedule()})});
section.addEventListener('focusin',schedule);section.addEventListener('focusout',()=>queueMicrotask(schedule));
toggle.addEventListener('click',()=>{paused=!paused;toggle.setAttribute('aria-pressed',String(paused));toggle.textContent=paused?'자동 재생 시작':'자동 재생 일시정지';schedule()});
const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;schedule()},{threshold:.25});observer.observe(section.querySelector('.tf5-cycle-visual'));
document.addEventListener('visibilitychange',schedule);reduce.addEventListener('change',schedule);navigator.connection?.addEventListener?.('change',schedule);window.addEventListener('pagehide',()=>{clearTimeout(timer);timer=null;section.dataset.running='false'});window.addEventListener('pageshow',schedule);paint();schedule();
})();
