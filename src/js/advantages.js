document.querySelectorAll('.advantageCard').forEach(card => {
  const button = card.querySelector('.advantageCard__toggle');
  const details = card.querySelector('.advantageCard__details');

  card.addEventListener('click', () => {
    details.classList.toggle('active');
    button.textContent = details.classList.contains('active') ? '–' : '+';
  });
});
