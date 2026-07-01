// ═══════════════════════════════════════════════════════════
//  catalog.js — логіка каталогу з горизонтальною навігацією
// ═══════════════════════════════════════════════════════════

let currentLang = 'ua';
let currentCategory = 'all';
let filteredTridents = [];
let swiperInstance = null;

function getInitialCategory() {
  if (window.__INITIAL_CATEGORY) return window.__INITIAL_CATEGORY;

  const pathname = window.location.pathname.toLowerCase();
  const matched = pathname.match(/\/categories\/([a-z-]+)\.html$/);

  if (matched && matched[1]) {
    return matched[1];
  }

  return 'all';
}

function navigateWithTransition(url, direction = 'left') {
  document.body.classList.add(direction === 'left' ? 'page-transition-left' : 'page-transition-right');
  window.setTimeout(() => {
    window.location.href = url;
  }, 430);
}

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
    'historical': '◆',
    'military': '◈',
    'political': '✚',
    'charitable': '✿',
    'cultural': '⬢'
  };

  // "Всі" пункт
  const allLi = document.createElement('li');
  const allBtn = document.createElement('button');
  allBtn.className = 'cat-btn';
  allBtn.dataset.id = 'all';
  allBtn.dataset.tooltip = currentLang === 'ua' ? 'Всі тризуби' : 'All Tridents';
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
    btn.innerHTML = `${icons[cat.id] || '◆'}<span class="cat-count">${count}</span>`;
    li.appendChild(btn);
    list.appendChild(li);
  });

  list.querySelectorAll('.cat-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.id === currentCategory);
  });

  list.addEventListener('click', e => {
    const btn = e.target.closest('.cat-btn');
    if (!btn) return;

    e.preventDefault();

    if (btn.dataset.id === 'all') {
      navigateWithTransition('/index.html', 'right');
      return;
    }

    navigateWithTransition(`/categories/${btn.dataset.id}.html`, 'left');
  });
}

function updateCategoryNames() {
  const icons = {
    'all': '✦',
    'historical': '◆',
    'military': '◈',
    'political': '✚',
    'charitable': '✿',
    'cultural': '⬢'
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

  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.id === currentCategory);
  });
}

// ── Автоматичне знаходження тризубів за папками ─────────────
async function loadTridents(category = 'all') {
  const categoryIds = category === 'all' ? CATEGORIES.map(c => c.id) : [category];
  const basePath = window.location.pathname.includes('/categories/') ? '../' : '';
  const results = [];

  for (const catId of categoryIds) {
    const dirUrl = `${basePath}tridents/${catId}/`;
    try {
      const html = await fetch(dirUrl, { cache: 'no-store' }).then(r => r.text());
      const folderMatches = [...html.matchAll(/href="([^"]+\/)"/g)];
      const names = folderMatches
        .map(match => match[1].replace(/\/$/, ''))
        .filter(name => name && name !== '.' && name !== '..');

      names.forEach(name => {
        const titleText = name.replace(/-/g, ' ');
        results.push({
          id: `${catId}-${name}`,
          category: catId,
          svg: `${basePath}tridents/${catId}/${name}/trident.svg`,
          page: `${basePath}tridents/${catId}/${name}/index.html`,
          title: { ua: titleText, en: titleText },
          subtitle: { ua: '', en: '' },
          preview: { ua: '', en: '' }
        });
      });
    } catch (error) {
      console.warn(`Unable to load tridents from ${dirUrl}`, error);
    }
  }

  return results;
}

function filterAndRenderTridents() {
  loadTridents(currentCategory).then(items => {
    filteredTridents = items;
    renderSlides();
    initSwiper();
  }).catch(error => {
    console.error('Failed to load tridents:', error);
    filteredTridents = [];
    renderSlides();
    initSwiper();
  });
}

function renderSlides() {
  const wrapper = document.getElementById('tridentSlides');
  wrapper.innerHTML = '';

  const basePath = window.location.pathname.includes('/categories/') ? '../' : '';

  filteredTridents.forEach((trident) => {
    const pageHref = `${basePath}${trident.page}`;
    const svgSrc = `${basePath}${trident.svg}`;

    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `
      <div class="trident-slide">
        <a class="trident-svg-wrapper" href="${pageHref}">
          <img src="${svgSrc}" alt="${t(trident.title)}" loading="lazy" />
        </a>
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
    loop: filteredTridents.length > 1,
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
      }
    }
  });

  // Обновити кнопки навігації
  updateNavButtons();
}

function updateProgressIndicator() {
  const dots = document.querySelectorAll('.progress-dot');
  if (!swiperInstance) return;

  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === (swiperInstance.activeIndex ?? 0));
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

document.body.addEventListener('click', (e) => {
  const link = e.target.closest('a[href]');
  if (!link) return;

  const href = link.getAttribute('href') || '';
  if (href.includes('/tridents/') && !href.startsWith('http')) {
    e.preventDefault();
    navigateWithTransition(href, 'right');
  }
});

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

  currentCategory = getInitialCategory();
  renderMenu();
  filterAndRenderTridents();
  initMobileMenu();
}

// Запустити при завантаженні документа
document.addEventListener('DOMContentLoaded', init);

