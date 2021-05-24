import { Modal } from './Modal.js'

export class ModalWithForm extends Modal {
  constructor (modalSelector, _submitHandler) {
    super(modalSelector);
    this._submitHandler = _submitHandler;
  }

  _getInputValues () {
    const values = {};
    const inputs = [...this._form.querySelectorAll('.form__input')];
    inputs.forEach(input => {
      values[input.name] = input.value;
    })
    return values;
  }
  
  setEventListeners () {
    super.setEventListeners();
    this._form = this._modal.querySelector('.form');
    this._form.addEventListener('submit', (e) => {
      this._submitHandler(this._getInputValues());
      this.closeModal();
    })  
  }
  
  closeModal () {
    this._form.reset();
    super.closeModal();
  }
}