export { openModal, closeModal, closeModalByEsc }
  
const openModal = modal => {
  modal.classList.add('modal_opened');
  document.addEventListener('keydown', closeModalByEsc); 
}

function closeModal(modal) {
  modal.classList.remove('modal_opened');
  document.removeEventListener('keydown', closeModalByEsc); 
}

function closeModalByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedModal = document.querySelector('.modal_opened');
    closeModal(openedModal);
  }
}