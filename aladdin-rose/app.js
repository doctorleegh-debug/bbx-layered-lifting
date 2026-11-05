(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const hero = document.querySelector('.hero');
  const heroVideo = hero.querySelector('video');
  const heroToggle = hero.querySelector('.hero-video-toggle');
  let heroVisible = false, userPaused = false, manualPlay = false;
  const motionAllowed = () => document.documentElement.dataset.motion !== 'off';
  const canMove = () => motionAllowed() && !reduced.matches && !navigator.connection?.saveData && !document.hidden;
  const wantsHero = () => heroVisible && !document.hidden && !userPaused && (manualPlay || canMove());
  const syncVideoButton = () => {
    const playing = !heroVideo.paused;
    heroToggle.setAttribute('aria-label', playing ? '히어로 영상 일시정지' : '히어로 영상 재생');
    heroToggle.firstElementChild.textContent = playing ? 'Ⅱ' : '▶';
    heroToggle.querySelector('.video-toggle-label').textContent = playing ? '일시정지' : '영상 재생';
  };
  const syncHero = () => {
    if (!wantsHero()) { heroVideo.pause(); return; }
    if (!heroVideo.getAttribute('src')) {
      heroVideo.src = matchMedia('(max-width: 680px)').matches ? heroVideo.dataset.mobileSrc : heroVideo.dataset.desktopSrc;
      heroVideo.muted = true;
    }
    if (heroVideo.paused) heroVideo.play().then(() => { if (!wantsHero()) heroVideo.pause(); }).catch(syncVideoButton);
  };
  heroToggle.hidden = false;
  heroToggle.addEventListener('click', () => {
    userPaused = !heroVideo.paused;
    if (!userPaused) manualPlay = true;
    syncHero();
  });
  heroVideo.addEventListener('play', syncVideoButton);
  heroVideo.addEventListener('pause', syncVideoButton);
  heroVideo.addEventListener('error', syncVideoButton);
  new IntersectionObserver(entries => { heroVisible = entries[0].isIntersecting; syncHero(); }, {threshold:0}).observe(hero.querySelector('.hero-media'));
  reduced.addEventListener('change',syncHero);
  document.addEventListener('visibilitychange',syncHero);
  document.addEventListener('bb:motionchange',() => {
    if (!motionAllowed()) manualPlay = false;
    syncHero();
  });
  syncHero();

  const footer = document.querySelector('bb-brand-footer')?.shadowRoot;
  if (!footer) return;
  // Local snapshot of the approved shared footer; no polling or live mutations.
  const extra = document.createElement('style');
  extra.textContent = 'h2,h3{font-family:BBHeading,BBBody,sans-serif}.eb-leaf{transition:transform 1s ease-in-out}.eb-book.is-open .eb-leaf{transform:rotateY(-155deg)}@media(prefers-reduced-motion:reduce){.eb-leaf{transition:none!important}}';
  footer.append(extra);
  const eventSection = footer.querySelector('.eb-section');
  const books = [...footer.querySelectorAll('.eb-book')];
  let eventVisible = false, timer = null, cursor = 0;
  const stopBooks = () => { clearTimeout(timer); timer=null; books.forEach(b => b.classList.remove('is-open')); };
  const tick = () => {
    if (!eventVisible || !canMove()) {stopBooks();return;}
    const visible = books.filter(b=>getComputedStyle(b).display!=='none');
    if (!visible.length) return;
    const book = visible[cursor % visible.length];
    book.classList.add('is-open');
    timer=setTimeout(()=>{book.classList.remove('is-open');cursor++;timer=setTimeout(tick,3500);},1500);
  };
  const syncBooks=()=>{stopBooks();if(eventVisible && canMove())timer=setTimeout(tick,1500);};
  new IntersectionObserver(entries=>{eventVisible=entries[0].isIntersecting;syncBooks();},{threshold:.1}).observe(eventSection);
  reduced.addEventListener('change',syncBooks);
  document.addEventListener('visibilitychange',syncBooks);
  document.addEventListener('bb:motionchange',syncBooks);
  // Keep the common footer in its original order; booking anchors go directly to Find us.
  document.querySelectorAll('a[href="#contact"]').forEach(a=>a.addEventListener('click',event=>{
    event.preventDefault();
    const target=footer.querySelector('.contact');
    target.setAttribute('tabindex','-1');
    target.scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'start'});
    target.focus({preventScroll:true});
    history.replaceState(null,'','#contact');
  }));
})();

