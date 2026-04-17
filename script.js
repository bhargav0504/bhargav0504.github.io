/* ═══════════════════════════════════════════════════════════════
   BHARGAV AMIN — Neural Interface Portfolio
   All JavaScript — hand-crafted, zero libraries except Three.js + GSAP
═══════════════════════════════════════════════════════════════ */

const GITHUB_USER = 'bhargav0504';

/* ── Reveal on scroll ────────────────────────────────────────── */
const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('on'); revealObs.unobserve(e.target); }
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ── Navbar ──────────────────────────────────────────────────── */
const nav    = document.getElementById('nav');
const burger = document.getElementById('burger');
const navList = document.getElementById('navList');

window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
});

burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    navList.classList.toggle('open');
});
navList.querySelectorAll('.nav-item').forEach(a => {
    a.addEventListener('click', () => { burger.classList.remove('open'); navList.classList.remove('open'); });
});

/* Active nav link */
const navLinks = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('section[id]');
const secObs   = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            navLinks.forEach(l => {
                l.classList.toggle('active', l.getAttribute('href') === `#${e.target.id}`);
            });
        }
    });
}, { rootMargin: '-15% 0px -75% 0px' });
sections.forEach(s => secObs.observe(s));

/* ════════════════════════════════ HERO BOOT SEQUENCE ═══════════ */
function runBoot() {
    const cmd       = document.getElementById('bootCmd');
    const output    = document.getElementById('bootOutput');
    const nameEl    = document.getElementById('heroName');
    const roleEl    = document.getElementById('heroRole');
    const bioEl     = document.getElementById('heroBio');
    const actionsEl = document.getElementById('heroActions');
    const linksEl   = document.getElementById('heroLinks');
    const pbars     = document.querySelectorAll('.pbar');

    const BOOT_CMD = 'python3 portfolio.py --user bhargav_amin';
    let i = 0;

    function typeCmd() {
        if (i < BOOT_CMD.length) {
            cmd.textContent += BOOT_CMD[i++];
            setTimeout(typeCmd, 38 + Math.random() * 25);
        } else {
            setTimeout(showOutput, 220);
        }
    }

    function fillBar(el) {
        const full = '████████████';
        let n = 0;
        const t = setInterval(() => {
            el.textContent = full.slice(0, ++n) + '░'.repeat(12 - n);
            if (n >= 12) clearInterval(t);
        }, 55);
    }

    function showOutput() {
        output.style.display = 'block';
        pbars.forEach((b, i) => setTimeout(() => fillBar(b), i * 350));
        setTimeout(showHero, pbars.length * 350 + 500);
    }

    function showHero() {
        nameEl.style.opacity    = '1';
        setTimeout(() => { roleEl.style.opacity    = '1'; startTyper(); }, 220);
        setTimeout(() => { bioEl.style.opacity     = '1'; }, 480);
        setTimeout(() => { actionsEl.style.opacity = '1'; }, 700);
        setTimeout(() => { linksEl.style.opacity   = '1'; }, 880);
    }

    setTimeout(typeCmd, 400);
}

/* ── Role typewriter ─────────────────────────────────────────── */
const ROLES = ['Data Scientist', 'ML Engineer', 'AI / LLM Developer', 'Time-Series Forecaster', 'Data Engineer'];
let rIdx = 0, rChar = 0, rDel = false;

function startTyper() {
    const el = document.getElementById('roleText');
    if (!el) return;
    function tick() {
        const word = ROLES[rIdx];
        if (!rDel) {
            el.textContent = word.slice(0, ++rChar);
            if (rChar === word.length) { rDel = true; setTimeout(tick, 1800); return; }
        } else {
            el.textContent = word.slice(0, --rChar);
            if (rChar === 0) { rDel = false; rIdx = (rIdx + 1) % ROLES.length; }
        }
        setTimeout(tick, rDel ? 55 : 85);
    }
    tick();
}

