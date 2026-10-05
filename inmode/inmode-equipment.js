/* Damped-spring assembly; native grid owns final positions, transforms never layout. */
(()=>{'use strict';const root=document.getElementById('bb-inmode');if(!root)return;
const reduced=matchMedia('(prefers-reduced-motion: reduce)'),connection=navigator.connection;
const grid=root.querySelector('.im-bento'),hero=root.querySelector('.im-equipment-hero');
const tiles=[...grid.querySelectorAll('.im-bento-tile')];let animations=[],entered=false,hidden=false;
const allowed=()=>!reduced.matches&&!connection?.saveData&&!document.hidden;
function settle(){animations.forEach(a=>a.cancel());animations=[];tiles.forEach(t=>{t.style.opacity='';t.style.transform=''});hidden=false;}
function springFrames(i){const frames=[],zeta=.65,omega=14.5,wd=omega*Math.sqrt(1-zeta*zeta),distance=i===0?62:85;
 for(let n=0;n<=60;n++){const q=n/60,t=q*.94,displacement=Math.exp(-zeta*omega*t)*(Math.cos(wd*t)+zeta/Math.sqrt(1-zeta*zeta)*Math.sin(wd*t));frames.push({offset:q,opacity:Math.min(1,q*5),transform:`translate3d(${(i%2?1:-1)*displacement*7}px,${distance*displacement}px,0) rotate(${(i%2?1:-1)*displacement*2.2}deg) scale(${1-.035*displacement})`});}
 frames[60]={offset:1,opacity:1,transform:'none'};return frames;}
function assemble(){settle();entered=true;grid.dataset.assembled='true';if(!allowed()||!Element.prototype.animate)return;
 tiles.forEach((tile,i)=>{const a=tile.animate(springFrames(i),{duration:940,delay:i*65,easing:'linear',fill:'both'});animations.push(a);a.onfinish=()=>a.cancel();});}
const replay=grid.querySelector('.im-bento-replay');replay.addEventListener('click',assemble);
// Content is readable without JS; only arm hidden entry when observers and animations exist.
if('IntersectionObserver'in window&&Element.prototype.animate&&allowed()){
 tiles.forEach(t=>t.style.opacity='0');hidden=true;
 const obs=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){assemble();obs.disconnect();}},{threshold:.12});obs.observe(grid);
}else{entered=true;grid.dataset.assembled='true';}
grid.addEventListener('focusin',()=>{settle();entered=true;grid.dataset.assembled='true'});
let heroAnimations=[];
function heroPlay(visible){heroAnimations.forEach(a=>a.cancel());heroAnimations=[];if(!visible||!allowed()||!Element.prototype.animate)return;
 const machine=hero.querySelector('.im-equipment-machine');heroAnimations.push(machine.animate([{transform:'translateY(18px) scale(.97)',opacity:.4},{transform:'translateY(-3px) scale(1.005)',opacity:1,offset:.7},{transform:'none',opacity:1}],{duration:1300,easing:'cubic-bezier(.16,1,.3,1)',fill:'none'}));
 hero.querySelectorAll('.im-equipment-label').forEach((el,i)=>heroAnimations.push(el.animate([{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'none'}],{duration:600,delay:450+i*140,fill:'backwards',easing:'cubic-bezier(.16,1,.3,1)'})));
}
if('IntersectionObserver'in window){const ob=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){heroPlay(true);ob.disconnect()}},{threshold:.2});ob.observe(hero);}
function policy(){if(!allowed()){settle();heroPlay(false);if(hidden||entered)grid.dataset.assembled='true';}}
reduced.addEventListener('change',policy);connection?.addEventListener?.('change',policy);document.addEventListener('visibilitychange',policy);
window.addEventListener('pagehide',()=>{settle();heroPlay(false)});
window.__inmodeBento={replay:assemble,state:()=>({entered,tiles:tiles.length,running:animations.filter(a=>a.playState==='running').length,reduced:reduced.matches})};
})();
