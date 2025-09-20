// slider.js — initialize Swiper (CDN loaded via HTML)
window.initSwiper = function initSwiper() {
  if (!window.Swiper) {
    console.warn('Swiper library missing');
    return;
  }

  /* eslint-disable no-new */
  new Swiper('.swiper', {
    loop: true,
    slidesPerView: 'auto',
    spaceBetween: 16,
    centeredSlides: true,
    keyboard: { enabled: true },
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    a11y: { enabled: true }
  });
  /* eslint-enable no-new */
};

if (document.readyState !== 'loading') {
  window.initSwiper();
} else {
  document.addEventListener('DOMContentLoaded', () => window.initSwiper());
}