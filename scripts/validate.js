const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = '';
  errorElement.classList.remove(validationConfig.errorClass);
};

const checkInputValidity = (formElement, inputElement, validationConfig) => {
  const isInputNotValid = !inputElement.validity.valid;

  if (isInputNotValid) {
    const errorMessage = inputElement.validationMessage;
    showInputError(formElement, inputElement, errorMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.every(inputElement => inputElement.validity.valid);
};

const toggleButtonState = (buttonElement, validationConfig, inputList) => {

  if (!hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
};

const setEventListeners = (formElement, validationConfig) => {
  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  formElement.addEventListener('submit', handleFormSubmit);
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  const formReset = () => {
      inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, validationConfig);
    });
    buttonDisabled(modal);
  }

  formElement.addEventListener('reset', formReset);

  const inputListIterator = (inputElement) => {
    const handleInput = () => {
      checkInputValidity(formElement, inputElement, validationConfig);
      toggleButtonState(buttonElement, validationConfig, inputList);
    };
    inputElement.addEventListener('input', handleInput);
  };

  inputList.forEach(inputListIterator);
  toggleButtonState(buttonElement, validationConfig, inputList);
};

const enableValidation = (validationConfig) => {
  const formElements = document.querySelectorAll(validationConfig.formSelector);
  const formList = Array.from(formElements);

  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
};

enableValidation(vConfig);