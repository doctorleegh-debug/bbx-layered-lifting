/* Illustrative HIFU motion, with photographic anatomy and image-space face anchors. */
(() => {
  'use strict';
  const root = document.getElementById('bb-shurink');
  if (!root || root.dataset.motionRevision) return;
  root.dataset.motionRevision = 'r06';
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
  function register(el, draw) {
    const s = {el, draw, visible: false, time: 2.8};
    scenes.push(s); draw(s.time); return s;
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
    });
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
    // Curved interior grids are anchored in original photograph pixels.
    // No perimeter outline and no clinical treatment-boundary claim.
    overlay.innerHTML = `<defs>
      <radialGradient id="su-face-pin"><stop stop-color="#fffef4"/><stop offset=".25" stop-color="#fff3cc" stop-opacity=".75"/><stop offset="1" stop-color="#ffe9c5" stop-opacity="0"/></radialGradient>
      <linearGradient id="su-mesh-sweep" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="170" y2="0"><stop stop-color="#fff5d1" stop-opacity="0"/><stop offset=".48" stop-color="#fffef6"/><stop offset=".6" stop-color="#fff4cd" stop-opacity=".95"/><stop offset="1" stop-color="#fff3c8" stop-opacity="0"/></linearGradient>
    </defs>`;
    const patches = {
      cheekL: {corners:[[376,467],[502,455],[524,567],[417,589]],bow:[-8,-10]},
      cheekR: {corners:[[656,432],[691,443],[709,523],[666,533]],bow:[5,-6],columns:3},
      jaw: {rails:[[[402,553],[424,600],[463,642],[508,668],[552,684],[590,684],[630,671],[661,642],[685,602],[710,555]],[[388,568],[410,625],[452,674],[504,704],[553,715],[601,710],[646,688],[680,653],[704,610],[724,562]]],columns:21,rows:3},
      chin: {corners:[[490,671],[609,677],[612,697],[512,706]],bow:[0,4],rows:3}
    };
    const regions={firm:['cheekL','cheekR'],line:['jaw'],balance:['cheekL','cheekR','chin']};
    const railPoint=(points,u)=>{
      const q=u*(points.length-1),i=Math.min(points.length-2,Math.floor(q)),t=q-i;
      const a=points[Math.max(0,i-1)],b=points[i],c=points[i+1],d=points[Math.min(points.length-1,i+2)];
      return [0,1].map(k=>.5*((2*b[k])+(-a[k]+c[k])*t+(2*a[k]-5*b[k]+4*c[k]-d[k])*t*t+(-a[k]+3*b[k]-3*c[k]+d[k])*t*t*t));
    };
    const meshPoint=(spec,u,v)=>{
      if(spec.rails){const a=railPoint(spec.rails[0],u),b=railPoint(spec.rails[1],u);return [0,1].map(k=>a[k]*(1-v)+b[k]*v)}
      if(spec.curves){const points=spec.curves.map(([a,b,c])=>[0,1].map(i=>(1-u)**2*a[i]+2*(1-u)*u*b[i]+u*u*c[i]));return [0,1].map(i=>points[0][i]*(1-v)+points[1][i]*v)}
      const [a,b,c,d]=spec.corners,w=Math.sin(Math.PI*u)*Math.sin(Math.PI*v);
      return [0,1].map(i=>(1-v)*((1-u)*a[i]+u*b[i])+v*((1-u)*d[i]+u*c[i])+spec.bow[i]*w);
    };
    const meshSparks={};
    for(const [key,names] of Object.entries(regions)){
      const group=svgElement('g',{'data-face-region':key});meshSparks[key]=[];
      for(const name of names){
        const spec=patches[name];let d='';
        for(const direction of [0,1])for(let line=1;line<=(direction?(spec.rows||6):(spec.columns||6));line++){
          for(let step=0;step<=16;step++){
            const q=step/16,k=line/((direction?(spec.rows||6):(spec.columns||6))+1),[x,y]=meshPoint(spec,direction?q:k,direction?k:q);
            d+=(step?'L':'M')+x.toFixed(2)+' '+y.toFixed(2)+' ';
          }
        }
        group.append(svgElement('path',{d,'data-face-patch':name,fill:'none',stroke:'#fff0bb','stroke-width':5,opacity:.10}),svgElement('path',{d,'data-face-patch':name,fill:'none',stroke:'#fff5d2','stroke-width':1.8,opacity:.44}),svgElement('path',{d,'data-face-patch':name,fill:'none',stroke:'url(#su-mesh-sweep)','stroke-width':2.5,opacity:.8}));
        for(const [u,v] of [[2/7,2/7],[4/7,5/7],[6/7,3/7]]){
          const [x,y]=meshPoint(spec,u,v),spark=svgElement('g',{transform:`translate(${x} ${y})`});
          spark.append(svgElement('circle',{r:16,fill:'url(#su-face-pin)'}),svgElement('path',{d:'M-7 0Q0-1 0-8Q1 0 7 0Q0 1 0 8Q-1 0-7 0',fill:'#fffef4'}));
          group.append(spark);meshSparks[key].push(spark);
        }
      }
      overlay.append(group);
    }
    photo.after(overlay);
    const badge=document.createElement('span');badge.className='su-face-region-label';portrait.append(badge);
    const groups=[...overlay.querySelectorAll('[data-face-region]')],sweep=overlay.querySelector('#su-mesh-sweep');
    const labels={firm:'선택 부위 · 볼',line:'선택 부위 · 턱선 주변',balance:'확인 부위 · 볼·턱선 피부 상태'};
    let selected='firm';
    function select(key){
      if(!Object.hasOwn(regions,key))return;
      selected=key;portrait.dataset.selectedRegion=key;
      groups.forEach(g=>g.toggleAttribute('hidden',g.dataset.faceRegion!==key));
      badge.textContent=labels[key];
    }
    const scene=register(portrait,t=>{
      sweep.setAttribute('gradientTransform',`translate(${250+(t%5)/5*530} 0)`);
      meshSparks[selected].forEach((g,i)=>g.setAttribute('opacity',String(.25+.7*Math.sin(t*.85+i*.85)**4)));
      portrait.dataset.lightTime=t.toFixed(3);
    });
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
  const runs = s => allowed() && s.visible && s.el.isConnected;
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
      if (reduce.matches || connection?.saveData) s.draw(2.8);
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
