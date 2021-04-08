const initialCards = [
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

const profile = document.querySelector('.profile');
const photoGrid = document.querySelector('.photo-grid');

const editProfileModal = document.querySelector('.edit-profile-modal');
const addCardModal = document.querySelector('.add-card-modal');
const reviewCardModal = document.querySelector('.review-card-modal');

const editProfileModalForm = document.forms['editProfileModalForm'];
const openEditProfileModalBtn = document.querySelector('.profile__edit-button');
const submitEditProfileModalBtn = document.querySelector('.edit-profile-modal__submit-button');
const closeEditProfileModalBtn = document.querySelector('.edit-profile-modal__close-button');
const closeReviewCardModalBtn = document.querySelector('.review-card-modal__close-button');

const addCardModalForm = document.forms['addCardForm'];
const openAddCardModalBtn = document.querySelector('.profile__add-card-button');
const closeAddCardModalBtn = document.querySelector('.add-card-modal__close-button');

const cardsTemplate = photoGrid.querySelector('.cards-template').content.querySelector('.card');

const nameInput = editProfileModalForm.querySelector('#nameInput');
const professionInput = editProfileModalForm.querySelector('#professionInput');
const placeTitleInput = addCardModalForm.querySelector('#placeTitleInput');
const placeLinkInput = addCardModalForm.querySelector('#placeLinkInput');
const placeTitleCardReview = reviewCardModal.querySelector('#placeTitleReviewCard');

const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const cardTitle = document.querySelector('.card__title');
const cardImageLink = document.querySelector('.card__image');


//---------------------------------------------------------------


const cardsArr = initialCards.forEach(function(item) {
  photoGrid.append(initialCard(item.name, item.link));
});

function initialCard(titleValue, linkValue) {
  const cards = cardsTemplate.cloneNode(true);
  cards.querySelector('.card__title').textContent = titleValue;
  cards.querySelector('.card__image').src = linkValue;
  cards.querySelector('.card__title').alt = titleValue;
  const cardReviewImage = cards.querySelector('.card__image');
  cardReviewImage.addEventListener('click', function(){
    openReviewCardModal();
    const reviewCardModalImage = document.querySelector('.review-card-modal__image');
    reviewCardModalImage.src = cardReviewImage.src; 
    const reviewCardPlaceTitle = document.querySelector('.review-card-modal__title');
    reviewCardPlaceTitle.textContent = cards.querySelector('.card__title').textContent;
  });
  const likeCardBtn = cards.querySelector('.card__like-button');
  likeCardBtn.addEventListener('click', function() {
    likeCardBtn.style.backgroundImage = `url('images/__like-button-active.svg')`;
  });
  const deleteCardBtn = cards.querySelector('.card__delete-button');
  deleteCardBtn.addEventListener('click', function() {
    cards.remove();
  });
  return(cards);
};

function openEditProfileModal() {
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
  editProfileModal.classList.add('edit-profile-modal_opened');
};

function openAddCardModal () {
  addCardModal.classList.add('add-card-modal_opened');
};

function openReviewCardModal () {
  reviewCardModal.classList.add('review-card-modal_opened');
};

function closeEditProfileModal () {
  editProfileModal.classList.remove('edit-profile-modal_opened');
};

function closeAddCardModal () {
  addCardModal.classList.remove('add-card-modal_opened');
};

function closeReviewCardModal () {
  reviewCardModal.classList.remove('review-card-modal_opened');
};

const editProfileSubmitHandler = e => {
	e.preventDefault(); 
  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;
  closeEditProfileModal();
  editProfileModalForm.reset;
};

const addCardSubmitHandler = e => {
	e.preventDefault();
  const placeTitleInputValue = placeTitleInput.value;
  const placeLinkInputValue = placeLinkInput.value;
  photoGrid.prepend(initialCard(placeTitleInputValue, placeLinkInputValue));
  closeAddCardModal();
  addCardModalForm.reset;
};


//---------------------------------------------------------------


openEditProfileModalBtn.addEventListener('click', openEditProfileModal);
closeEditProfileModalBtn.addEventListener('click', closeEditProfileModal);
editProfileModalForm.addEventListener('submit', editProfileSubmitHandler);

openAddCardModalBtn.addEventListener('click', openAddCardModal);
closeAddCardModalBtn.addEventListener('click', closeAddCardModal);
addCardModalForm.addEventListener('submit', addCardSubmitHandler);

closeReviewCardModalBtn.addEventListener('click', closeReviewCardModal);