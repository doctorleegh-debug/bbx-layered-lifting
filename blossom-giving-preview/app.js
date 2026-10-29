'use strict';
const partners={
  redcross:{name:'대한적십자사',category:'인도주의·구호 단체',logo:'redcross.svg',description:'인도주의 정신을 바탕으로 구호와 복지 활동을 펼치는 기관입니다.',support:'대한적십자사에 정기후원으로 마음을 전하고 있습니다.',website:'https://www.redcross.or.kr/'},
  mapowf:{name:'마포복지재단',category:'지역사회 복지',logo:'mapo-welfare.png',description:'마포구가 출연한 공익 재단법인으로, 마포행복나눔푸드마켓 등 지역 복지사업을 운영합니다.',support:'마포복지재단을 통해 참치캔 1,560개를 전달했습니다.',website:'https://www.mapowf.or.kr/'},
  seogyo:{name:'서교동 주민센터',category:'지역사회',logo:'mapo.png',description:'마포구 서교동의 행정·복지 서비스를 제공하는 동주민센터입니다.',support:'서교동 주민센터에 후원으로 마음을 전했습니다.',website:'https://www.mapo.go.kr/',logoNote:'기관 표시는 제공된 마포구 슬로건 이미지를 사용했습니다.'},
  sangrok:{name:'상록보육원',category:'아동복지시설',logo:'sangrok.png',description:'“아이들과 함께 자라는” 상록보육원은 아이들의 생활과 성장을 함께하는 아동복지시설입니다.',support:'상록보육원에 두 차례 후원으로 마음을 전했습니다.',website:'https://sangrokwon.or.kr/'},
  geon:{name:'지온보육원',category:'아동복지시설',logo:'geon.png',description:'사회복지법인 그리스도의집이 운영하는 아동보육시설입니다. “희망과 사랑이 가득한 집”을 소개합니다.',support:'지온보육원에 후원으로 마음을 전했습니다.',website:'https://geonhome.or.kr/'},
  changshin:{name:'창신모자원',category:'한부모가족복지시설',logo:'changshin.png',description:'사회복지법인 창신모자원이 운영하는 한부모가족복지시설입니다.',support:'창신모자원에 후원으로 마음을 전했습니다.',website:'https://www.changshinsarang.or.kr/',dark:true}
};
const dialog=document.getElementById('partner-dialog');
let opener=null;
document.querySelector('.partner-showcase').addEventListener('click',event=>{
    const button=event.target.closest('[data-partner]');if(!button)return;
    const partner=partners[button.dataset.partner];if(!partner)return;
    opener=button;
    document.getElementById('dialog-title').textContent=partner.name;
    document.getElementById('dialog-category').textContent=partner.category;
    document.getElementById('dialog-description').textContent=partner.description;
    document.getElementById('dialog-support').textContent=partner.support;
    const logo=document.getElementById('dialog-logo');logo.src='assets/'+partner.logo;logo.alt=partner.name;
    document.getElementById('dialog-logo-stage').classList.toggle('is-dark',Boolean(partner.dark));
    const note=document.getElementById('dialog-logo-note');note.hidden=!partner.logoNote;note.textContent=partner.logoNote||'';
    document.getElementById('dialog-website').href=partner.website;
    dialog.showModal();dialog.scrollTop=0;
});
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();});
dialog.addEventListener('close',()=>opener?.focus({preventScroll:true}));
let toastTimeout;
document.getElementById('share-button').addEventListener('click',async()=>{
  const status=document.getElementById('share-status');clearTimeout(toastTimeout);
  try{await navigator.clipboard.writeText(location.origin+location.pathname);status.textContent='공유 링크를 복사했어요.';}
  catch{status.textContent='브라우저 주소창의 링크를 복사해 주세요.';}
  status.classList.add('is-visible');toastTimeout=setTimeout(()=>status.classList.remove('is-visible'),3000);
});


// One repeated group at a constant 25 CSS pixels per second. Pause for reading.
const viewport=document.getElementById('partner-viewport');
const track=document.getElementById('partner-track');
const original=track.querySelector('.partner-grid');
const copies=[];
function ensureCopies(count){
  while(copies.length<count){const copy=original.cloneNode(true);copy.dataset.copy='';copy.setAttribute('aria-hidden','true');copy.querySelectorAll('button').forEach(button=>button.tabIndex=-1);track.append(copy);copies.push(copy);}
  while(copies.length>count){const last=copies.at(-1);if(last.contains(document.activeElement))break;copies.pop().remove();}
}
ensureCopies(1);
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let animation=null,hovered=false,distance=0;
function updateMotion(){
  const paused=hovered||document.hidden||dialog.open||viewport.contains(document.activeElement);
  if(animation){if(paused)animation.pause();else animation.play();}
}
function layoutMotion(){
  const progress=animation&&distance?((animation.currentTime||0)/1000*25)%distance/distance:0;
  animation?.cancel();animation=null;
  if(reduced.matches){copies.forEach(copy=>copy.hidden=true);viewport.classList.remove('is-animated');return;}
  copies.forEach(copy=>copy.hidden=false);viewport.classList.add('is-animated');viewport.scrollLeft=0;
  distance=original.getBoundingClientRect().width+parseFloat(getComputedStyle(track).gap);
  if(distance<=0)return;
  ensureCopies(Math.max(1,Math.ceil((viewport.clientWidth+parseFloat(getComputedStyle(track).gap))/distance)));
  animation=track.animate([{transform:'translateX(0)'},{transform:'translateX(-'+distance+'px)'}],{duration:distance/25*1000,iterations:Infinity,easing:'linear'});
  animation.currentTime=progress*distance/25*1000;updateMotion();
}
viewport.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse'){hovered=true;updateMotion()}});
viewport.addEventListener('pointerleave',()=>{hovered=false;updateMotion()});
viewport.addEventListener('focusin',event=>{
  if(animation){const button=event.target.closest('[data-partner]');if(button){const r=button.getBoundingClientRect(),v=viewport.getBoundingClientRect();if(r.left<v.left||r.right>v.right){const index=[...original.querySelectorAll('[data-partner]')].findIndex(x=>x.dataset.partner===button.dataset.partner);const item=original.children[index];animation.currentTime=(item.offsetLeft-original.children[0].offsetLeft)/25*1000;}}}
  updateMotion();
});
viewport.addEventListener('focusout',()=>queueMicrotask(updateMotion));
dialog.addEventListener('close',updateMotion);new MutationObserver(updateMotion).observe(dialog,{attributes:true,attributeFilter:['open']});
document.addEventListener('visibilitychange',updateMotion);reduced.addEventListener('change',layoutMotion);
const givingSection=viewport.closest('.giving-section');
function fitViewportToSection(){
  const right=givingSection.getBoundingClientRect().right,left=viewport.getBoundingClientRect().left;
  const width=Math.max(0,right-left);const next=width.toFixed(3)+'px';
  if(viewport.style.width!==next)viewport.style.width=next;
  layoutMotion();
}
new ResizeObserver(layoutMotion).observe(original);
new ResizeObserver(fitViewportToSection).observe(givingSection);
window.addEventListener('resize',fitViewportToSection,{passive:true});
fitViewportToSection();
