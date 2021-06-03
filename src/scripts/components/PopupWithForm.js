import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
  constructor (popupSelector, _submitHandler) {
    super(popupSelector);
    this._submitHandler = _submitHandler;
    this._form = this._popup.querySelector('.form');
    this._inputs = [...this._form.querySelectorAll('.form__input')];
    this._submitButton = this._form.querySelector('.form__submit-button');
    this._initialText = this._submitButton.textContent;
  }

  _getInputValues () {
    const values = {};
    this._inputs.forEach(input => {
      values[input.name] = input.value;
    })
    return values;
  }

  formLoading (isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Сохранение...";
    } else {
      this._submitButton.textContent = this._initialText;
    }
  }
  
  setEventListeners () {
    super.setEventListeners();
    this._form.addEventListener('submit', (e) => {
      this.formLoading(true);
      e.preventDefault();
      this._submitHandler(this._getInputValues());
    })
  }
  
  closePopup () {
    this.formLoading(false);
    this._form.reset();
    super.closePopup();
  }
}