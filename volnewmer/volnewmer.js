(()=>{'use strict';
const root=document.getElementById('bb-volnewmer');if(!root)return;
// This page alone fits the shared wordmark inside narrow mobile viewports.
function fitFooter(){const shadow=root.querySelector('bb-brand-footer')?.shadowRoot;if(!shadow)return;const style=document.createElement('style');style.dataset.vnWordmark='';style.textContent='@media(max-width:700px){.brand-signoff .logo{font-size:22vw}}';shadow.append(style);footerObserver.disconnect();}
const footerObserver=new MutationObserver(fitFooter);footerObserver.observe(root,{childList:true});fitFooter();
const reduced=matchMedia('(prefers-reduced-motion:reduce)'),mobile=matchMedia('(max-width:1000px)'),connection=navigator.connection;
const hero=root.querySelector('.vn-hero'),film=root.querySelector('.vn-film'),moving=[...root.querySelectorAll('.vn-motion')],science=root.querySelector('.vn-science-card'),bento=root.querySelector('.vn-bento'),motionButton=root.querySelector('[data-motion-toggle]'),visible=new Set();
let paused=false,filmKey='',filmEpoch=0,pending=false,blocked=false,timer=0,step=0,manualStep=false;
const allowed=()=>!paused&&!document.hidden&&!reduced.matches&&!connection?.saveData;
function resetFilm(){filmEpoch++;pending=false;film.pause();hero.dataset.ready='false';film.removeAttribute('src');film.load();filmKey='';blocked=false;}
function syncFilm(){
 if(!allowed()||!visible.has(hero)){film.pause();if(reduced.matches||connection?.saveData)hero.dataset.ready='false';return;}
 const source=mobile.matches?film.dataset.mobile:film.dataset.desktop;
 if(source!==filmKey){resetFilm();filmKey=source;film.src=source;film.muted=true;film.load();}
 if(blocked||pending||!film.paused)return;
 const epoch=filmEpoch;pending=true;
 film.play().then(()=>{if(epoch===filmEpoch&&(!allowed()||!visible.has(hero)))film.pause();}).catch(e=>{if(epoch===filmEpoch&&e.name!=='AbortError'){blocked=true;hero.dataset.ready='false';}}).finally(()=>{if(epoch===filmEpoch)pending=false;});
}
film.addEventListener('playing',()=>{hero.dataset.ready='true';if(!allowed()||!visible.has(hero))film.pause();});
film.addEventListener('error',()=>{if(film.getAttribute('src')){blocked=true;hero.dataset.ready='false';}});
mobile.addEventListener('change',()=>{resetFilm();syncFilm();});
const stepButtons=[...root.querySelectorAll('[data-step-button]')],stepCopy=[['피부에 맞닿는 시작','팁을 밀착하고 피부의 전기적 저항을 확인합니다.'],['온기는 안쪽으로, 쿨링은 접촉면에','고주파 열 전달과 수냉식 쿨링이 함께 이루어집니다.'],['피부 반응을 살피는 과정','열감과 피부 상태를 확인하며 다음 부위의 설정을 살핍니다.']];
function selectStep(n){step=(n+3)%3;science.dataset.step=String(step);stepButtons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===step)));root.querySelector('[data-step-number]').textContent=String(step+1).padStart(2,'0');root.querySelector('[data-step-title]').textContent=stepCopy[step][0];root.querySelector('[data-step-description]').textContent=stepCopy[step][1];}
function schedule(){clearTimeout(timer);if(allowed()&&visible.has(science)&&!manualStep)timer=setTimeout(()=>{selectStep(step+1);schedule();},4300);}
stepButtons.forEach((b,i)=>b.addEventListener('click',()=>{manualStep=true;clearTimeout(timer);selectStep(i);}));
const tabs=[...root.querySelectorAll('.vn-tip-tabs [role=tab]')];
function selectTip(n,focus=false){n=(n+tabs.length)%tabs.length;tabs.forEach((b,i)=>{b.setAttribute('aria-selected',String(i===n));b.tabIndex=i===n?0:-1;document.getElementById(b.getAttribute('aria-controls')).hidden=i!==n;});if(focus)tabs[n].focus();}
tabs.forEach((b,i)=>{b.addEventListener('click',()=>selectTip(i));b.addEventListener('keydown',e=>{const to={ArrowLeft:i-1,ArrowRight:i+1,Home:0,End:tabs.length-1}[e.key];if(to!==undefined){e.preventDefault();selectTip(to,true);}});});
const plans=[...root.querySelectorAll('[data-plan]')],portrait=root.querySelector('.vn-portrait'),planCopy={firm:['볼의 피부 탄력','피부 두께와 느슨함, 얼굴의 볼륨을 함께 확인합니다.'],line:['턱선 주변','처짐과 볼륨이 분포한 위치를 살펴 적용 부위를 계획합니다.'],fine:['섬세한 눈가','얇고 민감한 눈가의 피부 상태와 적용 가능 여부를 확인합니다.']};
plans.forEach((b,i)=>b.addEventListener('click',()=>{const key=b.dataset.plan,copy=planCopy[key];if(!copy)return;plans.forEach(x=>x.setAttribute('aria-pressed',String(x===b)));portrait.dataset.planVisual=key;root.querySelector('[data-plan-count]').textContent=String(i+1).padStart(2,'0')+' / 03';root.querySelector('[data-plan-title]').textContent=copy[0];root.querySelector('[data-plan-text]').textContent=copy[1];}));
[...bento.querySelectorAll('.vn-tile')].forEach((e,i)=>e.style.setProperty('--i',i));
function assemble(){if(!allowed())return;bento.classList.remove('is-assembling');void bento.offsetWidth;bento.classList.add('is-assembling');bento.dataset.assembled='true';}
root.querySelector('.vn-replay').addEventListener('click',assemble);
motionButton.addEventListener('click',()=>{paused=!paused;motionButton.setAttribute('aria-pressed',String(paused));motionButton.textContent=paused?'모션 재생 ▷':'모션 정지 Ⅱ';if(!paused)manualStep=false;policy();});
function policy(){moving.forEach(e=>e.dataset.motion=allowed()&&visible.has(e)?'playing':'paused');syncFilm();schedule();if(visible.has(bento)&&!bento.dataset.assembled)assemble();if(!allowed())bento.classList.remove('is-assembling');}
if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>{for(const e of entries){if(e.isIntersecting)visible.add(e.target);else visible.delete(e.target);}policy();},{threshold:.08});[...moving,bento].forEach(e=>observer.observe(e));}else{[...moving,bento].forEach(e=>visible.add(e));}
document.addEventListener('visibilitychange',policy);reduced.addEventListener('change',policy);connection?.addEventListener?.('change',policy);
window.addEventListener('pagehide',()=>{film.pause();clearTimeout(timer);moving.forEach(e=>e.dataset.motion='paused');});window.addEventListener('pageshow',policy);selectStep(0);policy();
})();
