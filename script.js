/**
 * Glänzende Sauberkeit – Main Script
 *
 * Features:
 *  1. Mobile menu toggle
 *  2. Sticky navbar shadow on scroll
 *  3. Smooth scrolling for anchor links
 *  4. Contact form validation
 *  5. Auto-update copyright year
 *  6. Close mobile menu when a nav link is clicked
 */

(function () {
  'use strict';

  /* ----------------------------------------------------------------
   * 1. DOM References
   * ---------------------------------------------------------------- */
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  const form      = document.getElementById('contact-form');
  const yearEl    = document.getElementById('year');

  /* ----------------------------------------------------------------
   * 2. Copyright Year
   * ---------------------------------------------------------------- */
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ----------------------------------------------------------------
   * 3. Sticky Navbar – add shadow on scroll
   * ---------------------------------------------------------------- */
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
  }

  /* ----------------------------------------------------------------
   * 4. Mobile Menu Toggle
   * ---------------------------------------------------------------- */
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      hamburger.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (
        navLinks.classList.contains('open') &&
        !navLinks.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Menü öffnen');
      }
    });

    // Close menu when a nav link is clicked
    navLinks.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Menü öffnen');
      });
    });
  }

  /* ----------------------------------------------------------------
   * 5. Smooth Scrolling for anchor links
   *    (CSS scroll-behavior handles most cases; this handles older
   *     browsers and offsets for the sticky navbar.)
   * ---------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      const targetTop =
        target.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });

  /* ----------------------------------------------------------------
   * 6. Contact Form Validation
   * ---------------------------------------------------------------- */
  if (form) {
    const fields = {
      name:    { el: document.getElementById('name'),    errorEl: document.getElementById('name-error') },
      email:   { el: document.getElementById('email'),   errorEl: document.getElementById('email-error') },
      phone:   { el: document.getElementById('phone'),   errorEl: document.getElementById('phone-error') },
      message: { el: document.getElementById('message'), errorEl: document.getElementById('message-error') },
    };
    const successMsg = document.getElementById('form-success');

    /**
     * Validate a single field and return true if valid.
     * @param {string} fieldName
     * @returns {boolean}
     */
    function validateField(fieldName) {
      const { el, errorEl } = fields[fieldName];
      let error = '';

      if (!el || !errorEl) return true;

      const value = el.value.trim();

      switch (fieldName) {
        case 'name':
          if (!value) {
            error = 'Bitte geben Sie Ihren Namen ein.';
          } else if (value.length < 2) {
            error = 'Name muss mindestens 2 Zeichen lang sein.';
          }
          break;

        case 'email':
          if (!value) {
            error = 'Bitte geben Sie Ihre E-Mail-Adresse ein.';
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            error = 'Bitte geben Sie eine gültige E-Mail-Adresse ein.';
          }
          break;

        case 'phone':
          // Phone is optional; only validate if a value is provided
          if (value && !/^[\d\s\+\-\(\)\.]{6,20}$/.test(value)) {
            error = 'Bitte geben Sie eine gültige Telefonnummer ein.';
          }
          break;

        case 'message':
          if (!value) {
            error = 'Bitte geben Sie eine Nachricht ein.';
          } else if (value.length < 10) {
            error = 'Nachricht muss mindestens 10 Zeichen lang sein.';
          }
          break;
      }

      el.classList.toggle('error', !!error);
      errorEl.textContent = error;
      return !error;
    }

    // Live validation on blur
    Object.keys(fields).forEach((fieldName) => {
      const { el } = fields[fieldName];
      if (el) {
        el.addEventListener('blur', () => validateField(fieldName));
        el.addEventListener('input', () => {
          // Clear error as soon as user starts typing again
          if (el.classList.contains('error')) {
            validateField(fieldName);
          }
        });
      }
    });

    // Form submission
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid    = validateField('name');
      const isEmailValid   = validateField('email');
      const isPhoneValid   = validateField('phone');
      const isMessageValid = validateField('message');

      if (!isNameValid || !isEmailValid || !isPhoneValid || !isMessageValid) {
        // Focus first invalid field
        const firstInvalid = form.querySelector('.error');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // All valid – simulate submission
      form.reset();

      // Clear any leftover error states
      Object.values(fields).forEach(({ el, errorEl }) => {
        if (el) el.classList.remove('error');
        if (errorEl) errorEl.textContent = '';
      });

      // Show success message
      if (successMsg) {
        successMsg.hidden = false;
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Hide after 6 seconds
        setTimeout(() => {
          successMsg.hidden = true;
        }, 6000);
      }
    });
  }
})();
