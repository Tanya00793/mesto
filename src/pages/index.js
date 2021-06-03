import "./index.css"

import { Section } from '../scripts/components/Section';
import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { PopupWithConfirm } from '../scripts/components/PopupWithConfirm.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { Api } from '../scripts/components/Api.js';

import {
  popupEditProfileForm,
  popupEditProfileOpenBtn,
  popupEditAvatarForm,
  popupEditAvatarOpenBtn,
  popupAddCardForm,
  popupAddCardOpenBtn,
  nameInput,
  professionInput,
  dataForCardsTemplate,
  vConfig,
  cardTemplateSelector,
} from '../scripts/utils/constants.js';

let user;

//---------------------------------------------------------------

const api = new Api ({
  address: 'https://mesto.nomoreparties.co/v1',
  token: 'c846985c-30b9-4d91-bdf7-4d0b3c99bbf7',
  cohortId: 'cohort-24',
})

const userInfo = new UserInfo('.profile__name', '.profile__profession', '.profile__avatar');

Promise.all([
  api.getUserInfo(),
  api.getInitialCards()
])
.then(([userData, cards]) => {
  user = userData._id,
  setInitialUserData(userData),
  renderInitialCards (cards)
})
.catch(console.error);

function setInitialUserData(userData) {
  userInfo.setUserInfo({
    name: userData.name,
    about: userData.about,
    avatar: userData.avatar,
    id: userData._id
  });
}

function createCard (cardData) {
  const user = userInfo.getUserId();
  const card = new Card (
    cardData,
    user,
    cardTemplateSelector,
    cardImageClickHandler,
    deleteCardClickHandler,
    likeClickHandler
  )
  return card.renderCard();
}

const photoGridSection = new Section({
  items: dataForCardsTemplate,
  renderer: data => {
    const card = createCard(data);
    photoGridSection.addItem(card);
  }
},'.photo-grid');

function renderInitialCards (cards) {
  photoGridSection.renderItems(cards);
}

function deleteCardClickHandler(card) {
  popupWithConfirmationForm.openPopup(card)
}

function cardImageClickHandler (title, link) {
  popupWithImage.openPopup(title, link);
}

function likeClickHandler (card) {
  api.likeCard(card.getId(), card.getIsLiked())
    .then(response => { card.updateLikes(response.likes) })
}

const editProfileSubmitHandler = (inputsData) => {
  api.updateUserInfo({
    name: inputsData.nameInput, 
    about: inputsData.professionInput
  })
  .then((inputsDataUpdated) => {
    userInfo.setUserInfo(inputsDataUpdated);
    popupWithEditProfileForm.closePopup();
  })
  .catch(console.error);
}

const editAvatarSubmitHandler = (inputData) => {
  api.updateAvatar({ avatar: inputData.link })
  .then(Response => {
    setInitialUserData(Response);
    popupWithEditAvatarForm.closePopup();
  })
  .catch(console.error);
}

function addCardSubmitHandler (inputsData) {
  api.addNewCard(inputsData)
  .then((card) => {
    const newCard = createCard(card);
    photoGridSection.addItem(newCard);
    popupWithAddCardForm.closePopup();
  })
  .catch(console.error);
}

function confirmDeletingSubmitHandler () {
  const card = popupWithDeleteCardConfirmationForm.getId();
  api.deleteCard (card.id)
  .then(() => {
    card.remove();
    popupWithDeleteCardConfirmationForm.closePopup();
  })
  .catch(console.error);
}

const validationEditProfile = new FormValidator(vConfig, popupEditProfileForm);
validationEditProfile.enableValidation();

const validationEditAvatar = new FormValidator(vConfig, popupEditAvatarForm);
validationEditAvatar.enableValidation();

const validationAddCard = new FormValidator(vConfig, popupAddCardForm);
validationAddCard.enableValidation();

const popupWithImage = new PopupWithImage('.popup-preview-card');
popupWithImage.setEventListeners();

const popupWithEditProfileForm = new PopupWithForm ('.popup-edit-profile', 
editProfileSubmitHandler);
popupWithEditProfileForm.setEventListeners();

const popupWithEditAvatarForm = new PopupWithForm ('.popup-edit-avatar', 
editAvatarSubmitHandler);
popupWithEditAvatarForm.setEventListeners();

const popupWithAddCardForm = new PopupWithForm ('.popup-add-card', 
addCardSubmitHandler);
popupWithAddCardForm.setEventListeners();

const popupWithConfirmationForm = new PopupWithConfirm ('.popup-delete-card', 
confirmDeletingSubmitHandler);
popupWithConfirmationForm.setEventListeners();

popupEditProfileOpenBtn.addEventListener('click', () => {
  popupWithEditProfileForm.openPopup();
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  professionInput.value = data.profession;
})

popupEditAvatarOpenBtn.addEventListener('click', () => {
  popupWithEditAvatarForm.openPopup();
})

popupAddCardOpenBtn.addEventListener('click', () => {
  popupWithAddCardForm.openPopup();
})