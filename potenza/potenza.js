(()=>{'use strict';
const root=document.querySelector('#bb-potenza');if(!root)return;
const reduced=matchMedia('(prefers-reduced-motion: reduce)'),connection=navigator.connection;
function tabs(list,select){const buttons=[...list.querySelectorAll('[role="tab"]')];buttons.forEach((button,index)=>{button.addEventListener('click',()=>select(index,true));button.addEventListener('keydown',event=>{const next=['ArrowRight','ArrowDown'].includes(event.key)?(index+1)%buttons.length:['ArrowLeft','ArrowUp'].includes(event.key)?(index+buttons.length-1)%buttons.length:event.key==='Home'?0:event.key==='End'?buttons.length-1:null;if(next===null)return;event.preventDefault();select(next,true);buttons[next].focus();});});return buttons;}
function paint(buttons,index){buttons.forEach((b,i)=>{b.setAttribute('aria-selected',String(i===index));b.tabIndex=i===index?0:-1;document.getElementById(b.getAttribute('aria-controls')).hidden=i!==index;});}
const modeButtons=tabs(root.querySelector('.pt-mode-tabs'),i=>paint(modeButtons,i));
const science=root.querySelector('#science'),art=root.querySelector('.pt-science-art'),label=art.querySelector('.pt-scene-label'),count=art.querySelector('.pt-scene-count');
const labels=['피부에 접촉','미세침 진입','RF 전달'];let step=0,progress=0,visible=false,raf=0,last=0,elapsed=0,holdUntil=0,hidden=false,loaded=false;
const duration=3.6,permitted=()=>visible&&!hidden&&!document.hidden&&!reduced.matches&&!connection?.saveData&&art.dataset.renderer==='webgl';
const stepButtons=tabs(root.querySelector('.pt-step-tabs'),show);
function show(i,manual){step=i;progress=manual?1:0;art.dataset.step=String(i);paint(stepButtons,i);if(manual)holdUntil=performance.now()+8000;draw();}
function draw(){const ready=art.dataset.renderer==='webgl';label.textContent=ready?labels[step]:'RF 전달 개념 이미지';count.textContent=ready?String(step+1).padStart(2,'0')+' / 03':'RF';art.style.setProperty('--pt-progress',String(Math.min(progress,1)));art._ptRender?.(step,progress,elapsed);}
function frame(now){raf=0;if(!permitted())return;const dt=Math.min((now-last)/1000,.08);last=now;elapsed+=dt;
 if(now>=holdUntil&&!science.querySelector('.pt-science-text').contains(document.activeElement)){progress+=dt/duration;if(progress>=1)show((step+1)%3,false);}
 draw();raf=requestAnimationFrame(frame);
}
function sync(){cancelAnimationFrame(raf);raf=0;const run=permitted();art.dataset.running=String(run);if(run){last=performance.now();raf=requestAnimationFrame(frame);}else{if(reduced.matches||connection?.saveData){progress=1;}draw();}}
function loadScript(src){return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.onload=resolve;s.onerror=()=>reject(new Error('Motion dependency unavailable'));document.head.append(s);});}
async function load(){if(loaded)return;loaded=true;try{if(!window.THREE)await loadScript(science.dataset.threeSrc);await loadScript(science.dataset.motionSrc);}catch{art.dataset.renderer='fallback';sync();}}
art.addEventListener('pt-renderer-ready',sync);art.addEventListener('pt-renderer-failed',sync);
if('IntersectionObserver'in window){new IntersectionObserver(entries=>{visible=entries.some(e=>e.isIntersecting);sync();},{threshold:.12}).observe(art);const preloader=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){load();preloader.disconnect();}},{rootMargin:'600px'});preloader.observe(art);}else{visible=true;load();}
document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);connection?.addEventListener?.('change',sync);
window.addEventListener('pagehide',()=>{hidden=true;sync();});window.addEventListener('pageshow',()=>{hidden=false;sync();});show(0,false);
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
