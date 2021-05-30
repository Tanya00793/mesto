import { Modal } from './Modal.js'

export class ModalWithImage extends Modal {
  constructor (modalSelector) {
    super(modalSelector);
    this._title = this._modal.querySelector('.modal-preview-card__title');
    this._image = this._modal.querySelector('.modal-preview-card__image');
  }

  openModal (name, link) {
    this._title.textContent = name;
    this._image.src = link;
    this._image.alt= name;
    super.openModal();
  }
}