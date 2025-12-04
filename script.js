/* =========================
   Rikens Farm - script.js
   Interactions: mobile menu, lightbox, form, FAQ
   ========================= */

/* --------- Helpers: select elements --------- */
const menuBtn = document.querySelector('.menu-btn');           // Mobile menu button
const navList = document.getElementById('nav-list');          // Main nav UL
const lightbox = document.getElementById('lightbox');         // Lightbox overlay container
const lightboxImg = lightbox ? lightbox.querySelector('img') : null; // img element inside lightbox
const lightboxClose = document.querySelector('.lightbox-close');     // close button for lightbox
const galleryImgs = document.querySelectorAll('.gallery-grid img');  // gallery thumbnails
const faqButtons = document.querySelectorAll('.faq-q');       // FAQ toggles
const yearEl = document.getElementById('year');               // footer year

/* ---------- Set dynamic year ---------- */
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---------- Mobile menu toggle ---------- */
if (menuBtn && navList) {
  menuBtn.addEventListener('click', () => {
    const shown = navList.classList.toggle('show');          // toggle show class
    menuBtn.setAttribute('aria-expanded', shown ? 'true' : 'false'); // update accessibility attr
  });

  // Hide menu when clicking a nav link (mobile)
  navList.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navList.classList.remove('show');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------- Gallery: open in lightbox ---------- */
if (galleryImgs && lightbox && lightboxImg) {
  galleryImgs.forEach(img => {
    // when a gallery thumbnail is clicked
    img.addEventListener('click', () => {
      // use data-large if provided for higher-res image
      const src = img.dataset.large || img.src;
      lightboxImg.src = src;
      lightbox.style.display = 'flex';
      lightbox.setAttribute('aria-hidden', 'false');
    });
  });

  // close controls
  lightboxClose && lightboxClose.addEventListener('click', (e) => {
    e.stopPropagation(); // don't trigger the outer click
    lightbox.style.display = 'none';
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
  });

  // clicking outside the image closes the lightbox
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
      lightbox.setAttribute('aria-hidden', 'true');
      lightboxImg.src = '';
    }
  });
}

/* ---------- FAQ toggles ---------- */
if (faqButtons) {
  faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.parentElement;
      const answer = parent.querySelector('.faq-a');
      const open = answer.style.display === 'block';
      // close all answers first (simple accordion behavior)
      document.querySelectorAll('.faq-a').forEach(a => a.style.display = 'none');
      if (!open) answer.style.display = 'block';
      else answer.style.display = 'none';
    });
  });
}

/* ---------- Contact form handling (simulation) ---------- */
function handleContactSubmit(event) {
  event.preventDefault(); // prevent real form submit

  // Collect values
  const name = document.getElementById('name').value.trim();
  const contactInfo = document.getElementById('contactInfo').value.trim();
  const orderDetails = document.getElementById('orderDetails').value.trim();
  const responseEl = document.getElementById('formResponse');

  // Basic validation
  if (!name || !contactInfo || !orderDetails) {
    responseEl.textContent = 'Please fill all fields before sending.';
    responseEl.style.color = 'crimson';
    return;
  }

  // Simulate sending (replace this block with actual API call later)
  responseEl.style.color = 'var(--muted)';
  responseEl.textContent = 'Sending message...';

  setTimeout(() => {
    responseEl.style.color = 'green';
    responseEl.textContent = `Thanks ${name}! We received your message and will reply soon.`;
    event.target.reset(); // clear the form
  }, 900);
}

/* Expose handler to global scope so HTML can call it */
window.handleContactSubmit = handleContactSubmit;

/* ---------- Accessibility: close modal with Escape ---------- */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (lightbox && lightbox.style.display === 'flex') {
      lightbox.style.display = 'none';
      lightbox.setAttribute('aria-hidden', 'true');
      lightboxImg.src = '';
    }
    if (navList && navList.classList.contains('show')) {
      navList.classList.remove('show');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  }
});

/* ---------- Smooth scroll for internal links ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const hash = this.getAttribute('href');
    if (hash && hash.startsWith('#')) {
      const el = document.querySelector(hash);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});
