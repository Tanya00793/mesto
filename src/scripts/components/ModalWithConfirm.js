import { Modal } from './Modal.js'

export class ModalWithConfirm extends Modal {
  constructor (modalSelector, {submitHandler}) {
    super(modalSelector);
    this._submitHandler = submitHandler;
  }

  openModal (id) {
    super.openModal();
    this._id = id;
  }

  getId () {
    return this._id;
  }
  
  setEventListeners () {
    super.setEventListeners();
    this._form = this._modal.querySelector('.form');
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._submitHandler();
      this.closeModal();
    })
  }
}