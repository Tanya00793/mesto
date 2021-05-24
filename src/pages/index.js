import "./index.css"

import { Section } from '../scripts/components/Section';
import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { ModalWithImage } from '../scripts/components/ModalWithImage.js';
import { ModalWithForm } from '../scripts/components/ModalWithForm.js';
import { UserInfo } from '../scripts/components/UserInfo.js';

import { 
  modalEditProfileForm,
  modalEditProfileOpenBtn,
  modalAddCardForm,
  modalAddCardOpenBtn,
  nameInput,
  professionInput,
  placeTitleInput,
  placeLinkInput,
  dataForCardsTemplate,
  vConfig,
  cardTemplateSelector
} from '../scripts/utils/constants.js';

//---------------------------------------------------------------

function createCard (cardData) {
  const card = new Card(cardData, cardTemplateSelector, cardImageClickHandler);
  return card.renderCard();
}

const photoGridSection = new Section({
  items: dataForCardsTemplate,
  renderer: data => {
    const card = createCard(data);
    photoGridSection.addItem(card);
  }
},'.photo-grid');

photoGridSection.renderItems();

const validationEditProfile = new FormValidator(vConfig, modalEditProfileForm);
validationEditProfile.enableValidation();

const validationAddCard = new FormValidator(vConfig, modalAddCardForm);
validationAddCard.enableValidation();

const modalProfileEditSubmitHandler = (name, profession) => {
  userInfo.setUserInfo(nameInput.value, professionInput.value);
}

const modalWithImage = new ModalWithImage('.modal-preview-card');
modalWithImage.setEventListeners();

function cardImageClickHandler (title, link) {
  modalWithImage.openModal(title, link);
}

function modalAddCardSubmitHandler (data) {
  const newCard = createCard(data);
  photoGridSection.addItem(newCard);
}

const modalWithAddCardForm = new ModalWithForm ('.modal-add-card', modalAddCardSubmitHandler);
modalWithAddCardForm.setEventListeners();

const modalWithEditProfileForm = new ModalWithForm ('.modal-edit-profile', modalProfileEditSubmitHandler);
modalWithEditProfileForm.setEventListeners();

const userInfo = new UserInfo('.profile__name', '.profile__profession');

//---------------------------------------------------------------

modalEditProfileOpenBtn.addEventListener('click', () => {
  modalWithEditProfileForm.openModal();
  modalEditProfileForm.reset();
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  professionInput.value = data.profession;
})

modalAddCardOpenBtn.addEventListener('click', () => {
  modalWithAddCardForm.openModal();
  modalAddCardForm.reset();
})