/* ════════════════════════════════ SKILL CODE TYPER ════════════ */
const SKILL_LINES = [
    ['comment', '# bhargav_amin / requirements.txt'],
    ['comment', '# python 3.11  |  last sync: 2025'],
    ['blank', ''],
    ['comment', '>>> import languages'],
    ['ok-pkg', '  ✓ python          ████████████  expert'],
    ['ok-pkg', '  ✓ sql             ██████████░░  advanced'],
    ['ok-pkg', '  ✓ c++             ████████░░░░  proficient'],
    ['ok-pkg', '  ✓ sas             ██████░░░░░░  familiar'],
    ['blank', ''],
    ['comment', '>>> import ml_stack'],
    ['ok-pkg', '  ✓ tensorflow      ████████████  expert'],
    ['ok-pkg', '  ✓ scikit_learn    ████████████  expert'],
    ['ok-pkg', '  ✓ opencv          ████████░░░░  advanced'],
    ['ok-pkg', '  ✓ pandas / numpy  ████████████  expert'],
    ['blank', ''],
    ['comment', '>>> import cloud_infra'],
    ['ok-pkg', '  ✓ gcp_vertex_ai   ████████████  advanced'],
    ['ok-pkg', '  ✓ microsoft_azure ████████████  advanced'],
    ['ok-pkg', '  ✓ docker          ████████░░░░  advanced'],
    ['ok-pkg', '  ✓ apache_airflow  ██████████░░  advanced'],
    ['blank', ''],
    ['comment', '>>> import genai_stack'],
    ['ok-pkg', '  ✓ langraph        ████████████  advanced'],
    ['ok-pkg', '  ✓ chromadb        ████████████  advanced'],
    ['ok-pkg', '  ✓ huggingface     ████████░░░░  advanced'],
    ['ok-pkg', '  ✓ openai_api      ████████████  proficient'],
    ['blank', ''],
    ['comment', '# all packages installed successfully ✓'],
];

function typeSkills() {
    const box   = document.getElementById('skillCode');
    if (!box) return;

    let lineIdx = 0;

    const obs = new IntersectionObserver(entries => {
        if (!entries[0].isIntersecting) return;
        obs.disconnect();
        writeNextLine();
    }, { threshold: 0.2 });
    obs.observe(box);

    function writeNextLine() {
        if (lineIdx >= SKILL_LINES.length) return;
        const [type, text] = SKILL_LINES[lineIdx++];
        const span = document.createElement('span');
        if      (type === 'comment') span.style.cssText = 'color:var(--dim)';
        else if (type === 'ok-pkg')  span.style.cssText = 'color:var(--text-1)';
        else                          span.style.cssText = '';
        box.appendChild(span);
        box.appendChild(document.createTextNode('\n'));

        let ci = 0;
        const delay = type === 'blank' ? 0 : 14;
        function typeChar() {
            if (ci < text.length) { span.textContent += text[ci++]; setTimeout(typeChar, delay); }
            else { setTimeout(writeNextLine, type === 'blank' ? 30 : 55); }
        }
        typeChar();
    }
}

