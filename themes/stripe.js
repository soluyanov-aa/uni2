/* ===================================
   ЮНИЛАБ — Stripe Style
   Google Material 3 × Apple HIG
   =================================== */

// ---- DATA ----
const analyses = [
    { num: '154',  title: 'Липопротеин (a)', desc: 'Индикатор риска раннего атеросклероза, ИБС и инсульта.', price: '1 200 ₽', tags: ['men','seniors'] },
    { num: '2569', title: 'Гастропанель', desc: 'Неинвазивная оценка состояния слизистой желудка и скрининг атрофического гастрита.', price: '6 300 ₽', tags: ['all'] },
    { num: '2623', title: 'Кал на скрытую кровь (ИХА-FOB)', desc: 'Раннее выявление заболеваний ЖКТ.', price: '550 ₽', tags: ['seniors','men'] },
    { num: '1294', title: 'Герпес-скрин (HSV, VZV, CMV, EBV)', desc: 'Комплексное обследование на герпес-вирусы.', price: '2 700 ₽', tags: ['women','men'] },
    { num: '2211', title: 'Фемофлор® ДельтаСкрин', desc: 'Расширенное исследование микробиоценоза влагалища.', price: '3 000 ₽', tags: ['women'] },
    { num: '156',  title: 'Общий анализ крови (ОАК)', desc: 'Базовое исследование для оценки общего состояния здоровья.', price: '450 ₽', tags: ['all'] },
    { num: '300',  title: 'ТТГ (тиреотропный гормон)', desc: 'Основной маркер функции щитовидной железы.', price: '380 ₽', tags: ['women','seniors'] },
    { num: '1201', title: 'Витамин D (25-OH)', desc: 'Важный фактор здоровья костей, иммунитета и обмена веществ.', price: '890 ₽', tags: ['all','children'] },
];

const complexes = [
    { num: '6084', title: 'Нарушение пищеварения у детей', desc: 'Копрограмма, Энтерофлор®, ГельмоСкрин. До 99,9% кишечной флоры ребёнка.', price: '8 900 ₽', tags: ['children'] },
    { num: '3015', title: 'Стоп-анемия', desc: 'Выявление причин анемии: железо, ферритин, витамин В12, фолиевая кислота.', price: '2 400 ₽', tags: ['women','seniors'] },
    { num: '3017', title: 'Госпитализация (хирургия)', desc: 'Расширенный комплекс для подготовки к плановым операциям.', price: '4 500 ₽', tags: ['all'] },
    { num: '3018', title: 'Госпитализация (терапия)', desc: 'Стандартный набор исследований для госпитализации.', price: '3 800 ₽', tags: ['all'] },
    { num: '5001', title: 'ЮНИ-15: важнейшие показатели', desc: '15 ключевых маркеров здоровья: ОАК, глюкоза, холестерин, ТТГ и др.', price: '3 200 ₽', tags: ['all'] },
    { num: '6090', title: 'Здоровая женщина (расширенный)', desc: 'Гормоны, онкомаркеры, половые инфекции. 30+ показателей.', price: '6 700 ₽', tags: ['women'] },
];

const addresses = [
    { name: 'Светланская',  addr: 'ул. Светланская, 18',  hours: 'Ежедневно 07:30–19:00' },
    { name: 'Океанский',    addr: 'пр-т Океанский, 98',   hours: 'Пн–Сб 08:00–18:00' },
    { name: 'Русская',      addr: 'ул. Русская, 57',      hours: 'Ежедневно 07:30–20:00' },
    { name: 'Семёновская',  addr: 'ул. Семёновская, 5',   hours: 'Пн–Пт 07:30–19:00' },
    { name: 'Нейбута',      addr: 'ул. Нейбута, 33',      hours: 'Ежедневно 08:00–18:00' },
    { name: 'Гоголя',       addr: 'ул. Гоголя, 41',       hours: 'Пн–Сб 08:00–17:00' },
];

const audienceLabels = {
    women:   'Для женщин',
    men:     'Для мужчин',
    children:'Для детей',
    seniors: 'Для пожилых',
};

// ---- STATE ----
let cartCount = 0;

// ---- THEME ----
function initTheme() {
    const saved = localStorage.getItem('ul-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    if (theme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
}

function toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('ul-theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('ul-theme', 'dark');
    }
}

// ---- HEADER SCROLL ----
function initHeaderScroll() {
    const appBar = document.getElementById('appBar');
    const fab = document.getElementById('fab');
    let ticking = false;

    function onScroll() {
        if (window.scrollY > 8) appBar.classList.add('scrolled');
        else appBar.classList.remove('scrolled');

        if (window.scrollY > 400) fab.classList.add('visible');
        else fab.classList.remove('visible');

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(onScroll);
            ticking = true;
        }
    }, { passive: true });

    fab.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ---- MOBILE MENU ----
function initMobileMenu() {
    const toggle = document.getElementById('menuToggle');
    const menu = document.getElementById('mobileMenu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        const isOpen = menu.classList.toggle('open');
        toggle.classList.toggle('active', isOpen);
    });

    menu.querySelectorAll('.mobile-menu__link').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('open');
            toggle.classList.remove('active');
        });
    });
}

