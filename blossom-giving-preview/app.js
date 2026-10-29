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
document.querySelectorAll('[data-partner]').forEach(button=>{
  button.addEventListener('click',()=>{
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
