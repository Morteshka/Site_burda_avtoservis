document.addEventListener('DOMContentLoaded', () => {

  // ========== Burger Menu ==========
  const burger = document.querySelector('.header__burger');
  const nav = document.querySelector('.header__nav');

  if (burger && nav) {
    burger.addEventListener('click', () => {
      nav.classList.toggle('header__nav--open');
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.header')) {
        nav.classList.remove('header__nav--open');
      }
    });
  }

  // ========== Feedback Form ==========
  const forms = document.querySelectorAll('.form');

  forms.forEach(form => {
    const successEl = form.querySelector('.form__success');

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.querySelector('#name');
      const phone = form.querySelector('#phone');
      const message = form.querySelector('#message');

      let valid = true;

      [name, phone, message].forEach(field => {
        if (field) {
          field.style.borderColor = '';
        }
      });

      if (name && name.value.trim().length < 2) {
        name.style.borderColor = 'var(--color-primary)';
        valid = false;
      }

      if (phone && phone.value.trim().length < 10) {
        phone.style.borderColor = 'var(--color-primary)';
        valid = false;
      }

      if (message && message.value.trim().length < 5) {
        message.style.borderColor = 'var(--color-primary)';
        valid = false;
      }

      if (valid && successEl) {
        successEl.classList.add('form__success--visible');
        form.reset();
      }
    });
  });

  // ========== Add Review ==========
  const reviewForm = document.querySelector('.reviews__form');
  const reviewsGrid = document.querySelector('.reviews__grid');

  if (reviewForm && reviewsGrid) {
    const reviewName = reviewForm.querySelector('#review-name');
    const reviewCar = reviewForm.querySelector('#review-car');
    const reviewText = reviewForm.querySelector('#review-text');

    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (reviewName.value.trim() && reviewCar.value.trim() && reviewText.value.trim()) {
        const card = document.createElement('div');
        card.className = 'reviews__card';

        const initial = reviewName.value.trim()[0].toUpperCase();

        card.innerHTML = `
          <div class="reviews__header">
            <div class="reviews__avatar">${initial}</div>
            <div>
              <div class="reviews__name">${reviewName.value.trim()}</div>
              <div class="reviews__car">${reviewCar.value.trim()}</div>
            </div>
          </div>
          <div class="reviews__stars">
            <img src="img/star.svg" alt="" class="reviews__star"><img src="img/star.svg" alt="" class="reviews__star"><img src="img/star.svg" alt="" class="reviews__star"><img src="img/star.svg" alt="" class="reviews__star"><img src="img/star.svg" alt="" class="reviews__star">
          </div>
          <div class="reviews__text">${reviewText.value.trim()}</div>
        `;

        reviewsGrid.prepend(card);

        const successEl = reviewForm.querySelector('.form__success');
        if (successEl) {
          successEl.classList.add('form__success--visible');
        }

        reviewForm.reset();
      }
    });
  }

  // ========== Modal ==========
  const modal = document.getElementById('bookingModal');
  const modalBtn = document.getElementById('bookingBtn');
  const modalClose = document.getElementById('modalClose');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalForm = modal ? modal.querySelector('.form') : null;

  if (modal && modalBtn) {
    modalBtn.addEventListener('click', () => {
      modal.classList.add('modal--open');
      document.body.style.overflow = 'hidden';
    });
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove('modal--open');
      document.body.style.overflow = '';
    }
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = modalForm.querySelector('#modal-name');
      const phone = modalForm.querySelector('#modal-phone');
      let valid = true;

      if (name) name.style.borderColor = '';
      if (phone) phone.style.borderColor = '';

      if (name && name.value.trim().length < 2) {
        name.style.borderColor = 'var(--color-primary)';
        valid = false;
      }
      if (phone && phone.value.trim().length < 10) {
        phone.style.borderColor = 'var(--color-primary)';
        valid = false;
      }

      if (valid) {
        const success = modalForm.querySelector('.form__success');
        if (success) {
          success.classList.add('form__success--visible');
          modalForm.reset();
          setTimeout(() => {
            closeModal();
            success.classList.remove('form__success--visible');
          }, 2000);
        }
      }
    });
  }

  // ========== Accordion ==========
  const accordionTriggers = document.querySelectorAll('.accordion__trigger');

  accordionTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const body = trigger.nextElementSibling;
      const arrow = trigger.querySelector('.accordion__arrow');

      if (body) {
        body.classList.toggle('services__item-desc-wrap--open');
        if (arrow) {
          arrow.classList.toggle('accordion__arrow--open');
        }
      }
    });
  });

  // ========== Scroll to Top ==========
  const scrollBtn = document.createElement('button');
  scrollBtn.className = 'scroll-top';
  scrollBtn.setAttribute('aria-label', 'Наверх');
  scrollBtn.innerHTML = '↑';
  document.body.appendChild(scrollBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollBtn.classList.add('scroll-top--visible');
    } else {
      scrollBtn.classList.remove('scroll-top--visible');
    }
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ========== Stats Counter Animation ==========
  const statNumbers = document.querySelectorAll('.about__stat-number');

  if (statNumbers.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          if (!target || el.dataset.animated) return;
          el.dataset.animated = 'true';

          let current = 0;
          const step = Math.ceil(target / 40);
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            el.textContent = current + '+';
          }, 30);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => observer.observe(el));
  }

  // ========== Theme Toggle ==========
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    if (themeIcon) themeIcon.src = 'img/sun.svg';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const html = document.documentElement;
      const isLight = html.getAttribute('data-theme') === 'light';
      if (isLight) {
        html.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
        if (themeIcon) themeIcon.src = 'img/moon.svg';
      } else {
        html.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        if (themeIcon) themeIcon.src = 'img/sun.svg';
      }
    });
  }

});
