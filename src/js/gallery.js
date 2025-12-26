document.querySelectorAll('.serviceCard__toggle').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.serviceCard');
    const details = card.querySelector('.serviceCard__details');
    details.classList.toggle('active');
    button.textContent = details.classList.contains('active') ? 'Сховати' : 'Детальніше...';
  });
});
