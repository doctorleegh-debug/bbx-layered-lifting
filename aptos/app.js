(() => {
  'use strict';
  if (document.documentElement.dataset.aptosReady) return;
  const film = document.querySelector('#hero-film');
  const media = document.querySelector('.hero-media');
  const hero = document.querySelector('.hero');
  if (!film || !media || !hero) return;
  document.documentElement.dataset.aptosReady = 'true';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const source = matchMedia('(max-width:767px)').matches ? film.dataset.mobile : film.dataset.desktop;
  let inView = false, pageHidden = false, failed = false, loaded = false, pending = false, revision = 0;
  const allowed = () => inView && !pageHidden && !document.hidden && !reduced.matches && !connection?.saveData && !failed;
  const stop = () => { film.pause(); media.classList.remove('is-playing'); };
  const synchronize = () => {
    const attempt = ++revision;
    if (!allowed()) { stop(); return; }
    if (pending || !film.paused) return;
    if (!loaded) {
      if (!source) { failed = true; stop(); return; }
      loaded = true;
      film.muted = true;
      film.src = source;
      film.load();
    }
    pending = true;
    Promise.resolve(film.play()).then(() => {
      if (!allowed()) stop();
    }).catch(error => {
      // A visibility pause can interrupt a pending play without a media failure.
      if (error.name !== 'AbortError') failed = true;
      stop();
    }).finally(() => {
      pending = false;
      if (allowed() && film.paused && revision !== attempt) synchronize();
    });
  };
  film.addEventListener('playing', () => {
    if (allowed()) media.classList.add('is-playing');
    else stop();
  });
  film.addEventListener('error', () => { failed = true; stop(); });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      inView = entries[0].isIntersecting && entries[0].intersectionRatio >= .08;
      synchronize();
    }, {threshold: [0, .08]});
    observer.observe(hero);
  } else { inView = true; synchronize(); }
  document.addEventListener('visibilitychange', synchronize);
  window.addEventListener('pagehide', () => { pageHidden = true; stop(); });
  window.addEventListener('pageshow', () => { pageHidden = false; synchronize(); });
  reduced.addEventListener?.('change', synchronize);
  connection?.addEventListener?.('change', synchronize);
})();
