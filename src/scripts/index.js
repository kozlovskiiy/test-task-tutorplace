document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelector('.modal');
  const openModalBtn = document.querySelector('.welcome__button');
  const closeModalBtn = document.querySelector('.modal__close');
  const burgerBtn = document.querySelector('.burger-button');
  const header = document.querySelector('.header');
  const body = document.body;

  function openModal() {
    modal.classList.add('modal--active');
    body.classList.add('no-scroll');
    document.addEventListener('keydown', handleModalEscape);
    document.addEventListener('click', handleModalOverlay);
  }
  
  function closeModal() {
    modal.classList.remove('modal--active');
    body.classList.remove('no-scroll');
    document.removeEventListener('keydown', handleModalEscape);
    document.removeEventListener('click', handleModalOverlay);
  }

  function handleModalOverlay(e) {
    if (e.target === body) {
      closeModal();
    }
  }

  function handleModalEscape(e) {
    if (e.key === 'Escape') closeModal();
  }
  



  function toggleMenu() {
    const isOpened = burgerBtn.classList.contains('burger-button--opened');
    
    if (isOpened) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function openMenu() {
    burgerBtn.classList.add('burger-button--opened');
    header.classList.add('header--mobile');
    body.classList.add('no-scroll');
    document.addEventListener('keydown', handleMenuEscape);
    document.addEventListener('click', handleMenuOverlay);
  }

  function closeMenu() {
    burgerBtn.classList.remove('burger-button--opened');
    header.classList.remove('header--mobile');
    body.classList.remove('no-scroll');
    document.removeEventListener('keydown', handleMenuEscape);
    document.removeEventListener('click', handleMenuOverlay);
  }

  function handleMenuEscape(e) {
    if (e.key === 'Escape') closeMenu();
  }

  function handleMenuOverlay(e) {
    if (!e.target.closest('.header') && !e.target.closest('.burger-button')) closeMenu();
  }

  if (openModalBtn) openModalBtn.addEventListener('click', openModal);
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (burgerBtn) burgerBtn.addEventListener('click', toggleMenu);
});

