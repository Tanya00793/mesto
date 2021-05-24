import { Modal } from './Modal.js'

export class ModalWithImage extends Modal {
  constructor (modalSelector) {
    super(modalSelector);
    this._title = this._modal.querySelector('.modal-preview-card__title');
    this._image = this._modal.querySelector('.modal-preview-card__image');
  }

  openModal (data) {
    this._title.textContent = data.name;
    this._image.src = data.link;
    this._image.alt= data.name;
    super.openModal();
  }
}