// apps.js - render categories, cards, search/filters, and featured slider input
const state = { q: '', category: '', tech: '' };
let APPS = [];

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
  renderFeatured(APPS.filter((a) => a.status === 'live').slice(0, 8));
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

function cardHTML(app) {
  const tags = (app.tags || [])
    .slice(0, 3)
    .map((t) => `<span class="tag">${t}</span>`)
    .join('');
  const live = app.liveUrl
    ? `<a href="${app.liveUrl}" class="btn" target="_blank" rel="noopener">Live</a>`
    : '';
  const repo = app.repoUrl
    ? `<a href="${app.repoUrl}" class="btn" target="_blank" rel="noopener">Repo</a>`
    : '';
  return `
    <article class="card">
      <img src="${app.coverImage}" alt="${app.title} cover" loading="lazy" />
      <div class="content">
        <h3>${app.title}</h3>
        <p>${app.tagline || ''}</p>
        <div class="tags">${tags}</div>
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
        ${apps.map((a) => `<div class="swiper-slide">${cardHTML(a)}</div>`).join('')}
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

function renderFeatured(apps) {
  const root = $('#featured-carousel');
  if (!root) return;
  root.innerHTML = `
    <div class="swiper featured-swiper">
      <div class="swiper-wrapper">
        ${apps.map((a) => `<div class="swiper-slide">${cardHTML(a)}</div>`).join('')}
      </div>
      <div class="swiper-pagination" aria-hidden="true"></div>
      <div class="swiper-button-prev" aria-label="Previous featured app"></div>
      <div class="swiper-button-next" aria-label="Next featured app"></div>
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

