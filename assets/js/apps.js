// apps.js - render categories, cards, search/filters, and featured slider input
const state = { q: '', category: '', tech: '' };
let APPS = [];

const CARD_GRADIENTS = ['card-gradient-sunrise', 'card-gradient-cyan', 'card-gradient-fuchsia', 'card-gradient-amber'];
const DATA_URL = new URL('../data/apps.json', import.meta.url);
const SITE_ROOT = new URL('../..', import.meta.url);

const $ = (sel, parent = document) => parent.querySelector(sel);
const $$ = (sel, parent = document) => Array.from(parent.querySelectorAll(sel));

async function boot() {
  try {
    const res = await fetch(DATA_URL);
    if (!res.ok) throw new Error(`Failed to fetch apps.json (${res.status})`);
    APPS = await res.json();
  } catch (err) {
    console.error('Failed to load apps.json', err);
    showDataError();
    return;
  }

  const params = new URLSearchParams(location.search);
  state.q = params.get('q') || '';
  state.category = params.get('category') || '';
  state.tech = params.get('tech') || '';

  buildFilters(APPS);
  bindFilterInputs();
  renderFeatured(APPS.filter((a) => a.status === 'live').slice(0, 8));
  renderGrid(filterApps());
}

function showDataError() {
  const message = location.protocol === 'file:'
    ? 'To view the apps gallery, run the site with a local server (e.g., `npx serve`) or adjust the data paths.'
    : 'Unable to load apps right now. Please refresh and try again.';
  const fallback = `<p class="empty-state">${message}</p>`;
  const featured = $('#featured-carousel');
  if (featured && !featured.innerHTML) featured.innerHTML = fallback;
  const grid = $('#apps-grid');
  if (grid && !grid.innerHTML) grid.innerHTML = fallback;
}

function resolveAssetPath(path) {
  if (!path) return '';
  if (/^(?:https?:|data:|blob:)/i.test(path)) return path;
  // Handle paths starting with / - treat as root-relative
  if (path.startsWith('/')) {
    return path; // Return as-is for root-relative paths
  }
  // Handle relative paths
  const normalized = path.replace(/^\/+/, '');
  return new URL(normalized, SITE_ROOT).href;
}

function resolveInternalPath(path) {
  if (!path) return '';
  const normalized = path.replace(/^\/+/, '');
  const url = new URL(normalized, SITE_ROOT);
  return location.protocol === 'file:' ? url.href : url.pathname + url.search;
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
  const detailHref = resolveInternalPath(`apps/app.html?slug=${encodeURIComponent(app.slug)}`);
  const imageLink = app.liveUrl || detailHref;
  const imageAttrs = app.liveUrl ? ' target="_blank" rel="noopener"' : '';
  const cover = resolveAssetPath(app.coverImage) || resolveAssetPath('images/newbg.jpg');
  const live = app.liveUrl
    ? `<a href="${app.liveUrl}" class="btn" target="_blank" rel="noopener">Live</a>`
    : '';
  const repo = app.repoUrl
    ? `<a href="${app.repoUrl}" class="btn" target="_blank" rel="noopener">Repo</a>`
    : '';
  return `
    <article class="card ${gradientClass}">
      <div class="card-media">
        <a href="${imageLink}"${imageAttrs}>
          <img src="${cover}" alt="${app.title} cover" loading="lazy" />
        </a>
      </div>
      <div class="card-body">
        <span class="card-category">${category}</span>
        <h3>${app.title}</h3>
        <p class="card-tagline">${summary}</p>
        ${tagLine ? `<p class="card-tags">${tagLine}</p>` : ''}
        <div class="card-actions">
          <a href="${detailHref}" class="btn">Details</a>
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

let carouselIndex = 0;

function carouselPrev() {
  const slides = document.querySelectorAll('.carousel-slide');
  if (slides.length === 0) return;
  carouselIndex = (carouselIndex - 1 + slides.length) % slides.length;
  updateCarousel();
}

function carouselNext() {
  const slides = document.querySelectorAll('.carousel-slide');
  if (slides.length === 0) return;
  carouselIndex = (carouselIndex + 1) % slides.length;
  updateCarousel();
}

function updateCarousel() {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  slides.forEach((slide, i) => {
    slide.style.display = i === carouselIndex ? 'flex' : 'none';
  });
  dots.forEach((dot, i) => {
    if (i === carouselIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

function renderFeatured(apps) {
  const root = $('#featured-carousel');
  if (!root) return;
  if (!apps.length) {
    root.innerHTML = '<p class="empty-state">No featured apps yet.</p>';
    return;
  }

  window.carouselPrev = carouselPrev;
  window.carouselNext = carouselNext;

  root.innerHTML = `
    <div class="simple-carousel">
      <div class="carousel-container">
        ${apps.map((a) => {
          const img = resolveAssetPath(a.coverImage) || resolveAssetPath('images/newbg.jpg');
          const link = a.liveUrl || resolveInternalPath(`apps/app.html?slug=${encodeURIComponent(a.slug)}`);
          const target = a.liveUrl ? ' target="_blank" rel="noopener"' : '';
          return `
            <div class="carousel-slide" style="display: none;">
              <a href="${link}"${target}>
                <img src="${img}" alt="${a.title}" />
              </a>
            </div>
          `;
        }).join('')}
      </div>
      <button onclick="carouselPrev()" class="carousel-btn carousel-prev">‹</button>
      <button onclick="carouselNext()" class="carousel-btn carousel-next">›</button>
      <div class="carousel-dots">
        ${apps.map((_, i) => `<span class="carousel-dot ${i === 0 ? 'active' : ''}" onclick="carouselIndex=${i}; updateCarousel();"></span>`).join('')}
      </div>
    </div>
  `;

  carouselIndex = 0;
  updateCarousel();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
