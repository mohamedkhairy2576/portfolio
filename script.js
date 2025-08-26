const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const viewer = document.getElementById('projectViewer');
  const viewerImg = document.getElementById('viewerImg');
  const viewerTitle = document.getElementById('viewerTitle');
  const viewerDesc = document.getElementById('viewerDesc');
  const viewerTags = document.getElementById('viewerTags');
  const btnGit = document.getElementById('viewerGitHub');
  const btnClose = document.getElementById('viewerClose');
  const grid = document.getElementById('projectsGrid');

  function openModal(card) {
    const imgEl = card.querySelector('img');
    const titleEl = card.querySelector('h3');
    const descEl = card.querySelector('p');
    viewerImg.src = imgEl ? imgEl.src : '';
    viewerImg.alt = imgEl ? imgEl.alt : '';
    viewerTitle.textContent = titleEl ? titleEl.textContent.trim() : '';
    viewerDesc.textContent = descEl ? descEl.textContent.trim() : '';
    viewerTags.innerHTML = '';
    card.querySelectorAll('.project-tags .tag').forEach(t => {
      const s = document.createElement('span');
      s.className = 'tag';
      s.textContent = t.textContent;
      viewerTags.appendChild(s);
    });
    let githubHref = card.getAttribute('data-github') || '';
    if (githubHref) {
      btnGit.href = githubHref;
      btnGit.style.opacity = '1';
    } else {
      btnGit.href = '#';
      btnGit.style.opacity = '.5';
    }
    viewer.classList.add('active');
    document.body.classList.add('noscroll');
  }

  function closeModal() {
    viewer.classList.remove('active');
    document.body.classList.remove('noscroll');
    viewerImg.src = '';
  }

  if (grid) {
    grid.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('a')) return;
        openModal(card);
      });
    });
  }
  if (btnClose) btnClose.addEventListener('click', closeModal);
  if (viewer) viewer.addEventListener('click', (e) => { if (e.target === viewer) closeModal(); });
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  const certItems = document.querySelectorAll('.cert-item');
  const certViewer = document.getElementById('certViewer');
  const certImg = document.getElementById('certImg');
  const certClose = document.getElementById('certClose');

  certItems.forEach(item => {
    const imgSrc = item.getAttribute('data-cert-image');
    if (imgSrc) {
      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = item.querySelector('h4').textContent + ' Certificate';
      img.className = 'cert-image';
      item.appendChild(img);
    }
    item.addEventListener('click', () => {
      const imgSrc = item.getAttribute('data-cert-image');
      if (imgSrc) {
        certImg.src = imgSrc;
        certImg.alt = item.querySelector('h4').textContent + ' Certificate';
        certViewer.classList.add('active');
        document.body.classList.add('noscroll');
      }
    });
  });

  if (certClose) certClose.addEventListener('click', () => {
    certViewer.classList.remove('active');
    document.body.classList.remove('noscroll');
    certImg.src = '';
  });
  if (certViewer) certViewer.addEventListener('click', (e) => {
    if (e.target === certViewer) {
      certViewer.classList.remove('active');
      document.body.classList.remove('noscroll');
      certImg.src = '';
    }
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      certViewer.classList.remove('active');
      document.body.classList.remove('noscroll');
      certImg.src = '';
    }
  });

  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const formData = new FormData(contactForm);
      const name = formData.get('name'),
            email = formData.get('email'),
            subject = formData.get('subject'),
            message = formData.get('message');
      if (!name || !email || !subject || !message) {
        showNotification('Please fill all fields', 'error');
        return;
      }
      showNotification('Message sent — I will reply soon!', 'success');
      window.location.href = `mailto:example@email.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`)}`;
      contactForm.reset();
    });
  }

  function showNotification(msg, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed; top: 100px; right: 20px; padding: 14px 18px; border-radius: 12px; z-index: 2000;
      background: ${type === 'success' ? '#34d399' : '#fb7185'};
      color: #071018; font-weight: 700;
    `;
    notification.textContent = msg;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 4000);
  }
});