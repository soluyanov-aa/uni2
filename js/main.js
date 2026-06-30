/* ===================================
   ЮНИЛАБ // MARS — Cyberpunk JS
   =================================== */

// ---- DATA ----
const analyses = [
    {
        num: '154',
        title: 'Липопротеин (a)',
        desc: 'Определение концентрации липопротеина (а) в крови — индикатора риска раннего атеросклероза, ИБС и инсульта.',
        price: '1 200 ₽'
    },
    {
        num: '2569',
        title: 'Гастропанель (Пепсиноген I, II, гастрин-17, H. pylori IgG)',
        desc: 'Комплексный анализ крови для неинвазивной оценки состояния слизистой желудка и скрининга атрофического гастрита.',
        price: '6 300 ₽'
    },
    {
        num: '2623',
        title: 'Исследование кала на скрытую кровь (ИХА-FOB)',
        desc: 'Высокочувствительный метод выявления скрытой крови в кале для раннего выявления заболеваний ЖКТ.',
        price: '550 ₽'
    },
    {
        num: '1294',
        title: 'ГЕРПЕС-СКРИН (HSV I/II, VZV, CMV, HHV 6-8, EBV)',
        desc: 'Качественное определение ДНК основных герпес-вирусов. Комплексное обследование на герпес-инфекции.',
        price: '2 700 ₽'
    },
    {
        num: '2211',
        title: 'Фемофлор® ДельтаСкрин',
        desc: 'Расширенное исследование микробиоценоза влагалища: lactobacillus, УПМ, патогены — качественное и количественное определение ДНК.',
        price: '3 000 ₽'
    },
    {
        num: '156',
        title: 'Общий анализ крови (ОАК) с лейкоцитарной формулой',
        desc: 'Базовое исследование для оценки общего состояния здоровья, выявления анемии, воспалений и инфекций.',
        price: '450 ₽'
    },
    {
        num: '300',
        title: 'ТТГ (тиреотропный гормон)',
        desc: 'Основной маркер функции щитовидной железы. Рекомендуется проверять регулярно.',
        price: '380 ₽'
    },
    {
        num: '1201',
        title: 'Витамин D (25-OH)',
        desc: 'Определение уровня витамина D в крови — важного фактора здоровья костей, иммунитета и обмена веществ.',
        price: '890 ₽'
    }
];

const complexes = [
    {
        num: '6084',
        title: 'Нарушение пищеварения у детей',
        desc: 'Копрограмма, Энтерофлор® Дети, ПротоСкрин и ГельмоСкрин (ПЦР). Охватывает до 99,9% кишечной флоры ребёнка.',
        price: '8 900 ₽'
    },
    {
        num: '3015',
        title: 'Стоп-анемия. Основные причины',
        desc: 'Комплексное обследование для выявления причин анемии: железо, ферритин, витамин В12, фолиевая кислота.',
        price: '2 400 ₽'
    },
    {
        num: '3017',
        title: 'Госпитализация в хирургический стационар',
        desc: 'Расширенный комплекс анализов для подготовки к плановым хирургическим операциям. Быстрый результат.',
        price: '4 500 ₽'
    },
    {
        num: '3018',
        title: 'Госпитализация в терапевтический стационар',
        desc: 'Стандартный набор исследований для госпитализации в терапевтическое отделение.',
        price: '3 800 ₽'
    },
    {
        num: '5001',
        title: 'ЮНИ-15: важнейшие показатели здоровья',
        desc: '15 ключевых маркеров здоровья: ОАК, глюкоза, холестерин, АЛТ, АСТ, ТТГ, креатинин и другие.',
        price: '3 200 ₽'
    },
    {
        num: '6090',
        title: 'Здоровая женщина (расширенный)',
        desc: 'Комплекс для женщин: гормоны, онкомаркеры, половые инфекции, биохимия. 30+ показателей.',
        price: '6 700 ₽'
    }
];

