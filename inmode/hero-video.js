(() => {
  'use strict';
  const video = document.querySelector('#im-hero-film');
  if (!video) return;
  const stage = video.closest('.im-film-hero'), button = stage.querySelector('.im-film-toggle');
  stage.dataset.filmInitialized = 'true';
  const mobile = matchMedia('(max-width:700px)'), reduced = matchMedia('(prefers-reduced-motion:reduce)'), connection = navigator.connection;
  let visible = false, paused = false, explicit = false, blocked = false, pending = false, selected = '', generation = 0, fallback = false;
  const allowed = () => visible && !document.hidden && !paused && !blocked && (explicit || (!reduced.matches && !connection?.saveData));
  function label() {
    const play = paused || blocked || (!explicit && (reduced.matches || connection?.saveData));
    button.setAttribute('aria-label', play ? '히어로 영상 재생' : '히어로 영상 일시정지');
    button.setAttribute('aria-pressed', String(!play)); button.firstElementChild.textContent = play ? '▷' : 'Ⅱ';
  }
  function source() {
    const orientation = mobile.matches ? 'Mobile' : 'Desktop';
    const format = !fallback && video.canPlayType('video/webm; codecs="vp9"') ? 'Webm' : 'Mp4';
    return { url: video.dataset[orientation.toLowerCase() + format], poster: video.dataset[orientation.toLowerCase() + 'Poster'], key: orientation + format };
  }
  function clear() {
    generation++; pending = false; selected = ''; video.pause(); stage.dataset.videoReady = 'false';
    video.removeAttribute('src'); video.load();
  }
  function sync() {
    label(); const target = source(); video.poster = target.poster;
    if (!allowed()) { video.pause(); return; }
    if (selected !== target.key) {
      clear(); selected = target.key; video.muted = true; video.defaultMuted = true; video.src = target.url; video.load();
    }
    if (pending || !video.paused) return;
    const ticket = generation; pending = true;
    video.play().then(() => { if (ticket === generation && !allowed()) video.pause(); }).catch(error => {
      if (ticket === generation && error.name !== 'AbortError') { blocked = true; stage.dataset.videoReady = 'false'; label(); }
    }).finally(() => { if (ticket === generation) pending = false; });
  }
  video.addEventListener('playing', () => { stage.dataset.videoReady = 'true'; if (!allowed()) video.pause(); });
  video.addEventListener('error', () => {
    if (!video.getAttribute('src')) return;
    if (!fallback && selected.endsWith('Webm')) { fallback = true; clear(); sync(); }
    else { blocked = true; stage.dataset.videoReady = 'false'; label(); }
  });
  button.addEventListener('click', () => {
    if (paused || blocked || (!explicit && (reduced.matches || connection?.saveData))) {
      paused = false; explicit = true;
      if (blocked) { blocked = false; clear(); }
    } else paused = true;
    sync();
  });
  mobile.addEventListener('change', () => { fallback = false; blocked = false; clear(); sync(); });
  reduced.addEventListener('change', () => { explicit = false; sync(); });
  connection?.addEventListener?.('change', () => { explicit = false; sync(); });
  document.addEventListener('visibilitychange', sync);
  if ('IntersectionObserver' in window) new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); }, { threshold: .02 }).observe(stage);
  else { visible = true; sync(); }
  addEventListener('pagehide', () => { visible = false; generation++; pending = false; video.pause(); });
  addEventListener('pageshow', () => { const r = stage.getBoundingClientRect(); visible = r.bottom > 0 && r.top < innerHeight; sync(); });
  label();
})();
