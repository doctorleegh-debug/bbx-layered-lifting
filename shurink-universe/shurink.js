(()=>{'use strict';
const root=document.getElementById('bb-shurink');if(!root)return;
const reduced=matchMedia('(prefers-reduced-motion:reduce)'),mobile=matchMedia('(max-width:700px)'),connection=navigator.connection;
const permitted=()=>!document.hidden&&!reduced.matches&&!connection?.saveData;
const visible=new Set(),moving=[...root.querySelectorAll('.su-motion')],film=root.querySelector('.su-film'),hero=root.querySelector('.su-hero');
let filmKey='',filmEpoch=0,pending=false,blocked=false;
function resetFilm(){filmEpoch++;pending=false;film.pause();hero.dataset.ready='false';film.removeAttribute('src');film.load();filmKey='';blocked=false;}
function syncFilm(){
 if(!permitted()||!visible.has(hero)){film.pause();return;}
 const source=mobile.matches?film.dataset.mobile:film.dataset.desktop;
 if(filmKey!==source){resetFilm();filmKey=source;film.src=source;film.muted=true;film.load();}
 if(blocked||pending||!film.paused)return;
 const epoch=filmEpoch;pending=true;
 film.play().then(()=>{if(epoch===filmEpoch&&(!permitted()||!visible.has(hero)))film.pause();}).catch(e=>{if(epoch===filmEpoch&&e.name!=='AbortError'){blocked=true;hero.dataset.ready='false';}}).finally(()=>{if(epoch===filmEpoch)pending=false;});
}
film.addEventListener('playing',()=>{hero.dataset.ready='true';if(!permitted()||!visible.has(hero))film.pause();});
film.addEventListener('error',()=>{if(film.getAttribute('src')){blocked=true;hero.dataset.ready='false';}});
mobile.addEventListener('change',()=>{resetFilm();syncFilm();});
const tabs=[...root.querySelectorAll('.su-tabs [role=tab]')],tissue=root.querySelector('.su-tissue'),cone=root.querySelector('.su-cone'),waves=[...root.querySelectorAll('.su-wave-lines path')],focus=root.querySelector('.su-focus-point');
const levels={'1.5':540,'2.0':595,'3.0':700,'4.5':815};
function selectDepth(index,keyboard=false){
 index=(index+tabs.length)%tabs.length;
 tabs.forEach((t,i)=>{const on=index===i;t.setAttribute('aria-selected',String(on));t.tabIndex=on?0:-1;document.getElementById(t.getAttribute('aria-controls')).hidden=!on;});
 const tab=tabs[index],depth=tab.dataset.depth,y=levels[depth];tissue.dataset.depth=depth;root.querySelector('[data-focus-label]').textContent=depth;
 cone.setAttribute('d',`M590 390 Q740 360 890 390 L740 ${y} Z`);
 waves.forEach((w,i)=>{const t=(i+1)/4,half=150*(1-t),wy=390+(y-390)*t;w.setAttribute('d',`M${740-half} ${wy} Q740 ${wy+34*(1-t)} ${740+half} ${wy}`);});
 focus.querySelectorAll('[cy]').forEach(e=>e.setAttribute('cy',String(y)));
 if(keyboard)tab.focus();
}
tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>selectDepth(i));tab.addEventListener('keydown',e=>{const to={ArrowLeft:i-1,ArrowRight:i+1,Home:0,End:tabs.length-1}[e.key];if(to!==undefined){e.preventDefault();selectDepth(to,true);}});});selectDepth(0);
const planCopy={firm:['피부 두께와 탄력','겉으로 보이는 처짐과 피부의 두께를 함께 살펴요.'],line:['얼굴의 선','얼굴의 굴곡과 볼륨 분포를 살펴 적용 부위를 정해요.'],balance:['나에게 맞는 강도','이전 시술과 피부 반응을 확인해 깊이와 강도를 계획해요.']};
const planButtons=[...root.querySelectorAll('[data-plan]')];
planButtons.forEach(b=>b.addEventListener('click',()=>{const copy=planCopy[b.dataset.plan];if(!copy)return;planButtons.forEach(x=>x.setAttribute('aria-pressed',String(x===b)));root.querySelector('[data-plan-title]').textContent=copy[0];root.querySelector('[data-plan-text]').textContent=copy[1];}));
const bento=root.querySelector('.su-bento');[...bento.children].forEach((e,i)=>e.style.setProperty('--i',i));
const gallery=root.querySelector('.clinic-gallery'),shots=gallery?[...gallery.querySelectorAll('.clinic-shot')]:[];let shot=0,timer=0,touch=null;
function show(n){if(!shots.length)return;shot=(n+shots.length)%shots.length;shots.forEach((s,i)=>{s.classList.toggle('active',i===shot);s.setAttribute('aria-hidden',String(i!==shot));});}
function scheduleGallery(){clearTimeout(timer);if(!gallery||!visible.has(gallery)||!permitted()||gallery.matches(':focus-within'))return;timer=setTimeout(()=>{show(shot+1);scheduleGallery();},4800);}
if(gallery){show(0);gallery.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();show(e.key==='Home'?0:e.key==='End'?shots.length-1:shot+(e.key==='ArrowLeft'?-1:1));scheduleGallery();}});gallery.addEventListener('focusin',scheduleGallery);gallery.addEventListener('focusout',()=>setTimeout(scheduleGallery,0));gallery.addEventListener('touchstart',e=>{if(e.touches.length===1)touch=[e.touches[0].clientX,e.touches[0].clientY];},{passive:true});gallery.addEventListener('touchend',e=>{if(!touch||!e.changedTouches.length)return;const dx=e.changedTouches[0].clientX-touch[0],dy=e.changedTouches[0].clientY-touch[1];touch=null;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)){show(shot+(dx<0?1:-1));scheduleGallery();}},{passive:true});}
function policy(){moving.forEach(e=>e.dataset.motion=permitted()&&visible.has(e)?'playing':'paused');syncFilm();scheduleGallery();if(visible.has(bento)&&permitted()&&!bento.dataset.assembled){bento.dataset.assembled='true';bento.classList.add('is-assembled');}}
if('IntersectionObserver'in window){const io=new IntersectionObserver(entries=>{for(const e of entries){if(e.isIntersecting)visible.add(e.target);else visible.delete(e.target);}policy();},{threshold:.08});[...moving,bento,...(gallery?[gallery]:[])].forEach(e=>io.observe(e));}else{[...moving,bento,...(gallery?[gallery]:[])].forEach(e=>visible.add(e));}
document.addEventListener('visibilitychange',policy);reduced.addEventListener('change',policy);connection?.addEventListener?.('change',policy);window.addEventListener('pagehide',()=>{film.pause();clearTimeout(timer);moving.forEach(e=>e.dataset.motion='paused');});window.addEventListener('pageshow',policy);policy();
})();
