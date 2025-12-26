function scrollToForm(e) {
  e.preventDefault();
  const form = document.querySelector('#form');
  const y = form.getBoundingClientRect().top + window.scrollY;
  const offset = window.innerHeight / 2 - form.offsetHeight / 2;
  window.scrollTo({ top: y - offset, behavior: 'smooth' });
}