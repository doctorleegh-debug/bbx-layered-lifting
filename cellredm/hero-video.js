(()=>{'use strict';
 const video=document.querySelector('#cr-hero-film');
 if(!video||video.dataset.initialized)return;
 video.dataset.initialized='true';
 const stage=video.closest('.cr-video-stage'),button=stage.querySelector('.cr-video-toggle');
 const reduced=matchMedia('(prefers-reduced-motion:reduce)'),connection=navigator.connection;
 let visible=false,userPaused=false,userStarted=false,blocked=false,pending=false;
 const allowed=()=>visible&&!document.hidden&&!userPaused&&!blocked&&(userStarted||(!reduced.matches&&!connection?.saveData));
 const label=()=>{button.textContent=video.paused?'영상 재생 ▶':'일시정지 Ⅱ';button.setAttribute('aria-label',video.paused?'셀르디엠 영상 재생':'셀르디엠 영상 일시정지');};
 function sync(){
  if(!allowed()){video.pause();label();return;}
  if(pending||!video.paused)return;
  if(!video.getAttribute('src')){video.muted=true;video.defaultMuted=true;video.src=video.dataset.src;video.load();}
  pending=true;
  video.play().then(()=>{if(!allowed())video.pause();}).catch(error=>{if(error.name!=='AbortError')blocked=true;}).finally(()=>{pending=false;label();if(allowed()&&video.paused)sync();});
 }
 button.hidden=false;
 button.addEventListener('click',()=>{
  if(!video.paused||pending){userPaused=true;sync();return;}
  userPaused=false;userStarted=true;blocked=false;
  if(video.error){video.removeAttribute('src');stage.dataset.ready='false';}
  sync();
 });
 video.addEventListener('playing',()=>{stage.dataset.ready='true';label();});
 video.addEventListener('pause',label);
 video.addEventListener('error',()=>{blocked=true;stage.dataset.ready='false';label();});
 const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{threshold:0});observer.observe(stage);
 document.addEventListener('visibilitychange',sync);
 reduced.addEventListener('change',()=>{userStarted=false;sync();});
 connection?.addEventListener?.('change',()=>{userStarted=false;sync();});
 addEventListener('pagehide',()=>{visible=false;video.pause();});
 addEventListener('pageshow',()=>{const r=stage.getBoundingClientRect();visible=r.bottom>0&&r.top<innerHeight;sync();});
 label();
})();
