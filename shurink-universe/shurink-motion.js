/* Illustrative HIFU motion, with photographic anatomy and image-space face anchors. */
(() => {
  'use strict';
  const root = document.getElementById('bb-shurink');
  if (!root || root.dataset.motionRevision) return;
  root.dataset.motionRevision = 'r03';
  const reduce = matchMedia('(prefers-reduced-motion:reduce)');
  const connection = navigator.connection;
  const scenes = [];
  let raf = 0, last = 0, away = false;
  const ease = x => x * x * (3 - 2 * x);
  const clamp = x => Math.max(0, Math.min(1, x));
  const ns = 'http://www.w3.org/2000/svg';
  const svgElement = (tag, attrs) => {
    const e = document.createElementNS(ns, tag);
    for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, String(v));
    return e;
  };
  function control(label) {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'su-motion-toggle';
    b.textContent = '모션 멈춤'; b.setAttribute('aria-label', label + ' 모션 멈춤');
    b.setAttribute('aria-pressed', 'false');
    return b;
  }
  function register(el, draw, button, label) {
    const s = {el, draw, button, label, visible: false, paused: false, time: 2.8};
    scenes.push(s); draw(s.time);
    button.addEventListener('click', () => {s.paused = !s.paused; sync();});
    return s;
  }
  for (const [index, row] of [...root.querySelectorAll('.su-dot-row,.su-mp-row')].entries()) {
    const mp = row.classList.contains('su-mp-row'), prefix = 'su-mode-' + (mp ? 'mp' : 'dot');
    const figure = document.createElement('figure');
    figure.className = 'su-mode-visual'; figure.dataset.energyMode = mp ? 'mp' : 'dot';
    figure.setAttribute('aria-label', mp ? 'MP 모드: 피부 단면 안에서 촘촘한 초점으로 이동하는 초음파 펄스 모식도' : '일반 Dot 모드: 피부 단면 안에서 순서대로 형성되는 점 형태 초점 모식도');
    const svg = svgElement('svg', {viewBox: '0 0 1536 1024', 'aria-hidden': 'true'});
    svg.innerHTML = `<defs>
      <linearGradient id="${prefix}-cone" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#fff8e9" stop-opacity=".08"/><stop offset=".75" stop-color="#ffe8a6" stop-opacity=".5"/><stop offset="1" stop-color="#fffde8" stop-opacity=".95"/></linearGradient>
      <radialGradient id="${prefix}-halo"><stop stop-color="#fffde0" stop-opacity=".95"/><stop offset=".25" stop-color="#ffe5a7" stop-opacity=".85"/><stop offset=".62" stop-color="#f8b499" stop-opacity=".4"/><stop offset="1" stop-color="#ed9b92" stop-opacity="0"/></radialGradient>
      <filter id="${prefix}-soft"><feGaussianBlur stdDeviation="4"/></filter>
    </defs>
    <image href="assets/skin-tissue.webp" width="1536" height="1024"/>
    <g class="su-focus-trail"></g>
    <g class="su-scan-head"><path class="su-scan-cone" fill="url(#${prefix}-cone)" d="M-112 403 Q0 382 112 403 L0 641 Z"/>
      <path d="M-112 403 L0 641 112 403" fill="none" stroke="#ffe8bd" stroke-opacity=".62" stroke-width="3"/>
      <g class="su-scan-waves" fill="none" stroke="#fff9e7" stroke-width="4"></g>
      <ellipse cy="641" rx="72" ry="81" fill="url(#${prefix}-halo)"/>
      <ellipse class="su-energy-core" cy="641" rx="11" ry="19" fill="#fff7d8"/>
      <ellipse cy="397" rx="107" ry="8" fill="#fff6df" opacity=".85"/>
    </g>`;
    const trail = svg.querySelector('.su-focus-trail'), points = [];
    const count = mp ? 18 : 7, start = 247, end = 1289;
    for (let i = 0; i < count; i++) {
      const x = start + (end - start) * i / (count - 1);
      const g = svgElement('g', {transform: `translate(${x} 641)`});
      g.append(svgElement('ellipse', {rx: mp ? 30 : 47, ry: 53, fill: `url(#${prefix}-halo)`}), svgElement('ellipse', {rx: mp ? 10 : 13, ry: 20, fill: '#ffe9bb'}));
      trail.append(g); points.push({g, x});
    }
    const head = svg.querySelector('.su-scan-head'), waves = svg.querySelector('.su-scan-waves'), paths = [];
    for (let i = 0; i < 3; i++) {const p = svgElement('path', {}); waves.append(p); paths.push(p);}
    figure.append(svg);
    const label = document.createElement('span'); label.className = 'su-mode-visual-label'; label.textContent = '집속 초음파 · 에너지 전달'; figure.append(label);
    const button = control(mp ? 'MP 모드' : '일반 Dot 모드'); figure.append(button);
    row.replaceWith(figure);
    register(figure, t => {
      // Eight-second illustration; timings and spacing are not device specifications.
      const phase = (t % 8) / 8, progress = clamp((phase - .07) / .79);
      const travel = progress * (count - 1), step = Math.floor(travel), fraction = travel - step;
      const scan = mp ? travel : step + ease(clamp((fraction - .7) / .3));
      const x = start + (end - start) * scan / (count - 1);
      head.setAttribute('transform', `translate(${x.toFixed(2)} 0)`);
      const envelope = phase > .9 ? 1 - ease((phase - .9) / .1) : phase < .05 ? ease(phase / .05) : 1;
      head.setAttribute('opacity', String(.2 + .8 * envelope));
      svg.querySelector('.su-energy-core').setAttribute('opacity', String(.65 + .35 * Math.sin(t * Math.PI) ** 2));
      for (const [i, p] of paths.entries()) {
        const q = ((t / 1.2 + i / 3) % 1), half = 112 * (1 - q), y = 402 + 239 * q;
        p.setAttribute('d', `M${-half} ${y} Q0 ${y + 16 * (1 - q)} ${half} ${y}`);
        p.setAttribute('opacity', String(Math.sin(q * Math.PI) * .85));
      }
      points.forEach((p, i) => p.g.setAttribute('opacity', String((i <= scan ? .66 : .1) * (phase > .9 ? 1 - ease((phase - .9) / .1) : 1) + .08)));
      figure.dataset.scanX = x.toFixed(2);
    }, button, mp ? 'MP 모드' : '일반 Dot 모드');
  }
  const modeCards = root.querySelector('.su-mode-cards');
  if (modeCards) {
    const note = document.createElement('p'); note.className = 'su-mode-disclaimer';
    note.textContent = '초음파 전달을 설명하기 위한 모식도입니다. 실제 조사 간격·속도·깊이를 나타내지 않습니다.';
    modeCards.after(note);
  }
  const portrait = root.querySelector('.su-portrait'), photo = portrait?.querySelector(':scope > img');
  if (portrait && photo) {
    const overlay = svgElement('svg', {viewBox: '0 0 1086 1448', 'aria-hidden': 'true', class: 'su-face-energy'});
    overlay.innerHTML = `<defs>
      <radialGradient id="su-face-light"><stop stop-color="#fff9da" stop-opacity=".58"/><stop offset=".45" stop-color="#ffd5b0" stop-opacity=".3"/><stop offset="1" stop-color="#f1b9ba" stop-opacity="0"/></radialGradient>
      <radialGradient id="su-face-pin"><stop stop-color="#fffde9"/><stop offset=".23" stop-color="#fff3ce" stop-opacity=".9"/><stop offset="1" stop-color="#ffe9d1" stop-opacity="0"/></radialGradient>
    </defs>
    <g data-face-region="firm"><ellipse cx="459" cy="522" rx="94" ry="86" fill="url(#su-face-light)"/><ellipse cx="670" cy="498" rx="49" ry="66" fill="url(#su-face-light)"/></g>
    <g data-face-region="line" hidden><ellipse cx="445" cy="610" rx="39" ry="57" fill="url(#su-face-light)" transform="rotate(-26 445 610)"/><ellipse cx="515" cy="672" rx="58" ry="34" fill="url(#su-face-light)"/><ellipse cx="587" cy="685" rx="54" ry="33" fill="url(#su-face-light)"/><ellipse cx="657" cy="637" rx="32" ry="46" fill="url(#su-face-light)" transform="rotate(24 657 637)"/></g>
    <g data-face-region="balance" hidden><ellipse cx="459" cy="522" rx="88" ry="82" fill="url(#su-face-light)"/><ellipse cx="670" cy="498" rx="45" ry="65" fill="url(#su-face-light)"/><ellipse cx="551" cy="679" rx="75" ry="32" fill="url(#su-face-light)"/></g>
    <g class="su-face-sparkles"></g>`;
    photo.after(overlay);
    const badge = document.createElement('span'); badge.className = 'su-face-region-label'; badge.textContent = '선택 부위 · 볼'; portrait.append(badge);
    const button = control('선택 부위 빛 효과'); button.classList.add('su-face-toggle'); portrait.append(button);
    const groups = [...overlay.querySelectorAll('[data-face-region]')], sparkleLayer = overlay.querySelector('.su-face-sparkles');
    const anchors = {firm: [[440, 504], [496, 553], [669, 486]], line: [[444, 611], [527, 677], [606, 681], [663, 630]], balance: [[445, 514], [669, 490], [556, 677]]};
    const labels = {firm: '선택 부위 · 볼', line: '선택 부위 · 턱선 주변', balance: '확인 부위 · 볼·턱선 피부 상태'};
    let selected = 'firm', sparks = [];
    function select(key) {
      if (!Object.hasOwn(anchors, key)) return;
      selected = key; portrait.dataset.selectedRegion = key;
      groups.forEach(g => g.toggleAttribute('hidden', g.dataset.faceRegion !== key));
      badge.textContent = labels[key]; sparkleLayer.replaceChildren();
      sparks = anchors[key].map(([x, y]) => {
        const g = svgElement('g', {transform: `translate(${x} ${y})`});
        g.append(svgElement('circle', {r: 25, fill: 'url(#su-face-pin)'}), svgElement('path', {d: 'M-9 0Q0-2 0-11Q2 0 9 0Q0 2 0 11Q-2 0-9 0', fill: '#fffced'}));
        sparkleLayer.append(g); return g;
      });
    }
    const scene = register(portrait, t => {
      const active = groups.find(g => g.dataset.faceRegion === selected);
      active.setAttribute('opacity', String(.68 + .25 * Math.sin(t * .9) ** 2));
      sparks.forEach((g, i) => g.setAttribute('opacity', String(.35 + .65 * Math.sin(t * .95 + i * .8) ** 2)));
      portrait.dataset.lightTime = t.toFixed(3);
    }, button, '선택 부위 빛 효과');
    select(root.querySelector('[data-plan][aria-pressed=true]')?.dataset.plan || 'firm'); scene.draw(scene.time);
    root.querySelectorAll('[data-plan]').forEach(b => b.addEventListener('click', () => {select(b.dataset.plan); scene.time = 2.8; scene.draw(scene.time);}));
    function align() {
      const w = portrait.clientWidth, h = portrait.clientHeight;
      const sourceW = 1086, sourceH = 1448, scale = Math.max(w / sourceW, h / sourceH);
      const pos = getComputedStyle(photo).objectPosition.split(' ').map(parseFloat);
      overlay.style.width = sourceW * scale + 'px'; overlay.style.height = sourceH * scale + 'px';
      overlay.style.left = (w - sourceW * scale) * (Number.isFinite(pos[0]) ? pos[0] / 100 : .5) + 'px';
      overlay.style.top = (h - sourceH * scale) * (Number.isFinite(pos[1]) ? pos[1] / 100 : .3) + 'px';
    }
    align(); photo.addEventListener('load', align); window.addEventListener('resize', align, {passive: true});
    if ('ResizeObserver' in window) new ResizeObserver(align).observe(portrait);
    const status = portrait.querySelector('.su-portrait-caption'); status?.setAttribute('aria-live', 'polite'); status?.setAttribute('aria-atomic', 'true');
    // A blocked photograph must never leave unattached anatomical markers.
    photo.addEventListener('error', () => {overlay.setAttribute('hidden', ''); badge.hidden = true;});
    if (photo.complete && !photo.naturalWidth) {overlay.setAttribute('hidden', ''); badge.hidden = true;}
  }
  const allowed = () => !away && !document.hidden && !reduce.matches && !connection?.saveData;
  const runs = s => allowed() && s.visible && !s.paused && s.el.isConnected;
  function tick(now) {
    raf = 0;
    if (!last) last = now;
    const delta = now - last;
    if (delta >= 32) {last = now; for (const s of scenes) if (runs(s)) {s.time += Math.min(delta, 100) / 1000; s.draw(s.time);}}
    if (scenes.some(runs)) raf = requestAnimationFrame(tick);
  }
  function sync() {
    for (const s of scenes) {
      s.el.dataset.sceneMotion = runs(s) ? 'playing' : 'paused';
      const stopped = s.paused || reduce.matches || !!connection?.saveData;
      s.button.textContent = stopped ? '모션 재생' : '모션 멈춤';
      s.button.setAttribute('aria-label', s.label + (stopped ? ' 모션 재생' : ' 모션 멈춤'));
      s.button.setAttribute('aria-pressed', String(stopped));
      s.button.disabled = reduce.matches || !!connection?.saveData;
      if (reduce.matches || connection?.saveData) {s.draw(2.8); s.button.textContent = '정지 화면';}
    }
    if (!scenes.some(runs)) {cancelAnimationFrame(raf); raf = 0; last = 0;}
    else if (!raf) {last = 0; raf = requestAnimationFrame(tick);}
  }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {for (const e of entries) {const s = scenes.find(s => s.el === e.target); if (s) s.visible = e.isIntersecting;} sync();}, {threshold: .08});
    scenes.forEach(s => observer.observe(s.el));
  } else scenes.forEach(s => s.visible = true);
  reduce.addEventListener('change', sync); connection?.addEventListener?.('change', sync);
  document.addEventListener('visibilitychange', sync);
  window.addEventListener('pagehide', () => {away = true; sync();});
  window.addEventListener('pageshow', () => {away = false; sync();});
  sync();
})();
