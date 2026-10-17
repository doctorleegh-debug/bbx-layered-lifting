(() => {
  'use strict';
  const video = document.querySelector('.ex-hero-video');
  if (!video || video.dataset.ready) return;
  video.dataset.ready = 'true';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const connection = navigator.connection;
  let visible = true, pageHidden = false, failed = false, pending = false;
  video.muted = true;
  video.defaultMuted = true;
  const eligible = () => visible && !pageHidden && !document.hidden && !reduced.matches && !connection?.saveData && !failed;
  const showPoster = () => video.classList.remove('ex-video-playing');
  function play() {
    if (!eligible()) { video.pause(); showPoster(); return; }
    if (pending || !video.paused) return;
    if (!video.getAttribute('src')) {
      video.src = matchMedia('(max-width: 767px)').matches ? video.dataset.mobile : video.dataset.desktop;
    }
    pending = true;
    const result = video.play();
    if (result) result.catch(showPoster).finally(() => { pending = false; if (!eligible()) { video.pause(); showPoster(); } });
    else pending = false;
  }
  video.addEventListener('playing', () => {
    if (eligible()) video.classList.add('ex-video-playing');
    else { video.pause(); showPoster(); }
  });
  video.addEventListener('error', () => { failed = true; showPoster(); });
  document.addEventListener('visibilitychange', play);
  window.addEventListener('pagehide', () => { pageHidden = true; play(); });
  window.addEventListener('pageshow', () => { pageHidden = false; play(); });
  reduced.addEventListener('change', play);
  connection?.addEventListener?.('change', play);
  window.addEventListener('pointerdown', play, {passive: true});
  if ('IntersectionObserver' in window) new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting; play();
  }, {threshold: .05}).observe(video);
  play();
})();
