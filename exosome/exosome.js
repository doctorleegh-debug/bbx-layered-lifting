(() => {
  'use strict';
  const root = document.querySelector('.ex-explorer');
  if (!root || root.dataset.ready) return;
  root.dataset.ready = 'true';
  const tablist = root.querySelector('.ex-tabs');
  const tabs = [...tablist.querySelectorAll('button')];
  const panels = [...root.querySelectorAll('.ex-panels article')];
  const toggle = root.querySelector('.ex-motion-toggle');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const connection = navigator.connection;
  const saveData = !!(connection && connection.saveData);
  let index = 0, timer = null, visible = false, paused = false;
  root.classList.add('ex-enhanced');
  tablist.hidden = false;
  tablist.setAttribute('role', 'tablist');
  tablist.setAttribute('aria-orientation', 'vertical');
  toggle.hidden = false;
  tabs.forEach((tab, i) => {
    tab.setAttribute('role', 'tab');
    panels[i].setAttribute('role', 'tabpanel');
    panels[i].setAttribute('aria-labelledby', tab.id);
    panels[i].tabIndex = 0;
    tab.addEventListener('click', () => { paused = true; select(i); sync(); });
    tab.addEventListener('keydown', e => {
      let next;
      if (e.key === 'ArrowDown') next = (i + 1) % tabs.length;
      if (e.key === 'ArrowUp') next = (i + tabs.length - 1) % tabs.length;
      if (e.key === 'Home') next = 0;
      if (e.key === 'End') next = tabs.length - 1;
      if (next === undefined) return;
      e.preventDefault(); paused = true; select(next); tabs[next].focus(); sync();
    });
  });
  function select(next) {
    index = next;
    root.dataset.step = String(index);
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      panels[i].hidden = i !== index;
    });
  }
  function sync() {
    clearTimeout(timer); timer = null;
    const constrained = reduced.matches || saveData;
    const focused = root.contains(document.activeElement) && document.activeElement !== toggle;
    const running = !constrained && !paused && visible && !document.hidden && !focused;
    root.classList.toggle('ex-running', running);
    toggle.disabled = constrained;
    const label = constrained ? '모션 줄이기 · 단계별 선택 가능' : paused ? '자동 설명 재생' : '자동 설명 일시정지';
    // Preserve the text node during pointer focus: replacing it can cancel a WebKit click.
    if (toggle.textContent !== label) toggle.textContent = label;
    toggle.setAttribute('aria-pressed', String(paused || constrained));
    if (running) timer = setTimeout(() => { select((index + 1) % tabs.length); sync(); }, 6500);
  }
  toggle.addEventListener('click', () => { paused = !paused; sync(); });
  root.addEventListener('focusin', sync);
  root.addEventListener('focusout', () => queueMicrotask(sync));
  document.addEventListener('visibilitychange', sync);
  window.addEventListener('pagehide', () => { clearTimeout(timer); timer = null; });
  window.addEventListener('pageshow', sync);
  reduced.addEventListener('change', sync);
  if ('IntersectionObserver' in window) new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting; sync();
  }, {threshold: .12}).observe(root);
  else visible = true;
  select(0); sync();
})();
