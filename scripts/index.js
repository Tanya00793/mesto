const profile = document.querySelector('.profile');
const photoGrid = document.querySelector('.photo-grid');

const modal = document.querySelector('.modal');
const modalEditProfile = document.querySelector('.modal-edit-profile');
const modalAddCard = document.querySelector('.modal-add-card');
const modalPreviewCard = document.querySelector('.modal-preview-card');
const modalEditProfileForm = document.forms['modalEditProfileForm'];
const modalPreviewCardImage = document.querySelector('.modal-preview-card__image');
const previewCardPlaceTitle = document.querySelector('.modal-preview-card__title');
const modalEditProfileOpenBtn = document.querySelector('.profile__edit-button');  
const modalEditProfileCloseBtn = document.querySelector('.modal-edit-profile__close-button');
const modalPeviewCardCloseBtn = document.querySelector('.modal-preview-card__close-button');

const modalAddCardForm = document.forms['addCardForm'];
const modalAddCardOpenBtn = document.querySelector('.profile__add-card-button');
const modalAddCardCloseBtn = document.querySelector('.modal-add-card__close-button');

const cardTemplate = photoGrid.querySelector('.card-template').content.querySelector('.card');

const nameInput = modalEditProfileForm.querySelector('#nameInput');
const professionInput = modalEditProfileForm.querySelector('#professionInput');
const placeTitleInput = modalAddCardForm.querySelector('#placeTitleInput');
const placeLinkInput = modalAddCardForm.querySelector('#placeLinkInput');

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
  inactiveButtonClass: '.form__submit-button_disabled',
  inputErrorClass: '.form__input-error',
  errorClass: '.form__input-error_active',
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

function openModal (modal) {
  modal.classList.add('modal_opened');
  document.addEventListener('keydown', closeModalByEsc); 
};

function buttonDisabled(modal) {
  const formSubmitBtn = modal.querySelector('.form__submit-button');
  formSubmitBtn.classList.add('form__submit-button_disabled');
  formSubmitBtn.setAttribute('disabled', true);
};

function closeModal(modal) {
  modal.classList.remove('modal_opened');
  document.removeEventListener('keydown', closeModalByEsc); 
};

function closeModalByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
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

modalEditProfileOpenBtn.addEventListener('click', () => {
  openModal(modalEditProfile);
  buttonDisabled(modal);
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
});
modalEditProfileCloseBtn.addEventListener('click', () => closeModal(modalEditProfile));
modalEditProfileForm.addEventListener('submit', modalProfileEditSubmitHandler);

modalAddCardOpenBtn.addEventListener('click', () => {
  openModal(modalAddCard);
  buttonDisabled(modalAddCard);
  modalAddCardForm.reset();
  placeTitleInput.value = "";
  placeLinkInput.value = "";
});
modalAddCardCloseBtn.addEventListener('click', () => closeModal(modalAddCard));
modalAddCardForm.addEventListener('submit', modalAddCardSubmitHandler);

modalPeviewCardCloseBtn.addEventListener('click', () => closeModal(modalPreviewCard));

modalEditProfileForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
});

modalEditProfile.addEventListener('click', (e) => {
  if (e.target === e.currentTarget) {
    closeModal(modalEditProfile);
  };
});

modalAddCard.addEventListener('click', (e) => {
  if (e.target === e.currentTarget) {
    closeModal(modalAddCard);
  };
});

modalPreviewCard.addEventListener('click', (e) => {
  if (e.target === e.currentTarget) {
    closeModal(modalPreviewCard);
  };
});