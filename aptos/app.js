(() => {
  'use strict';
  if (document.documentElement.dataset.aptosReady) return;
  document.documentElement.dataset.aptosReady = 'true';
  const film = document.querySelector('#hero-film');
  const media = document.querySelector('.hero-media');
  const toggle = document.querySelector('#film-toggle');
  const open = document.querySelector('#film-open');
  const dialog = document.querySelector('#film-dialog');
  const full = document.querySelector('#full-film');
  const close = document.querySelector('#film-close');
  if (!film || !media || !toggle || !open || !dialog || !full || !close) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  let inView = false, userPaused = false, failed = false, loaded = false;
  const economy = () => reduced.matches || Boolean(connection?.saveData);
  const isMobile = matchMedia('(max-width:767px)').matches;
  const source = isMobile ? film.dataset.mobile : film.dataset.desktop;
  const updateButton = () => {
    const paused = userPaused || economy();
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.setAttribute('aria-label', paused ? '배경 영상 재생' : '배경 영상 일시정지');
    toggle.querySelector('.pause-symbol').textContent = paused ? '▷' : 'Ⅱ';
    toggle.querySelector('.control-label').textContent = paused ? '재생' : '일시정지';
  };
  const load = () => {
    if (loaded || failed) return;
    loaded = true;
    film.muted = true;
    film.src = source;
    film.load();
  };
  const synchronize = () => {
    if (!inView || document.hidden || dialog.open || economy() || userPaused || failed) {
      film.pause();
      updateButton();
      return;
    }
    load();
    const p = film.play();
    if (p) p.catch(() => { userPaused = true; updateButton(); });
    updateButton();
  };
  toggle.hidden = false;
  open.hidden = false;
  film.addEventListener('playing', () => media.classList.add('is-playing'));
  film.addEventListener('error', () => {
    failed = true;
    film.pause();
    media.classList.remove('is-playing');
    toggle.hidden = true;
  });
  toggle.addEventListener('click', () => {
    if (economy()) {
      // Explicit playback in the player keeps automatic motion disabled.
      open.click();
      return;
    }
    userPaused = !userPaused;
    synchronize();
  });
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    inView = entries[0].isIntersecting;
    synchronize();
  }, {threshold:0.08}) : null;
  if (observer) observer.observe(document.querySelector('.hero'));
  else { inView = true; synchronize(); }
  document.addEventListener('visibilitychange', () => { if (document.hidden) full.pause(); synchronize(); });
  window.addEventListener('pagehide', () => { film.pause(); full.pause(); });
  window.addEventListener('pageshow', synchronize);
  reduced.addEventListener?.('change', () => {
    if (reduced.matches) media.classList.remove('is-playing');
    synchronize();
  });
  connection?.addEventListener?.('change', synchronize);
  open.addEventListener('click', () => {
    film.pause();
    if (!full.getAttribute('src')) full.src = film.dataset.desktop;
    dialog.showModal();
    const p = full.play();
    if (p) p.catch(() => {});
  });
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if (e.target === dialog) {
    const box = dialog.getBoundingClientRect();
    if (e.clientX < box.left || e.clientX > box.right || e.clientY < box.top || e.clientY > box.bottom) dialog.close();
  }});
  dialog.addEventListener('close', () => { full.pause(); synchronize(); open.focus(); });
  updateButton();
})();
