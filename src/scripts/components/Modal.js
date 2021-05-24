export class Modal {
  constructor(modalSelector) {
    this._modal = document.querySelector(modalSelector);
  }

  openModal () {
    this._modal.classList.add('modal_opened');
    document.addEventListener('keydown', this._closeModalByEsc); 
  }
  
  closeModal () {
    this._modal.classList.remove('modal_opened');
    document.removeEventListener('keydown', this._closeModalByEsc); 
  }
  
  _closeModalByEsc = (e) => {
    if (e.key === 'Escape') {
      this.closeModal();
    }
  }

  setEventListeners () {
    this._modal.addEventListener('click', e => {
      if (e.target.classList.contains('modal_opened') || 
      e.target.classList.contains('modal__close-button')) {
        this.closeModal();
      }
    })
  }
}