const showInputError = (inputElement, validationConfig, errorMessage) => {
  const formSectionElement = inputElement.closest('.form__section')
  const errorElement = formSectionElement.querySelector(validationConfig.inputErrorClass);

  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

const hideInputError = (inputElement, validationConfig) => {
  const formSectionElement = inputElement.closest('.form__section')
  const errorElement = formSectionElement.querySelector(validationConfig.inputErrorClass);

  errorElement.textContent = '';
  errorElement.classList.remove(validationConfig.errorClass);
};

const checkInputValidity = (formElement, inputElement, validationConfig) => {
  const isInputNotValid = !inputElement.validity.valid;

  if (isInputNotValid) {
    const errorMessage = inputElement.validationMessage;

    showInputError(inputElement, validationConfig, errorMessage,);
  } else {
    hideInputError(inputElement, validationConfig);
  }
};

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  const findAtLeastOneNotValid = (inputElement) => !inputElement.validity.valid;
  const hasNotValidInput = inputList.some(findAtLeastOneNotValid);

  if (hasNotValidInput) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add('.form__submit-button_disabled');
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove('.form__submit-button_disabled');
  }
};

const setEventListeners = (formElement, validationConfig) => {
  const handleFormSubmit = (event) => {
    event.preventDefault();
  };
  formElement.addEventListener('submit', handleFormSubmit);

  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  const inputListIterator = (inputElement) => {
    const handleInput = () => {
      checkInputValidity(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    };

    inputElement.addEventListener('input', handleInput);
  };

  inputList.forEach(inputListIterator);

  toggleButtonState(inputList, buttonElement, validationConfig);
};

const enableValidation = (validationConfig) => {
  const formElements = document.querySelectorAll(validationConfig.formSelector);
  const formList = Array.from(formElements);

  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
};

enableValidation(vConfig);