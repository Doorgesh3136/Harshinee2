/* =============================================================================
   Harshinee Fashion: the silk dupatta
   A shot-silk cloth with a zari border, rendered in Three.js.
   - Colour shifts with the viewing angle, like real two-tone (dhoop-chhaon) silk
   - Gold zari border and buttis are drawn procedurally in the shader
   - Ripples under the cursor, flutters with scroll speed
   - Changes fabric per section (listens for `hf:palette`)
   ============================================================================= */
import * as THREE from 'three';

const canvas = document.getElementById('silk');
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const SMALL = matchMedia('(max-width: 768px)').matches;
const ready = () => { document.documentElement.classList.add('silk-ready'); window.dispatchEvent(new Event('hf:silk-ready')); };

/* Fabric palettes: [face colour, shot colour, zari] */
const PALETTES = {
    sindoor: ['#8E0A22', '#E2512A', '#E2BA62'],
    plum:    ['#3A0830', '#A21E58', '#D9B25F'],
    mehendi: ['#123A26', '#5E8A3A', '#E0C070'],
    kesar:   ['#4A1A04', '#B8621A', '#E8C470']
};

/* each page drapes the cloth differently */
const POSES = {
    home:          { rx: -0.42, ry: 0.18,  rz: 0.12,  x: 0.9 },
    collection:    { rx: -0.85, ry: -0.15, rz: -0.08, x: 0 },
    'bride-groom': { rx: -0.3,  ry: 0.4,   rz: 0.32,  x: -0.6 },
    visit:         { rx: -0.55, ry: -0.35, rz: -0.22, x: 0.5 }
};

