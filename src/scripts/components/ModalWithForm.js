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
      e.preventDefault();
      this._formLoading(true);
      this._submitHandler(this._getInputValues());
      this.closeModal();
    })
  }

  _formLoading (isLoading) {
    this._submitButton = this._form.querySelector('.form__submit-button');
    if (isLoading || this._submitButton.textContent === "Сохранить") {
      this._submitButton.textContent = "Сохранение...";
    }
    else {
      this._submitButton.textContent = "Сохранить";
    }
  }
  
  closeModal () {
    this._form.reset();
    super.closeModal();
  }
}