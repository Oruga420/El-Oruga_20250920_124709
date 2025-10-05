// detail.js - populate app detail page from apps.json using ?slug=
const $ = (sel, parent = document) => parent.querySelector(sel);
const DATA_URL = new URL('../data/apps.json', import.meta.url);
const SITE_ROOT = new URL('../..', import.meta.url);

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

async function boot() {
  const params = new URLSearchParams(location.search);
  const slug = params.get('slug');
  if (!slug) {
    renderError('Missing app slug.');
    return;
  }

  let apps = [];
  try {
    const res = await fetch(DATA_URL);
    if (!res.ok) throw new Error(`Failed to fetch apps.json (${res.status})`);
    apps = await res.json();
  } catch (err) {
    console.error('Failed to load app catalog', err);
    renderError(location.protocol === 'file:'
      ? 'Run the site with a local server (e.g., `npx serve`) to load app details.'
      : 'Unable to load app details right now.');
    return;
  }

  const app = apps.find((item) => item.slug === slug);
  if (!app) {
    renderError('App not found.');
    return;
  }

  document.title = `${app.title} - El Oruga`;
  ensureMeta('description', app.tagline || app.shortDescription || '');

  const root = $('#app-root');
  if (!root) return;
  const cover = resolveAssetPath(app.coverImage) || resolveAssetPath('images/newbg.jpg');
  root.innerHTML = `
    <header class="app-hero">
      <img src="${cover}" alt="${app.title} cover" loading="lazy" />
      <h1>${app.title}</h1>
      <p>${app.tagline || ''}</p>
      <div class="app-links">
        ${app.liveUrl ? `<a class="btn" target="_blank" rel="noopener" href="${app.liveUrl}">Live</a>` : ''}
        ${app.repoUrl ? `<a class="btn" target="_blank" rel="noopener" href="${app.repoUrl}">Repo</a>` : ''}
      </div>
    </header>
    <section class="app-body">
      <h2>Overview</h2>
      <p>${app.longDescription || app.shortDescription || ''}</p>
      ${renderList('Features', app.features)}
      ${renderChips('Tech', app.tech)}
    </section>
  `;
}

function renderList(title, items) {
  if (!Array.isArray(items) || !items.length) return '';
  return `
    <h3>${title}</h3>
    <ul>
      ${items.map((item) => `<li>${item}</li>`).join('')}
    </ul>
  `;
}

function renderChips(title, items) {
  if (!Array.isArray(items) || !items.length) return '';
  return `
    <h3>${title}</h3>
    <div class="tags">
      ${items.map((item) => `<span class="tag">${item}</span>`).join('')}
    </div>
  `;
}

function renderError(message) {
  const root = $('#app-root');
  if (root) {
    root.innerHTML = `<p class="empty-state">${message}</p>`;
  }
}

function ensureMeta(name, content) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
