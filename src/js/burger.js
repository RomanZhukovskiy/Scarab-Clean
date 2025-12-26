window.addEventListener('load', () => {
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.header__menu');

  if (!burger || !menu) return;

  burger.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    const isOpen = burger.classList.toggle('active');
    menu.classList.toggle('active', isOpen);
    document.body.classList.toggle('no-scroll', isOpen);
    document.documentElement.classList.toggle('no-scroll', isOpen);
  });

  menu.addEventListener('click', e => {
    if (!e.target.closest('a')) return;

    burger.classList.remove('active');
    menu.classList.remove('active');
    document.body.classList.remove('no-scroll');
    document.documentElement.classList.remove('no-scroll');
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.header') && burger.classList.contains('active')) {
      burger.classList.remove('active');
      menu.classList.remove('active');
      document.body.classList.remove('no-scroll');
      document.documentElement.classList.remove('no-scroll');
    }
  });
});
