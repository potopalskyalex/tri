// ═══════════════════════════════════════════════════════════
//  catalog.js — логіка каталогу
// ═══════════════════════════════════════════════════════════

let currentLang = 'ua';
let currentCategory = 'all';

// ── Мова ───────────────────────────────────────────────────
function setLang(lang) {
  currentLang = lang;
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  updateAllText();
  renderGrid();
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

  // "Всі" пункт
  const allLi = document.createElement('li');
  allLi.innerHTML = `<button class="cat-btn active" data-id="all" data-ua="Всі" data-en="All">Всі</button>`;
  list.appendChild(allLi);

  CATEGORIES.forEach(cat => {
    const li = document.createElement('li');
    const count = TRIDENTS.filter(t => t.category === cat.id).length;
    li.innerHTML = `
      <button class="cat-btn" data-id="${cat.id}" data-ua="${cat.ua}" data-en="${cat.en}">
        ${cat.ua} <span class="cat-count">${count}</span>
      </button>`;
    list.appendChild(li);
  });

  list.addEventListener('click', e => {
    const btn = e.target.closest('.cat-btn');
    if (!btn) return;
    currentCategory = btn.dataset.id;
    list.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    updateMenuText();
    renderGrid();
    updateCatalogTitle(btn);
    // Закрити sidebar на мобільному
    document.getElementById('sidebar').classList.remove('open');
  });
}

function updateMenuText() {
  document.querySelectorAll('.cat-btn').forEach(btn => {
    const label = btn.dataset[currentLang] || btn.dataset.ua;
    const countEl = btn.querySelector('.cat-count');
    btn.childNodes[0].textContent = label + ' ';
    if (countEl) btn.appendChild(countEl);
  });
}

function updateCatalogTitle(btn) {
  const titleEl = document.getElementById('catalogTitle');
  titleEl.dataset.ua = btn.dataset.ua || 'Всі тризуби';
  titleEl.dataset.en = btn.dataset.en || 'All tridents';
  titleEl.textContent = btn.dataset[currentLang] || btn.dataset.ua;
}

// ── Сітка карток ───────────────────────────────────────────
function renderGrid() {
  const filtered = currentCategory === 'all'
    ? TRIDENTS
    : TRIDENTS.filter(tr => tr.category === currentCategory);

  const countEl = document.getElementById('catalogCount');
  countEl.textContent = currentLang === 'ua'
    ? `${filtered.length} тризубів`
    : `${filtered.length} tridents`;

  const grid = document.getElementById('grid');
  grid.innerHTML = '';

  filtered.forEach((tr, i) => {
    const card = document.createElement('a');
    card.className = 'card';
    card.href = tr.page;
    card.style.setProperty('--i', i);
    card.innerHTML = `
      <div class="card-svg">
        <img src="${tr.svg}" alt="${t(tr.title)}" loading="lazy" onerror="this.style.opacity=0.2"/>
      </div>
      <div class="card-body">
        <p class="card-subtitle">${t(tr.subtitle)}</p>
        <h2 class="card-title">${t(tr.title)}</h2>
        <p class="card-preview">${t(tr.preview)}</p>
      </div>
      <div class="card-arrow">→</div>
    `;
    grid.appendChild(card);
  });

  // GSAP — анімація появи карток
  gsap.fromTo('.card',
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.4, stagger: 0.07, ease: 'power2.out' }
  );
}

// ── Sidebar toggle (мобільний) ─────────────────────────────
document.getElementById('sidebarToggle').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('open');
});

// ── Lang switch ────────────────────────────────────────────
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => setLang(btn.dataset.lang));
});

// ── Ініціалізація ──────────────────────────────────────────
renderMenu();
renderGrid();
