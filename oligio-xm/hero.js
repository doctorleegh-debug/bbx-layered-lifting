(() => {
  'use strict';
  const host = document.querySelector('#xm .hero-media');
  const video = host && host.querySelector('video');
  if (!video || host.dataset.xmReady) return;
  host.dataset.xmReady = 'true';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = matchMedia('(max-width: 767px)');
  const connection = navigator.connection;
  let visible = false, suspended = false, failed = false, pending = false, revision = 0;
  const allowed = () => !reduce.matches && !(connection && connection.saveData);
  const active = () => allowed() && visible && !suspended && !document.hidden && !failed;
  const hide = () => { video.pause(); host.classList.remove('is-playing'); };
  const sync = () => {
    if (!active()) { hide(); return; }
    if (!video.getAttribute('src')) {
      video.muted = true;
      video.defaultMuted = true;
      video.src = mobile.matches ? video.dataset.mobile : video.dataset.desktop;
    }
    if (!pending && video.paused) {
      pending = true;
      const source = video.getAttribute('src');
      const requestedRevision = revision;
      const result = video.play();
      if (result && result.then) {
        result.then(() => { if (!active()) hide(); }).catch(error => {
          if (error.name !== 'AbortError' && source === video.getAttribute('src')) { failed = true; hide(); }
        }).finally(() => { pending = false; if (source !== video.getAttribute('src') || requestedRevision !== revision) sync(); });
      } else pending = false;
    }
  };
  video.addEventListener('playing', () => {
    if (active()) host.classList.add('is-playing'); else hide();
  });
  video.addEventListener('error', () => { failed = true; hide(); });
  video.addEventListener('loadeddata', sync);
  // WebKit can pause after its native loop seeks back to the first frame.
  video.addEventListener('seeked', () => {
    if (video.loop && video.paused && video.currentTime < .25 && active()) {
      revision++; sync();
    }
  });
  video.addEventListener('ended', () => {
    if (video.loop && active()) { revision++; video.currentTime = 0; sync(); }
  });
  document.addEventListener('visibilitychange', () => { revision++; sync(); });
  window.addEventListener('pagehide', () => { revision++; suspended = true; hide(); });
  window.addEventListener('pageshow', () => { revision++; suspended = false; sync(); });
  const onPreference = () => {
    revision++;
    if (!allowed()) { hide(); video.removeAttribute('src'); video.load(); }
    sync();
  };
  if (reduce.addEventListener) reduce.addEventListener('change', onPreference);
  else reduce.addListener(onPreference);
  if (connection && connection.addEventListener) connection.addEventListener('change', onPreference);
  const onViewport = () => {
    revision++;
    hide(); video.removeAttribute('src'); video.load(); failed = false; sync();
  };
  if (mobile.addEventListener) mobile.addEventListener('change', onViewport);
  else mobile.addListener(onViewport);
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      const next = entries.some(entry => entry.isIntersecting);
      if (visible !== next) revision++;
      visible = next; sync();
    }, {threshold: 0});
    observer.observe(host);
  } else { visible = true; sync(); }
})();
