(()=>{'use strict';
document.querySelectorAll('[data-event-books]').forEach(root=>{
 if(root.dataset.ebReady)return;
 const data=root.querySelector('.eb-data');let config;
 try{config=JSON.parse(data.textContent)}catch{return}
 let items=config.items;const books=[...root.querySelectorAll('.eb-book')];
 if(!Array.isArray(items)||!items.length||!books.length)return;
 const safeURL=v=>{try{return new URL(v,location.href).protocol==='https:'||new URL(v,location.href).origin===location.origin}catch{return false}};
 if(items.some(x=>!x||!safeURL(x.url)||!safeURL(x.image)))return;
 root.dataset.ebReady='true';root.classList.add('eb-ready');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),mobile=matchMedia('(max-width: 700px)'),connection=navigator.connection;
 let visible=false,pageHidden=false,timer=null,slot=0,pending=null,transition=null,serial=0,refreshTimer=null,refreshController=null,liveItems=null;
 const indices=books.map((b,i)=>Number(b.dataset.itemIndex)||i);
 const canRun=()=>visible&&!document.hidden&&!pageHidden&&!reduced.matches&&!connection?.saveData&&!root.contains(document.activeElement)&&!(matchMedia('(hover:hover)').matches&&root.matches(':hover'));
 function update(book,item,index){book.dataset.itemIndex=String(index);const link=book.querySelector('.eb-link');link.href=item.url;link.setAttribute('aria-label',item.title+' — '+config.openLabel);book.querySelector('.eb-front .eb-art').src=item.image;book.querySelector('.eb-page .eb-art').src=item.image;book.querySelector('.eb-page .eb-art').alt=item.title;}
 function stop(){clearTimeout(timer);timer=null;serial++;if(transition)transition.finish();}
 function schedule(){clearTimeout(timer);timer=null;if(canRun()&&items.length>(mobile.matches?1:books.length))timer=setTimeout(turn,mobile.matches?6500:3400)}
 async function turn(){timer=null;if(!canRun()||pending||transition){schedule();return}const bookSlot=mobile.matches?0:slot,book=books[bookSlot];slot=(slot+1)%books.length;const next=(indices[bookSlot]+(mobile.matches?1:books.length))%items.length;if(next===indices[bookSlot]){schedule();return}const item=items[next],token=serial,img=new Image();pending=img;img.src=item.image;
  try{await img.decode()}catch{pending=null;schedule();return}
  pending=null;if(token!==serial||!canRun()){schedule();return}
  const leaf=book.querySelector('.eb-leaf');book.querySelector('.eb-page .eb-art').src=item.image;book.style.zIndex='4';
  const anim=leaf.animate([{transform:'rotateY(0deg)',opacity:1,offset:0},{transform:'rotateY(-105deg)',opacity:1,offset:.66},{transform:'rotateY(-165deg)',opacity:0,offset:1}],{duration:1500,easing:'cubic-bezier(.35,0,.25,1)',fill:'forwards'});
  let done=false;const finish=()=>{if(done)return;done=true;indices[bookSlot]=next;update(book,item,next);anim.cancel();book.style.zIndex='';transition=null;schedule()};transition={finish,anim};anim.finished.then(finish,()=>{});
 }
 function applyLive(){if(!liveItems||root.contains(document.activeElement)||(matchMedia('(hover:hover)').matches&&root.matches(':hover')))return;stop();items=liveItems;liveItems=null;slot=0;books.forEach((b,i)=>{b.hidden=i>=items.length;if(!b.hidden){indices[i]=i;update(b,items[i],i)}});root.dataset.ebLive='connected';root.dataset.ebUpdatedAt=new Date().toISOString();root.dispatchEvent(new CustomEvent('bb:eventsupdated',{detail:{count:items.length}}));schedule()}
 async function refresh(){clearTimeout(refreshTimer);if(document.hidden||pageHidden||refreshController)return;refreshController=new AbortController();const timeout=setTimeout(()=>refreshController?.abort(),25000);try{const fresh=await window.BBEventFeed.read(config.source,{limit:12,signal:refreshController.signal});await Promise.all(fresh.slice(0,3).map(x=>{const image=new Image();image.src=x.image;return image.decode()}));liveItems=fresh;applyLive()}catch{root.dataset.ebLive=root.dataset.ebUpdatedAt?'cached':'unavailable'}finally{clearTimeout(timeout);refreshController=null;if(!document.hidden&&!pageHidden)refreshTimer=setTimeout(refresh,Math.max(60000,Number(config.refreshMs)||300000))}}
 const sameOrigin=config.source&&new URL(config.source,location.href).origin===location.origin;
 root.addEventListener('bb:refresh-events',()=>{if(sameOrigin&&window.BBEventFeed)refresh()});
 function sync(){stop();applyLive();root.dataset.ebMotion=canRun()?'playing':'paused';if(visible){root.classList.add('eb-entered')}schedule();if(document.hidden||pageHidden){clearTimeout(refreshTimer);refreshTimer=null;refreshController?.abort()}else if(sameOrigin&&window.BBEventFeed&&!refreshTimer&&!refreshController)refresh()}
 if('IntersectionObserver'in window){new IntersectionObserver(es=>{visible=es[0].isIntersecting;sync()},{threshold:.08}).observe(root)}else{visible=true}
 root.addEventListener('pointerenter',sync);root.addEventListener('pointerleave',sync);
 root.addEventListener('focusin',sync);root.addEventListener('focusout',()=>queueMicrotask(sync));
 mobile.addEventListener('change',()=>{stop();const first=indices[0];books.forEach((book,i)=>{indices[i]=(first+i)%items.length;update(book,items[indices[i]],indices[i])});slot=0;sync()});
 document.addEventListener('visibilitychange',sync);window.addEventListener('pagehide',()=>{pageHidden=true;sync()});window.addEventListener('pageshow',()=>{pageHidden=false;sync()});reduced.addEventListener('change',sync);connection?.addEventListener?.('change',sync);root.dataset.ebLive=sameOrigin?'loading':'preview';sync();
});})();
