export const avatarElement = document.querySelector('.profile__avatar');

export const popupAddCard = document.querySelector('.popup-add-card');
export const popupEditProfileForm = document.forms['popupEditProfileForm'];
export const popupEditProfileOpenBtn = document.querySelector('.profile__edit-button');

export const popupEditAvatarForm = document.forms['editAvatarForm'];
export const popupEditAvatarOpenBtn = document.querySelector('.profile__avatar-edit-button');

export const popupAddCardForm = document.forms['addCardForm'];
export const popupAddCardOpenBtn = document.querySelector('.profile__add-card-button');

export const nameInput = popupEditProfileForm.querySelector('#form__input-name');
export const professionInput = popupEditProfileForm.querySelector('#form__input-profession');
export const placeTitleInput = popupAddCardForm.querySelector('#form__input-place-title');
export const placeLinkInput = popupAddCardForm.querySelector('#form__input-place-link');

export const cardDeleteButtons = document.querySelectorAll('.card__delete-button');

export const dataForCardsTemplate = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const vConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  activeButtonClass: 'form__submit-button_active',
  inputErrorClass: 'form__input-error',
  errorClass: 'form__input-error_active',
};

//---------------------------------------------------------------

export const cardTemplateSelector = '.card-template';