const addresses = [
    { name: 'Сектор Светланская', addr: 'ул. Светланская, 18', hours: 'Ежедневно 07:30–19:00' },
    { name: 'Сектор Океанский', addr: 'пр-т Океанский, 98', hours: 'Пн–Сб 08:00–18:00' },
    { name: 'Сектор Русская', addr: 'ул. Русская, 57', hours: 'Ежедневно 07:30–20:00' },
    { name: 'Сектор Семёновская', addr: 'ул. Семёновская, 5', hours: 'Пн–Пт 07:30–19:00' },
    { name: 'Сектор Нейбута', addr: 'ул. Нейбута, 33', hours: 'Ежедневно 08:00–18:00' },
    { name: 'Сектор Гоголя', addr: 'ул. Гоголя, 41', hours: 'Пн–Сб 08:00–17:00' }
];

// ---- MARS CANVAS: floating dust + stars ----
class MarsCanvas {
    constructor() {
        this.canvas = document.getElementById('marsCanvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.resize();
        this.init();
        window.addEventListener('resize', () => this.resize());
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        const count = Math.floor((this.canvas.width * this.canvas.height) / 12000);
        const colors = [
            'rgba(255, 69, 0, ',   // mars glow
            'rgba(255, 107, 26, ', // orange
            'rgba(0, 240, 255, ',  // cyan
            'rgba(255, 214, 10, ', // yellow
            'rgba(255, 255, 255, ' // white star
        ];
        this.particles = [];
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.15,
                vy: Math.random() * 0.1 + 0.05,
                size: Math.random() * 1.8 + 0.4,
                alpha: Math.random() * 0.5 + 0.1,
                color: colors[Math.floor(Math.random() * colors.length)],
                twinkle: Math.random() * Math.PI * 2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.twinkle += 0.02;

            // Wrap around
            if (p.y > this.canvas.height + 5) {
                p.y = -5;
                p.x = Math.random() * this.canvas.width;
            }
            if (p.x > this.canvas.width + 5) p.x = -5;
            if (p.x < -5) p.x = this.canvas.width + 5;

            const flicker = 0.7 + Math.sin(p.twinkle) * 0.3;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color + (p.alpha * flicker) + ')';
            this.ctx.fill();
        });
        requestAnimationFrame(() => this.animate());
    }
}

// ---- HERO SLIDER ----
class HeroSlider {
    constructor() {
        this.slides = document.querySelectorAll('.hero__slide');
        this.dotsContainer = document.getElementById('heroDots');
        this.current = 0;
        this.timer = null;
        this.interval = 5000;

        this.init();
    }

    init() {
        // Create dots
        this.slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'hero__dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', () => this.goTo(i));
            this.dotsContainer.appendChild(dot);
        });

        // Navigation buttons
        document.getElementById('heroPrev').addEventListener('click', () => this.prev());
        document.getElementById('heroNext').addEventListener('click', () => this.next());

        // Auto-play
        this.startAuto();

        // Pause on hover
        document.getElementById('hero').addEventListener('mouseenter', () => this.stopAuto());
        document.getElementById('hero').addEventListener('mouseleave', () => this.startAuto());
    }

    goTo(index) {
        this.slides[this.current].classList.remove('active');
        this.dotsContainer.children[this.current].classList.remove('active');

        this.current = index;

        this.slides[this.current].classList.add('active');
        this.dotsContainer.children[this.current].classList.add('active');
    }

    next() {
        this.goTo((this.current + 1) % this.slides.length);
    }

    prev() {
        this.goTo((this.current - 1 + this.slides.length) % this.slides.length);
    }

    startAuto() {
        this.stopAuto();
        this.timer = setInterval(() => this.next(), this.interval);
    }

    stopAuto() {
        if (this.timer) clearInterval(this.timer);
    }
}

// ---- TABS ----
function initTabs() {
    const tabs = document.querySelectorAll('.tab');
    const panels = document.querySelectorAll('.tab-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;

            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            tab.classList.add('active');
            document.querySelector(`[data-panel="${target}"]`).classList.add('active');
        });
    });
}

