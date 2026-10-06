// Hero 姓名逐字動畫：拆成單字 span，依序做進場位移
const heroName = document.getElementById('heroName');
if (heroName) {
  const text = heroName.textContent;
  heroName.textContent = '';
  [...text].forEach((char, i) => {
    const span = document.createElement('span');
    span.className = 'char';
    span.textContent = char;
    span.style.animationDelay = `${0.35 + i * 0.08}s`;
    heroName.appendChild(span);
  });
}

// 手機選單開關
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// 卷軸淡入效果
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));

// 時間軸：捲動到該區塊時，線條與節點依序畫出
const timeline = document.querySelector('.timeline');
if (timeline) {
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        timelineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  timelineObserver.observe(timeline);
}
// 圖片燈箱：點擊作品／得獎／研習圖片放大檢視
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCap = document.getElementById('lightboxCap');

function closeLightbox() {
  lightbox.hidden = true;
  lightboxImg.removeAttribute('src');
  document.body.style.overflow = '';
}

document.querySelectorAll('.work-gallery img, .mini-card img, .photo-grid img, .ispan-grid img').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCap.textContent = img.alt;
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  });
});

lightbox.addEventListener('click', closeLightbox);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
});
