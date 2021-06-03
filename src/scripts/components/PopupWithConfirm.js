import { Popup } from './Popup.js'

export class PopupWithConfirm extends Popup {
  constructor (popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
  }

  openPopup (id) {
    super.openPopup();
    this._id = id;
  }

  getId () {
    return this._id;
  }
  
  setEventListeners () {
    super.setEventListeners();
    this._form = this._popup.querySelector('.form');
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._submitHandler();
    })
  }
}