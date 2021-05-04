import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { openModal, closeModal } from './utils/utils.js';

const photoGrid = document.querySelector('.photo-grid');

const modals = document.querySelectorAll('.modal');
const modal = document.querySelector('.modal');
const modalEditProfile = document.querySelector('.modal-edit-profile');
const modalAddCard = document.querySelector('.modal-add-card');
const modalEditProfileForm = document.forms['modalEditProfileForm'];
const modalEditProfileOpenBtn = document.querySelector('.profile__edit-button');
const modalAddCardForm = document.forms['addCardForm'];
const modalAddCardOpenBtn = document.querySelector('.profile__add-card-button');

const nameInput = modalEditProfileForm.querySelector('#form__input-name');
const professionInput = modalEditProfileForm.querySelector('#form__input-profession');
const placeTitleInput = modalAddCardForm.querySelector('#form__input-place-title');
const placeLinkInput = modalAddCardForm.querySelector('#form__input-place-link');

const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

const dataForCardsTemplate = [
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

const vConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__input-error',
  errorClass: 'form__input-error_active',
};

//---------------------------------------------------------------

dataForCardsTemplate.forEach(function(item) {
  const name = item.name;
  const link = item.link;
  photoGrid.append(createCard({name, link}));
})

function createCard({name, link}) {
  const card = new Card({name, link}, '.card-template');
  return card.render();
}

const validationEditProfile = new FormValidator(vConfig, modalEditProfileForm);
validationEditProfile.enableValidation();

const validationAddCard = new FormValidator(vConfig, modalAddCardForm);
validationAddCard.enableValidation();

const buttonDisabled = (modal, button) => {
  const btn = modal.querySelector('.form__submit-button');
  btn.classList.add('form__submit-button_disabled');
  btn.setAttribute('disabled', true);
}

const modalProfileEditSubmitHandler = e => {
	e.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;
  closeModal(modalEditProfile);
  modalEditProfileForm.reset();
}

const modalAddCardSubmitHandler = e => {
	e.preventDefault();
  photoGrid.prepend(createCard({name:placeTitleInput.value, link:placeLinkInput.value}));
  closeModal(modalAddCard);
  modalAddCardForm.reset();
}

//---------------------------------------------------------------

modals.forEach((modal) => {
  modal.addEventListener('click', evt => {
    if (evt.target.classList.contains('modal_opened')) {
      closeModal(modal);
    }
    if (evt.target.classList.contains('modal__close-button')) {
      closeModal(modal);
    }
  })
})

modalEditProfileOpenBtn.addEventListener('click', () => {
  openModal(modalEditProfile);
  modalEditProfileForm.reset();
  buttonDisabled(modalEditProfile);
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
})
modalEditProfileForm.addEventListener('submit', modalProfileEditSubmitHandler);

modalAddCardOpenBtn.addEventListener('click', () => {
  openModal(modalAddCard);
  modalAddCardForm.reset();
  buttonDisabled(modalAddCard);
  placeTitleInput.value = '';
  placeLinkInput.value = '';
})
modalAddCardForm.addEventListener('submit', modalAddCardSubmitHandler);

modalEditProfileForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
})