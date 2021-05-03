import { openModal, closeModal, closeModalByEsc } from './utils/utils.js';

export class Card {
  constructor(cardData, cardTemplate) {
    this.cardData = cardData;
    this.cardTemplate = cardTemplate;
    this.card = this._createCard();
    this.cardItemElement = this.card.querySelector('.card');
    this.cardLikeBtn = this.card.querySelector('.card__like-button');
    this._addEventListeners();
  }

  _createCard() {
    const cardTemplate = document.querySelector('#cardTemplate').content;
    const card = cardTemplate.cloneNode(true);
    card.querySelector('.card__title').textContent = this.cardData.name;
    const cardPreviewImage = card.querySelector('.card__image');
    cardPreviewImage.src = this.cardData.link;
    cardPreviewImage.alt = this.cardData.name;
    return card;
  }

  _addEventListeners() {
    const cardPreviewImage = this.card.querySelector('.card__image');
    const cardLikeBtn = this.card.querySelector('.card__like-button');
    const cardDeleteBtn = this.card.querySelector('.card__delete-button');

    cardPreviewImage.addEventListener('click', () => this._preview());
    cardLikeBtn.addEventListener('click', () => this._like());
    cardDeleteBtn.addEventListener('click', () => this._remove());
  }

  _like() {
    this.cardLikeBtn.classList.toggle('card__like-button_active');
  }

  _remove() {
    this.cardItemElement.remove();
  }

  _preview() {
    const modalPreviewCard = document.querySelector('.modal-preview-card');
    const modalPreviewCardImage = document.querySelector('.modal-preview-card__image');
    const modalPreviewCardTitle = document.querySelector('.modal-preview-card__title');
    openModal(modalPreviewCard);
    modalPreviewCardTitle.textContent = this.cardData.name;
    modalPreviewCardImage.src = this.cardData.link;
    modalPreviewCardImage.alt = this.cardData.name;
  }

  render() {
    return this.card;
  }
}