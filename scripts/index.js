const profile = document.querySelector('.profile');
const photoGrid = document.querySelector('.photo-grid');

const modals = document.querySelectorAll('.modal');
const modal = document.querySelector('.modal');
const modalEditProfile = document.querySelector('.modal-edit-profile');
const modalAddCard = document.querySelector('.modal-add-card');
const modalPreviewCard = document.querySelector('.modal-preview-card');
const modalEditProfileForm = document.forms['modalEditProfileForm'];
const modalPreviewCardImage = document.querySelector('.modal-preview-card__image');
const previewCardPlaceTitle = document.querySelector('.modal-preview-card__title');
const modalEditProfileOpenBtn = document.querySelector('.profile__edit-button');
const modalAddCardForm = document.forms['addCardForm'];
const modalAddCardOpenBtn = document.querySelector('.profile__add-card-button');

const cardTemplate = photoGrid.querySelector('.card-template').content.querySelector('.card');

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

function createCard(titleValue, linkValue) {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.card__title').textContent = titleValue;
  const cardPreviewImage = card.querySelector('.card__image');
  cardPreviewImage.src = linkValue;
  cardPreviewImage.alt = titleValue;
  cardPreviewImage.addEventListener('click', function(){
    openModal(modalPreviewCard);
    modalPreviewCardImage.src = linkValue;
    previewCardPlaceTitle.textContent = titleValue;
  });
  const cardLikeBtn = card.querySelector('.card__like-button');
  cardLikeBtn.addEventListener('click', function() {
    cardLikeBtn.classList.toggle('card__like-button_active');
  });
  const cardDeleteBtn = card.querySelector('.card__delete-button');
  cardDeleteBtn.addEventListener('click', function() {
    card.remove();
  });
  return(card);
};

const cardsArr = dataForCardsTemplate.forEach(function(item) {
  photoGrid.append(createCard(item.name, item.link));
});


const openModal = modal => {
  modal.classList.add('modal_opened');
  document.addEventListener('keydown', closeModalByEsc); 
};

const buttonDisabled = (modal, buttonElement) => {
  const btn = modal.querySelector('.form__submit-button');
  btn.classList.add('form__submit-button_disabled');
  btn.setAttribute('disabled', true);
};

function closeModal(modal) {
  modal.classList.remove('modal_opened');
  document.removeEventListener('keydown', closeModalByEsc); 
};

function closeModalByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedModal = document.querySelector('.modal_opened');
    closeModal(openedModal);
  };
};

const modalProfileEditSubmitHandler = e => {
	e.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;
  closeModal(modalEditProfile);
  modalEditProfileForm.reset();
};

const modalAddCardSubmitHandler = e => {
	e.preventDefault();
  const placeTitleInputValue = placeTitleInput.value;
  const placeLinkInputValue = placeLinkInput.value;
  photoGrid.prepend(createCard(placeTitleInputValue, placeLinkInputValue));
  closeModal(modalAddCard);
  modalAddCardForm.reset();
};

//---------------------------------------------------------------

modals.forEach((modal) => {
  modal.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('modal_opened')) {
      closeModal(modal);
    };
    if (evt.target.classList.contains('modal__close-button')) {
      closeModal(modal);
    };
  });
});
 





modalEditProfileOpenBtn.addEventListener('click', () => {
  openModal(modalEditProfile);
  modalEditProfileForm.reset();
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
});
modalEditProfileForm.addEventListener('submit', modalProfileEditSubmitHandler);

modalAddCardOpenBtn.addEventListener('click', () => {
  openModal(modalAddCard);
  modalAddCardForm.reset();
  buttonDisabled(modalAddCard);
  placeTitleInput.value = '';
  placeLinkInput.value = '';
});
modalAddCardForm.addEventListener('submit', modalAddCardSubmitHandler);

modalEditProfileForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
});