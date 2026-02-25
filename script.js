/* ============================================
   PORTFOLIO SCRIPT — Reto Stephen
   Custom Cursor, Scroll Reveals, Nav Effects
   ============================================ */

(function () {
  'use strict';

  /* ---- Custom Cursor ---- */
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hover effect on interactive elements
  const hoverTargets = document.querySelectorAll('a, button, .skill-card, .project-card, .nav-toggle');
  hoverTargets.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hovering');
      follower.classList.add('hovering');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hovering');
      follower.classList.remove('hovering');
    });
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    follower.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    follower.style.opacity = '0.5';
  });

  /* ---- Scroll Reveal ---- */
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Stagger siblings slightly
          const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
          const index = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = `${index * 0.07}s`;
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  reveals.forEach((el) => revealObserver.observe(el));

  /* ---- Nav Scroll Effect ---- */
  const nav = document.getElementById('nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });

  /* ---- Mobile Nav Toggle ---- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = navToggle.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
      spans[1].style.transform = 'rotate(-45deg) translate(4px, -4px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.transform = '';
    }
  });

  // Close nav on link click
  navLinks.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.querySelectorAll('span').forEach((s) => (s.style.transform = ''));
    });
  });

  /* ---- Hero Title Entrance ---- */
  window.addEventListener('load', () => {
    const heroReveals = document.querySelectorAll('.hero .reveal');
    heroReveals.forEach((el, i) => {
      setTimeout(() => {
        el.style.transitionDelay = '0s';
        el.classList.add('visible');
      }, 200 + i * 120);
    });
  });

  /* ---- Smooth Active Nav Highlight ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinksAll.forEach((link) => {
            link.style.color = '';
            if (link.getAttribute('href') === `#${entry.target.id}`) {
              link.style.color = 'var(--accent)';
            }
          });
        }
      });
    },
    { rootMargin: '-40% 0px -50% 0px' }
  );

  sections.forEach((s) => sectionObserver.observe(s));

  /* ---- Stat Number Count-Up Animation ---- */
  const stats = document.querySelectorAll('.stat-num');

  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.textContent.replace(/\D/g, ''));
          const suffix = el.textContent.replace(/[\d]/g, '');
          let start = 0;
          const duration = 1400;
          const stepTime = 20;
          const steps = Math.floor(duration / stepTime);
          const increment = target / steps;

          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              el.textContent = target + suffix;
              clearInterval(timer);
            } else {
              el.textContent = Math.floor(start) + suffix;
            }
          }, stepTime);

          countObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  stats.forEach((s) => countObserver.observe(s));

  /* ---- Parallax Hero BG Text ---- */
  const heroBgText = document.querySelector('.hero-bg-text');
  if (heroBgText) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      heroBgText.style.transform = `translateY(calc(-50% + ${scrollY * 0.3}px))`;
    }, { passive: true });
  }

  /* ---- Project Card Tilt Effect ---- */
  document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -3;
      card.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ---- Skill Card Glow Follow ---- */
  document.querySelectorAll('.skill-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--glow-x', `${x}%`);
      card.style.setProperty('--glow-y', `${y}%`);
    });
  });

  /* ---- Contact Email Glitch Hover ---- */
  const emailLink = document.querySelector('.contact-email');
  if (emailLink) {
    const original = emailLink.textContent;
    const chars = 'abcdefghijklmnopqrstuvwxyz@._-0123456789';

    emailLink.addEventListener('mouseenter', () => {
      let iterations = 0;
      const interval = setInterval(() => {
        emailLink.textContent = original
          .split('')
          .map((char, index) => {
            if (index < iterations || char === '@' || char === '.' || char === '_') return char;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');
        if (iterations >= original.length) clearInterval(interval);
        iterations += 0.5;
      }, 30);
    });
  }

  /* ---- Page Load Progress ---- */
  const loader = document.createElement('div');
  loader.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--accent), var(--accent2));
    z-index: 99999;
    transition: width 0.3s ease;
    width: 0%;
  `;
  document.body.appendChild(loader);

  let progress = 0;
  const loadInterval = setInterval(() => {
    progress += Math.random() * 30;
    if (progress > 90) progress = 90;
    loader.style.width = progress + '%';
  }, 200);

  window.addEventListener('load', () => {
    clearInterval(loadInterval);
    loader.style.width = '100%';
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => loader.remove(), 300);
    }, 400);
  });

})();