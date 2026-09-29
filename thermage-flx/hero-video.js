(()=>{'use strict';
 const video=document.querySelector('#tf-hero-film');
 if(!video||video.dataset.initialized)return;
 video.dataset.initialized='true';
 const stage=video.closest('.tf5-film-hero');if(!stage)return;
 const reduced=matchMedia('(prefers-reduced-motion:reduce)'),connection=navigator.connection;
 let visible=false,blocked=false,pending=false;
 const allowed=()=>visible&&!document.hidden&&!blocked&&!reduced.matches&&!connection?.saveData;
 function sync(){
  if(!allowed()){video.pause();return;}
  if(pending||!video.paused)return;
  if(!video.getAttribute('src')){video.muted=true;video.defaultMuted=true;video.src=video.dataset.src;video.load();}
  pending=true;
  video.play().then(()=>{if(!allowed())video.pause();}).catch(error=>{if(error.name!=='AbortError')blocked=true;}).finally(()=>{pending=false;if(allowed()&&video.paused)sync();});
 }
 video.addEventListener('playing',()=>{stage.dataset.ready='true';});
 video.addEventListener('error',()=>{blocked=true;stage.dataset.ready='false';});
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{threshold:0}).observe(stage);
 document.addEventListener('visibilitychange',sync);
 reduced.addEventListener('change',sync);
 connection?.addEventListener?.('change',sync);
 addEventListener('pagehide',()=>{visible=false;video.pause();});
 addEventListener('pageshow',()=>{const r=stage.getBoundingClientRect();visible=r.bottom>0&&r.top<innerHeight;sync();});
})();
