(() => {
  'use strict';
  const root = document.getElementById('xm');
  if (!root || root.dataset.motionReady) return;
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  const connection = navigator.connection;
  const reduced = () => media.matches || !!connection?.saveData;
  const hasAnimation = typeof Element.prototype.animate === 'function';
  const states = new Map();
  let suspended = false;
  const active = state => state.visible && !document.hidden && !suspended && !reduced();
  function stop(state) { state.animations.forEach(a => a.cancel()); state.animations = []; }
  function run(state, el, frames, options = {}) {
    if (!hasAnimation || reduced()) return;
    const animation = el.animate(frames, {duration: 900, easing: 'cubic-bezier(.2,.65,.2,1)', fill: 'none', ...options});
    state.animations.push(animation);
    if (!active(state)) animation.pause();
  }
  function title(state) {
    state.element.querySelectorAll('.title-ink').forEach((line, i) => run(state, line, [
      {opacity: 0, transform: 'translateY(24px)', clipPath: 'inset(0 0 100% 0)'},
      {opacity: 1, transform: 'translateY(0)', clipPath: 'inset(0 0 0 0)'}
    ], {delay: i * 120, duration: 950}));
    const rule = state.element.querySelector('.title-rule');
    if (rule) run(state, rule, [{transform: 'scaleX(0)'}, {transform: 'scaleX(1)'}], {delay: 230, duration: 1100});
  }
  function diagram(state) {
    const el = state.element;
    if (el.closest('[hidden]')) return;
    el.querySelectorAll('.diagram-device').forEach(e => run(state, e, [{opacity: .2, transform: 'translateY(-12px)'}, {opacity: 1, transform: 'translateY(0)'}], {duration: 1000}));
    el.querySelectorAll('.energy-heat').forEach(e => run(state, e, [{opacity: .12}, {opacity: 1, offset: .5}, {opacity: .65, offset: .7}, {opacity: 1}], {duration: 3600}));
    el.querySelectorAll('.energy-ray').forEach(e => run(state, e, [{strokeDasharray: '1', strokeDashoffset: '1', opacity: .1}, {strokeDasharray: '1', strokeDashoffset: '0', opacity: .7}], {duration: 1600, delay: 250 + Number(e.dataset.delay || 0)}));
    el.querySelectorAll('.energy-focus').forEach(e => run(state, e, [{opacity: .1}, {opacity: 1, offset: .35}, {opacity: .25, offset: .55}, {opacity: 1}], {duration: 2100, delay: 900 + Number(e.dataset.delay || 0)}));
    el.querySelectorAll('.energy-halo').forEach(e => run(state, e, [{opacity: 0}, {opacity: .8, offset: .5}, {opacity: .7}], {duration: 2000, delay: 1000 + Number(e.dataset.delay || 0)}));
  }
  function sync() {
    states.forEach(state => {
      if (reduced()) { stop(state); state.started = true; return; }
      if (active(state) && !state.started) { state.started = true; state.start(state); }
      state.animations.forEach(a => { if (a.playState === 'finished' || a.playState === 'idle') return; if (active(state)) a.play(); else a.pause(); });
    });
  }
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => { const state = states.get(entry.target); if (state) state.visible = entry.isIntersecting; }); sync();
  }, {threshold: 0, rootMargin: '0px 0px -40px 0px'}) : null;
  function watch(element, start) {
    const state = {element, start, started: false, visible: !observer, animations: []}; states.set(element, state); observer?.observe(element); return state;
  }
  root.querySelectorAll('h2').forEach(h => {
    const rule = document.createElement('span'); rule.className = 'title-rule'; rule.setAttribute('aria-hidden', 'true'); h.append(rule); watch(h, title);
  });
  root.querySelectorAll('.energy-scene').forEach(el => watch(el, diagram));
  root.querySelectorAll('.evolution-flow').forEach(el => watch(el, state => {
    el.querySelectorAll('.flow-arrow, .flow-after, .flow-modes b').forEach((item, i) => run(state, item,
      [{opacity: .1, transform: 'translateY(9px)'}, {opacity: 1, transform: 'translateY(0)'}],
      {duration: 750, delay: i * 160}));
  }));
  const options = root.querySelector('.energy-options');
  const variants = [...root.querySelectorAll('[data-energy-variant]')];
  const buttons = [...root.querySelectorAll('[data-energy-button]')];
  function select(kind) {
    if (!variants.some(v => v.dataset.energyVariant === kind)) return;
    buttons.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.energyButton === kind)));
    variants.forEach(v => {
      const selected = v.dataset.energyVariant === kind;
      v.hidden = !selected;
      const state = states.get(v.querySelector('.energy-scene'));
      stop(state); state.started = false;
      if (selected) { const rect = state.element.getBoundingClientRect(); state.visible = rect.bottom > 0 && rect.top < innerHeight - 40; }
      else state.visible = false;
    }); sync();
  }
  buttons.forEach(b => b.addEventListener('click', () => select(b.dataset.energyButton)));
  if (options && variants.length === 3 && buttons.length === 3) { options.hidden = false; select('h45'); }
  root.dataset.motionReady = 'true';
  document.addEventListener('visibilitychange', sync);
  window.addEventListener('pagehide', () => { suspended = true; sync(); });
  window.addEventListener('pageshow', () => { suspended = false; sync(); });
  media.addEventListener('change', sync);
  connection?.addEventListener?.('change', sync);
  sync();
})();
