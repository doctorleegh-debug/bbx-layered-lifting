(()=>{'use strict';
const section=document.querySelector('.su-official');if(!section)return;
const player=section.querySelector('.su-official-player'),video=section.querySelector('video'),play=section.querySelector('.su-official-play'),error=section.querySelector('.su-official-error');
const reduced=matchMedia('(prefers-reduced-motion:reduce)'),connection=navigator.connection;
let visible=false,pending=false,blocked=false,userStarted=false,leaving=false;
function silence(){if(!video.muted)video.muted=true;if(video.volume!==0)video.volume=0;}
function permitted(){return visible&&!document.hidden&&!leaving&&(userStarted||(!reduced.matches&&!connection?.saveData));}
function fail(){blocked=true;player.dataset.ready='false';play.hidden=true;error.hidden=false;}
function sync(){
 silence();if(!permitted()){video.pause();play.hidden=!error.hidden;return;}
 if(blocked||pending||!video.paused)return;
 if(!video.getAttribute('src')){video.src=video.dataset.src;video.load();}
 pending=true;video.play().then(()=>{if(!permitted())video.pause();}).catch(e=>{if(e.name!=='AbortError'){if(video.error)fail();else{blocked=true;play.hidden=false;}}}).finally(()=>{pending=false;});
}
video.addEventListener('playing',()=>{silence();if(!permitted()){video.pause();return;}player.dataset.ready='true';play.hidden=true;});
video.addEventListener('volumechange',silence);
video.addEventListener('error',()=>{if(video.getAttribute('src'))fail();});
play.addEventListener('click',()=>{userStarted=true;blocked=false;sync();});
if('IntersectionObserver'in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{threshold:.2}).observe(player);else visible=true;
document.addEventListener('visibilitychange',sync);
function preference(){userStarted=false;sync();}
reduced.addEventListener('change',preference);connection?.addEventListener?.('change',preference);
window.addEventListener('pagehide',()=>{leaving=true;sync();});window.addEventListener('pageshow',()=>{leaving=false;sync();});silence();sync();
})();
