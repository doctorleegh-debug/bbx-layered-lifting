(()=>{'use strict';
const root=document.getElementById('bb-potenza');if(!root)return;
const mq=matchMedia('(prefers-reduced-motion: reduce)');const save=()=>!!navigator.connection?.saveData;const reduced=()=>mq.matches||save();
function tabs(list,prefix,callback){const buttons=[...root.querySelectorAll(list+' [role=tab]')];let selected=0;const set=(n,manual=false)=>{selected=n;buttons.forEach((b,i)=>{b.setAttribute('aria-selected',String(i===n));b.tabIndex=i===n?0:-1;document.getElementById(prefix+i).hidden=i!==n;});callback?.(n,manual);};buttons.forEach((b,i)=>{b.addEventListener('click',()=>set(i,true));b.addEventListener('keydown',e=>{let n;if(e.key==='ArrowRight'||e.key==='ArrowDown')n=(selected+1)%buttons.length;else if(e.key==='ArrowLeft'||e.key==='ArrowUp')n=(selected+buttons.length-1)%buttons.length;else if(e.key==='Home')n=0;else if(e.key==='End')n=buttons.length-1;else return;e.preventDefault();set(n,true);buttons[n].focus();});});return set;}
tabs('.pt-mode-tabs','pt-mode-');
const figure=root.querySelector('.pt-science-art'),scene=figure.querySelector('.pt-scene'),layers=figure.querySelector('.pt-motion-assets'),needle=figure.querySelector('.pt-needles'),head=figure.querySelector('.pt-cartridge'),rf=figure.querySelector('.pt-rf-fields'),coag=figure.querySelector('.pt-coagulation'),fallback=figure.querySelector('.pt-scene-fallback');
let visible=false,ready=false,raf=0,last=0,time=0,step=-1,manualUntil=0,disposed=false;const cycle=10500;const labels=['피부와 접촉','고주파 에너지 전달','응고 영역 형성'];
const clamp=x=>Math.max(0,Math.min(1,x));const smooth=x=>{x=clamp(x);return x*x*(3-2*x);};
const setStep=tabs('.pt-step-tabs','pt-step-',(n,manual)=>{if(manual){time=[1000,5100,8500][n];manualUntil=performance.now()+9000;draw(time);}step=n;figure.dataset.step=String(n);figure.querySelector('.pt-scene-label').textContent=labels[n];figure.querySelector('.pt-scene-count').textContent=`0${n+1} / 03`;fallback.src=`assets/source-step-${n+1}.jpg`;fallback.alt=labels[n]+' 원리 이미지';});
function draw(t){const insertion=smooth((t-1800)/1600)*(1-smooth((t-6900)/1200));const lift=smooth((t-7300)/800)*(1-smooth((t-9400)/1000));needle.style.transform=`translateY(${insertion*49.778-lift*18}%)`;figure.querySelector('.pt-needle-clip').style.clipPath=`inset(${13-lift*10.8}% 0 0)`;head.style.transform=`translateY(${-lift*12}%)`;rf.style.opacity=String(smooth((t-3800)/650)*(1-smooth((t-6600)/500))*(.82+.18*Math.sin(t/230)));coag.style.opacity=String(smooth((t-7000)/750)*(1-smooth((t-9400)/950))*.88);const n=t<3650?0:t<7150?1:2;if(n!==step)setStep(n);figure.dataset.phase=String(Math.round(t));root.querySelectorAll('.pt-step-progress').forEach((e,i)=>{const v=i===n?clamp((t-[0,3650,7150][i])/[3650,3500,3350][i]):0;e.style.transform=`scaleX(${v})`;});}
function permitted(){return ready&&visible&&!document.hidden&&!reduced()&&!disposed;}
function stop(){if(raf)cancelAnimationFrame(raf);raf=0;last=0;figure.dataset.running='false';}
function tick(now){raf=0;if(!permitted()){stop();return;}const reading=[root.querySelector('.pt-step-tabs'),root.querySelector('.pt-step-details')].some(e=>e?.contains(document.activeElement));if(last&&now>manualUntil&&!reading)time=(time+Math.min(now-last,80))%cycle;last=now;draw(time);figure.dataset.running='true';raf=requestAnimationFrame(tick);}
function sync(){if(permitted()&&!raf){last=0;raf=requestAnimationFrame(tick);}else if(!permitted())stop();}
new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{threshold:.08}).observe(scene);
document.addEventListener('visibilitychange',sync);mq.addEventListener('change',()=>{if(reduced()){time=5100;draw(time);}sync();});navigator.connection?.addEventListener?.('change',sync);window.addEventListener('pagehide',()=>{disposed=true;stop();});window.addEventListener('pageshow',()=>{disposed=false;sync();});
Promise.all([...layers.querySelectorAll('img')].map(img=>{img.loading='eager';return img.decode();})).then(()=>{ready=true;layers.hidden=false;fallback.hidden=true;figure.dataset.renderer='layered-source';if(reduced())time=5100;draw(time);sync();}).catch(()=>{ready=false;layers.hidden=true;fallback.hidden=false;figure.dataset.renderer='source-fallback';stop();});
// Text is always visible without JavaScript. Only the compositor transforms the existing readable lines.
const animations=new Set();const reveal=(el)=>{if(el.dataset.revealed)return;el.dataset.revealed='true';if(reduced())return;const targets=el.matches('.pt-hero-copy')?[...el.children]:[...el.querySelectorAll('.pt-line>span')];targets.forEach((node,i)=>{const a=node.animate([{transform:'translateY(110%)',opacity:0},{transform:'translateY(0)',opacity:1}],{duration:650,delay:i*80,easing:'cubic-bezier(.2,.75,.25,1)',fill:'backwards'});animations.add(a);a.finished.then(()=>animations.delete(a),()=>animations.delete(a));});};
document.fonts.ready.then(()=>{const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){reveal(e.target);io.unobserve(e.target);}}),{threshold:.15});root.querySelectorAll('.pt-display,.pt-hero-copy').forEach(el=>io.observe(el));});
mq.addEventListener('change',()=>{if(reduced())animations.forEach(a=>a.cancel());});
})();

