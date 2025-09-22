// apps.js - render categories, cards, search/filters, and featured slider input
const state = { q: '', category: '', tech: '' };
let APPS = [];

const CARD_GRADIENTS = ['card-gradient-sunrise', 'card-gradient-cyan', 'card-gradient-fuchsia', 'card-gradient-amber'];

const FEATURED_SLIDES = [
  {
    title: 'Sesh Image Gen',
    subtitle: 'Generate on-brand visuals in a tap',
    category: 'Creator Tools',
    image: 'images/sesh-image-gen.jpg',
    href: 'https://sesh-image-gen.vercel.app/image-gen',
    external: true,
  },
  {
    title: 'Tetris XR',
    subtitle: 'Tetris with motion-powered twists',
    category: 'Games',
    image: 'images/tetris.png',
    href: 'https://tetris-20250303-131918.vercel.app/',
    external: true,
  },
  {
    title: 'Video to Audio Transformer',
    subtitle: 'Strip audio tracks from clips in seconds',
    category: 'Utilities',
    image: 'images/video2audio.jpg',
    href: 'https://video-to-audio-transformer.vercel.app/',
    external: true,
  },
  {
    title: 'One Piece 3D Chess',
    subtitle: 'Sail the Grand Line on a 3D board',
    category: 'Games',
    image: 'images/oneppiece.png',
    href: 'https://onepiece-3d-chess.vercel.app/',
    external: true,
  },
];

const $ = (sel, parent = document) => parent.querySelector(sel);
const $$ = (sel, parent = document) => Array.from(parent.querySelectorAll(sel));

async function boot() {
  try {
    const res = await fetch('/assets/data/apps.json');
    APPS = await res.json();
  } catch (err) {
    console.error('Failed to load apps.json', err);
    return;
  }

  const params = new URLSearchParams(location.search);
  state.q = params.get('q') || '';
  state.category = params.get('category') || '';
  state.tech = params.get('tech') || '';

  buildFilters(APPS);
  bindFilterInputs();
  renderFeatured();
  renderGrid(filterApps());
}

function buildFilters(apps) {
  const categories = Array.from(new Set(apps.map((a) => a.category).filter(Boolean))).sort();
  const techs = Array.from(new Set(apps.flatMap((a) => a.tech || []))).sort();

  const chipsRoot = $('#category-chips');
  if (chipsRoot) {
    chipsRoot.innerHTML = '';
    ['All', ...categories].forEach((cat) => {
      const chip = document.createElement('button');
      chip.className = 'chip';
      chip.type = 'button';
      chip.textContent = cat;
      chip.setAttribute('aria-pressed', state.category === cat ? 'true' : 'false');
      chip.addEventListener('click', () => {
        state.category = cat === 'All' ? '' : cat;
        updateURL();
        $$('.chip', chipsRoot).forEach((c) => c.setAttribute('aria-pressed', 'false'));
        chip.setAttribute('aria-pressed', 'true');
        renderGrid(filterApps());
      });
      chipsRoot.appendChild(chip);
    });
  }

  const catSel = $('#category');
  if (catSel) {
    catSel.innerHTML = '<option value="">All categories</option>' + categories
      .map((c) => `<option${state.category === c ? ' selected' : ''}>${c}</option>`)
      .join('');
    catSel.onchange = () => {
      state.category = catSel.value;
      updateURL();
      renderGrid(filterApps());
    };
  }

  const techSel = $('#tech');
  if (techSel) {
    techSel.innerHTML = '<option value="">All tech</option>' + techs
      .map((t) => `<option${state.tech === t ? ' selected' : ''}>${t}</option>`)
      .join('');
    techSel.onchange = () => {
      state.tech = techSel.value;
      updateURL();
      renderGrid(filterApps());
    };
  }
}

function bindFilterInputs() {
  const q = $('#q');
  if (!q) return;
  q.value = state.q;
  let timer;
  q.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      state.q = q.value.trim();
      updateURL();
      renderGrid(filterApps());
    }, 200);
  });
}

function updateURL() {
  const params = new URLSearchParams();
  if (state.q) params.set('q', state.q);
  if (state.category) params.set('category', state.category);
  if (state.tech) params.set('tech', state.tech);
  const url = params.toString() ? `?${params.toString()}` : location.pathname;
  history.replaceState(null, '', url);
}

