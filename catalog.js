// ═══════════════════════════════════════════════════════════
//  catalog.js — логіка каталогу з горизонтальною навігацією
// ═══════════════════════════════════════════════════════════

let currentLang = 'ua';
let currentCategory = 'all';
let filteredTridents = [];
let swiperInstance = null;

// ── Мова ───────────────────────────────────────────────────
function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  updateAllText();
  updateCategoryNames();
  updateTridentInfo();
}

function t(obj) {
  return obj[currentLang] || obj.ua;
}

function updateAllText() {
  document.querySelectorAll('[data-ua]').forEach(el => {
    el.textContent = el.dataset[currentLang] || el.dataset.ua;
  });
}

// ── Меню категорій ─────────────────────────────────────────
function renderMenu() {
  const list = document.getElementById('categoryList');
  list.innerHTML = '';

  // Іконки для категорій
  const icons = {
    'all': '✦',
    'historical': '⚔',
    'military': '🛡',
    'political': '👑',
    'charitable': '❤',
    'cultural': '🎭'
  };

  // "Всі" пункт
  const allLi = document.createElement('li');
  const allBtn = document.createElement('button');
  allBtn.className = 'cat-btn active';
  allBtn.dataset.id = 'all';
  allBtn.dataset.tooltip = currentLang === 'ua' ? 'Всі тризуби' : 'All Tridents';
  allBtn.textContent = icons['all'];
  allBtn.innerHTML = `${icons['all']}<span class="cat-count">−</span>`;
  allLi.appendChild(allBtn);
  list.appendChild(allLi);

  CATEGORIES.forEach(cat => {
    const li = document.createElement('li');
    const count = TRIDENTS.filter(t => t.category === cat.id).length;
    const btn = document.createElement('button');
    btn.className = 'cat-btn';
    btn.dataset.id = cat.id;
    btn.dataset.tooltip = currentLang === 'ua' ? cat.ua : cat.en;
    btn.textContent = icons[cat.id] || '◆';
    btn.innerHTML = `${icons[cat.id] || '◆'}<span class="cat-count">${count}</span>`;
    li.appendChild(btn);
    list.appendChild(li);
  });

  list.addEventListener('click', e => {
    const btn = e.target.closest('.cat-btn');
    if (!btn) return;
    currentCategory = btn.dataset.id;
    list.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Генерувати новий набір тризубів для даної категорії
    filterAndRenderTridents();
    
    // Закрити sidebar на мобільному
    document.querySelector('.sidebar-panel').classList.remove('open');
  });
}

function updateCategoryNames() {
  const icons = {
    'all': '✦',
    'historical': '⚔',
    'military': '🛡',
    'political': '👑',
    'charitable': '❤',
    'cultural': '🎭'
  };

  // Оновити tooltip для "Всі"
  const allBtn = document.querySelector('.cat-btn[data-id="all"]');
  if (allBtn) {
    allBtn.dataset.tooltip = currentLang === 'ua' ? 'Всі тризуби' : 'All Tridents';
  }

  // Оновити tooltip для категорій
  CATEGORIES.forEach(cat => {
    const btn = document.querySelector(`.cat-btn[data-id="${cat.id}"]`);
    if (btn) {
      btn.dataset.tooltip = currentLang === 'ua' ? cat.ua : cat.en;
    }
  });
}

// ── Фільтрування та генерація слайдів ───────────────────────
function filterAndRenderTridents() {
  filteredTridents = currentCategory === 'all'
    ? [...TRIDENTS]
    : TRIDENTS.filter(tr => tr.category === currentCategory);

  renderSlides();
  initSwiper();
}

function renderSlides() {
  const wrapper = document.getElementById('tridentSlides');
  wrapper.innerHTML = '';

  filteredTridents.forEach((trident, index) => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `
      <div class="trident-slide">
        <div class="trident-svg-wrapper">
          <img src="${trident.svg}" alt="${t(trident.title)}" loading="lazy" />
        </div>
        <div class="trident-info">
          <p class="trident-subtitle">${t(trident.subtitle)}</p>
          <h2 class="trident-title">${t(trident.title)}</h2>
          <p class="trident-preview">${t(trident.preview)}</p>
        </div>
      </div>
    `;
    wrapper.appendChild(slide);
  });

  // Оновити індикатор прогресу
  renderProgressIndicator();
}

