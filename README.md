# 🔱 Збірка Тризубів України — README

## Структура проєкту

```
/
├── index.html          ← каталог (не чіпати)
├── style.css           ← спільні стилі (не чіпати)
├── catalog.js          ← логіка каталогу (не чіпати)
├── trident-core.js     ← логіка сторінок (не чіпати)
├── data.js             ← ← ← СПИСОК ВСІХ ТРИЗУБІВ
│
└── tridents/
    └── назва-тризуба/
        ├── index.html  ← ← ← СТОРІНКА ТРИЗУБА (твоя робота!)
        ├── trident.css ← ← ← СТИЛІ СТОРІНКИ (твоя робота!)
        └── trident.svg ← SVG-файл ілюстрації
```

---

## 👩‍💻 РОЗРОБНИКУ: Як додати новий тризуб

### Крок 1 — Скопіюй папку
Скопіюй `tridents/volodymyr-1/` і перейменуй на свого тризуба.
Наприклад: `tridents/mazepa-1/`

### Крок 2 — Постав свій SVG
Заміни `trident.svg` на свій файл.

### Крок 3 — Відредагуй index.html
Знайди коментарі `РОЗРОБНИКУ:` і заповни:
- заголовок сторінки (`<title>`)
- назву і епоху в `.hero-label`
- імена команди в `.team-block`

### Крок 4 — Відредагуй trident.css
Зміни CSS-змінні на початку файлу:
```css
--page-accent: #c9a84c;   /* твій колір акценту */
--page-bg:     #0d0d0f;   /* фон */
```

### Крок 5 — Додай запис у data.js
Відкрий `data.js` в корені, знайди коментар `ДОДАЙ СВІЙ ТРИЗУБ ТУТ`
і скопіюй шаблон. Заповни всі поля.

### Крок 6 — Перевір в браузері
Відкрий `index.html` через Live Server (VS Code) або просто подвійним кліком.

---

## 📚 ДОСЛІДНИКУ: Де писати текст

У файлі `index.html` твого тризуба знайди блок:
```html
<div class="lang-content" id="content-ua">
```
Там пиши текст українською. Структура секцій:

```html
<section class="info-section">
  <h2 class="section-title">Назва розділу</h2>
  <p class="section-text">Твій текст...</p>
</section>
```

Для цитати чи факту:
```html
<blockquote class="info-quote">Цікавий факт...</blockquote>
```

---

## 🌐 ПЕРЕКЛАДАЧУ: Де писати переклад

У тому ж файлі `index.html` знайди блок:
```html
<div class="lang-content hidden" id="content-en">
```
Це точна копія українського блоку — просто переклади текст всередині тегів.
Теги і класи не чіпай.

---

## 🎨 РОЗРОБНИКУ: Готові анімації (вибери одну)

Розкоментуй у `index.html` в блоці `ВЛАСНА АНІМАЦІЯ РОЗРОБНИКА`:

### Parallax при русі миші
```js
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  gsap.to('#tridentImg', { x, y, duration: 0.5, ease: 'power1.out' });
});
```

### Золоте свічення (пульс)
```js
gsap.to('#tridentImg', {
  filter: 'drop-shadow(0 0 30px #c9a84c)',
  duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut'
});
```

### Обертання при наведенні
```js
document.querySelector('.hero-svg-wrap').addEventListener('mouseenter', () => {
  gsap.to('#tridentImg', { rotation: 5, duration: 0.4, ease: 'power2.out' });
});
document.querySelector('.hero-svg-wrap').addEventListener('mouseleave', () => {
  gsap.to('#tridentImg', { rotation: 0, duration: 0.4, ease: 'power2.out' });
});
```

### Мерехтіння (як стара плівка)
```js
gsap.to('#tridentImg', {
  opacity: 0.85, duration: 0.15, repeat: -1, yoyo: true,
  ease: 'steps(1)', repeatDelay: 3
});
```

---

## 🚀 Деплой на PHP-хостинг

1. Заархівуй всю папку проєкту
2. Зайди на свій хостинг через FileManager або FTP (FileZilla)
3. Завантаж і розпакуй в папку `public_html` або `www`
4. Готово — сайт доступний за твоїм доменом

> PHP не потрібен — це статичний сайт (HTML + CSS + JS).
> Будь-який хостинг підійде.

---

## Категорії тризубів

| ID | Назва |
|---|---|
| `historical` | Історичні |
| `military` | Військові |
| `political` | Політичні |
| `charitable` | Благодійні |
| `cultural` | Культурні |
