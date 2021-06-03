import { Popup } from './Popup.js'

export class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
    this._title = this._popup.querySelector('.popup-preview-card__title');
    this._image = this._popup.querySelector('.popup-preview-card__image');
  }

  openPopup (name, link) {
    this._title.textContent = name;
    this._image.src = link;
    this._image.alt= name;
    super.openPopup();
  }
}