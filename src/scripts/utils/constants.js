export const modalEditProfile = document.querySelector('.modal-edit-profile');
export const modalAddCard = document.querySelector('.modal-add-card');
export const modalEditProfileForm = document.forms['modalEditProfileForm'];
export const modalEditProfileOpenBtn = document.querySelector('.profile__edit-button');
export const modalAddCardForm = document.forms['addCardForm'];
export const modalAddCardOpenBtn = document.querySelector('.profile__add-card-button');

export const nameInput = modalEditProfileForm.querySelector('#form__input-name');
export const professionInput = modalEditProfileForm.querySelector('#form__input-profession');
export const placeTitleInput = modalAddCardForm.querySelector('#form__input-place-title');
export const placeLinkInput = modalAddCardForm.querySelector('#form__input-place-link');

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
  inputErrorClass: 'form__input-error',
  errorClass: 'form__input-error_active',
};

export const cardTemplateSelector = '.card-template';
