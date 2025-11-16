const form = document.querySelector('.contact-form');

if (form) {
  const status = form.querySelector('[data-status]');

  const setStatus = (message, tone = 'success') => {
    if (!status) return;
    status.textContent = message;
    status.dataset.tone = tone;
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name')?.trim();
    const email = formData.get('email')?.trim();
    const message = formData.get('message')?.trim();

    if (!name || !email || !message) {
      setStatus('Please share your name, email, and a short note so I can reply.', 'error');
      return;
    }

    form.reset();
    setStatus('Message received! I usually respond within 24 hours.', 'success');
  });
}
