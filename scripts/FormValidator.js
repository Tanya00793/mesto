export class FormValidator {
  constructor(vconfig, form) {
    this.vconfig = vconfig;
    this.form = form;
  }
  
  showInputError(input, error){
    const errorElement = this.form.querySelector(`#${input.id}-error`);
    errorElement.textContent = error;
    input.classList.add(this.vconfig.errorClass);
  }
  
  hideInputError(input){
    const errorElement = this.form.querySelector(`#${input.id}-error`);
    errorElement.textContent = '';
    input.classList.remove(this.vconfig.errorClass);
  }

  checkInputValidity(input) {
    const isInputNotValid = !input.validity.valid;
    if (isInputNotValid) {
      const error = input.validationMessage;
      this.showInputError(input, error)
    } else {
      this.hideInputError(input)
    }
  }

  hasInvalidInput(inputs) {
    return inputs.every(input => input.validity.valid);
  }

  toggleButtonState(inputs, button) {
    if (!this.hasInvalidInput(inputs)) {
      button.setAttribute('disabled', true);
      button.classList.add(this.vconfig.inactiveButtonClass);
    } else {
      button.removeAttribute('disabled');
      button.classList.remove(this.vconfig.inactiveButtonClass);
    }
  }

  preventFormSubmit(e) {
    e.preventDefault();
  }

  setEventListeners() {
    const inputs = Array.from(this.form.querySelectorAll(this.vconfig.inputSelector));
    const button = this.form.querySelector(this.vconfig.submitButtonSelector);
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        this.checkInputValidity(input);
        this.toggleButtonState(inputs, button);
      })
    })
  }

  enableValidation() {
    this.setEventListeners();
    this.form.addEventListener('submit', (e) => this.preventFormSubmit(e));
  }

}