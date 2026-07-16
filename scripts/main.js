// 滚动入场动画
(function () {
  const reveals = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    // 不支持的浏览器直接显示
    reveals.forEach(function (el) {
      el.classList.add('is-visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px'
    }
  );

  reveals.forEach(function (el) {
    observer.observe(el);
  });
})();

// 灯箱预览
(function () {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const cards = document.querySelectorAll('.design-card');
  const overlay = lightbox.querySelector('.lightbox__overlay');
  const closeBtn = lightbox.querySelector('.lightbox__close');
  const prevBtn = lightbox.querySelector('.lightbox__nav--prev');
  const nextBtn = lightbox.querySelector('.lightbox__nav--next');
  const img = lightbox.querySelector('.lightbox__img');
  const caption = lightbox.querySelector('.lightbox__caption');
  const currentEl = lightbox.querySelector('.lightbox__current');
  const totalEl = lightbox.querySelector('.lightbox__total');

  const images = [];
  cards.forEach(function (card) {
    const imgEl = card.querySelector('img');
    const titleEl = card.querySelector('.design-card__title');
    images.push({
      src: imgEl.getAttribute('src'),
      alt: imgEl.getAttribute('alt'),
      title: titleEl ? titleEl.textContent : ''
    });
  });

  totalEl.textContent = images.length;
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function updateLightbox() {
    const data = images[currentIndex];
    img.src = data.src;
    img.alt = data.alt;
    caption.textContent = data.title;
    currentEl.textContent = currentIndex + 1;
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLightbox();
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    updateLightbox();
  }

  cards.forEach(function (card, i) {
    card.addEventListener('click', function () {
      openLightbox(i);
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', showPrev);
  nextBtn.addEventListener('click', showNext);

  // 键盘操作
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });
})();