function init() {
    let renderer;
    try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: !SMALL, alpha: true, powerPreference: 'high-performance' });
    } catch (e) {
        document.documentElement.classList.add('no-webgl');
        ready();
        return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, SMALL ? 1.25 : 1.75));
    renderer.setSize(innerWidth, innerHeight, false);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, innerWidth / innerHeight, 0.1, 50);
    camera.position.set(0, 0, 7.2);

    /* ---------------------------------------------------------------- cloth */
    const seg = SMALL ? [96, 64] : [230, 150];
    const geo = new THREE.PlaneGeometry(10, 6.2, seg[0], seg[1]);

    const p0 = PALETTES.sindoor;
    const uniforms = {
        uTime:   { value: 0 },
        uMouse:  { value: new THREE.Vector2(0, 0) },
        uPress:  { value: 0 },
        uAmp:    { value: 1 },
        uFlutter:{ value: 0 },
        uA:      { value: new THREE.Color(p0[0]) },
        uB:      { value: new THREE.Color(p0[1]) },
        uGold:   { value: new THREE.Color(p0[2]) },
        uReveal: { value: REDUCED ? 1 : 0 }
    };

    const vertexShader = /* glsl */`
        uniform float uTime, uPress, uAmp, uFlutter, uReveal;
        uniform vec2 uMouse;
        varying vec2 vUv;
        varying vec3 vN;
        varying vec3 vView;
        varying float vH;

        float drape(vec2 p) {
            float t = uTime;
            float v = sin(p.x * 0.85 + t * 0.55) * 0.34;
            v += sin(p.y * 1.6 - t * 0.42 + p.x * 0.55) * 0.17;
            v += sin((p.x * 1.3 - p.y * 0.8) * 2.0 + t * 0.9) * 0.06;
            v += sin(p.x * 4.1 + p.y * 1.2 + t * 1.6) * (0.015 + uFlutter * 0.05);
            v += sin(p.y * 5.0 - t * 2.4 + p.x * 2.0) * uFlutter * 0.04;

            /* the cursor lifts the cloth and sends a soft ripple out */
            vec2 d = p - uMouse;
            float r = length(d);
            v += uPress * exp(-r * r * 0.8) * 0.42;
            v += uPress * exp(-r * 0.7) * sin(r * 5.5 - t * 3.2) * 0.045;

            /* unfurl: the cloth starts gathered along one edge */
            float unf = 1.0 - smoothstep(uReveal * 16.0 - 6.0, uReveal * 16.0 - 3.0, p.x + 5.0);
            v += (1.0 - unf) * sin(p.x * 3.0) * 0.6;
            return v * uAmp;
        }

        void main() {
            vUv = uv;
            vec3 pos = position;
            float e = 0.02;
            float h  = drape(pos.xy);
            float hx = drape(pos.xy + vec2(e, 0.0));
            float hy = drape(pos.xy + vec2(0.0, e));
            vec3 n = normalize(vec3(-(hx - h) / e, -(hy - h) / e, 1.0));
            pos.z += h;
            vH = h;
            vec4 mv = modelViewMatrix * vec4(pos, 1.0);
            vView = -mv.xyz;
            vN = normalize(normalMatrix * n);
            gl_Position = projectionMatrix * mv;
        }
    `;

    const fragmentShader = /* glsl */`
        uniform vec3 uA, uB, uGold;
        uniform float uTime, uReveal;
        varying vec2 vUv;
        varying vec3 vN;
        varying vec3 vView;
        varying float vH;

        float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float aa(float d, float w) { return 1.0 - smoothstep(-w, w, d); }

        /* a small paisley-ish butti: a teardrop made of a circle and a tail */
        float butti(vec2 p, float rot) {
            float c = cos(rot), s = sin(rot);
            p = mat2(c, -s, s, c) * p;
            float body = length(p * vec2(1.0, 1.25)) - 0.16;
            vec2 q = p - vec2(0.09, 0.14);
            float tail = length(q * vec2(2.2, 1.0)) - 0.06;
            return min(body, tail);
        }

        void main() {
            vec3 N = normalize(vN);
            if (!gl_FrontFacing) N = -N;
            vec3 V = normalize(vView);
            vec3 L1 = normalize(vec3(-0.45, 0.65, 0.75));
            vec3 L2 = normalize(vec3(0.8, -0.25, 0.45));
            float ndv = clamp(dot(N, V), 0.0, 1.0);

            /* shot silk: warp and weft are different colours, the angle decides which you see */
            vec3 base = mix(uB, uA, smoothstep(0.25, 0.97, ndv));
            float diff = 0.30 + 0.70 * max(dot(N, L1), 0.0) + 0.22 * max(dot(N, L2), 0.0);

            /* anisotropic sheen running along the threads (Kajiya-Kay) */
            vec3 T = normalize(cross(N, vec3(0.0, 1.0, 0.0)) + 1e-4);
            vec3 H = normalize(L1 + V);
            float th = dot(T, H);
            float sheen = pow(sqrt(max(1.0 - th * th, 0.0)), 70.0);
            vec3 H2 = normalize(L2 + V);
            float th2 = dot(T, H2);
            float sheen2 = pow(sqrt(max(1.0 - th2 * th2, 0.0)), 40.0);

            /* ---- zari border along the long edges ---- */
            float edge = min(vUv.y, 1.0 - vUv.y);
            float w = fwidth(edge) * 1.2;
            float band = aa(edge - 0.105, w);
            float rule1 = aa(abs(edge - 0.098) - 0.0035, w);
            float rule2 = aa(abs(edge - 0.018) - 0.0025, w);
            float bx = vUv.x * 46.0;
            float bw = fwidth(bx) * 1.5;
            vec2 cell = vec2(fract(bx) - 0.5, (edge - 0.058) / 0.034);
            float diamond = aa(abs(cell.x) + abs(cell.y) * 0.5 - 0.36, bw);
            float hollow = aa(abs(cell.x) + abs(cell.y) * 0.5 - 0.18, bw);
            float motif = diamond * (1.0 - hollow * 0.85);
            float zari = clamp(band * (0.18 + 0.82 * motif) + rule1 + rule2, 0.0, 1.0);

            /* ---- small buttis scattered across the field ---- */
            vec2 g = vUv * vec2(24.0, 14.0);
            float gw = max(fwidth(g.x), fwidth(g.y)) * 1.4;   /* derivatives of the continuous coords: no seams */
            float rowOdd = mod(floor(g.y), 2.0);
            g.x += rowOdd * 0.5;
            vec2 id = floor(g);
            vec2 f = fract(g) - 0.5;
            float rnd = hash(id);
            float bt = aa(butti(f * 2.2, rnd * 6.283) / 2.2, gw);
            bt *= step(0.14, edge) * step(0.55, rnd);
            zari = max(zari, bt * 0.85);

            vec3 col = base * diff;
            col += mix(uB, vec3(1.0, 0.85, 0.75), 0.45) * sheen * 0.55;
            col += uA * sheen2 * 0.25;

            float spec = pow(max(dot(N, H), 0.0), 48.0);
            vec3 gold = uGold * (0.35 + 0.95 * max(dot(N, L1), 0.0))
                      + vec3(1.0, 0.88, 0.6) * spec * 1.4
                      + uGold * sheen * 0.9;
            col = mix(col, gold, zari);

            /* deeper colour in the folds */
            col *= 0.68 + 0.32 * smoothstep(-0.45, 0.35, vH);

            /* tiny glints of gold thread catching the light */
            float glint = step(0.997, hash(floor(vUv * vec2(600.0, 380.0)) + floor(uTime * 2.0)));
            col += glint * zari * 0.9;

            col = pow(col, vec3(1.0 / 2.2));
            gl_FragColor = vec4(col, 1.0);
        }
    `;

    const mat = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader, side: THREE.DoubleSide });
    const cloth = new THREE.Mesh(geo, mat);
    cloth.rotation.set(-0.42, 0.18, 0.12);
    cloth.position.set(SMALL ? 0 : 0.9, -0.2, 0);
    scene.add(cloth);

    /* ---------------------------------------------------------------- gold dust */
    const N = SMALL ? 90 : 260;
    const dustGeo = new THREE.BufferGeometry();
    const pos = new Float32Array(N * 3);
    const seed = new Float32Array(N);
    for (let i = 0; i < N; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 14;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 9;
        pos[i * 3 + 2] = Math.random() * 4 - 0.5;
        seed[i] = Math.random();
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    dustGeo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
    const dustMat = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uTime: uniforms.uTime, uGold: uniforms.uGold, uPx: { value: renderer.getPixelRatio() } },
        vertexShader: /* glsl */`
            uniform float uTime, uPx;
            attribute float aSeed;
            varying float vA;
            void main() {
                vec3 p = position;
                p.y += mod(uTime * (0.05 + aSeed * 0.1) + aSeed * 9.0, 9.0) - 4.5;
                p.x += sin(uTime * 0.3 + aSeed * 20.0) * 0.3;
                vec4 mv = modelViewMatrix * vec4(p, 1.0);
                gl_PointSize = (2.0 + aSeed * 5.0) * uPx * (5.0 / -mv.z);
                vA = 0.25 + 0.75 * abs(sin(uTime * (0.6 + aSeed) + aSeed * 30.0));
                gl_Position = projectionMatrix * mv;
            }
        `,
        fragmentShader: /* glsl */`
            uniform vec3 uGold;
            varying float vA;
            void main() {
                float d = length(gl_PointCoord - 0.5);
                float a = smoothstep(0.5, 0.0, d);
                gl_FragColor = vec4(pow(uGold, vec3(1.0/2.2)) * 1.3, a * a * vA * 0.8);
            }
        `
    });
    scene.add(new THREE.Points(dustGeo, dustMat));

    /* ---------------------------------------------------------------- interaction */
    const palTarget = PALETTES.sindoor.map(c => new THREE.Color(c));
    const target = { mx: 0, my: 0, press: 0, progress: 0, posY: -0.2, flutter: 0 };
    /* the router may have run before this module loaded */
    const ROUTE_SILK = { home: 'sindoor', collection: 'plum', 'bride-groom': 'mehendi', visit: 'kesar' };
    const startRoute = document.body.dataset.route || 'home';
    let pose = POSES[startRoute] || POSES.home;
    (PALETTES[ROUTE_SILK[startRoute]] || PALETTES.sindoor).forEach((c, i) => {
        palTarget[i].set(c);
        [uniforms.uA, uniforms.uB, uniforms.uGold][i].value.set(c);
    });
    let visible = true;

    window.addEventListener('pointermove', (e) => {
        const nx = (e.clientX / innerWidth) * 2 - 1;
        const ny = -(e.clientY / innerHeight) * 2 + 1;
        target.mx = nx * 5.2 - cloth.position.x;
        target.my = ny * 3.2;
        target.press = 1;
    }, { passive: true });
    document.addEventListener('pointerleave', () => { target.press = 0; });

    window.addEventListener('hf:palette', (e) => {
        const p = PALETTES[e.detail] || PALETTES.sindoor;
        p.forEach((c, i) => palTarget[i].set(c));
    });

    window.addEventListener('hf:scroll', (e) => {
        const { progress = 0, velocity = 0 } = e.detail || {};
        target.progress = progress;
        target.posY = -0.2 + progress * 1.2;
        target.flutter = Math.min(Math.abs(velocity) / 40, 1);
    });

    window.addEventListener('hf:route', (e) => { pose = POSES[e.detail] || POSES.home; });

    /* touch: ripple follows the finger, then settles */
    window.addEventListener('touchstart', (e) => {
        const t = e.touches[0];
        target.mx = ((t.clientX / innerWidth) * 2 - 1) * 5.2 - cloth.position.x;
        target.my = (-(t.clientY / innerHeight) * 2 + 1) * 3.2;
        target.press = 1;
    }, { passive: true });
    window.addEventListener('touchend', () => { setTimeout(() => { target.press = 0; }, 600); }, { passive: true });

    window.addEventListener('hf:silk-visible', (e) => { visible = !!e.detail; });

    window.addEventListener('hf:intro', () => {
        if (REDUCED || !window.gsap) { uniforms.uReveal.value = 1; return; }
        gsap.fromTo(uniforms.uReveal, { value: 0 }, { value: 1, duration: 2.6, ease: 'power2.inOut' });
        cloth.rotation.z = -0.5; cloth.rotation.y = 0.8;
        gsap.from(camera.position, { z: 11, duration: 2.8, ease: 'power3.out' });
    });

    function resize() {
        const w = innerWidth, h = innerHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        /* keep the cloth filling the screen in portrait */
        camera.position.z = w / h < 1 ? 9.5 : 7.2;
        camera.updateProjectionMatrix();
    }
    window.addEventListener('resize', resize);
    resize();

    /* ---------------------------------------------------------------- loop */
    const clock = new THREE.Clock();
    let t = 0, skip = false;
    function frame() {
        requestAnimationFrame(frame);
        if (SMALL) { skip = !skip; if (skip) return; }
        const dt = Math.min(clock.getDelta(), 0.08);
        if (!visible || document.hidden) return;
        t += dt * (REDUCED ? 0.15 : 1);
        uniforms.uTime.value = t;

        const k = 1 - Math.pow(0.001, dt);          // frame-rate independent easing
        uniforms.uMouse.value.x += (target.mx - uniforms.uMouse.value.x) * k * 0.5;
        uniforms.uMouse.value.y += (target.my - uniforms.uMouse.value.y) * k * 0.5;
        uniforms.uPress.value += (target.press - uniforms.uPress.value) * k * 0.3;
        uniforms.uFlutter.value += (target.flutter - uniforms.uFlutter.value) * k * 0.4;
        target.flutter *= 0.94;
        const ease = k * 0.25;
        cloth.rotation.x += (pose.rx + target.progress * 0.9 - cloth.rotation.x) * ease;
        cloth.rotation.y += (pose.ry - cloth.rotation.y) * ease * 0.6;
        cloth.rotation.z += (pose.rz - cloth.rotation.z) * ease * 0.6;
        cloth.position.x += ((SMALL ? 0 : pose.x) - cloth.position.x) * ease * 0.6;
        cloth.position.y += (target.posY - cloth.position.y) * ease;

        uniforms.uA.value.lerp(palTarget[0], k * 0.18);
        uniforms.uB.value.lerp(palTarget[1], k * 0.18);
        uniforms.uGold.value.lerp(palTarget[2], k * 0.18);

        renderer.render(scene, camera);
    }
    renderer.render(scene, camera);
    frame();
    ready();
}

init();
