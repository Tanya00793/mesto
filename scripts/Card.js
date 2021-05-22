import { openModal } from './utils/utils.js';

export class Card {
  constructor(cardData, _cardSelector) {
    this.cardData = cardData;
    this._cardSelector = _cardSelector;
    this.card = this.renderCard();
    this.cardItemElement = this.card.querySelector('.card');
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
    return cardTemplate;
  }

  _setEventListeners() {
    const cardPreviewImage = this.card.querySelector('.card__image');
    const cardLikeBtn = this.card.querySelector('.card__like-button');
    const cardDeleteBtn = this.card.querySelector('.card__delete-button');

    cardPreviewImage.addEventListener('click', () => this._preview());
    cardLikeBtn.addEventListener('click', () => this._like());
    cardDeleteBtn.addEventListener('click', () => this._remove());
  }

  _like() {

    this.cardLikeBtn = this.card.querySelector('.card__like-button');
    this.cardLikeBtn.classList.toggle('card__like-button_active');
  }

  _remove() {
    this.card.remove();
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

  renderCard() {
    this.card = this._getTemplate();
    this.card.querySelector('.card__title').textContent = this.cardData.name;
    const cardPreviewImage = this.card.querySelector('.card__image');
    cardPreviewImage.src = this.cardData.link;
    cardPreviewImage.alt = this.cardData.name;
    this._setEventListeners(); 
    return this.card;
  }
}