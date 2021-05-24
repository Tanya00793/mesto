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

  _hasInvalidInput(inputs) {
    return inputs.every(input => input.validity.valid);
  }

  _toggleButtonState (inputs) {
    if (!this._hasInvalidInput(inputs)) {
      this._button.setAttribute('disabled', true);
      this._button.classList.add(this._vconfig.inactiveButtonClass);
    } else {
      this._button.removeAttribute('disabled');
      this._button.classList.remove(this._vconfig.inactiveButtonClass);
    }
  }

  _disableButton (button) {
    const btn = this._form.querySelector('.form__submit-button');
    btn.classList.add('form__submit-button_disabled');
    btn.setAttribute('disabled', true);
  }

  _preventFormSubmit(e) {
    e.preventDefault();
  }

  _setEventListeners() {
    this._form.addEventListener('reset', () => {
      this._disableButton(this._button);
      this._inputs.forEach((input) => {
        this._hideInputError(input)
      })
    });
    this._inputs.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState(this._inputs, this._button);
      })
    })
  }

  enableValidation() {
    this._setEventListeners();
    this._form.addEventListener('submit', (e) => this._preventFormSubmit(e));
  }

}