function filterApps() {
  const q = state.q.toLowerCase();
  return APPS.filter((a) => {
    const haystack = [a.title, a.tagline, ...(a.tags || [])]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    const matchesQ = !q || haystack.includes(q);
    const matchesCat = !state.category || a.category === state.category;
    const matchesTech = !state.tech || (a.tech || []).includes(state.tech);
    return matchesQ && matchesCat && matchesTech;
  }).sort((a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0));
}

function getGradientClass(index) {
  return CARD_GRADIENTS[index % CARD_GRADIENTS.length];
}

function cardHTML(app, index = 0) {
  const gradientClass = getGradientClass(index);
  const category = app.category || (app.tags && app.tags[0]) || 'Featured';
  const summary = app.tagline || app.shortDescription || '';
  const tagLine = (app.tags || []).slice(0, 2).join(' | ');
  const live = app.liveUrl
    ? `<a href="${app.liveUrl}" class="btn" target="_blank" rel="noopener">Live</a>`
    : '';
  const repo = app.repoUrl
    ? `<a href="${app.repoUrl}" class="btn" target="_blank" rel="noopener">Repo</a>`
    : '';
  return `
    <article class="card ${gradientClass}">
      <div class="card-media">
        <img src="${app.coverImage}" alt="${app.title} cover" loading="lazy" />
      </div>
      <div class="card-body">
        <span class="card-category">${category}</span>
        <h3>${app.title}</h3>
        <p class="card-tagline">${summary}</p>
        ${tagLine ? `<p class="card-tags">${tagLine}</p>` : ''}
        <div class="card-actions">
          <a href="/apps/app.html?slug=${app.slug}" class="btn">Details</a>
          ${live}${repo}
        </div>
      </div>
    </article>
  `;
}

function renderGrid(apps) {
  const root = $('#apps-grid');
  if (!root) return;

  if (!apps.length) {
    root.innerHTML = '<p class="empty-state">No results. Try a different filter.</p>';
    return;
  }

  root.innerHTML = `
    <div class="swiper apps-swiper">
      <div class="swiper-wrapper">
        ${apps.map((a, index) => `<div class="swiper-slide">${cardHTML(a, index)}</div>`).join('')}
      </div>
      <div class="swiper-pagination" aria-hidden="true"></div>
      <div class="swiper-button-prev" aria-label="Previous apps"></div>
      <div class="swiper-button-next" aria-label="Next apps"></div>
    </div>
  `;

  if (window.initGallerySwiper) {
    window.initGallerySwiper();
  }
}

function renderFeatured() {
  const root = $('#featured-carousel');
  if (!root) return;

  const slides = FEATURED_SLIDES.length
    ? FEATURED_SLIDES
    : APPS.filter((a) => a.status === 'live').slice(0, 4).map((app) => ({
        title: app.title,
        subtitle: app.tagline || app.shortDescription || '',
        category: app.category || '',
        image: app.coverImage,
        href: `/apps/app.html?slug=${app.slug}`,
        external: false,
      }));

  if (!slides.length) {
    root.innerHTML = '<p class="empty-state">No featured apps yet.</p>';
    return;
  }

  root.innerHTML = `
    <div class="swiper featured-swiper">
      <div class="swiper-wrapper">
        ${slides
          .map((slide, index) => {
            const attrs = slide.external ? ' target="_blank" rel="noopener"' : '';
            return `
              <div class="swiper-slide">
                <article class="card ${getGradientClass(index)} featured-card">
                  <div class="card-media">
                    <a href="${slide.href}"${attrs}>
                      <img src="${slide.image}" alt="${slide.title}" loading="lazy" />
                    </a>
                  </div>
                  <div class="card-body">
                    ${slide.category ? `<span class="card-category">${slide.category}</span>` : ''}
                    <h3>${slide.title}</h3>
                    ${slide.subtitle ? `<p class="card-tagline">${slide.subtitle}</p>` : ''}
                  </div>
                </article>
              </div>`;
          })
          .join('')}
      </div>
      <div class="swiper-pagination" aria-hidden="true"></div>
      <div class="swiper-button-prev" aria-label="Previous featured"></div>
      <div class="swiper-button-next" aria-label="Next featured"></div>
    </div>
  `;

  if (window.initFeaturedSwiper) {
    window.initFeaturedSwiper();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}

