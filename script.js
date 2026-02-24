document.addEventListener('DOMContentLoaded', () => {

  /* ============================================
     NAVBAR SCROLL EFFECT
     ============================================ */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  /* ============================================
     MOBILE NAV TOGGLE
     ============================================ */
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('active');
    navToggle.classList.toggle('active', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ============================================
     ACTIVE NAV LINK HIGHLIGHTING
     ============================================ */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active',
            link.getAttribute('href') === '#' + entry.target.id
          );
        });
      }
    });
  }, { rootMargin: '-50% 0px -50% 0px' });

  sections.forEach(section => sectionObserver.observe(section));

  /* ============================================
     SCROLL ANIMATIONS
     ============================================ */
  const animateObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        animateObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-in').forEach(el => {
    animateObserver.observe(el);
  });

  /* ============================================
     FORMSUBMIT.CO AJAX HANDLER
     ============================================ */
  const CONTACT_EMAIL = 'steve@cleaning-tech.com';
  const FORMSUBMIT_URL = 'https://formsubmit.co/ajax/' + CONTACT_EMAIL;

  document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const messageDiv = document.getElementById('form-message');

    // Reset message
    messageDiv.className = 'form-message';
    messageDiv.textContent = '';

    // Disable button while submitting
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    fetch(FORMSUBMIT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form)))
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        messageDiv.className = 'form-message success';
        messageDiv.textContent = 'Thank you! Your message has been sent. We\'ll be in touch shortly.';
        form.reset();
      } else {
        throw new Error('Submission failed');
      }
    })
    .catch(() => {
      messageDiv.className = 'form-message error';
      messageDiv.textContent = 'Something went wrong. Please call us at (714) 841-1861 or email steve@cleaning-tech.com directly.';
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    });
  });

});
