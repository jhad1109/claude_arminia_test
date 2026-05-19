// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.section-title, .m-card, .player, .match, .post, .mission__text, .join__form')
  .forEach((el) => {
    el.classList.add('reveal');
    observer.observe(el);
  });

// Animated counters
const counters = document.querySelectorAll('.stat__num');
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.target, 10);
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    requestAnimationFrame(step);
    countObserver.unobserve(el);
  });
}, { threshold: 0.6 });
counters.forEach((c) => countObserver.observe(c));

// Mobile menu toggle (basic)
const burger = document.querySelector('.nav__burger');
const menu = document.querySelector('.nav__menu');
if (burger && menu) {
  burger.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    menu.style.display = open ? 'flex' : '';
    menu.style.position = open ? 'absolute' : '';
    menu.style.top = open ? '64px' : '';
    menu.style.left = open ? '0' : '';
    menu.style.right = open ? '0' : '';
    menu.style.flexDirection = open ? 'column' : '';
    menu.style.background = open ? 'rgba(10,10,10,0.95)' : '';
    menu.style.padding = open ? '24px var(--pad)' : '';
    menu.style.gap = open ? '20px' : '';
    menu.style.borderBottom = open ? '1px solid rgba(255,255,255,0.12)' : '';
  });
}

// Subtle hero parallax
const shield = document.querySelector('.hero__shield');
if (shield && window.matchMedia('(min-width: 980px)').matches) {
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    shield.style.transform = `translate(${x}px, calc(-50% + ${y}px))`;
  });
}
