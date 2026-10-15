(()=>{'use strict';
 const root=document.getElementById('bb-cryo');if(!root)return;
 const mq=matchMedia('(prefers-reduced-motion: reduce)'),reduced=()=>mq.matches||!!navigator.connection?.saveData;
 const flow=root.querySelector('.cr-flow'),tabs=[...flow.querySelectorAll('[role=tab]')],panels=tabs.map(t=>document.getElementById(t.getAttribute('aria-controls'))),toggle=flow.querySelector('.cr-motion-toggle');
 let current=0,manual=false,visible=false,offPage=false,timer=0;
 const motions=new Map(),reveals=new Set();
 function schedule(reset=false){const run=visible&&!manual&&!reduced()&&!document.hidden&&!offPage;if(run&&timer&&!reset)return;clearTimeout(timer);timer=0;flow.dataset.running=String(run);toggle.setAttribute('aria-pressed',String(manual));const label=manual?'단계 자동 전환 재생':'단계 자동 전환 일시정지';toggle.setAttribute('aria-label',label);toggle.querySelector('.cr-sr').textContent=label;toggle.querySelector('.cr-toggle-icon').textContent=manual?'▷':'Ⅱ';toggle.hidden=reduced()||!('IntersectionObserver' in window);if(run)timer=setTimeout(()=>{timer=0;select((current+1)%tabs.length,false)},6000);}
 function select(index,user){if(user)manual=true;current=index;tabs.forEach((t,i)=>{t.setAttribute('aria-selected',String(i===index));t.tabIndex=i===index?0:-1;panels[i].hidden=i!==index;});flow.dataset.active=String(index);schedule(true);if(!reduced()&&Element.prototype.animate){const a=panels[index].animate([{opacity:.3,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:450,easing:'ease-out'});reveals.add(a);a.finished.then(()=>reveals.delete(a),()=>reveals.delete(a));}}
 tabs.forEach((tab,i)=>{tab.addEventListener('click',()=>select(i,true));tab.addEventListener('keydown',e=>{let n;if(e.key==='ArrowRight'||e.key==='ArrowDown')n=(current+1)%tabs.length;else if(e.key==='ArrowLeft'||e.key==='ArrowUp')n=(current+tabs.length-1)%tabs.length;else if(e.key==='Home')n=0;else if(e.key==='End')n=tabs.length-1;else return;e.preventDefault();select(n,true);tabs[n].focus();});});
 toggle.addEventListener('click',()=>{manual=!manual;schedule(true)});
 flow.addEventListener('focusin',e=>{if(!toggle.contains(e.target)){manual=true;schedule();}});
 function sync(){motions.forEach((inView,el)=>el.dataset.running=String(inView&&!reduced()&&!document.hidden&&!offPage));schedule();if(reduced())reveals.forEach(a=>a.cancel());}
 if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.target===flow)visible=e.isIntersecting;else motions.set(e.target,e.isIntersecting);});sync();},{threshold:.12});observer.observe(flow);root.querySelectorAll('[data-motion]').forEach(el=>{motions.set(el,false);observer.observe(el)});
 const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(!e.isIntersecting)return;revealObserver.unobserve(e.target);e.target.dataset.revealed='true';if(reduced()||!Element.prototype.animate)return;[...e.target.children].forEach((el,i)=>{const a=el.animate([{opacity:0,transform:'translateY(32px)'},{opacity:1,transform:'translateY(0)'}],{duration:650,delay:i*75,easing:'cubic-bezier(.2,.75,.25,1)',fill:'backwards'});reveals.add(a);a.finished.then(()=>reveals.delete(a),()=>reveals.delete(a))});}),{threshold:.12});Promise.resolve(document.fonts?.ready).then(()=>root.querySelectorAll('[data-reveal]').forEach(el=>revealObserver.observe(el)));}
 if(mq.addEventListener)mq.addEventListener('change',sync);else mq.addListener(sync);navigator.connection?.addEventListener?.('change',sync);document.addEventListener('visibilitychange',sync);addEventListener('pagehide',()=>{offPage=true;sync()});addEventListener('pageshow',()=>{offPage=false;sync()});sync();
})();

/* Shared contact enhancement */
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
