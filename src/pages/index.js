import "./index.css"

import { PhotoGridSection } from '../scripts/components/PhotoGridSection';
import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { ModalWithImage } from '../scripts/components/ModalWithImage.js';
import { ModalWithForm } from '../scripts/components/ModalWithForm.js';
import { UserInfo } from '../scripts/components/UserInfo.js';

import { 
  modalEditProfile,
  modalAddCard,
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

const photoGridSection = new PhotoGridSection({
  items: dataForCardsTemplate,
  renderer: cardData => {
    const card = new Card(cardData, cardTemplateSelector, cardImageClickHandler);
    return card.renderCard();
  }
},'.photo-grid');

photoGridSection.renderCard();

const validationEditProfile = new FormValidator(vConfig, modalEditProfileForm);
validationEditProfile.enableValidation();

const validationAddCard = new FormValidator(vConfig, modalAddCardForm);
validationAddCard.enableValidation();

const buttonDisabled = (modal, button) => {
  const btn = modal.querySelector('.form__submit-button');
  btn.classList.add('form__submit-button_disabled');
  btn.setAttribute('disabled', true);
}

const modalProfileEditSubmitHandler = (e, name, professiom) => {
	e.preventDefault(); 
  userInfo.setUserInfo(nameInput.value, professionInput.value);
}

const modalWithImage = new ModalWithImage('.modal-preview-card');
modalWithImage.setEventListeners();

function cardImageClickHandler (title, link) {
  modalWithImage.openModal(title, link);
}

const modalAddCardSubmitHandler = e => {
	e.preventDefault();
  const card = new Card ({
    name: placeTitleInput.value,
    link: placeLinkInput.value,
  }, cardTemplateSelector, cardImageClickHandler);
  photoGridSection.addCardItem(card.renderCard())
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
  buttonDisabled(modalEditProfile);
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  professionInput.value = data.profession;
})

modalAddCardOpenBtn.addEventListener('click', () => {
  modalWithAddCardForm.openModal();
  modalAddCardForm.reset();
  buttonDisabled(modalAddCard);
})