(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))t(n);new MutationObserver(n=>{for(const e of n)if(e.type==="childList")for(const s of e.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&t(s)}).observe(document,{childList:!0,subtree:!0});function i(n){const e={};return n.integrity&&(e.integrity=n.integrity),n.referrerPolicy&&(e.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?e.credentials="include":n.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function t(n){if(n.ep)return;n.ep=!0;const e=i(n);fetch(n.href,e)}})();const p=`<!-- ═══ 뷰티블라썸의원 · 퍼스널 레이어드 리프팅 — 히어로 v3 ═══
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
`,o=`<style>
/* ═══ 뷰티블라썸의원 · 장비 필름스트립 ═══
   ThreeUI CharacterCarousel (filmstrip) · MIT — 구조와 모션은 원본 그대로,
   색·이미지·문구만 사이트에 맞췄다. 클래스는 전부 plc- 로 감싸 아임웹과 부딪히지 않는다. */
.plc-sec{--c:#E9918E;--c-dk:#d4706d;--ink:#2f2523;--ink2:#5f5754;--mute:#918a87;--paper:#faf5f4;
  width:100%;max-width:none;margin:0 auto;padding:8px 0 16px;color:var(--ink);
  font-family:'Pretendard',-apple-system,BlinkMacSystemFont,system-ui,'Noto Sans KR',sans-serif;
  word-break:keep-all;text-align:left}
.plc-sec *{box-sizing:border-box}

.plc-head{max-width:1000px;margin:0 auto 22px;text-align:center}
.plc-kw{display:block;margin:0 0 12px;font-size:13px;font-weight:700;letter-spacing:.22em;
  text-transform:uppercase;color:var(--c)}
.plc-h2{margin:0 0 14px;font-size:clamp(30px,3.1vw,45.6px);font-weight:700;line-height:1.35;letter-spacing:-1.3px}
.plc-h2 em{font-style:normal;color:var(--c)}
.plc-lead{margin:0;font-size:clamp(14.5px,1.2vw,17px);line-height:1.8;letter-spacing:-.6px;color:var(--ink2)}

/* ── 무대 : 원근 레일 ── */
.plc-stage{--pointer-x:50%;position:relative;width:100%;height:clamp(345px,33.0vw,500px);
  overflow:hidden;isolation:isolate;perspective:1450px;cursor:grab;touch-action:pan-y;
  -webkit-user-select:none;user-select:none;
  border-radius:24px;
  background:
    linear-gradient(90deg,rgba(160,120,115,.07) 1px,transparent 1px) 50% 0 / 25% 100%,
    repeating-linear-gradient(0deg,transparent 0,transparent 109px,rgba(160,120,115,.1) 110px,transparent 111px),
    radial-gradient(circle at var(--pointer-x) 46%,rgba(255,255,255,.95),transparent 36%),
    var(--paper)}
/* 종이 결 */
.plc-stage::before{content:"";position:absolute;inset:0;z-index:5;pointer-events:none;opacity:.22;
  background:
    repeating-radial-gradient(circle at 12% 18%,rgba(150,110,105,.14) 0 .5px,transparent .7px 4px),
    repeating-radial-gradient(circle at 78% 71%,rgba(255,255,255,.4) 0 .5px,transparent .8px 5px);
  mix-blend-mode:multiply}
/* 양끝 그늘 */
.plc-stage::after{content:"";position:absolute;inset:0;z-index:4;pointer-events:none;
  background:linear-gradient(90deg,rgba(190,150,145,.16),transparent 14%,transparent 86%,rgba(190,150,145,.16))}

.plc-deck{position:absolute;inset:0;z-index:2;transform-style:preserve-3d}

.plc-card{--focus:0;position:absolute;top:50%;left:50%;
  width:clamp(154px,16.8vw,238px);aspect-ratio:.72;padding:7px;overflow:hidden;
  border:1px solid rgba(160,120,115,.34);border-radius:8px;color:var(--ink);background:#fff;
  box-shadow:
    0 calc(10px + var(--focus) * 24px) calc(18px + var(--focus) * 36px)
      rgba(120,80,76,calc(.14 + var(--focus) * .2)),
    inset 0 0 0 1px rgba(255,255,255,.9);
  appearance:none;outline:none;transform-style:preserve-3d;
  will-change:transform,opacity,filter;cursor:pointer;text-decoration:none;font:inherit;
  -webkit-user-drag:none}
.plc-card::before{content:"";position:absolute;inset:5px;z-index:3;pointer-events:none;
  border:1px solid rgba(160,120,115,calc(.16 + var(--focus) * .16))}
.plc-card:focus-visible{box-shadow:0 26px 50px rgba(120,80,76,.34),0 0 0 4px rgba(233,145,142,.45)}

/* 얼굴이 아니라 누끼 장비다 — 잘라내지 않고 담는다 */
.plc-shot{position:absolute;inset:7px 7px 25%;overflow:hidden;display:flex;
  align-items:flex-end;justify-content:center;padding:14px 12px 10px;
  background:linear-gradient(180deg,#fdfbfa,#f4eeed)}
.plc-shot img{display:block;max-width:100%;max-height:100%;width:auto;height:auto;object-fit:contain;
  pointer-events:none;-webkit-user-drag:none;
  transform:scale(calc(.96 + var(--focus) * .08));
  filter:saturate(calc(.72 + var(--focus) * .28)) contrast(1.02);
  transition:none}

.plc-foot{position:absolute;right:7px;bottom:7px;left:7px;height:calc(25% - 7px);
  display:grid;grid-template-columns:clamp(26px,3.2vw,43px) 1fr;align-items:center;
  gap:clamp(6px,0.7vw,11px);padding:clamp(7px,0.8vw,12px);
  color:#fff;background:var(--ink);text-align:left;border-radius:3px}
.plc-no{display:grid;width:clamp(23px,2.6vw,37px);aspect-ratio:1;place-items:center;
  border:1px solid var(--c);border-radius:50%;color:var(--c);
  font:600 clamp(7px,0.6vw,11px)/1 ui-monospace,"SFMono-Regular",monospace}
.plc-meta{min-width:0}
.plc-name,.plc-role{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.plc-name{color:#fff;font-size:clamp(9px,1.0vw,14px);font-weight:800;letter-spacing:-.02em;line-height:1.15}
.plc-role{margin-top:clamp(3px,0.3vw,5px);color:var(--c);font-size:clamp(7px,0.6vw,10px);
  font-weight:700;letter-spacing:.06em;line-height:1}

.plc-sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;
  clip:rect(0,0,0,0);white-space:nowrap;border:0}

@media (max-width:768px){
  .plc-head{margin-bottom:20px}
  .plc-h2{font-size:23px;letter-spacing:-1px}
  .plc-lead{font-size:14.5px}
  .plc-stage{height:clamp(290px,72vw,380px);border-radius:18px;cursor:default;
    background:
      linear-gradient(90deg,rgba(160,120,115,.07) 1px,transparent 1px) 50% 0 / 50% 100%,
      repeating-linear-gradient(0deg,transparent 0,transparent 87px,rgba(160,120,115,.1) 88px,transparent 89px),
      radial-gradient(circle at 50% 50%,rgba(255,255,255,.95),transparent 36%),
      var(--paper)}
  .plc-card{width:clamp(142px,47vw,180px)}
}
@media (prefers-reduced-motion:reduce){.plc-card{will-change:auto}}

/* ── 특징 3가지 — 히어로에서 내려왔다. 헤딩의 "아홉 대" 주장을 바로 받쳐준다 ──
   누를 데 없는 버튼이 아니라 목록이므로 ul/li 로 짠다 */
.plc-points{list-style:none;margin:0 auto 26px;padding:0;max-width:min(1720px,calc(100% - 48px));
  display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(10px,1vw,14px)}
.plc-point{position:relative;display:grid;grid-template-columns:auto 1fr;align-items:center;
  gap:12px;padding:14px clamp(14px,1.3vw,20px);border-radius:15px;color:#fff;overflow:hidden;
  background:linear-gradient(118deg,#E9918E 0%,#f4a6a3 100%);
  box-shadow:0 8px 20px rgba(233,145,142,.24)}
/* 빛이 한 번 훑고 지나간다 */
.plc-point::after{content:'';position:absolute;top:0;bottom:0;left:-40%;width:36%;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.36),transparent);
  transform:skewX(-18deg);animation:plc-sheen 4.6s ease-in-out infinite}
.plc-point:nth-child(2)::after{animation-delay:.5s}
.plc-point:nth-child(3)::after{animation-delay:1s}
@keyframes plc-sheen{0%{left:-40%}26%{left:120%}100%{left:120%}}
.plc-point i{display:grid;place-items:center;width:24px;height:24px;border-radius:50%;
  background:rgba(255,255,255,.22);color:#fff}
.plc-point b{grid-column:2;font-size:clamp(14.5px,1.15vw,16.5px);font-weight:700;
  letter-spacing:-.5px;line-height:1.3}
.plc-point span{grid-column:2;margin-top:2px;font-size:clamp(12px,.95vw,13.5px);
  font-weight:500;letter-spacing:-.3px;color:rgba(255,255,255,.88)}

@media (max-width:900px){
  .plc-points{grid-template-columns:1fr;gap:9px;margin-bottom:22px}
  .plc-point{padding:13px 16px}
}
@media (prefers-reduced-motion:reduce){
  .plc-point::after{display:none}
}

/* ── 헤딩 타이핑 효과 ── 원문은 HTML 에 그대로 있어 크롤러가 읽는다.
   스크롤로 화면에 들어올 때 한 번만 친다. 반복하지 않는다. */
.plc-h2{min-height:var(--plc-h2h,auto)}
.plc-cur{display:inline-block;margin-left:.06em;color:var(--c);font-weight:400;
  animation:plc-bl .62s steps(1,end) infinite}
@keyframes plc-bl{0%,49%{opacity:1}50%,100%{opacity:0}}
@media (prefers-reduced-motion:reduce){.plc-cur{display:none}}
</style>
<section class="plc-sec" aria-labelledby="plc-title">

  <header class="plc-head">
    <span class="plc-kw">9 Original Devices</span>
    <h2 class="plc-h2" id="plc-title">한 대로 끝내지 않습니다.<br><em>아홉 대를 층에 맞춰</em> 조합합니다.</h2>
    <p class="plc-lead">원리가 서로 다른 아홉 가지 오리지널 장비를 갖추고, 진단 결과에 따라 필요한 것만 골라 순서대로 씁니다.</p>
  </header>
  <ul class="plc-points">
    <li class="plc-point">
      <i aria-hidden="true"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12.5 4.6 4.5L19 7.5"/></svg></i>
      <b>부위별 맞춤 설계</b><span>이중턱 · 팔자주름 · 잔주름</span>
    </li>
    <li class="plc-point">
      <i aria-hidden="true"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12.5 4.6 4.5L19 7.5"/></svg></i>
      <b>FDA 승인 장비</b><span>9가지 오리지널 장비 보유</span>
    </li>
    <li class="plc-point">
      <i aria-hidden="true"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12.5 4.6 4.5L19 7.5"/></svg></i>
      <b>자연스러운 윤곽 회복</b><span>탄력 · 안티에이징</span>
    </li>
  </ul>


  <div class="plc-stage" aria-label="장비 9종 둘러보기">
    <p class="plc-sr">좌우로 끌거나 방향키로 장비를 넘길 수 있습니다. 카드를 누르면 해당 장비 페이지로 이동합니다.</p>
    <div class="plc-deck"></div>
  </div>

</section>
<script>
(function(){
  var root = document.querySelector('.plc-sec');
  if (!root || root.dataset.plcReady) return;
  root.dataset.plcReady = '1';

  var CDN = 'https://pub-7ab1b86fbb9c4442971f0a3a7b5adf9f.r2.dev/beautyblossom/layered';
  // 장비 사진 파일명 — 규칙은 hero-<slug>.webp 이고, 교체본이 있는 것만 예외로 적는다
  var SHOTS = { linearz: 'hero-linearz-white.v1.webp' };
  function shot(slug){ return SHOTS[slug] || ('hero-' + slug + '.webp'); }

  var profiles = [
        ["소프웨이브","SUPERB 초음파","sofwave","https://beautyblossom.kr/139"],
        ["써마지 FLX","모노폴라 RF","thermage","https://beautyblossom.kr/41"],
        ["포트라 콰트로","4파장 다이오드","fortra","https://beautyblossom.kr/titanium-fortra-quattro"],
        ["세르프(XERF)","듀얼 모노폴라 RF","xerf","https://beautyblossom.kr/155"],
        ["덴서티","모노+바이폴라 RF","density","https://beautyblossom.kr/153"],
        ["온다","마이크로웨이브","onda","https://beautyblossom.kr/42"],
        ["올타이트","유전가열 DLTD","alltite","https://beautyblossom.kr/alltite-lifting"],
        ["리니어지","선·점 HIFU","linearz","https://beautyblossom.kr/154"],
        ["울쎄라피 프라임","초음파 HIFU","ulthera","https://beautyblossom.kr/40"]
      ].map(function(a){ return {name:a[0], role:a[1], slug:a[2], url:a[3]}; });

  var stage = root.querySelector('.plc-stage');
  var deck  = root.querySelector('.plc-deck');

  var cards = profiles.map(function(p, index){
    var card = document.createElement('a');
    card.className = 'plc-card';
    card.href = p.url;
    card.draggable = false;
    card.dataset.index = String(index);
    card.setAttribute('aria-label', p.name + ' · ' + p.role);
    card.innerHTML =
      '<span class="plc-shot"><img src="' + CDN + '/' + shot(p.slug) + '" alt="' + p.name +
        '" loading="lazy" decoding="async" draggable="false"></span>' +
      '<span class="plc-foot">' +
        '<span class="plc-no">' + String(index + 1).padStart(2, '0') + '</span>' +
        '<span class="plc-meta">' +
          '<span class="plc-name">' + p.name + '</span>' +
          '<span class="plc-role">' + p.role + '</span>' +
        '</span>' +
      '</span>';
    deck.appendChild(card);
    return card;
  });

  var count = cards.length;
  var reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var state = {phase:3, target:3, base:3};
  var running = true, dragged = false, hovering = false;
  var AUTO = 1 / 2600;   /* ms 당 카드 수 — 한 장 넘어가는 데 2.6초 */

  function wrappedDelta(index, phase){
    var d = index - phase;
    while (d > count / 2) d -= count;
    while (d < -count / 2) d += count;
    return d;
  }
  function nearestIndex(){ return (Math.round(state.phase) % count + count) % count; }
  function moveTo(index){
    var cur = nearestIndex(), d = index - cur;
    if (d > count / 2) d -= count;
    if (d < -count / 2) d += count;
    state.base += d; state.target = state.base;   }

  cards.forEach(function(card, index){
    /* 카드가 링크라 클릭은 장비 페이지로 간다. 다만 끌어서 넘긴 직후의 클릭은 막는다. */
    card.addEventListener('click', function(e){ if (dragged) e.preventDefault(); });
    card.addEventListener('focus', function(){ moveTo(index); });
  });

  /* 마우스를 올리는 것만으로는 덱이 움직이지 않는다 — 배경 조명만 따라온다.
     대신 흐름을 멈춰 읽을 수 있게 한다. */
  stage.addEventListener('pointerenter', function(){ hovering = true; });
  stage.addEventListener('pointermove', function(e){
    var r = stage.getBoundingClientRect();
    var nx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2));
    stage.style.setProperty('--pointer-x', ((nx + 1) * 50) + '%');
  });
  stage.addEventListener('pointerleave', function(){
    hovering = false;
    stage.style.setProperty('--pointer-x', '50%');
  });

  /* 세로 휠은 페이지에 넘긴다 — 위젯 위에서 스크롤이 멈추면 안 된다.
     가로 휠(트랙패드 좌우) 과 Shift+휠 만 카드 이동에 쓴다. */
  stage.addEventListener('wheel', function(e){
    var horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey;
    if (!horizontal) return;
    var dir = Math.sign(e.shiftKey ? e.deltaY : e.deltaX);
    if (!dir) return;
    e.preventDefault();
    state.base += dir; state.target = state.base;   }, {passive:false});

  /* 방향키는 위젯 안에 포커스가 있을 때만 — 페이지 전역에서 가로채면 안 된다 */
  root.addEventListener('keydown', function(e){
    var fwd = e.key === 'ArrowRight' || e.key === 'ArrowDown';
    var back = e.key === 'ArrowLeft' || e.key === 'ArrowUp';
    if (!fwd && !back) return;
    e.preventDefault();
    state.base += fwd ? 1 : -1; state.target = state.base;   });

  /* 터치·드래그로 넘기기 */
  var down = false, x0 = 0, b0 = 0, pid = null, moved = 0, lastDrag = 0;

  /* 브라우저 기본 드래그(고스트 이미지)를 막는다 — 이게 포인터 흐름을 통째로 가져간다 */
  stage.addEventListener('dragstart', function(e){ e.preventDefault(); });

  stage.addEventListener('pointerdown', function(e){
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    down = true; dragged = false; moved = 0;
    x0 = e.clientX; b0 = state.base; pid = e.pointerId;
    /* 포인터를 무대에 묶어 두면 커서가 밖으로 나가도 끝까지 따라온다 */
    try { stage.setPointerCapture(pid); } catch (err) {}
  });

  stage.addEventListener('pointermove', function(e){
    if (!down) return;
    var dx = x0 - e.clientX;
    if (Math.abs(dx) > moved) moved = Math.abs(dx);
    state.base = b0 + dx / (innerWidth < 769 ? 66 : 90);
    state.target = state.base;
  });

  function endDrag(){
    if (!down) return;
    down = false;
    dragged = moved > 6;          /* 6px 넘게 끌었으면 클릭이 아니라 끌기다 */
    lastDrag = performance.now();
    if (pid !== null){ try { stage.releasePointerCapture(pid); } catch (err) {} pid = null; }
    state.target = state.base;
  }
  stage.addEventListener('pointerup', endDrag);
  stage.addEventListener('pointercancel', endDrag);
  /* pointerleave 로는 끝내지 않는다 — 캡처 중이라 밖으로 나가도 이어진다 */
  stage.addEventListener('pointerup', function(){ setTimeout(function(){ dragged = false; }, 40); });

  /* 화면 밖이거나 탭이 숨겨져 있으면 프레임을 돌리지 않는다 */
  if (window.IntersectionObserver){
    new IntersectionObserver(function(es){
      for (var i = 0; i < es.length; i++){
        var on = es[i].isIntersecting && !document.hidden;
        if (on && !running){ running = true; previousTime = performance.now(); requestAnimationFrame(render); }
        running = on;
      }
    }, {threshold:.04}).observe(stage);
  }
  document.addEventListener('visibilitychange', function(){
    if (!document.hidden && !running){ running = true; previousTime = performance.now(); requestAnimationFrame(render); }
    else if (document.hidden) running = false;
  });

  var previousTime = performance.now();

  function render(time){
    if (!running) return;
    var dt = Math.min(32, time - previousTime);
    previousTime = time;
    var ease = reducedMotion ? 1 : 1 - Math.pow(0.001, dt / 1000);

    /* 끌고 있거나 마우스를 올려두면 멈춘다. 그 밖에는 계속 흐른다. */
    if (!down && !hovering && !reducedMotion && time - lastDrag > 2500){
      state.base += AUTO * dt;
      state.target = state.base;
    }

    state.phase += (state.target - state.phase) * ease;
    var activeIndex = nearestIndex();
    /* 간격을 카드 폭에 비례시키면 화면 크기와 무관하게 겹침 비율이 같다 */
    var cardW = cards[0].offsetWidth || 200;
    var hSpacing = cardW * 0.78;

    cards.forEach(function(card, index){
      var delta = wrappedDelta(index, state.phase);
      var distance = Math.abs(delta);
      var focus = Math.exp(-distance * distance * 1.28);
      var side = Math.max(0, 1 - distance / 5);
      var dir = Math.sign(delta);
      var x = delta * hSpacing;
      var y = distance * 8;
      var z = focus * 145 - distance * 148;
      var scale = 0.54 + side * 0.15 + focus * 0.54;
      var rotateX = 0;
      var rotateY = -dir * (distance > 0.2 ? 14 + Math.min(distance, 3) * 5 : 0);
      var rotateZ = delta * 0.7;

      card.style.setProperty('--focus', focus.toFixed(4));
      card.style.zIndex = String(Math.round(1000 - distance * 100));
      card.style.opacity = String(Math.max(0.13, side * 0.76 + focus * 0.24));
      card.style.filter = 'blur(' + (Math.max(0, distance - 1.5) * 0.38).toFixed(2) + 'px)';
      card.style.transform = [
        'translate(-50%, -50%)',
        'translate3d(' + x.toFixed(2) + 'px, ' + y.toFixed(2) + 'px, ' + z.toFixed(2) + 'px)',
        'rotateX(' + rotateX.toFixed(2) + 'deg)',
        'rotateY(' + rotateY.toFixed(2) + 'deg)',
        'rotateZ(' + rotateZ.toFixed(2) + 'deg)',
        'scale(' + scale.toFixed(4) + ')'
      ].join(' ');
      card.setAttribute('aria-current', index === activeIndex ? 'true' : 'false');
    });

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
})();
<\/script>
<script>
/* 헤딩 타이핑 — 화면에 들어오면 친다. 내려와서 보일 때도, 올라와서 보일 때도.
   화면 밖으로 나가면 되감아 두므로 다시 보일 때 처음부터 다시 쳐진다.
   커서는 끝난 뒤에도 계속 깜박인다.
   글자는 이미 DOM 에 있고 잠시 감췄다 되돌리는 방식이라 크롤러는 완성문을 본다. */
(function(){
  var el=document.querySelector('.plc-h2');
  if(!el||el.getAttribute('data-tt'))return;
  if(!('IntersectionObserver' in window))return;
  if(window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  el.setAttribute('data-tt','1');

  var parts=[],w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false),n;
  while(n=w.nextNode()){ if(n.nodeValue.length) parts.push({n:n,t:n.nodeValue}); }
  var total=0; for(var i=0;i<parts.length;i++) total+=parts[i].t.length;
  if(!total)return;

  el.style.setProperty('--plc-h2h', el.getBoundingClientRect().height+'px'); /* 비어도 안 접히게 */

  var cur=document.createElement('span');
  cur.className='plc-cur'; cur.setAttribute('aria-hidden','true'); cur.textContent='|';
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
`,d=`<!-- ═══ 뷰티블라썸의원 · 퍼스널 레이어드 리프팅 — 장비 9종 상세 ═══
     작은 칩 나열 대신 장비마다 큰 블록 하나씩.
     · 설명 문구는 전부 **뷰티블라썸 자사 장비 페이지**에서 가져왔다. 새로 지어내지 않았다.
     · 지루하지 않게 : 장비마다 깊이 막대(표피/진피/지방/근막)가 다르게 켜지고,
       좌우 배치가 번갈아 바뀌며, 사진 뒤에 큰 유령 번호가 깔린다.
     · 얕은 층 → 깊은 층 순서. 장비명이 각 장비 페이지로 연결된다.
     접두사 pdv- : bb-, plh-, plc-, pll-, pls-, pld- 와 겹치지 않는다
     body·html 선택자 없음 — 아임웹 문서를 건드리지 않는다 -->
<style>
.pdv-sec{--c:#E9918E;--c-dk:#d4706d;--c-bg:#fdf3f2;--ink:#2f2523;--ink2:#5f5754;--mute:#918a87;
  --line:#efe7e6;--paper:#faf6f5;
  width:100%;max-width:none;margin:0 auto;padding:10px 0 40px;color:var(--ink);
  font-family:'Pretendard',-apple-system,BlinkMacSystemFont,system-ui,'Noto Sans KR',sans-serif;
  word-break:keep-all;overflow-wrap:break-word;text-align:left}
.pdv-sec *{box-sizing:border-box}
.pdv-list > .pdv-item:first-child{padding-top:8px}


.pdv-list{list-style:none;margin:0 auto;padding:0;max-width:min(1720px,calc(100% - 48px))}
.pdv-item{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.04fr);align-items:center;
  gap:clamp(26px,4.4vw,72px);padding:clamp(30px,3.6vw,52px) 20px;position:relative}
.pdv-item + .pdv-item{border-top:1px solid var(--line)}
.pdv-item:nth-child(even) .pdv-copy{order:2}
.pdv-item:nth-child(even) .pdv-shot{order:1}

.pdv-no{display:block;margin:0 0 11px;font-size:12px;font-weight:800;letter-spacing:.2em;
  color:var(--h);font-variant-numeric:tabular-nums}
.pdv-en{display:block;margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:.13em;
  text-transform:uppercase;color:var(--mute)}
.pdv-name{margin:0 0 10px;font-size:clamp(27px,3.1vw,42px);font-weight:800;line-height:1.18;
  letter-spacing:-1.8px}
.pdv-name a{color:inherit;text-decoration:none;background-image:linear-gradient(var(--h),var(--h));
  background-size:0 2px;background-position:0 100%;background-repeat:no-repeat;
  transition:background-size .35s cubic-bezier(.22,.61,.36,1),color .25s}
.pdv-name a:hover,.pdv-name a:focus-visible{color:var(--h);background-size:100% 2px}
.pdv-name a:focus-visible{outline:2px solid var(--h);outline-offset:4px;border-radius:2px}

.pdv-spec{margin:0 0 18px;font-size:13px;font-weight:700;letter-spacing:.02em;color:var(--h);
  font-variant-numeric:tabular-nums}

/* 깊이 막대 — 장비마다 켜지는 칸이 달라 아홉 개가 각각 다른 모양이 된다 */
.pdv-depth{list-style:none;margin:0 0 20px;padding:0;display:grid;
  grid-template-columns:repeat(4,minmax(0,1fr));gap:4px;max-width:330px}
.pdv-depth li{margin:0;padding:8px 4px 7px;border-radius:6px;text-align:center;
  font-size:11.4px;font-weight:700;letter-spacing:-.2px;position:relative;
  border-top:3px solid transparent;transition:background .3s,color .3s}
.pdv-d0{background:#f4efee;color:#b9adab;border-top-color:#e4dbda}
.pdv-d1{background:color-mix(in srgb,var(--h) 13%,#fff);color:var(--h);border-top-color:var(--h)}

.pdv-desc{margin:0 0 20px;font-size:clamp(14.5px,1.1vw,16.5px);line-height:1.95;
  letter-spacing:-.5px;color:var(--ink2);max-width:46ch}
.pdv-desc b{font-weight:700;color:var(--ink)}

.pdv-tags{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:7px 14px}
.pdv-tags li{margin:0;font-size:13.4px;font-weight:600;letter-spacing:-.3px;color:var(--h);opacity:.9}

/* 사진 — 뒤에 큰 유령 번호 */
.pdv-shot{position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden;
  aspect-ratio:4/3.3;padding:clamp(20px,2.6vw,38px);border-radius:22px;
  background:linear-gradient(155deg,color-mix(in srgb,var(--h) 7%,#fff) 0%,var(--paper) 62%);
  border:1px solid var(--line)}
.pdv-ghost{position:absolute;right:4%;bottom:4%;z-index:0;pointer-events:none;
  font-size:clamp(120px,17.0vw,230px);font-weight:800;line-height:.8;letter-spacing:-.06em;
  color:color-mix(in srgb,var(--h) 12%,transparent);font-variant-numeric:tabular-nums}
.pdv-shot img{position:relative;z-index:1;max-width:100%;max-height:100%;width:auto;height:auto;
  object-fit:contain;filter:drop-shadow(0 16px 26px rgba(60,40,38,.16));
  transition:transform .45s cubic-bezier(.22,.61,.36,1)}
.pdv-item:hover .pdv-shot img{transform:translateY(-7px) scale(1.035)}


@media (max-width:1000px){
  .pdv-item{grid-template-columns:1fr;gap:24px;padding:32px 20px}
  .pdv-item:nth-child(even) .pdv-copy,.pdv-item:nth-child(even) .pdv-shot{order:0}
  .pdv-shot{aspect-ratio:16/11}
  .pdv-desc{max-width:none}
}
@media (max-width:768px){
  .pdv-sec{padding:6px 0 26px}
  .pdv-item{padding:26px 16px;gap:20px}
  .pdv-name{font-size:25px;letter-spacing:-1.2px}
  .pdv-depth{max-width:none;margin-bottom:17px}
  .pdv-depth li{font-size:11px;padding:7px 3px 6px}
  .pdv-desc{font-size:14.5px;line-height:1.85}
  .pdv-shot{aspect-ratio:4/3.3;padding:18px;border-radius:16px}
  .pdv-ghost{font-size:110px;right:2%}
}
@media (prefers-reduced-motion:reduce){
  .pdv-shot img,.pdv-name a{transition:none}
  .pdv-item:hover .pdv-shot img{transform:none}
}

/* ── 선 발광 : 마우스가 올라가면 테두리가 빛난다 ── */
.pdv-shot{transition:border-color .3s ease,box-shadow .3s ease,transform .3s cubic-bezier(.22,.61,.36,1)}
.pdv-shot:hover,.pdv-shot:focus-within{border-color:rgba(233,145,142,.7)!important;
  box-shadow:0 0 0 1px rgba(233,145,142,.45),
             0 0 14px rgba(233,145,142,.35),
             0 0 34px rgba(233,145,142,.18),
             0 14px 34px rgba(140,80,78,.14)}
@media (prefers-reduced-motion:reduce){.pdv-shot{transition:none}}

/* ── 스크롤 등장 ──
   숨김 상태는 .js-anim 이 붙었을 때만 적용된다. 자바스크립트가 없거나
   막히면 전부 그냥 보인다. 크롤러와 첫 화면 캡처가 빈 화면을 보지 않는다. */
.pdv-sec.js-anim .pdv-copy>*{opacity:0;transform:translateX(-30px)}
.pdv-sec.js-anim .pdv-item:nth-child(even) .pdv-copy>*{transform:translateX(30px)}
.pdv-sec.js-anim .pdv-shot{opacity:0;transform:translateY(34px) scale(.982)}
.pdv-sec.js-anim .pdv-ghost{opacity:0;transform:translateY(22px)}
.pdv-sec.js-anim .pdv-copy>*,
.pdv-sec.js-anim .pdv-shot,
.pdv-sec.js-anim .pdv-ghost{
  transition:opacity .62s cubic-bezier(.22,.61,.36,1),transform .72s cubic-bezier(.22,.61,.36,1)}
.pdv-sec.js-anim .pdv-item.is-in .pdv-copy>*,
.pdv-sec.js-anim .pdv-item.is-in .pdv-shot{opacity:1;transform:none}
.pdv-sec.js-anim .pdv-item.is-in .pdv-ghost{opacity:1;transform:none;transition-delay:.34s}
/* 사진이 먼저 자리를 잡고, 글이 위에서부터 차례로 따라 들어온다 */
.pdv-sec.js-anim .pdv-item.is-in .pdv-shot{transition-delay:.04s}
.pdv-sec.js-anim .pdv-item.is-in .pdv-copy>*:nth-child(1){transition-delay:.10s}
.pdv-sec.js-anim .pdv-item.is-in .pdv-copy>*:nth-child(2){transition-delay:.16s}
.pdv-sec.js-anim .pdv-item.is-in .pdv-copy>*:nth-child(3){transition-delay:.22s}
.pdv-sec.js-anim .pdv-item.is-in .pdv-copy>*:nth-child(4){transition-delay:.28s}
.pdv-sec.js-anim .pdv-item.is-in .pdv-copy>*:nth-child(5){transition-delay:.34s}
.pdv-sec.js-anim .pdv-item.is-in .pdv-copy>*:nth-child(6){transition-delay:.40s}
.pdv-sec.js-anim .pdv-item.is-in .pdv-copy>*:nth-child(7){transition-delay:.46s}
@media (max-width:768px){
  .pdv-sec.js-anim .pdv-copy>*,
  .pdv-sec.js-anim .pdv-item:nth-child(even) .pdv-copy>*{transform:translateY(20px)}
  .pdv-sec.js-anim .pdv-shot{transform:translateY(22px)}
}
@media (prefers-reduced-motion:reduce){
  .pdv-sec.js-anim .pdv-copy>*,.pdv-sec.js-anim .pdv-shot,.pdv-sec.js-anim .pdv-ghost{
    opacity:1!important;transform:none!important;transition:none!important}
}
</style>

<section class="pdv-sec" aria-label="장비 9종 상세">



  <ol class="pdv-list">
    <li class="pdv-item" style="--h:#E0554F">
      <div class="pdv-copy">
        <span class="pdv-no" aria-hidden="true">01</span>
        <span class="pdv-en">Fotra Quattro · Quadruple Wavelength Diode</span>
        <h3 class="pdv-name"><a href="https://beautyblossom.kr/titanium-fortra-quattro">포트라 콰트로</a></h3>
        <p class="pdv-spec">755 · 808 · 940 · 1064nm</p>
        <ul class="pdv-depth" aria-label="작용 층: 표피 · 진피 · 지방 · SMAS층"><li class="pdv-d1"><span>표피</span></li><li class="pdv-d1"><span>진피</span></li><li class="pdv-d1"><span>지방</span></li><li class="pdv-d1"><span>근막</span></li></ul>
        <p class="pdv-desc">기존 3파장 구성에 <b>940nm를 더한 4파장 설계</b>입니다. 파장이 길어질수록 피부 깊은 층까지 도달하기 때문에, 표피의 톤 정돈부터 진피와 지방층까지 층별로 나눠 접근합니다.</p>
        <ul class="pdv-tags"><li>#피부톤</li><li>#홍조</li><li>#피부결</li><li>#모공</li><li>#홍대레이저</li></ul>
      </div>
      <div class="pdv-shot">
        <span class="pdv-ghost" aria-hidden="true">01</span>
        <img src="https://pub-7ab1b86fbb9c4442971f0a3a7b5adf9f.r2.dev/beautyblossom/layered/hero-fortra.webp" alt="포트라 콰트로 장비" width="282" height="560" loading="lazy" decoding="async">
      </div>
    </li>
    <li class="pdv-item" style="--h:#00A9BE">
      <div class="pdv-copy">
        <span class="pdv-no" aria-hidden="true">02</span>
        <span class="pdv-en">Sofwave · SUPERB Ultrasound</span>
        <h3 class="pdv-name"><a href="https://beautyblossom.kr/139">소프웨이브</a></h3>
        <p class="pdv-spec">12MHz · 1.5mm · 7빔 동시</p>
        <ul class="pdv-depth" aria-label="작용 층: 진피 상부층"><li class="pdv-d0"><span>표피</span></li><li class="pdv-d1"><span>진피</span></li><li class="pdv-d0"><span>지방</span></li><li class="pdv-d0"><span>근막</span></li></ul>
        <p class="pdv-desc">정확히 <b>1.5mm 한 깊이</b>에만 에너지를 넣습니다. 주름이 시작되는 지점입니다. 더 깊이 들어가는 시술과 달리 신경층과 지방층을 건드리지 않아 <b>볼패임 걱정이 없습니다.</b></p>
        <ul class="pdv-tags"><li>#잔주름</li><li>#피부결</li><li>#볼패임없는</li><li>#무통리프팅</li></ul>
      </div>
      <div class="pdv-shot">
        <span class="pdv-ghost" aria-hidden="true">02</span>
        <img src="https://pub-7ab1b86fbb9c4442971f0a3a7b5adf9f.r2.dev/beautyblossom/layered/hero-sofwave.webp" alt="소프웨이브 장비" width="299" height="560" loading="lazy" decoding="async">
      </div>
    </li>
    <li class="pdv-item" style="--h:#E08A2E">
      <div class="pdv-copy">
        <span class="pdv-no" aria-hidden="true">03</span>
        <span class="pdv-en">Thermage FLX · Monopolar RF</span>
        <h3 class="pdv-name"><a href="https://beautyblossom.kr/41">써마지 FLX</a></h3>
        <p class="pdv-spec">6.78MHz · 자동조절 알고리즘</p>
        <ul class="pdv-depth" aria-label="작용 층: 진피층"><li class="pdv-d0"><span>표피</span></li><li class="pdv-d1"><span>진피</span></li><li class="pdv-d0"><span>지방</span></li><li class="pdv-d0"><span>근막</span></li></ul>
        <p class="pdv-desc">표피는 냉각하고 진피층만 자극합니다. 부위마다 다른 조건을 <b>자동조절 알고리즘</b>이 맞춰주고, 온기가 도는 정도의 느낌으로 콜라겐 리모델링을 유도합니다.</p>
        <ul class="pdv-tags"><li>#탄력저하</li><li>#잔주름</li><li>#피부결</li><li>#모공</li><li>#홍대써마지</li></ul>
      </div>
      <div class="pdv-shot">
        <span class="pdv-ghost" aria-hidden="true">03</span>
        <img src="https://pub-7ab1b86fbb9c4442971f0a3a7b5adf9f.r2.dev/beautyblossom/layered/hero-thermage.webp" alt="써마지 FLX 장비" width="311" height="560" loading="lazy" decoding="async">
      </div>
    </li>
    <li class="pdv-item" style="--h:#6D5CFF">
      <div class="pdv-copy">
        <span class="pdv-no" aria-hidden="true">04</span>
        <span class="pdv-en">LinearZ · Line &amp; Dot HIFU</span>
        <h3 class="pdv-name"><a href="https://beautyblossom.kr/154">리니어지</a></h3>
        <p class="pdv-spec">1.5 – 13mm · 0.5mm 단위</p>
        <ul class="pdv-depth" aria-label="작용 층: 진피 · 지방 · 근막층"><li class="pdv-d0"><span>표피</span></li><li class="pdv-d1"><span>진피</span></li><li class="pdv-d1"><span>지방</span></li><li class="pdv-d1"><span>근막</span></li></ul>
        <p class="pdv-desc">초음파를 <b>선(Linear)과 점(Dot) 두 가지 모드</b>로 넣습니다. 카트리지 하나로 1.5mm부터 13mm까지 0.5mm 단위로 조절되기 때문에, 개인별 피부 두께에 맞춰 깊이를 고릅니다.</p>
        <ul class="pdv-tags"><li>#얼굴처짐</li><li>#턱선</li><li>#V라인</li><li>#깊은주름</li></ul>
      </div>
      <div class="pdv-shot">
        <span class="pdv-ghost" aria-hidden="true">04</span>
        <img src="https://pub-7ab1b86fbb9c4442971f0a3a7b5adf9f.r2.dev/beautyblossom/layered/hero-linearz-white.v1.webp" alt="리니어지 장비" width="288" height="560" loading="lazy" decoding="async">
      </div>
    </li>
    <li class="pdv-item" style="--h:#0A84FF">
      <div class="pdv-copy">
        <span class="pdv-no" aria-hidden="true">05</span>
        <span class="pdv-en">Ultherapy PRIME · MFU-V HIFU</span>
        <h3 class="pdv-name"><a href="https://beautyblossom.kr/40">울쎄라피 프라임</a></h3>
        <p class="pdv-spec">1.5 · 3.0 · 4.5mm · 8mm 영상</p>
        <ul class="pdv-depth" aria-label="작용 층: SMAS층 + 진피층"><li class="pdv-d0"><span>표피</span></li><li class="pdv-d1"><span>진피</span></li><li class="pdv-d0"><span>지방</span></li><li class="pdv-d1"><span>근막</span></li></ul>
        <p class="pdv-desc">시술 중 <b>8mm 깊이까지 초음파 영상</b>으로 피부 구조를 눈으로 확인하면서 진행합니다. 1.5 · 3.0 · 4.5mm 세 깊이에 에너지를 넣고, 4.5mm가 성형에서 끌어올리는 SMAS층입니다.</p>
        <ul class="pdv-tags"><li>#근막리프팅</li><li>#얼굴처짐</li><li>#깊은주름</li><li>#V라인</li><li>#홍대울쎄라</li></ul>
      </div>
      <div class="pdv-shot">
        <span class="pdv-ghost" aria-hidden="true">05</span>
        <img src="https://pub-7ab1b86fbb9c4442971f0a3a7b5adf9f.r2.dev/beautyblossom/layered/hero-ulthera.webp" alt="울쎄라피 프라임 장비" width="277" height="560" loading="lazy" decoding="async">
      </div>
    </li>
    <li class="pdv-item" style="--h:#E8455C">
      <div class="pdv-copy">
        <span class="pdv-no" aria-hidden="true">06</span>
        <span class="pdv-en">Alltite · DLTD® Dielectric Heating</span>
        <h3 class="pdv-name"><a href="https://beautyblossom.kr/alltite-lifting">올타이트</a></h3>
        <p class="pdv-spec">유전가열 · 사파이어 렌즈</p>
        <ul class="pdv-depth" aria-label="작용 층: 진피층 + SMAS층"><li class="pdv-d0"><span>표피</span></li><li class="pdv-d1"><span>진피</span></li><li class="pdv-d0"><span>지방</span></li><li class="pdv-d1"><span>근막</span></li></ul>
        <p class="pdv-desc"><b>채우지 않고 끌어올립니다.</b> 암 치료에 쓰이던 유전가열 원리를 가져와, 표피는 차갑게 지키고 진피와 SMAS층에만 열을 모읍니다. 사파이어 렌즈가 원하는 깊이에만 에너지를 집속합니다.</p>
        <ul class="pdv-tags"><li>#볼륨보존</li><li>#얇은피부</li><li>#탄력저하</li><li>#얼굴처짐</li></ul>
      </div>
      <div class="pdv-shot">
        <span class="pdv-ghost" aria-hidden="true">06</span>
        <img src="https://pub-7ab1b86fbb9c4442971f0a3a7b5adf9f.r2.dev/beautyblossom/layered/hero-alltite.webp" alt="올타이트 장비" width="373" height="560" loading="lazy" decoding="async">
      </div>
    </li>
    <li class="pdv-item" style="--h:#E8562E">
      <div class="pdv-copy">
        <span class="pdv-no" aria-hidden="true">07</span>
        <span class="pdv-en">XERF · Dual Frequency Monopolar RF</span>
        <h3 class="pdv-name"><a href="https://beautyblossom.kr/155">세르프(XERF)</a></h3>
        <p class="pdv-spec">6.78 + 2MHz · 3단계 Depth</p>
        <ul class="pdv-depth" aria-label="작용 층: 진피 · 지방층"><li class="pdv-d0"><span>표피</span></li><li class="pdv-d1"><span>진피</span></li><li class="pdv-d1"><span>지방</span></li><li class="pdv-d0"><span>근막</span></li></ul>
        <p class="pdv-desc">루트로닉이 30여 년 레이저 노하우를 모은 모노폴라 RF입니다. <b>6.78MHz는 피부 표층의 결을</b> 섬세하게 다루고 <b>2MHz는 더 깊은 층까지</b> 열을 보냅니다. Shallow에서 Deep까지 3단계로 퍼집니다.</p>
        <ul class="pdv-tags"><li>#팔자주름</li><li>#얼굴처짐</li><li>#탄력저하</li><li>#피부탄력</li></ul>
      </div>
      <div class="pdv-shot">
        <span class="pdv-ghost" aria-hidden="true">07</span>
        <img src="https://pub-7ab1b86fbb9c4442971f0a3a7b5adf9f.r2.dev/beautyblossom/layered/hero-xerf.webp" alt="세르프(XERF) 장비" width="241" height="560" loading="lazy" decoding="async">
      </div>
    </li>
    <li class="pdv-item" style="--h:#8B5CF6">
      <div class="pdv-copy">
        <span class="pdv-no" aria-hidden="true">08</span>
        <span class="pdv-en">Density · Mono + Bipolar RF</span>
        <h3 class="pdv-name"><a href="https://beautyblossom.kr/153">덴서티</a></h3>
        <p class="pdv-spec">최대 400W · 임피던스 피드백</p>
        <ul class="pdv-depth" aria-label="작용 층: 진피 · 지방 · 근막층"><li class="pdv-d0"><span>표피</span></li><li class="pdv-d1"><span>진피</span></li><li class="pdv-d1"><span>지방</span></li><li class="pdv-d1"><span>근막</span></li></ul>
        <p class="pdv-desc">국산 5세대 고주파입니다. <b>모노폴라는 깊은 층까지 강력하게, 바이폴라는 얕은 층을 촘촘하게</b> 커버합니다. 임피던스 피드백이 사람마다 다른 피부 저항을 샷마다 측정해 출력을 맞춥니다.</p>
        <ul class="pdv-tags"><li>#이중턱</li><li>#턱선</li><li>#얼굴처짐</li><li>#팔자주름</li></ul>
      </div>
      <div class="pdv-shot">
        <span class="pdv-ghost" aria-hidden="true">08</span>
        <img src="https://pub-7ab1b86fbb9c4442971f0a3a7b5adf9f.r2.dev/beautyblossom/layered/hero-density.webp" alt="덴서티 장비" width="278" height="560" loading="lazy" decoding="async">
      </div>
    </li>
    <li class="pdv-item" style="--h:#E0447E">
      <div class="pdv-copy">
        <span class="pdv-no" aria-hidden="true">09</span>
        <span class="pdv-en">Onda · Coolwaves Microwave</span>
        <h3 class="pdv-name"><a href="https://beautyblossom.kr/42">온다</a></h3>
        <p class="pdv-spec">2.45GHz · 3mm / 7mm 핸드피스</p>
        <ul class="pdv-depth" aria-label="작용 층: 피하지방 + 진피층"><li class="pdv-d0"><span>표피</span></li><li class="pdv-d1"><span>진피</span></li><li class="pdv-d1"><span>지방</span></li><li class="pdv-d0"><span>근막</span></li></ul>
        <p class="pdv-desc">마이크로파 에너지가 표피를 보호하면서 깊숙이 들어갑니다. <b>특허받은 3mm와 7mm 두 핸드피스</b>로 피부 타입에 맞춰 깊이를 고르고, 접촉식 쿨링으로 표면은 시원하게 유지합니다.</p>
        <ul class="pdv-tags"><li>#이중턱</li><li>#볼살처짐</li><li>#얼굴윤곽</li><li>#V라인</li></ul>
      </div>
      <div class="pdv-shot">
        <span class="pdv-ghost" aria-hidden="true">09</span>
        <img src="https://pub-7ab1b86fbb9c4442971f0a3a7b5adf9f.r2.dev/beautyblossom/layered/hero-onda.webp" alt="온다 장비" width="218" height="560" loading="lazy" decoding="async">
      </div>
    </li>
  </ol>


</section>

<script>
/* 장비 블록 스크롤 등장 — 화면에 들어오면 한 번만 재생한다.
   .js-anim 을 여기서 붙이므로, 스크립트가 안 돌면 숨김 규칙 자체가 없다. */
(function(){
  var sec=document.querySelector('.pdv-sec');
  if(!sec||sec.getAttribute('data-anim'))return;
  if(!('IntersectionObserver' in window))return;
  if(window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  sec.setAttribute('data-anim','1');
  sec.classList.add('js-anim');
  var items=sec.querySelectorAll('.pdv-item');
  var io=new IntersectionObserver(function(es){
    for(var i=0;i<es.length;i++){
      if(es[i].isIntersecting){ es[i].target.classList.add('is-in'); io.unobserve(es[i].target); }
    }
  },{threshold:.18,rootMargin:'0px 0px -8% 0px'});
  for(var i=0;i<items.length;i++) io.observe(items[i]);
})();
<\/script>
`,c=`<!-- ═══ 뷰티블라썸의원 · 퍼스널 레이어드 리프팅 — 부위별 노화 지도 ═══
     레퍼런스(정적 이미지)보다 나은 점
      · 카드에 마우스를 올리면 그 부위로 이어지는 선이 빛나고 얼굴 위 점이 커진다. 반대도 된다.
      · 선은 스크롤 진입 시 한 번 그어진다. 점은 조용히 맥동한다.
      · 배경·인물이 분리된 이미지라 카드 위치와 선을 좌표로 조정할 수 있다.
      · 모바일에서는 선을 접고 카드가 아래로 쌓인다. 카드를 누르면 해당 점이 빛난다.
     접두사 pfz- : 다른 위젯과 겹치지 않는다
     body·html 선택자 없음 -->
<style>
.pfz-sec{--c:#E9918E;--c-dk:#d4706d;--c-hot:#F0645F;--c-bg:#fdf3f2;--ink:#2f2523;--ink2:#5f5754;
  --mute:#918a87;--line:#f0e4e3;
  width:100%;max-width:none;margin:0 auto;padding:14px 0 34px;color:var(--ink);
  font-family:'Pretendard',-apple-system,BlinkMacSystemFont,system-ui,'Noto Sans KR',sans-serif;
  word-break:keep-all;overflow-wrap:break-word;text-align:left}
.pfz-sec *{box-sizing:border-box}

.pfz-head{max-width:1000px;margin:0 auto 24px;text-align:center;padding:0 20px}
.pfz-kw{display:block;margin:0 0 13px;font-size:13px;font-weight:700;letter-spacing:.22em;
  text-transform:uppercase;color:var(--c)}
.pfz-h2{margin:0 0 14px;font-size:clamp(30px,3.4vw,45.6px);font-weight:700;line-height:1.38;
  letter-spacing:-1.4px;text-wrap:balance}
.pfz-h2 em{font-style:normal;color:var(--c)}
.pfz-lead{margin:0;font-size:clamp(15px,1.3vw,18px);line-height:1.8;letter-spacing:-.6px;color:var(--ink2)}

/* ── 무대 ── */
.pfz-stage{position:relative;width:100%;max-width:min(1720px,calc(100% - 48px));margin:0 auto;aspect-ratio:1920/1080;
  border-radius:24px;overflow:hidden;isolation:isolate}
.pfz-bg,.pfz-person{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;
  user-select:none;-webkit-user-drag:none;
  transform:scale(var(--zoom,1));transform-origin:56% 42%;will-change:transform}
.pfz-bg{z-index:0}
.pfz-person{z-index:1;object-position:center top}

/* 연결선 */
.pfz-lines{position:absolute;inset:0;z-index:2;width:100%;height:100%;pointer-events:none;overflow:visible}
.pfz-line{fill:none;stroke-width:1.3;stroke-linecap:round;stroke-linejoin:round;
  stroke-dasharray:1 1;stroke-dashoffset:1;
  filter:drop-shadow(0 1px 1.5px rgba(120,70,68,.22));
  transition:stroke-width .3s,opacity .3s,filter .3s}
.pfz-stage.is-in .pfz-line{animation:pfz-draw 1s cubic-bezier(.2,.66,.28,1) both}
@keyframes pfz-draw{to{stroke-dashoffset:0}}
.pfz-line.is-hot{stroke:var(--c-hot)!important;stroke-width:2.1;
  filter:drop-shadow(0 0 5px rgba(240,100,95,.7)) drop-shadow(0 0 13px rgba(240,100,95,.4))}

/* 얼굴 위 점 */
.pfz-dot{position:absolute;z-index:3;width:15px;height:15px;margin:-7.5px 0 0 -7.5px;
  border-radius:50%;background:var(--c-hot);border:2.5px solid #fff;cursor:pointer;
  box-shadow:0 2px 8px rgba(150,60,58,.4);
  transition:transform .3s cubic-bezier(.34,1.56,.64,1),box-shadow .3s;
  opacity:0;animation:pfz-dot-in .5s ease-out forwards}
.pfz-stage.is-in .pfz-dot{animation:pfz-dot-in .5s ease-out forwards}
@keyframes pfz-dot-in{to{opacity:1}}
.pfz-dot::after{content:'';position:absolute;inset:-6px;border-radius:50%;
  border:2px solid var(--c-hot);opacity:0;animation:pfz-ping 2.8s ease-out infinite}
@keyframes pfz-ping{0%{opacity:.6;transform:scale(.7)}70%{opacity:0;transform:scale(1.7)}100%{opacity:0}}
.pfz-dot.is-hot,.pfz-dot:hover,.pfz-dot:focus-visible{transform:scale(1.65);outline:none;
  box-shadow:0 0 0 5px rgba(240,100,95,.24),0 4px 14px rgba(150,60,58,.5)}

/* 설명 카드 */
.pfz-card{position:absolute;z-index:4;width:clamp(215px,21.0vw,340px);
  padding:clamp(14px,1.4vw,20px) clamp(16px,1.4vw,23px);border-radius:16px;
  background:rgba(255,255,255,.9);-webkit-backdrop-filter:blur(9px);backdrop-filter:blur(9px);
  border:1px solid rgba(255,255,255,.9);box-shadow:0 10px 30px rgba(140,80,78,.14);
  cursor:default;transition:transform .32s cubic-bezier(.22,.61,.36,1),box-shadow .32s,border-color .32s}
.pfz-card:hover,.pfz-card:focus-within{transform:translateY(-4px);border-color:rgba(240,100,95,.55);
  box-shadow:0 0 0 1px rgba(240,100,95,.3),0 16px 38px rgba(240,100,95,.24)}
.pfz-ct{margin:0 0 9px;font-size:clamp(13.5px,1.1vw,16px);font-weight:800;line-height:1.4;
  letter-spacing:-.5px;color:var(--c-hot)}
.pfz-cl{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px}
.pfz-cl li{position:relative;padding-left:11px;font-size:clamp(12.5px,1.0vw,14.5px);line-height:1.6;
  letter-spacing:-.35px;color:var(--ink2)}
.pfz-cl li::before{content:'·';position:absolute;left:1px;color:var(--c);font-weight:800}

/* 자리 — 무대 비율 기준. 왼쪽 3개 · 오른쪽 2개 */
.pfz-card[data-z="mid"]{left:2.5%;top:12%}
.pfz-card[data-z="jaw"]{left:2.5%;top:50%}
.pfz-card[data-z="neck"]{left:2.5%;top:76%}
.pfz-card[data-z="up"]{left:68%;top:9%}
.pfz-card[data-z="low"]{left:68%;top:44%}

/* ── 태블릿 ── */
@media (max-width:1080px){
  .pfz-card{width:clamp(200px,26vw,300px);padding:12px 14px;border-radius:13px}
  .pfz-card[data-z="mid"],.pfz-card[data-z="jaw"],.pfz-card[data-z="neck"]{left:1.2%}
  .pfz-card[data-z="up"],.pfz-card[data-z="low"]{left:71%}
}
/* ── 모바일 : 선을 접고 카드는 아래로 ── */
@media (max-width:820px){
  .pfz-sec{padding:8px 0 26px}
  .pfz-head{margin-bottom:18px;padding:0 16px}
  .pfz-h2{font-size:23px;letter-spacing:-1.1px}
  .pfz-lead{font-size:15px;line-height:1.75}
  .pfz-stage{aspect-ratio:1/1;border-radius:16px;max-width:none;margin:0 16px}
  .pfz-person{object-fit:cover;object-position:60% top}
  .pfz-lines{display:none}
  .pfz-card{position:static;width:auto;margin:0;background:#fff;border:1px solid var(--line);
    -webkit-backdrop-filter:none;backdrop-filter:none;box-shadow:0 6px 20px rgba(80,55,52,.06)}
  .pfz-cards{display:flex;flex-direction:column;gap:10px;padding:14px 16px 0}
  .pfz-dot{width:13px;height:13px;margin:-6.5px 0 0 -6.5px}
}
@media (min-width:821px){.pfz-cards{display:contents}}
@media (prefers-reduced-motion:reduce){
  .pfz-bg,.pfz-person{transform:none!important;will-change:auto}
  .pfz-dot::after{animation:none;display:none}
  .pfz-line{stroke-dashoffset:0}
  .pfz-card,.pfz-dot,.pfz-line{transition:none}
}

/* ── 헤딩 타이핑 효과 ── 원문은 HTML 에 그대로 있어 크롤러가 읽는다.
   스크롤로 화면에 들어올 때 한 번만 친다. 반복하지 않는다. */
.pfz-h2{min-height:var(--pfz-h2h,auto)}
.pfz-cur{display:inline-block;margin-left:.06em;color:var(--c);font-weight:400;
  animation:pfz-bl .62s steps(1,end) infinite}
@keyframes pfz-bl{0%,49%{opacity:1}50%,100%{opacity:0}}
@media (prefers-reduced-motion:reduce){.pfz-cur{display:none}}
</style>

<section class="pfz-sec" aria-labelledby="pfz-title">

  <header class="pfz-head">
    <span class="pfz-kw">Facial Zones</span>
    <h2 class="pfz-h2" id="pfz-title">같은 얼굴이라도 <em>부위마다 무너지는 방식</em>이 다릅니다.</h2>
    <p class="pfz-lead">눈가는 얇아서 주름이 먼저 생기고, 턱선은 지지력이 빠지면서 윤곽이 무너집니다. 원인이 다르면 넣어야 할 에너지도 달라집니다.</p>
  </header>

  <div class="pfz-stage" id="pfz-stage">
    <img class="pfz-bg" src="https://pub-7ab1b86fbb9c4442971f0a3a7b5adf9f.r2.dev/beautyblossom/layered/treatment-area-pink-glass-bg.v1.webp" alt="" aria-hidden="true" width="1920" height="1080" loading="lazy" decoding="async">
    <img class="pfz-person" src="https://pub-7ab1b86fbb9c4442971f0a3a7b5adf9f.r2.dev/beautyblossom/layered/treatment-area-person-ponytail-nobangs.v2.webp" alt="얼굴 부위별 노화 양상을 표시한 인물 이미지" width="1920" height="1080" loading="lazy" decoding="async">

    <svg class="pfz-lines" aria-hidden="true" focusable="false" preserveAspectRatio="none">
      <defs>
        <linearGradient id="pfz-g-up" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff" stop-opacity=".92"/><stop offset=".62" stop-color="#fff" stop-opacity=".5"/><stop offset="1" stop-color="#fff" stop-opacity=".18"/></linearGradient>
        <linearGradient id="pfz-g-mid" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff" stop-opacity=".92"/><stop offset=".62" stop-color="#fff" stop-opacity=".5"/><stop offset="1" stop-color="#fff" stop-opacity=".18"/></linearGradient>
        <linearGradient id="pfz-g-low" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff" stop-opacity=".92"/><stop offset=".62" stop-color="#fff" stop-opacity=".5"/><stop offset="1" stop-color="#fff" stop-opacity=".18"/></linearGradient>
        <linearGradient id="pfz-g-jaw" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff" stop-opacity=".92"/><stop offset=".62" stop-color="#fff" stop-opacity=".5"/><stop offset="1" stop-color="#fff" stop-opacity=".18"/></linearGradient>
        <linearGradient id="pfz-g-neck" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fff" stop-opacity=".92"/><stop offset=".62" stop-color="#fff" stop-opacity=".5"/><stop offset="1" stop-color="#fff" stop-opacity=".18"/></linearGradient>
      </defs>
      <path class="pfz-line" data-z="up"   pathLength="1" stroke="url(#pfz-g-up)"></path>
      <path class="pfz-line" data-z="mid"  pathLength="1" stroke="url(#pfz-g-mid)"></path>
      <path class="pfz-line" data-z="low"  pathLength="1" stroke="url(#pfz-g-low)"></path>
      <path class="pfz-line" data-z="jaw"  pathLength="1" stroke="url(#pfz-g-jaw)"></path>
      <path class="pfz-line" data-z="neck" pathLength="1" stroke="url(#pfz-g-neck)"></path>
    </svg>

    <button class="pfz-dot" data-z="up"   style="left:56.5%;top:36.0%" type="button" aria-label="상안면 — 눈썹·눈가"></button>
    <button class="pfz-dot" data-z="mid"  style="left:41.5%;top:45.5%" type="button" aria-label="중안면 — 앞볼·광대"></button>
    <button class="pfz-dot" data-z="low"  style="left:55.5%;top:61.0%" type="button" aria-label="하안면 — 마리오넷·심부볼"></button>
    <button class="pfz-dot" data-z="jaw"  style="left:43.2%;top:65.5%" type="button" aria-label="페이스라인 — 턱선"></button>
    <button class="pfz-dot" data-z="neck" style="left:47.0%;top:76.0%" type="button" aria-label="목주름 — 목"></button>

    <div class="pfz-cards">
      <div class="pfz-card" data-z="up" tabindex="0">
        <h3 class="pfz-ct">상안면 &mdash; 이마 · 눈썹 · 눈꺼풀 · 눈가</h3>
        <ul class="pfz-cl">
          <li>피부가 얇아 미세주름이 빨리 생깁니다</li>
          <li>눈꺼풀이 처지고 눈밑이 볼록해지면서 피곤한 인상이 됩니다</li>
        </ul>
      </div>

      <div class="pfz-card" data-z="mid" tabindex="0">
        <h3 class="pfz-ct">중안면 &mdash; 눈밑 · 앞볼 · 광대 · 옆볼 · 팔자주름</h3>
        <ul class="pfz-cl">
          <li>피부 두께와 탄력이 떨어지면서 꺼짐이 생깁니다</li>
          <li>혈관이 변하면서 붉은기와 피부톤 불균일이 나타납니다</li>
        </ul>
      </div>

      <div class="pfz-card" data-z="low" tabindex="0">
        <h3 class="pfz-ct">하안면 &mdash; 마리오넷주름 · 심부볼 · 이중턱</h3>
        <ul class="pfz-cl">
          <li>지방이 아래로 처지면서 입가에 골이 생깁니다</li>
          <li>턱 아래 지방이 쌓이면서 이중턱이 만들어집니다</li>
        </ul>
      </div>

      <div class="pfz-card" data-z="jaw" tabindex="0">
        <h3 class="pfz-ct">페이스라인 &mdash; 턱선 · V라인</h3>
        <ul class="pfz-cl">
          <li>턱선 지지력이 약해지면서 윤곽이 무너집니다</li>
          <li>경계가 흐려지면 얼굴이 넓어 보입니다</li>
        </ul>
      </div>

      <div class="pfz-card" data-z="neck" tabindex="0">
        <h3 class="pfz-ct">목주름</h3>
        <ul class="pfz-cl">
          <li>피부가 얇아 탄력이 떨어지고 주름이 쉽게 생깁니다</li>
          <li>주름이 깊어지면 나이 들어 보이고 인상이 흐려집니다</li>
        </ul>
      </div>
    </div>
  </div>

</section>

<script>
(function(){
  var stage = document.getElementById('pfz-stage');
  if (!stage || stage.dataset.pfzReady) return;
  stage.dataset.pfzReady = '1';

  var svg   = stage.querySelector('.pfz-lines');
  var cards = stage.querySelectorAll('.pfz-card');
  var dots  = stage.querySelectorAll('.pfz-dot');
  var lines = stage.querySelectorAll('.pfz-line');
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  function byZ(list, z){
    for (var i = 0; i < list.length; i++) if (list[i].dataset.z === z) return list[i];
    return null;
  }

  /* 카드 모서리에서 얼굴 위 점까지 — 실제 렌더 좌표로 잇는다.
     좌표를 손으로 박으면 폭이 바뀔 때마다 어긋난다. */
  function drawLines(){
    var box = stage.getBoundingClientRect();
    if (!box.width || getComputedStyle(svg).display === 'none') return;
    svg.setAttribute('viewBox', '0 0 ' + box.width + ' ' + box.height);

    for (var i = 0; i < lines.length; i++) {
      var z = lines[i].dataset.z;
      var card = byZ(cards, z), dot = byZ(dots, z);
      if (!card || !dot) continue;

      var c = card.getBoundingClientRect();
      var d = dot.getBoundingClientRect();
      var dx = d.left - box.left + d.width / 2;
      var dy = d.top - box.top + d.height / 2;

      /* 점이 카드 오른쪽에 있으면 카드 오른쪽 모서리에서, 왼쪽이면 왼쪽 모서리에서 출발 */
      var fromRight = dx > (c.left - box.left + c.width / 2);
      var sx = (fromRight ? c.right : c.left) - box.left;
      var sy = c.top - box.top + c.height / 2;

      /* 카드에서 잠깐 수평으로 나갔다가 점으로 꺾어 들어간다 */
      var ex = sx + (dx - sx) * 0.52;
      lines[i].setAttribute('d',
        'M' + sx.toFixed(1) + ',' + sy.toFixed(1) +
        ' L' + ex.toFixed(1) + ',' + sy.toFixed(1) +
        ' L' + dx.toFixed(1) + ',' + dy.toFixed(1));

      /* 그라디언트를 선 방향에 맞춘다 — 카드 쪽은 뚜렷, 얼굴 쪽은 옅게 */
      var g = svg.querySelector('#pfz-g-' + z);
      if (g) {
        g.setAttribute('x1', sx.toFixed(1)); g.setAttribute('y1', sy.toFixed(1));
        g.setAttribute('x2', dx.toFixed(1)); g.setAttribute('y2', dy.toFixed(1));
      }
    }
  }

  function set(z, on){
    [cards, dots, lines].forEach(function(group){
      for (var i = 0; i < group.length; i++) {
        if (group[i].dataset.z === z) group[i].classList.toggle('is-hot', on);
      }
    });
  }
  function bind(el){
    var z = el.dataset.z;
    el.addEventListener('mouseenter', function(){ set(z, true); });
    el.addEventListener('mouseleave', function(){ set(z, false); });
    el.addEventListener('focus', function(){ set(z, true); });
    el.addEventListener('blur', function(){ set(z, false); });
    el.addEventListener('click', function(){ set(z, true); });
  }
  for (var i = 0; i < cards.length; i++) bind(cards[i]);
  for (var j = 0; j < dots.length; j++) bind(dots[j]);

  /* 스크롤에 따라 배경·인물이 아주 살짝 확대된다 */
  var ticking = false;
  function zoom(){
    ticking = false;
    if (reduce) return;
    var box = stage.getBoundingClientRect();
    var vh = innerHeight || document.documentElement.clientHeight;
    if (box.bottom < 0 || box.top > vh) return;
    var p = 1 - (box.top + box.height / 2) / (vh + box.height / 2);   /* 0 → 1 */
    p = p < 0 ? 0 : p > 1 ? 1 : p;
    stage.style.setProperty('--zoom', (1 + p * 0.075).toFixed(4));
  }
  function onScroll(){ if (!ticking) { ticking = true; requestAnimationFrame(zoom); } }
  addEventListener('scroll', onScroll, { passive: true });

  function onResize(){ drawLines(); zoom(); }
  addEventListener('resize', onResize);

  /* 이미지가 늦게 오면 크기가 바뀌므로 로드 뒤 다시 잰다 */
  var imgs = stage.querySelectorAll('img');
  for (var k = 0; k < imgs.length; k++) {
    if (!imgs[k].complete) imgs[k].addEventListener('load', drawLines);
  }

  if (window.IntersectionObserver) {
    var io = new IntersectionObserver(function(es){
      if (es[0].isIntersecting) { drawLines(); stage.classList.add('is-in'); io.disconnect(); }
    }, { threshold: .18 });
    io.observe(stage);
  } else {
    stage.classList.add('is-in');
  }

  for (var m = 0; m < lines.length; m++) lines[m].style.animationDelay = (m * 0.14) + 's';
  for (var n = 0; n < dots.length; n++) dots[n].style.animationDelay = (0.55 + n * 0.12) + 's';

  drawLines(); zoom();
  setTimeout(drawLines, 300);
  setTimeout(drawLines, 1200);
})();
<\/script>
<script>
/* 헤딩 타이핑 — 화면에 들어오면 친다. 내려와서 보일 때도, 올라와서 보일 때도.
   화면 밖으로 나가면 되감아 두므로 다시 보일 때 처음부터 다시 쳐진다.
   커서는 끝난 뒤에도 계속 깜박인다.
   글자는 이미 DOM 에 있고 잠시 감췄다 되돌리는 방식이라 크롤러는 완성문을 본다. */
(function(){
  var el=document.querySelector('.pfz-h2');
  if(!el||el.getAttribute('data-tt'))return;
  if(!('IntersectionObserver' in window))return;
  if(window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  el.setAttribute('data-tt','1');

  var parts=[],w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false),n;
  while(n=w.nextNode()){ if(n.nodeValue.length) parts.push({n:n,t:n.nodeValue}); }
  var total=0; for(var i=0;i<parts.length;i++) total+=parts[i].t.length;
  if(!total)return;

  el.style.setProperty('--pfz-h2h', el.getBoundingClientRect().height+'px'); /* 비어도 안 접히게 */

  var cur=document.createElement('span');
  cur.className='pfz-cur'; cur.setAttribute('aria-hidden','true'); cur.textContent='|';
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
`,f=`<!-- ═══ 뷰티블라썸의원 · 퍼스널 레이어드 리프팅 — 시술 과정 4단계 ═══
     문구는 라이브 /39 원본 그대로. 새로 지어내지 않았다.
     사진 4장은 R2 에 올라간 1200x900 원본을 그대로 쓴다. lazy 로 불러온다.
     접두사 ppc- : bb-, plh-, plc-, pld-, pdv-, pls- 와 겹치지 않는다
     body·html 선택자 없음 -->
<style>
.ppc-sec{--c:#E9918E;--c-dk:#d4706d;--c-bg:#fdf3f2;--ink:#2f2523;--ink2:#5f5754;--mute:#918a87;
  --line:#efe7e6;--paper:#faf6f5;
  width:100%;max-width:none;margin:0 auto;padding:14px 0 40px;color:var(--ink);
  font-family:'Pretendard',-apple-system,BlinkMacSystemFont,system-ui,'Noto Sans KR',sans-serif;
  word-break:keep-all;overflow-wrap:break-word;text-align:left}
.ppc-sec *{box-sizing:border-box}

.ppc-head{max-width:1000px;margin:0 auto 44px;text-align:center;padding:0 20px}
.ppc-kw{display:block;margin:0 0 13px;font-size:16.2px;font-weight:700;letter-spacing:.22em;
  text-transform:uppercase;color:var(--c)}
.ppc-h2{margin:0 0 15px;font-size:clamp(30px,3.4vw,45.6px);font-weight:700;line-height:1.38;
  letter-spacing:-1.4px;text-wrap:balance}
.ppc-h2 em{font-style:normal;color:var(--c)}
.ppc-lead{margin:0;font-size:clamp(15px,1.6vw,22.5px);line-height:1.8;letter-spacing:-.6px;color:var(--ink2)}

/* ── 4단계 ── */
.ppc-list{list-style:none;margin:0 auto;padding:0 20px;max-width:min(1720px,calc(100% - 48px));
  display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:clamp(14px,2vw,27.5px)}
.ppc-step{position:relative;display:flex;flex-direction:column;
  padding:clamp(20px,2.5vw,32.5px);border-radius:20px;background:#fff;border:1px solid var(--line);
  box-shadow:0 8px 26px rgba(80,55,52,.05);transition:transform .3s cubic-bezier(.22,.61,.36,1),box-shadow .3s}
.ppc-step:hover{transform:translateY(-5px);box-shadow:0 18px 40px rgba(233,145,142,.16)}

.ppc-no{display:flex;align-items:center;gap:9px;margin:0 0 14px;
  font-size:15px;font-weight:800;letter-spacing:.18em;color:var(--c);font-variant-numeric:tabular-nums}
.ppc-no::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,var(--c),transparent)}

/* 시술 과정 사진 4장 — R2, 1200x900 (4:3) */
.ppc-figure{margin:0 0 16px;aspect-ratio:4/3;border-radius:14px;overflow:hidden;
  display:grid;place-items:center;text-align:center;padding:14px;
  background:var(--paper);border:1px solid var(--line)}
.ppc-figure img{width:100%;height:100%;object-fit:cover;display:block}

.ppc-en{display:block;margin:0 0 5px;font-size:14.2px;font-weight:700;letter-spacing:.12em;
  text-transform:uppercase;color:var(--mute)}
.ppc-t{margin:0 0 10px;font-size:clamp(17px,1.8vw,26.2px);font-weight:700;line-height:1.3;letter-spacing:-.8px}
.ppc-d{margin:0;font-size:clamp(13.5px,1.2vw,18.8px);line-height:1.85;letter-spacing:-.4px;color:var(--ink2)}

@media (max-width:1000px){
  .ppc-list{grid-template-columns:repeat(2,minmax(0,1fr))}
}
@media (max-width:768px){
  .ppc-sec{padding:8px 0 26px}
  .ppc-head{margin-bottom:28px;padding:0 16px}
  .ppc-h2{font-size:23px;letter-spacing:-1.1px}
  .ppc-lead{font-size:15px;line-height:1.75}
  .ppc-list{grid-template-columns:1fr;gap:12px;padding:0 16px}
  .ppc-step{padding:20px;border-radius:16px}
  .ppc-step:hover{transform:none}
  .ppc-figure{aspect-ratio:16/9;margin-bottom:14px}
  .ppc-t{font-size:18px}
  .ppc-d{font-size:14px}
}
@media (prefers-reduced-motion:reduce){.ppc-step{transition:none}.ppc-step:hover{transform:none}}

/* ── 선 발광 : 마우스가 올라가면 테두리가 빛난다 ── */
.ppc-step,.ppc-figure{transition:border-color .3s ease,box-shadow .3s ease,transform .3s cubic-bezier(.22,.61,.36,1)}
.ppc-step:hover,.ppc-step:focus-within,.ppc-figure:hover,.ppc-figure:focus-within{border-color:rgba(233,145,142,.7)!important;
  box-shadow:0 0 0 1px rgba(233,145,142,.45),
             0 0 14px rgba(233,145,142,.35),
             0 0 34px rgba(233,145,142,.18),
             0 14px 34px rgba(140,80,78,.14)}
@media (prefers-reduced-motion:reduce){.ppc-step,.ppc-figure{transition:none}}

/* ── 헤딩 타이핑 효과 ── 원문은 HTML 에 그대로 있어 크롤러가 읽는다.
   스크롤로 화면에 들어올 때 한 번만 친다. 반복하지 않는다. */
.ppc-h2{min-height:var(--ppc-h2h,auto)}
.ppc-cur{display:inline-block;margin-left:.06em;color:var(--c);font-weight:400;
  animation:ppc-bl .62s steps(1,end) infinite}
@keyframes ppc-bl{0%,49%{opacity:1}50%,100%{opacity:0}}
@media (prefers-reduced-motion:reduce){.ppc-cur{display:none}}
</style>

<section class="ppc-sec" aria-labelledby="ppc-title">

  <header class="ppc-head">
    <span class="ppc-kw">Treatment Process</span>
    <h2 class="ppc-h2" id="ppc-title">진단에서 회복까지, <em>네 단계</em>로 진행합니다.</h2>
    <p class="ppc-lead">장비를 고르기 전에 피부를 먼저 읽습니다. 어느 층이 어떻게 늘어졌는지 확인한 다음, 그 층에 맞는 장비를 순서대로 올립니다.</p>
  </header>

  <ol class="ppc-list">

    <li class="ppc-step">
      <span class="ppc-no">01</span>
      <figure class="ppc-figure">
        <img src="https://pub-7ab1b86fbb9c4442971f0a3a7b5adf9f.r2.dev/beautyblossom/clinic-process/0413-selected/01-precision-diagnosis-b.v1.jpg" alt="3D 피부 분석기로 피부 상태와 노화 양상을 촬영해 확인하는 정밀 진단 장면"
             width="1200" height="900" loading="lazy" decoding="async">
      </figure>
      <span class="ppc-en">Precision Diagnosis</span>
      <h3 class="ppc-t">정밀 진단</h3>
      <p class="ppc-d">3D 피부 분석기로 전문적인 상담을 통해 피부 상태와 노화 양상을 다각도로 파악합니다. 이 단계에서 개인별 맞춤 리프팅의 설계도가 완성됩니다.</p>
    </li>

    <li class="ppc-step">
      <span class="ppc-no">02</span>
      <figure class="ppc-figure">
        <img src="https://pub-7ab1b86fbb9c4442971f0a3a7b5adf9f.r2.dev/beautyblossom/clinic-process/0413-selected/02-custom-design-b.v1.jpg" alt="의료진이 진단 결과를 바탕으로 장비 조합을 설계하고 설명하는 장면"
             width="1200" height="900" loading="lazy" decoding="async">
      </figure>
      <span class="ppc-en">Customized Design</span>
      <h3 class="ppc-t">맞춤 설계</h3>
      <p class="ppc-d">단순한 기계 선택이 아니라, 각 부위·층위별 노화 원인에 따라 최적의 장비와 에너지를 조합합니다. 환자 개개인에게 가장 적합한 레이어드 리프팅 프로그램을 설계합니다.</p>
    </li>

    <li class="ppc-step">
      <span class="ppc-no">03</span>
      <figure class="ppc-figure">
        <img src="https://pub-7ab1b86fbb9c4442971f0a3a7b5adf9f.r2.dev/beautyblossom/clinic-process/0413-selected/03-treatment-c.v1.jpg" alt="장비 핸드피스를 얼굴에 적용해 층별로 레이어드 리프팅을 진행하는 장면"
             width="1200" height="900" loading="lazy" decoding="async">
      </figure>
      <span class="ppc-en">Layered Treatment</span>
      <h3 class="ppc-t">시술 진행</h3>
      <p class="ppc-d">울쎄라, 소프웨이브, 써마지, 온다 등 검증된 오리지널 장비를 증상·깊이·부위에 맞게 레이어드합니다. 이 과정을 통해 자연스럽고 균형 잡힌 리프팅 효과를 구현합니다.</p>
    </li>

    <li class="ppc-step">
      <span class="ppc-no">04</span>
      <figure class="ppc-figure">
        <img src="https://pub-7ab1b86fbb9c4442971f0a3a7b5adf9f.r2.dev/beautyblossom/clinic-process/0413-selected/04-recovery-care-b.v1.jpg" alt="시술 후 탄력 케어와 재생 관리를 받는 회복 단계 장면"
             width="1200" height="900" loading="lazy" decoding="async">
      </figure>
      <span class="ppc-en">Continuous Care</span>
      <h3 class="ppc-t">회복 · 관리</h3>
      <p class="ppc-d">시술 이후에도 효과를 안정적으로 유지하기 위해 탄력 케어, 순환 관리, 재생 레이저를 정밀하게 진행합니다. 회복 속도를 높이고 결과의 지속성을 강화합니다.</p>
    </li>

  </ol>

</section>

<script>
/* 헤딩 타이핑 — 화면에 들어오면 친다. 내려와서 보일 때도, 올라와서 보일 때도.
   화면 밖으로 나가면 되감아 두므로 다시 보일 때 처음부터 다시 쳐진다.
   커서는 끝난 뒤에도 계속 깜박인다.
   글자는 이미 DOM 에 있고 잠시 감췄다 되돌리는 방식이라 크롤러는 완성문을 본다. */
(function(){
  var el=document.querySelector('.ppc-h2');
  if(!el||el.getAttribute('data-tt'))return;
  if(!('IntersectionObserver' in window))return;
  if(window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  el.setAttribute('data-tt','1');

  var parts=[],w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false),n;
  while(n=w.nextNode()){ if(n.nodeValue.length) parts.push({n:n,t:n.nodeValue}); }
  var total=0; for(var i=0;i<parts.length;i++) total+=parts[i].t.length;
  if(!total)return;

  el.style.setProperty('--ppc-h2h', el.getBoundingClientRect().height+'px'); /* 비어도 안 접히게 */

  var cur=document.createElement('span');
  cur.className='ppc-cur'; cur.setAttribute('aria-hidden','true'); cur.textContent='|';
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
`,g=`<!-- ═══ 뷰티블라썸의원 · 퍼스널 레이어드 리프팅 — 오시는 길 · 진료시간 ═══
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
`,v=[{id:"01-hero",file:"01-hero.html",name:"히어로",prefix:"plh",desc:"제목 · 배경 영상 · 특징 패널",src:p},{id:"02-intro",file:"02-intro.html",name:"9 Original Devices",prefix:"plc",desc:"헤딩 · 특징 3가지 · 장비 슬라이더",src:o},{id:"05-depth-intro",file:"05-depth-intro.html",name:"부위별 노화 도입",prefix:"pld",desc:"워드마크 3D 압출 + 도입 카피",src:l},{id:"06-devices",file:"06-devices.html",name:"장비 9종 상세",prefix:"pdv",desc:"장비마다 큰 블록 + 깊이 막대",src:d},{id:"11-face-zones",file:"11-face-zones.html",name:"부위별 노화 지도",prefix:"pfz",desc:"얼굴 위 4구역 · 연결선 · 마우스 연동 · 스크롤 줌",src:c},{id:"07-process",file:"07-process.html",name:"시술 과정 4단계",prefix:"ppc",desc:"정밀 진단 → 맞춤 설계 → 시술 진행 → 회복 관리",src:f},{id:"08-info",file:"08-info.html",name:"이런 분께 · 시술 정보",prefix:"pin",desc:"추천 대상 3가지 + 소요 시간·구성 표",src:h},{id:"09-faq",file:"09-faq.html",name:"자주 묻는 질문",prefix:"pfq",desc:"문답 5개 + FAQPage 구조화 데이터",src:m},{id:"10-visit",file:"10-visit.html",name:"오시는 길 · 진료시간",prefix:"pvs",desc:"주소 · 도보 안내 · 진료시간",src:g}];function u(r,a){r.innerHTML=a,r.querySelectorAll("script").forEach(i=>{const t=document.createElement("script");for(const n of i.attributes)t.setAttribute(n.name,n.value);t.textContent=i.textContent,i.replaceWith(t)})}export{v as W,u as m};
