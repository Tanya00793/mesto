export class Card {
  constructor(cardData, _cardSelector, _handleCardClick) {
    this.data = cardData;
    this._cardSelector = _cardSelector;
    this.card = this.renderCard();
    this.cardItemElement = this.card.querySelector('.card');
    this._handleCardClick = _handleCardClick;
    this._setEventListeners();
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
    this.card.querySelector('.card__image')
      .addEventListener('click', () => this._handleCardClick(this.data));
    this.card.querySelector('.card__like-button')
      .addEventListener('click', () => this._like());
    this.card.querySelector('.card__delete-button')
      .addEventListener('click', () => this._remove());
  }

  _like() {

    this.cardLikeBtn = this.card.querySelector('.card__like-button');
    this.cardLikeBtn.classList.toggle('card__like-button_active');
  }

  _remove() {
    this.card.remove();
  }

  renderCard() {
    this.card = this._getTemplate();
    this.card.querySelector('.card__title').textContent = this.data.name;
    const cardPreviewImage = this.card.querySelector('.card__image');
    cardPreviewImage.src = this.data.link;
    cardPreviewImage.alt = this.data.name;
    this._setEventListeners(); 
    return this.card;
  }
}