/* InMode R05. Local THREE r128, seeded geometry and a deterministic web timeline.
 * This is an explanatory cutaway, not a replica or a treatment-result simulator. */
(() => {
  'use strict';
  const root = document.getElementById('bb-inmode');
  if (!root) return;
  const skin = root.querySelector('.im-stage'), face = root.querySelector('.im-face-map');
  if (!skin || !face) return;
  const view = skin.querySelector('.im-stage-view');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const connection = navigator.connection;
  const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
  const ease = x => { x = clamp(x); return x * x * (3 - 2 * x); };
  const range = (t, a, b) => ease((t - a) / (b - a));
  const durations = [1.8, 6.5, 9.6];
  const captions = {
    forma: [
      ['피부에 부드럽게 밀착', '피부와 접촉면이 맞닿는 과정'],
      ['움직이며 전하는 고주파', '접촉을 유지하며 열에너지를 전달'],
      ['피부 반응을 살피며', '온도 피드백과 피부 상태를 함께 확인']
    ],
    fx: [
      ['작은 부위를 안정적으로', '진공흡입으로 피부를 잡아주는 과정'],
      ['흡입된 부위에 고주파', '접촉한 조직에 에너지를 전달'],
      ['접촉을 풀고 반응 확인', '흡입을 해제한 뒤 피부 상태를 확인']
    ]
  };
  const areaData = {
    chin: { n: 1, anchor: [505, 821], leader: 'M505 821 C534 882 602 963 652 980 L830 980' },
    jaw: { n: 2, anchor: [678, 718], leader: 'M678 718 C741 771 777 872 787 960 L830 960' },
    firm: { n: 3, anchor: [693, 623], leader: 'M693 623 C780 657 823 797 830 916 L856 916' }
  };
  let mode = skin.dataset.mode === 'fx' ? 'fx' : 'forma';
  let skinTime = 0, faceTime = 3.2, last = 0, raf = 0, frames = 0;
  let paused = false, seeking = false, sceneState = null, destroyed = false;
  let sectionVisible = false, lastStep = -1, lastMode = '';
  const toggle = skin.querySelector('.im-stage-toggle');
  const policyAllows = () => !document.hidden && !reduced.matches && !connection?.saveData;
  const skinPlaying = () => policyAllows() && skin.dataset.motion === 'playing' && !paused && sectionVisible && skin.dataset.unavailable !== 'true';
  const facePlaying = () => policyAllows() && face.dataset.motion === 'playing' && faceTime < 3.2;

  function buildScene() {
    return window.createInmodeSkin?.(view,skin,()=>skinTime,()=>mode) || null;
  }

  function drawCaption(t) {
    const step = t < durations[0] ? 0 : t < durations[1] ? 1 : 2;
    if (step !== lastStep || mode !== lastMode) {
      skin.querySelector('.im-stage-index').textContent = '0' + (step + 1);
      skin.querySelector('.im-stage-title').textContent = captions[mode][step][0];
      skin.querySelector('.im-stage-detail').textContent = captions[mode][step][1];
      const copyIndex = 114 + (mode === 'fx' ? 6 : 0) + step * 2;
      skin.querySelector('.im-stage-title').dataset.copyId = 'IM' + copyIndex;
      skin.querySelector('.im-stage-detail').dataset.copyId = 'IM' + (copyIndex + 1);
      const panel = root.querySelector(mode === 'fx' ? '#panel-fx' : '#panel-forma');
      root.querySelectorAll('.im-path li').forEach(el => el.removeAttribute('data-current'));
      panel?.querySelectorAll('.im-path li').forEach((el, i) => el.dataset.current = String(i === step));
      lastStep = step; lastMode = mode;
    }
    skin.querySelectorAll('.im-stage-track i').forEach((el, i) => {
      const start = i ? durations[i - 1] : 0;
      el.style.setProperty('--fill', (clamp((t - start) / (durations[i] - start)) * 100).toFixed(2) + '%');
    });
  }
  function drawSkin(t) { sceneState?.draw(t, mode); drawCaption(t); }
  function drawFace(t) {
    const area = areaData[face.dataset.area] ? face.dataset.area : 'chin';
    const button = root.querySelector(`.im-area-options [data-area="${area}"]`);
    face.querySelector('.im-face-count').textContent = '0' + areaData[area].n + ' / 03';
    face.querySelector('.im-face-label').textContent = button.querySelector('span').textContent;
    face.querySelector('.im-face-description').textContent = button.querySelector('small').textContent;
    face.querySelector('.im-face-caption-rule').style.transform = 'none';
  }
  function tick(now) {
    raf = 0;
    if (destroyed || seeking) return;
    const dt = last ? Math.min(.05, (now - last) / 1000) : 0; last = now;
    if (skinPlaying() && sceneState && skin.dataset.unavailable !== 'true') { skinTime = (skinTime + dt) % 9.6; drawSkin(skinTime); frames++; }
    if (facePlaying()) { faceTime = Math.min(3.2, faceTime + dt); drawFace(faceTime); }
    if ((skinPlaying() && sceneState && skin.dataset.unavailable !== 'true') || facePlaying()) raf = requestAnimationFrame(tick); else last = 0;
  }
  function wake() {
    if (destroyed || seeking) return;
    const staticPolicy = reduced.matches || connection?.saveData;
    toggle.hidden = staticPolicy || skin.dataset.unavailable === 'true';
    if (staticPolicy) { skinTime = 4.1; faceTime = 3.2; drawSkin(skinTime); drawFace(faceTime); }
    if (!raf && ((skinPlaying() && sceneState) || facePlaying())) { last = 0; raf = requestAnimationFrame(tick); }
  }
  function initialize() {
    if (sceneState || skin.dataset.unavailable === 'true') return;
    sceneState = buildScene();
    if (!sceneState) {
      skin.dataset.unavailable = 'true'; skin.dataset.userPaused = 'true';
      skin.dispatchEvent(new CustomEvent('inmode:playback'));
      skin.querySelector('.im-stage-title').textContent = '피부 구조와 고주파';
      skin.querySelector('.im-stage-detail').textContent = '피부 단면과 아래 설명을 함께 확인해주세요';
      return;
    }
    drawSkin(policyAllows() ? skinTime : 4.1); wake();
  }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.target === skin) { sectionVisible = entry.isIntersecting; if (entry.isIntersecting) initialize(); }
        if (entry.target === face && entry.isIntersecting && faceTime >= 3.2 && !face.dataset.seen) { face.dataset.seen = 'true'; faceTime = policyAllows() ? 0 : 3.2; }
      }
      wake();
    }, { threshold: .08 }); observer.observe(skin); observer.observe(face);
  } else { sectionVisible = true; initialize(); }
  new MutationObserver(wake).observe(skin, { attributes: true, attributeFilter: ['data-motion'] });
  new MutationObserver(wake).observe(face, { attributes: true, attributeFilter: ['data-motion'] });
  skin.addEventListener('inmode:mode', () => {
    mode = skin.dataset.mode === 'fx' ? 'fx' : 'forma'; skinTime = policyAllows() && !paused ? 0 : 4.1;
    view.setAttribute('aria-label', (mode === 'fx' ? 'MiniFX의 진공흡입과 고주파 전달' : 'Forma의 피부 밀착과 고주파 전달') + '을 보여주는 입체 모식도');
    drawSkin(skinTime); wake();
  });
  face.addEventListener('inmode:area', () => { faceTime = policyAllows() ? 0 : 3.2; drawFace(faceTime); wake(); });
  toggle.addEventListener('click', () => {
    paused = !paused; skin.dataset.userPaused = String(paused); toggle.setAttribute('aria-pressed', String(paused));
    toggle.setAttribute('aria-label', paused ? '원리 모션 재생' : '원리 모션 일시정지'); toggle.firstElementChild.textContent = paused ? '▷' : 'Ⅱ';
    skin.dispatchEvent(new CustomEvent('inmode:playback')); wake();
  });
  reduced.addEventListener('change', wake); connection?.addEventListener?.('change', wake); document.addEventListener('visibilitychange', wake);
  window.addEventListener('pagehide', () => { destroyed = true; cancelAnimationFrame(raf); raf = 0; });
  window.addEventListener('pageshow', () => { destroyed = false; wake(); });
  drawFace(3.2); wake();
  // Deterministic inspection API; never active unless explicitly called.
  window.__inmodeMotion = {
    seek(t, selected = mode, area = face.dataset.area) {
      seeking = true; cancelAnimationFrame(raf); raf = 0;
      mode = selected === 'fx' ? 'fx' : 'forma'; skin.dataset.mode = mode;
      skin.querySelector('.im-skin-mode').textContent = mode === 'fx' ? 'MiniFX' : 'Forma';
      skinTime = clamp(Number(t) || 0, 0, 9.6); faceTime = Math.min(skinTime, 3.2);
      if (areaData[area]) face.dataset.area = area;
      initialize(); drawSkin(skinTime); drawFace(faceTime);
    },
    resume() { seeking = false; last = 0; wake(); },
    state: () => ({ mode, skinTime, faceTime, frames, raf: !!raf, paused, sectionVisible, ready: skin.dataset.ready === 'true', reduced: reduced.matches, saveData: !!connection?.saveData, drawCalls: sceneState?.renderer.info.render.calls, triangles: sceneState?.renderer.info.render.triangles })
  };
})();
