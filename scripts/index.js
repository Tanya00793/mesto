const profile = document.querySelector('.profile');
const photoGrid = document.querySelector('.photo-grid');

const modal = document.querySelector('.modal');
const modalEditProfile = document.querySelector('.modal-edit-profile');
const modalAddCard = document.querySelector('.modal-add-card');
const modalPreviewCard = document.querySelector('.modal-preview-card');

const modalEditProfileForm = document.forms['modalEditProfileForm'];
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

const vConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: '.form__submit-button_disabled',
  inputErrorClass: '.form__input-error',
  errorClass: '.form__input-error_active',
};

//---------------------------------------------------------------


function initialCard(titleValue, linkValue) {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.card__title').textContent = titleValue;
  card.querySelector('.card__image').src = linkValue;
  card.querySelector('.card__image').alt = titleValue;
  const cardPreviewImage = card.querySelector('.card__image');
  cardPreviewImage.addEventListener('click', function(){
    openModal(modalPreviewCard);
    const modalPreviewCardImage = document.querySelector('.modal-preview-card__image');
    modalPreviewCardImage.src = cardPreviewImage.src; 
    const previewCardPlaceTitle = document.querySelector('.modal-preview-card__title');
    previewCardPlaceTitle.textContent = card.querySelector('.card__title').textContent;
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

function openModal (modal) {
  modal.classList.add('modal_opened');
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeModal(modal);
    };
  });
};

function buttonDisabled(modal) {
  const formSubmitBtn = modal.querySelector('.form__submit-button');
  formSubmitBtn.classList.add('form__submit-button_disabled');
  formSubmitBtn.setAttribute('disabled', true);
};

function closeModal(modal) {
  modal.classList.remove('modal_opened');
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
  photoGrid.prepend(initialCard(placeTitleInputValue, placeLinkInputValue));
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