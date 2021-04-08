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


//---------------------------------------------------------------


function initialCard(titleValue, linkValue) {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.card__title').textContent = titleValue;
  card.querySelector('.card__image').src = linkValue;
  card.querySelector('.card__title').alt = titleValue;
  const cardPreviewImage = card.querySelector('.card__image');
  cardPreviewImage.addEventListener('click', function(){
    openModal(modalPreviewCard);
    const modalPreviewCardImage = document.querySelector('.modal-preview-card__image');
    modalPreviewCardImage.src = cardReviewImage.src; 
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
};

function closeModal (modal) {
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

modalEditProfileOpenBtn.addEventListener('click', ()=> {
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
  openModal(modalEditProfile);
});
modalEditProfileCloseBtn.addEventListener('click', () => closeModal(modalEditProfile));
modalEditProfileForm.addEventListener('submit', modalProfileEditSubmitHandler);

modalAddCardOpenBtn.addEventListener('click', () => openModal(modalAddCard));
modalAddCardCloseBtn.addEventListener('click', () => closeModal(modalAddCard));
modalAddCardForm.addEventListener('submit', modalAddCardSubmitHandler);

modalPeviewCardCloseBtn.addEventListener('click', () => closeModal(modalPreviewCard));