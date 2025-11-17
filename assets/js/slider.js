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

  const slideCount = swiperEl.querySelectorAll('.swiper-slide').length;
  const enableLoop = slideCount > 3;

  new Swiper('.apps-swiper', {
    loop: enableLoop,
    loopAdditionalSlides: enableLoop ? 2 : 0,
    slidesPerView: 1.05,
    spaceBetween: 18,
    centeredSlides: true,
    centeredSlidesBounds: true,
    slideToClickedSlide: true,
    watchSlidesProgress: true,
    grabCursor: true,
    speed: 650,
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
      0: { slidesPerView: 1.02, spaceBetween: 16 },
      640: { slidesPerView: 1.25, spaceBetween: 20 },
      900: { slidesPerView: 1.6, spaceBetween: 24 },
      1200: { slidesPerView: 2.1, spaceBetween: 30 },
      1500: { slidesPerView: 2.4, spaceBetween: 36 }
    }
  });
};

