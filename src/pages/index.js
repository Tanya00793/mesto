import "./index.css"

import { Section } from '../scripts/components/Section';
import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { ModalWithImage } from '../scripts/components/ModalWithImage.js';
import { ModalWithForm } from '../scripts/components/ModalWithForm.js';
import { ModalWithConfirm } from '../scripts/components/ModalWithConfirm.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { Api } from '../scripts/components/Api.js';

import {
  avatarElement,
  modalEditProfileForm,
  modalEditProfileOpenBtn,
  modalEditAvatarForm,
  modalEditAvatarOpenBtn,
  modalAddCardForm,
  modalAddCardOpenBtn,
  nameInput,
  professionInput,
  dataForCardsTemplate,
  vConfig,
  cardTemplateSelector
} from '../scripts/utils/constants.js';

//---------------------------------------------------------------

const api = new Api ({
  address: 'https://mesto.nomoreparties.co/v1',
  token: 'c846985c-30b9-4d91-bdf7-4d0b3c99bbf7',
  cohortId: 'cohort-24',
})

let user = null;

const userInfo = new UserInfo('.profile__name', '.profile__profession', '.profile__avatar');

Promise.all([
  api.getUserInfo(),
  api.getInitialCards()
]).then(([userData, cards]) => {
  user = userData.data,
  setInitialUserData(userData),
  renderInitialCards (cards)
})

function setInitialUserData(userData) {
  userInfo.setUserInfo({
    name: userData.name,
    about: userData.about,
    avatar: userData.avatar,
    id: userData._id
  });
  avatarElement.setAttribute('style', `background-image: url('${userData.avatar}')`)
}

function renderInitialCards (cards) {
  photoGridSection.renderItems(cards);
}

function createCard (cardData) {
  const user = userInfo.getUserId();
  const card = new Card (
    cardData,
    user,
    cardTemplateSelector,
    cardImageClickHandler,
    cardDeleteButtonClickHandler,
    {handleLikeClick: (card => {
      if (card.classList.contains('card__like-button_active')) {
          api.cancelLikeCard(card.id).then(result => {
              card.querySelector('.card__like-button')
                .classList.add('card__like-button_active');
              card.querySelector('.card__likes')
                .textContent = result.likes.length;
        })
      } else {
        api.cancelLikeCard(card.id).then(result => {
            card.querySelector('.card__like-button')
              .classList.add('card__like-button_active');
            card.querySelector('.card__likes')
              .textContent = result.likes.length;
      })
     }
    })}
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

const modalProfileEditSubmitHandler = (inputsData) => {
  api.updateUserInfo({
    name: inputsData.nameInput, 
    about: inputsData.professionInput
  }).then((inputsDataUpdated) => {
    userInfo.setUserInfo(inputsDataUpdated);
  })
}

const modalAvatarEditSubmitHandler = (inputData) => {
api.updateAvatar({
        avatar: inputData.link
      }).then(Response => {
          setInitialUserData(Response);
    })
}

function cardDeleteButtonClickHandler(card) {
  modalWithDeleteCardConfirmationForm.openModal(card)
}

function cardImageClickHandler (title, link) {
  modalWithImage.openModal(title, link);
}

function modalAddCardSubmitHandler (inputsData) {
  api.addNewCard(inputsData).then((card) => {
    const newCard = createCard(card);
    photoGridSection.addItem(newCard);
  })
}

const modalWithImage = new ModalWithImage('.modal-preview-card');
modalWithImage.setEventListeners();

const validationEditProfile = new FormValidator(vConfig, modalEditProfileForm);
validationEditProfile.enableValidation();

const validationEditAvatar = new FormValidator(vConfig, modalEditAvatarForm);
validationEditAvatar.enableValidation();

const validationAddCard = new FormValidator(vConfig, modalAddCardForm);
validationAddCard.enableValidation();

const modalWithAddCardForm = new ModalWithForm ('.modal-add-card', 
modalAddCardSubmitHandler);
modalWithAddCardForm.setEventListeners();

const modalWithEditProfileForm = new ModalWithForm ('.modal-edit-profile', 
modalProfileEditSubmitHandler);
modalWithEditProfileForm.setEventListeners();

const modalWithEditAvatarForm = new ModalWithForm ('.modal-edit-avatar', 
modalAvatarEditSubmitHandler);
modalWithEditAvatarForm.setEventListeners();

const modalWithDeleteCardConfirmationForm = new ModalWithConfirm ('.modal-delete-card', 
{
  submitHandler: () => {
    const card = modalWithDeleteCardConfirmationForm.getId();
    api.deleteCard (card.id)
    .then(() => card.remove())
    .catch(e => console.log('Ошибка при удалении'))
  }
});
modalWithDeleteCardConfirmationForm.setEventListeners();


//---------------------------------------------------------------

modalEditProfileOpenBtn.addEventListener('click', () => {
  modalWithEditProfileForm.openModal();
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  professionInput.value = data.profession;
})

modalEditAvatarOpenBtn.addEventListener('click', () => {
  modalWithEditAvatarForm.openModal();
})

modalAddCardOpenBtn.addEventListener('click', () => {
  modalWithAddCardForm.openModal();
})