;(()=>{function contactLayout(content){
  const contact=content.querySelector('.contact');if(!contact||contact.hasAttribute('data-bb-contact'))return;
  const display=contact.querySelector('.display'),title=contact.querySelector('h2'),info=contact.querySelector('.info'),headings=info?.querySelectorAll('h3'),address=info?.querySelector('address'),hours=info?.querySelector('p');
  if(!display||!title||headings?.length!==2||!address||!hours)return;
  const heading=document.createElement('div');heading.className='bb-visit-heading';display.before(heading);heading.append(display,title);
  const paths={pin:'M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z M15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',clock:'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z M12 6v6l4 2'};
  for(const [h,text,kind] of [[headings[0],address,'pin'],[headings[1],hours,'clock']]){
   const block=document.createElement('div');block.className='bb-visit-block';h.before(block);
   const icon=document.createElement('span');icon.className='bb-visit-icon';icon.setAttribute('aria-hidden','true');
   const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 24 24');const path=document.createElementNS(svg.namespaceURI,'path');path.setAttribute('d',paths[kind]);svg.append(path);icon.append(svg);h.prepend(icon);block.append(h,text);
  }
  const actions=contact.querySelector('.actions');if(actions)actions.style.setProperty('--bb-contact-actions',Math.max(1,actions.children.length));
  contact.dataset.bbContact='20261006-r4';contact.dataset.suContact='r02';
 }

contactLayout(document.querySelector("#pt-common"));})();

;(()=>{
 const hero=document.querySelector('#bb-potenza .pt-hero');
 if(!hero||hero.dataset.potenzaHeroZoomReady)return;
 hero.dataset.potenzaHeroZoomReady='true';
 let visible=true,away=false;
 const sync=()=>hero.style.setProperty('--pt-hero-play',visible&&!document.hidden&&!away?'running':'paused');
 if('IntersectionObserver' in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{threshold:0}).observe(hero);
 document.addEventListener('visibilitychange',sync);
 window.addEventListener('pagehide',()=>{away=true;sync();});
 window.addEventListener('pageshow',()=>{away=false;sync();});
 sync();
})();