/* ════════════════════════════════ GSAP ANIMATIONS ═════════════ */
function initGSAP() {
    if (typeof gsap === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    /* Set initial hidden state for GSAP-animated elements */
    gsap.set('.nb-pair, .bench-card, .cert-row', { opacity: 0, y: 28 });

    /* Animated counters */
    document.querySelectorAll('.count').forEach(el => {
        const to = parseInt(el.dataset.to, 10);
        gsap.fromTo({ v: 0 }, { v: to }, {
            duration: 2.2, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
            onUpdate() { el.textContent = Math.round(this.targets()[0].v); },
        });
    });

    /* Skill bars */
    document.querySelectorAll('.sb-item').forEach(item => {
        const fill = item.querySelector('.sb-fill');
        const pct  = item.dataset.pct + '%';
        gsap.to(fill, {
            width: pct, duration: 1.3, ease: 'power2.out',
            scrollTrigger: { trigger: item, start: 'top 88%' },
        });
    });

    /* Epoch blocks stagger */
    gsap.set('.epoch-block', { x: -30, opacity: 0 });
    gsap.to('.epoch-block', {
        x: 0, opacity: 1, duration: .65, stagger: .18, ease: 'power3.out',
        scrollTrigger: { trigger: '.train-log', start: 'top 82%' },
    });

    /* Notebook pairs stagger */
    gsap.to('.nb-pair', {
        y: 0, opacity: 1, duration: .65, stagger: .2, ease: 'power3.out',
        scrollTrigger: { trigger: '.notebook', start: 'top 82%' },
    });

    /* Bench cards */
    gsap.to('.bench-card', {
        y: 0, opacity: 1, duration: .55, stagger: .12, ease: 'power2.out',
        scrollTrigger: { trigger: '.bench-grid', start: 'top 82%' },
    });

    /* Cert rows */
    gsap.set('.cert-row', { x: -20 });
    gsap.to('.cert-row', {
        x: 0, opacity: 1, duration: .45, stagger: .07, ease: 'power2.out',
        scrollTrigger: { trigger: '.cert-list', start: 'top 85%' },
    });
}

/* ════════════════════════════════ PARTICLE MORPH HERO ═════════ */
function initParticleMorph() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const W = () => window.innerWidth;
    const H = () => window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(W(), H());

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W() / H(), 0.1, 100);
    camera.position.z = 14;

    const N = 3000;

    /* Shape generators */
    function shapeScatter() {
        const a = new Float32Array(N * 3);
        for (let i = 0; i < N; i++) {
            const r = Math.pow(Math.random(), 0.5) * 11;
            const θ = Math.random() * Math.PI * 2;
            const φ = Math.acos(2 * Math.random() - 1);
            a[i*3]   = r * Math.sin(φ) * Math.cos(θ);
            a[i*3+1] = r * Math.sin(φ) * Math.sin(θ) * 0.55;
            a[i*3+2] = r * Math.cos(φ) * 0.45;
        }
        return a;
    }

    function shapeText(str) {
        const c = document.createElement('canvas');
        c.width = 880; c.height = 280;
        const ctx = c.getContext('2d');
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 200px Space Grotesk, Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(str, 440, 140);
        const px = ctx.getImageData(0, 0, c.width, c.height).data;
        const pool = [];
        for (let y = 0; y < c.height; y += 4) {
            for (let x = 0; x < c.width; x += 4) {
                if (px[(y * c.width + x) * 4 + 3] > 100) {
                    pool.push((x / c.width - 0.5) * 18, -(y / c.height - 0.5) * 5.6, 0);
                }
            }
        }
        const a = new Float32Array(N * 3);
        for (let i = 0; i < N; i++) {
            const j = Math.floor(Math.random() * (pool.length / 3)) * 3;
            a[i*3]   = pool[j]   + (Math.random() - 0.5) * 0.3;
            a[i*3+1] = pool[j+1] + (Math.random() - 0.5) * 0.3;
            a[i*3+2] = (Math.random() - 0.5) * 1.8;
        }
        return a;
    }

    function shapeNeuralNet() {
        const layers = [
            { x: -7,   n: 3 }, { x: -3.5, n: 6 }, { x: 0, n: 8 },
            { x:  3.5, n: 6 }, { x:  7,   n: 3 },
        ];
        const a = new Float32Array(N * 3);
        for (let i = 0; i < N; i++) {
            const L    = layers[Math.floor(Math.random() * layers.length)];
            const node = Math.floor(Math.random() * L.n);
            const ny   = (node - (L.n - 1) / 2) * 1.55;
            a[i*3]   = L.x + (Math.random() - 0.5) * 0.38;
            a[i*3+1] = ny  + (Math.random() - 0.5) * 0.38;
            a[i*3+2] = (Math.random() - 0.5) * 0.9;
        }
        return a;
    }

    function shapeGalaxy() {
        const a = new Float32Array(N * 3);
        for (let i = 0; i < N; i++) {
            const arm = i % 3;
            const t   = Math.pow(Math.random(), 0.55);
            const r   = t * 9.5;
            const θ   = t * 4.2 * Math.PI + (arm / 3) * Math.PI * 2;
            const sc  = (1 - t) * 0.6 + 0.12;
            a[i*3]   = Math.cos(θ) * r + (Math.random() - 0.5) * sc * 2;
            a[i*3+1] = Math.sin(θ) * r * 0.38 + (Math.random() - 0.5) * sc;
            a[i*3+2] = (Math.random() - 0.5) * sc * 4;
        }
        return a;
    }

    /* Pre-bake */
    const SHAPES = {
        scatter: shapeScatter(),
        text:    shapeText('BA'),
        neural:  shapeNeuralNet(),
        galaxy:  shapeGalaxy(),
    };
    const SEQ    = ['scatter', 'text', 'neural', 'galaxy'];
    const TIMING = [[1400, 1.9], [4000, 2.2], [4000, 2.2], [4000, 2.2]];
    const SCOL   = {
        scatter: [0.15, 0.5, 1.0],
        text:    [0.48, 0.82, 1.0],
        neural:  [0.6,  0.3,  1.0],
        galaxy:  [0.18, 0.9,  0.52],
    };

    const posArr = new Float32Array(N * 3);
    const colArr = new Float32Array(N * 3);
    posArr.set(SHAPES.scatter);
    const [r0,g0,b0] = SCOL.scatter;
    for (let i = 0; i < N; i++) { colArr[i*3]=r0; colArr[i*3+1]=g0; colArr[i*3+2]=b0; }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(colArr, 3));
    const mat = new THREE.PointsMaterial({ size: 0.06, vertexColors: true, transparent: true, opacity: 0.72, sizeAttenuation: true });
    scene.add(new THREE.Points(geo, mat));

    const startArr = new Float32Array(N * 3);
    const endArr   = new Float32Array(N * 3);
    let morphT = 1, isMorphing = false, seqIdx = 0;
    let sCol = [...SCOL.scatter], eCol = [...SCOL.scatter];

    function morphTo(name, dur) {
        startArr.set(posArr); endArr.set(SHAPES[name]);
        sCol = [...eCol];            // start from where we currently are
        eCol = [...SCOL[name]];      // morph toward the new shape's colour
        morphT = 0; isMorphing = true;
        if (typeof gsap !== 'undefined') {
            gsap.to({ t: 0 }, {
                t: 1, duration: dur, ease: 'power2.inOut',
                onUpdate() { morphT = this.targets()[0].t; },
                onComplete() { isMorphing = false; },
            });
        } else { morphT = 1; isMorphing = false; }
    }

    function nextShape() {
        seqIdx = (seqIdx + 1) % SEQ.length;
        const [hold, dur] = TIMING[seqIdx];
        morphTo(SEQ[seqIdx], dur);
        setTimeout(nextShape, hold + dur * 1000);
    }
    setTimeout(nextShape, TIMING[0][0]);

    let mx = 0, my = 0;
    window.addEventListener('mousemove', e => {
        mx = (e.clientX / W() - 0.5) * 2.8;
        my = -(e.clientY / H() - 0.5) * 1.6;
    });

    let clock = 0;
    (function animate() {
        requestAnimationFrame(animate);
        clock += 0.006;

        for (let i = 0; i < N * 3; i++) {
            posArr[i] = startArr[i] + (endArr[i] - startArr[i]) * morphT;
        }
        geo.attributes.position.needsUpdate = true;

        if (isMorphing) {
            for (let i = 0; i < N; i++) {
                colArr[i*3]   = sCol[0] + (eCol[0] - sCol[0]) * morphT;
                colArr[i*3+1] = sCol[1] + (eCol[1] - sCol[1]) * morphT;
                colArr[i*3+2] = sCol[2] + (eCol[2] - sCol[2]) * morphT;
            }
            geo.attributes.color.needsUpdate = true;
        }

        /* Subtle breathing wave */
        for (let i = 0; i < N; i++) {
            posArr[i*3+1] += Math.sin(clock + i * 0.07) * 0.0004;
        }

        camera.position.x += (mx - camera.position.x) * 0.04;
        camera.position.y += (my - camera.position.y) * 0.04;
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
    }());

    window.addEventListener('resize', () => {
        renderer.setSize(W(), H());
        camera.aspect = W() / H();
        camera.updateProjectionMatrix();
    });
}