// ---- SEARCH ----
function initSearch() {
    const toggle = document.getElementById('searchToggle');
    const expand = document.getElementById('searchExpand');
    const close = document.getElementById('searchClose');
    const input = document.getElementById('globalSearch');
    const results = document.getElementById('searchResults');
    if (!toggle || !expand || !input) return;

    toggle.addEventListener('click', () => {
        expand.classList.add('open');
        setTimeout(() => input.focus(), 300);
    });

    close.addEventListener('click', () => {
        expand.classList.remove('open');
        input.value = '';
        results.innerHTML = '';
    });

    const allItems = [...analyses, ...complexes];

    input.addEventListener('input', () => {
        const q = input.value.trim().toLowerCase();
        if (q.length < 2) { results.innerHTML = ''; return; }

        const matches = allItems.filter(item =>
            item.title.toLowerCase().includes(q) ||
            item.desc.toLowerCase().includes(q) ||
            item.num.includes(q)
        ).slice(0, 6);

        if (matches.length === 0) {
            results.innerHTML = '<div class="search-result-item"><span class="search-result-item__title">Ничего не найдено</span></div>';
        } else {
            results.innerHTML = matches.map(item => `
                <div class="search-result-item" data-num="${item.num}">
                    <span class="search-result-item__title">${item.title}</span>
                    <span class="search-result-item__price">${item.price}</span>
                </div>
            `).join('');
        }
    });

    document.addEventListener('click', (e) => {
        if (!expand.contains(e.target) && !toggle.contains(e.target)) {
            expand.classList.remove('open');
        }
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            expand.classList.remove('open');
            input.value = '';
            results.innerHTML = '';
        }
    });
}

// ---- SEGMENTED TABS ----
function initTabs() {
    const tabs = document.querySelectorAll('.segmented__btn');
    const panels = document.querySelectorAll('.tab-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            const panel = document.querySelector(`[data-panel="${target}"]`);
            if (panel) panel.classList.add('active');
        });
    });
}

// ---- AUDIENCE FILTER ----
function initAudience() {
    const cards = document.querySelectorAll('.audience-card');
    const results = document.getElementById('audienceResults');
    const grid = document.getElementById('audienceGrid');
    const title = document.getElementById('audienceResultsTitle');
    const reset = document.getElementById('audienceReset');
    if (!cards.length) return;

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const audience = card.dataset.audience;
            cards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');

            const filtered = [...analyses, ...complexes].filter(item =>
                item.tags.includes(audience) || item.tags.includes('all')
            );

            title.textContent = audienceLabels[audience];
            results.style.display = 'block';
            renderCards(grid, filtered);

            results.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    if (reset) {
        reset.addEventListener('click', () => {
            cards.forEach(c => c.classList.remove('active'));
            results.style.display = 'none';
        });
    }
}

// ---- RENDER CARDS ----
function renderProductCard(item) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <span class="product-card__code">№ ${item.num}</span>
        <h3 class="product-card__title">${item.title}</h3>
        <p class="product-card__desc">${item.desc}</p>
        <div class="product-card__footer">
            <span class="product-card__price">${item.price}</span>
            <button class="product-card__add" title="Добавить в корзину" aria-label="Добавить в корзину">
                <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
            </button>
        </div>
    `;

    card.querySelector('.product-card__add').addEventListener('click', (e) => {
        e.stopPropagation();
        const btn = e.currentTarget;
        btn.classList.add('added');
        btn.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';
        cartCount++;
        updateCartBadge();
        showToast('Добавлено в корзину');
    });

    return card;
}

function renderCards(container, items) {
    container.innerHTML = '';
    items.forEach(item => container.appendChild(renderProductCard(item)));
}

// ---- RENDER ADDRESSES ----
function renderAddresses() {
    const container = document.getElementById('addressesGrid');
    if (!container) return;
    container.innerHTML = '';
    addresses.forEach(addr => {
        const card = document.createElement('div');
        card.className = 'address-card';
        card.innerHTML = `
            <div class="address-card__header">
                <div class="address-card__icon">
                    <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.2 2.2 0 010-5 2.2 2.2 0 010 5z"/></svg>
                </div>
                <span class="address-card__name">${addr.name}</span>
            </div>
            <p class="address-card__addr">${addr.addr}</p>
            <div class="address-card__hours">
                <span class="dot"></span>
                <span>${addr.hours}</span>
            </div>
        `;
        container.appendChild(card);
    });
}

// ---- CART BADGE ----
function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    if (badge) {
        badge.textContent = cartCount;
        badge.dataset.count = cartCount;
    }
}

// ---- TOAST ----
function showToast(message) {
    let toast = document.querySelector('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('visible');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('visible'), 2500);
}

// ---- REVEAL ON SCROLL ----
function initReveal() {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(el => observer.observe(el));
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);
    initHeaderScroll();
    initMobileMenu();
    initSearch();
    initTabs();
    initAudience();
    initReveal();
    renderCards(document.getElementById('analysesGrid'), analyses);
    renderCards(document.getElementById('complexesGrid'), complexes);
    renderAddresses();
    updateCartBadge();
});
