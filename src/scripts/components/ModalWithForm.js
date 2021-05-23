import { Modal } from './Modal.js'

export class ModalWithForm extends Modal {
  constructor (modalSelector, submitHandler) {
    super(modalSelector);
    this._submitHandler = submitHandler;
  }

  _getInputValues () {
    const values = {};
    const inputs = [this._form.querySelectorAll('.form__input')];
    inputs.forEach(input => {
      values[input.name] = input.value;
    })
  }
  
  setEventListeners () {
    super.setEventListeners();
    this._form = this._modal.querySelector('.form');
    this._form.addEventListener('submit', (e) => {
      this._submitHandler(e);
      this.closeModal();
    })  
  }
  
  closeModal () {
    this._form.reset();
    super.closeModal();
  }
}