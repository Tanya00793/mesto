import { Modal } from './Modal.js'

export class ModalWithImage extends Modal {
  constructor (modalSelector) {
    super(modalSelector);
  }

  openModal (data) {
    this._modal.querySelector('.modal-preview-card__title').textContent = data.name;
    this._modal.querySelector('.modal-preview-card__image').src = data.link;
    super.openModal();
  }
}