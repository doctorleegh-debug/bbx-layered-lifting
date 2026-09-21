(()=>{'use strict';
const root=document.getElementById('bb-botox');if(!root||root.dataset.ready)return;
const motion=matchMedia('(prefers-reduced-motion: reduce)'),connection=navigator.connection;
const hero=root.querySelector('.hero'),model=root.querySelector('.face-model'),skin=root.querySelector('.skin'),neuro=root.querySelector('.neuro-panel'),gallery=root.querySelector('.clinic-gallery');
const heroVideo=root.querySelector('.hero-video');let heroPlayPending=false;
function syncHeroVideo(){if(!heroVideo)return;if(runs(hero)){if(!heroVideo.getAttribute('src'))heroVideo.src=heroVideo.dataset.src;if(heroVideo.paused&&!heroPlayPending){heroPlayPending=true;heroVideo.play().catch(()=>{}).finally(()=>{heroPlayPending=false;if(!runs(hero))heroVideo.pause()})}}else heroVideo.pause()}
if(heroVideo)heroVideo.addEventListener('error',()=>{heroVideo.hidden=true});
let pageHidden=false;const visible=new Map();[hero,model,skin,neuro,gallery].filter(Boolean).forEach(e=>visible.set(e,false));
const limited=()=>motion.matches||Boolean(connection?.saveData)||document.hidden||pageHidden;
const runs=e=>Boolean(e)&&visible.get(e)&&!limited();
const areaButtons=[...root.querySelectorAll('.area-select')];
function area(index,focus=false){if(!Number.isInteger(index)||index<0||index>=areaButtons.length||!model)return;model.dataset.area=String(index);root.querySelector('.area-label').textContent=areaButtons[index].dataset.label;areaButtons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));if(focus)areaButtons[index].focus()}
areaButtons.forEach((b,i)=>{b.addEventListener('click',()=>area(i));b.addEventListener('keydown',e=>{let n;if(e.key==='ArrowDown'||e.key==='ArrowRight')n=(i+1)%areaButtons.length;if(e.key==='ArrowUp'||e.key==='ArrowLeft')n=(i+areaButtons.length-1)%areaButtons.length;if(e.key==='Home')n=0;if(e.key==='End')n=areaButtons.length-1;if(n!==undefined){e.preventDefault();area(n,true)}})});
root.querySelectorAll('[data-jump-area]').forEach(a=>a.addEventListener('click',()=>area(Number(a.dataset.jumpArea))));
const tabs=[...root.querySelectorAll('.stage-tabs [role="tab"]')],signal=root.querySelector('.signal-pulse'),particles=[...root.querySelectorAll('[data-particle]')];
let elapsed=0,frame=null,last=null,phase=-1;
function setStage(i,focus=false){if(!Number.isInteger(i)||i<0||i>=tabs.length)return;phase=i;neuro.dataset.stage=String(i);tabs.forEach((t,n)=>{t.setAttribute('aria-selected',String(n===i));t.tabIndex=n===i?0:-1;root.querySelector('#'+t.getAttribute('aria-controls')).hidden=n!==i});if(focus)tabs[i].focus()}
function draw(t){const stage=Math.min(2,Math.floor(t/4));if(stage!==phase)setStage(stage);neuro.dataset.time=t.toFixed(3);
const f=(t%2.1)/2.1;signal.style.left=(22+31*f)+'%';signal.style.top=(12+42*f)+'%';signal.style.opacity=String((stage===2?.28:.8)*Math.sin(Math.PI*f));
particles.forEach((p,i)=>{const f=(t*.7+i*.137)%1;p.style.left=(40+i*2.8)+'%';p.style.top=(61+f*8)+'%';p.style.opacity=String((stage===0?.82:stage===1?.3:(i%3===0?.12:0))*Math.sin(Math.PI*f))});
neuro.style.setProperty('--response',String((stage===0?.34:stage===1?.18:.055)*(.55+.45*Math.sin(t*3))));
}

function tick(now){frame=null;if(!runs(neuro)){last=null;return}if(last!==null)elapsed=(elapsed+Math.min((now-last)/1000,.1))%12;last=now;draw(elapsed);frame=requestAnimationFrame(tick)}
function manualStage(i,focus=false){elapsed=i*4;setStage(i,focus);draw(elapsed+.8);sync()}
tabs.forEach((t,i)=>{t.addEventListener('click',()=>manualStage(i));t.addEventListener('keydown',e=>{let n;if(e.key==='ArrowRight')n=(i+1)%tabs.length;if(e.key==='ArrowLeft')n=(i+tabs.length-1)%tabs.length;if(e.key==='Home')n=0;if(e.key==='End')n=tabs.length-1;if(n!==undefined){e.preventDefault();manualStage(n,true)}})});
const shots=[...root.querySelectorAll('.clinic-shot')];let timer=null,photo=0,pointer=null;
function selectPhoto(next){if(!shots.length||!Number.isInteger(next))return;photo=(next+shots.length)%shots.length;shots.forEach((s,i)=>{s.classList.toggle('is-active',i===photo);s.setAttribute('aria-hidden',String(i!==photo))});gallery.dataset.index=String(photo)}
function schedulePhoto(){if(timer!==null){clearTimeout(timer);timer=null}if(runs(gallery)&&shots.length>1)timer=setTimeout(()=>{timer=null;if(runs(gallery))selectPhoto(photo+1);schedulePhoto()},4800)}
if(gallery){gallery.addEventListener('keydown',e=>{let n;if(e.key==='ArrowRight')n=photo+1;if(e.key==='ArrowLeft')n=photo-1;if(e.key==='Home')n=0;if(e.key==='End')n=shots.length-1;if(n!==undefined){e.preventDefault();selectPhoto(n);schedulePhoto()}});gallery.addEventListener('pointerdown',e=>pointer={x:e.clientX,y:e.clientY});gallery.addEventListener('pointerup',e=>{if(!pointer)return;const dx=e.clientX-pointer.x,dy=e.clientY-pointer.y;pointer=null;if(Math.abs(dx)>45&&Math.abs(dx)>1.4*Math.abs(dy)){selectPhoto(photo+(dx<0?1:-1));schedulePhoto()}});gallery.addEventListener('pointercancel',()=>pointer=null)}
function sync(){syncHeroVideo();for(const e of visible.keys())e.dataset.motion=runs(e)?'playing':'paused';if(frame!==null){cancelAnimationFrame(frame);frame=null}last=null;if(motion.matches||connection?.saveData)draw(Math.max(0,phase)*4+1);if(runs(neuro))frame=requestAnimationFrame(tick);schedulePhoto()}
if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>{for(const e of entries){visible.set(e.target,e.isIntersecting);if(e.target===gallery&&e.isIntersecting)shots.forEach(s=>s.querySelector('img').loading='eager')}sync()},{threshold:.12});for(const e of visible.keys())observer.observe(e)}else for(const e of visible.keys())visible.set(e,true);
document.addEventListener('visibilitychange',sync);motion.addEventListener('change',sync);connection?.addEventListener?.('change',sync);window.addEventListener('pagehide',()=>{pageHidden=true;sync()});window.addEventListener('pageshow',()=>{pageHidden=false;sync()});
selectPhoto(0);area(0);draw(0);sync();root.dataset.ready='true';
})();
