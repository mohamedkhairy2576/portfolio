/* ── NAV: scroll class + active link + hamburger ── */
const navbar = document.getElementById('navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
  updateActiveLink();
}, { passive: true });

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('open');
  });
}
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
  });
});

function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

/* ── REVEAL ON SCROLL ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 70);
    }
  });
}, { threshold: 0.07 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── SKILL BARS ── */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar').forEach(bar => {
        bar.style.width = bar.dataset.w + '%';
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.25 });
const skillsSection = document.getElementById('skills');
if (skillsSection) skillObserver.observe(skillsSection);

/* ── COUNTER ANIMATION ── */
function animateCounter(el) {
  const target = +el.dataset.target;
  const suffix = el.dataset.suffix || '+';
  let current = 0;
  const duration = 1400;
  const steps = 50;
  const increment = target / steps;
  const interval = duration / steps;
  const timer = setInterval(() => {
    current = Math.min(current + increment, target);
    el.textContent = Math.round(current) + suffix;
    if (current >= target) clearInterval(timer);
  }, interval);
}
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-target]').forEach(animateCounter);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
const heroStats = document.querySelector('.stat-cards');
if (heroStats) counterObserver.observe(heroStats);

/* ── PROJECT MODAL ── */
const projectViewer = document.getElementById('projectViewer');
const viewerImg     = document.getElementById('viewerImg');
const viewerTitle   = document.getElementById('viewerTitle');
const viewerDesc    = document.getElementById('viewerDesc');
const viewerTags    = document.getElementById('viewerTags');
const viewerGitHub  = document.getElementById('viewerGitHub');
const viewerClose   = document.getElementById('viewerClose');

function openProjectModal(card) {
  const img   = card.querySelector('img');
  const title = card.querySelector('.proj-title');
  const desc  = card.querySelector('.proj-desc');
  const github= card.dataset.github || '#';

  if (img) { viewerImg.src = img.src; viewerImg.alt = img.alt; viewerImg.style.display = 'block'; }
  else { viewerImg.style.display = 'none'; }

  viewerTitle.textContent = title ? title.textContent.trim() : '';
  viewerDesc.textContent  = desc  ? desc.textContent.trim()  : '';

  viewerTags.innerHTML = '';
  card.querySelectorAll('.ptag').forEach(t => {
    const s = document.createElement('span');
    s.className = 'ptag'; s.textContent = t.textContent;
    viewerTags.appendChild(s);
  });

  viewerGitHub.href = github;
  viewerGitHub.style.opacity = github !== '#' ? '1' : '0.4';

  projectViewer.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  projectViewer.classList.remove('active');
  document.body.style.overflow = '';
  viewerImg.src = '';
}

document.querySelectorAll('.proj-card').forEach(card => {
  card.addEventListener('click', (e) => {
    if (e.target.closest('a')) return;
    openProjectModal(card);
  });
});
if (viewerClose) viewerClose.addEventListener('click', closeProjectModal);
if (projectViewer) projectViewer.addEventListener('click', e => { if (e.target === projectViewer) closeProjectModal(); });

/* ── CERT MODAL ── */
const certViewer = document.getElementById('certViewer');
const certImg    = document.getElementById('certImg');
const certClose  = document.getElementById('certClose');

document.querySelectorAll('.cert-card').forEach(card => {
  card.addEventListener('click', () => {
    const src = card.dataset.certImage;
    if (!src) return;
    certImg.src = src;
    certImg.alt = card.querySelector('h4').textContent + ' Certificate';
    certViewer.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

function closeCertModal() {
  certViewer.classList.remove('active');
  document.body.style.overflow = '';
  certImg.src = '';
}
if (certClose) certClose.addEventListener('click', closeCertModal);
if (certViewer) certViewer.addEventListener('click', e => { if (e.target === certViewer) closeCertModal(); });

/* ── ESC closes any modal ── */
window.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeProjectModal(); closeCertModal(); }
});

/* ── CONTACT FORM ── */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const name    = contactForm.name.value.trim();
    const email   = contactForm.email.value.trim();
    const subject = contactForm.subject.value.trim();
    const message = contactForm.message.value.trim();

    if (!name || !email || !subject || !message) {
      showNotif('Please fill in all fields.', 'error'); return;
    }

    const mailto = `mailto:mohamedkh2576@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.location.href = mailto;
    showNotif('Opening your email client...', 'success');
    contactForm.reset();
  });
}

function showNotif(msg, type = 'success') {
  const el = document.createElement('div');
  el.className = `notif ${type}`;
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 4000);
}
