/* Illustrative HIFU motion, with photographic anatomy and image-space face anchors. */
(() => {
  'use strict';
  const root = document.getElementById('bb-shurink');
  if (!root || root.dataset.motionRevision) return;
  root.dataset.motionRevision = 'r07';
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
  // CLASSYS ULTRA F comparison: separated Dot TCPs versus closely connected MP TCPs.
  // Shared illustration timing makes the spatial pattern, not scan speed, the comparison.
  for (const row of root.querySelectorAll('.su-dot-row,.su-mp-row')) {
    const mp = row.classList.contains('su-mp-row'), prefix = 'su-mode-' + (mp ? 'mp' : 'dot');
    const figure = document.createElement('figure');
    figure.className = 'su-mode-visual'; figure.dataset.energyMode = mp ? 'mp' : 'dot';
    figure.setAttribute('aria-label', mp ? 'MP 모드: 미세한 초점이 촘촘히 이어지는 열 응고 영역 모식도' : '일반 Dot 모드: 간격을 두고 형성되는 점형 열 응고 영역 모식도');
    const svg = svgElement('svg', {viewBox: '0 0 1536 1024', 'aria-hidden': 'true'});
    const start = 247, end = 1289, count = mp ? 81 : 7, spacing = (end - start) / (count - 1);
    svg.innerHTML = `<defs>
      <linearGradient id="${prefix}-cone" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#fff8e9" stop-opacity=".1"/><stop offset=".75" stop-color="#ffe8a6" stop-opacity=".45"/><stop offset="1" stop-color="#fffde8" stop-opacity=".95"/></linearGradient>
      <radialGradient id="${prefix}-halo"><stop stop-color="#fffde0" stop-opacity=".95"/><stop offset=".3" stop-color="#ffe5a7" stop-opacity=".8"/><stop offset=".65" stop-color="#f8b499" stop-opacity=".4"/><stop offset="1" stop-color="#ed9b92" stop-opacity="0"/></radialGradient>
      <filter id="${prefix}-soft" x="-10%" y="-100%" width="120%" height="300%"><feGaussianBlur stdDeviation="12"/></filter>
    </defs>
    <image href="assets/skin-tissue.webp" width="1536" height="1024"/>
    <g class="su-tcp-pattern">
      ${mp ? `<g class="su-mp-band"><rect class="su-band-glow" x="${start}" y="622" width="0" height="38" rx="19" fill="#ffd08c" filter="url(#${prefix}-soft)"/><rect class="su-band-core" x="${start}" y="636" width="0" height="10" rx="5" fill="#ffe1a1" opacity=".8"/></g>` : ''}
      <g class="su-focus-trail"></g>
    </g>
    <g class="su-scan-head">
      <path fill="url(#${prefix}-cone)" d="M-94 403 Q0 384 94 403 L0 641 Z"/>
      <g class="su-scan-waves" fill="none" stroke="#fff9e7" stroke-width="3"></g>
      <ellipse cy="641" rx="45" ry="57" fill="url(#${prefix}-halo)"/>
      <ellipse cy="641" rx="${mp ? 6 : 12}" ry="${mp ? 10 : 21}" fill="#fff8dd"/>
      <ellipse cy="397" rx="90" ry="6" fill="#fff6df" opacity=".7"/>
    </g>`;
    const trail = svg.querySelector('.su-focus-trail'), points = [];
    for (let i = 0; i < count; i++) {
      const x = start + spacing * i;
      const g = svgElement('g', {transform: `translate(${x} 641)`, 'data-tcp': mp ? 'micro' : 'dot'});
      g.append(svgElement('ellipse', {rx: mp ? 17 : 45, ry: mp ? 34 : 61, fill: `url(#${prefix}-halo)`}), svgElement('ellipse', {rx: mp ? 7.5 : 15, ry: mp ? 12 : 24, fill: '#fff0c2'}));
      trail.append(g); points.push({g, x});
    }
    const head = svg.querySelector('.su-scan-head'), waves = svg.querySelector('.su-scan-waves'), paths = [];
    for (let i = 0; i < 3; i++) {const p = svgElement('path', {}); waves.append(p); paths.push(p);}
    figure.append(svg);
    const label = document.createElement('span'); label.className = 'su-mode-visual-label';
    label.textContent = mp ? '촘촘히 이어지는 열 응고 영역' : '간격을 둔 점형 초점'; figure.append(label);
    row.replaceWith(figure);
    const pattern = svg.querySelector('.su-tcp-pattern'), bands = [...svg.querySelectorAll('.su-mp-band rect')];
    register(figure, t => {
      // 6.4-second display cycle, equal for both modes; not a device timing or TCP count.
      const clock = t % 6.4, progress = clamp((clock - .4) / 3.6);
      const x = start + (end - start) * progress;
      const fade = clock > 5.7 ? 1 - ease((clock - 5.7) / .7) : 1;
      const scanning = clock >= .4 && clock < 4;
      const nearest = Math.round(progress * (count - 1));
      const distance = Math.abs(x - points[nearest].x);
      const emission = scanning ? (mp ? .9 : clamp(1 - distance / 38)) : 0;
      head.setAttribute('transform', `translate(${x.toFixed(2)} 0)`);
      head.setAttribute('opacity', String(emission));
      pattern.setAttribute('opacity', String(fade));
      bands.forEach(e => e.setAttribute('width', String(Math.max(0, x - start))));
      points.forEach(p => {
        const revealed = progress > 0 && p.x <= x + (mp ? spacing / 2 : 0);
        p.g.setAttribute('opacity', revealed ? '.92' : '0');
      });
      for (const [i, p] of paths.entries()) {
        const q = (t / 1.2 + i / 3) % 1, half = 94 * (1 - q), y = 402 + 239 * q;
        p.setAttribute('d', `M${-half} ${y} Q0 ${y + 16 * (1 - q)} ${half} ${y}`);
        p.setAttribute('opacity', String(Math.sin(q * Math.PI) * .8));
      }
      figure.dataset.scanX = x.toFixed(2); figure.dataset.cycleTime = clock.toFixed(3);
      figure.dataset.phase = scanning ? 'forming' : clock >= 4 ? 'hold' : 'ready';
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
