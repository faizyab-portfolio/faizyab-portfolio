// ============================================================
// FAIZYAB AHMAD — PORTFOLIO — script.js
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- Footer year ---------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- Mobile nav toggle ---------------- */
  const nav = document.querySelector('.nav');
  const burger = document.getElementById('burger');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(isOpen));
    });
    // close menu when a link is tapped
    document.querySelectorAll('[data-nav]').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------------- Scroll reveal ---------------- */
  const revealTargets = document.querySelectorAll(
    '.section__head, .about__copy, .about__bars, .entry, .card, .gallery__item, .contact__grid'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach(el => io.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------------- Stat count-up ---------------- */
  const stats = document.querySelectorAll('.stat__num');
  const animateStat = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    const suffix = el.dataset.suffix || '';
    if (reduceMotion) { el.textContent = target + suffix; return; }

    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if ('IntersectionObserver' in window) {
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStat(entry.target);
          statObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    stats.forEach(el => statObserver.observe(el));
  } else {
    stats.forEach(animateStat);
  }

  /* ---------------- Skill bar fill ---------------- */
  const bars = document.querySelectorAll('.bar__fill');
  if ('IntersectionObserver' in window) {
    const barObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.dataset.fill + '%';
          barObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    bars.forEach(bar => barObserver.observe(bar));
  } else {
    bars.forEach(bar => { bar.style.width = bar.dataset.fill + '%'; });
  }

  /* ---------------- Portfolio filter ---------------- */
  const filterRow = document.getElementById('filterRow');
  const galleryItems = document.querySelectorAll('.gallery__item');

  if (filterRow) {
    filterRow.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;

      filterRow.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const filter = btn.dataset.filter;
      galleryItems.forEach(item => {
        const match = filter === 'all' || item.dataset.cat === filter;
        item.classList.toggle('is-hidden', !match);
      });
    });
  }

  /* ---------------- Back to top button ---------------- */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('is-visible', window.scrollY > 600);
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* ---------------- Contact form ----------------
     No backend on GitHub Pages, so this opens the
     visitor's email client with the message pre-filled.
     Swap this for Formspree / EmailJS if you want it
     to submit silently — instructions are in README.md.
  ------------------------------------------------- */
  const form = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const email = (data.get('email') || '').toString().trim();
      const service = (data.get('service') || 'Not specified').toString();
      const message = (data.get('message') || '').toString().trim();

      if (!name || !email || !message) {
        formNote.textContent = 'Please fill in your name, email and message.';
        formNote.style.color = '#C1440E';
        return;
      }

      const subject = encodeURIComponent(`New enquiry from ${name} — ${service}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nService: ${service}\n\nMessage:\n${message}`
      );

      window.location.href = `mailto:faizyab2023@gmail.com?subject=${subject}&body=${body}`;

      formNote.style.color = '';
      formNote.textContent = 'Opening your email client…';
      form.reset();
    });
  }
});
