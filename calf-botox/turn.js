(() => {
  'use strict';
  const figure = document.querySelector('#bb-calf-botox [data-turn-model]');
  if (!figure || figure.dataset.turnBound) return;
  figure.dataset.turnBound = 'true';
  const front = figure.querySelector('.cb-turn-front');
  const angle = figure.querySelector('.cb-turn-angle');
  if (!front || !angle || !angle.dataset.turnSrc) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let near = false, loaded = false, loading = false, failed = false;
  let inactive = false, raf = 0, timer = 0;
  const allowed = () => !reduced.matches && !navigator.connection?.saveData;
  const draw = progress => {
    front.style.opacity = String(1 - progress);
    angle.style.opacity = String(progress);
  };
  const render = () => {
    raf = 0;
    if (!allowed()) { draw(0); return; }
    if (!loaded || !near || document.hidden || inactive) return;
    const rect = figure.getBoundingClientRect();
    // Front at entry, three-quarter while crossing the viewport. Reversible.
    const visibleProgress = (innerHeight - rect.top) / (innerHeight + rect.height);
    const t = Math.max(0, Math.min(1, (visibleProgress - .28) / .38));
    draw(t * t * (3 - 2 * t));
  };
  const schedule = () => {
    if (!raf && near && loaded && allowed() && !document.hidden && !inactive)
      raf = requestAnimationFrame(render);
  };
  const loadAngle = () => {
    if (loaded || loading || failed || !near || !allowed() || inactive || document.hidden) return;
    loading = true;
    const fail = () => {
      if (failed || loaded) return;
      clearTimeout(timer); failed = true; loading = false;
      angle.removeAttribute('src'); draw(0);
      figure.dataset.turnState = 'fallback';
    };
    const ready = async () => {
      try {
        await angle.decode();
        if (failed || !angle.naturalWidth) return;
        clearTimeout(timer); loaded = true; loading = false;
        figure.dataset.turnState = 'ready';
        // First loaded frame starts from the current scroll position.
        schedule();
      } catch { fail(); }
    };
    angle.addEventListener('load', ready, {once:true});
    angle.addEventListener('error', fail, {once:true});
    timer = setTimeout(fail, 20000);
    angle.src = angle.dataset.turnSrc;
  };
  const sync = () => {
    if (!allowed()) {
      cancelAnimationFrame(raf); raf = 0; draw(0);
    } else { loadAngle(); schedule(); }
  };
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      near = entries[0].isIntersecting;
      if (!near) { cancelAnimationFrame(raf); raf = 0; }
      sync();
    }, {rootMargin:'500px 0px'});
    observer.observe(figure);
  } else {
    const checkNear = () => {
      const rect = figure.getBoundingClientRect();
      near = rect.bottom > -500 && rect.top < innerHeight + 500;
      sync();
    };
    addEventListener('scroll', checkNear, {passive:true});
    addEventListener('resize', checkNear, {passive:true});
    checkNear();
  }
  addEventListener('scroll', schedule, {passive:true});
  addEventListener('resize', schedule, {passive:true});
  reduced.addEventListener('change', sync);
  navigator.connection?.addEventListener?.('change', sync);
  document.addEventListener('visibilitychange', sync);
  addEventListener('pagehide', () => { inactive = true; cancelAnimationFrame(raf); raf = 0; });
  addEventListener('pageshow', () => { inactive = false; sync(); });
})();
