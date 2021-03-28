const popup = document.querySelector('.popup');
const openPopupBtn = document.querySelector('.profile__edit-button');
const closePopupBtn = document.querySelector('.popup__close-button');

// Находим форму в DOM
const formElement = document.forms['editProfileForm'];

// Находим поля формы в DOM

const nameInput = formElement.querySelector('#nameInput');
const professionInput = formElement.querySelector('#professionInput');
  
// Выбераем элементы, куда должны быть вставлены значения полей

const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');


//---------------------------------------------------------------

function openPopup () {
  
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
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

  // Вставьте новые значения с помощью textContent
  
  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;
  closePopup();
}


openPopupBtn.addEventListener('click', function(Event) {
  openPopup();
});

closePopupBtn.addEventListener('click', closePopup);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);