function renderProgressIndicator() {
  const container = document.getElementById('progressIndicator');
  container.innerHTML = '';

  filteredTridents.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = 'progress-dot' + (index === 0 ? ' active' : '');
    dot.addEventListener('click', () => {
      if (swiperInstance) {
        swiperInstance.slideTo(index);
      }
    });
    container.appendChild(dot);
  });
}

function updateTridentInfo() {
  if (swiperInstance) {
    const activeIndex = swiperInstance.activeIndex;
    const trident = filteredTridents[activeIndex];
    if (trident) {
      const infoEl = document.querySelector('.swiper-slide-active .trident-info');
      if (infoEl) {
        infoEl.querySelector('.trident-subtitle').textContent = t(trident.subtitle);
        infoEl.querySelector('.trident-title').textContent = t(trident.title);
        infoEl.querySelector('.trident-preview').textContent = t(trident.preview);
      }
    }
  }
}

// ── Ініціалізація Swiper ────────────────────────────────────
function initSwiper() {
  if (swiperInstance) {
    swiperInstance.destroy();
  }

  swiperInstance = new Swiper('.tridents-swiper', {
    direction: 'horizontal',
    slidesPerView: 1,
    spaceBetween: 0,
    loop: false,
    mousewheel: false,
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    speed: 600,
    threshold: 10,
    grabCursor: true,
    on: {
      slideChange: function() {
        updateProgressIndicator();
      },
      reachEnd: function() {
        // Можна додати повідомлення при достиганню кінця
      }
    }
  });

  // Обновити кнопки навігації
  updateNavButtons();
}

function updateProgressIndicator() {
  const dots = document.querySelectorAll('.progress-dot');
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === swiperInstance.activeIndex);
  });
}

function updateNavButtons() {
  const prevBtn = document.querySelector('.nav-prev');
  const nextBtn = document.querySelector('.nav-next');

  prevBtn.addEventListener('click', () => {
    if (swiperInstance) swiperInstance.slidePrev();
  });

  nextBtn.addEventListener('click', () => {
    if (swiperInstance) swiperInstance.slideNext();
  });
}

// ── Мобільна панель (sidebar toggle) ─────────────────────
function initMobileMenu() {
  const sidebarPanel = document.querySelector('.sidebar-panel');
  const toggleBtn = document.getElementById('sidebarToggleMobile');

  // Кнопка toggle для мобільного
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      sidebarPanel.classList.toggle('open');
      toggleBtn.classList.toggle('active');
    });
  }

  // Закривати сайдбар при натисканні на категорію
  document.getElementById('categoryList').addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      sidebarPanel.classList.remove('open');
      if (toggleBtn) toggleBtn.classList.remove('active');
    }
  });

  // Закривати сайдбар при натисканні поза ним на мобільному
  if (window.innerWidth <= 768) {
    document.addEventListener('click', (e) => {
      if (!sidebarPanel.contains(e.target) && 
          !toggleBtn?.contains(e.target) && 
          sidebarPanel.classList.contains('open')) {
        sidebarPanel.classList.remove('open');
        if (toggleBtn) toggleBtn.classList.remove('active');
      }
    });
  }
}

// ── Lang switch ────────────────────────────────────────────
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    setLang(btn.dataset.lang);
  });
});

// ── Інициализація ──────────────────────────────────────────
function init() {
  // Відновити збережену мову
  const savedLang = localStorage.getItem('lang') || 'ua';
  currentLang = savedLang;
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });

  renderMenu();
  filterAndRenderTridents();
  initMobileMenu();
}

// Запустити при завантаженні документа
document.addEventListener('DOMContentLoaded', init);

