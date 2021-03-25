const popup = document.querySelector('.popup');
const openPopupBtn = document.querySelector('.profile__edit-button');
const closePopupBtn = document.querySelector('.popup__close-button');

const popupTitle = document.querySelector('.popup__title');
const popupText = document.querySelector('.popup__text');
const popupTitleContent = popupTitle.textContent;
const popupTextContent = popupText.textContent;

// Находим форму в DOM
let formElement = document.forms['popupForm'];

// Находим поля формы в DOM

let nameInput = formElement.querySelector('#nameInput');
let professionInput = formElement.querySelector('#professionInput');
  
// Выбераем элементы, куда должны быть вставлены значения полей

let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession');


//---------------------------------------------------------------

function openPopup (title, text) {
  popupTitle.textContent = title;
  popupText.textContent = text;
  popup.classList.add('popup_opened');
}

function closePopup () {
  popup.classList.remove('popup_opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
	evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
												// Так мы можем определить свою логику отправки.
												// О том, как это делать, расскажем позже.

                        // Получаем значение полей из свойства value

  let newProfileName = nameInput.value;
  let newProfileProfession = professionInput.value;

  // Вставьте новые значения с помощью textContent
  
  profileName.textContent = newProfileName;
  profileProfession.textContent = newProfileProfession;
  closePopup();
}


openPopupBtn.addEventListener('click', function(Event) {
  openPopup(popupTextContent, popupTextContent);
});

closePopupBtn.addEventListener('click', closePopup);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);