// R05: local, progressive motion. Text stays readable without JavaScript.
(() => {
  'use strict';
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const toggle = document.querySelector('.motion-toggle');
  const hero = document.querySelector('.hero');
  const title = document.querySelector('#hero-title');
  if (!toggle || !hero || !title || !window.IntersectionObserver || !Element.prototype.animate) return;
  let userOff = false;
  const enabled = () => !userOff && !reduced.matches;
  const animations = new Set();
  const oneShots = new Map();
  const tilts = [];
  const floatImage = document.querySelector('.product-stage img');
  let floatVisible = false, heroVisible = false;
  const originalTitle = title.textContent;

  const animate = (element, frames, options, finish = () => {}) => {
    const animation = element.animate(frames, options);
    animations.add(animation);
    animation.onfinish = () => { finish(); animations.delete(animation); animation.cancel(); };
    animation.oncancel = () => animations.delete(animation);
    if (document.hidden) animation.pause();
    return animation;
  };

  // Preserve the subtitle styling, spaces, and the full accessible heading.
  title.setAttribute('aria-label', originalTitle);
  const titleWalker = document.createTreeWalker(title, NodeFilter.SHOW_TEXT);
  const titleNodes = [];
  while (titleWalker.nextNode()) titleNodes.push(titleWalker.currentNode);
  const letters = [];
  const segmenter = typeof Intl.Segmenter === 'function' ? new Intl.Segmenter('ko', {granularity:'grapheme'}) : null;
  for (const node of titleNodes) {
    const fragment = document.createDocumentFragment();
    const graphemes = segmenter ? [...segmenter.segment(node.textContent)].map(x => x.segment) : Array.from(node.textContent);
    for (const letter of graphemes) {
      const span = document.createElement('span');
      span.className = 'type-char';
      span.textContent = letter;
      span.setAttribute('aria-hidden', 'true');
      fragment.append(span);
      letters.push(span);
    }
    node.replaceWith(fragment);
  }
  const cursor = document.createElement('span');
  cursor.className = 'type-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  cursor.textContent = '▏';
  title.append(cursor);
  const finishTitle = () => {
    letters.forEach(letter => letter.style.removeProperty('opacity'));
    title.classList.add('type-complete');
  };

  const revealObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const element = entry.target, action = oneShots.get(element);
      revealObserver.unobserve(element);
      oneShots.delete(element);
      if (enabled()) action?.();
      else element.classList.add('has-entered');
    }
  }, {threshold:.12, rootMargin:'0px 0px -5% 0px'});
  const onceVisible = (element, action) => { oneShots.set(element, action); revealObserver.observe(element); };

  for (const heading of document.querySelectorAll('main h2')) {
    const accessibleText = heading.innerHTML.replace(/<br\s*\/?>/gi, ' ');
    const text = document.createElement('span');
    text.innerHTML = accessibleText;
    heading.setAttribute('aria-label', text.textContent.replace(/\s+/g, ' ').trim());
    const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT), nodes = [], words = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const node of nodes) {
      const fragment = document.createDocumentFragment();
      for (const token of node.textContent.split(/(\s+)/)) {
        if (!token || /^\s+$/.test(token)) { fragment.append(token); continue; }
        const mask = document.createElement('span'), word = document.createElement('span');
        mask.className = 'word-mask'; word.className = 'word-reveal'; word.textContent = token;
        mask.setAttribute('aria-hidden', 'true'); mask.append(word); fragment.append(mask); words.push(word);
      }
      node.replaceWith(fragment);
    }
    heading.classList.add('split-title');
    onceVisible(heading, () => {
      heading.classList.add('has-entered');
      words.forEach((word, i) => animate(word,
        [{transform:'translateY(105%)', opacity:0}, {transform:'translateY(0)', opacity:1}],
        {duration:520, delay:i*120, easing:'cubic-bezier(.16,1,.3,1)', fill:'both'}));
    });
  }

  const cards = [...document.querySelectorAll('.concern-list > article, .care-list > article, .related-grid > a')];
  for (const component of [...cards, ...document.querySelectorAll('.product-stage, .ingredient-visual, .treatment-photo')]) {
    component.classList.add('spring-component');
    onceVisible(component, () => {
      component.classList.add('has-entered');
      const animation = animate(component,
        [{scale:'1',offset:0,easing:'cubic-bezier(.2,.8,.3,1)'}, {scale:'1.025',offset:.58,easing:'cubic-bezier(.4,0,.2,1)'}, {scale:'1',offset:1}],
        {duration:450, iterations:1});
      animation.id = 'bb-scroll-spring';
    });
  }

  for (const card of cards) {
    card.classList.add('tilt-card');
    const state = {card, rect:null, frame:0, point:null};
    const reset = () => {
      cancelAnimationFrame(state.frame); state.frame=0; state.rect=null; state.point=null;
      card.classList.remove('is-tilting');
      for (const property of ['--tilt-x','--tilt-y','--glare-x','--glare-y']) card.style.removeProperty(property);
    };
    state.reset=reset; tilts.push(state);
    card.addEventListener('pointermove', event => {
      if (!enabled() || !finePointer.matches || event.pointerType !== 'mouse') return;
      state.rect ||= card.getBoundingClientRect();
      state.point={x:event.clientX,y:event.clientY};
      if (state.frame) return;
      state.frame=requestAnimationFrame(() => {
        state.frame=0;
        if (!enabled() || !state.point) return;
        const rect=state.rect;
        if (!rect.width || !rect.height) return;
        const x=Math.max(-1,Math.min(1,(state.point.x-rect.left)/rect.width*2-1));
        const y=Math.max(-1,Math.min(1,(state.point.y-rect.top)/rect.height*2-1));
        const length=Math.max(1,Math.hypot(x,y));
        card.style.setProperty('--tilt-x',`${(-y/length*10).toFixed(3)}deg`);
        card.style.setProperty('--tilt-y',`${(x/length*10).toFixed(3)}deg`);
        card.style.setProperty('--glare-x',`${(x*25).toFixed(2)}%`);
        card.style.setProperty('--glare-y',`${(y*25).toFixed(2)}%`);
        card.classList.add('is-tilting');
      });
    },{passive:true});
    card.addEventListener('pointerleave',reset);
    card.addEventListener('pointercancel',reset);
  }
  const resetTilts = () => tilts.forEach(state => state.reset());
  window.addEventListener('scroll',resetTilts,{passive:true});
  window.addEventListener('resize',resetTilts,{passive:true});
  finePointer.addEventListener('change',resetTilts);

  const syncAmbient = () => {
    root.classList.toggle('motion-suspended',document.hidden);
    floatImage?.classList.toggle('is-floating',enabled() && floatVisible && !document.hidden);
    title.classList.toggle('cursor-active',enabled() && heroVisible && !document.hidden);
  };
  if (floatImage) {
    floatImage.classList.add('product-float');
    new IntersectionObserver(entries => {floatVisible=entries[0].isIntersecting;syncAmbient();},{threshold:0}).observe(floatImage);
  }
  new IntersectionObserver(entries => {heroVisible=entries[0].isIntersecting;syncAmbient();},{threshold:0}).observe(hero);

  const syncPreference = () => {
    root.dataset.motion=enabled()?'on':'off';
    toggle.hidden=false;
    toggle.setAttribute('aria-pressed',String(!enabled()));
    toggle.textContent=reduced.matches?'모션 감소':'모션 '+(userOff?'켜기':'끄기');
    toggle.disabled=reduced.matches;
    if (!enabled()) {
      for (const animation of [...animations]) {animation.finish();animation.cancel();}
      finishTitle();
      for (const element of oneShots.keys()) {element.classList.add('has-entered');revealObserver.unobserve(element);}
      oneShots.clear();
      resetTilts();
    }
    syncAmbient();
    document.dispatchEvent(new Event('bb:motionchange'));
  };
  toggle.addEventListener('click',() => {userOff=!userOff;syncPreference();});
  reduced.addEventListener('change',syncPreference);
  document.addEventListener('visibilitychange',() => {
    for (const animation of animations) {
      if (document.hidden) animation.pause(); else if (enabled()) animation.play();
    }
    if (document.hidden) resetTilts();
    syncAmbient();
  });
  syncPreference();
  if (enabled()) {
    letters.forEach((letter,i) => animate(letter,[{opacity:0},{opacity:1}],
      {duration:1,delay:(i+1)*2000/letters.length-1,fill:'both',easing:'steps(1,end)'},
      i===letters.length-1?finishTitle:undefined));
  } else finishTitle();
})();