// ---- RENDER CARDS ----
function renderProductCard(item) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <span class="product-card__code">ID: ${item.num}</span>
        <h3 class="product-card__title">${item.title}</h3>
        <p class="product-card__desc">${item.desc}</p>
        <div class="product-card__footer">
            <span class="product-card__price">${item.price}</span>
            <button class="product-card__add" title="Добавить в корзину">
                <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
            </button>
        </div>
    `;

    card.querySelector('.product-card__add').addEventListener('click', (e) => {
        e.stopPropagation();
        const btn = e.currentTarget;
        btn.classList.add('added');
        btn.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';
        showToast('Добавлено в корзину');
    });

    return card;
}

function renderCards(containerId, items) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    items.forEach(item => container.appendChild(renderProductCard(item)));
}

// ---- RENDER ADDRESSES ----
function renderAddresses() {
    const container = document.getElementById('addressesGrid');
    container.innerHTML = '';
    addresses.forEach(addr => {
        const card = document.createElement('div');
        card.className = 'address-card';
        card.innerHTML = `
            <div class="address-card__header">
                <div class="address-card__icon">
                    <svg viewBox="0 0 24 24" width="22" height="22"><path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/></svg>
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

// ---- SEARCH ----
function initSearch() {
    const input = document.getElementById('globalSearch');
    const searchContainer = input.closest('.search-bar');

    // Create results overlay
    const results = document.createElement('div');
    results.className = 'search-results';
    searchContainer.appendChild(results);

    const allItems = [...analyses, ...complexes];

    input.addEventListener('input', () => {
        const query = input.value.trim().toLowerCase();

        if (query.length < 2) {
            results.classList.remove('visible');
            return;
        }

        const matches = allItems.filter(item =>
            item.title.toLowerCase().includes(query) ||
            item.desc.toLowerCase().includes(query) ||
            item.num.includes(query)
        ).slice(0, 8);

        if (matches.length === 0) {
            results.innerHTML = '<div class="search-result-item"><span class="search-result-item__title">Данные не найдены</span></div>';
        } else {
            results.innerHTML = matches.map(item => `
                <div class="search-result-item" data-num="${item.num}">
                    <span class="search-result-item__title">${item.title}</span>
                    <span class="search-result-item__price">${item.price}</span>
                </div>
            `).join('');
        }

        results.classList.add('visible');
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!searchContainer.contains(e.target)) {
            results.classList.remove('visible');
        }
    });

    // Enter key
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const first = results.querySelector('.search-result-item');
            if (first) first.click();
        }
    });
}

// ---- TOAST NOTIFICATION ----
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
    toast._timer = setTimeout(() => {
        toast.classList.remove('visible');
    }, 2500);
}

// ---- DROPDOWN (mobile) ----
function initDropdown() {
    const toggle = document.getElementById('dropdownToggle');
    const dropdown = document.getElementById('dropdown');

    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggle.parentElement.classList.toggle('open');
    });

    document.addEventListener('click', () => {
        toggle.parentElement.classList.remove('open');
    });
}

// ---- GLITCH TEXT EFFECT ----
function initGlitchEffect() {
    const logoText = document.querySelector('.logo__text');
    if (!logoText) return;
    
    const original = logoText.textContent;
    const glitchChars = '!<>-_\\/[]{}—=+*^?#________';

    logoText.addEventListener('mouseenter', () => {
        let iterations = 0;
        const interval = setInterval(() => {
            logoText.textContent = original.split('').map((char, i) => {
                if (i < iterations) return original[i];
                return glitchChars[Math.floor(Math.random() * glitchChars.length)];
            }).join('');

            if (iterations >= original.length) {
                clearInterval(interval);
                logoText.textContent = original;
            }

            iterations += 1 / 2;
        }, 40);
    });
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
    new MarsCanvas();
    new HeroSlider();
    initTabs();
    initDropdown();
    initSearch();
    initGlitchEffect();
    renderCards('analysesGrid', analyses);
    renderCards('complexesGrid', complexes);
    renderAddresses();
});