/* ════════════════════════════════ 3D ML DATA PIPELINE ═════════ */
function initDataPipeline() {
    const container = document.getElementById('pipelineCanvas');
    if (!container || typeof THREE === 'undefined') return;

    const getW = () => container.clientWidth;
    const getH = () => container.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(getW(), getH());
    container.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, getW() / getH(), 0.1, 100);
    camera.position.set(0, 5.5, 17);
    camera.lookAt(0, 0, 0);

    /* Lighting */
    scene.add(new THREE.AmbientLight(0x0d1117, 1));
    const key = new THREE.DirectionalLight(0x00d4ff, 3.5);
    key.position.set(4, 8, 10);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xb94dff, 2);
    rim.position.set(-8, -2, 4);
    scene.add(rim);

    /* Nodes */
    const NODES = [
        { label: 'Raw Data',    sub: 'Sources',      col: 0x8b949e, geo: new THREE.CylinderGeometry(.75, .95, 1.3, 8) },
        { label: 'Apache NiFi', sub: 'Ingest & ETL', col: 0x9C4AB5, geo: new THREE.BoxGeometry(1.5, 1.5, 1.5) },
        { label: 'Airflow',     sub: 'Orchestrate',  col: 0x017CEE, geo: new THREE.OctahedronGeometry(1.0) },
        { label: 'ML Model',    sub: 'Train & Eval', col: 0xb94dff, geo: new THREE.IcosahedronGeometry(1.0, 1) },
        { label: 'Vertex AI',   sub: 'Deploy',       col: 0x4285F4, geo: new THREE.SphereGeometry(.9, 20, 20) },
        { label: 'Dashboard',   sub: '+3% Sales ✓',  col: 0x00ff88, geo: new THREE.BoxGeometry(2.0, 1.2, 0.14) },
    ];

    function makeLabel(line1, line2) {
        const c   = document.createElement('canvas');
        c.width = 300; c.height = 80;
        const ctx = c.getContext('2d');
        ctx.fillStyle = 'rgba(4,9,15,0.9)';
        ctx.beginPath();
        const rr = 10;
        ctx.moveTo(rr,0); ctx.lineTo(c.width-rr,0);
        ctx.arcTo(c.width,0,c.width,rr,rr); ctx.lineTo(c.width,c.height-rr);
        ctx.arcTo(c.width,c.height,c.width-rr,c.height,rr); ctx.lineTo(rr,c.height);
        ctx.arcTo(0,c.height,0,c.height-rr,rr); ctx.lineTo(0,rr);
        ctx.arcTo(0,0,rr,0,rr); ctx.closePath(); ctx.fill();
        ctx.strokeStyle = 'rgba(0,212,255,0.4)';
        ctx.lineWidth = 2; ctx.stroke();
        ctx.fillStyle = '#eaf7ff';
        ctx.font = 'bold 26px Space Grotesk, Arial';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(line1, 150, 26);
        ctx.fillStyle = '#00d4ff';
        ctx.font = '18px Space Grotesk, Arial';
        ctx.fillText(line2, 150, 56);
        const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(c), transparent: true }));
        sp.scale.set(3.5, 0.95, 1);
        return sp;
    }

    const _sv       = new THREE.Vector3();
    const nodeMeshes = [];
    const spacing    = 3.2;
    const totalW     = spacing * (NODES.length - 1);

    NODES.forEach((n, i) => {
        const mat  = new THREE.MeshStandardMaterial({ color: n.col, roughness: .28, metalness: .55, emissive: n.col, emissiveIntensity: .18 });
        const mesh = new THREE.Mesh(n.geo, mat);
        mesh.position.set(i * spacing - totalW / 2, 0, 0);
        scene.add(mesh);
        nodeMeshes.push(mesh);

        const lbl = makeLabel(n.label, n.sub);
        lbl.position.set(mesh.position.x, 2.35, 0);
        scene.add(lbl);
    });

    /* Connections + animated data packets */
    const PATHS   = [];
    const PACKETS = [];
    const pkGeo   = new THREE.SphereGeometry(.14, 8, 8);
    const PCOLORS = [0x00d4ff, 0xb94dff, 0x00ff88, 0xff8c42, 0xff4060];

    for (let i = 0; i < NODES.length - 1; i++) {
        const ax = nodeMeshes[i].position.x + 1.1;
        const bx = nodeMeshes[i+1].position.x - 1.1;
        const curve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(ax, 0, 0),
            new THREE.Vector3((ax+bx)/2, 0.9, 0.7),
            new THREE.Vector3(bx, 0, 0),
        ]);
        PATHS.push(curve);

        scene.add(new THREE.Mesh(
            new THREE.TubeGeometry(curve, 24, .055, 6, false),
            new THREE.MeshStandardMaterial({
                color: 0x0e2236, emissive: new THREE.Color(PCOLORS[i % PCOLORS.length]),
                emissiveIntensity: .35, transparent: true, opacity: .55,
            })
        ));

        for (let k = 0; k < 2; k++) {
            const mesh = new THREE.Mesh(pkGeo, new THREE.MeshBasicMaterial({ color: PCOLORS[(i+k) % PCOLORS.length] }));
            scene.add(mesh);
            PACKETS.push({ mesh, path: curve, t: k * 0.5, speed: .004 + Math.random() * .003 });
        }
    }

    /* Grid floor */
    const _grid = new THREE.GridHelper(32, 28, 0x0e2236, 0x091521);
    _grid.position.y = -1.9;
    scene.add(_grid);

    /* Interaction */
    let hoverNode = -1, isHovering = false, camAngle = 0;
    const raycaster = new THREE.Raycaster();
    const mouse2    = new THREE.Vector2();

    container.addEventListener('mouseenter', () => { isHovering = true; });
    container.addEventListener('mouseleave', () => { isHovering = false; hoverNode = -1; });
    container.addEventListener('mousemove', e => {
        const rect = container.getBoundingClientRect();
        mouse2.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
        mouse2.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouse2, camera);
        const hits = raycaster.intersectObjects(nodeMeshes);
        hoverNode = hits.length ? nodeMeshes.indexOf(hits[0].object) : -1;
    });

    let clock = 0;
    (function animate() {
        requestAnimationFrame(animate);
        clock += 0.01;

        if (!isHovering) camAngle += 0.0015;
        camera.position.x = Math.sin(camAngle) * 2.5;
        camera.position.z = 17 + Math.cos(camAngle * 0.7) * 1.8;
        camera.lookAt(0.5, 0, 0);

        PACKETS.forEach(p => {
            p.t += p.speed;
            if (p.t > 1) p.t = 0;
            p.path.getPoint(p.t, p.mesh.position);
            p.mesh.scale.setScalar(1 + Math.sin(p.t * Math.PI * 4) * 0.35);
        });

        nodeMeshes.forEach((m, i) => {
            const isHit = hoverNode === i;
            m.material.emissiveIntensity += ((isHit ? 0.9 : 0.18 + Math.sin(clock * 1.2 + i) * 0.06) - m.material.emissiveIntensity) * 0.1;
            _sv.setScalar(isHit ? 1.12 : 1 + Math.sin(clock + i * 0.9) * 0.018);
            m.scale.lerp(_sv, 0.1);
            m.rotation.y += 0.008;
        });

        renderer.render(scene, camera);
    }());

    new ResizeObserver(() => {
        renderer.setSize(getW(), getH());
        camera.aspect = getW() / getH();
        camera.updateProjectionMatrix();
    }).observe(container);
}

