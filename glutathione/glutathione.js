(()=>{'use strict';
 const root=document.getElementById('bb-glutathione');if(!root)return;
 const mq=matchMedia('(prefers-reduced-motion: reduce)'),reduce=()=>mq.matches||!!navigator.connection?.saveData;
 // Readable content is present before enhancement. No image load gates the copy.
 const tabs=[...root.querySelectorAll('.gt-visit-tabs [role=tab]')];let selected=0;
 const select=n=>{selected=n;tabs.forEach((b,i)=>{b.setAttribute('aria-selected',String(i===n));b.tabIndex=i===n?0:-1;document.getElementById(b.getAttribute('aria-controls')).hidden=i!==n;});};
 tabs.forEach((b,i)=>{b.addEventListener('click',()=>select(i));b.addEventListener('keydown',e=>{let n;if(e.key==='ArrowRight'||e.key==='ArrowDown')n=(selected+1)%tabs.length;else if(e.key==='ArrowLeft'||e.key==='ArrowUp')n=(selected+tabs.length-1)%tabs.length;else if(e.key==='Home')n=0;else if(e.key==='End')n=tabs.length-1;else return;e.preventDefault();select(n);tabs[n].focus();});});
 const once=new Set(),loops=new Map();let offPage=false;
 function sync(){loops.forEach((r,el)=>{const run=r.visible&&!reduce()&&!document.hidden&&!offPage;if(run)r.animation.play();else r.animation.pause();el.dataset.running=String(run);});if(reduce())once.forEach(a=>a.cancel());}
 if('IntersectionObserver' in window&&Element.prototype.animate){
  const reveals=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;reveals.unobserve(e.target);e.target.dataset.revealed='true';if(reduce())return;const nodes=e.target.matches('.gt-hero-copy')?[...e.target.children]:[...e.target.querySelectorAll('.gt-line>span')];nodes.forEach((n,i)=>{const a=n.animate([{transform:'translateY(70px)',opacity:0},{transform:'translateY(0)',opacity:1}],{duration:650,delay:i*80,easing:'cubic-bezier(.2,.75,.25,1)',fill:'backwards'});once.add(a);a.finished.then(()=>once.delete(a),()=>once.delete(a));});}),{threshold:.14});
  document.fonts.ready.then(()=>root.querySelectorAll('.gt-display,.gt-hero-copy').forEach(el=>reveals.observe(el)));
  const observer=new IntersectionObserver(es=>{es.forEach(e=>{const r=loops.get(e.target);if(r)r.visible=e.isIntersecting;});sync();},{threshold:.08});
  root.querySelectorAll('[data-float]').forEach((el,i)=>{const im=el.querySelector('img');const a=im.animate([{transform:'translateY(0) rotate(-2deg)'},{transform:'translateY(-10px) rotate(2deg)'},{transform:'translateY(0) rotate(-2deg)'}],{duration:6500+i*450,iterations:Infinity,easing:'ease-in-out'});a.pause();loops.set(el,{animation:a,visible:false});observer.observe(el);});
  const el=root.querySelector('.gt-infusion'),light=el.querySelector('.gt-light-pass');const a=light.animate([{transform:'translateX(-45%)',opacity:0},{transform:'translateX(-15%)',opacity:.24,offset:.4},{transform:'translateX(45%)',opacity:0,offset:.85},{transform:'translateX(45%)',opacity:0}],{duration:8500,iterations:Infinity,easing:'ease-in-out'});a.pause();loops.set(el,{animation:a,visible:false});observer.observe(el);
 }
 mq.addEventListener('change',sync);navigator.connection?.addEventListener?.('change',sync);document.addEventListener('visibilitychange',sync);addEventListener('pagehide',()=>{offPage=true;sync();});addEventListener('pageshow',()=>{offPage=false;sync();});
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
