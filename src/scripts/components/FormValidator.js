export class FormValidator {
  constructor(_vconfig, _form) {
    this._vconfig = _vconfig;
    this._form = _form;
    this._inputs = Array.from(this._form.querySelectorAll(this._vconfig.inputSelector));
    this._button = this._form.querySelector(this._vconfig.submitButtonSelector);
  }
  
  _showInputError(input, error){
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    errorElement.textContent = error;
    input.classList.add(this._vconfig.errorClass);
  }
  
  _hideInputError(input){
    const errorElement = this._form.querySelector(`#${input.id}-error`);
    errorElement.textContent = '';
    input.classList.remove(this._vconfig.errorClass);
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

  _hasInvalidInput() {
    return this._inputs.every(input => input.validity.valid);
  }

  _toggleButtonState (inputs) {
    if (!this._hasInvalidInput(inputs)) {
      this._disableButton();
    } else {
      this._button.removeAttribute('disabled');
      this._button.classList.remove(this._vconfig.inactiveButtonClass);
    }
  }

  _disableButton () {
    this._button.classList.add(this._vconfig.inactiveButtonClass);
    this._button.setAttribute('disabled', true);
  }

  _preventFormSubmit(e) {
    e.preventDefault();
  }

  _setEventListeners() {
    this._disableButton();
    this._form.addEventListener('reset', () => {
      this._disableButton();
      this._inputs.forEach((input) => {
        this._hideInputError(input)
      })
    });
    this._inputs.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      })
    })
  }

  enableValidation() {
    this._setEventListeners();
    this._form.addEventListener('submit', (e) => this._preventFormSubmit(e));
  }

}