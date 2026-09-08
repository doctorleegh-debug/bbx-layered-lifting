(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))t(n);new MutationObserver(n=>{for(const e of n)if(e.type==="childList")for(const s of e.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&t(s)}).observe(document,{childList:!0,subtree:!0});function a(n){const e={};return n.integrity&&(e.integrity=n.integrity),n.referrerPolicy&&(e.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?e.credentials="include":n.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function t(n){if(n.ep)return;n.ep=!0;const e=a(n);fetch(n.href,e)}})();const p=`<!-- ═══ 뷰티블라썸의원 · 퍼스널 레이어드 리프팅 — 히어로 v3 ═══
     영상을 배경으로 꽉 채운 진짜 히어로 밴드.
     · 영상 평균 밝기가 128~184 로 밝아 흰 글씨가 그냥은 안 읽힌다.
       왼쪽에 브랜드 톤의 진한 스크림을 깔아 글자 쪽만 눌렀다. 오른쪽은 영상이 그대로 보인다.
     · 특징 3가지는 이 위젯에서 빠졌다. 도입부(plc-) 헤딩 아래로 내려갔다.
     접두사 plh- : 바디코드 bb-, 도입부 plc-, 층 다이어그램 pll-, 증상별 pls- 와 겹치지 않는다
     body·html 선택자 없음 — 아임웹 문서를 건드리지 않는다
     Pretendard 는 바디코드가 이미 싣고 있어 다시 부르지 않는다 -->
<style>
.plh-sec{--c:#E9918E;--c-lt:#f7b3b0;--ink:#fff;--deep:44,25,23;
  width:100%;max-width:none;margin:0 auto;padding:0;
  font-family:'Pretendard',-apple-system,BlinkMacSystemFont,system-ui,'Noto Sans KR',sans-serif;
  word-break:keep-all;overflow-wrap:break-word;text-align:left}
.plh-sec *{box-sizing:border-box}

.plh-hero{position:relative;isolation:isolate;overflow:hidden;
  aspect-ratio:16/9;min-height:440px;display:flex;align-items:center;
  background:#2c1917}

/* 배경 영상 — 잘려도 되는 장식이므로 cover 로 채운다 */
.plh-video{position:absolute;inset:0;z-index:0;width:100%;height:100%;
  object-fit:cover;object-position:60% center}

/* 글자가 놓이는 왼쪽만 눌러준다. 오른쪽은 영상을 살린다 */
.plh-scrim{position:absolute;inset:0;z-index:1;pointer-events:none;
  background:linear-gradient(95deg,
    rgba(var(--deep),.90) 0%,
    rgba(var(--deep),.80) 30%,
    rgba(var(--deep),.44) 58%,
    rgba(var(--deep),.14) 82%,
    rgba(var(--deep),.06) 100%)}
/* 아래쪽으로 한 겹 더 — 다음 섹션과 이어지는 자리 */
.plh-hero::after{content:'';position:absolute;left:0;right:0;bottom:0;height:34%;z-index:1;
  pointer-events:none;background:linear-gradient(180deg,transparent,rgba(var(--deep),.42))}

.plh-inner{position:relative;z-index:2;width:100%;max-width:1400px;
  margin-inline:auto;padding:clamp(48px,6vw,84px) clamp(22px,4vw,64px)}
.plh-copy{max-width:min(860px,54%)}

.plh-h1{margin:0 0 12px;font-size:clamp(49.5px,6.3vw,87px);font-weight:800;line-height:1.14;
  letter-spacing:-2.2px;color:var(--ink);text-wrap:balance;
  text-shadow:0 2px 18px rgba(30,14,13,.45)}
.plh-sub{display:block;margin:0 0 18px;font-size:clamp(27px,2.78vw,39px);font-weight:700;
  letter-spacing:-1.1px;color:var(--c-lt);text-shadow:0 2px 14px rgba(30,14,13,.4)}
.plh-rule{height:2px;border:0;margin:0 0 20px;max-width:450px;
  background:linear-gradient(90deg,var(--c-lt),rgba(247,179,176,.15) 70%,transparent)}
.plh-lead{margin:0 0 16px;font-size:clamp(22.5px,1.88vw,26.3px);line-height:1.8;letter-spacing:-.8px;
  color:rgba(255,255,255,.9)}
.plh-close{margin:0;font-size:clamp(22.5px,1.88vw,26.3px);font-weight:700;line-height:1.6;
  letter-spacing:-.8px;color:#fff}
.plh-close em{font-style:normal;color:var(--c-lt)}

/* ── 태블릿 ── */
@media (max-width:1000px){
  .plh-hero{min-height:clamp(400px,52vh,520px)}
  .plh-copy{max-width:min(520px,66%)}
  .plh-scrim{background:linear-gradient(100deg,
    rgba(var(--deep),.92) 0%,rgba(var(--deep),.84) 46%,
    rgba(var(--deep),.5) 74%,rgba(var(--deep),.2) 100%)}
}
/* ── 모바일 : 가운데 정렬 + 위아래 스크림 ── */
@media (max-width:768px){
  .plh-hero{min-height:420px}
  .plh-video{object-position:center}
  .plh-scrim{background:linear-gradient(180deg,
    rgba(var(--deep),.58) 0%,rgba(var(--deep),.72) 46%,rgba(var(--deep),.9) 100%)}
  .plh-inner{padding:44px 20px 40px;display:flex;justify-content:center}
  .plh-copy{max-width:none;text-align:center}
  .plh-h1{font-size:31px;letter-spacing:-1.5px}
  .plh-sub{font-size:18px;margin-bottom:14px}
  .plh-rule{margin:0 auto 16px;width:110px;max-width:none;
    background:linear-gradient(90deg,transparent,var(--c-lt),transparent)}
  .plh-lead,.plh-close{font-size:15px;line-height:1.75}
}
</style>

<section class="plh-sec" aria-labelledby="plh-title">
  <div class="plh-hero">

    <video class="plh-video" autoplay muted loop playsinline preload="metadata"
           width="1920" height="1080"
           aria-label="표피·진피·피하지방층·근막(SMAS)층으로 이어지는 피부 단면과 리프팅 에너지의 도달 깊이를 보여주는 배경 영상">
      <source src="https://pub-7ab1b86fbb9c4442971f0a3a7b5adf9f.r2.dev/beauty-blossom/layered-lifting/hero/skin-layer-video.v1.mp4" type="video/mp4">
    </video>
    <div class="plh-scrim" aria-hidden="true"></div>

    <div class="plh-inner">
      <div class="plh-copy">
        <h1 class="plh-h1" id="plh-title">퍼스널 레이어드 리프팅</h1>
        <strong class="plh-sub">뷰티블라썸만의 맞춤형 리프팅</strong>
        <hr class="plh-rule">
        <p class="plh-lead">개인의 얼굴 구조와 노화 패턴을 정밀 분석해 피부층·지방층·근막층까지 레이어별로 최적화한 솔루션을 제공합니다.</p>
        <p class="plh-close">안전하게, 확실하게, 오래가는 리프팅.<br><em>뷰티블라썸의원</em>에서 경험하세요.</p>
      </div>
    </div>

  </div>
</section>

<script>
(function(){
  // 모션을 줄이는 설정이면 배경 영상을 세워둔다
  try {
    if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) {
      var v = document.querySelector('.plh-video');
      if (v) { v.removeAttribute('autoplay'); v.removeAttribute('loop'); v.pause(); }
    }
  } catch (e) {}
})();
<\/script>
`,o=`<style>\r
/* ═══ 뷰티블라썸의원 · 장비 필름스트립 ═══\r
   ThreeUI CharacterCarousel (filmstrip) · MIT — 구조와 모션은 원본 그대로,\r
   색·이미지·문구만 사이트에 맞췄다. 클래스는 전부 plc- 로 감싸 아임웹과 부딪히지 않는다. */\r
.plc-sec{--c:#E9918E;--c-dk:#d4706d;--ink:#2f2523;--ink2:#5f5754;--mute:#918a87;--paper:#faf5f4;\r
  width:100%;max-width:none;margin:0 auto;padding:8px 0 16px;color:var(--ink);\r
  font-family:'Pretendard',-apple-system,BlinkMacSystemFont,system-ui,'Noto Sans KR',sans-serif;\r
  word-break:keep-all;text-align:left}\r
.plc-sec *{box-sizing:border-box}\r
\r
.plc-head{max-width:1000px;margin:0 auto 22px;text-align:center}\r
.plc-kw{display:block;margin:0 0 12px;font-size:13px;font-weight:700;letter-spacing:.22em;\r
  text-transform:uppercase;color:var(--c)}\r
.plc-h2{margin:0 0 14px;font-size:clamp(30px,3.1vw,45.6px);font-weight:700;line-height:1.35;letter-spacing:-1.3px}\r
.plc-h2 em{font-style:normal;color:var(--c)}\r
.plc-lead{margin:0;font-size:clamp(14.5px,1.2vw,17px);line-height:1.8;letter-spacing:-.6px;color:var(--ink2)}\r
\r
/* ── 무대 : 원근 레일 ── */\r
.plc-stage{--pointer-x:50%;position:relative;width:100%;height:clamp(345px,33.0vw,500px);\r
  overflow:hidden;isolation:isolate;perspective:1450px;cursor:grab;touch-action:pan-y;\r
  -webkit-user-select:none;user-select:none;\r
  border-radius:24px;\r
  background:\r
    linear-gradient(90deg,rgba(160,120,115,.07) 1px,transparent 1px) 50% 0 / 25% 100%,\r
    repeating-linear-gradient(0deg,transparent 0,transparent 109px,rgba(160,120,115,.1) 110px,transparent 111px),\r
    radial-gradient(circle at var(--pointer-x) 46%,rgba(255,255,255,.95),transparent 36%),\r
    var(--paper)}\r
/* 종이 결 */\r
.plc-stage::before{content:"";position:absolute;inset:0;z-index:5;pointer-events:none;opacity:.22;\r
  background:\r
    repeating-radial-gradient(circle at 12% 18%,rgba(150,110,105,.14) 0 .5px,transparent .7px 4px),\r
    repeating-radial-gradient(circle at 78% 71%,rgba(255,255,255,.4) 0 .5px,transparent .8px 5px);\r
  mix-blend-mode:multiply}\r
/* 양끝 그늘 */\r
.plc-stage::after{content:"";position:absolute;inset:0;z-index:4;pointer-events:none;\r
  background:linear-gradient(90deg,rgba(190,150,145,.16),transparent 14%,transparent 86%,rgba(190,150,145,.16))}\r
\r
.plc-deck{position:absolute;inset:0;z-index:2;transform-style:preserve-3d}\r
\r
.plc-card{--focus:0;position:absolute;top:50%;left:50%;\r
  width:clamp(154px,16.8vw,238px);aspect-ratio:.72;padding:7px;overflow:hidden;\r
  border:1px solid rgba(160,120,115,.34);border-radius:8px;color:var(--ink);background:#fff;\r
  box-shadow:\r
    0 calc(10px + var(--focus) * 24px) calc(18px + var(--focus) * 36px)\r
      rgba(120,80,76,calc(.14 + var(--focus) * .2)),\r
    inset 0 0 0 1px rgba(255,255,255,.9);\r
  appearance:none;outline:none;transform-style:preserve-3d;\r
  will-change:transform,opacity,filter;cursor:pointer;text-decoration:none;font:inherit;\r
  -webkit-user-drag:none}\r
.plc-card::before{content:"";position:absolute;inset:5px;z-index:3;pointer-events:none;\r
  border:1px solid rgba(160,120,115,calc(.16 + var(--focus) * .16))}\r
.plc-card:focus-visible{box-shadow:0 26px 50px rgba(120,80,76,.34),0 0 0 4px rgba(233,145,142,.45)}\r
\r
/* 얼굴이 아니라 누끼 장비다 — 잘라내지 않고 담는다 */\r
.plc-shot{position:absolute;inset:7px 7px 25%;overflow:hidden;display:flex;\r
  align-items:flex-end;justify-content:center;padding:14px 12px 10px;\r
  background:linear-gradient(180deg,#fdfbfa,#f4eeed)}\r
.plc-shot img{display:block;max-width:100%;max-height:100%;width:auto;height:auto;object-fit:contain;\r
  pointer-events:none;-webkit-user-drag:none;\r
  transform:scale(calc(.96 + var(--focus) * .08));\r
  filter:saturate(calc(.72 + var(--focus) * .28)) contrast(1.02);\r
  transition:none}\r
\r
.plc-foot{position:absolute;right:7px;bottom:7px;left:7px;height:calc(25% - 7px);\r
  display:grid;grid-template-columns:clamp(26px,3.2vw,43px) 1fr;align-items:center;\r
  gap:clamp(6px,0.7vw,11px);padding:clamp(7px,0.8vw,12px);\r
  color:#fff;background:var(--ink);text-align:left;border-radius:3px}\r
.plc-no{display:grid;width:clamp(23px,2.6vw,37px);aspect-ratio:1;place-items:center;\r
  border:1px solid var(--c);border-radius:50%;color:var(--c);\r
  font:600 clamp(7px,0.6vw,11px)/1 ui-monospace,"SFMono-Regular",monospace}\r
.plc-meta{min-width:0}\r
.plc-name,.plc-role{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}\r
.plc-name{color:#fff;font-size:clamp(9px,1.0vw,14px);font-weight:800;letter-spacing:-.02em;line-height:1.15}\r
.plc-role{margin-top:clamp(3px,0.3vw,5px);color:var(--c);font-size:clamp(7px,0.6vw,10px);\r
  font-weight:700;letter-spacing:.06em;line-height:1}\r
\r
.plc-sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;\r
  clip:rect(0,0,0,0);white-space:nowrap;border:0}\r
\r
@media (max-width:768px){\r
  .plc-head{margin-bottom:20px}\r
  .plc-h2{font-size:23px;letter-spacing:-1px}\r
  .plc-lead{font-size:14.5px}\r
  .plc-stage{height:clamp(290px,72vw,380px);border-radius:18px;cursor:default;\r
    background:\r
      linear-gradient(90deg,rgba(160,120,115,.07) 1px,transparent 1px) 50% 0 / 50% 100%,\r
      repeating-linear-gradient(0deg,transparent 0,transparent 87px,rgba(160,120,115,.1) 88px,transparent 89px),\r
      radial-gradient(circle at 50% 50%,rgba(255,255,255,.95),transparent 36%),\r
      var(--paper)}\r
  .plc-card{width:clamp(142px,47vw,180px)}\r
}\r
@media (prefers-reduced-motion:reduce){.plc-card{will-change:auto}}\r
\r
/* ── 특징 3가지 — 히어로에서 내려왔다. 헤딩의 "아홉 대" 주장을 바로 받쳐준다 ──\r
   누를 데 없는 버튼이 아니라 목록이므로 ul/li 로 짠다 */\r
.plc-points{list-style:none;margin:0 auto 26px;padding:0;max-width:min(1720px,calc(100% - 48px));\r
  display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(10px,1vw,14px)}\r
.plc-point{position:relative;display:grid;grid-template-columns:auto 1fr;align-items:center;\r
  gap:12px;padding:14px clamp(14px,1.3vw,20px);border-radius:15px;color:#fff;overflow:hidden;\r
  background:linear-gradient(118deg,#E9918E 0%,#f4a6a3 100%);\r
  box-shadow:0 8px 20px rgba(233,145,142,.24)}\r
/* 빛이 한 번 훑고 지나간다 */\r
.plc-point::after{content:'';position:absolute;top:0;bottom:0;left:-40%;width:36%;\r
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.36),transparent);\r
  transform:skewX(-18deg);animation:plc-sheen 4.6s ease-in-out infinite}\r
.plc-point:nth-child(2)::after{animation-delay:.5s}\r
.plc-point:nth-child(3)::after{animation-delay:1s}\r
@keyframes plc-sheen{0%{left:-40%}26%{left:120%}100%{left:120%}}\r
.plc-point i{display:grid;place-items:center;width:24px;height:24px;border-radius:50%;\r
  background:rgba(255,255,255,.22);color:#fff}\r
.plc-point b{grid-column:2;font-size:clamp(14.5px,1.15vw,16.5px);font-weight:700;\r
  letter-spacing:-.5px;line-height:1.3}\r
.plc-point span{grid-column:2;margin-top:2px;font-size:clamp(12px,.95vw,13.5px);\r
  font-weight:500;letter-spacing:-.3px;color:rgba(255,255,255,.88)}\r
\r
@media (max-width:900px){\r
  .plc-points{grid-template-columns:1fr;gap:9px;margin-bottom:22px}\r
  .plc-point{padding:13px 16px}\r
}\r
@media (prefers-reduced-motion:reduce){\r
  .plc-point::after{display:none}\r
}\r
\r
/* ── 헤딩 타이핑 효과 ── 원문은 HTML 에 그대로 있어 크롤러가 읽는다.\r
   스크롤로 화면에 들어올 때 한 번만 친다. 반복하지 않는다. */\r
.plc-h2{min-height:var(--plc-h2h,auto)}\r
.plc-cur{display:inline-block;margin-left:.06em;color:var(--c);font-weight:400;\r
  animation:plc-bl .62s steps(1,end) infinite}\r
@keyframes plc-bl{0%,49%{opacity:1}50%,100%{opacity:0}}\r
@media (prefers-reduced-motion:reduce){.plc-cur{display:none}}\r
</style>\r
<section class="plc-sec" aria-labelledby="plc-title">\r
\r
  <header class="plc-head">\r
    <span class="plc-kw">9 Original Devices</span>\r
    <h2 class="plc-h2" id="plc-title">하나의 깊이로 끝내지 않습니다.<br><em>피부 속 여러 레이어를 입체적으로</em> 리프팅합니다.</h2>
    <p class="plc-lead">원리가 서로 다른 아홉 가지 오리지널 장비를 갖추고, 진단 결과에 따라 필요한 것만 골라 순서대로 씁니다.</p>\r
  </header>\r
  <ul class="plc-points">\r
    <li class="plc-point">\r
      <i aria-hidden="true"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12.5 4.6 4.5L19 7.5"/></svg></i>\r
      <b>부위별 맞춤 설계</b><span>이중턱 · 팔자주름 · 잔주름</span>\r
    </li>\r
    <li class="plc-point">\r
      <i aria-hidden="true"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12.5 4.6 4.5L19 7.5"/></svg></i>\r
      <b>FDA 승인 장비</b><span>9가지 오리지널 장비 보유</span>\r
    </li>\r
    <li class="plc-point">\r
      <i aria-hidden="true"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12.5 4.6 4.5L19 7.5"/></svg></i>\r
      <b>자연스러운 윤곽 회복</b><span>탄력 · 안티에이징</span>\r
    </li>\r
  </ul>\r
\r
\r
  <div class="plc-stage" aria-label="장비 9종 둘러보기">\r
    <p class="plc-sr">좌우로 끌거나 방향키로 장비를 넘길 수 있습니다. 카드를 누르면 해당 장비 페이지로 이동합니다.</p>\r
    <div class="plc-deck"></div>\r
  </div>\r
\r
</section>\r
<script>\r
(function(){\r
  var root = document.querySelector('.plc-sec');\r
  if (!root || root.dataset.plcReady) return;\r
  root.dataset.plcReady = '1';\r
\r
  var CDN = 'https://pub-7ab1b86fbb9c4442971f0a3a7b5adf9f.r2.dev/beautyblossom/layered';\r
  // 장비 사진 파일명 — 규칙은 hero-<slug>.webp 이고, 교체본이 있는 것만 예외로 적는다\r
  var SHOTS = { linearz: 'hero-linearz-white.v1.webp' };\r
  function shot(slug){ return SHOTS[slug] || ('hero-' + slug + '.webp'); }\r
\r
  var profiles = [\r
        ["울쎄라피 프라임","초음파 HIFU","ulthera","https://beautyblossom.kr/40"],\r
        ["써마지 FLX","모노폴라 RF","thermage","https://beautyblossom.kr/41"],\r
        ["세르프(XERF)","듀얼 모노폴라 RF","xerf","https://beautyblossom.kr/155"],\r
        ["소프웨이브","SUPERB 초음파","sofwave","https://beautyblossom.kr/139"],\r
        ["온다","마이크로웨이브","onda","https://beautyblossom.kr/42"],\r
        ["덴서티","모노+바이폴라 RF","density","https://beautyblossom.kr/153"],\r
        ["리니어지","선·점 HIFU","linearz","https://beautyblossom.kr/154"],\r
        ["포트라 콰트로","4파장 다이오드","fortra","https://beautyblossom.kr/titanium-fortra-quattro"],\r
        ["올타이트","유전가열 DLTD","alltite","https://beautyblossom.kr/alltite-lifting"]\r
      ].map(function(a){ return {name:a[0], role:a[1], slug:a[2], url:a[3]}; });\r
\r
  var stage = root.querySelector('.plc-stage');\r
  var deck  = root.querySelector('.plc-deck');\r
\r
  var cards = profiles.map(function(p, index){\r
    var card = document.createElement('a');\r
    card.className = 'plc-card';\r
    card.href = p.url;\r
    card.draggable = false;\r
    card.dataset.index = String(index);\r
    card.setAttribute('aria-label', p.name + ' · ' + p.role);\r
    card.innerHTML =\r
      '<span class="plc-shot"><img src="' + CDN + '/' + shot(p.slug) + '" alt="' + p.name +\r
        '" loading="lazy" decoding="async" draggable="false"></span>' +\r
      '<span class="plc-foot">' +\r
        '<span class="plc-no">' + String(index + 1).padStart(2, '0') + '</span>' +\r
        '<span class="plc-meta">' +\r
          '<span class="plc-name">' + p.name + '</span>' +\r
          '<span class="plc-role">' + p.role + '</span>' +\r
        '</span>' +\r
      '</span>';\r
    deck.appendChild(card);\r
    return card;\r
  });\r
\r
  var count = cards.length;\r
  var reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;\r
  var state = {phase:0, target:0, base:0};\r
  var running = true, dragged = false, hovering = false;\r
  var AUTO = 1 / 2600;   /* ms 당 카드 수 — 한 장 넘어가는 데 2.6초 */\r
\r
  function wrappedDelta(index, phase){\r
    var d = index - phase;\r
    while (d > count / 2) d -= count;\r
    while (d < -count / 2) d += count;\r
    return d;\r
  }\r
  function nearestIndex(){ return (Math.round(state.phase) % count + count) % count; }\r
  function moveTo(index){\r
    var cur = nearestIndex(), d = index - cur;\r
    if (d > count / 2) d -= count;\r
    if (d < -count / 2) d += count;\r
    state.base += d; state.target = state.base;   }\r
\r
  cards.forEach(function(card, index){\r
    /* 카드가 링크라 클릭은 장비 페이지로 간다. 다만 끌어서 넘긴 직후의 클릭은 막는다. */\r
    card.addEventListener('click', function(e){ if (dragged) e.preventDefault(); });\r
    card.addEventListener('focus', function(){ moveTo(index); });\r
  });\r
\r
  /* 마우스를 올리는 것만으로는 덱이 움직이지 않는다 — 배경 조명만 따라온다.\r
     대신 흐름을 멈춰 읽을 수 있게 한다. */\r
  stage.addEventListener('pointerenter', function(){ hovering = true; });\r
  stage.addEventListener('pointermove', function(e){\r
    var r = stage.getBoundingClientRect();\r
    var nx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2));\r
    stage.style.setProperty('--pointer-x', ((nx + 1) * 50) + '%');\r
  });\r
  stage.addEventListener('pointerleave', function(){\r
    hovering = false;\r
    stage.style.setProperty('--pointer-x', '50%');\r
  });\r
\r
  /* 세로 휠은 페이지에 넘긴다 — 위젯 위에서 스크롤이 멈추면 안 된다.\r
     가로 휠(트랙패드 좌우) 과 Shift+휠 만 카드 이동에 쓴다. */\r
  stage.addEventListener('wheel', function(e){\r
    var horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey;\r
    if (!horizontal) return;\r
    var dir = Math.sign(e.shiftKey ? e.deltaY : e.deltaX);\r
    if (!dir) return;\r
    e.preventDefault();\r
    state.base += dir; state.target = state.base;   }, {passive:false});\r
\r
  /* 방향키는 위젯 안에 포커스가 있을 때만 — 페이지 전역에서 가로채면 안 된다 */\r
  root.addEventListener('keydown', function(e){\r
    var fwd = e.key === 'ArrowRight' || e.key === 'ArrowDown';\r
    var back = e.key === 'ArrowLeft' || e.key === 'ArrowUp';\r
    if (!fwd && !back) return;\r
    e.preventDefault();\r
    state.base += fwd ? 1 : -1; state.target = state.base;   });\r
\r
  /* 터치·드래그로 넘기기 */\r
  var down = false, x0 = 0, b0 = 0, pid = null, moved = 0, lastDrag = 0;\r
\r
  /* 브라우저 기본 드래그(고스트 이미지)를 막는다 — 이게 포인터 흐름을 통째로 가져간다 */\r
  stage.addEventListener('dragstart', function(e){ e.preventDefault(); });\r
\r
  stage.addEventListener('pointerdown', function(e){\r
    if (e.pointerType === 'mouse' && e.button !== 0) return;\r
    down = true; dragged = false; moved = 0;\r
    x0 = e.clientX; b0 = state.base; pid = e.pointerId;\r
    /* 포인터를 무대에 묶어 두면 커서가 밖으로 나가도 끝까지 따라온다 */\r
    try { stage.setPointerCapture(pid); } catch (err) {}\r
  });\r
\r
  stage.addEventListener('pointermove', function(e){\r
    if (!down) return;\r
    var dx = x0 - e.clientX;\r
    if (Math.abs(dx) > moved) moved = Math.abs(dx);\r
    state.base = b0 + dx / (innerWidth < 769 ? 66 : 90);\r
    state.target = state.base;\r
  });\r
\r
  function endDrag(){\r
    if (!down) return;\r
    down = false;\r
    dragged = moved > 6;          /* 6px 넘게 끌었으면 클릭이 아니라 끌기다 */\r
    lastDrag = performance.now();\r
    if (pid !== null){ try { stage.releasePointerCapture(pid); } catch (err) {} pid = null; }\r
    state.target = state.base;\r
  }\r
  stage.addEventListener('pointerup', endDrag);\r
  stage.addEventListener('pointercancel', endDrag);\r
  /* pointerleave 로는 끝내지 않는다 — 캡처 중이라 밖으로 나가도 이어진다 */\r
  stage.addEventListener('pointerup', function(){ setTimeout(function(){ dragged = false; }, 40); });\r
\r
  /* 화면 밖이거나 탭이 숨겨져 있으면 프레임을 돌리지 않는다 */\r
  if (window.IntersectionObserver){\r
    new IntersectionObserver(function(es){\r
      for (var i = 0; i < es.length; i++){\r
        var on = es[i].isIntersecting && !document.hidden;\r
        if (on && !running){ running = true; previousTime = performance.now(); requestAnimationFrame(render); }\r
        running = on;\r
      }\r
    }, {threshold:.04}).observe(stage);\r
  }\r
  document.addEventListener('visibilitychange', function(){\r
    if (!document.hidden && !running){ running = true; previousTime = performance.now(); requestAnimationFrame(render); }\r
    else if (document.hidden) running = false;\r
  });\r
\r
  var previousTime = performance.now();\r
\r
  function render(time){\r
    if (!running) return;\r
    var dt = Math.min(32, time - previousTime);\r
    previousTime = time;\r
    var ease = reducedMotion ? 1 : 1 - Math.pow(0.001, dt / 1000);\r
\r
    /* 끌고 있거나 마우스를 올려두면 멈춘다. 그 밖에는 계속 흐른다. */\r
    if (!down && !hovering && !reducedMotion && time - lastDrag > 2500){\r
      state.base += AUTO * dt;\r
      state.target = state.base;\r
    }\r
\r
    state.phase += (state.target - state.phase) * ease;\r
    var activeIndex = nearestIndex();\r
    /* 간격을 카드 폭에 비례시키면 화면 크기와 무관하게 겹침 비율이 같다 */\r
    var cardW = cards[0].offsetWidth || 200;\r
    var hSpacing = cardW * 0.78;\r
\r
    cards.forEach(function(card, index){\r
      var delta = wrappedDelta(index, state.phase);\r
      var distance = Math.abs(delta);\r
      var focus = Math.exp(-distance * distance * 1.28);\r
      var side = Math.max(0, 1 - distance / 5);\r
      var dir = Math.sign(delta);\r
      var x = delta * hSpacing;\r
      var y = distance * 8;\r
      var z = focus * 145 - distance * 148;\r
      var scale = 0.54 + side * 0.15 + focus * 0.54;\r
      var rotateX = 0;\r
      var rotateY = -dir * (distance > 0.2 ? 14 + Math.min(distance, 3) * 5 : 0);\r
      var rotateZ = delta * 0.7;\r
\r
      card.style.setProperty('--focus', focus.toFixed(4));\r
      card.style.zIndex = String(Math.round(1000 - distance * 100));\r
      card.style.opacity = String(Math.max(0.13, side * 0.76 + focus * 0.24));\r
      card.style.filter = 'blur(' + (Math.max(0, distance - 1.5) * 0.38).toFixed(2) + 'px)';\r
      card.style.transform = [\r
        'translate(-50%, -50%)',\r
        'translate3d(' + x.toFixed(2) + 'px, ' + y.toFixed(2) + 'px, ' + z.toFixed(2) + 'px)',\r
        'rotateX(' + rotateX.toFixed(2) + 'deg)',\r
        'rotateY(' + rotateY.toFixed(2) + 'deg)',\r
        'rotateZ(' + rotateZ.toFixed(2) + 'deg)',\r
        'scale(' + scale.toFixed(4) + ')'\r
      ].join(' ');\r
      card.setAttribute('aria-current', index === activeIndex ? 'true' : 'false');\r
    });\r
\r
    requestAnimationFrame(render);\r
  }\r
  requestAnimationFrame(render);\r
})();\r
<\/script>\r
<script>\r
/* 헤딩 타이핑 — 화면에 들어오면 친다. 내려와서 보일 때도, 올라와서 보일 때도.\r
   화면 밖으로 나가면 되감아 두므로 다시 보일 때 처음부터 다시 쳐진다.\r
   커서는 끝난 뒤에도 계속 깜박인다.\r
   글자는 이미 DOM 에 있고 잠시 감췄다 되돌리는 방식이라 크롤러는 완성문을 본다. */\r
(function(){\r
  var el=document.querySelector('.plc-h2');\r
  if(!el||el.getAttribute('data-tt'))return;\r
  if(!('IntersectionObserver' in window))return;\r
  if(window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches)return;\r
  el.setAttribute('data-tt','1');\r
\r
  var parts=[],w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false),n;\r
  while(n=w.nextNode()){ if(n.nodeValue.length) parts.push({n:n,t:n.nodeValue}); }\r
  var total=0; for(var i=0;i<parts.length;i++) total+=parts[i].t.length;\r
  if(!total)return;\r
\r
  el.style.setProperty('--plc-h2h', el.getBoundingClientRect().height+'px'); /* 비어도 안 접히게 */\r
\r
  var cur=document.createElement('span');\r
  cur.className='plc-cur'; cur.setAttribute('aria-hidden','true'); cur.textContent='|';\r
  el.appendChild(cur);\r
\r
  var shown=-1;\r
  function draw(k){\r
    if(k===shown)return; shown=k;\r
    var left=k;\r
    for(var j=0;j<parts.length;j++){\r
      var o=parts[j],take=left<0?0:(left>o.t.length?o.t.length:left);\r
      o.n.nodeValue=o.t.slice(0,take); left-=take;\r
    }\r
  }\r
  var timer=0;\r
  function stop(){ if(timer){ clearTimeout(timer); timer=0; } }\r
  function play(){\r
    stop(); draw(0);\r
    var k=0;\r
    (function step(){\r
      if(k>=total){ timer=0; return; }\r
      draw(++k);\r
      timer=setTimeout(step, 30+Math.random()*26);\r
    })();\r
  }\r
\r
  draw(0);\r
  var io=new IntersectionObserver(function(es){\r
    for(var i=0;i<es.length;i++){\r
      if(es[i].isIntersecting) play();\r
      else { stop(); draw(0); }\r
    }\r
  },{threshold:.35});\r
  io.observe(el);\r
})();\r
<\/script>\r
`,l=`<!-- ═══ 뷰티블라썸의원 · 퍼스널 레이어드 리프팅 — 부위별 노화 도입부 ═══
     React Bits 의 DepthText 를 **바닐라 JS 로 포팅**했다. 아임웹 코드위젯에는 React 를 못 쓴다.
     · 원리는 그대로 : 같은 대상을 N겹 쌓고 translateZ 로 밀어 압출을 만든다.
       마우스를 따라 부드럽게 기울고, 마우스가 없으면 천천히 자전한다.
     · 다만 **로고가 텍스트가 아니라 PNG 워드마크**다. 그래서 글자를 CSS 로 다시 그리지 않고
       **실제 에셋을 그대로 쌓아** 입체를 만든다. 브랜드 마크가 훼손되지 않는다.
     · 색은 브랜드 톤으로. 앞면은 원본 그대로, 뒤로 갈수록 깊은 로즈로 어두워진다.
     접두사 pld- : bb-, plh-, plc-, pll-, pls- 와 겹치지 않는다
     body·html 선택자 없음 — 아임웹 문서를 건드리지 않는다 -->
<style>
.pld-sec{--c:#E9918E;--c-dk:#c4615e;--c-deep:#8c3f44;--ink:#2f2523;--ink2:#5f5754;
  width:100%;max-width:none;margin:0 auto;padding:14px 0 34px;color:var(--ink);
  font-family:'Pretendard',-apple-system,BlinkMacSystemFont,system-ui,'Noto Sans KR',sans-serif;
  word-break:keep-all;overflow-wrap:break-word;text-align:center}
.pld-sec *{box-sizing:border-box}
.pld-wrap{max-width:min(1500px,calc(100% - 48px));margin:0 auto;padding:0 20px}

/* ── 워드마크 3D 압출 ── */
.pld-mark{display:block;width:100%;margin:0 0 clamp(30px,3.8vw,52px);
  perspective:1500px;perspective-origin:50% 48%;isolation:isolate}
.pld-stage{position:relative;display:inline-grid;place-items:center;
  transform-style:preserve-3d;transform:rotateX(-2.4deg) rotateY(3.2deg);
  transform-origin:50% 50%;will-change:transform}
.pld-layer,.pld-face{grid-area:1/1;display:block;width:clamp(280px,64vw,930px);height:auto;
  transform-style:preserve-3d;backface-visibility:hidden;user-select:none;-webkit-user-drag:none}
.pld-layer{position:absolute;inset:0;z-index:0;pointer-events:none}
.pld-face{position:relative;z-index:1;transform:translateZ(.6px);
  filter:drop-shadow(0 30px 44px rgba(140,63,68,.3)) drop-shadow(0 6px 12px rgba(60,30,32,.2))}

/* ── 글 ── */
.pld-h2{margin:0 0 clamp(18px,2vw,26px);font-size:clamp(27.6px,3.1vw,44.4px);font-weight:700;
  line-height:1.4;letter-spacing:-1.4px;text-wrap:balance}
.pld-body{margin:0;font-size:clamp(14.5px,1.2vw,17px);line-height:1.95;letter-spacing:-.5px;
  color:var(--ink2)}
.pld-body + .pld-body{margin-top:clamp(16px,1.8vw,24px)}
.pld-body b{font-weight:700;color:var(--ink)}
.pld-body em{font-style:normal;font-weight:700;color:var(--c-dk)}

@media (max-width:768px){
  .pld-sec{padding:8px 0 24px}
  .pld-wrap{padding:0 16px}
  .pld-mark{margin-bottom:24px;perspective:900px}
  .pld-h2{font-size:21px;letter-spacing:-1px}
  .pld-body{font-size:14.5px;line-height:1.85}
}
@media (prefers-reduced-motion:reduce){
  .pld-stage{will-change:auto;transform:rotateX(-2.4deg) rotateY(3.2deg)!important}
}

/* ── 헤딩 타이핑 효과 ── 원문은 HTML 에 그대로 있어 크롤러가 읽는다.
   스크롤로 화면에 들어올 때 한 번만 친다. 반복하지 않는다. */
.pld-h2{min-height:var(--pld-h2h,auto)}
.pld-cur{display:inline-block;margin-left:.06em;color:var(--c);font-weight:400;
  animation:pld-bl .62s steps(1,end) infinite}
@keyframes pld-bl{0%,49%{opacity:1}50%,100%{opacity:0}}
@media (prefers-reduced-motion:reduce){.pld-cur{display:none}}
</style>

<section class="pld-sec" aria-labelledby="pld-title">
  <div class="pld-wrap">

    <div class="pld-mark" id="pld-mark">
      <span class="pld-stage">
        <img class="pld-face" src="https://cdn.imweb.me/upload/S2025011326b2ce90ae445/c0635f95358c2.png"
             alt="뷰티블라썸 BEAUTY BLOSSOM" width="1213" height="77" decoding="async">
      </span>
    </div>

    <h2 class="pld-h2" id="pld-title">노화는 얼굴의 각 부위마다 다르게 나타납니다.</h2>

    <p class="pld-body">노화는 단순히 주름이 생기는 현상이 아니라, <b>부위별로 서로 다른 원인과 기전이 복합적으로 작용하는 과정</b>입니다.<br>
      따라서 효과적인 개선을 위해서는 각 부위의 특성에 맞춘 <b>정밀한 진단과 맞춤형 접근</b>이 필요합니다.</p>

    <p class="pld-body">뷰티블라썸의원은 해부학적 이해와 다양한 장비를 바탕으로 <em>개인별 맞춤 레이어드 리프팅 솔루션</em>을 제공합니다.</p>

  </div>
</section>

<script>
(function(){
  var root = document.getElementById('pld-mark');
  if (!root || root.dataset.pldReady) return;
  root.dataset.pldReady = '1';

  var stage = root.querySelector('.pld-stage');
  var face  = root.querySelector('.pld-face');
  if (!stage || !face) return;

  var LAYERS = 20;      // 워드마크는 이미지라 글자보다 적게 쌓아도 두께가 난다
  var DEPTH  = 3.6;     // 겹 간격(px) — 로고가 커진 만큼 두껍게
  var TILT   = 7;       // 최대 회전(도)
  var SMOOTH = 0.14;

  // 뒤로 갈수록 깊은 로즈로 — 원본 PNG 를 필터로 물들인다
  for (var i = LAYERS; i >= 1; i--) {
    var t = i / LAYERS, e = t * t;
    var img = face.cloneNode();
    img.className = 'pld-layer';
    img.setAttribute('aria-hidden', 'true');
    img.removeAttribute('alt');
    img.alt = '';
    img.style.transform = 'translateZ(' + (-i * DEPTH).toFixed(2) + 'px)';
    img.style.filter = 'brightness(' + (1 - e * 0.62).toFixed(3) + ') '
                     + 'saturate(' + (1 + e * 0.5).toFixed(3) + ') '
                     + 'hue-rotate(' + (-e * 8).toFixed(1) + 'deg)';
    stage.insertBefore(img, face);
  }

  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  var fine = window.matchMedia && matchMedia('(hover: hover) and (pointer: fine)').matches;
  var base = { x: -TILT * 0.32, y: TILT * 0.42 };
  var cur = { x: base.x, y: base.y }, tgt = { x: base.x, y: base.y };
  var active = false, t0 = performance.now(), raf = 0, visible = true;

  function clamp(v, a, b){ return v < a ? a : v > b ? b : v; }
  function apply(){ stage.style.transform = 'rotateX(' + cur.x.toFixed(3) + 'deg) rotateY(' + cur.y.toFixed(3) + 'deg)'; }

  function onMove(ev){
    var r = root.getBoundingClientRect();
    if (!r.width || !r.height) return;
    active = true;
    var x = clamp((ev.clientX - (r.left + r.width / 2)) / (r.width * 0.8), -1, 1);
    var y = clamp((ev.clientY - (r.top + r.height / 2)) / (r.height * 0.8), -1, 1);
    tgt.x = base.x - y * TILT;
    tgt.y = base.y + x * TILT;
  }
  function onLeave(){ active = false; tgt.x = base.x; tgt.y = base.y; }

  if (fine) {
    addEventListener('pointermove', onMove, { passive: true });
    addEventListener('pointerleave', onLeave);
    addEventListener('blur', onLeave);
  }

  // 화면 밖이면 멈춘다 — 배터리와 CPU 를 아낀다
  if (window.IntersectionObserver) {
    new IntersectionObserver(function(es){ visible = es[0].isIntersecting; }, { threshold: 0 }).observe(root);
  }

  function tick(now){
    if (visible) {
      if (!fine || !active) {                       // 마우스가 없으면 천천히 자전
        var s = (now - t0) / 1000 * 0.35 * Math.PI * 2;
        var amt = fine ? 0.18 : 0.55;
        tgt.x = base.x + Math.sin(s) * TILT * amt;
        tgt.y = base.y + Math.cos(s * 0.85) * TILT * amt;
      }
      cur.x += (tgt.x - cur.x) * SMOOTH;
      cur.y += (tgt.y - cur.y) * SMOOTH;
      apply();
    }
    raf = requestAnimationFrame(tick);
  }
  apply();
  raf = requestAnimationFrame(tick);
})();
<\/script>
<script>
/* 헤딩 타이핑 — 화면에 들어오면 친다. 내려와서 보일 때도, 올라와서 보일 때도.
   화면 밖으로 나가면 되감아 두므로 다시 보일 때 처음부터 다시 쳐진다.
   커서는 끝난 뒤에도 계속 깜박인다.
   글자는 이미 DOM 에 있고 잠시 감췄다 되돌리는 방식이라 크롤러는 완성문을 본다. */
(function(){
  var el=document.querySelector('.pld-h2');
  if(!el||el.getAttribute('data-tt'))return;
  if(!('IntersectionObserver' in window))return;
  if(window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  el.setAttribute('data-tt','1');

  var parts=[],w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false),n;
  while(n=w.nextNode()){ if(n.nodeValue.length) parts.push({n:n,t:n.nodeValue}); }
  var total=0; for(var i=0;i<parts.length;i++) total+=parts[i].t.length;
  if(!total)return;

  el.style.setProperty('--pld-h2h', el.getBoundingClientRect().height+'px'); /* 비어도 안 접히게 */

  var cur=document.createElement('span');
  cur.className='pld-cur'; cur.setAttribute('aria-hidden','true'); cur.textContent='|';
  el.appendChild(cur);

  var shown=-1;
  function draw(k){
    if(k===shown)return; shown=k;
    var left=k;
    for(var j=0;j<parts.length;j++){
      var o=parts[j],take=left<0?0:(left>o.t.length?o.t.length:left);
      o.n.nodeValue=o.t.slice(0,take); left-=take;
    }
  }
  var timer=0;
  function stop(){ if(timer){ clearTimeout(timer); timer=0; } }
  function play(){
    stop(); draw(0);
    var k=0;
    (function step(){
      if(k>=total){ timer=0; return; }
      draw(++k);
      timer=setTimeout(step, 30+Math.random()*26);
    })();
  }

  draw(0);
  var io=new IntersectionObserver(function(es){
    for(var i=0;i<es.length;i++){
      if(es[i].isIntersecting) play();
      else { stop(); draw(0); }
    }
  },{threshold:.35});
  io.observe(el);
})();
<\/script>
`,d=`<!-- ═══ 뷰티블라썸의원 · 퍼스널 레이어드 리프팅 — 장비 9종 상세 ═══\r
     작은 칩 나열 대신 장비마다 큰 블록 하나씩.\r
     · 설명 문구는 전부 **뷰티블라썸 자사 장비 페이지**에서 가져왔다. 새로 지어내지 않았다.\r
     · 지루하지 않게 : 장비마다 깊이 막대(표피/진피/지방/근막)가 다르게 켜지고,\r
       좌우 배치가 번갈아 바뀌며, 사진 뒤에 큰 유령 번호가 깔린다.\r
     · 얕은 층 → 깊은 층 순서. 장비명이 각 장비 페이지로 연결된다.\r
     접두사 pdv- : bb-, plh-, plc-, pll-, pls-, pld- 와 겹치지 않는다\r
     body·html 선택자 없음 — 아임웹 문서를 건드리지 않는다 -->\r
<style>\r
.pdv-sec{--c:#E9918E;--c-dk:#d4706d;--c-bg:#fdf3f2;--ink:#2f2523;--ink2:#5f5754;--mute:#918a87;\r
  --line:#efe7e6;--paper:#faf6f5;\r
  width:100%;max-width:none;margin:0 auto;padding:10px 0 40px;color:var(--ink);\r
  font-family:'Pretendard',-apple-system,BlinkMacSystemFont,system-ui,'Noto Sans KR',sans-serif;\r
  word-break:keep-all;overflow-wrap:break-word;text-align:left}\r
.pdv-sec *{box-sizing:border-box}\r
.pdv-list > .pdv-item:first-child{padding-top:8px}\r
\r
\r
.pdv-list{list-style:none;margin:0 auto;padding:0;max-width:min(1720px,calc(100% - 48px))}\r
.pdv-item{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.04fr);align-items:center;\r
  gap:clamp(26px,4.4vw,72px);padding:clamp(30px,3.6vw,52px) 20px;position:relative}\r
.pdv-item + .pdv-item{border-top:1px solid var(--line)}\r
.pdv-item:nth-child(even) .pdv-copy{order:2}\r
.pdv-item:nth-child(even) .pdv-shot{order:1}\r
\r
.pdv-no{display:block;margin:0 0 11px;font-size:12px;font-weight:800;letter-spacing:.2em;\r
  color:var(--h);font-variant-numeric:tabular-nums}\r
.pdv-en{display:block;margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:.13em;\r
  text-transform:uppercase;color:var(--mute)}\r
.pdv-name{margin:0 0 10px;font-size:clamp(27px,3.1vw,42px);font-weight:800;line-height:1.18;\r
  letter-spacing:-1.8px}\r
.pdv-name a{color:inherit;text-decoration:none;background-image:linear-gradient(var(--h),var(--h));\r
  background-size:0 2px;background-position:0 100%;background-repeat:no-repeat;\r
  transition:background-size .35s cubic-bezier(.22,.61,.36,1),color .25s}\r
.pdv-name a:hover,.pdv-name a:focus-visible{color:var(--h);background-size:100% 2px}\r
.pdv-name a:focus-visible{outline:2px solid var(--h);outline-offset:4px;border-radius:2px}\r
\r
.pdv-spec{margin:0 0 18px;font-size:13px;font-weight:700;letter-spacing:.02em;color:var(--h);\r
  font-variant-numeric:tabular-nums}\r
\r
/* 깊이 막대 — 장비마다 켜지는 칸이 달라 아홉 개가 각각 다른 모양이 된다 */\r
.pdv-depth{list-style:none;margin:0 0 20px;padding:0;display:grid;\r
  grid-template-columns:repeat(4,minmax(0,1fr));gap:4px;max-width:330px}\r
.pdv-depth li{margin:0;padding:8px 4px 7px;border-radius:6px;text-align:center;\r
  font-size:11.4px;font-weight:700;letter-spacing:-.2px;position:relative;\r
  border-top:3px solid transparent;transition:background .3s,color .3s}\r
.pdv-d0{background:#f4efee;color:#b9adab;border-top-color:#e4dbda}\r
.pdv-d1{background:color-mix(in srgb,var(--h) 13%,#fff);color:var(--h);border-top-color:var(--h)}\r
\r
.pdv-desc{margin:0 0 20px;font-size:clamp(14.5px,1.1vw,16.5px);line-height:1.95;\r
  letter-spacing:-.5px;color:var(--ink2);max-width:46ch}\r
.pdv-desc b{font-weight:700;color:var(--ink)}\r
\r
.pdv-tags{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:7px 14px}\r
.pdv-tags li{margin:0;font-size:13.4px;font-weight:600;letter-spacing:-.3px;color:var(--h);opacity:.9}\r
\r
/* 사진 — 뒤에 큰 유령 번호 */\r
.pdv-shot{position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden;\r
  aspect-ratio:4/3.3;padding:clamp(20px,2.6vw,38px);border-radius:22px;\r
  background:linear-gradient(155deg,color-mix(in srgb,var(--h) 7%,#fff) 0%,var(--paper) 62%);\r
  border:1px solid var(--line)}\r
.pdv-ghost{position:absolute;right:4%;bottom:4%;z-index:0;pointer-events:none;\r
  font-size:clamp(120px,17.0vw,230px);font-weight:800;line-height:.8;letter-spacing:-.06em;\r
  color:color-mix(in srgb,var(--h) 12%,transparent);font-variant-numeric:tabular-nums}\r
.pdv-shot img{position:relative;z-index:1;max-width:100%;max-height:100%;width:auto;height:auto;\r
  object-fit:contain;filter:drop-shadow(0 16px 26px rgba(60,40,38,.16));\r
  transition:transform .45s cubic-bezier(.22,.61,.36,1)}\r
.pdv-item:hover .pdv-shot img{transform:translateY(-7px) scale(1.035)}\r
\r
\r
@media (max-width:1000px){\r
  .pdv-item{grid-template-columns:1fr;gap:24px;padding:32px 20px}\r
  .pdv-item:nth-child(even) .pdv-copy,.pdv-item:nth-child(even) .pdv-shot{order:0}\r
  .pdv-shot{aspect-ratio:16/11}\r
  .pdv-desc{max-width:none}\r
}\r
@media (max-width:768px){\r
  .pdv-sec{padding:6px 0 26px}\r
  .pdv-item{padding:26px 16px;gap:20px}\r
  .pdv-name{font-size:25px;letter-spacing:-1.2px}\r
  .pdv-depth{max-width:none;margin-bottom:17px}\r
  .pdv-depth li{font-size:11px;padding:7px 3px 6px}\r
  .pdv-desc{font-size:14.5px;line-height:1.85}\r
  .pdv-shot{aspect-ratio:4/3.3;padding:18px;border-radius:16px}\r
  .pdv-ghost{font-size:110px;right:2%}\r
}\r
@media (prefers-reduced-motion:reduce){\r
  .pdv-shot img,.pdv-name a{transition:none}\r
  .pdv-item:hover .pdv-shot img{transform:none}\r
}\r
\r
/* ── 선 발광 : 마우스가 올라가면 테두리가 빛난다 ── */\r
.pdv-shot{transition:border-color .3s ease,box-shadow .3s ease,transform .3s cubic-bezier(.22,.61,.36,1)}\r
.pdv-shot:hover,.pdv-shot:focus-within{border-color:rgba(233,145,142,.7)!important;\r
  box-shadow:0 0 0 1px rgba(233,145,142,.45),\r
             0 0 14px rgba(233,145,142,.35),\r
             0 0 34px rgba(233,145,142,.18),\r
             0 14px 34px rgba(140,80,78,.14)}\r
@media (prefers-reduced-motion:reduce){.pdv-shot{transition:none}}\r
\r
/* ── 스크롤 등장 ──\r
   숨김 상태는 .js-anim 이 붙었을 때만 적용된다. 자바스크립트가 없거나\r
   막히면 전부 그냥 보인다. 크롤러와 첫 화면 캡처가 빈 화면을 보지 않는다. */\r
.pdv-sec.js-anim .pdv-copy>*{opacity:0;transform:translateX(-30px)}\r
.pdv-sec.js-anim .pdv-item:nth-child(even) .pdv-copy>*{transform:translateX(30px)}\r
.pdv-sec.js-anim .pdv-shot{opacity:0;transform:translateY(34px) scale(.982)}\r
.pdv-sec.js-anim .pdv-ghost{opacity:0;transform:translateY(22px)}\r
.pdv-sec.js-anim .pdv-copy>*,\r
.pdv-sec.js-anim .pdv-shot,\r
.pdv-sec.js-anim .pdv-ghost{\r
  transition:opacity .62s cubic-bezier(.22,.61,.36,1),transform .72s cubic-bezier(.22,.61,.36,1)}\r
.pdv-sec.js-anim .pdv-item.is-in .pdv-copy>*,\r
.pdv-sec.js-anim .pdv-item.is-in .pdv-shot{opacity:1;transform:none}\r
.pdv-sec.js-anim .pdv-item.is-in .pdv-ghost{opacity:1;transform:none;transition-delay:.34s}\r
/* 사진이 먼저 자리를 잡고, 글이 위에서부터 차례로 따라 들어온다 */\r
.pdv-sec.js-anim .pdv-item.is-in .pdv-shot{transition-delay:.04s}\r
.pdv-sec.js-anim .pdv-item.is-in .pdv-copy>*:nth-child(1){transition-delay:.10s}\r
.pdv-sec.js-anim .pdv-item.is-in .pdv-copy>*:nth-child(2){transition-delay:.16s}\r
.pdv-sec.js-anim .pdv-item.is-in .pdv-copy>*:nth-child(3){transition-delay:.22s}\r
.pdv-sec.js-anim .pdv-item.is-in .pdv-copy>*:nth-child(4){transition-delay:.28s}\r
.pdv-sec.js-anim .pdv-item.is-in .pdv-copy>*:nth-child(5){transition-delay:.34s}\r
.pdv-sec.js-anim .pdv-item.is-in .pdv-copy>*:nth-child(6){transition-delay:.40s}\r
.pdv-sec.js-anim .pdv-item.is-in .pdv-copy>*:nth-child(7){transition-delay:.46s}\r
@media (max-width:768px){\r
  .pdv-sec.js-anim .pdv-copy>*,\r
  .pdv-sec.js-anim .pdv-item:nth-child(even) .pdv-copy>*{transform:translateY(20px)}\r
  .pdv-sec.js-anim .pdv-shot{transform:translateY(22px)}\r
}\r
@media (prefers-reduced-motion:reduce){\r
  .pdv-sec.js-anim .pdv-copy>*,.pdv-sec.js-anim .pdv-shot,.pdv-sec.js-anim .pdv-ghost{\r
    opacity:1!important;transform:none!important;transition:none!important}\r
}\r
</style>\r
\r
<section class="pdv-sec" aria-label="장비 9종 상세">\r
\r
\r
\r
  <ol class="pdv-list">\r
    <li class="pdv-item" style="--h:#0A84FF">\r
      <div class="pdv-copy">\r
        <span class="pdv-no" aria-hidden="true">01</span>\r
        <span class="pdv-en">Ultherapy PRIME · MFU-V HIFU</span>\r
        <h3 class="pdv-name"><a href="https://beautyblossom.kr/40">울쎄라피 프라임</a></h3>\r
        <p class="pdv-spec">1.5 · 3.0 · 4.5mm · 8mm 영상</p>\r
        <p class="pdv-desc">시술 중 <b>8mm 깊이까지 초음파 영상</b>으로 피부 구조를 눈으로 확인하면서 진행합니다. 1.5 · 3.0 · 4.5mm 세 깊이에 에너지를 넣고, 4.5mm가 성형에서 끌어올리는 SMAS층입니다.</p>\r
        <ul class="pdv-tags"><li>#근막리프팅</li><li>#얼굴처짐</li><li>#깊은주름</li><li>#V라인</li><li>#홍대울쎄라</li></ul>\r
      </div>\r
      <div class="pdv-shot">\r
        <span class="pdv-ghost" aria-hidden="true">01</span>\r
        <img src="https://pub-7ab1b86fbb9c4442971f0a3a7b5adf9f.r2.dev/beautyblossom/layered/hero-ulthera.webp" alt="울쎄라피 프라임 장비" width="277" height="560" loading="lazy" decoding="async">\r
      </div>\r
    </li>\r
    <li class="pdv-item" style="--h:#E08A2E">\r
      <div class="pdv-copy">\r
        <span class="pdv-no" aria-hidden="true">02</span>\r
        <span class="pdv-en">Thermage FLX · Monopolar RF</span>\r
        <h3 class="pdv-name"><a href="https://beautyblossom.kr/41">써마지 FLX</a></h3>\r
        <p class="pdv-spec">6.78MHz · 자동조절 알고리즘</p>\r
        <p class="pdv-desc">표피는 냉각하고 진피층만 자극합니다. 부위마다 다른 조건을 <b>자동조절 알고리즘</b>이 맞춰주고, 온기가 도는 정도의 느낌으로 콜라겐 리모델링을 유도합니다.</p>\r
        <ul class="pdv-tags"><li>#탄력저하</li><li>#잔주름</li><li>#피부결</li><li>#모공</li><li>#홍대써마지</li></ul>\r
      </div>\r
      <div class="pdv-shot">\r
        <span class="pdv-ghost" aria-hidden="true">02</span>\r
        <img src="https://pub-7ab1b86fbb9c4442971f0a3a7b5adf9f.r2.dev/beautyblossom/layered/hero-thermage.webp" alt="써마지 FLX 장비" width="311" height="560" loading="lazy" decoding="async">\r
      </div>\r
    </li>\r
    <li class="pdv-item" style="--h:#E8562E">\r
      <div class="pdv-copy">\r
        <span class="pdv-no" aria-hidden="true">03</span>\r
        <span class="pdv-en">XERF · Dual Frequency Monopolar RF</span>\r
        <h3 class="pdv-name"><a href="https://beautyblossom.kr/155">세르프(XERF)</a></h3>\r
        <p class="pdv-spec">6.78 + 2MHz · 3단계 Depth</p>\r
        <p class="pdv-desc">루트로닉이 30여 년 레이저 노하우를 모은 모노폴라 RF입니다. <b>6.78MHz는 피부 표층의 결을</b> 섬세하게 다루고 <b>2MHz는 더 깊은 층까지</b> 열을 보냅니다. Shallow에서 Deep까지 3단계로 퍼집니다.</p>\r
        <ul class="pdv-tags"><li>#팔자주름</li><li>#얼굴처짐</li><li>#탄력저하</li><li>#피부탄력</li></ul>\r
      </div>\r
      <div class="pdv-shot">\r
        <span class="pdv-ghost" aria-hidden="true">03</span>\r
        <img src="https://pub-7ab1b86fbb9c4442971f0a3a7b5adf9f.r2.dev/beautyblossom/layered/hero-xerf.webp" alt="세르프(XERF) 장비" width="241" height="560" loading="lazy" decoding="async">\r
      </div>\r
    </li>\r
    <li class="pdv-item" style="--h:#00A9BE">\r
      <div class="pdv-copy">\r
        <span class="pdv-no" aria-hidden="true">04</span>\r
        <span class="pdv-en">Sofwave · SUPERB Ultrasound</span>\r
        <h3 class="pdv-name"><a href="https://beautyblossom.kr/139">소프웨이브</a></h3>\r
        <p class="pdv-spec">12MHz · 1.5mm · 7빔 동시</p>\r
        <p class="pdv-desc">정확히 <b>1.5mm 한 깊이</b>에만 에너지를 넣습니다. 주름이 시작되는 지점입니다. 더 깊이 들어가는 시술과 달리 신경층과 지방층을 건드리지 않아 <b>볼패임 걱정이 없습니다.</b></p>\r
        <ul class="pdv-tags"><li>#잔주름</li><li>#피부결</li><li>#볼패임없는</li><li>#무통리프팅</li></ul>\r
      </div>\r
      <div class="pdv-shot">\r
        <span class="pdv-ghost" aria-hidden="true">04</span>\r
        <img src="https://pub-7ab1b86fbb9c4442971f0a3a7b5adf9f.r2.dev/beautyblossom/layered/hero-sofwave.webp" alt="소프웨이브 장비" width="299" height="560" loading="lazy" decoding="async">\r
      </div>\r
    </li>\r
    <li class="pdv-item" style="--h:#E0447E">\r
      <div class="pdv-copy">\r
        <span class="pdv-no" aria-hidden="true">05</span>\r
        <span class="pdv-en">Onda · Coolwaves Microwave</span>\r
        <h3 class="pdv-name"><a href="https://beautyblossom.kr/42">온다</a></h3>\r
        <p class="pdv-spec">2.45GHz · 3mm / 7mm 핸드피스</p>\r
        <p class="pdv-desc">마이크로파 에너지가 표피를 보호하면서 깊숙이 들어갑니다. <b>특허받은 3mm와 7mm 두 핸드피스</b>로 피부 타입에 맞춰 깊이를 고르고, 접촉식 쿨링으로 표면은 시원하게 유지합니다.</p>\r
        <ul class="pdv-tags"><li>#이중턱</li><li>#볼살처짐</li><li>#얼굴윤곽</li><li>#V라인</li></ul>\r
      </div>\r
      <div class="pdv-shot">\r
        <span class="pdv-ghost" aria-hidden="true">05</span>\r
        <img src="https://pub-7ab1b86fbb9c4442971f0a3a7b5adf9f.r2.dev/beautyblossom/layered/hero-onda.webp" alt="온다 장비" width="218" height="560" loading="lazy" decoding="async">\r
      </div>\r
    </li>\r
    <li class="pdv-item" style="--h:#8B5CF6">\r
      <div class="pdv-copy">\r
        <span class="pdv-no" aria-hidden="true">06</span>\r
        <span class="pdv-en">Density · Mono + Bipolar RF</span>\r
        <h3 class="pdv-name"><a href="https://beautyblossom.kr/153">덴서티</a></h3>\r
        <p class="pdv-spec">최대 400W · 임피던스 피드백</p>\r
        <p class="pdv-desc">국산 5세대 고주파입니다. <b>모노폴라는 깊은 층까지 강력하게, 바이폴라는 얕은 층을 촘촘하게</b> 커버합니다. 임피던스 피드백이 사람마다 다른 피부 저항을 샷마다 측정해 출력을 맞춥니다.</p>\r
        <ul class="pdv-tags"><li>#이중턱</li><li>#턱선</li><li>#얼굴처짐</li><li>#팔자주름</li></ul>\r
      </div>\r
      <div class="pdv-shot">\r
        <span class="pdv-ghost" aria-hidden="true">06</span>\r
        <img src="https://pub-7ab1b86fbb9c4442971f0a3a7b5adf9f.r2.dev/beautyblossom/layered/hero-density.webp" alt="덴서티 장비" width="278" height="560" loading="lazy" decoding="async">\r
      </div>\r
    </li>\r
    <li class="pdv-item" style="--h:#6D5CFF">\r
      <div class="pdv-copy">\r
        <span class="pdv-no" aria-hidden="true">07</span>\r
        <span class="pdv-en">LinearZ · Line &amp; Dot HIFU</span>\r
        <h3 class="pdv-name"><a href="https://beautyblossom.kr/154">리니어지</a></h3>\r
        <p class="pdv-spec">1.5 – 13mm · 0.5mm 단위</p>\r
        <p class="pdv-desc">초음파를 <b>선(Linear)과 점(Dot) 두 가지 모드</b>로 넣습니다. 카트리지 하나로 1.5mm부터 13mm까지 0.5mm 단위로 조절되기 때문에, 개인별 피부 두께에 맞춰 깊이를 고릅니다.</p>\r
        <ul class="pdv-tags"><li>#얼굴처짐</li><li>#턱선</li><li>#V라인</li><li>#깊은주름</li></ul>\r
      </div>\r
      <div class="pdv-shot">\r
        <span class="pdv-ghost" aria-hidden="true">07</span>\r
        <img src="https://pub-7ab1b86fbb9c4442971f0a3a7b5adf9f.r2.dev/beautyblossom/layered/hero-linearz-white.v1.webp" alt="리니어지 장비" width="288" height="560" loading="lazy" decoding="async">\r
      </div>\r
    </li>\r
    <li class="pdv-item" style="--h:#E0554F">\r
      <div class="pdv-copy">\r
        <span class="pdv-no" aria-hidden="true">08</span>\r
        <span class="pdv-en">Fotra Quattro · Quadruple Wavelength Diode</span>\r
        <h3 class="pdv-name"><a href="https://beautyblossom.kr/titanium-fortra-quattro">포트라 콰트로</a></h3>\r
        <p class="pdv-spec">755 · 808 · 940 · 1064nm</p>\r
        <p class="pdv-desc">기존 3파장 구성에 <b>940nm를 더한 4파장 설계</b>입니다. 파장이 길어질수록 피부 깊은 층까지 도달하기 때문에, 표피의 톤 정돈부터 진피와 지방층까지 층별로 나눠 접근합니다.</p>\r
        <ul class="pdv-tags"><li>#피부톤</li><li>#홍조</li><li>#피부결</li><li>#모공</li><li>#홍대레이저</li></ul>\r
      </div>\r
      <div class="pdv-shot">\r
        <span class="pdv-ghost" aria-hidden="true">08</span>\r
        <img src="https://pub-7ab1b86fbb9c4442971f0a3a7b5adf9f.r2.dev/beautyblossom/layered/hero-fortra.webp" alt="포트라 콰트로 장비" width="282" height="560" loading="lazy" decoding="async">\r
      </div>\r
    </li>\r
    <li class="pdv-item" style="--h:#E8455C">\r
      <div class="pdv-copy">\r
        <span class="pdv-no" aria-hidden="true">09</span>\r
        <span class="pdv-en">Alltite · DLTD® Dielectric Heating</span>\r
        <h3 class="pdv-name"><a href="https://beautyblossom.kr/alltite-lifting">올타이트</a></h3>\r
        <p class="pdv-spec">유전가열 · 사파이어 렌즈</p>\r
        <p class="pdv-desc"><b>채우지 않고 끌어올립니다.</b> 암 치료에 쓰이던 유전가열 원리를 가져와, 표피는 차갑게 지키고 진피와 SMAS층에만 열을 모읍니다. 사파이어 렌즈가 원하는 깊이에만 에너지를 집속합니다.</p>\r
        <ul class="pdv-tags"><li>#볼륨보존</li><li>#얇은피부</li><li>#탄력저하</li><li>#얼굴처짐</li></ul>\r
      </div>\r
      <div class="pdv-shot">\r
        <span class="pdv-ghost" aria-hidden="true">09</span>\r
        <img src="https://pub-7ab1b86fbb9c4442971f0a3a7b5adf9f.r2.dev/beautyblossom/layered/hero-alltite.webp" alt="올타이트 장비" width="373" height="560" loading="lazy" decoding="async">\r
      </div>\r
    </li>\r
  </ol>\r
\r
\r
</section>\r
\r
<script>\r
/* 장비 블록 스크롤 등장 — 화면에 들어오면 한 번만 재생한다.\r
   .js-anim 을 여기서 붙이므로, 스크립트가 안 돌면 숨김 규칙 자체가 없다. */\r
(function(){\r
  var sec=document.querySelector('.pdv-sec');\r
  if(!sec||sec.getAttribute('data-anim'))return;\r
  if(!('IntersectionObserver' in window))return;\r
  if(window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches)return;\r
  sec.setAttribute('data-anim','1');\r
  sec.classList.add('js-anim');\r
  var items=sec.querySelectorAll('.pdv-item');\r
  var io=new IntersectionObserver(function(es){\r
    for(var i=0;i<es.length;i++){\r
      if(es[i].isIntersecting){ es[i].target.classList.add('is-in'); io.unobserve(es[i].target); }\r
    }\r
  },{threshold:.18,rootMargin:'0px 0px -8% 0px'});\r
  for(var i=0;i<items.length;i++) io.observe(items[i]);\r
})();\r
<\/script>\r
`,c=`<!-- 뷰티블라썸 · 퍼스널 레이어드 리프팅 · 얼굴 부위 안내
     pfz- 범위 안에서만 동작. 투명 인물 위의 9개 위치와 외곽 라벨을 연결한다. -->
<style>
.pfz-sec{--c:#E9918E;--c-dk:#a85b58;--c-hot:#d87773;--c-bg:#fdf3f2;--ink:#2f2523;--ink2:#5f5754;
  --line:#eed3d1;width:100%;margin:0 auto;padding:14px 0 34px;color:var(--ink);
  font-family:'Pretendard',-apple-system,BlinkMacSystemFont,system-ui,'Noto Sans KR',sans-serif;
  word-break:keep-all;overflow-wrap:break-word;text-align:left}
.pfz-sec *{box-sizing:border-box}
.pfz-head{max-width:1080px;margin:0 auto 24px;text-align:center;padding:0 20px}
.pfz-kw{display:block;margin:0 0 13px;font-size:13px;font-weight:700;letter-spacing:.22em;color:var(--c)}
.pfz-h2{margin:0 0 14px;font-size:clamp(30px,3.4vw,45.6px);font-weight:700;line-height:1.38;
  letter-spacing:-1.4px;text-wrap:balance}
.pfz-h2 em{font-style:normal;color:var(--c)}
/* 다른 구간과 같은 스크롤 진입 타이핑 · 반응형에서도 완성문 높이 유지 */
.pfz-h2{min-height:var(--pfz-h2h,auto)}
.pfz-cur{display:inline-block;margin-left:.06em;color:var(--c);font-weight:400;
  animation:pfz-bl .62s steps(1,end) infinite}
@keyframes pfz-bl{0%,49%{opacity:1}50%,100%{opacity:0}}
@media(prefers-reduced-motion:reduce){.pfz-cur{display:none}}
.pfz-lead{margin:0;font-size:clamp(15px,1.3vw,18px);line-height:1.8;letter-spacing:-.6px;color:var(--ink2)}
.pfz-layout{position:relative;width:calc(100% - 48px);max-width:1440px;margin:0 auto}
.pfz-stage{position:relative;width:100%;aspect-ratio:1672/941;border-radius:24px;overflow:hidden;isolation:isolate;
  background:radial-gradient(ellipse at 50% 38%,#fffdfc 0%,#fff6f4 42%,#f9e5e3 100%)}
.pfz-person{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center top;
  user-select:none;-webkit-user-drag:none}
.pfz-lines{position:absolute;inset:0;z-index:1;width:100%;height:100%;pointer-events:none}
.pfz-line{fill:none;stroke:#c69d9a;stroke-width:1;stroke-linecap:round;stroke-linejoin:round;opacity:.52;
  transition:stroke .2s,stroke-width .2s,opacity .2s}
.pfz-line.is-active,.pfz-line.is-hover{stroke:var(--c-dk);stroke-width:1.65;opacity:1}
.pfz-dot{position:absolute;z-index:2;display:block;width:28px;height:28px;min-width:0;min-height:0;
  margin:-14px 0 0 -14px;padding:0;border:0;border-radius:50%;background:transparent;box-shadow:none;
  appearance:none;-webkit-appearance:none;cursor:pointer;visibility:hidden}
.pfz-dot::before{content:'';position:absolute;inset:9px;border:2px solid #fff;border-radius:50%;
  background:#b88c88;box-shadow:0 0 0 1px rgba(136,88,84,.4);transition:background .2s,box-shadow .2s}
.pfz-dot.is-active::before,.pfz-dot.is-hover::before{background:var(--c-dk);box-shadow:0 0 0 4px rgba(216,119,115,.24)}
.pfz-stage.is-ready .pfz-dot{visibility:visible}
.pfz-dot:focus-visible{outline:2px solid var(--c-dk);outline-offset:1px}
.pfz-labels{list-style:none;margin:0;padding:0}
.pfz-label-wrap{position:absolute;z-index:3;top:var(--label-y);width:21%;transform:translateY(-50%)}
.pfz-label-wrap[data-side="left"]{left:3.5%}
.pfz-label-wrap[data-side="right"]{right:3.5%}
.pfz-label{position:relative;display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;
  min-width:0;min-height:54px;padding:12px 0;margin:0;background:transparent;border:0;border-bottom:1px solid var(--line);
  border-radius:0;box-shadow:none;font:inherit;text-align:left;color:var(--ink);cursor:pointer;appearance:none;-webkit-appearance:none;
  transition:color .2s,border-color .2s}
.pfz-label-name{display:inline-block;flex-shrink:0;overflow:hidden;padding:.08em 0;
  font-size:clamp(18px,1.7vw,24px);font-weight:650;letter-spacing:-.6px}
.pfz-letter{display:inline-block}
.pfz-label::after{content:'';position:absolute;left:0;right:0;bottom:-1px;height:2px;background:var(--c-dk);
  transform:scaleX(0);transform-origin:left;transition:transform .55s cubic-bezier(.2,.75,.2,1)}
.pfz-label.is-active::after,.pfz-label:hover::after{transform:scaleX(1)}
.pfz-play .pfz-letter{animation:pfz-letter-rise .62s cubic-bezier(.16,1,.3,1) both;
  animation-delay:calc(var(--pfz-delay,0ms) + var(--letter-index,0)*50ms)}
@keyframes pfz-letter-rise{0%{transform:translateY(105%);opacity:0;filter:blur(2px)}
  70%{transform:translateY(-5%);opacity:1;filter:blur(0)}100%{transform:translateY(0);opacity:1;filter:blur(0)}}
.pfz-label-hint{font-size:clamp(11px,1vw,13px);line-height:1.5;font-weight:400;color:#85716d;text-align:right}
.pfz-label.is-active,.pfz-label:hover{color:var(--c-dk);border-color:var(--c-dk)}
.pfz-label.is-active .pfz-label-name{font-weight:750}
.pfz-label:focus-visible{outline:2px solid var(--c-dk);outline-offset:5px;border-radius:2px}
.pfz-image-note{position:absolute;inset:42% 15% auto;margin:0;text-align:center;font-size:15px;color:var(--ink2)}
.pfz-image-note[hidden]{display:none}
.pfz-stage.is-unavailable .pfz-person,.pfz-stage.is-unavailable .pfz-lines,.pfz-stage.is-unavailable .pfz-dot{display:none}
@media(max-width:1080px) and (min-width:821px){
  .pfz-label{display:block;padding:6px 0;min-height:0;line-height:1.25}
  .pfz-label-name{padding:0;font-size:17px;line-height:1.25}
  .pfz-label-hint{display:block;margin-top:2px;line-height:1.4;text-align:left}
}
@media(max-width:820px){
  .pfz-sec{padding:8px 0 26px}
  .pfz-head{margin-bottom:18px;padding:0 16px}
  .pfz-h2{font-size:23px;letter-spacing:-1.1px}
  .pfz-lead{font-size:15px;line-height:1.75}
  .pfz-layout{width:calc(100% - 32px)}
  .pfz-stage{aspect-ratio:4/5;max-height:720px;border-radius:18px}
  .pfz-lines{display:none}
  .pfz-dot{width:24px;height:24px;margin:-12px 0 0 -12px}
  .pfz-dot::before{inset:7px}
  .pfz-labels{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:12px;row-gap:0;margin-top:12px}
  .pfz-label-wrap{position:static;width:auto;min-width:0;transform:none}
  .pfz-label{flex-direction:column;justify-content:flex-start;gap:4px;height:100%;min-height:68px;padding:11px 4px;text-align:center}
  .pfz-label-name{font-size:15px}
  .pfz-label-hint{display:block;font-size:12px;line-height:1.5;text-align:center}
  .pfz-label:focus-visible{outline-offset:0}
}
@media(prefers-reduced-motion:reduce){
  .pfz-label,.pfz-label::after,.pfz-dot::before,.pfz-line{transition:none}
  .pfz-play .pfz-letter{animation:none}
}
</style>
<section class="pfz-sec" aria-labelledby="pfz-title">
  <header class="pfz-head">
    <span class="pfz-kw">FACIAL ZONES</span>
    <h2 class="pfz-h2" id="pfz-title">같은 얼굴이라도 <em>부위마다 무너지는 방식</em>이 다릅니다.</h2>
    <p class="pfz-lead">눈가는 얇아서 주름이 먼저 생기고, 턱선은 지지력이 빠지면서 윤곽이 무너집니다. 원인이 다르면 넣어야 할 에너지도 달라집니다.</p>
  </header>
  <div class="pfz-layout">
    <div class="pfz-stage" id="pfz-stage">
      <img class="pfz-person" src="https://pub-7ab1b86fbb9c4442971f0a3a7b5adf9f.r2.dev/beautyblossom/layered/feedback-20260908/face-reference-cutout.v5.webp" alt="이마부터 목까지 각 부위를 살펴볼 수 있는 정면 인물" width="1672" height="941" loading="lazy" decoding="async">
      <svg class="pfz-lines" aria-hidden="true" focusable="false" preserveAspectRatio="none">
        <path class="pfz-line is-active" data-z="forehead"></path>
        <path class="pfz-line" data-z="eye"></path>
        <path class="pfz-line" data-z="undereye"></path>
        <path class="pfz-line" data-z="cheek"></path>
        <path class="pfz-line" data-z="fold"></path>
        <path class="pfz-line" data-z="mouth"></path>
        <path class="pfz-line" data-z="jaw"></path>
        <path class="pfz-line" data-z="chin"></path>
        <path class="pfz-line" data-z="neck"></path>
      </svg>
      <button class="pfz-dot is-active" data-z="forehead" data-x="49.5" data-y="28.8" type="button" aria-label="이마 부위 선택" aria-pressed="true"></button>
      <button class="pfz-dot" data-z="eye" data-x="57" data-y="41.5" type="button" aria-label="눈가 부위 선택" aria-pressed="false"></button>
      <button class="pfz-dot" data-z="undereye" data-x="45.8" data-y="44.8" type="button" aria-label="눈밑 부위 선택" aria-pressed="false"></button>
      <button class="pfz-dot" data-z="cheek" data-x="44.5" data-y="50.8" type="button" aria-label="앞볼 부위 선택" aria-pressed="false"></button>
      <button class="pfz-dot" data-z="fold" data-x="52.7" data-y="53.5" type="button" aria-label="팔자 부위 선택" aria-pressed="false"></button>
      <button class="pfz-dot" data-z="mouth" data-x="46.1" data-y="60" type="button" aria-label="입가 부위 선택" aria-pressed="false"></button>
      <button class="pfz-dot" data-z="jaw" data-x="54.4" data-y="58.1" type="button" aria-label="턱선 부위 선택" aria-pressed="false"></button>
      <button class="pfz-dot" data-z="chin" data-x="49.1" data-y="67.8" type="button" aria-label="턱밑 부위 선택" aria-pressed="false"></button>
      <button class="pfz-dot" data-z="neck" data-x="48" data-y="74.5" type="button" aria-label="목 부위 선택" aria-pressed="false"></button>
      <p class="pfz-image-note" hidden>인물 이미지를 불러오지 못했습니다. 부위별 요약을 확인하세요.</p>
    </div>
    <ul class="pfz-labels" aria-label="얼굴과 목의 세부 부위">
      <li class="pfz-label-wrap" data-side="left" style="--label-y:23%">
        <button class="pfz-label is-active" data-z="forehead" type="button" aria-pressed="true">
          <span class="pfz-label-name">이마</span><span class="pfz-label-hint">미세주름 · 탄력 저하</span>
        </button>
      </li>
      <li class="pfz-label-wrap" data-side="right" style="--label-y:29%">
        <button class="pfz-label" data-z="eye" type="button" aria-pressed="false">
          <span class="pfz-label-name">눈가</span><span class="pfz-label-hint">잔주름 · 눈꺼풀 처짐</span>
        </button>
      </li>
      <li class="pfz-label-wrap" data-side="left" style="--label-y:39%">
        <button class="pfz-label" data-z="undereye" type="button" aria-pressed="false">
          <span class="pfz-label-name">눈밑</span><span class="pfz-label-hint">눈밑 볼록함 · 피곤한 인상</span>
        </button>
      </li>
      <li class="pfz-label-wrap" data-side="left" style="--label-y:54%">
        <button class="pfz-label" data-z="cheek" type="button" aria-pressed="false">
          <span class="pfz-label-name">앞볼</span><span class="pfz-label-hint">볼륨 꺼짐 · 붉은기</span>
        </button>
      </li>
      <li class="pfz-label-wrap" data-side="right" style="--label-y:48%">
        <button class="pfz-label" data-z="fold" type="button" aria-pressed="false">
          <span class="pfz-label-name">팔자</span><span class="pfz-label-hint">탄력 저하 · 볼륨 꺼짐</span>
        </button>
      </li>
      <li class="pfz-label-wrap" data-side="left" style="--label-y:69%">
        <button class="pfz-label" data-z="mouth" type="button" aria-pressed="false">
          <span class="pfz-label-name">입가</span><span class="pfz-label-hint">지방 처짐 · 입가의 골</span>
        </button>
      </li>
      <li class="pfz-label-wrap" data-side="right" style="--label-y:66%">
        <button class="pfz-label" data-z="jaw" type="button" aria-pressed="false">
          <span class="pfz-label-name">턱선</span><span class="pfz-label-hint">지지력 저하 · 흐려진 윤곽</span>
        </button>
      </li>
      <li class="pfz-label-wrap" data-side="right" style="--label-y:83%">
        <button class="pfz-label" data-z="chin" type="button" aria-pressed="false">
          <span class="pfz-label-name">턱밑</span><span class="pfz-label-hint">지방 축적 · 이중턱</span>
        </button>
      </li>
      <li class="pfz-label-wrap" data-side="left" style="--label-y:86%">
        <button class="pfz-label" data-z="neck" type="button" aria-pressed="false">
          <span class="pfz-label-name">목</span><span class="pfz-label-hint">탄력 저하 · 깊어진 주름</span>
        </button>
      </li>
    </ul>
  </div>
</section>
<script>
/* 한 글자당 30~56ms, 화면 재진입 시 다시 재생. 원문과 강조색을 유지한다. */
(function(){
  var el=document.querySelector('.pfz-h2');
  if(!el||el.getAttribute('data-tt')||!window.IntersectionObserver)return;
  var reduce=window.matchMedia('(prefers-reduced-motion:reduce)');
  if(reduce.matches)return;
  var parts=[],walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT),node,total=0;
  while(node=walker.nextNode()){
    var chars=Array.from(node.nodeValue||'');
    if(chars.length){parts.push({node:node,chars:chars});total+=chars.length;}
  }
  if(!total)return;
  el.setAttribute('data-tt','1');
  el.setAttribute('aria-label',el.textContent);
  var cur=document.createElement('span');
  cur.className='pfz-cur';cur.setAttribute('aria-hidden','true');cur.textContent='|';
  el.appendChild(cur);
  var shown=total,timer=0,frame=0,visible=false;
  function draw(count){
    shown=count;
    var remaining=count;
    parts.forEach(function(part){
      var take=Math.max(0,Math.min(remaining,part.chars.length));
      part.node.nodeValue=part.chars.slice(0,take).join('');remaining-=take;
    });
  }
  function stop(){clearTimeout(timer);timer=0;}
  function measure(){
    frame=0;
    if(!el.isConnected)return;
    var saved=shown;
    draw(total);el.style.removeProperty('--pfz-h2h');
    el.style.setProperty('--pfz-h2h',el.getBoundingClientRect().height+'px');
    draw(saved);
  }
  function scheduleMeasure(){
    if(frame)cancelAnimationFrame(frame);
    frame=requestAnimationFrame(measure);
  }
  function play(){
    stop();draw(0);
    (function step(){
      if(!el.isConnected){stop();return;}
      if(shown>=total){timer=0;return;}
      draw(shown+1);timer=setTimeout(step,30+Math.random()*26);
    })();
  }
  measure();draw(0);
  var observer=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(visible===entry.isIntersecting)return;
      visible=entry.isIntersecting;
      if(reduce.matches){stop();draw(total);return;}
      if(visible)play();else{stop();draw(0);}
    });
  },{threshold:.35});
  observer.observe(el);
  addEventListener('resize',scheduleMeasure);
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(scheduleMeasure);
  function motionChanged(){
    stop();cur.hidden=reduce.matches;
    if(reduce.matches)draw(total);else if(visible)play();else draw(0);
    scheduleMeasure();
  }
  if(reduce.addEventListener)reduce.addEventListener('change',motionChanged);
  else if(reduce.addListener)reduce.addListener(motionChanged);
})();
<\/script>
<script>
(function(){
  var stage=document.getElementById('pfz-stage');
  if(!stage||stage.dataset.pfzReady)return;
  stage.dataset.pfzReady='1';
  var root=stage.closest('.pfz-sec');
  var image=stage.querySelector('.pfz-person');
  var svg=stage.querySelector('.pfz-lines');
  var labels=Array.prototype.slice.call(root.querySelectorAll('.pfz-label'));
  var dots=Array.prototype.slice.call(stage.querySelectorAll('.pfz-dot'));
  var lines=Array.prototype.slice.call(svg.querySelectorAll('.pfz-line'));
  var controls=labels.concat(dots);
  var parts=controls.concat(lines);
  var frame=0;
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)');

  labels.forEach(function(label){
    var name=label.querySelector('.pfz-label-name');
    var text=name.textContent;
    label.setAttribute('aria-label',text+' — '+label.querySelector('.pfz-label-hint').textContent);
    name.textContent='';
    Array.from(text).forEach(function(character,index){
      var letter=document.createElement('span');
      letter.className='pfz-letter';
      letter.style.setProperty('--letter-index',index);
      letter.textContent=character;
      name.appendChild(letter);
    });
  });
  function playLabel(label,delay){
    if(!label||reduce.matches)return;
    label.style.setProperty('--pfz-delay',(delay||0)+'ms');
    label.classList.remove('pfz-play');
    void label.offsetWidth;
    label.classList.add('pfz-play');
  }
  if(window.IntersectionObserver){
    var entrance=new IntersectionObserver(function(entries){
      if(entries[0].isIntersecting){
        labels.forEach(function(label,index){playLabel(label,index*45);});
        entrance.disconnect();
      }
    },{threshold:.15});
    entrance.observe(stage);
  }

  function find(list,key){
    return list.find(function(el){return el.dataset.z===key;});
  }
  function select(key){
    var label=find(labels,key);
    if(!label)return;
    parts.forEach(function(el){el.classList.toggle('is-active',el.dataset.z===key);});
    controls.forEach(function(el){el.setAttribute('aria-pressed',String(el.dataset.z===key));});
    playLabel(label,0);
  }
  controls.forEach(function(el){
    el.addEventListener('click',function(){select(el.dataset.z);});
    el.addEventListener('pointerenter',function(){
      parts.forEach(function(part){part.classList.toggle('is-hover',part.dataset.z===el.dataset.z);});
    });
    el.addEventListener('pointerleave',function(){
      parts.forEach(function(part){part.classList.remove('is-hover');});
    });
  });

  function draw(){
    frame=0;
    if(!image.naturalWidth||!image.naturalHeight)return;
    var box=stage.getBoundingClientRect();
    var w=box.width,h=box.height;
    if(!w||!h)return;
    // cover 확대와 가운데/상단 크롭을 반영해 실제 이미지 좌표를 표시한다.
    var scale=Math.max(w/image.naturalWidth,h/image.naturalHeight);
    var iw=image.naturalWidth*scale,ih=image.naturalHeight*scale;
    dots.forEach(function(dot){
      var x=Number(dot.dataset.x),y=Number(dot.dataset.y);
      if(!Number.isFinite(x)||!Number.isFinite(y))return;
      dot.style.left=((w-iw)/2+iw*x/100)+'px';
      dot.style.top=(ih*y/100)+'px';
    });
    stage.classList.add('is-ready');
    if(getComputedStyle(svg).display==='none')return;
    svg.setAttribute('viewBox','0 0 '+w+' '+h);
    lines.forEach(function(line){
      var dot=find(dots,line.dataset.z),label=find(labels,line.dataset.z);
      if(!dot||!label)return;
      var d=dot.getBoundingClientRect(),l=label.getBoundingClientRect();
      var dx=d.left-box.left+d.width/2,dy=d.top-box.top+d.height/2;
      var isLeft=label.parentElement.dataset.side==='left';
      var sx=(isLeft?l.right:l.left)-box.left,sy=l.bottom-box.top-.5;
      var elbow=sx+(dx-sx)*.55;
      line.setAttribute('d','M'+sx.toFixed(2)+','+sy.toFixed(2)+' H'+elbow.toFixed(2)+' L'+dx.toFixed(2)+','+dy.toFixed(2));
    });
  }
  function schedule(){
    if(frame)cancelAnimationFrame(frame);
    frame=requestAnimationFrame(draw);
  }
  function ready(){
    stage.classList.remove('is-unavailable');
    stage.querySelector('.pfz-image-note').hidden=true;
    schedule();
  }
  function unavailable(){
    stage.classList.add('is-unavailable');
    stage.classList.remove('is-ready');
    stage.querySelector('.pfz-image-note').hidden=false;
  }
  image.addEventListener('load',ready);
  image.addEventListener('error',unavailable);
  addEventListener('resize',schedule);
  if(window.ResizeObserver){
    var observer=new ResizeObserver(schedule);
    observer.observe(stage);
    labels.forEach(function(label){observer.observe(label);});
  }
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(schedule);
  if(image.complete){if(image.naturalWidth)ready();else unavailable();}
  schedule();
})();
<\/script>
`,f=`<!-- ═══ 뷰티블라썸의원 · 퍼스널 레이어드 리프팅 — 시술 과정 4단계 ═══\r
     문구는 라이브 /39 원본 그대로. 새로 지어내지 않았다.\r
     4단계는 파스텔 핑크 유리·로즈골드 소재의 3D 픽토그램을 사용한다.
     접두사 ppc- : bb-, plh-, plc-, pld-, pdv-, pls- 와 겹치지 않는다\r
     body·html 선택자 없음 -->\r
<style>\r
.ppc-sec{--c:#E9918E;--c-dk:#d4706d;--c-bg:#fdf3f2;--ink:#2f2523;--ink2:#5f5754;--mute:#918a87;\r
  --line:#efe7e6;--paper:#faf6f5;\r
  width:100%;max-width:none;margin:0 auto;padding:14px 0 40px;color:var(--ink);\r
  font-family:'Pretendard',-apple-system,BlinkMacSystemFont,system-ui,'Noto Sans KR',sans-serif;\r
  word-break:keep-all;overflow-wrap:break-word;text-align:left}\r
.ppc-sec *{box-sizing:border-box}\r
\r
.ppc-head{max-width:1000px;margin:0 auto 44px;text-align:center;padding:0 20px}\r
.ppc-kw{display:block;margin:0 0 13px;font-size:16.2px;font-weight:700;letter-spacing:.22em;\r
  text-transform:uppercase;color:var(--c)}\r
.ppc-h2{margin:0 0 15px;font-size:clamp(30px,3.4vw,45.6px);font-weight:700;line-height:1.38;\r
  letter-spacing:-1.4px;text-wrap:balance}\r
.ppc-h2 em{font-style:normal;color:var(--c)}\r
.ppc-lead{margin:0;font-size:clamp(15px,1.6vw,22.5px);line-height:1.8;letter-spacing:-.6px;color:var(--ink2)}\r
\r
/* ── 4단계 ── */\r
.ppc-list{list-style:none;margin:0 auto;padding:0 20px;max-width:min(1720px,calc(100% - 48px));\r
  display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:clamp(14px,2vw,27.5px)}\r
.ppc-step{position:relative;display:flex;flex-direction:column;\r
  padding:clamp(20px,2.5vw,32.5px);border-radius:20px;background:#fff;border:1px solid var(--line);\r
  box-shadow:0 8px 26px rgba(80,55,52,.05);transition:transform .3s cubic-bezier(.22,.61,.36,1),box-shadow .3s}\r
.ppc-step:hover{border-color:#ecc5c2;box-shadow:0 10px 28px rgba(140,80,78,.08)}
\r
.ppc-no{display:flex;align-items:center;gap:9px;margin:0 0 14px;\r
  font-size:15px;font-weight:800;letter-spacing:.18em;color:var(--c);font-variant-numeric:tabular-nums}\r
.ppc-no::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,var(--c),transparent)}\r
\r
/* 3D 픽토그램 — 이미지 안에는 글자를 넣지 않는다. */\r
.ppc-figure{margin:0 0 16px;aspect-ratio:1/1;border-radius:14px;overflow:hidden;\r
  display:grid;place-items:center;text-align:center;padding:0;\r
  background:#fff;border:0}\r
.ppc-figure img{width:100%;height:100%;object-fit:contain;display:block}\r
\r
.ppc-en{display:block;margin:0 0 5px;font-size:14.2px;font-weight:700;letter-spacing:.12em;\r
  text-transform:uppercase;color:var(--mute)}\r
.ppc-t{margin:0 0 10px;font-size:clamp(17px,1.8vw,26.2px);font-weight:700;line-height:1.3;letter-spacing:-.8px}\r
.ppc-d{margin:0;font-size:clamp(13.5px,1.2vw,18.8px);line-height:1.85;letter-spacing:-.4px;color:var(--ink2)}\r
\r
@media (max-width:1000px){\r
  .ppc-list{grid-template-columns:repeat(2,minmax(0,1fr))}\r
}\r
@media (max-width:768px){\r
  .ppc-sec{padding:8px 0 26px}\r
  .ppc-head{margin-bottom:28px;padding:0 16px}\r
  .ppc-h2{font-size:23px;letter-spacing:-1.1px}\r
  .ppc-lead{font-size:15px;line-height:1.75}\r
  .ppc-list{grid-template-columns:1fr;gap:12px;padding:0 16px;max-width:100%}\r
  .ppc-step{padding:20px;border-radius:16px}\r
  .ppc-step:hover{transform:none}\r
  .ppc-figure{aspect-ratio:1/1;width:min(100%,240px);align-self:center;margin-bottom:14px}\r
  .ppc-t{font-size:18px}\r
  .ppc-d{font-size:14px}\r
}\r
@media (prefers-reduced-motion:reduce){.ppc-step{transition:none}.ppc-step:hover{transform:none}}\r
\r
/* 이미지 안쪽에는 별도 테두리나 발광을 넣지 않는다. */
.ppc-step{transition:border-color .3s ease,box-shadow .3s ease}
@media (prefers-reduced-motion:reduce){.ppc-step{transition:none}}
\r
/* ── 헤딩 타이핑 효과 ── 원문은 HTML 에 그대로 있어 크롤러가 읽는다.\r
   스크롤로 화면에 들어올 때 한 번만 친다. 반복하지 않는다. */\r
.ppc-h2{min-height:var(--ppc-h2h,auto)}\r
.ppc-cur{display:inline-block;margin-left:.06em;color:var(--c);font-weight:400;\r
  animation:ppc-bl .62s steps(1,end) infinite}\r
@keyframes ppc-bl{0%,49%{opacity:1}50%,100%{opacity:0}}\r
@media (prefers-reduced-motion:reduce){.ppc-cur{display:none}}\r
</style>\r
\r
<section class="ppc-sec" aria-labelledby="ppc-title">\r
\r
  <header class="ppc-head">\r
    <span class="ppc-kw">Treatment Process</span>\r
    <h2 class="ppc-h2" id="ppc-title">진단에서 회복까지, <em>네 단계</em>로 진행합니다.</h2>\r
    <p class="ppc-lead">장비를 고르기 전에 피부를 먼저 읽습니다. 어느 층이 어떻게 늘어졌는지 확인한 다음, 그 층에 맞는 장비를 순서대로 올립니다.</p>\r
  </header>\r
\r
  <ol class="ppc-list">\r
\r
    <li class="ppc-step">\r
      <span class="ppc-no">01</span>\r
      <figure class="ppc-figure">\r
        <img src="https://pub-7ab1b86fbb9c4442971f0a3a7b5adf9f.r2.dev/beautyblossom/layered/feedback-20260907-r2/01-diagnosis.v2.webp" alt="얼굴과 확대경으로 표현한 정밀 진단 3D 픽토그램"\r
             width="1024" height="1024" loading="lazy" decoding="async">\r
      </figure>\r
      <span class="ppc-en">Precision Diagnosis</span>\r
      <h3 class="ppc-t">정밀 진단</h3>\r
      <p class="ppc-d">3D 피부 분석기로 전문적인 상담을 통해 피부 상태와 노화 양상을 다각도로 파악합니다. 이 단계에서 개인별 맞춤 리프팅의 설계도가 완성됩니다.</p>\r
    </li>\r
\r
    <li class="ppc-step">\r
      <span class="ppc-no">02</span>\r
      <figure class="ppc-figure">\r
        <img src="https://pub-7ab1b86fbb9c4442971f0a3a7b5adf9f.r2.dev/beautyblossom/layered/feedback-20260907-r2/02-custom-design.v2.webp" alt="조절 패널과 펜으로 표현한 맞춤 설계 3D 픽토그램"\r
             width="1024" height="1024" loading="lazy" decoding="async">\r
      </figure>\r
      <span class="ppc-en">Customized Design</span>\r
      <h3 class="ppc-t">맞춤 설계</h3>\r
      <p class="ppc-d">단순한 기계 선택이 아니라, 각 부위·층위별 노화 원인에 따라 최적의 장비와 에너지를 조합합니다. 환자 개개인에게 가장 적합한 레이어드 리프팅 프로그램을 설계합니다.</p>\r
    </li>\r
\r
    <li class="ppc-step">\r
      <span class="ppc-no">03</span>\r
      <figure class="ppc-figure">\r
        <img src="https://pub-7ab1b86fbb9c4442971f0a3a7b5adf9f.r2.dev/beautyblossom/layered/feedback-20260907-r2/03-treatment.v2.webp" alt="핸드피스와 빛으로 표현한 시술 진행 3D 픽토그램"\r
             width="1024" height="1024" loading="lazy" decoding="async">\r
      </figure>\r
      <span class="ppc-en">Layered Treatment</span>\r
      <h3 class="ppc-t">시술 진행</h3>\r
      <p class="ppc-d">울쎄라, 소프웨이브, 써마지, 온다 등 검증된 오리지널 장비를 증상·깊이·부위에 맞게 레이어드합니다. 이 과정을 통해 자연스럽고 균형 잡힌 리프팅 효과를 구현합니다.</p>\r
    </li>\r
\r
    <li class="ppc-step">\r
      <span class="ppc-no">04</span>\r
      <figure class="ppc-figure">\r
        <img src="https://pub-7ab1b86fbb9c4442971f0a3a7b5adf9f.r2.dev/beautyblossom/layered/feedback-20260907-r2/04-recovery.v2.webp" alt="하트와 방패로 표현한 회복 관리 3D 픽토그램"\r
             width="1024" height="1024" loading="lazy" decoding="async">\r
      </figure>\r
      <span class="ppc-en">Continuous Care</span>\r
      <h3 class="ppc-t">회복 · 관리</h3>\r
      <p class="ppc-d">시술 이후에도 효과를 안정적으로 유지하기 위해 탄력 케어, 순환 관리, 재생 레이저를 정밀하게 진행합니다. 회복 속도를 높이고 결과의 지속성을 강화합니다.</p>\r
    </li>\r
\r
  </ol>\r
\r
</section>\r
\r
<script>\r
/* 헤딩 타이핑 — 화면에 들어오면 친다. 내려와서 보일 때도, 올라와서 보일 때도.\r
   화면 밖으로 나가면 되감아 두므로 다시 보일 때 처음부터 다시 쳐진다.\r
   커서는 끝난 뒤에도 계속 깜박인다.\r
   글자는 이미 DOM 에 있고 잠시 감췄다 되돌리는 방식이라 크롤러는 완성문을 본다. */\r
(function(){\r
  var el=document.querySelector('.ppc-h2');\r
  if(!el||el.getAttribute('data-tt'))return;\r
  if(!('IntersectionObserver' in window))return;\r
  if(window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches)return;\r
  el.setAttribute('data-tt','1');\r
\r
  var parts=[],w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false),n;\r
  while(n=w.nextNode()){ if(n.nodeValue.length) parts.push({n:n,t:n.nodeValue}); }\r
  var total=0; for(var i=0;i<parts.length;i++) total+=parts[i].t.length;\r
  if(!total)return;\r
\r
  el.style.setProperty('--ppc-h2h', el.getBoundingClientRect().height+'px'); /* 비어도 안 접히게 */\r
\r
  var cur=document.createElement('span');\r
  cur.className='ppc-cur'; cur.setAttribute('aria-hidden','true'); cur.textContent='|';\r
  el.appendChild(cur);\r
\r
  var shown=-1;\r
  function draw(k){\r
    if(k===shown)return; shown=k;\r
    var left=k;\r
    for(var j=0;j<parts.length;j++){\r
      var o=parts[j],take=left<0?0:(left>o.t.length?o.t.length:left);\r
      o.n.nodeValue=o.t.slice(0,take); left-=take;\r
    }\r
  }\r
  var timer=0;\r
  function stop(){ if(timer){ clearTimeout(timer); timer=0; } }\r
  function play(){\r
    stop(); draw(0);\r
    var k=0;\r
    (function step(){\r
      if(k>=total){ timer=0; return; }\r
      draw(++k);\r
      timer=setTimeout(step, 30+Math.random()*26);\r
    })();\r
  }\r
\r
  draw(0);\r
  var io=new IntersectionObserver(function(es){\r
    for(var i=0;i<es.length;i++){\r
      if(es[i].isIntersecting) play();\r
      else { stop(); draw(0); }\r
    }\r
  },{threshold:.35});\r
  io.observe(el);\r
})();\r
<\/script>\r
`,h=`<!-- ═══ 뷰티블라썸의원 · 퍼스널 레이어드 리프팅 — 시술 정보 · 이런 분께 ═══
     문구는 라이브 /39 원본 그대로.
     접두사 pin- : bb-, plh-, plc-, pld-, pdv-, pls-, ppc- 와 겹치지 않는다
     body·html 선택자 없음 -->
<style>
.pin-sec{--c:#E9918E;--c-dk:#d4706d;--c-bg:#fdf3f2;--ink:#2f2523;--ink2:#5f5754;--mute:#918a87;
  --line:#efe7e6;--paper:#faf6f5;
  width:100%;max-width:none;margin:0 auto;padding:14px 0 40px;color:var(--ink);
  font-family:'Pretendard',-apple-system,BlinkMacSystemFont,system-ui,'Noto Sans KR',sans-serif;
  word-break:keep-all;overflow-wrap:break-word;text-align:left}
.pin-sec *{box-sizing:border-box}
.pin-wrap{max-width:min(1720px,calc(100% - 48px));margin:0 auto;padding:0 20px;
  display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:clamp(24px,4.2vw,65px);align-items:start}

/* ── 이런 분께 ── */
.pin-kw{display:block;margin:0 0 12px;font-size:15.8px;font-weight:700;letter-spacing:.2em;
  text-transform:uppercase;color:var(--c)}
.pin-h2{margin:0 0 22px;font-size:clamp(27.6px,3.1vw,40.8px);font-weight:700;line-height:1.38;
  letter-spacing:-1.3px;text-wrap:balance}
.pin-h2 em{font-style:normal;color:var(--c)}

.pin-who{list-style:none;margin:0 0 20px;padding:0;display:flex;flex-direction:column;gap:11px}
.pin-who li{position:relative;padding:15px 18px 15px 50px;border-radius:14px;
  background:var(--paper);border:1px solid var(--line);
  font-size:clamp(14.5px,1.5vw,20.6px);line-height:1.6;letter-spacing:-.4px;font-weight:500}
.pin-who li::before{content:'';position:absolute;left:18px;top:50%;width:18px;height:18px;
  margin-top:-9px;border-radius:50%;background:var(--c);
  -webkit-mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='3.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m5 12.5 4.6 4.5L19 7.5'/%3E%3C/svg%3E") center/13px no-repeat;
  mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='3.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m5 12.5 4.6 4.5L19 7.5'/%3E%3C/svg%3E") center/13px no-repeat}
.pin-note{margin:0;font-size:16.8px;line-height:1.75;letter-spacing:-.3px;color:var(--mute)}

/* ── 시술 정보 ── */
.pin-card{padding:clamp(22px,3vw,40px);border-radius:22px;background:#fff;
  border:1px solid var(--line);box-shadow:0 10px 30px rgba(80,55,52,.06)}
.pin-ct{margin:0 0 18px;font-size:clamp(17px,1.8vw,26.2px);font-weight:700;letter-spacing:-.8px}
.pin-spec{margin:0;display:grid;grid-template-columns:auto 1fr;gap:0}
.pin-spec dt{padding:14px 0;font-size:16.8px;font-weight:700;letter-spacing:-.3px;color:var(--mute);
  border-top:1px solid var(--line);white-space:nowrap}
.pin-spec dd{margin:0;padding:14px 0 14px 22px;font-size:clamp(14.5px,1.5vw,20px);font-weight:600;
  letter-spacing:-.4px;line-height:1.6;border-top:1px solid var(--line);text-align:right}
.pin-spec dt:first-of-type,.pin-spec dt:first-of-type + dd{border-top:0}
.pin-spec dd b{color:var(--c-dk);font-weight:800}

.pin-why{margin:22px 0 0;padding:18px 20px;border-radius:16px;background:var(--c-bg);
  font-size:clamp(14px,1.2vw,19.4px);line-height:1.85;letter-spacing:-.4px;color:var(--ink2)}
.pin-why b{font-weight:700;color:var(--c-dk)}

@media (max-width:1000px){
  .pin-wrap{grid-template-columns:1fr;gap:26px}
}
@media (max-width:768px){
  .pin-sec{padding:8px 0 26px}
  .pin-wrap{padding:0 16px}
  .pin-h2{font-size:22px;letter-spacing:-1px;margin-bottom:18px}
  .pin-who li{padding:13px 15px 13px 44px;font-size:14.5px}
  .pin-who li::before{left:15px}
  .pin-card{padding:20px;border-radius:18px}
  .pin-spec dt,.pin-spec dd{padding:12px 0;font-size:14px}
  .pin-spec dd{padding-left:16px}
}

/* ── 선 발광 : 마우스가 올라가면 테두리가 빛난다 ── */
.pin-card,.pin-who li{transition:border-color .3s ease,box-shadow .3s ease,transform .3s cubic-bezier(.22,.61,.36,1)}
.pin-card:hover,.pin-card:focus-within,.pin-who li:hover,.pin-who li:focus-within{border-color:rgba(233,145,142,.7)!important;
  box-shadow:0 0 0 1px rgba(233,145,142,.45),
             0 0 14px rgba(233,145,142,.35),
             0 0 34px rgba(233,145,142,.18),
             0 14px 34px rgba(140,80,78,.14)}
@media (prefers-reduced-motion:reduce){.pin-card,.pin-who li{transition:none}}

/* ── 헤딩 타이핑 효과 ── 원문은 HTML 에 그대로 있어 크롤러가 읽는다.
   스크롤로 화면에 들어올 때 한 번만 친다. 반복하지 않는다. */
.pin-h2{min-height:var(--pin-h2h,auto)}
.pin-cur{display:inline-block;margin-left:.06em;color:var(--c);font-weight:400;
  animation:pin-bl .62s steps(1,end) infinite}
@keyframes pin-bl{0%,49%{opacity:1}50%,100%{opacity:0}}
@media (prefers-reduced-motion:reduce){.pin-cur{display:none}}
</style>

<section class="pin-sec" aria-labelledby="pin-title">
  <div class="pin-wrap">

    <div class="pin-copy">
      <span class="pin-kw">Who It's For</span>
      <h2 class="pin-h2" id="pin-title">고민이 하나가 아니라면<br><em>한 대로는 부족합니다.</em></h2>
      <ul class="pin-who">
        <li>여러 가지 피부 고민을 동시에 해결하고 싶은 분</li>
        <li>기존 단일 리프팅으로 만족하지 못하셨던 분</li>
        <li>맞춤형 시술을 원하시는 분</li>
      </ul>
      <p class="pin-note">시술 구성은 의료진 진단 후 개인별로 설계됩니다.</p>
    </div>

    <div class="pin-card">
      <h3 class="pin-ct">시술 정보</h3>
      <dl class="pin-spec">
        <dt>소요 시간</dt><dd><b>40 ~ 90분</b></dd>
        <dt>구성</dt><dd>진단 후 장비 조합 설계</dd>
        <dt>진행 방식</dt><dd>여러 장비를 순차 적용</dd>
        <dt>작용 범위</dt><dd>표피 · 진피 · 피하지방 · 근막</dd>
        <dt>회복 관리</dt><dd>탄력 · 순환 · 재생 레이저</dd>
      </dl>
      <p class="pin-why">단일 장비 시술보다 <b>피부 전체 층을 균형 있게 관리</b>할 수 있어 리프팅, 탄력, 피부결 개선 효과를 종합적으로 얻을 수 있습니다. 개인 맞춤 설계로 불필요한 시술을 줄일 수 있습니다.</p>
    </div>

  </div>
</section>

<script>
/* 헤딩 타이핑 — 화면에 들어오면 친다. 내려와서 보일 때도, 올라와서 보일 때도.
   화면 밖으로 나가면 되감아 두므로 다시 보일 때 처음부터 다시 쳐진다.
   커서는 끝난 뒤에도 계속 깜박인다.
   글자는 이미 DOM 에 있고 잠시 감췄다 되돌리는 방식이라 크롤러는 완성문을 본다. */
(function(){
  var el=document.querySelector('.pin-h2');
  if(!el||el.getAttribute('data-tt'))return;
  if(!('IntersectionObserver' in window))return;
  if(window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  el.setAttribute('data-tt','1');

  var parts=[],w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false),n;
  while(n=w.nextNode()){ if(n.nodeValue.length) parts.push({n:n,t:n.nodeValue}); }
  var total=0; for(var i=0;i<parts.length;i++) total+=parts[i].t.length;
  if(!total)return;

  el.style.setProperty('--pin-h2h', el.getBoundingClientRect().height+'px'); /* 비어도 안 접히게 */

  var cur=document.createElement('span');
  cur.className='pin-cur'; cur.setAttribute('aria-hidden','true'); cur.textContent='|';
  el.appendChild(cur);

  var shown=-1;
  function draw(k){
    if(k===shown)return; shown=k;
    var left=k;
    for(var j=0;j<parts.length;j++){
      var o=parts[j],take=left<0?0:(left>o.t.length?o.t.length:left);
      o.n.nodeValue=o.t.slice(0,take); left-=take;
    }
  }
  var timer=0;
  function stop(){ if(timer){ clearTimeout(timer); timer=0; } }
  function play(){
    stop(); draw(0);
    var k=0;
    (function step(){
      if(k>=total){ timer=0; return; }
      draw(++k);
      timer=setTimeout(step, 30+Math.random()*26);
    })();
  }

  draw(0);
  var io=new IntersectionObserver(function(es){
    for(var i=0;i<es.length;i++){
      if(es[i].isIntersecting) play();
      else { stop(); draw(0); }
    }
  },{threshold:.35});
  io.observe(el);
})();
<\/script>
`,m=`<!-- ═══ 뷰티블라썸의원 · 퍼스널 레이어드 리프팅 — 자주 묻는 질문 ═══
     문답은 라이브 /39 원본 그대로. 다만 예약·연락 유도 문장은 뺐다.
     JSON-LD FAQPage 를 함께 넣어 검색 결과에 질문이 펼쳐지게 한다.
     접두사 pfq- : 다른 위젯과 겹치지 않는다
     body·html 선택자 없음 -->
<style>
.pfq-sec{--c:#E9918E;--c-dk:#d4706d;--c-bg:#fdf3f2;--ink:#2f2523;--ink2:#5f5754;--mute:#918a87;
  --line:#efe7e6;--paper:#faf6f5;
  width:100%;max-width:none;margin:0 auto;padding:14px 0 40px;color:var(--ink);
  font-family:'Pretendard',-apple-system,BlinkMacSystemFont,system-ui,'Noto Sans KR',sans-serif;
  word-break:keep-all;overflow-wrap:break-word;text-align:left}
.pfq-sec *{box-sizing:border-box}

.pfq-head{max-width:1000px;margin:0 auto 34px;text-align:center;padding:0 20px}
.pfq-kw{display:block;margin:0 0 13px;font-size:13px;font-weight:700;letter-spacing:.22em;
  text-transform:uppercase;color:var(--c)}
.pfq-h2{margin:0;font-size:clamp(25px,2.8vw,38px);font-weight:700;line-height:1.38;
  letter-spacing:-1.4px;text-wrap:balance}
.pfq-h2 em{font-style:normal;color:var(--c)}

.pfq-list{max-width:940px;margin:0 auto;padding:0 20px;display:flex;flex-direction:column;gap:10px}
.pfq-item{border:1px solid var(--line);border-radius:16px;background:#fff;overflow:hidden;
  transition:border-color .3s,box-shadow .3s}
.pfq-item[open]{border-color:rgba(233,145,142,.5);box-shadow:0 10px 30px rgba(233,145,142,.13)}
.pfq-q{list-style:none;cursor:pointer;display:flex;align-items:flex-start;gap:13px;
  padding:clamp(17px,1.8vw,22px) clamp(18px,2vw,26px);
  font-size:clamp(15px,1.3vw,17.5px);font-weight:700;line-height:1.55;letter-spacing:-.6px}
.pfq-q::-webkit-details-marker{display:none}
.pfq-q::before{content:'Q';flex:none;display:grid;place-items:center;width:26px;height:26px;
  margin-top:1px;border-radius:8px;background:var(--c-bg);color:var(--c-dk);
  font-size:13px;font-weight:800}
.pfq-q::after{content:'';flex:none;width:11px;height:11px;margin:6px 0 0 auto;
  border-right:2.2px solid var(--c);border-bottom:2.2px solid var(--c);
  transform:rotate(45deg);transition:transform .3s cubic-bezier(.22,.61,.36,1)}
.pfq-item[open] .pfq-q::after{transform:rotate(-135deg);margin-top:10px}
.pfq-q:focus-visible{outline:2px solid var(--c-dk);outline-offset:-3px;border-radius:16px}
.pfq-a{margin:0;padding:0 clamp(18px,2vw,26px) clamp(19px,2vw,24px) clamp(57px,5.0vw,65px);
  font-size:clamp(14.5px,1.1vw,16.5px);line-height:1.95;letter-spacing:-.45px;color:var(--ink2)}
.pfq-a b{font-weight:700;color:var(--ink)}
.pfq-a em{font-style:normal;font-weight:700;color:var(--c-dk)}

@media (max-width:768px){
  .pfq-sec{padding:8px 0 26px}
  .pfq-head{margin-bottom:24px;padding:0 16px}
  .pfq-h2{font-size:23px;letter-spacing:-1.1px}
  .pfq-list{padding:0 16px;gap:9px}
  .pfq-q{padding:16px;font-size:15px;gap:11px}
  .pfq-q::before{width:23px;height:23px;font-size:12px}
  .pfq-a{padding:0 16px 18px 50px;font-size:14.5px;line-height:1.85}
}
@media (prefers-reduced-motion:reduce){.pfq-q::after{transition:none}}

/* ── 선 발광 : 마우스가 올라가면 테두리가 빛난다 ── */
.pfq-item{transition:border-color .3s ease,box-shadow .3s ease,transform .3s cubic-bezier(.22,.61,.36,1)}
.pfq-item:hover,.pfq-item:focus-within{border-color:rgba(233,145,142,.7)!important;
  box-shadow:0 0 0 1px rgba(233,145,142,.45),
             0 0 14px rgba(233,145,142,.35),
             0 0 34px rgba(233,145,142,.18),
             0 14px 34px rgba(140,80,78,.14)}
@media (prefers-reduced-motion:reduce){.pfq-item{transition:none}}
</style>

<section class="pfq-sec" aria-labelledby="pfq-title">

  <header class="pfq-head">
    <span class="pfq-kw">FAQ</span>
    <h2 class="pfq-h2" id="pfq-title">퍼스널 레이어드 리프팅<br><em>자주 묻는 질문</em></h2>
  </header>

  <div class="pfq-list">

    <details class="pfq-item">
      <summary class="pfq-q">홍대 퍼스널레이어드 리프팅은 어떤 시술인가요?</summary>
      <p class="pfq-a">개인의 피부 상태에 맞춰 <em>여러 리프팅 장비를 조합하는 맞춤형 리프팅 프로그램</em>입니다. 의료진 진단 후 피부 각 층에 적합한 장비를 선택해 최적의 조합을 설계합니다.</p>
    </details>

    <details class="pfq-item">
      <summary class="pfq-q">시술 시간은 얼마나 걸리나요?</summary>
      <p class="pfq-a">구성에 따라 <em>40~90분</em> 정도 소요됩니다. 여러 장비를 순차적으로 적용하여 피부 각 층을 효과적으로 관리합니다.</p>
    </details>

    <details class="pfq-item">
      <summary class="pfq-q">퍼스널 레이어드 리프팅의 장점은 무엇인가요?</summary>
      <p class="pfq-a">단일 장비 시술보다 <em>피부 전체 층을 균형 있게 관리</em>할 수 있어 리프팅, 탄력, 피부결 개선 효과를 종합적으로 얻을 수 있습니다. 개인 맞춤 설계로 불필요한 시술을 줄일 수 있습니다.</p>
    </details>

    <details class="pfq-item">
      <summary class="pfq-q">어떤 분께 권하나요?</summary>
      <p class="pfq-a">여러 가지 피부 고민을 동시에 해결하고 싶은 분, 기존 단일 리프팅으로 만족하지 못하셨던 분, 맞춤형 시술을 원하시는 분께 권합니다. 시술 구성은 의료진 진단 후 결정됩니다.</p>
    </details>

    <details class="pfq-item">
      <summary class="pfq-q">뷰티블라썸의원은 홍대 어디에 있나요?</summary>
      <p class="pfq-a"><em>홍대입구역 9번 출구 도보 10분, 합정역 3번 출구 도보 1분</em> 거리에 있습니다. 서울시 마포구 양화로 66, 메디원메디컬센터 6층·8층입니다.</p>
    </details>

  </div>

</section>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "홍대 퍼스널레이어드 리프팅은 어떤 시술인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "개인의 피부 상태에 맞춰 여러 리프팅 장비를 조합하는 맞춤형 리프팅 프로그램입니다. 의료진 진단 후 피부 각 층에 적합한 장비를 선택해 최적의 조합을 설계합니다."
      }
    },
    {
      "@type": "Question",
      "name": "퍼스널 레이어드 리프팅 시술 시간은 얼마나 걸리나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "구성에 따라 40~90분 정도 소요됩니다. 여러 장비를 순차적으로 적용하여 피부 각 층을 효과적으로 관리합니다."
      }
    },
    {
      "@type": "Question",
      "name": "퍼스널 레이어드 리프팅의 장점은 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "단일 장비 시술보다 피부 전체 층을 균형 있게 관리할 수 있어 리프팅, 탄력, 피부결 개선 효과를 종합적으로 얻을 수 있습니다. 개인 맞춤 설계로 불필요한 시술을 줄일 수 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "퍼스널 레이어드 리프팅은 어떤 분께 권하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "여러 가지 피부 고민을 동시에 해결하고 싶은 분, 기존 단일 리프팅으로 만족하지 못하셨던 분, 맞춤형 시술을 원하시는 분께 권합니다. 시술 구성은 의료진 진단 후 결정됩니다."
      }
    },
    {
      "@type": "Question",
      "name": "뷰티블라썸의원은 홍대 어디에 있나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "홍대입구역 9번 출구 도보 10분, 합정역 3번 출구 도보 1분 거리에 있습니다. 서울시 마포구 양화로 66, 메디원메디컬센터 6층·8층입니다."
      }
    }
  ]
}
<\/script>
`,g=`<!-- ═══ 뷰티블라썸의원 · 퍼스널 레이어드 리프팅 — 원내 공간 ═══
     사진 5장은 R2 에 올라간 1920x1080(16:9) 원본을 그대로 쓴다.
     문구는 확인된 사실만 담았다. 6층·8층, 접수는 6층, 점심시간 없이 진료.
     사진 위 라벨은 넣지 않는다.
     예약제 여부·회복실·샤워실 같은 미확인 시설은 쓰지 않았다.
     예약·상담 유도 버튼은 넣지 않았다.
     접두사 psp- : 다른 위젯과 겹치지 않는다
     body·html 선택자 없음 -->
<style>
.psp-sec{--c:#E9918E;--c-dk:#d4706d;--c-bg:#fdf3f2;--ink:#2f2523;--ink2:#5f5754;--mute:#918a87;
  --line:#efe7e6;--paper:#faf6f5;
  width:100%;max-width:none;margin:0 auto;padding:14px 0 44px;color:var(--ink);
  font-family:'Pretendard',-apple-system,BlinkMacSystemFont,system-ui,'Noto Sans KR',sans-serif;
  word-break:keep-all;overflow-wrap:break-word;text-align:left}
.psp-sec *{box-sizing:border-box}

.psp-wrap{max-width:min(1720px,calc(100% - 48px));margin:0 auto;
  display:grid;grid-template-columns:minmax(0,1.12fr) minmax(0,.88fr);
  gap:clamp(26px,3.2vw,56px);align-items:center}

/* ── 왼쪽 : 사진 5장이 겹쳐 있고 하나씩 떠오른다 ── */
.psp-stage{position:relative;aspect-ratio:16/10;border-radius:22px;overflow:hidden;
  background:var(--paper);border:1px solid var(--line)}
.psp-shot{position:absolute;inset:0;margin:0;opacity:0;transform:scale(1.045);
  transition:opacity 1.1s ease,transform 6s ease}
.psp-shot.is-on{opacity:1;transform:scale(1)}
.psp-shot img{width:100%;height:100%;object-fit:cover;display:block}
.psp-dots{display:flex;gap:8px;margin:14px 0 0;padding:0;list-style:none;flex-wrap:wrap}
.psp-dot{width:44px;height:4px;padding:0;border:0;border-radius:99px;cursor:pointer;
  background:#e6dcda;transition:background .3s,width .3s}
.psp-dot.is-on{background:var(--c);width:64px}
.psp-dot:focus-visible{outline:2px solid var(--c-dk);outline-offset:3px}

/* ── 오른쪽 : 글 ── */
.psp-kw{display:block;margin:0 0 13px;font-size:13px;font-weight:700;letter-spacing:.22em;
  text-transform:uppercase;color:var(--c)}
.psp-h2{margin:0 0 clamp(16px,1.8vw,24px);font-size:clamp(25px,2.8vw,38px);font-weight:700;
  line-height:1.4;letter-spacing:-1.4px;text-wrap:balance}
.psp-h2 em{font-style:normal;color:var(--c)}
.psp-body{margin:0 0 14px;font-size:clamp(15px,1.2vw,17.5px);line-height:1.95;
  letter-spacing:-.5px;color:var(--ink2)}
.psp-body b{font-weight:700;color:var(--ink)}
.psp-facts{list-style:none;margin:clamp(18px,2vw,26px) 0 0;padding:0}
.psp-facts li{display:flex;gap:16px;align-items:baseline;padding:13px 0;
  border-top:1px solid var(--line);font-size:clamp(14px,1.1vw,16px);letter-spacing:-.4px}
.psp-facts li:first-child{border-top:0}
.psp-facts b{flex:none;width:6.5em;font-weight:700;color:var(--mute);font-size:.9em}
.psp-facts span{font-weight:600;color:var(--ink)}

@media (max-width:1000px){
  .psp-wrap{grid-template-columns:1fr;gap:24px}
  .psp-stage{aspect-ratio:16/11}
}
@media (max-width:768px){
  .psp-sec{padding:8px 0 28px}
  .psp-wrap{max-width:none;padding:0 16px}
  .psp-stage{aspect-ratio:4/3;border-radius:16px}
  .psp-h2{font-size:23px;letter-spacing:-1.1px}
  .psp-dot{width:34px}
  .psp-dot.is-on{width:48px}
}

/* ── 선 발광 ── */
.psp-stage{transition:border-color .3s ease,box-shadow .3s ease}
.psp-stage:hover,.psp-stage:focus-within{border-color:rgba(233,145,142,.7)!important;
  box-shadow:0 0 0 1px rgba(233,145,142,.45),
             0 0 14px rgba(233,145,142,.35),
             0 0 34px rgba(233,145,142,.18),
             0 14px 34px rgba(140,80,78,.14)}

/* ── 스크롤 등장 : .js-anim 이 붙었을 때만 숨긴다.
       스크립트가 안 돌면 숨김 규칙 자체가 없어 전부 그냥 보인다 ── */
.psp-sec.js-anim .psp-stage{opacity:0;transform:translateY(30px)}
.psp-sec.js-anim .psp-copy>*{opacity:0;transform:translateX(28px)}
.psp-sec.js-anim .psp-stage,.psp-sec.js-anim .psp-copy>*{
  transition:opacity .62s cubic-bezier(.22,.61,.36,1),transform .72s cubic-bezier(.22,.61,.36,1)}
.psp-sec.js-anim.is-in .psp-stage,.psp-sec.js-anim.is-in .psp-copy>*{opacity:1;transform:none}
.psp-sec.js-anim.is-in .psp-copy>*:nth-child(1){transition-delay:.12s}
.psp-sec.js-anim.is-in .psp-copy>*:nth-child(2){transition-delay:.20s}
.psp-sec.js-anim.is-in .psp-copy>*:nth-child(3){transition-delay:.28s}
.psp-sec.js-anim.is-in .psp-copy>*:nth-child(4){transition-delay:.36s}
.psp-sec.js-anim.is-in .psp-copy>*:nth-child(5){transition-delay:.44s}
@media (max-width:768px){.psp-sec.js-anim .psp-copy>*{transform:translateY(20px)}}
@media (prefers-reduced-motion:reduce){
  .psp-sec.js-anim .psp-stage,.psp-sec.js-anim .psp-copy>*{
    opacity:1!important;transform:none!important;transition:none!important}
  .psp-shot{transition:none}
}
</style>

<section class="psp-sec" aria-labelledby="psp-title">
  <div class="psp-wrap">

    <div class="psp-media">
      <div class="psp-stage" role="group" aria-label="뷰티블라썸의원 원내 사진">
        <figure class="psp-shot is-on"><img src="https://pub-7ab1b86fbb9c4442971f0a3a7b5adf9f.r2.dev/beautyblossom/clinic-interiors/16x9/8f-48-clinic-front.v1.webp" alt="뷰티블라썸의원 진료실 정면" width="1920" height="1080" loading="lazy" decoding="async"></figure>
        <figure class="psp-shot"><img src="https://pub-7ab1b86fbb9c4442971f0a3a7b5adf9f.r2.dev/beautyblossom/clinic-interiors/16x9/8f-49-clinic-front-lighting.v1.webp" alt="조명을 낮춘 뷰티블라썸의원 진료실" width="1920" height="1080" loading="lazy" decoding="async"></figure>
        <figure class="psp-shot"><img src="https://pub-7ab1b86fbb9c4442971f0a3a7b5adf9f.r2.dev/beautyblossom/clinic-interiors/16x9/8f-50-treatment-chair-room.v1.webp" alt="장비가 놓인 뷰티블라썸의원 시술 체어룸" width="1920" height="1080" loading="lazy" decoding="async"></figure>
        <figure class="psp-shot"><img src="https://pub-7ab1b86fbb9c4442971f0a3a7b5adf9f.r2.dev/beautyblossom/clinic-interiors/16x9/clinic-1-3.v1.webp" alt="뷰티블라썸의원 원내 전경" width="1920" height="1080" loading="lazy" decoding="async"></figure>
        <figure class="psp-shot"><img src="https://pub-7ab1b86fbb9c4442971f0a3a7b5adf9f.r2.dev/beautyblossom/clinic-interiors/16x9/clinic-1-4.v1.webp" alt="뷰티블라썸의원 원내 복도" width="1920" height="1080" loading="lazy" decoding="async"></figure>
      </div>
      <ul class="psp-dots" aria-label="사진 선택"></ul>
    </div>

    <div class="psp-copy">
      <span class="psp-kw">Private Space</span>
      <h2 class="psp-h2" id="psp-title">편안하게 머무실 수 있는<br><em>프라이빗한 공간</em>입니다.</h2>
      <p class="psp-body">밝기를 낮춘 조명과 차분한 마감으로 꾸몄습니다. 시술을 기다리는 동안에도 <b>긴장이 덜하도록</b> 만든 자리입니다.</p>
      <p class="psp-body">합정 메디원메디컬센터 <b>6층과 8층</b>을 씁니다. 진료실과 시술실이 나뉘어 있어 상담과 시술이 서로 겹치지 않습니다.</p>
      <ul class="psp-facts">
        <li><b>위치</b><span>메디원메디컬센터 6층 · 8층</span></li>
        <li><b>접수</b><span>6층</span></li>
        <li><b>진료</b><span>점심시간 없이 운영</span></li>
      </ul>
    </div>

  </div>
</section>

<script>
/* 원내 사진 — 5장이 천천히 겹쳐 넘어간다. 점을 누르면 그 사진으로 간다.
   마우스를 올리면 멈추고, 화면 밖에 있을 때는 돌지 않는다. */
(function(){
  var sec=document.querySelector('.psp-sec');
  if(!sec||sec.getAttribute('data-psp'))return;
  sec.setAttribute('data-psp','1');
  var shots=sec.querySelectorAll('.psp-shot'), dots=sec.querySelector('.psp-dots');
  if(!shots.length||!dots)return;
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;

  var btns=[];
  for(var i=0;i<shots.length;i++){
    var im=shots[i].querySelector('img');
    var li=document.createElement('li');
    var b=document.createElement('button');
    b.type='button';
    b.className=(i===0)?'psp-dot is-on':'psp-dot';
    b.setAttribute('aria-label',(im?im.alt:'원내 사진')+' 보기');
    (function(n){ b.addEventListener('click',function(){ show(n); rest(); }); })(i);
    li.appendChild(b); dots.appendChild(li); btns.push(b);
  }

  var at=0;
  function show(n){
    at=(n+shots.length)%shots.length;
    for(var i=0;i<shots.length;i++){
      shots[i].className=(i===at)?'psp-shot is-on':'psp-shot';
      btns[i].className=(i===at)?'psp-dot is-on':'psp-dot';
    }
  }

  var timer=0, seen=false, hover=false;
  function stop(){ if(timer){ clearInterval(timer); timer=0; } }
  function rest(){ stop(); if(!reduce && seen && !hover) timer=setInterval(function(){ show(at+1); },4600); }

  sec.addEventListener('mouseenter',function(){ hover=true; stop(); });
  sec.addEventListener('mouseleave',function(){ hover=false; rest(); });

  if('IntersectionObserver' in window){
    if(!reduce) sec.className='psp-sec js-anim';
    new IntersectionObserver(function(es){
      for(var i=0;i<es.length;i++){
        if(es[i].isIntersecting){ sec.classList.add('is-in'); seen=true; rest(); }
        else { seen=false; stop(); }
      }
    },{threshold:.2}).observe(sec);
  }else{ seen=true; rest(); }
})();
<\/script>
`,u=`<!-- ═══ 뷰티블라썸의원 · 퍼스널 레이어드 리프팅 — 오시는 길 · 진료시간 ═══
     주소·시간은 라이브 /39 원본 그대로. 지역 검색에 직접 기여하는 구간이다.
     지도는 구글 지도 퍼가기 iframe. API 키가 필요 없고 코드위젯 안에서 그대로 돈다.
     전화·예약 유도 버튼은 넣지 않았다. 필요하면 말씀만 주시면 붙인다.
     접두사 pvs- : 다른 위젯과 겹치지 않는다
     body·html 선택자 없음 -->
<style>
.pvs-sec{--c:#E9918E;--c-dk:#d4706d;--c-bg:#fdf3f2;--ink:#2f2523;--ink2:#5f5754;--mute:#918a87;
  --line:#efe7e6;--paper:#faf6f5;
  width:100%;max-width:none;margin:0 auto;padding:14px 0 44px;color:var(--ink);
  font-family:'Pretendard',-apple-system,BlinkMacSystemFont,system-ui,'Noto Sans KR',sans-serif;
  word-break:keep-all;overflow-wrap:break-word;text-align:left}
.pvs-sec *{box-sizing:border-box}

.pvs-head{max-width:1000px;margin:0 auto 32px;text-align:center;padding:0 20px}
.pvs-kw{display:block;margin:0 0 13px;font-size:13px;font-weight:700;letter-spacing:.22em;
  text-transform:uppercase;color:var(--c)}
.pvs-h2{margin:0;font-size:clamp(30px,3.4vw,45.6px);font-weight:700;line-height:1.38;
  letter-spacing:-1.4px;text-wrap:balance}
.pvs-h2 em{font-style:normal;color:var(--c)}

.pvs-wrap{max-width:min(1720px,calc(100% - 48px));margin:0 auto;padding:0 20px;
  display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr);gap:clamp(22px,3.0vw,44px);align-items:stretch}

/* 구글 지도 임베드 — API 키 불필요, loading=lazy 필수 */
.pvs-map{aspect-ratio:16/11;border-radius:20px;overflow:hidden;display:grid;
  background:var(--paper);border:1px solid var(--line)}
.pvs-map img,.pvs-map iframe{width:100%;height:100%;object-fit:cover;border:0;display:block}

.pvs-card{display:flex;flex-direction:column;gap:22px;padding:clamp(24px,2.6vw,34px);
  border-radius:20px;background:#fff;border:1px solid var(--line);box-shadow:0 10px 30px rgba(80,55,52,.06)}
.pvs-block h3{margin:0 0 12px;font-size:11.4px;font-weight:700;letter-spacing:.18em;
  text-transform:uppercase;color:var(--c)}
.pvs-addr{margin:0 0 8px;font-size:clamp(15.5px,1.3vw,18px);font-weight:700;line-height:1.55;letter-spacing:-.6px}
.pvs-sub{margin:0;font-size:clamp(14px,1.0vw,15.5px);line-height:1.75;letter-spacing:-.4px;color:var(--ink2)}
.pvs-sub b{font-weight:700;color:var(--c-dk)}

.pvs-hours{margin:0;display:grid;grid-template-columns:auto 1fr;gap:0}
.pvs-hours dt{padding:11px 0;font-size:14px;font-weight:700;letter-spacing:-.3px;color:var(--ink2);
  border-top:1px solid var(--line);white-space:nowrap}
.pvs-hours dd{margin:0;padding:11px 0 11px 20px;font-size:clamp(14.5px,1.1vw,16px);font-weight:600;
  letter-spacing:-.3px;border-top:1px solid var(--line);text-align:right;font-variant-numeric:tabular-nums}
.pvs-hours dt:first-of-type,.pvs-hours dt:first-of-type + dd{border-top:0}
.pvs-notes{list-style:none;margin:12px 0 0;padding:0;display:flex;flex-direction:column;gap:5px}
.pvs-notes li{font-size:12.6px;line-height:1.65;letter-spacing:-.2px;color:var(--mute)}

@media (max-width:1000px){.pvs-wrap{grid-template-columns:1fr;gap:20px}}
@media (max-width:768px){
  .pvs-sec{padding:8px 0 28px}
  .pvs-head{margin-bottom:22px;padding:0 16px}
  .pvs-h2{font-size:23px;letter-spacing:-1.1px}
  .pvs-wrap{padding:0 16px}
  .pvs-map{aspect-ratio:4/3;border-radius:16px}
  .pvs-card{padding:22px;gap:18px;border-radius:16px}
  .pvs-addr{font-size:16px}
  .pvs-hours dt,.pvs-hours dd{padding:10px 0;font-size:14px}
}

/* ── 선 발광 : 마우스가 올라가면 테두리가 빛난다 ── */
.pvs-card,.pvs-map{transition:border-color .3s ease,box-shadow .3s ease,transform .3s cubic-bezier(.22,.61,.36,1)}
.pvs-card:hover,.pvs-card:focus-within,.pvs-map:hover,.pvs-map:focus-within{border-color:rgba(233,145,142,.7)!important;
  box-shadow:0 0 0 1px rgba(233,145,142,.45),
             0 0 14px rgba(233,145,142,.35),
             0 0 34px rgba(233,145,142,.18),
             0 14px 34px rgba(140,80,78,.14)}
@media (prefers-reduced-motion:reduce){.pvs-card,.pvs-map{transition:none}}

/* ── 헤딩 타이핑 효과 ── 원문은 HTML 에 그대로 있어 크롤러가 읽는다.
   스크롤로 화면에 들어올 때 한 번만 친다. 반복하지 않는다. */
.pvs-h2{min-height:var(--pvs-h2h,auto)}
.pvs-cur{display:inline-block;margin-left:.06em;color:var(--c);font-weight:400;
  animation:pvs-bl .62s steps(1,end) infinite}
@keyframes pvs-bl{0%,49%{opacity:1}50%,100%{opacity:0}}
@media (prefers-reduced-motion:reduce){.pvs-cur{display:none}}
</style>

<section class="pvs-sec" aria-labelledby="pvs-title">

  <header class="pvs-head">
    <span class="pvs-kw">Location</span>
    <h2 class="pvs-h2" id="pvs-title">합정역 3번 출구에서 <em>도보 1분</em>입니다.</h2>
  </header>

  <div class="pvs-wrap">

    <figure class="pvs-map">
      <iframe
        title="뷰티블라썸의원 위치 — 서울시 마포구 양화로 66"
        src="https://maps.google.com/maps?q=%EB%B7%B0%ED%8B%B0%EB%B8%94%EB%9D%BC%EC%8D%B8%EC%9D%98%EC%9B%90&amp;hl=ko&amp;z=17&amp;output=embed"
        loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
    </figure>

    <div class="pvs-card">
      <div class="pvs-block">
        <h3>주소</h3>
        <p class="pvs-addr">서울시 마포구 양화로 66<br>메디원메디컬센터 6층 · 8층</p>
        <p class="pvs-sub">접수는 6층입니다. <b>합정역 3번 출구 도보 1분</b>, <b>홍대입구역 9번 출구 도보 10분</b> 거리에 있습니다.</p>
      </div>

      <div class="pvs-block">
        <h3>진료시간</h3>
        <dl class="pvs-hours">
          <dt>평일</dt><dd>10:00 – 20:00</dd>
          <dt>주말 · 대체공휴일</dt><dd>10:00 – 16:30</dd>
        </dl>
        <ul class="pvs-notes">
          <li>모든 요일 점심시간 없이 진료합니다.</li>
          <li>공휴일 진료 여부는 원내로 확인 부탁드립니다.</li>
        </ul>
      </div>
    </div>

  </div>

</section>

<script>
/* 헤딩 타이핑 — 화면에 들어오면 친다. 내려와서 보일 때도, 올라와서 보일 때도.
   화면 밖으로 나가면 되감아 두므로 다시 보일 때 처음부터 다시 쳐진다.
   커서는 끝난 뒤에도 계속 깜박인다.
   글자는 이미 DOM 에 있고 잠시 감췄다 되돌리는 방식이라 크롤러는 완성문을 본다. */
(function(){
  var el=document.querySelector('.pvs-h2');
  if(!el||el.getAttribute('data-tt'))return;
  if(!('IntersectionObserver' in window))return;
  if(window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  el.setAttribute('data-tt','1');

  var parts=[],w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false),n;
  while(n=w.nextNode()){ if(n.nodeValue.length) parts.push({n:n,t:n.nodeValue}); }
  var total=0; for(var i=0;i<parts.length;i++) total+=parts[i].t.length;
  if(!total)return;

  el.style.setProperty('--pvs-h2h', el.getBoundingClientRect().height+'px'); /* 비어도 안 접히게 */

  var cur=document.createElement('span');
  cur.className='pvs-cur'; cur.setAttribute('aria-hidden','true'); cur.textContent='|';
  el.appendChild(cur);

  var shown=-1;
  function draw(k){
    if(k===shown)return; shown=k;
    var left=k;
    for(var j=0;j<parts.length;j++){
      var o=parts[j],take=left<0?0:(left>o.t.length?o.t.length:left);
      o.n.nodeValue=o.t.slice(0,take); left-=take;
    }
  }
  var timer=0;
  function stop(){ if(timer){ clearTimeout(timer); timer=0; } }
  function play(){
    stop(); draw(0);
    var k=0;
    (function step(){
      if(k>=total){ timer=0; return; }
      draw(++k);
      timer=setTimeout(step, 30+Math.random()*26);
    })();
  }

  draw(0);
  var io=new IntersectionObserver(function(es){
    for(var i=0;i<es.length;i++){
      if(es[i].isIntersecting) play();
      else { stop(); draw(0); }
    }
  },{threshold:.35});
  io.observe(el);
})();
<\/script>
`,b=[{id:"01-hero",file:"01-hero.html",name:"히어로",prefix:"plh",desc:"제목 · 배경 영상 · 특징 패널",src:p},{id:"02-intro",file:"02-intro.html",name:"9 Original Devices",prefix:"plc",desc:"헤딩 · 특징 3가지 · 장비 슬라이더",src:o},{id:"05-depth-intro",file:"05-depth-intro.html",name:"부위별 노화 도입",prefix:"pld",desc:"워드마크 3D 압출 + 도입 카피",src:l},{id:"06-devices",file:"06-devices.html",name:"장비 9종 상세",prefix:"pdv",desc:"요청 순서대로 장비 9종 소개",src:d},{id:"11-face-zones",file:"11-face-zones.html",name:"부위별 노화 지도",prefix:"pfz",desc:"얼굴·목 9개 세부 부위 · 정확한 연결점과 증상 요약",src:c},{id:"07-process",file:"07-process.html",name:"시술 과정 4단계",prefix:"ppc",desc:"3D 픽토그램 · 정밀 진단 → 맞춤 설계 → 시술 진행 → 회복 관리",src:f},{id:"08-info",file:"08-info.html",name:"이런 분께 · 시술 정보",prefix:"pin",desc:"추천 대상 3가지 + 소요 시간·구성 표",src:h},{id:"09-faq",file:"09-faq.html",name:"자주 묻는 질문",prefix:"pfq",desc:"문답 5개 + FAQPage 구조화 데이터",src:m},{id:"12-space",file:"12-space.html",name:"원내 공간",prefix:"psp",desc:"원내 사진 5장 겹침 전환 + 공간 설명",src:g},{id:"10-visit",file:"10-visit.html",name:"오시는 길 · 진료시간",prefix:"pvs",desc:"주소 · 도보 안내 · 진료시간",src:u}];function v(i,r){i.innerHTML=r,i.querySelectorAll("script").forEach(a=>{const t=document.createElement("script");for(const n of a.attributes)t.setAttribute(n.name,n.value);t.textContent=a.textContent,a.replaceWith(t)})}export{b as W,v as m};
