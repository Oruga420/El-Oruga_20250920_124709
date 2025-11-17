const VIDEOS = [
  { id: 'jW97NqAp9FU', title: 'Drop 01 · Live Build Recap', summary: 'Fresh setup notes captured right after closing the latest loop in the lab.', tags: ['2025', 'Build log'] },
  { id: '-xVoh43_0yo', title: 'Drop 02 · Luna Pilot Walkthrough', summary: 'Quick pass through the prompts and guardrails powering the current Luna pilot.', tags: ['Pilot', 'Workflow'] },
  { id: 'Ay3fJNekick', title: 'Drop 03 · Motion Moodboard', summary: 'Slicing together references for the next projection ritual.', tags: ['Motion', 'Moodboard'] },
  { id: 'KsdMp1BwG4M', title: 'Drop 04 · Hardware Desk Dive', summary: 'Desk-side look at the sensors, hubs, and cabling that keep the booth alive.', tags: ['Hardware', 'Rigging'] },
  { id: 'qZvhcsx1uQU', title: 'Drop 05 · Creator Stand-up', summary: 'A creator-facing retro on what hit, what lagged, and how we tuned prompts.', tags: ['Retro', 'Creator'] },
  { id: 'GnoQyHmauvg', title: 'Drop 06 · Workflow Debugging', summary: 'Screen capture debugging a gnarly automation chain.', tags: ['Automation', 'Debug'] },
  { id: 'kE032Qj36bA', title: 'Drop 07 · Mini Demo Day', summary: 'Micro demo showing how Luna pairs with the field kit.', tags: ['Demo', 'Luna'] },
  { id: 'FN6d-6FDF00', title: 'Drop 08 · Whiteboard Notes', summary: 'Breaking down the campaign ladder on the studio whiteboard.', tags: ['Strategy', 'Notes'] },
  { id: 'bXxZK-elIAI', title: 'Drop 09 · Lighting Lookbook', summary: 'Fast scroll through lighting treatments and gradients for the booth.', tags: ['Lighting', 'Lookbook'] },
  { id: 'J_cmH_z-x7I', title: 'Drop 10 · Sound Pack Peek', summary: 'Sampling the audio kit we roll into IRL activations.', tags: ['Audio', 'Toolkit'] },
  { id: 'nqdpDfIw6Gs', title: 'Drop 11 · Product AMA', summary: 'Answering the most common launch questions straight from Discord.', tags: ['AMA', 'Community'] },
  { id: 'SDJSNrfIIdg', title: 'Drop 12 · Field Ops Recap', summary: 'What we learned after running back-to-back activations in one day.', tags: ['Ops', 'Recap'] },
  { id: 'jMdmoPX37LE', title: 'Drop 13 · Render Session', summary: 'Capturing the look-dev process inside the render workstation.', tags: ['Rendering'] },
  { id: 'wGIrSHW-NkU', title: 'Drop 14 · Prompt Clinic', summary: 'Tight tutorial on writing prompts that survive live events.', tags: ['Prompts', 'Tutorial'] },
  { id: 'KqQy92BDM2g', title: 'Drop 15 · Ritual Stack', summary: 'Running through the current ritual stack used at shows.', tags: ['Rituals', 'Stack'] },
  { id: '0_d0LoDz728', title: 'Drop 16 · Vision Deck', summary: 'Short keynote deck outlining the vision for Q1.', tags: ['Vision', 'Deck'] },
  { id: 'CWC-GIL20Tw', title: 'Drop 17 · Booth Load Test', summary: 'Stress testing the booth hardware before tour kickoff.', tags: ['Testing', 'Hardware'] },
  { id: 'mHE2KlDBQio', title: 'Drop 18 · Code & Coffee', summary: 'Morning coding session wiring new API surfaces.', tags: ['Code', 'Morning'] },
  { id: '2YzDqMOuqF0', title: 'Drop 19 · Texture Library', summary: 'Sharing the freshest texture pack from the design team.', tags: ['Design', 'Textures'] },
  { id: '-5q-xEs_vCI', title: 'Drop 20 · Prototype Review', summary: 'Feedback loop on a brand-new prototype from the crew.', tags: ['Prototype', 'Review'] },
  { id: 'e4wsiS_NMx4', title: 'Drop 21 · Remote Setup Walkthrough', summary: 'Guide to spinning up the rig remotely with minimal gear.', tags: ['Remote', 'Setup'] },
  { id: 'cuSDE76HGvM', title: 'Drop 22 · Playlist Mode', summary: 'Highlighting the sonic palette we keep looping during builds.', tags: ['Playlist', 'Vibes'] },
  { id: 'POOwsaSsW8U', title: 'Drop 23 · Origin Story Clip', summary: 'A throwback clip that documents the earliest booth prototype.', tags: ['Throwback'] }
];

const POSTS_PER_PAGE = 4;

function initContentFeed() {
  const feed = document.getElementById('video-feed');
  const prevBtn = document.getElementById('videos-prev');
  const nextBtn = document.getElementById('videos-next');
  const pageLabel = document.getElementById('videos-page-indicator');

  if (!feed || !prevBtn || !nextBtn || !pageLabel) {
    return;
  }

  let currentPage = 1;
  const totalPages = Math.max(1, Math.ceil(VIDEOS.length / POSTS_PER_PAGE));

  function videoCard(video) {
    const badges = (video.tags || [])
      .map((tag) => `<span>${tag}</span>`)
      .join('');

    return `
      <article class="video-post">
        <div class="video-frame">
          <iframe
            src="https://www.youtube.com/embed/${video.id}"
            title="${video.title}"
            loading="lazy"
            referrerpolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen>
          </iframe>
        </div>
        <div class="video-meta">
          <h3>${video.title}</h3>
          <p>${video.summary}</p>
          ${badges ? `<div class="video-badges">${badges}</div>` : ''}
        </div>
      </article>
    `;
  }

  function renderPage() {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    const pageVideos = VIDEOS.slice(start, start + POSTS_PER_PAGE);
    feed.innerHTML = pageVideos.map(videoCard).join('');
    pageLabel.textContent = `Page ${currentPage} / ${totalPages}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
  }

  function goToPage(page) {
    const nextPage = Math.min(Math.max(page, 1), totalPages);
    if (nextPage === currentPage) return;
    currentPage = nextPage;
    renderPage();
  }

  prevBtn.addEventListener('click', () => goToPage(currentPage - 1));
  nextBtn.addEventListener('click', () => goToPage(currentPage + 1));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      goToPage(currentPage - 1);
    } else if (event.key === 'ArrowRight') {
      goToPage(currentPage + 1);
    }
  });

  renderPage();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initContentFeed);
} else {
  initContentFeed();
}