/* ════════════════════════════════ GITHUB API ═══════════════════ */
const LANG_COLORS = {
    Python:'#3572A5', JavaScript:'#f1e05a', TypeScript:'#2b7489',
    HTML:'#e34c26', CSS:'#563d7c', Java:'#b07219', 'C++':'#f34b7d',
    C:'#555555', 'C#':'#178600', Go:'#00ADD8', Rust:'#dea584',
    Ruby:'#701516', PHP:'#4F5D95', Swift:'#ffac45', Kotlin:'#F18E33',
    R:'#198CE7', 'Jupyter Notebook':'#DA5B0B', Shell:'#89e051',
};

function esc(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function buildRepoCard(repo) {
    const a    = document.createElement('a');
    a.href     = repo.html_url;
    a.target   = '_blank';
    a.rel      = 'noopener noreferrer';
    a.className = 'repo-card';

    const langHTML = repo.language ? `
        <span class="repo-lang">
            <span class="lang-dot" style="background:${LANG_COLORS[repo.language] || '#8b949e'}"></span>
            ${esc(repo.language)}
        </span>` : '';

    const starsHTML = repo.stargazers_count > 0 ? `
        <span class="repo-stat">
            <svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/></svg>
            ${repo.stargazers_count}
        </span>` : '';

    a.innerHTML = `
        <div class="repo-top">
            <svg class="repo-ico" viewBox="0 0 16 16" fill="currentColor" width="15" height="15">
                <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8Z"/>
            </svg>
            <span class="repo-name">${esc(repo.name)}</span>
        </div>
        <p class="repo-desc ${repo.description ? '' : 'repo-desc-empty'}">${repo.description ? esc(repo.description) : 'No description.'}</p>
        <div class="repo-footer">${langHTML}${starsHTML}</div>`;

    return a;
}

async function loadGitHub() {
    const grid = document.getElementById('reposGrid');
    const err  = document.getElementById('reposErr');
    if (!grid) return;

    try {
        const res = await fetch(
            `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100&type=public`,
            { headers: { Accept: 'application/vnd.github+json' } }
        );
        if (!res.ok) throw new Error(res.status);
        const repos = (await res.json()).filter(r => !r.fork);

        grid.innerHTML = '';

        if (!repos.length) {
            grid.innerHTML = '<p style="color:var(--text-2);font-family:var(--mono);font-size:.82rem;padding:2rem">No public repositories found.</p>';
            return;
        }

        repos.forEach((r, i) => {
            const card = buildRepoCard(r);
            // Start invisible, then fade in with stagger — no IntersectionObserver needed
            card.style.opacity   = '0';
            card.style.transform = 'translateY(14px)';
            card.style.transition = `opacity .4s ease ${i * 45}ms, transform .4s ease ${i * 45}ms`;
            grid.appendChild(card);

            // Double rAF guarantees the browser has painted opacity:0 before we flip to 1
            requestAnimationFrame(() => requestAnimationFrame(() => {
                card.style.opacity   = '1';
                card.style.transform = 'none';
            }));
        });
    } catch (e) {
        console.error('GitHub fetch failed:', e);
        grid.innerHTML = '';
        if (err) err.style.display = 'block';
    }
}

/* ════════════════════════════════ BOOT ═════════════════════════ */
runBoot();
typeSkills();
initGSAP();
document.fonts.ready.then(() => initParticleMorph());
initDataPipeline();
loadGitHub();
