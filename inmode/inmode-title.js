/* Per-character word swap: 400ms rotation, 44ms stagger; static accessible title. */
(()=>{'use strict';const title=document.getElementById('hero-title');if(!title)return;
const reduced=matchMedia('(prefers-reduced-motion: reduce)'),a='윤곽과 탄력을',b='탄력과 윤곽을';
title.setAttribute('aria-label','윤곽과 탄력을 함께 살피다.');title.textContent='';
const line=document.createElement('span');line.className='im-flip-line';line.tabIndex=0;line.setAttribute('role','button');line.setAttribute('aria-label','타이틀 모션 보기');
for(let i=0;i<a.length;i++){const cell=document.createElement('span');cell.className='im-flip-glyph';for(const[t,c]of[[a[i],'im-flip-front'],[b[i],'im-flip-back']]){const el=document.createElement('span');el.className=c;el.textContent=t===' '?'\u00a0':t;cell.append(el)}line.append(cell)}
const second=document.createElement('span');second.className='im-flip-line';second.textContent='함께 살피다.';second.setAttribute('aria-hidden','true');title.append(line,second);
let animations=[],swapped=false,enterTimer;function settle(back){animations.forEach(x=>x.cancel());animations=[];swapped=back;for(const cell of line.children){cell.firstChild.style.transform=back?'rotateX(90deg)':'rotateX(0)';cell.lastChild.style.transform=back?'rotateX(0)':'rotateX(-90deg)';cell.lastChild.style.visibility=back?'visible':'hidden'}}
function swap(back){if(reduced.matches||!line.animate){settle(false);return}if(swapped===back)return;const from=swapped;settle(from);swapped=back;
[...line.children].forEach((c,i)=>{c.lastChild.style.visibility='visible';const frames=back?[[0,90],[-90,0]]:[[90,0],[0,-90]];[...c.children].forEach((el,j)=>{const anim=el.animate(frames[j].map(d=>({transform:`rotateX(${d}deg)`})),{duration:400,delay:i*44,easing:'cubic-bezier(.2,.7,.2,1)',fill:'forwards'});animations.push(anim);anim.onfinish=()=>{el.style.transform=`rotateX(${frames[j][1]}deg)`;if(j===1&&!back)el.style.visibility='hidden';anim.cancel()}})})}
line.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')swap(true)});line.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse'&&document.activeElement!==line)swap(false)});line.addEventListener('focus',()=>swap(true));line.addEventListener('blur',()=>swap(false));line.addEventListener('click',()=>swap(!swapped));line.addEventListener('keydown',e=>{if(['Enter',' '].includes(e.key)){e.preventDefault();swap(!swapped)}});
if(!reduced.matches){enterTimer=setTimeout(()=>{swap(true);enterTimer=setTimeout(()=>swap(false),1500)},650)}
reduced.addEventListener('change',()=>{clearTimeout(enterTimer);settle(false)});addEventListener('pagehide',()=>{clearTimeout(enterTimer);settle(false)});
window.__inmodeTitle={swap,state:()=>({swapped,reduced:reduced.matches,characters:a.length,running:animations.filter(x=>x.playState==='running').length})};
})();
