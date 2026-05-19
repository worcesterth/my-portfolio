// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
reveals.forEach(el => io.observe(el));

// เรียงกิจกรรมตามปี (ใหม่สุดขึ้นก่อน)
const actGrid = document.querySelector('.activities-grid');
if (actGrid) {
  const cards = [...actGrid.querySelectorAll('.activity-card')];
  cards
    .sort((a, b) => {
      const yearA = parseInt(a.querySelector('.activity-date')?.textContent) || 0;
      const yearB = parseInt(b.querySelector('.activity-date')?.textContent) || 0;
      return yearB - yearA;
    })
    .forEach(card => actGrid.appendChild(card));
}

// Activity carousels
document.querySelectorAll('.activity-carousel').forEach(carousel => {
  const track = carousel.querySelector('.carousel-track');
  const imgs = track.querySelectorAll('img');
  const dotsWrap = carousel.querySelector('.carousel-dots');
  const prevBtn = carousel.querySelector('.carousel-btn.prev');
  const nextBtn = carousel.querySelector('.carousel-btn.next');
  let current = 0;

  // ซ่อน carousel ที่มีรูปแค่ 1 ใบ ไม่ต้องแสดงปุ่ม
  if (imgs.length <= 1) {
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
  }

  // สร้าง dots
  imgs.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  function goTo(index) {
    current = (index + imgs.length) % imgs.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dotsWrap.querySelectorAll('.dot').forEach((d, i) =>
      d.classList.toggle('active', i === current)
    );
    prevBtn.disabled = false;
    nextBtn.disabled = false;
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  // data-pos → object-position (เช่น data-pos="top", "left", "right", "bottom")
  imgs.forEach(img => {
    if (img.dataset.pos) img.style.objectPosition = img.dataset.pos;
    img.addEventListener('error', () => img.classList.add('broken'));
  });
});
