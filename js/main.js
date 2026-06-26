'use strict';

/* ===== NAVİQASİYA ===== */
const navbar    = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.classList.toggle('active', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

navMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ===== TYPEWRITER ===== */
const roles = [
  'Full-Stack Developer',
  'Security Researcher',
  'Python Enthusiast',
  'CTF Player',
  'Problem Solver',
];

const roleEl = document.getElementById('roleText');
let rIdx = 0, cIdx = 0, deleting = false;

function typeWriter() {
  const current = roles[rIdx];
  if (deleting) {
    roleEl.textContent = current.slice(0, --cIdx);
  } else {
    roleEl.textContent = current.slice(0, ++cIdx);
  }

  let delay = deleting ? 60 : 100;

  if (!deleting && cIdx === current.length) {
    delay = 2000;
    deleting = true;
  } else if (deleting && cIdx === 0) {
    deleting = false;
    rIdx = (rIdx + 1) % roles.length;
    delay = 400;
  }

  setTimeout(typeWriter, delay);
}

typeWriter();

/* ===== FADE-IN ===== */
const fadeEls = document.querySelectorAll(
  '.section-header, .about-grid, .skill-card, .project-card, .contact-grid'
);

fadeEls.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  }),
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

fadeEls.forEach(el => observer.observe(el));

/* ===== LAYİHƏ FİLTRİ ===== */
const filterBtns  = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !match);
    });
  });
});

/* ===== ƏLAQƏ FORMU ===== */
const form        = document.getElementById('contactForm');
const nameInput   = document.getElementById('contactName');
const emailInput  = document.getElementById('contactEmail');
const msgInput    = document.getElementById('contactMessage');
const charCounter = document.getElementById('charCounter');
const submitBtn   = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');
const nameError   = document.getElementById('nameError');
const emailError  = document.getElementById('emailError');
const msgError    = document.getElementById('messageError');

msgInput.addEventListener('input', () => {
  charCounter.textContent = `${msgInput.value.length} / 2000`;
});

function sanitize(str) {
  return str.trim().replace(/[<>"'`]/g, '');
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(errEl, msg) {
  errEl.textContent = msg;
  errEl.previousElementSibling.classList.add('error');
}

function clearError(errEl) {
  errEl.textContent = '';
  errEl.previousElementSibling.classList.remove('error');
}

function validateForm() {
  let valid = true;
  const name  = sanitize(nameInput.value);
  const email = sanitize(emailInput.value);
  const msg   = sanitize(msgInput.value);

  if (name.length < 2) {
    showError(nameError, 'Ad ən az 2 simvol olmalıdır.');
    valid = false;
  } else {
    clearError(nameError);
  }

  if (!validateEmail(email)) {
    showError(emailError, 'Düzgün email daxil edin.');
    valid = false;
  } else {
    clearError(emailError);
  }

  if (msg.length < 10) {
    showError(msgError, 'Mesaj ən az 10 simvol olmalıdır.');
    valid = false;
  } else {
    clearError(msgError);
  }

  return valid;
}

form.addEventListener('submit', e => {
  e.preventDefault();
  if (!validateForm()) return;

  const icon = submitBtn.querySelector('svg');

  submitBtn.disabled = true;
  submitBtn.textContent = 'Göndərilir...';

  /* Deployment zamanı buraya fetch() ilə real endpoint əlavə edin */
  setTimeout(() => {
    formSuccess.hidden = false;
    form.reset();
    charCounter.textContent = '0 / 2000';
    submitBtn.disabled = false;
    submitBtn.textContent = 'Mesaj Göndər ';
    if (icon) submitBtn.appendChild(icon);
    setTimeout(() => { formSuccess.hidden = true; }, 5000);
  }, 900);
});

[nameInput, emailInput, msgInput].forEach(inp =>
  inp.addEventListener('blur', validateForm)
);

/* ===== FOOTER İLİ ===== */
document.getElementById('footerYear').textContent = new Date().getFullYear();

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
