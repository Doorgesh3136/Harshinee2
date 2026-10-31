/* =============================================================================
   Harshinee Fashion: site behaviour
   0. Shop settings and data   (edit products here)
   1. Helpers and storage
   2. Loader
   3. Smooth scroll
   4. Page transitions (one per tab)
   5. Router: Home, Collection, Bride & Groom, Visit
   6. Per-page scroll animations
   7. Products: cards, collection grid, wedding grids
   8. Quick view, bag, saved pieces
   9. Form, header, small touches
   ============================================================================= */
(() => {
    'use strict';

    /* ------------------------------------------------------------------ 0. settings */
    const SHOP = { name: 'Harshinee Fashion', whatsapp: '23057990933' };
    const PAGE_SIZE = 12;

    const IMG = (id, w = 800) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=78`;

    const CATEGORIES = [
        { key: 'bridal',  label: 'Bridal lehengas',   img: '1654764746225-e63f5e90facd' },
        { key: 'lehenga', label: 'Party lehengas',    img: '1733937140732-2cc70a1d7017' },
        { key: 'saree',   label: 'Sarees',            img: '1641699862936-be9f49b1c38d' },
        { key: 'gown',    label: 'Gowns & anarkalis', img: '1761571260010-8aa90a08c934' },
        { key: 'groom',   label: 'Groom sherwanis',   img: '1760080838961-4208536db385' },
        { key: 'men',     label: "Men's kurtas",      img: '1767775498862-d4740ce574ce' }
    ];
    const CAT_LABEL = Object.fromEntries(CATEGORIES.map(c => [c.key, c.label]));

    /* [name, category, price (Rs), main photo, second photo, tag] */
    const RAW = [
        ['Crimson Zari Bridal Lehenga', 'bridal', 18500, '1721324807083-e9ddaa99310e', '1654764746225-e63f5e90facd', 'Bestseller'],
        ['Royal Red Bridal Lehenga', 'bridal', 21900, '1610047614301-13c63f00c032', '1610047614256-023d7c028d0b', 'New'],
        ['Wine Velvet Bridal Lehenga', 'bridal', 24500, '1740674570259-a47d713a2976', '1677691257363-eebd2abeafec', ''],
        ['Red & Gold Bridal Set', 'bridal', 16900, '1677691257363-eebd2abeafec', '1707576618343-26a1b377ca7a', ''],
        ['Rose Bridal Lehenga', 'bridal', 19500, '1629118477133-b8b1499f2b8a', '1662714802102-9825504458ca', ''],
        ['Maroon Embroidered Bridal Lehenga', 'bridal', 14900, '1707576618343-26a1b377ca7a', '1737514996816-a034a795febe', ''],
        ['Ivory & Red Bridal Lehenga', 'bridal', 22500, '1737514996816-a034a795febe', '1610047614301-13c63f00c032', 'New'],
        ['Heritage Red Bridal Lehenga', 'bridal', 12900, '1662714802102-9825504458ca', '1721324807083-e9ddaa99310e', ''],

        ['Pink Mirror-Work Lehenga', 'lehenga', 5900, '1733937140732-2cc70a1d7017', '1746372283841-dbb3838f9935', 'New'],
        ['Maroon Sequin Lehenga', 'lehenga', 6500, '1756483488645-5973a1a92e33', '1610047614222-d33c39abfab2', 'Bestseller'],
        ['Lavender Floral Lehenga', 'lehenga', 4500, '1617039487629-6babdcb2a24b', '1733937140732-2cc70a1d7017', ''],
        ['Mustard Bandhani Lehenga', 'lehenga', 3900, '1746372283841-dbb3838f9935', '1668371459824-094a960a227d', ''],
        ['Red Festive Lehenga', 'lehenga', 4900, '1610047614222-d33c39abfab2', '1756483488645-5973a1a92e33', ''],
        ['Rust Silk Lehenga', 'lehenga', 3500, '1668371459824-094a960a227d', '1617039487629-6babdcb2a24b', ''],

        ['Red Banarasi Silk Saree', 'saree', 4500, '1610030469983-98e550d6193c', '1610030469668-8e9f641aaf27', 'Bestseller'],
        ['Emerald Silk Saree', 'saree', 3900, '1679006831648-7c9ea12e5807', '1727430228383-aa1fb59db8bf', ''],
        ['Purple & Gold Kanjeevaram Saree', 'saree', 6500, '1641699862936-be9f49b1c38d', '1610030469983-98e550d6193c', 'New'],
        ['Coral Silk Saree', 'saree', 2900, '1617627143750-d86bc21e42bb', '1769275061202-cf3ef67d7279', ''],
        ['Printed Georgette Saree', 'saree', 1900, '1769275061202-cf3ef67d7279', '1617627143750-d86bc21e42bb', ''],
        ['Wedding Guest Saree', 'saree', 3500, '1727430228383-aa1fb59db8bf', '1679006831648-7c9ea12e5807', ''],
        ['Red Floral Saree', 'saree', 2500, '1610047520958-b42ebcd2f6cb', '1610030469668-8e9f641aaf27', ''],
        ['Scarlet Party Saree', 'saree', 3200, '1610030469668-8e9f641aaf27', '1610047520958-b42ebcd2f6cb', ''],

        ['Black & Gold Anarkali', 'gown', 4900, '1761571260010-8aa90a08c934', '1610202305255-746aa5b971c4', 'New'],
        ['Red Embroidered Anarkali', 'gown', 4200, '1610202305255-746aa5b971c4', '1638457130899-121a2dc59513', ''],
        ['Blush Pink Anarkali Gown', 'gown', 3800, '1669195987863-f935f728e41b', '1649139798873-683a18de1151', 'Bestseller'],
        ['Powder Blue Gown', 'gown', 3500, '1616583936499-d4116e7e2e76', '1678536517273-f1ec164966ea', ''],
        ['Ivory Flared Gown', 'gown', 4500, '1678536517273-f1ec164966ea', '1744833341427-6f2b4eac91ff', ''],
        ['Sage Embellished Gown', 'gown', 5200, '1744833341427-6f2b4eac91ff', '1756483509254-3cc48a5a15b2', ''],
        ['Pink Festive Suit', 'gown', 2800, '1649139798873-683a18de1151', '1669195987863-f935f728e41b', ''],
        ['Red Party Anarkali', 'gown', 3900, '1638457130899-121a2dc59513', '1610202305255-746aa5b971c4', ''],

        ['Ivory Embroidered Groom Sherwani', 'groom', 12900, '1760080838961-4208536db385', '1678805408312-04e5fd7a9dcc', 'Groom'],
        ['Royal Maroon Sherwani Set', 'groom', 14500, '1576470189712-50fe3ec06b04', '1759906766080-82b785c61f51', 'Bestseller'],
        ['Complete Groom Sherwani with Safa', 'groom', 15900, '1759906766080-82b785c61f51', '1760080838961-4208536db385', ''],
        ['Navy Sherwani', 'groom', 9900, '1534217466718-ef4950786e24', '1729347917808-e3e35a462fec', ''],
        ['White Floral Sherwani', 'groom', 8500, '1678805408312-04e5fd7a9dcc', '1534217466718-ef4950786e24', ''],

        ['Green Embroidered Kurta Set', 'men', 2500, '1727835523545-70ee992b5763', '1727835523550-18478cacefa2', ''],
        ['Yellow Festive Kurta', 'men', 1900, '1768807478320-fcfd3929acb2', '1768807478287-9e7953cfdca3', 'New'],
        ['Blue Kurta with Jacket', 'men', 3500, '1767775498862-d4740ce574ce', '1768807478320-fcfd3929acb2', 'Bestseller'],
        ['Black Kurta Pyjama', 'men', 2200, '1711044871601-301f9b0ecf91', '1744551358303-46edae8b374b', ''],
        ['Ivory Indo-Western Set', 'men', 6500, '1729347917808-e3e35a462fec', '1727835523550-18478cacefa2', '']
    ];
    const PRODUCTS = RAW.map((r, i) => ({ id: i + 1, name: r[0], category: r[1], price: r[2], p1: r[3], p2: r[4], tag: r[5] }));
    const byId = id => PRODUCTS.find(p => p.id === id);

    /* The four tabs. Each has its own transition (fx) and its own silk. */
    const ROUTES = {
        home:          { fx: 'curtain', silk: 'sindoor', title: 'Harshinee',      sub: 'Bridal and festive wear',            doc: 'Harshinee Fashion | Indian Bridal & Ethnic Wear in Mauritius' },
        collection:    { fx: 'pleats',  silk: 'plum',    title: 'The collection', sub: `${PRODUCTS.length} pieces in store`, doc: 'The collection | Harshinee Fashion' },
        'bride-groom': { fx: 'doors',   silk: 'mehendi', title: 'Bride & Groom',  sub: 'For your wedding day',               doc: 'Bride & Groom | Harshinee Fashion' },
        visit:         { fx: 'thread',  silk: 'kesar',   title: 'Visit us',       sub: "Lallmatie and St Julien d'Hotman",   doc: 'Visit us | Harshinee Fashion' }
    };
    /* old one-page anchors still land somewhere sensible */
    const ALIASES = { '': 'home', hero: 'home', categories: 'home', collections: 'collection' };

    /* ------------------------------------------------------------------ 1. helpers */
    const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const FINE_POINTER = matchMedia('(hover: hover) and (pointer: fine)').matches;
    const isMobile = () => innerWidth < 768;
    const $ = (s, r = document) => r.querySelector(s);
    const $$ = (s, r = document) => [...r.querySelectorAll(s)];
    const money = n => 'Rs ' + n.toLocaleString('en-US');
    const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const emit = (name, detail) => window.dispatchEvent(new CustomEvent(name, { detail }));
    const wa = text => `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(text)}`;
    const store = {
        get(k, f) { try { return JSON.parse(localStorage.getItem(k)) ?? f; } catch (e) { return f; } },
        set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* private mode */ } }
    };
    const hasGsap = typeof window.gsap !== 'undefined' && !!window.ScrollTrigger;
    if (hasGsap) gsap.registerPlugin(ScrollTrigger);
    const ANIM = hasGsap && !REDUCED;

    let bag = store.get('hf_bag', []).filter(i => byId(i.id));
    let saved = store.get('hf_saved', []).filter(id => byId(id));

    let toastTimer;
    function toast(msg) {
        const t = $('#toast');
        t.textContent = msg;
        t.classList.add('is-on');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => t.classList.remove('is-on'), 2400);
    }

    /* split text into words > characters so it can rise from behind a mask and still wrap */
    function splitChars(el) {
        if (!el) return [];
        if (el.dataset.done) return $$('.ch', el);
        const text = el.textContent.trim();
        const host = el.closest('h1, h2, p');
        if (host && !host.hasAttribute('aria-label')) host.setAttribute('aria-label', text);
        el.textContent = '';
        el.setAttribute('aria-hidden', 'true');
        text.split(/\s+/).forEach((word, wi, arr) => {
            const w = document.createElement('span');
            w.className = 'wd';
            [...word].forEach(ch => {
                const m = document.createElement('span');
                m.className = 'ch-wrap';
                const c = document.createElement('span');
                c.className = 'ch';
                c.textContent = ch;
                m.appendChild(c);
                w.appendChild(m);
            });
            el.appendChild(w);
            if (wi < arr.length - 1) el.appendChild(document.createTextNode(' '));
        });
        el.dataset.done = '1';
        return $$('.ch', el);
    }

    /* ------------------------------------------------------------------ 2. loader */
    function buildLoom() {
        const ns = 'http://www.w3.org/2000/svg';
        const warp = $('#warp'), beads = $('#beads');
        const cols = 11, x0 = 20, x1 = 200, y0 = 14, y1 = 146;
        const step = (x1 - x0) / (cols - 1);
        for (let i = 0; i < cols; i++) {
            const l = document.createElementNS(ns, 'line');
            const x = x0 + i * step;
            l.setAttribute('x1', x); l.setAttribute('x2', x);
            l.setAttribute('y1', y0); l.setAttribute('y2', y1);
            l.style.setProperty('--i', i);
            warp.appendChild(l);
        }
        const rows = 7, rowH = (y1 - y0 - 20) / (rows - 1);
        let d = '';
        for (let r = 0; r < rows; r++) {
            const y = y0 + 10 + r * rowH;
            const ltr = r % 2 === 0;
            for (let i = 0; i < cols; i++) {
                const idx = ltr ? i : cols - 1 - i;
                const x = x0 + idx * step;
                const bump = ((i + r) % 2 === 0 ? -1 : 1) * 3.2;
                if (r === 0 && i === 0) d += `M${x0 - 10} ${y} `;
                d += `Q${x - (ltr ? step / 2 : -step / 2)} ${y + bump} ${x} ${y} `;
            }
            if (r < rows - 1) {
                const ex = ltr ? x1 + 8 : x0 - 8;
                d += `Q${ex} ${y + rowH / 2} ${ltr ? x1 : x0} ${y + rowH} `;
            }
            const b = document.createElementNS(ns, 'circle');
            b.setAttribute('cx', ltr ? x1 + 6 : x0 - 6);
            b.setAttribute('cy', y); b.setAttribute('r', 1.6);
            b.style.setProperty('--r', r);
            beads.appendChild(b);
        }
        const weft = $('#weft');
        weft.setAttribute('d', d);
        const len = weft.getTotalLength();
        weft.style.strokeDasharray = len;
        weft.style.strokeDashoffset = len;
        return { weft, len };
    }

    function runLoader() {
        return new Promise(resolve => {
            const loader = $('#loader');
            const { weft, len } = buildLoom();
            let seen = false;
            try { seen = sessionStorage.getItem('hf_seen') === '1'; } catch (e) { /* ignore */ }
            const minTime = REDUCED ? 0 : (seen ? 700 : 2400);
            const start = performance.now();

            const tasks = [];
            let done = 0;
            const track = p => { tasks.push(p); p.finally(() => { done++; }); };
            track(document.fonts ? document.fonts.ready : Promise.resolve());
            $$('img[data-preload]').forEach(img => track(img.complete ? Promise.resolve() : new Promise(r => { img.onload = img.onerror = r; })));
            CATEGORIES.slice(0, 3).forEach(c => track(new Promise(r => { const i = new Image(); i.onload = i.onerror = r; i.src = IMG(c.img, 540); })));
            track(new Promise(r => {
                if (document.documentElement.classList.contains('silk-ready')) return r();
                window.addEventListener('hf:silk-ready', r, { once: true });
            }));

            let shown = 0;
            const counter = $('#loaderCount');
            const failsafe = setTimeout(() => { done = tasks.length; }, 7000);
            (function tick() {
                const elapsed = performance.now() - start;
                const real = tasks.length ? done / tasks.length : 1;
                const timeCap = minTime ? Math.min(elapsed / minTime, 1) : 1;
                const goal = Math.min(real, timeCap);
                shown += (goal - shown) * 0.12;
                if (goal === 1 && shown > 0.995) shown = 1;
                counter.textContent = Math.round(shown * 100);
                weft.style.strokeDashoffset = len * (1 - shown);
                loader.style.setProperty('--p', shown);
                if (shown < 1) requestAnimationFrame(tick);
                else {
                    clearTimeout(failsafe);
                    try { sessionStorage.setItem('hf_seen', '1'); } catch (e) { /* ignore */ }
                    setTimeout(() => exitLoader(loader).then(resolve), REDUCED ? 0 : 250);
                }
            })();
        });
    }

    function exitLoader(loader) {
        return new Promise(resolve => {
            document.body.classList.remove('is-loading');
            if (!ANIM) { loader.remove(); resolve(); return; }
            const tl = gsap.timeline({ onComplete: () => loader.remove() });
            tl.to('#loom', { scale: 1.6, opacity: 0, duration: 0.8, ease: 'power3.in' })
              .to('.loader-word, #loaderCount', { y: -30, opacity: 0, duration: 0.5, ease: 'power2.in', stagger: 0.05 }, '<')
              .set(loader, { backgroundColor: 'transparent' })
              .call(() => loader.classList.add('is-exiting'))
              .to('#loaderCurtainL', { xPercent: -100, duration: 1.1, ease: 'expo.inOut' })
              .to('#loaderCurtainR', { xPercent: 100, duration: 1.1, ease: 'expo.inOut' }, '<')
              .add(resolve, '-=0.75');
        });
    }

    /* ------------------------------------------------------------------ 3. scroll */
    let lenis = null;
    let marqueeLoop = null, marqueeSkew = null;

    function setupScroll() {
        if (ANIM && window.Lenis) {
            lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
            lenis.stop();
            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add(t => lenis.raf(t * 1000));
            gsap.ticker.lagSmoothing(0);
            lenis.on('scroll', e => {
                emit('hf:scroll', { progress: e.progress, velocity: e.velocity });
                if (marqueeLoop) {
                    const v = gsap.utils.clamp(-30, 30, e.velocity);
                    marqueeLoop.timeScale(1 + Math.abs(v) / 6);
                    marqueeSkew(-v / 3);
                }
            });
        } else {
            window.addEventListener('scroll', () => {
                const max = document.documentElement.scrollHeight - innerHeight;
                emit('hf:scroll', { progress: max > 0 ? scrollY / max : 0, velocity: 0 });
            }, { passive: true });
        }

        document.addEventListener('click', e => {
            const b = e.target.closest('[data-scroll-to]');
            if (b) { const el = $(b.dataset.scrollTo); if (el) scrollToEl(el); }
        });
    }
    function scrollToEl(el, offset = -10) {
        if (lenis) lenis.scrollTo(el, { offset, duration: 1.4 });
        else el.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth' });
    }
    function scrollTop(immediate = true) {
        if (lenis) { lenis.scrollTo(0, { immediate, force: true }); if (!immediate) return; }
        window.scrollTo({ top: 0, behavior: immediate || REDUCED ? 'auto' : 'smooth' });
    }

    /* ------------------------------------------------------------------ 4. page transitions */
    const FX = (() => {
        const root = $('#pagefx');
        const titleEl = $('.fx-title', root), subEl = $('.fx-sub', root);

        /* hanging sarees: alternating fabric strips with a zari hem */
        const pleatWrap = $('.fx-pleats', root);
        const count = isMobile() ? 5 : 8;
        const fabrics = ['#3A0830', '#6B1446', '#2B0A1A', '#8A1C4E', '#4A0B24'];
        for (let i = 0; i < count; i++) {
            const p = document.createElement('div');
            p.className = 'fx-pleat';
            p.style.left = (i * 100 / count) + '%';
            p.style.width = `calc(${100 / count}% + 1px)`;
            p.style.setProperty('--c', fabrics[i % fabrics.length]);
            pleatWrap.appendChild(p);
        }

        function setLabel(r) {
            titleEl.innerHTML = r.title.split(' ').map(w => `<span class="fx-wd">${[...w].map(ch => `<span class="fx-ch">${esc(ch)}</span>`).join('')}</span>`).join(' ');
            subEl.textContent = r.sub;
            gsap.set([titleEl, subEl], { opacity: 1, y: 0 });
            gsap.set($$('.fx-ch', titleEl), { yPercent: 110, opacity: 0 });
            gsap.set(subEl, { opacity: 0 });
        }

        const KINDS = {
            curtain: {
                cover: tl => tl
                    .set('.fx-curtain', { autoAlpha: 1 })
                    .fromTo('.fx-c-l', { xPercent: -101 }, { xPercent: 0, duration: 0.85, ease: 'expo.inOut' }, 0)
                    .fromTo('.fx-c-r', { xPercent: 101 }, { xPercent: 0, duration: 0.85, ease: 'expo.inOut' }, 0),
                reveal: tl => tl
                    .to('.fx-c-l', { xPercent: -101, duration: 1, ease: 'expo.inOut' }, 0)
                    .to('.fx-c-r', { xPercent: 101, duration: 1, ease: 'expo.inOut' }, 0)
                    .set('.fx-curtain', { autoAlpha: 0 })
            },
            pleats: {
                cover: tl => tl
                    .set('.fx-pleats', { autoAlpha: 1 })
                    .fromTo('.fx-pleat', { yPercent: -101 }, { yPercent: 0, duration: 0.75, ease: 'power4.inOut', stagger: 0.055 }, 0),
                reveal: tl => tl
                    .to('.fx-pleat', { yPercent: -101, duration: 0.8, ease: 'power4.inOut', stagger: { each: 0.06, from: 'center' } }, 0)
                    .set('.fx-pleats', { autoAlpha: 0 })
            },
            doors: {
                cover: tl => tl
                    .set('.fx-doors', { autoAlpha: 1 })
                    .fromTo('.fx-door-l', { rotateY: -100 }, { rotateY: 0, duration: 0.95, ease: 'power3.inOut' }, 0)
                    .fromTo('.fx-door-r', { rotateY: 100 }, { rotateY: 0, duration: 0.95, ease: 'power3.inOut' }, 0),
                reveal: tl => tl
                    .to('.fx-door-l', { rotateY: -100, duration: 1.1, ease: 'power3.inOut' }, 0)
                    .to('.fx-door-r', { rotateY: 100, duration: 1.1, ease: 'power3.inOut' }, 0)
                    .to('.fx-doors', { autoAlpha: 0, duration: 0.3 }, 0.85)
            },
            thread: {
                cover: tl => tl
                    .set('.fx-thread', { autoAlpha: 1 })
                    .set(['.fx-line', '.fx-pin'], { autoAlpha: 1 })
                    .set('.fx-iris', { clipPath: 'circle(0% at 50% 50%)' })
                    .fromTo('.fx-line path', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6, ease: 'power2.inOut' }, 0)
                    .fromTo('.fx-pin', { scale: 0, yPercent: -60 }, { scale: 1, yPercent: 0, duration: 0.45, ease: 'back.out(2.2)' }, 0.42)
                    .to('.fx-iris', { clipPath: 'circle(75% at 50% 50%)', duration: 0.7, ease: 'expo.in' }, 0.6)
                    .to(['.fx-line', '.fx-pin'], { autoAlpha: 0, duration: 0.2 }, 1.15),
                reveal: tl => tl
                    .to('.fx-iris', { clipPath: 'circle(0% at 50% 50%)', duration: 0.95, ease: 'expo.inOut' }, 0)
                    .set('.fx-thread', { autoAlpha: 0 })
            }
        };

        function cover(name) {
            const r = ROUTES[name];
            root.style.pointerEvents = 'auto';
            setLabel(r);
            const tl = gsap.timeline();
            KINDS[r.fx].cover(tl);
            const at = Math.max(tl.duration() - 0.15, 0);
            tl.to($$('.fx-ch', titleEl), { yPercent: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.03 }, at)
              .to(subEl, { opacity: 0.8, duration: 0.4 }, at + 0.2)
              .to({}, { duration: 0.25 });
            return tl.then(() => {});
        }
        function reveal(name) {
            const tl = gsap.timeline({ onComplete: () => { root.style.pointerEvents = 'none'; } });
            tl.to([titleEl, subEl], { opacity: 0, y: -24, duration: 0.35, ease: 'power2.in' }, 0);
            const inner = gsap.timeline();
            KINDS[ROUTES[name].fx].reveal(inner);
            tl.add(inner, 0.15);
            return tl.then(() => {});
        }
        return { cover, reveal };
    })();

    /* ------------------------------------------------------------------ 5. router */
    let current = null, busy = false, queued = false;
    let ctx = null, mm = null;

    function parseHash() {
        const raw = location.hash.replace(/^#\/?/, '');
        const [path, query] = raw.split('?');
        const name = ROUTES[path] ? path : (ALIASES[path] || 'home');
        return { name, params: new URLSearchParams(query || '') };
    }

    async function handleRoute(first = false) {
        if (busy) { queued = true; return; }
        const { name, params } = parseHash();
        if (name === current) { applyParams(name, params, true); return; }
        busy = true;
        closeDrawer();
        closeQuick(true);
        const animate = !first && ANIM;
        try {
            if (animate) await FX.cover(name);
            enterView(name, params);
            if (animate) {
                playIntro(name, 0.45);
                await FX.reveal(name);
            } else if (!first) {
                playIntro(name, 0);
            }
        } finally {
            busy = false;
        }
        if (queued) { queued = false; handleRoute(); }
    }

    function enterView(name, params) {
        if (ctx) { ctx.revert(); ctx = null; }
        if (mm) { mm.revert(); mm = null; }
        marqueeLoop = null;

        $$('.view').forEach(v => { v.hidden = v.dataset.view !== name; });
        current = name;
        document.title = ROUTES[name].doc;
        document.body.dataset.route = name;
        setActiveTab(name);
        scrollTop(true);
        $('#siteHeader').classList.remove('is-hidden');
        document.body.classList.remove('header-hidden');

        emit('hf:route', name);
        emit('hf:palette', ROUTES[name].silk);
        emit('hf:silk-visible', true);

        applyParams(name, params, false);

        const view = $(`[data-view="${name}"]`);
        $$('.mask-rise', view).forEach(h => h.classList.remove('is-in'));
        if (hasGsap) {
            ctx = gsap.context(() => {
                commonScroll(view, name);
                if (ANIM && SCROLL[name]) SCROLL[name](view);
            }, view);
            requestAnimationFrame(() => ScrollTrigger.refresh());
        }
        revealCards();
        bindTilt();
    }

    function applyParams(name, params, sameView) {
        if (name === 'collection') {
            const cat = params.get('cat');
            const valid = cat && CAT_LABEL[cat] ? cat : 'all';
            if (valid !== state.cat || !sameView) setCategory(valid, sameView);
            if (sameView) scrollToEl($('.coll-body'), 0);
            return;
        }
        if (name === 'visit') {
            const f = params.get('for');
            if (f) $('#visitForm').elements.looking.value = f;
        }
        if (sameView) scrollTop(false);
    }

    /* the sliding indicator under the active tab (top nav and mobile tab bar) */
    function setActiveTab(name) {
        [['#topnav', '.nav-ind'], ['#tabbar', '.tab-ind']].forEach(([navSel, indSel]) => {
            const nav = $(navSel);
            if (!nav) return;
            const links = $$('[data-tab]', nav);
            links.forEach(a => {
                if (a.dataset.tab === name) a.setAttribute('aria-current', 'page');
                else a.removeAttribute('aria-current');
            });
            const active = links.find(a => a.dataset.tab === name);
            const ind = $(indSel, nav);
            if (!active || !ind || !active.offsetWidth) return;
            const props = { x: active.offsetLeft, width: active.offsetWidth };
            if (ANIM && ind.dataset.ready) gsap.to(ind, { ...props, duration: 0.7, ease: 'expo.out' });
            else if (hasGsap) gsap.set(ind, props);
            else { ind.style.width = props.width + 'px'; ind.style.transform = `translateX(${props.x}px)`; }
            ind.dataset.ready = '1';
        });
    }

    function bindRouter() {
        window.addEventListener('hashchange', () => handleRoute());
        /* clicking the tab you're already on scrolls back to the top */
        document.addEventListener('click', e => {
            const a = e.target.closest('a[href^="#/"]');
            if (!a) return;
            const target = a.getAttribute('href');
            const now = location.hash || '#/';
            if (target === now) { e.preventDefault(); scrollTop(false); }
        });
        let rt;
        window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => setActiveTab(current), 120); });
    }

    /* intro played as each page is revealed */
    function playIntro(name, delay) {
        const view = $(`[data-view="${name}"]`);
        const chars = splitChars($('[data-split]', view));
        if (!ANIM) return;
        const run = () => {
            const tl = gsap.timeline({ delay });
            tl.fromTo(chars, { yPercent: 115, rotate: 6 }, { yPercent: 0, rotate: 0, duration: 1.2, ease: 'expo.out', stagger: 0.035 });
            if (name === 'home') {
                tl.fromTo('.hero-fade', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.12 }, 0.3);
                if ($('#heroArch').offsetParent) {
                    tl.fromTo('#heroArch', { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.6, ease: 'expo.inOut' }, 0)
                      .fromTo('#heroArch img', { scale: 1.5 }, { scale: 1.1, duration: 2, ease: 'expo.out' }, 0.2)
                      .fromTo('#heroArch .arch-outline path', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 2, ease: 'power2.inOut' }, 0.5)
                      .fromTo('#heroArch figcaption', { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8 }, 1.2);
                }
            } else {
                tl.fromTo($$('.page-fade', view), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.1 }, 0.35);
            }
            if (name === 'bride-groom') {
                tl.fromTo($$('.wed-arch', view), { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.5, ease: 'expo.inOut', stagger: 0.15 }, 0.2)
                  .fromTo($$('.wed-arch img', view), { scale: 1.4 }, { scale: 1, duration: 2, ease: 'expo.out', stagger: 0.15 }, 0.3)
                  .fromTo($$('.wed-arch .arch-outline path', view), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut', stagger: 0.15 }, 0.6);
            }
            if (name === 'visit') {
                tl.fromTo($$('.boutique', view), { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.12 }, 0.45)
                  .fromTo($$('.contact', view), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', stagger: 0.08 }, 0.7)
                  .fromTo('#visitForm', { y: 60, opacity: 0, rotateX: -8 }, { y: 0, opacity: 1, rotateX: 0, duration: 1.1, ease: 'power3.out' }, 0.5);
            }
        };
        if (ctx) ctx.add(run); else run();
    }

    /* ------------------------------------------------------------------ 6. scroll animations */
    function commonScroll(view, name) {
        /* sections can ask the silk for a different fabric */
        $$('[data-silk]', view).forEach(sec => {
            ScrollTrigger.create({
                trigger: sec, start: 'top 55%', end: 'bottom 55%',
                onToggle: self => { if (self.isActive) emit('hf:palette', sec.dataset.silk); }
            });
        });
        /* headings rise once, from below */
        $$('section h2', view).forEach(h => {
            h.classList.add('mask-rise');
            ScrollTrigger.create({ trigger: h, start: 'top 90%', once: true, onEnter: () => h.classList.add('is-in') });
        });
    }

    const SCROLL = {
        home(view) {
            gsap.to('.hero-title', { yPercent: -40, ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true } });
            gsap.to('#heroArch', { yPercent: -18, ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true } });

            const track = $('.marquee-track', view);
            marqueeLoop = gsap.to(track, { xPercent: -50, duration: 38, ease: 'none', repeat: -1 });
            marqueeSkew = gsap.quickTo(track, 'skewX', { duration: 0.5, ease: 'power3' });

            mm = gsap.matchMedia();
            mm.add('(min-width: 1024px)', () => {
                const rail = $('#categoryRail');
                const distance = () => rail.scrollWidth - innerWidth + 64;
                const tween = gsap.to(rail, {
                    x: () => -distance(), ease: 'none',
                    scrollTrigger: { trigger: '#categories', start: 'top top', end: () => '+=' + distance(), pin: '.cat-pin', scrub: 0.6, invalidateOnRefresh: true }
                });
                $$('.cat-card', rail).forEach(card => {
                    gsap.fromTo(card, { rotateY: -18, z: -80 }, { rotateY: 14, z: 0, ease: 'none', scrollTrigger: { trigger: card, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } });
                    gsap.fromTo($('img', card), { xPercent: -8 }, { xPercent: 8, ease: 'none', scrollTrigger: { trigger: card, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } });
                });
            });
            /* on phones the rail is a swipe; cards lean as they pass the centre */
            mm.add('(max-width: 1023px)', () => {
                const rail = $('#categoryRail');
                const cards = $$('.cat-card', rail);
                let raf = 0;
                const lean = () => {
                    raf = 0;
                    const mid = innerWidth / 2;
                    cards.forEach(c => {
                        const r = c.getBoundingClientRect();
                        const d = gsap.utils.clamp(-1, 1, (r.left + r.width / 2 - mid) / mid);
                        c.style.transform = `perspective(900px) rotateY(${(-d * 14).toFixed(2)}deg) scale(${(1 - Math.abs(d) * 0.06).toFixed(3)})`;
                    });
                };
                const onScroll = () => { if (!raf) raf = requestAnimationFrame(lean); };
                rail.addEventListener('scroll', onScroll, { passive: true });
                lean();
                return () => { rail.removeEventListener('scroll', onScroll); cards.forEach(c => { c.style.transform = ''; }); };
            });

            const q = $('.quote', view);
            if (!q.dataset.done) {
                q.innerHTML = q.textContent.trim().split(/\s+/).map(w => `<span class="w">${esc(w)}</span>`).join(' ');
                q.dataset.done = '1';
            }
            gsap.fromTo($$('.w', q), { opacity: 0.14 }, { opacity: 1, stagger: 0.08, ease: 'none', scrollTrigger: { trigger: q, start: 'top 80%', end: 'bottom 45%', scrub: true } });

            $$('.couple', view).forEach(c => {
                gsap.fromTo($('.couple-media', c), { clipPath: 'inset(30% 12% 0% 12%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: { trigger: c, start: 'top 95%', end: 'top 40%', scrub: true } });
                gsap.fromTo($('img', c), { scale: 1.35 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: c, start: 'top bottom', end: 'bottom top', scrub: true } });
            });
        },

        collection() {
            /* stop rendering the silk while the opaque grid covers the screen */
            ScrollTrigger.create({ trigger: '.coll-body', start: 'top top', end: 'bottom bottom', onToggle: self => emit('hf:silk-visible', !self.isActive) });
            gsap.to('.page-head h1', { yPercent: -30, opacity: 0.3, ease: 'none', scrollTrigger: { trigger: '.page-head', start: 'top top', end: 'bottom top', scrub: true } });
        },

        'bride-groom'(view) {
            $$('.wed-arch', view).forEach((a, i) => {
                gsap.to(a, { yPercent: i ? -12 : -4, ease: 'none', scrollTrigger: { trigger: a, start: 'top bottom', end: 'bottom top', scrub: true } });
            });
            gsap.fromTo($$('.family-tile', view), { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.1, scrollTrigger: { trigger: '#familyTiles', start: 'top 85%' } });
        },

        visit(view) {
            $$('.social .font-display', view).forEach(el => {
                const m = (el.dataset.orig || el.textContent).match(/(\d+)(.*)/);
                if (!m) return;
                el.dataset.orig = m[0];
                const n = +m[1], suffix = m[2], o = { v: 0 };
                ScrollTrigger.create({
                    trigger: el, start: 'top 92%', once: true,
                    onEnter: () => gsap.to(o, { v: n, duration: 1.6, ease: 'power3.out', onUpdate: () => { el.textContent = Math.round(o.v) + suffix; } })
                });
            });
        }
    };

    /* ------------------------------------------------------------------ 7. products */
    const state = { cat: 'all', q: '', sort: 'featured', shown: PAGE_SIZE };

    const imgSet = (id, sizes) => `src="${IMG(id, 700)}" srcset="${IMG(id, 360)} 360w, ${IMG(id, 540)} 540w, ${IMG(id, 800)} 800w" sizes="${sizes}"`;
    const CARD_SIZES = '(max-width: 767px) 48vw, (max-width: 1279px) 32vw, 25vw';

    function cardHTML(p, i, extra = '') {
        const isSaved = saved.includes(p.id);
        return `
        <article class="pcard ${extra}" data-id="${p.id}" style="--d:${(i % 4) * 70}ms">
            <div class="pcard-tilt relative">
                <button type="button" class="pcard-media block w-full relative aspect-[3/4] overflow-hidden bg-wine" data-open="${p.id}" aria-label="View ${esc(p.name)}">
                    <img ${imgSet(p.p1, CARD_SIZES)} alt="${esc(p.name)}" loading="lazy" decoding="async" class="img-a absolute inset-0 w-full h-full object-cover object-top">
                    ${FINE_POINTER ? `<img ${imgSet(p.p2, CARD_SIZES)} alt="" loading="lazy" decoding="async" class="img-b absolute inset-0 w-full h-full object-cover object-top">` : ''}
                    ${p.tag ? `<span class="absolute left-2 top-2 sm:left-3 sm:top-3 text-[0.7rem] sm:text-xs px-2.5 py-1 rounded-full ${p.tag === 'New' ? 'bg-kesar text-ink' : 'bg-ink/80 text-ivory'}">${p.tag}</span>` : ''}
                </button>
                <button type="button" class="heart absolute right-1.5 top-1.5 sm:right-2 sm:top-2 w-10 h-10 grid place-items-center rounded-full bg-ink/60 backdrop-blur ${isSaved ? 'is-on' : ''}" data-save="${p.id}" aria-pressed="${isSaved}" aria-label="Save ${esc(p.name)}">
                    <svg class="w-5 h-5"><use href="#i-heart"/></svg>
                </button>
                <button type="button" class="quick-add absolute right-1.5 bottom-1.5 sm:right-3 sm:left-3 sm:bottom-3 btn btn-gold btn-sm justify-center" data-add="${p.id}" aria-label="Add ${esc(p.name)} to bag"><svg class="w-4 h-4"><use href="#i-plus"/></svg><span class="hidden sm:inline">Add to bag</span></button>
            </div>
            <div class="mt-3 sm:mt-4">
                <p class="text-xs sm:text-sm text-gulabi/80">${CAT_LABEL[p.category]}</p>
                <h3 class="mt-1 text-[0.95rem] sm:text-lg leading-snug">${esc(p.name)}</h3>
                <p class="mt-1 text-zari">${money(p.price)}</p>
            </div>
        </article>`;
    }

    function buildStatic() {
        const items = ['Bridal lehengas', 'Sarees', 'Sherwanis', 'Anarkalis', 'Party lehengas', 'Kurtas', 'Gowns', 'Indo-western'];
        const run = items.map(t => `<span class="px-6 sm:px-10">${t}</span><svg class="w-7 h-7 sm:w-9 sm:h-9 text-zari shrink-0 self-center"><use href="#i-paisley"/></svg>`).join('');
        $('.marquee-track').innerHTML = `<div class="flex items-center">${run}</div><div class="flex items-center">${run}</div>`;

        $('#categoryRail').innerHTML = CATEGORIES.map(c => {
            const count = PRODUCTS.filter(p => p.category === c.key).length;
            return `
            <a href="#/collection?cat=${c.key}" class="cat-card snap-center shrink-0 group">
                <span class="cat-media arch-clip block relative overflow-hidden bg-wine">
                    <img ${imgSet(c.img, '(max-width: 1023px) 72vw, 360px')} alt="" loading="lazy" decoding="async" class="absolute inset-0 w-[116%] max-w-none -left-[8%] h-full object-cover object-top">
                    <span class="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent"></span>
                </span>
                <span class="mt-5 block font-display text-3xl sm:text-4xl leading-none group-hover:text-zari transition-colors">${c.label}</span>
                <span class="mt-2 block text-ivory/55 text-sm">${count} pieces in store</span>
            </a>`;
        }).join('');

        $('#newRow').innerHTML = PRODUCTS.filter(p => p.tag === 'New').slice(0, 4)
            .map((p, i) => cardHTML(p, i, 'snap-start shrink-0 w-[62vw] sm:w-[42vw] md:w-auto')).join('');

        const chips = [{ key: 'all', label: 'Everything' }, ...CATEGORIES];
        $('#chips').innerHTML = chips.map(c => `<button type="button" role="tab" class="chip" data-chip="${c.key}" aria-selected="${c.key === 'all'}">${c.label}</button>`).join('');
        $$('#chips .chip').forEach(b => b.addEventListener('click', () => {
            const cat = b.dataset.chip;
            history.replaceState(null, '', cat === 'all' ? '#/collection' : `#/collection?cat=${cat}`);
            setCategory(cat, true);
        }));

        /* wedding page */
        const range = list => `from ${money(Math.min(...list.map(p => p.price)))} to ${money(Math.max(...list.map(p => p.price)))}`;
        const bridal = PRODUCTS.filter(p => p.category === 'bridal');
        const groom = PRODUCTS.filter(p => p.category === 'groom');
        $('#bridalNote').textContent = `${bridal.length} bridal lehengas in store now, ${range(bridal)}.`;
        $('#groomNote').textContent = `${groom.length} sherwanis in store now, ${range(groom)}.`;
        $('#bridalGrid').innerHTML = bridal.map((p, i) => cardHTML(p, i)).join('');
        $('#groomGrid').innerHTML = groom.map((p, i) => cardHTML(p, i)).join('');
        $('#familyTiles').innerHTML = ['lehenga', 'saree', 'gown', 'men'].map(key => {
            const c = CATEGORIES.find(x => x.key === key);
            const n = PRODUCTS.filter(p => p.category === key).length;
            return `
            <a href="#/collection?cat=${key}" class="family-tile group relative block aspect-[3/4] overflow-hidden bg-wine">
                <img ${imgSet(c.img, '(max-width: 1023px) 48vw, 25vw')} alt="" loading="lazy" decoding="async" class="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-[1400ms] group-hover:scale-105">
                <span class="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent"></span>
                <span class="absolute left-4 right-4 bottom-4">
                    <span class="block font-display text-2xl sm:text-3xl leading-none">${c.label}</span>
                    <span class="block text-sm text-ivory/70 mt-1">${n} pieces</span>
                </span>
            </a>`;
        }).join('');

        $('#year').textContent = new Date().getFullYear();
    }

    function filtered() {
        const q = state.q.trim().toLowerCase();
        let list = PRODUCTS.filter(p => (state.cat === 'all' || p.category === state.cat) &&
            (!q || q.split(/\s+/).every(w => (p.name + ' ' + CAT_LABEL[p.category]).toLowerCase().includes(w))));
        if (state.sort === 'low') list = [...list].sort((a, b) => a.price - b.price);
        if (state.sort === 'high') list = [...list].sort((a, b) => b.price - a.price);
        return list;
    }

    function renderGrid(animate = true) {
        const grid = $('#grid');
        const list = filtered();
        const slice = list.slice(0, state.shown);
        $('#resultCount').textContent = list.length;
        $('#emptyState').classList.toggle('hidden', list.length > 0);
        $('#moreBtn').classList.toggle('hidden', list.length <= state.shown);
        const paint = () => {
            grid.innerHTML = slice.map((p, i) => cardHTML(p, i)).join('');
            revealCards();
            bindTilt();
            if (hasGsap) ScrollTrigger.refresh();
        };
        if (animate && ANIM && grid.children.length) {
            gsap.to(grid, { opacity: 0, y: 16, duration: 0.25, ease: 'power2.in', onComplete: () => { paint(); gsap.to(grid, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }); } });
        } else paint();
    }

    function setCategory(cat, animate = true) {
        state.cat = cat;
        state.shown = PAGE_SIZE;
        $$('#chips .chip').forEach(b => b.setAttribute('aria-selected', b.dataset.chip === cat));
        const chip = $(`#chips [data-chip="${cat}"]`);
        const box = $('#chips');
        if (chip && box.clientWidth) box.scrollTo({ left: chip.offsetLeft - box.clientWidth / 2 + chip.clientWidth / 2, behavior: animate ? 'smooth' : 'auto' });
        renderGrid(animate);
    }

    let cardObserver;
    function revealCards() {
        const cards = $$('.pcard:not(.is-in)');
        if (REDUCED || !('IntersectionObserver' in window)) { cards.forEach(c => c.classList.add('is-in')); return; }
        cardObserver = cardObserver || new IntersectionObserver(entries => {
            entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('is-in'); cardObserver.unobserve(en.target); } });
        }, { rootMargin: '0px 0px -6% 0px' });
        cards.forEach(c => cardObserver.observe(c));
    }

    function bindTilt() {
        if (!FINE_POINTER || REDUCED) return;
        $$('.pcard-tilt:not([data-tilt])').forEach(el => {
            el.dataset.tilt = '1';
            el.addEventListener('pointermove', e => {
                const r = el.getBoundingClientRect();
                const x = (e.clientX - r.left) / r.width - 0.5;
                const y = (e.clientY - r.top) / r.height - 0.5;
                el.style.setProperty('--rx', (-y * 9).toFixed(2) + 'deg');
                el.style.setProperty('--ry', (x * 11).toFixed(2) + 'deg');
                el.style.setProperty('--gx', ((x + 0.5) * 100).toFixed(1) + '%');
                el.style.setProperty('--gy', ((y + 0.5) * 100).toFixed(1) + '%');
            });
            el.addEventListener('pointerleave', () => { el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); });
        });
    }

    function bindProducts() {
        let t;
        $('#search').addEventListener('input', e => { clearTimeout(t); t = setTimeout(() => { state.q = e.target.value; state.shown = PAGE_SIZE; renderGrid(); }, 200); });
        $('#search').addEventListener('keydown', e => { if (e.key === 'Enter') e.target.blur(); });
        $('#sort').addEventListener('change', e => { state.sort = e.target.value; renderGrid(); });
        $('#moreBtn').addEventListener('click', () => { state.shown += PAGE_SIZE; renderGrid(false); });
        $('[data-reset]').addEventListener('click', () => { state.q = ''; $('#search').value = ''; history.replaceState(null, '', '#/collection'); setCategory('all'); });

        /* one listener for every product card on every page */
        document.addEventListener('click', e => {
            const add = e.target.closest('[data-add]');
            const save = e.target.closest('[data-save]');
            const open = e.target.closest('[data-open]');
            if (add) { addToBag(+add.dataset.add, add); return; }
            if (save) { toggleSaved(+save.dataset.save, save); return; }
            if (open) openQuick(+open.dataset.open);
        });
    }

    /* ------------------------------------------------------------------ 8. quick view, bag, saved */
    let quickId = null;
    function openQuick(id) {
        const p = byId(id);
        if (!p) return;
        quickId = id;
        const dlg = $('#quick');
        const big = isMobile() ? 800 : 1200;
        $('#qImg').src = IMG(p.p1, big);
        $('#qImg').alt = p.name;
        $('#qCat').textContent = CAT_LABEL[p.category];
        $('#qName').textContent = p.name;
        $('#qPrice').textContent = money(p.price);
        $('#qAsk').href = wa(`Hello Harshinee Fashion, I'd like to know more about the ${p.name} (${money(p.price)}). Is it available, and in which sizes?`);
        $('#qThumbs').innerHTML = [p.p1, p.p2].map((pid, i) => `<button type="button" class="qthumb ${i === 0 ? 'is-on' : ''}" data-src="${IMG(pid, big)}" aria-label="Photo ${i + 1}"><img src="${IMG(pid, 140)}" alt=""></button>`).join('');
        dlg.showModal();
        $('.quick-inner').scrollTop = 0;
        lenis && lenis.stop();
        if (ANIM) {
            if (isMobile()) gsap.fromTo('.quick-inner', { yPercent: 100 }, { yPercent: 0, duration: 0.7, ease: 'expo.out' });
            else gsap.fromTo('.quick-inner', { clipPath: 'inset(50% 50% 50% 50%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'expo.out' });
            gsap.fromTo('#qImg', { scale: 1.25 }, { scale: 1, duration: 1.2, ease: 'expo.out' });
            gsap.fromTo('.q-body > *', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, delay: 0.15, ease: 'power3.out' });
        }
    }
    function closeQuick(instant = false) {
        const dlg = $('#quick');
        if (!dlg.open) return;
        const done = () => { dlg.close(); if (hasGsap) gsap.set('.quick-inner', { clearProps: 'all' }); lenis && lenis.start(); };
        if (instant || !ANIM) { done(); return; }
        if (isMobile()) gsap.to('.quick-inner', { yPercent: 100, duration: 0.45, ease: 'power3.in', onComplete: done });
        else gsap.to('.quick-inner', { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.5, ease: 'expo.in', onComplete: done });
    }
    function bindQuick() {
        const dlg = $('#quick');
        $('#qClose').addEventListener('click', () => closeQuick());
        dlg.addEventListener('cancel', e => { e.preventDefault(); closeQuick(); });
        dlg.addEventListener('click', e => { if (e.target === dlg) closeQuick(); });
        $('#qAdd').addEventListener('click', e => addToBag(quickId, e.currentTarget));
        $('#qThumbs').addEventListener('click', e => {
            const b = e.target.closest('.qthumb');
            if (!b) return;
            $$('.qthumb').forEach(x => x.classList.toggle('is-on', x === b));
            const img = $('#qImg');
            if (ANIM) gsap.fromTo(img, { opacity: 0.2, scale: 1.08 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' });
            img.src = b.dataset.src;
        });

        /* on phones the quick view is a bottom sheet: drag it down to close */
        const sheet = $('.quick-inner');
        let y0 = null, dy = 0;
        sheet.addEventListener('touchstart', e => { if (sheet.scrollTop <= 0 && isMobile()) { y0 = e.touches[0].clientY; dy = 0; } }, { passive: true });
        sheet.addEventListener('touchmove', e => {
            if (y0 === null) return;
            dy = Math.max(0, e.touches[0].clientY - y0);
            if (dy > 0) sheet.style.transform = `translateY(${dy}px)`;
        }, { passive: true });
        sheet.addEventListener('touchend', () => {
            if (y0 === null) return;
            y0 = null;
            if (dy > 110) closeQuick();
            else sheet.style.transform = '';
        });
    }

    function saveBag() { store.set('hf_bag', bag); renderBag(); }
    function addToBag(id, fromEl) {
        const item = bag.find(i => i.id === id);
        if (item) item.qty++; else bag.push({ id, qty: 1 });
        saveBag();
        flyToBag(fromEl);
        if (navigator.vibrate && isMobile()) navigator.vibrate(12);
        toast(`${byId(id).name} added to your bag`);
    }
    function visibleBagBtn() { return $$('.bag-open').find(b => b.offsetParent !== null); }
    function flyToBag(fromEl) {
        const btn = visibleBagBtn();
        if (!fromEl || !btn || !ANIM) return;
        const a = fromEl.getBoundingClientRect(), b = btn.getBoundingClientRect();
        const dot = document.createElement('span');
        dot.className = 'fly-dot';
        document.body.appendChild(dot);
        gsap.set(dot, { x: a.left + a.width / 2, y: a.top + a.height / 2 });
        gsap.timeline({ onComplete: () => dot.remove() })
            .to(dot, { x: b.left + b.width / 2, duration: 0.8, ease: 'power1.inOut' })
            .to(dot, { y: b.top + b.height / 2, duration: 0.8, ease: 'back.in(1.6)' }, 0)
            .to(dot, { scale: 0.3, duration: 0.2 }, 0.6)
            .fromTo(btn, { scale: 1 }, { scale: 1.2, duration: 0.15, yoyo: true, repeat: 1 }, 0.75);
    }
    function changeQty(id, delta) {
        const item = bag.find(i => i.id === id);
        if (!item) return;
        item.qty += delta;
        if (item.qty <= 0) bag = bag.filter(i => i.id !== id);
        saveBag();
    }
    function toggleSaved(id, btn) {
        const on = !saved.includes(id);
        saved = on ? [...saved, id] : saved.filter(x => x !== id);
        store.set('hf_saved', saved);
        $$(`[data-save="${id}"]`).forEach(b => { b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', on); });
        if (on && btn && ANIM) gsap.fromTo(btn, { scale: 0.6 }, { scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
        toast(on ? 'Saved. Find it in your bag.' : 'Removed from saved pieces');
        renderBag();
    }

    function renderBag() {
        const count = bag.reduce((n, i) => n + i.qty, 0);
        const total = bag.reduce((n, i) => n + i.qty * byId(i.id).price, 0);
        $$('.bag-count').forEach(b => { b.textContent = count; b.classList.toggle('scale-0', count === 0); });
        $('#bagTotal').textContent = money(total);
        $('#bagEmpty').classList.toggle('hidden', bag.length > 0);
        $('#orderBtn').disabled = bag.length === 0;
        $('#bagList').innerHTML = bag.map(i => {
            const p = byId(i.id);
            return `
            <li class="flex gap-4">
                <img src="${IMG(p.p1, 200)}" alt="" class="w-20 h-24 object-cover object-top bg-wine shrink-0">
                <div class="flex-1 min-w-0">
                    <p class="leading-snug">${esc(p.name)}</p>
                    <p class="text-zari text-sm mt-1">${money(p.price)}</p>
                    <div class="mt-3 inline-flex items-center border border-ivory/20 rounded-full">
                        <button class="w-10 h-10 grid place-items-center" data-qty="-1" data-id="${p.id}" aria-label="One fewer"><svg class="w-4 h-4"><use href="#i-minus"/></svg></button>
                        <span class="w-6 text-center text-sm tabular-nums">${i.qty}</span>
                        <button class="w-10 h-10 grid place-items-center" data-qty="1" data-id="${p.id}" aria-label="One more"><svg class="w-4 h-4"><use href="#i-plus"/></svg></button>
                    </div>
                </div>
            </li>`;
        }).join('');
        $('#savedWrap').classList.toggle('hidden', saved.length === 0);
        $('#savedList').innerHTML = saved.map(id => {
            const p = byId(id);
            return `<li><button class="block w-full text-left" data-saved-open="${id}"><img src="${IMG(p.p1, 260)}" alt="${esc(p.name)}" class="w-full aspect-[3/4] object-cover object-top bg-wine"><span class="block text-xs mt-1 text-ivory/70 truncate">${esc(p.name)}</span></button></li>`;
        }).join('');
    }

    function openDrawer() {
        document.body.classList.add('drawer-open');
        $('#drawer').setAttribute('aria-hidden', 'false');
        lenis && lenis.stop();
        setTimeout(() => $('#drawerClose').focus({ preventScroll: true }), 60);
    }
    function closeDrawer() {
        if (!document.body.classList.contains('drawer-open')) return;
        document.body.classList.remove('drawer-open');
        $('#drawer').setAttribute('aria-hidden', 'true');
        lenis && lenis.start();
    }
    function bindBag() {
        $$('.bag-open').forEach(b => b.addEventListener('click', openDrawer));
        $('#drawerClose').addEventListener('click', closeDrawer);
        $('#drawerScrim').addEventListener('click', closeDrawer);
        document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });
        $('#bagList').addEventListener('click', e => { const b = e.target.closest('[data-qty]'); if (b) changeQty(+b.dataset.id, +b.dataset.qty); });
        $('#savedList').addEventListener('click', e => { const b = e.target.closest('[data-saved-open]'); if (b) { closeDrawer(); openQuick(+b.dataset.savedOpen); } });
        $('#orderBtn').addEventListener('click', () => {
            if (!bag.length) return;
            const lines = bag.map(i => { const p = byId(i.id); return `- ${p.name} x${i.qty} (${money(p.price * i.qty)})`; });
            const total = bag.reduce((n, i) => n + i.qty * byId(i.id).price, 0);
            window.open(wa(`Hello Harshinee Fashion, I'd like to order:\n${lines.join('\n')}\n\nTotal: ${money(total)}\n\nPlease confirm availability and sizes.`), '_blank', 'noopener');
        });

        /* swipe the bag closed on phones */
        const drawer = $('#drawer');
        let x0 = null;
        drawer.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
        drawer.addEventListener('touchend', e => {
            if (x0 !== null && e.changedTouches[0].clientX - x0 > 90) closeDrawer();
            x0 = null;
        });
    }

    /* ------------------------------------------------------------------ 9. form, header, touches */
    function bindForm() {
        const f = $('#visitForm');
        const dateInput = f.elements.date;
        dateInput.min = new Date().toISOString().slice(0, 10);
        f.addEventListener('submit', e => {
            e.preventDefault();
            const name = f.elements.name.value.trim();
            $('.err', f).hidden = !!name;
            f.elements.name.setAttribute('aria-invalid', !name);
            if (!name) { f.elements.name.focus(); return; }
            const date = dateInput.value ? new Date(dateInput.value + 'T12:00').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }) : 'a day that suits you';
            const looking = f.elements.looking.selectedOptions[0].text;
            window.open(wa(`Hello Harshinee Fashion, my name is ${name}. I'd like to visit your ${f.elements.boutique.value} boutique on ${date}. I'm looking for: ${looking}.`), '_blank', 'noopener');
        });
    }

    function setupHeader() {
        const header = $('#siteHeader');
        let last = 0;
        const onScroll = y => {
            const solidAt = current === 'home' ? innerHeight * 0.6 : 40;
            header.classList.toggle('is-solid', y > solidAt);
            const hide = y > last && y > 300;
            header.classList.toggle('is-hidden', hide);
            document.body.classList.toggle('header-hidden', hide);
            last = y;
        };
        if (lenis) lenis.on('scroll', e => onScroll(e.scroll));
        else window.addEventListener('scroll', () => onScroll(scrollY), { passive: true });
    }

    function bindMagnetic() {
        if (!FINE_POINTER || !ANIM) return;
        $$('.magnetic').forEach(el => {
            const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' });
            const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' });
            el.addEventListener('pointermove', e => {
                const r = el.getBoundingClientRect();
                xTo((e.clientX - r.left - r.width / 2) * 0.3);
                yTo((e.clientY - r.top - r.height / 2) * 0.4);
            });
            el.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
        });
        const arch = $('#heroArch');
        const rY = gsap.quickTo(arch, 'rotationY', { duration: 1, ease: 'power3' });
        const rX = gsap.quickTo(arch, 'rotationX', { duration: 1, ease: 'power3' });
        window.addEventListener('pointermove', e => {
            if (current !== 'home') return;
            rY((e.clientX / innerWidth - 0.5) * 14);
            rX(-(e.clientY / innerHeight - 0.5) * 10);
        }, { passive: true });
    }

    function footerMotion() {
        if (!ANIM) return;
        gsap.from('.footer-word', { yPercent: 60, ease: 'none', scrollTrigger: { trigger: 'footer', start: 'top bottom', end: 'bottom bottom', scrub: true } });
    }

    /* ------------------------------------------------------------------ boot */
    buildStatic();
    renderGrid(false);
    renderBag();
    bindProducts();
    bindQuick();
    bindBag();
    bindForm();
    setupScroll();
    setupHeader();
    bindRouter();
    bindMagnetic();
    handleRoute(true);

    runLoader().then(() => {
        playIntro(current, 0);
        footerMotion();
        lenis && lenis.start();
        if (hasGsap) ScrollTrigger.refresh();
    });
})();
