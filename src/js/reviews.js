const track = document.querySelector('.reviews__track');
const cards = [...document.querySelectorAll('.reviews__card')];
const btnNext = document.querySelector('.reviews__arrow--right');
const btnPrev = document.querySelector('.reviews__arrow--left');
const viewport = document.querySelector('.reviews__viewport');

if (!track || !cards.length || !viewport) {
  console.warn('Reviews slider: required elements not found');
  throw new Error('Reviews slider init failed');
}

let index = 0;
let cardWidth = 0;
let viewportWidth = 0;
let maxTranslate = 0;
let maxIndex = 0;

let startX = 0;
let startY = 0;
let lastTranslate = 0;
let currentTranslate = 0;
let isDragging = false;
let isTouchEvent = false;

const OVERDRAG = 60;
const SWIPE_THRESHOLD = 0.15;

function updateSizes() {
  cardWidth = cards[0]?.offsetWidth || 0;
  viewportWidth = viewport.offsetWidth || 0;

  if (cardWidth === 0 || viewportWidth === 0) return;

  maxTranslate = -(cards.length * cardWidth - viewportWidth);
  maxIndex = cards.length - Math.ceil(viewportWidth / cardWidth);
  if (maxIndex < 0) maxIndex = 0;

  goTo(Math.min(index, maxIndex), false);
}

function goTo(i, animate = true) {
  index = Math.max(0, Math.min(i, maxIndex));
  const x = -index * cardWidth;

  track.style.transition = animate
    ? 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    : 'none';
  track.style.transform = `translateX(${x}px)`;

  lastTranslate = x;
  currentTranslate = x;
}

if (btnNext) btnNext.addEventListener('click', () => goTo(index + 1));
if (btnPrev) btnPrev.addEventListener('click', () => goTo(index - 1));

function startDrag(clientX, clientY) {
  isDragging = true;
  startX = clientX;
  startY = clientY;
  track.style.transition = 'none';
}

function drag(clientX) {
  if (!isDragging) return;

  const moved = clientX - startX;
  let nextTranslate = lastTranslate + moved;

  if (nextTranslate > OVERDRAG) nextTranslate = OVERDRAG;
  if (nextTranslate < maxTranslate - OVERDRAG)
    nextTranslate = maxTranslate - OVERDRAG;

  currentTranslate = nextTranslate;
  track.style.transform = `translateX(${currentTranslate}px)`;
}

function endDrag() {
  if (!isDragging) return;
  isDragging = false;

  const moved = currentTranslate - lastTranslate;

  if (Math.abs(moved) > cardWidth * SWIPE_THRESHOLD) {
    if (moved < 0 && index < cards.length - 1) index++;
    if (moved > 0 && index > 0) index--;
  }

  goTo(index);
}

// Mouse events
track.addEventListener('mousedown', e => {
  isTouchEvent = false;
  startDrag(e.clientX, e.clientY);
});

track.addEventListener('mousemove', e => {
  if (!isTouchEvent) drag(e.clientX);
});

track.addEventListener('mouseup', endDrag);
track.addEventListener('mouseleave', endDrag);

// Touch events (iOS)
track.addEventListener(
  'touchstart',
  e => {
    isTouchEvent = true;
    startDrag(e.touches[0].clientX, e.touches[0].clientY);
  },
  { passive: true }
);

track.addEventListener(
  'touchmove',
  e => {
    if (!isDragging) return;

    const currentY = e.touches[0].clientY;
    const diffY = Math.abs(currentY - startY);
    const currentX = e.touches[0].clientX;
    const diffX = Math.abs(currentX - startX);

    // Якщо вертикальний скрол - не блокуємо
    if (diffY > diffX) {
      endDrag();
      return;
    }

    e.preventDefault();
    drag(currentX);
  },
  { passive: false }
);

track.addEventListener(
  'touchend',
  e => {
    endDrag();
  },
  { passive: true }
);

// Не допустити scroll на сторінці коли гортаємо
viewport.addEventListener(
  'touchmove',
  e => {
    if (isDragging) {
      e.preventDefault();
    }
  },
  { passive: false }
);

// Ініціалізація
window.addEventListener('load', updateSizes);
window.addEventListener('resize', updateSizes);

// Для випадків коли контент завантажується динамічно
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(updateSizes, 100);
});
