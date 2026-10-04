/* InMode R04. Local THREE r128, seeded geometry and a deterministic web timeline.
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
  const skinPlaying = () => policyAllows() && skin.dataset.motion === 'playing' && !paused && sectionVisible;
  const facePlaying = () => policyAllows() && face.dataset.motion === 'playing' && faceTime < 3.2;

  function buildScene() {
    const T = window.THREE;
    if (!T) return null;
    let renderer;
    try {
      const probe = document.createElement('canvas');
      const context = probe.getContext('webgl2', { alpha: true, antialias: true }) || probe.getContext('webgl', { alpha: true, antialias: true });
      if (!context) return null;
      renderer = new T.WebGLRenderer({ canvas: probe, context, alpha: true, antialias: true });
    } catch (_) { return null; }
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.6));
    renderer.outputEncoding = T.sRGBEncoding;
    renderer.toneMapping = T.ACESFilmicToneMapping;
    renderer.toneMappingExposure = .96;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = T.PCFSoftShadowMap;
    renderer.setClearColor(0xfaf5f2, 0);
    renderer.domElement.setAttribute('aria-hidden', 'true');
    view.prepend(renderer.domElement);
    const scene = new T.Scene();
    const camera = new T.OrthographicCamera(-4.1, 4.1, 3.4, -3.4, .1, 80);
    camera.position.set(6.5, 5.8, 11.5);
    camera.lookAt(0, .15, 0);
    scene.add(new T.HemisphereLight(0xfffaf1, 0xb18b88, .65));
    const light = new T.DirectionalLight(0xfff6e8, 1.15); light.position.set(-3, 7, 7); scene.add(light);
    light.castShadow = true; light.shadow.mapSize.set(1024, 1024); light.shadow.bias = -.0004;
    Object.assign(light.shadow.camera, { left: -5, right: 5, top: 5, bottom: -5, near: .5, far: 25 });
    const rim = new T.DirectionalLight(0xffded3, .5); rim.position.set(5, 3, -4); scene.add(rim);
    const fill = new T.DirectionalLight(0xffffff, .25); fill.position.set(-6, 1, -3); scene.add(fill);
    const study = new T.Group(); study.position.x = -.34; scene.add(study);
    const linear = color => new T.Color(color).convertSRGBToLinear();
    const mat = (color, props = {}) => new T.MeshStandardMaterial({ color: linear(color), roughness: .58, metalness: .02, ...props });
    const ivory = mat(0xf9eee6), silver = mat(0xcbbeb3, { metalness: .42, roughness: .26 });
    const rose = mat(0xbd777a, { metalness: .12, roughness: .38 });
    const deformable = [];
    const swell = (x, z) => Math.exp(-((x * x) / .6 + (z - .2) ** 2 / .55));
    const ripple = (x, z) => .024 * Math.sin(x * 3.5 + z * 2) + .012 * Math.sin(x * 7 - z * 4);
    const warm = linear(0xe24e30);
    function surface(top, bottom, color, openFront = false) {
      const vertices = [], indices = [];
      function grid(nu, nv, point) {
        const base = vertices.length / 3;
        for (let j = 0; j <= nv; j++) for (let i = 0; i <= nu; i++) vertices.push(...point(i / nu, j / nv));
        for (let j = 0; j < nv; j++) for (let i = 0; i < nu; i++) {
          const a = base + j * (nu + 1) + i, b = a + 1, c = a + nu + 1;
          indices.push(a, c, b, b, c, c + 1);
        }
      }
      grid(54, 20, (u, v) => { const x = -2.7 + u * 5.4, z = -1.22 + v * 2.44; return [x, top + ripple(x, z), z]; });
      if (!openFront) grid(54, 9, (u, v) => { const x = -2.7 + u * 5.4; return [x, bottom + (top - bottom) * v + ripple(x, 1.22) * v, 1.22]; });
      for (const side of [-1, 1]) grid(18, 9, (u, v) => [side * 2.7, bottom + (top - bottom) * v + ripple(side * 2.7, -1.22 + u * 2.44) * v, -1.22 + u * 2.44]);
      const g = new T.BufferGeometry();
      g.setAttribute('position', new T.Float32BufferAttribute(vertices, 3)); g.setIndex(indices); g.computeVertexNormals();
      const baseColor = linear(color), colors = [];
      for (let i = 0; i < vertices.length; i += 3) colors.push(baseColor.r, baseColor.g, baseColor.b);
      g.setAttribute('color', new T.Float32BufferAttribute(colors, 3));
      const mesh = new T.Mesh(g, mat(0xffffff, { side: T.DoubleSide, vertexColors: true }));
      mesh.receiveShadow = true; mesh.castShadow = true;
      study.add(mesh); deformable.push({ g, source: Float32Array.from(vertices), baseColor });
    }
    surface(.72, .53, 0xe8ae96);
    surface(.52, -.52, 0xd18b8d);
    surface(-.53, -1.36, 0xebc080, true);

    // Collagen is woven into the cutaway rather than laid over a raster.
    let seed = 117;
    const random = () => { seed = (1664525 * seed + 1013904223) >>> 0; return seed / 4294967296; };
    const textureCanvas = document.createElement('canvas'); textureCanvas.width = textureCanvas.height = 512;
    const tissueContext = textureCanvas.getContext('2d');
    if (tissueContext) {
      tissueContext.fillStyle = '#b8b8b8'; tissueContext.fillRect(0, 0, 512, 512);
      for (let i = 0; i < 22000; i++) {
        const tone = Math.floor(130 + random() * 100); tissueContext.fillStyle = `rgb(${tone},${tone},${tone})`;
        tissueContext.beginPath(); tissueContext.ellipse(random() * 512, random() * 512, .4 + random() * 1.2, .4 + random() * .8, random() * Math.PI, 0, Math.PI * 2); tissueContext.fill();
      }
      const texture = new T.CanvasTexture(textureCanvas); texture.wrapS = texture.wrapT = T.RepeatWrapping; texture.repeat.set(2, 1);
      // Object-space relief is subtle enough to read as tissue, not a photo texture.
      for (const item of study.children) if (item.isMesh && item.geometry.attributes.position && !item.geometry.attributes.uv) {
        const pos = item.geometry.attributes.position, uv = [];
        for (let i = 0; i < pos.count; i++) uv.push((pos.getX(i) + 2.7) / 5.4, (pos.getY(i) + pos.getZ(i) + 2) / 4);
        item.geometry.setAttribute('uv', new T.Float32BufferAttribute(uv, 2)); item.material.bumpMap = texture; item.material.bumpScale = .027;
      }
    }
    const segmentGeo = new T.CylinderGeometry(.009, .009, 1, 5);
    const fibers = new T.InstancedMesh(segmentGeo, mat(0xffffff, { roughness: .8 }), 720);
    const dummy = new T.Object3D(), axis = new T.Vector3(0, 1, 0), a = new T.Vector3(), b = new T.Vector3();
    let count = 0;
    for (let band = 0; band < 40; band++) {
      const y0 = -1 + random() * 2, phase = random() * 6.28, slope = (random() - .5) * .58;
      for (let part = 0; part < 18; part++) {
        const x0 = -2.67 + part * 5.34 / 18, x1 = x0 + 5.34 / 18;
        const yAt = x => .49 * Math.tanh(y0 + Math.sin(x * (1.8 + band % 3 * .2) + phase) * .36 + x * slope);
        a.set(x0, yAt(x0), 1.241 + .018 * Math.sin(x0 * 2 + phase)); b.set(x1, yAt(x1), 1.241 + .018 * Math.sin(x1 * 2 + phase));
        dummy.position.copy(a).add(b).multiplyScalar(.5); dummy.quaternion.setFromUnitVectors(axis, b.clone().sub(a).normalize());
        dummy.scale.set(.65 + random() * .5, a.distanceTo(b), .65 + random() * .5); dummy.updateMatrix(); fibers.setMatrixAt(count, dummy.matrix);
        fibers.setColorAt(count++, linear([0xffe0d0, 0xe7b9b1, 0xf5d0bd, 0xe1a5a0][band % 4]));
      }
    }
    study.add(fibers);
    // Stable lobules; neither volume nor count changes during the sequence.
    const fat = new T.InstancedMesh(new T.SphereGeometry(1, 22, 16), mat(0xffffff, { roughness: .44 }), 30);
    const fatColors = [0xf1ca83, 0xefc079, 0xf3d499, 0xeabd82];
    count = 0;
    for (let row = 0; row < 2; row++) for (let j = 0; j < 15; j++) {
      const x = -2.49 + j * .353 + (row % 2) * .15;
      dummy.position.set(Math.min(2.5, x), -.72 - row * .36 + (random() - .5) * .13, 1.17 + random() * .12);
      dummy.rotation.set(random() * .3, random() * .3, (random() - .5) * .7);
      dummy.scale.set(.19 + random() * .05, .24 + random() * .065, .2 + random() * .06);
      dummy.updateMatrix(); fat.setMatrixAt(count, dummy.matrix); fat.setColorAt(count++, linear(fatColors[Math.floor(random() * 4)]));
    }
    study.add(fat);
    // Thin anatomical boundaries and the surface's small natural relief.
    for (let k = 0; k < 5; k++) {
      const pts = [];
      for (let i = 0; i <= 80; i++) { const x = -2.7 + i * 5.4 / 80; pts.push(new T.Vector3(x, .55 + k * .036 + ripple(x, 1.22), 1.228)); }
      study.add(new T.Line(new T.BufferGeometry().setFromPoints(pts), new T.LineBasicMaterial({ color: k % 2 ? 0xf1c5b0 : 0xd89385, transparent: true, opacity: .62 })));
    }
    // Studio contact shadow uses a procedural canvas, no texture request.
    const shadowCanvas = document.createElement('canvas'); shadowCanvas.width = 256; shadowCanvas.height = 128;
    const ctx = shadowCanvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(128, 64, 3, 128, 64, 110); gradient.addColorStop(0, 'rgba(129,84,66,0.28)'); gradient.addColorStop(1, 'rgba(129,84,66,0)');
      ctx.fillStyle = gradient; ctx.fillRect(0, 0, 256, 128);
      const shadow = new T.Mesh(new T.PlaneGeometry(8, 4), new T.MeshBasicMaterial({ map: new T.CanvasTexture(shadowCanvas), transparent: true, depthWrite: false }));
      shadow.rotation.x = -Math.PI / 2; shadow.position.y = -1.58; scene.add(shadow);
    }
    const forma = new T.Group(), fx = new T.Group(); study.add(forma, fx);
    function box(parent, w, h, d, x, y, z, material) {
      const r = Math.min(.08, h * .23, w * .23, d * .23), s = new T.Shape();
      const l = -w / 2 + r, b = -h / 2 + r, right = w / 2 - r, top = h / 2 - r;
      s.moveTo(l, b); s.lineTo(right, b); s.lineTo(right, top); s.lineTo(l, top); s.closePath();
      const geometry = new T.ExtrudeGeometry(s, { depth: d - 2 * r, bevelEnabled: true, bevelSegments: 4, steps: 1, bevelSize: r, bevelThickness: r, curveSegments: 8 });
      geometry.translate(0, 0, -d / 2 + r); geometry.computeVertexNormals();
      const mesh = new T.Mesh(geometry, material); mesh.position.set(x, y, z); mesh.castShadow = true; mesh.receiveShadow = true; parent.add(mesh); return mesh;
    }
    // Deliberately generic: only an electrode/contact assembly, clearly captioned.
    box(forma, 1.54, .24, .92, 0, .36, 0, ivory);
    const neckGeometry = new T.CylinderGeometry(.29, .35, .55, 36);
    const neck = new T.Mesh(neckGeometry, ivory); neck.position.set(0, .7, 0); neck.castShadow = true; forma.add(neck);
    box(forma, 1.58, .055, .95, 0, .24, 0, rose);
    for (const x of [-.57, 0, .57]) box(forma, .23, .22, .76, x, .11, 0, silver);
    const glass = mat(0xf8e4dd, { transparent: true, opacity: .26, roughness: .2, depthWrite: false });
    box(fx, 1.72, .18, 1.08, 0, .72, 0, ivory);
    const fxNeck = new T.Mesh(new T.CylinderGeometry(.25, .31, .48, 36), ivory); fxNeck.position.set(0, 1.03, 0); fxNeck.castShadow = true; fx.add(fxNeck);
    box(fx, .17, .65, 1.04, -.775, .33, 0, silver); box(fx, .17, .65, 1.04, .775, .33, 0, silver);
    box(fx, 1.4, .62, .05, 0, .34, -.5, glass);
    // The front is open so the drawn-up skin and contact remain visible.
    const rf = new T.Group(); study.add(rf);
    const arcMaterials = [], rfCurves = [];
    for (let i = 0; i < 5; i++) {
      const pts = [], radius = .42 + i * .095;
      for (let j = 0; j <= 48; j++) { const q = j / 48 * Math.PI; pts.push(new T.Vector3(Math.cos(q) * radius, .55 - Math.sin(q) * (.26 + i * .14), 1.29)); }
      const material = new T.MeshBasicMaterial({ color: linear(i % 2 ? 0xffd6b2 : 0xaa4e42), transparent: true, opacity: 0, depthWrite: false });
      const mesh = new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pts), 48, .012, 5, false), material);
      rf.add(mesh); arcMaterials.push(material); rfCurves.push(mesh);
    }
    const markers = Array.from({ length: 3 }, (_, i) => {
      const dot = new T.Mesh(new T.SphereGeometry(.028, 8, 6), new T.MeshBasicMaterial({ color: 0xfff8e4, transparent: true, opacity: 0 })); rf.add(dot); return dot;
    });
    const projected = new T.Vector3();
    function pin(el, x, y, z) {
      projected.set(x, y, z); study.localToWorld(projected); projected.project(camera);
      const w = view.clientWidth, h = view.clientHeight;
      el.style.left = Math.min(w - el.offsetWidth - 9, (projected.x * .5 + .5) * w) + 'px';
      el.style.top = ((-.5 * projected.y + .5) * h - 9) + 'px';
    }
    const tags = [...view.querySelectorAll('[data-layer]')];
    function resize() {
      const w = view.clientWidth, h = view.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      const width = 7.7, height = width * h / w;
      camera.left = -width / 2; camera.right = width / 2; camera.top = height / 2; camera.bottom = -height / 2; camera.updateProjectionMatrix();
    }
    function draw(t, selected) {
      const fxMode = selected === 'fx';
      const contact = range(t, .25, 1.55) * (1 - range(t, 7.9, 9.2));
      const heat = range(t, 1.8, 2.7) * (1 - range(t, 6.6, 8.1));
      const vacuum = fxMode ? range(t, 1, 2.5) * (1 - range(t, 7.1, 8.7)) : 0;
      const travel = fxMode ? 0 : -.75 + 1.5 * range(t, 1.6, 6.7);
      forma.visible = !fxMode; fx.visible = fxMode;
      const head = fxMode ? fx : forma;
      head.position.set(travel, .73 + (1 - contact) * .72, .2);
      rf.position.x = travel;
      for (const layer of deformable) {
        const pos = layer.g.attributes.position, colors = layer.g.attributes.color;
        for (let i = 0; i < pos.count; i++) {
          const x = layer.source[i * 3], y = layer.source[i * 3 + 1], z = layer.source[i * 3 + 2];
          const weight = clamp((y + .5) / 1.22);
          pos.array[i * 3 + 1] = y + vacuum * .37 * swell(x, z) * weight;
          const zone = Math.exp(-((x - travel) ** 2 / .8 + (z - .4) ** 2 / 2.8)) * clamp((y + .7) / 1.2) * heat * .66;
          colors.array[i * 3] = layer.baseColor.r + (warm.r - layer.baseColor.r) * zone;
          colors.array[i * 3 + 1] = layer.baseColor.g + (warm.g - layer.baseColor.g) * zone;
          colors.array[i * 3 + 2] = layer.baseColor.b + (warm.b - layer.baseColor.b) * zone;
        }
        pos.needsUpdate = true; colors.needsUpdate = true;
      }
      arcMaterials.forEach((m, i) => { m.opacity = heat * (.2 + .28 * (.5 + .5 * Math.sin(t * 2.7 - i * .55))); });
      markers.forEach((dot, i) => {
        const q = ((t * .3 + i / 3) % 1) * Math.PI;
        dot.position.set(Math.cos(q) * .7, .55 - Math.sin(q) * .68, 1.31); dot.material.opacity = heat * .85;
      });
      study.rotation.y = -.055 + .025 * Math.sin(t / 9.6 * Math.PI * 2);
      scene.updateMatrixWorld(true); camera.updateMatrixWorld(true);
      pin(tags[0], 2.72, .64, .9); pin(tags[1], 2.72, .03, 1.13); pin(tags[2], 2.72, -1, 1.2);
      renderer.render(scene, camera);
    }
    resize();
    let ro;
    if ('ResizeObserver' in window) { ro = new ResizeObserver(() => { resize(); draw(skinTime, mode); }); ro.observe(view); }
    const onResize = () => { resize(); draw(skinTime, mode); };
    if (!ro) window.addEventListener('resize', onResize);
    renderer.domElement.addEventListener('webglcontextlost', e => {
      e.preventDefault(); skin.dataset.ready = 'false'; skin.dataset.unavailable = 'true'; sectionVisible = false; cancelAnimationFrame(raf); raf = 0;
      skin.querySelector('.im-stage-detail').textContent = '피부 단면과 오른쪽 설명을 함께 확인해주세요';
      skin.dataset.userPaused = 'true'; skin.dispatchEvent(new CustomEvent('inmode:playback'));
    });
    skin.dataset.ready = 'true';
    return { draw, resize, renderer, scene, dispose() { ro?.disconnect(); window.removeEventListener('resize', onResize); renderer.dispose(); } };
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
    const config = areaData[area];
    const reveal = range(t, .12, 1.65), label = range(t, .7, 2.2), follow = range(t, 1.2, 2.45);
    const g = face.querySelector('.im-line-' + area);
    g.querySelector('.im-map-wash').style.opacity = (.02 + .065 * reveal).toFixed(3);
    g.querySelector('.im-map-trace').style.strokeDashoffset = String(1 - reveal);
    g.querySelector('.im-map-base').style.opacity = String(.14 * reveal);
    const tip = g.querySelector('.im-map-tip');
    tip.style.strokeDashoffset = String(1 - reveal); tip.style.opacity = String(Math.sin(Math.PI * reveal) * .85);
    const leader = face.querySelector('.im-map-leader');
    const endY = (face.querySelector('.im-face-caption').offsetTop + 10) / face.clientWidth * 1086;
    const [ax, ay] = config.anchor;
    leader.setAttribute('d', `M${ax} ${ay} C${ax + 65} ${ay + 100} 790 ${endY - 170} 800 ${endY - 65} L800 ${endY}`);
    leader.style.strokeDashoffset = String(1 - follow);
    face.querySelectorAll('.im-map-ring,.im-map-dot').forEach(el => {
      el.setAttribute('cx', config.anchor[0]); el.setAttribute('cy', config.anchor[1]); el.style.opacity = String(range(t, .95, 1.7));
    });
    face.querySelector('.im-face-plane').style.transform = `scale(${1 + .025 * range(t, 0, 2.8)})`;
    const caption = face.querySelector('.im-face-caption');
    caption.style.opacity = String(.55 + .45 * label); caption.style.transform = `translateY(${(1 - label) * 8}px)`;
    face.querySelector('.im-face-caption-rule').style.transform = `scaleX(${label})`;
    face.querySelector('.im-face-count').textContent = '0' + config.n + ' / 03';
    const button = root.querySelector(`.im-area-options [data-area="${area}"]`);
    face.querySelector('.im-face-label').textContent = button.querySelector('span').textContent;
    face.querySelector('.im-face-description').textContent = button.querySelector('small').textContent;
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
