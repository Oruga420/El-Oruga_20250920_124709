const VIDEOS = [
  {
    id: 'jW97NqAp9FU',
    title: 'Cómo crear la portada perfecta para tu álbum usando IA',
    description: `Te muestro paso a paso cómo convertí una canción hecha en Suno en una portada lista para Spotify con Flux, Imagen, Hydragrams, Proteus y mi favorito: Nano Banana. Vas a ver cómo uso GPTs personalizados para analizar letras, mantener coherencia con portadas previas, generar prompts complejos y lograr un arte inspirado en la lucha libre vintage. También repaso cómo preparar el track para DistroKid y publicarlo sin dolor.`,
    tags: ['Suno AI', 'Portadas con IA', 'Nano Banana', 'Flux', 'Imagen Google', 'Replicate', 'DistroKid', 'Música con IA', 'Spotify', 'GPTs personalizados'],
    viralTitle: 'La portada de álbum que hice con IA te va a volar la cabeza (y la subí a Spotify en 10 minutos)'
  },
  {
    id: '-xVoh43_0yo',
    title: 'Cómo creo canciones con Suno y GPTs hasta dejarlas listas en DistroKid',
    description: `Comparto mi flujo completo: investigación musical con un GPT a medida, documento PDF con mood y lineamientos, letras generadas por Suno Writer, control de voz/coros/estilos y el ida y vuelta necesario para clavar la toma. Cierro exportando y subiendo todo a DistroKid. Es el backstage real de cómo hago música con IA, sin maquillar los tropiezos.`,
    tags: ['Suno', 'Música con IA', 'GPTs personalizados', 'Producción musical', 'DistroKid', 'Letras con IA', 'Workflow creativo', 'AI music'],
    viralTitle: 'Hago canciones completas con IA (y las subo a Spotify en minutos)'
  },
  {
    id: 'Ay3fJNekick',
    title: 'Qué es el Vibe Coding y cómo crear apps con IA sin ser dev',
    description: `Nos metemos en el concepto popularizado por Karpathy: construir apps con modelos como ChatGPT, Gemini, Firebase, Replit, Lovable y Google AI Studio sin picar código tradicional. Repasamos niveles de herramientas, cuándo usar cada una, riesgos de seguridad y cómo reemplazar SaaS caros con tus propios agentes y procesos AI first.`,
    tags: ['Vibe coding', 'Google AI Studio', 'Gemini', 'ChatGPT', 'Replit', 'Lovable', 'Low-code', 'No-code', 'AI first', 'Agentes IA'],
    viralTitle: 'Hice apps en 2 minutos con IA (sin saber programar) y así lo podés hacer vos también 🧠🚀'
  },
  {
    id: 'KsdMp1BwG4M',
    title: 'Agentes de IA vs automatizaciones: cómo funcionan sin romper tu negocio',
    description: `Definimos qué es realmente un agente, cómo se diferencia de un workflow determinista y por qué hay tanto hype. Traigo historias de terror reales, criterios para diseñar agentes responsables, ejemplos (Deep Research, Perplexity, agentes de voz con ElevenLabs) y el rol de MCP servers para darles súper poderes sin dejar agujeros de seguridad.`,
    tags: ['Agentes de IA', 'Workflows', 'Prompt injection', 'Deep Research', 'Perplexity', 'ElevenLabs', 'MCP', 'Automatización con IA'],
    viralTitle: 'Dejá de decirle “chatbot”: así funcionan de verdad los agentes de IA'
  },
  {
    id: 'qZvhcsx1uQU',
    title: 'Qué es un MCP Server y cómo usarlo con ChatGPT',
    description: `Clase completa sobre Model Context Protocol: el pegamento entre tu LLM y el resto de tus herramientas. Vemos cómo disparar acciones en Stripe, Gmail, Google Drive, Calendar, Spotify y más; cuándo conviene usar Zapier/Make/n8n como MCP servers; qué es RAG dentro del protocolo y casos de uso recomendados vs los que deberías evitar.`,
    tags: ['MCP Server', 'ChatGPT', 'Zapier', 'Make', 'n8n', 'APIs', 'RAG', 'Automatización con IA', 'Workflows'],
    viralTitle: 'Si no estás usando MCP Servers, ya te estás quedando atrás (te lo demuestro acá)'
  },
  {
    id: 'GnoQyHmauvg',
    title: 'Cómo ponerte al día con la IA en 2025: Context Stacking y agentes',
    description: `Explico por qué la IA cambia cada semana y presento mi método Context Stacking para dominar cualquier tema: mapear conceptos, crear silos, hacer drill-down y apilar el contexto antes de pedir el entregable. Comparo modelos (ChatGPT, Claude, Gemini, Grok, Perplexity), hablo de MCP, agentes, vibe coding y muestro un ejemplo real construyendo un GPT experto en Google Ads.`,
    tags: ['Context stacking', 'Prompt engineering', 'Tokens', 'LLMs', 'Agentes', 'MCP', 'Vibe coding', 'Google Ads', 'AI bootcamp'],
    viralTitle: 'Esta técnica de prompts hace que la IA trabaje como un experto (aunque vos no tengas idea)'
  },
  {
    id: 'kE032Qj36bA',
    title: 'Cómo usar BO3 en Google Drive para crear videos sin pagar Google Plus',
    description: `Tutorial completo de Google Vids (BO3) usando cuenta corporativa: crear un video, insertar clips generados, escribir prompts efectivos en inglés y comparar prompts hechos a mano vs generados por ChatGPT. Ideal si querés contenido rápido solo con herramientas Google.`,
    tags: ['Google Vids', 'BO3', 'Google Drive', 'Video con IA', 'Prompts BO3', 'Tutorial Google'],
    viralTitle: 'BO3 en Google Drive: el truco secreto para crear VIDEOS sin pagar nada'
  },
  {
    id: 'FN6d-6FDF00',
    title: 'Cómo usar los nuevos Connectors de ChatGPT para hacer Deep Research',
    description: `Te enseño a activar Connectors, autenticar Gmail/Drive/Calendar y correr un Deep Research que analiza facturas automáticamente. Ves la actividad en tiempo real, qué permisos pedir y cómo revisar las fuentes procesadas. Automatizar búsquedas con ChatGPT nunca fue tan simple.`,
    tags: ['ChatGPT Connectors', 'Deep Research', 'Gmail', 'Integraciones OpenAI', 'Automatización'],
    viralTitle: 'ChatGPT ahora lee tu Gmail (y te hace reportes automáticos) 😳🔥'
  },
  {
    id: 'bXxZK-elIAI',
    title: 'Cómo usar Codex dentro de ChatGPT para acelerar tu código',
    description: `Activamos Codex desde ChatGPT, conectamos GitHub, seleccionamos repos, pedimos tareas automáticas y vemos cómo el agente ejecuta comandos, abre PRs y te ayuda a refactorizar sin perder el foco. Ideal si querés delegar debugging y features repetitivas.`,
    tags: ['Codex', 'ChatGPT', 'GitHub', 'Automatización de código', 'Dev workflow', 'IA para programadores'],
    viralTitle: 'Dejá que una IA escriba y revise tu código por vos — así funciona Codex en ChatGPT'
  },
  {
    id: 'J_cmH_z-x7I',
    title: 'Hotkey voice-to-text recorder con ElevenLabs Scribe',
    description: `Replica mi versión de “Super Whisper”: mantené presionado un hotkey, hablá y obtené transcript instantáneo en Windows. Uso Scribe v1 (99 idiomas), muestro el repo, cómo correrlo, privacidad y comparación con herramientas externas.`,
    tags: ['ElevenLabs Scribe', 'Voice to text', 'Hotkeys', 'Windows automation', 'Speech-to-text'],
    viralTitle: 'Record + transcribe cualquier cosa con una sola tecla (hack de voz + IA)'
  },
  {
    id: 'nqdpDfIw6Gs',
    title: 'Cómo crear y probar reglas de validación en Salesforce con Claude Code',
    description: `Walkthrough honesto: abro el proyecto, cargo archivos, lanzo Cloud Coder y le pido a Claude que genere una validation rule. Vemos cómo interpreta instrucciones, sus dudas y cómo reacciono cuando parece “hacer cosas solo”. Perfecto para admins/devs que prueban IA en Salesforce.`,
    tags: ['Salesforce', 'Validation Rules', 'Claude', 'Cloud Coder', 'AI Coding', 'Dev Productivity'],
    viralTitle: 'Claude Code programó mi regla de validación… ¿pero entendió algo?'
  },
  {
    id: 'SDJSNrfIIdg',
    title: 'Cómo construir un chatbot de Facebook Messenger con Zapier (paso a paso)',
    description: `Creamos un bot funcional para la página Visit Riviera Maya sin escribir código: definimos objetivos, conectamos OpenAI, añadimos fuentes web y publicamos en Messenger mediante Zapier. Al final tenés una ruta clara para automatizar soporte en minutos.`,
    tags: ['Zapier', 'Facebook Messenger', 'Chatbot', 'Automatización', 'Atención al cliente', 'No-code'],
    viralTitle: 'Hice un chatbot de Messenger en minutos (sin código) y así se hace'
  },
  {
    id: 'jMdmoPX37LE',
    title: 'Cómo añadir un chatbot de voz a tu web con ElevenLabs Agents + HubSpot',
    description: `Te enseño a crear un agente de voz en ElevenLabs, conectarlo a tu contenido, incrustar el widget en HubSpot, probar respuestas y ajustar el estilo visual. Todo sin código. Ideal para SMBs o freelancers que quieren dar soporte conversacional real en su sitio.`,
    tags: ['ElevenLabs Agents', 'Voice chatbot', 'HubSpot', 'No-code', 'Conversational AI'],
    viralTitle: 'Convertí tu web en un asistente que habla (sin tocar código)'
  },
  {
    id: 'wGIrSHW-NkU',
    title: 'Cómo usar Tasks en ChatGPT para crear recordatorios automáticos',
    description: `Paso a paso para activar Tasks, crear recordatorios desde desktop y móvil, editar tareas, activar notificaciones y revisar las alertas que llegan. Perfecto para organizar tu día con ayuda de ChatGPT.`,
    tags: ['ChatGPT Tasks', 'Recordatorios', 'Productividad', 'Automatización simple'],
    viralTitle: 'Activaron Tasks en ChatGPT… y así se usa para que te recuerde TODO 💥'
  },
  {
    id: 'KqQy92BDM2g',
    title: 'Cómo generar un LWC automáticamente con Cursor + ChatGPT',
    description: `Vas a ver todo el flujo: idea inicial, documentación, envío a Cursor, generación de Apex/LWC/CSS/metadata, correcciones y despliegue final. Demuestro cómo un trabajo de horas se resuelve en minutos con IA.`,
    tags: ['Salesforce LWC', 'Cursor AI', 'ChatGPT', 'Automatización de código', 'DevOps Salesforce'],
    viralTitle: 'Cursor + ChatGPT crearon un LWC solos… ¡y en minutos!'
  },
  {
    id: '0_d0LoDz728',
    title: 'Cómo crear tu propia voz AI con ElevenLabs',
    description: `Tutorial express para generar una voz TTS: entrar a ElevenLabs, crear una voz, escribir el prompt, previsualizar, nombrar y obtener ideas de uso (doblaje, chatbot, narraciones).`,
    tags: ['ElevenLabs', 'Voz IA', 'Text to speech', 'Creación de contenido', 'Voice cloning'],
    viralTitle: 'Generá una voz de IA que suena REAL en 2 minutos'
  },
  {
    id: 'CWC-GIL20Tw',
    title: 'Cómo automatizé la generación de leads para testing en Salesforce',
    description: `Construí una mini-app en Replit que aprovecha Web-to-Lead para generar datos de prueba masivos sin cargar CSVs. Explico cómo configuro Salesforce, defino campos, envío lotes y verifico los leads en minutos.`,
    tags: ['Salesforce Web-to-Lead', 'Automatización de datos', 'Testing', 'Replit'],
    viralTitle: '¡Adiós Excel-CSV! Generá 100 leads en Salesforce con un click'
  },
  {
    id: 'mHE2KlDBQio',
    title: 'Automatiza tu CV y carta de presentación para cada oferta',
    description: `Demuestro una app en Streamlit + Zapier + OpenAI + Google Drive: pegás la URL de la vacante y la herramienta genera un CV y cover letter personalizados, guarda todo en Drive y registra el envío por correo. Ideal para aplicar masivamente sin quemarte.`,
    tags: ['Automatización CV', 'OpenAI', 'Zapier', 'Streamlit', 'Recruiting'],
    viralTitle: 'Aplica a cualquier trabajo mientras dormís: el CV automático lo hace por vos'
  },
  {
    id: '2YzDqMOuqF0',
    title: 'Automatizá 3 posts de Instagram por día con Zapier + OpenAI + Buffer',
    description: `Configuramos un Zap que programa tres publicaciones diarias: trigger Schedule, copy con GPT-4, imágenes con DALL·E, envío automático a Buffer y delays para espaciar las publicaciones. Instagram se alimenta solo con IA.`,
    tags: ['Zapier', 'OpenAI', 'Instagram', 'Buffer', 'Automatización social', 'Marketing digital'],
    viralTitle: 'Esta automatización te publica en Instagram 3 veces al día con IA 🚀'
  },
  {
    id: '-5q-xEs_vCI',
    title: 'Cómo crear un sistema de recordatorio de ranking con Sheets + Zapier + ChatGPT',
    description: `Armo una hoja con columnas clave, disparo Zapier cuando cambia una fila, agrego delays, genero correos personalizados con ChatGPT y envío el mail vía Gmail, marcando el registro como enviado. Perfecto para pedir reseñas o follow-ups automáticos.`,
    tags: ['Google Sheets', 'Zapier', 'ChatGPT', 'Email automation', 'No-code'],
    viralTitle: 'Este sistema me envía correos solito tras una venta — sin tocar un dedo'
  },
  {
    id: 'e4wsiS_NMx4',
    title: 'Cómo crear un chatbot de voz en vivo con la API Realtime de OpenAI',
    description: `Montamos un bot que habla en tiempo real: cuenta de GitHub, deploy a Vercel, configuración de API keys y demo en español consultando el clima. Es la forma más rápida de tener un asistente hablante estilo ChatGPT Premium.`,
    tags: ['OpenAI Realtime', 'Voice chatbot', 'Vercel', 'GitHub', 'Desarrollo IA'],
    viralTitle: 'Tu chatbot hablante en menos de 10 minutos (sí, en español 💥)'
  },
  {
    id: 'cuSDE76HGvM',
    title: 'Cómo usar BO3 en Google Drive para crear videos gratis (modo avanzado)',
    description: `Profundizo en cómo crear plantillas, combinar clips BO3 y generar prompts complejos en inglés para evitar errores. Comparo outputs de ChatGPT vs prompts manuales y explico cómo aprovechar Google Vids en equipos grandes.`,
    tags: ['Google Vids', 'BO3', 'Prompts', 'Video AI', 'Google Workspace'],
    viralTitle: 'BO3 en Google Drive: el truco secreto para crear VIDEOS gratis'
  },
  {
    id: 'POOwsaSsW8U',
    title: 'Cómo automatizar tu web con un chatbot de voice commerce',
    description: `Refuerzo el setup del agente de voz y muestro variaciones de estilos, múltiples idiomas y cómo combinarlo con workflows de HubSpot para capturar leads. Ideal para agencias que quieren vender asistentes conversacionales en paquete.`,
    tags: ['ElevenLabs', 'Voice agent', 'HubSpot', 'Automatización web', 'Conversational AI'],
    viralTitle: 'Convertí cualquier web en un asistente que habla (versión pro)'
  }
];

