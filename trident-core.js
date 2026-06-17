// ═══════════════════════════════════════════════════════════
//  trident-core.js — базова логіка для всіх сторінок тризубів
//  НЕ ЧІПАЙ ЦЕЙ ФАЙЛ
// ═══════════════════════════════════════════════════════════

// ── Swiper: вертикальний свайп ─────────────────────────────
const swiper = new Swiper('.trident-swiper', {
  direction: 'vertical',
  slidesPerView: 1,
  mousewheel: true,
  keyboard: { enabled: true },
  speed: 600,
  on: {
    slideChange: function () {
      if (this.activeIndex === 1) animateInfoSlide();
    }
  }
});

// ── Мова ───────────────────────────────────────────────────
let currentLang = localStorage.getItem('lang') || 'ua';

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Перемикання контенту
  document.getElementById('content-ua').classList.toggle('hidden', lang !== 'ua');
  document.getElementById('content-en').classList.toggle('hidden', lang !== 'en');

  // Перемикання data-ua/data-en атрибутів
  document.querySelectorAll('[data-ua]').forEach(el => {
    el.textContent = el.dataset[lang] || el.dataset.ua;
  });
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => setLang(btn.dataset.lang));
});

// ── GSAP: анімація SVG при завантаженні ───────────────────
function animateHero() {
  const img = document.getElementById('tridentImg');
  if (!img) return;

  gsap.timeline()
    .fromTo(img,
      { opacity: 0, scale: 0.8, filter: 'brightness(0) invert(1)' },
      { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' }
    )
    .fromTo('.hero-label',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    )
    .fromTo('.swipe-hint',
      { opacity: 0 },
      { opacity: 0.5, duration: 0.4 },
      '-=0.2'
    );
}

// ── GSAP: анімація info-слайду ─────────────────────────────
function animateInfoSlide() {
  gsap.fromTo('.info-section',
    { opacity: 0, y: 24 },
    { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
  );
  gsap.fromTo('.team-block',
    { opacity: 0, y: 16 },
    { opacity: 1, y: 0, duration: 0.5, delay: 0.4, ease: 'power2.out' }
  );
}

// ── Ініціалізація ──────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  setLang(currentLang);
  animateHero();
});
