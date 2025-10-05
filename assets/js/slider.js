// slider.js - initialize Swiper (CDN loaded via HTML)
function hydrateSwiper(selector, options) {
  if (!window.Swiper) {
    console.warn('Swiper library missing');
    return;
  }

  document.querySelectorAll(selector).forEach((el) => {
    if (el.swiper) {
      el.swiper.destroy(true, true);
    }
    /* eslint-disable no-new */
    new Swiper(el, options);
    /* eslint-enable no-new */
  });
}

window.initFeaturedSwiper = function initFeaturedSwiper() {
  hydrateSwiper('.featured-swiper', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 24,
    centeredSlides: true,
    keyboard: { enabled: true },
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    a11y: { enabled: true }
  });
};

window.initGallerySwiper = function initGallerySwiper() {
  hydrateSwiper('.apps-swiper', {
    loop: false,
    slidesPerView: 'auto',
    spaceBetween: 24,
    centeredSlides: false,
    keyboard: { enabled: true },
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    breakpoints: {
      0: { spaceBetween: 16 },
      768: { spaceBetween: 24 },
      1280: { spaceBetween: 32 }
    },
    a11y: { enabled: true }
  });
};

