/* IIT Bombay Racing — Gen-Z Interactions */

(function () {
  'use strict';

  /* ─── Utility ─────────────────────────────────────────── */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const isMobile = () => window.innerWidth < 768;

  /* ─── Loader ───────────────────────────────────────────── */
  function initLoader() {
    const loader = $('#loader');
    if (!loader) return;

    const textEl = $('#loaderText');
    const barEl  = $('#loaderBar');
    if (!textEl || !barEl) { hideLoader(loader); return; }

    const msg = '#RacingUpTheLadder';
    let i = 0;
    const type = setInterval(() => {
      textEl.textContent = msg.slice(0, ++i);
      barEl.style.width = `${(i / msg.length) * 100}%`;
      if (i >= msg.length) clearInterval(type);
    }, 60);

    const delay = Math.max(msg.length * 60 + 400, 1400);
    setTimeout(() => hideLoader(loader), delay);
  }

  function hideLoader(loader) {
    loader.classList.add('hidden');
    setTimeout(() => { loader.style.display = 'none'; }, 700);
  }

  /* ─── Custom Cursor (desktop only) ─────────────────────── */
  function initCursor() {
    if (isMobile()) return;
    const dot  = $('#cursorDot');
    const ring = $('#cursorRing');
    if (!dot || !ring) return;

    let mx = -100, my = -100;
    let rx = -100, ry = -100;
    let raf;

    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

    function tick() {
      dot.style.left  = mx + 'px';
      dot.style.top   = my + 'px';
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      raf = requestAnimationFrame(tick);
    }
    tick();

    document.addEventListener('mousedown', () => { dot.classList.add('pressed'); ring.classList.add('pressed'); });
    document.addEventListener('mouseup',   () => { dot.classList.remove('pressed'); ring.classList.remove('pressed'); });
    document.addEventListener('mouseleave', () => cancelAnimationFrame(raf));
    document.addEventListener('mouseenter', () => { raf = requestAnimationFrame(tick); });
  }

  /* ─── Navbar ───────────────────────────────────────────── */
  function initNavbar() {
    const navbar = $('#navbar');
    const toggle = $('#navToggle');
    const menu   = $('#navMenu');
    if (!navbar) return;

    let lastY = 0;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      navbar.classList.toggle('scrolled', y > 80);
      lastY = y;
    }, { passive: true });

    if (toggle && menu) {
      toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('open');
        document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
      });
      $$('a', menu).forEach(a => {
        a.addEventListener('click', () => {
          toggle.classList.remove('active');
          menu.classList.remove('open');
          document.body.style.overflow = '';
        });
      });
      document.addEventListener('click', e => {
        if (!navbar.contains(e.target)) {
          toggle.classList.remove('active');
          menu.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    }
  }

  /* ─── Page Transitions ──────────────────────────────────── */
  function initTransitions() {
    let overlay = $('.page-transition');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'page-transition';
      document.body.appendChild(overlay);
    }

    const pages = ['index.html','team.html','achievements.html','cars.html','partners.html','about.html','media.html','donate.html'];
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel') || link.target) return;
      const isInternal = pages.some(p => href === p || href.startsWith(p));
      if (!isInternal) return;
      link.addEventListener('click', e => {
        e.preventDefault();
        overlay.classList.add('active');
        setTimeout(() => { window.location.href = href; }, 380);
      });
    });
  }

  /* ─── Scroll Reveal ─────────────────────────────────────── */
  function initReveal() {
    const els = $$('.reveal');
    if (!els.length) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    els.forEach(el => obs.observe(el));
  }

  /* ─── Counter Animation ─────────────────────────────────── */
  function initCounters() {
    const counters = $$('.count');
    if (!counters.length) return;

    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el     = entry.target;
        const target = +el.dataset.target;
        const dur    = 1800;
        const start  = performance.now();
        const easeOut = t => 1 - Math.pow(1 - t, 3);

        function step(now) {
          const progress = Math.min((now - start) / dur, 1);
          el.textContent = Math.round(easeOut(progress) * target);
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        obs.unobserve(el);
      });
    }, { threshold: 0.5 });

    counters.forEach(c => obs.observe(c));
  }

  /* ─── Magnetic Buttons ──────────────────────────────────── */
  function initMagnetic() {
    if (isMobile()) return;
    $$('.magnetic').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width  / 2;
        const y = e.clientY - r.top  - r.height / 2;
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  /* ─── Drag-to-scroll (Subsystems Row) ───────────────────── */
  function initDragScroll() {
    const track = $('.subsystems-scroll');
    if (!track) return;

    let isDown = false, startX, scrollLeft;

    track.addEventListener('mousedown', e => {
      isDown = true;
      track.classList.add('dragging');
      startX     = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });
    track.addEventListener('mouseleave', () => { isDown = false; track.classList.remove('dragging'); });
    track.addEventListener('mouseup',    () => { isDown = false; track.classList.remove('dragging'); });
    track.addEventListener('mousemove',  e => {
      if (!isDown) return;
      e.preventDefault();
      const x    = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.4;
      track.scrollLeft = scrollLeft - walk;
    });
  }

  /* ─── Parallax hero content ─────────────────────────────── */
  function initParallax() {
    if (isMobile()) return;
    const hero    = $('.hero');
    const content = $('.hero-content');
    if (!hero || !content) return;

    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y > window.innerHeight) return;
      content.style.transform = `translateY(${y * 0.25}px)`;
      content.style.opacity   = 1 - (y / window.innerHeight) * 1.4;
    }, { passive: true });
  }

  /* ─── Sponsors duplicate for seamless marquee ───────────── */
  function initMarquee() {
    const track = $('.sponsors-track');
    if (!track) return;
    const clone = track.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.parentElement.appendChild(clone);

    track.parentElement.addEventListener('mouseenter', () => {
      track.style.animationPlayState = 'paused';
      clone.style.animationPlayState = 'paused';
    });
    track.parentElement.addEventListener('mouseleave', () => {
      track.style.animationPlayState = 'running';
      clone.style.animationPlayState = 'running';
    });
  }

  /* ─── Smooth scroll for anchors ─────────────────────────── */
  function initSmoothScroll() {
    $$('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = $(a.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  /* ─── Init ──────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initCursor();
    initNavbar();
    initTransitions();
    initReveal();
    initCounters();
    initMagnetic();
    initDragScroll();
    initParallax();
    initMarquee();
    initSmoothScroll();
  });

})();
