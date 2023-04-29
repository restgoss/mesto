const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    disabledButtonClass: 'popup__button_disabled',
    errorClass: 'popup__error_active',
};

const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));

const showInputError = (formElement, inputElement, errorMessage, settings) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
};

const hideInputError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, settings) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, settings);
        isValidForm(formElement, settings);
    } else {
        hideInputError(formElement, inputElement, settings);
        isValidForm(formElement, settings);
    }
};

const isValidForm = (formElement, settings) => {
    const elementButton = formElement.querySelector(settings.submitButtonSelector);
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    if (inputList.every((inputElement) => inputElement.validity.valid)) {
        elementButton.classList.remove(settings.disabledButtonClass);
        elementButton.removeAttribute('disabled', true);
    } else {
        elementButton.classList.add(settings.disabledButtonClass);
        elementButton.setAttribute('disabled', true);
    };
};

const setEventListeners = (formElement, settings) => {
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, settings);
        });
    });
};

const enableValidation = (settings) => {
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
        setEventListeners(formElement, settings);
    });
};

enableValidation(validationSettings);