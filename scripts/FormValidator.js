export class FormValidator {
  constructor(vconfig, form) {
    this.vconfig = vconfig;
    this.form = form;
  }
  
  _showInputError(input, error){
    const errorElement = this.form.querySelector(`#${input.id}-error`);
    errorElement.textContent = error;
    input.classList.add(this.vconfig.errorClass);
  }
  
  _hideInputError(input){
    const errorElement = this.form.querySelector(`#${input.id}-error`);
    errorElement.textContent = '';
    input.classList.remove(this.vconfig.errorClass);
  }

  _checkInputValidity(input) {
    const isInputNotValid = !input.validity.valid;
    if (isInputNotValid) {
      const error = input.validationMessage;
      this._showInputError(input, error)
    } else {
      this._hideInputError(input)
    }
  }

  _hasInvalidInput(inputs) {
    return inputs.every(input => input.validity.valid);
  }

  _toggleButtonState(inputs, button) {
    if (!this._hasInvalidInput(inputs)) {
      button.setAttribute('disabled', true);
      button.classList.add(this.vconfig.inactiveButtonClass);
    } else {
      button.removeAttribute('disabled');
      button.classList.remove(this.vconfig.inactiveButtonClass);
    }
  }

  _preventFormSubmit(e) {
    e.preventDefault();
  }

  _setEventListeners() {
    const inputs = Array.from(this.form.querySelectorAll(this.vconfig.inputSelector));
    const button = this.form.querySelector(this.vconfig.submitButtonSelector);
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState(inputs, button);
      })
    })
  }

  enableValidation() {
    this.setEventListeners();
    this.form.addEventListener('submit', (e) => this._preventFormSubmit(e));
  }

}