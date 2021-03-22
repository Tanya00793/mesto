const popup = document.querySelector('.popup');
const openPopupBtn = document.querySelector('#open_popup_btn');
const closePopupBtn = document.querySelector('.popup__close-button');
const popupSubmitBtn = document.querySelector('.popup__submit-button');
const popupOverlay = document.querySelector('.popup__overlay');

const popupTitle = document.querySelector('.popup__title');
const popupText = document.querySelector('.popup__text');

function openPopup (title, text) {
  popupTitle.textContent = title;
  popupText.textContent = text;
  popup.classList.add('popup_opened');
}

function closePopup () {
  popup.classList.remove('popup_opened');
}

openPopupBtn.addEventListener('click', function(Event) {
  openPopup(popupTitle.textContent, popupText.textContent);
});

closePopupBtn.addEventListener('click', function() {
  closePopup();
});

popupOverlay.addEventListener('click', function() {
  closePopup();
});

popupSubmitBtn.addEventListener('click', function() {
  closePopup();
});

//---------------------------------------------------------------

// Находим форму в DOM
let formElement = document.querySelector('.popup__form');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
	evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
												// Так мы можем определить свою логику отправки.
												// О том, как это делать, расскажем позже.

	// Находим поля формы в DOM

	let nameInput = formElement.querySelector('#nameInput');
	let jobInput = formElement.querySelector('#jobInput');

	// Получаем значение полей из свойства value

  let newProfileName = nameInput.value;
  let newSubText = jobInput.value;
  
	// Выбераем элементы, куда должны быть вставлены значения полей

  let profileName = document.querySelector('.profile__name');
  let subText = document.querySelector('.profile__subtext');

  // Вставьте новые значения с помощью textContent
  
  profileName.textContent = newProfileName;
  subText.textContent = newSubText;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);