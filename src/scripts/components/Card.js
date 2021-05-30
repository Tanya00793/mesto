import { Api } from "./Api";

export class Card {
  constructor(
      {name, link, likes, owner, _id},
      currentUser, 
      _cardSelector, 
      _handleCardClick,
      handleDeleteCardClick,
      {handleLikeClick}) {
    this._name = name;
    this._link = link;
    this._cardDataId = _id;
    this._ownerID = owner._id;
    this._currentUser = currentUser;
    this._likes = likes;
    this._cardSelector = _cardSelector;
    this._handleCardClick = _handleCardClick;
    this._handleDeleteCardClick = handleDeleteCardClick;
    this._handleLikeClick = handleLikeClick;
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
      .addEventListener('click', () => this._handleCardClick(this._name, this._link));
    this.card.querySelector('.card__like-button')
      .addEventListener('click', () => this._like());
    this._deleteButton = this.card.querySelector('.card__delete-button');
    this._deleteButton.addEventListener('click', (e) => 
      this._handleDeleteCardClick(this.card));
  }

  getId() {
    return this._id;
  }

  _like() {
    this._handleLikeClick(this.card);
  }

  _remove() {
    this.card.remove();
  }

  renderCard() {
    this.card = this._getTemplate();
    this.card.querySelector('.card__likes')
      .textContent = this._likes.length;
    this.card.id = this._cardDataId;
    this.card.querySelector('.card__title').textContent = this._name;
    const cardPreviewImage = this.card.querySelector('.card__image');
    cardPreviewImage.src = this._link;
    cardPreviewImage.alt = this._name;
    this._likes.forEach((like) => {
      if (like._id = this._currentUser) {
        this.card.querySelector('.card__like-button')
        .classList.add('card__like-button_active');
      }
      else {
        this.card.querySelector('.card__like-button_active')
        .classList.add('card__like-button');
      }
    })
    if (this._ownerID === this._currentUser) {
      this.card.querySelector('.card__delete-button')
        .classList.remove('hidden')
    }

    this._setEventListeners(); 
    return this.card;
  }
}