const POSTS_PER_PAGE = 3;

function initContentFeed() {
  const feed = document.getElementById('video-feed');
  const prevBtn = document.getElementById('videos-prev');
  const nextBtn = document.getElementById('videos-next');
  const pageLabel = document.getElementById('videos-page-indicator');
  const modal = document.getElementById('video-modal');
  const modalFrame = document.getElementById('video-modal-frame');
  const modalClose = document.getElementById('video-modal-close');

  if (!feed || !prevBtn || !nextBtn || !pageLabel || !modal || !modalFrame || !modalClose) {
    return;
  }

  let currentPage = 1;
  let lastFocused = null;
  const totalPages = Math.max(1, Math.ceil(VIDEOS.length / POSTS_PER_PAGE));

  function videoCard(video) {
    const badges = (video.tags || [])
      .map((tag) => `<span>${tag}</span>`)
      .join('');

    return `
      <article class="video-card">
        <header class="video-card-header">
          <p class="eyebrow">Ficha técnica</p>
          <h3>${video.title}</h3>
          ${video.viralTitle ? `<p class="video-viral">${video.viralTitle}</p>` : ''}
        </header>
        <p class="video-description">${video.description}</p>
        ${badges ? `<div class="video-badges">${badges}</div>` : ''}
        <div class="video-actions">
          <button class="btn video-play-btn" data-video-id="${video.id}" data-video-title="${video.title}">Ver video</button>
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

  function openModal(videoId, title) {
    modalFrame.innerHTML = `
      <iframe
        src="https://www.youtube.com/embed/${videoId}?autoplay=1"
        title="${title}"
        loading="lazy"
        referrerpolicy="strict-origin-when-cross-origin"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen>
      </iframe>
    `;
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('is-visible');
    modalClose.focus();
  }

  function closeModal() {
    modalFrame.innerHTML = '';
    modal.classList.remove('is-visible');
    modal.setAttribute('aria-hidden', 'true');
    if (lastFocused) {
      lastFocused.focus();
    }
  }

  prevBtn.addEventListener('click', () => goToPage(currentPage - 1));
  nextBtn.addEventListener('click', () => goToPage(currentPage + 1));

  feed.addEventListener('click', (event) => {
    const trigger = event.target.closest('.video-play-btn');
    if (!trigger) return;
    const videoId = trigger.getAttribute('data-video-id');
    const videoTitle = trigger.getAttribute('data-video-title');
    lastFocused = trigger;
    openModal(videoId, videoTitle);
  });

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-visible')) {
      closeModal();
    } else if (event.key === 'ArrowLeft') {
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
