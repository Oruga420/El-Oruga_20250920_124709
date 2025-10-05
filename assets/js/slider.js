// slider.js - initialize Swiper (CDN loaded via HTML)
window.initFeaturedSwiper = function initFeaturedSwiper() {
  if (!window.Swiper) {
    console.warn('Swiper library missing');
    return;
  }

  const swiperEl = document.querySelector('.featured-swiper');
  if (!swiperEl) return;

  if (swiperEl.swiper) {
    swiperEl.swiper.destroy(true, true);
  }

  const swiper = new Swiper('.featured-swiper', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 24,
    centeredSlides: true,
    keyboard: { enabled: true },
    pagination: {
      el: '.featured-swiper .swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.featured-swiper .swiper-button-next',
      prevEl: '.featured-swiper .swiper-button-prev'
    }
  });
};

window.initGallerySwiper = function initGallerySwiper() {
  if (!window.Swiper) {
    console.warn('Swiper library missing');
    return;
  }

  const swiperEl = document.querySelector('.apps-swiper');
  if (!swiperEl) return;

  if (swiperEl.swiper) {
    swiperEl.swiper.destroy(true, true);
  }

  new Swiper('.apps-swiper', {
    loop: false,
    slidesPerView: 'auto',
    spaceBetween: 24,
    centeredSlides: false,
    keyboard: { enabled: true },
    pagination: {
      el: '.apps-swiper .swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.apps-swiper .swiper-button-next',
      prevEl: '.apps-swiper .swiper-button-prev'
    },
    breakpoints: {
      0: { spaceBetween: 16 },
      768: { spaceBetween: 24 },
      1280: { spaceBetween: 32 }
    }
  });
};

