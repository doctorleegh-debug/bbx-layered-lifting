(()=>{'use strict';
const root=document.querySelector('#bb-potenza');if(!root)return;
const reduced=matchMedia('(prefers-reduced-motion: reduce)'),connection=navigator.connection;
// Manual tabs use a roving tab stop and retain focus throughout selection.
function tabs(list,select){
 const buttons=[...list.querySelectorAll('[role="tab"]')];
 buttons.forEach((button,index)=>{
  button.addEventListener('click',()=>select(index,true));
  button.addEventListener('keydown',event=>{
   const next=event.key==='ArrowRight'||event.key==='ArrowDown'?(index+1)%buttons.length:event.key==='ArrowLeft'||event.key==='ArrowUp'?(index+buttons.length-1)%buttons.length:event.key==='Home'?0:event.key==='End'?buttons.length-1:null;
   if(next===null)return;event.preventDefault();select(next,true);buttons[next].focus();
  });
 });return buttons;
}
function paint(buttons,index){buttons.forEach((button,i)=>{const active=i===index;button.setAttribute('aria-selected',String(active));button.tabIndex=active?0:-1;const panel=document.getElementById(button.getAttribute('aria-controls'));if(panel)panel.hidden=!active;});}
const modes=root.querySelector('.pt-mode-tabs');const modeButtons=tabs(modes,index=>paint(modeButtons,index));
const science=root.querySelector('#science'),art=root.querySelector('.pt-science-art');let step=0,visible=false,timer=null,holdUntil=0,pageHidden=false;
const permitted=()=>visible&&!document.hidden&&!pageHidden&&!reduced.matches&&!connection?.saveData&&!science.contains(document.activeElement);
function schedule(){clearTimeout(timer);timer=null;art.dataset.running=String(permitted());if(permitted())timer=setTimeout(()=>{step=(step+1)%3;show(step,false)},Math.max(2200,holdUntil-Date.now()));}
function show(index,manual){step=index;art.dataset.step=String(index);paint(stepButtons,index);if(manual)holdUntil=Date.now()+8000;schedule();}
const stepButtons=tabs(root.querySelector('.pt-step-tabs'),show);
if('IntersectionObserver'in window)new IntersectionObserver(entries=>{visible=entries.some(entry=>entry.isIntersecting);schedule()},{threshold:.18}).observe(art);else{visible=true;schedule();}
science.addEventListener('focusin',schedule);science.addEventListener('focusout',()=>queueMicrotask(schedule));
document.addEventListener('visibilitychange',schedule);reduced.addEventListener('change',schedule);connection?.addEventListener?.('change',schedule);
window.addEventListener('pagehide',()=>{pageHidden=true;schedule()});window.addEventListener('pageshow',()=>{pageHidden=false;schedule()});
// Native details remain readable and operable without JavaScript.
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
