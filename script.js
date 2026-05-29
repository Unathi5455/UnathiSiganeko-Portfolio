const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});


/* ---- 2. Active nav link ----------------------------------- */
const navLinks   = document.querySelectorAll('.nav-links a');
const sections   = document.querySelectorAll('section[id], div[id="home"]');

function setActiveLink() {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', setActiveLink);
setActiveLink(); // run on load


/* ---- 3. Mobile nav toggle --------------------------------- */
const navToggle  = document.getElementById('navToggle');
const navLinksEl = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinksEl.classList.toggle('open');
});

// Close nav when a link is clicked
navLinksEl.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinksEl.classList.remove('open');
  });
});


/* ---- 4. Scroll-reveal animations -------------------------- */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Stop observing once revealed (one-time animation)
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,       // trigger when 12% of element is visible
    rootMargin: '0px 0px -40px 0px'  // slight offset from bottom
  }
);

revealElements.forEach(el => revealObserver.observe(el));


/* ---- 5. Stagger delays for grid children ------------------ */
// Finds grids and staggers the animation delay of their children
// so they pop in one by one rather than all at once.
const staggerParents = [
  { selector: '.skills-grid',   childClass: '.skill-card'   },
  { selector: '.projects-grid', childClass: '.project-card' },
  { selector: '.about-cards',   childClass: '.info-card'    },
  { selector: '.contact-grid',  childClass: '.contact-card' },
];

staggerParents.forEach(({ selector, childClass }) => {
  const parent = document.querySelector(selector);
  if (!parent) return;
  const children = parent.querySelectorAll(childClass);
  children.forEach((child, i) => {
    child.style.transitionDelay = `${i * 80}ms`;
  });
});


/* ---- 6. Smooth scroll for all anchor links ---------------- */
// This is a fallback for browsers that don't support scroll-behavior: smooth in CSS.
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navHeight = document.querySelector('.nav').offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});


document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;  // max 4deg
    const rotateY = ((x - centerX) / centerX) * 4;
    card.style.transform = `translateY(-4px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    card.style.transition = 'transform 0.1s ease';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.35s ease, box-shadow 0.25s, border-color 0.25s';
  });
});


console.log(
  '%c👋 Hey, you found the console!',
  'font-size: 16px; font-weight: bold; color: #e8521a;'
);
console.log(
  '%cI\'m Unathi — feel free to reach out if you like what you see.',
  'font-size: 13px; color: #5a554d;'
);