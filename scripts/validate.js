const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__error_active');
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.classList.remove('popup__error_active');
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
        isValidForm(formElement);
    } else {
        hideInputError(formElement, inputElement);
        isValidForm(formElement);
    }
};

const isValidForm = (formElement) => {
    const elementButton = formElement.querySelector('.popup__button');
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    if (inputList.every((inputElement) => inputElement.validity.valid)) {
        elementButton.classList.remove('popup__button_disabled');
        elementButton.removeAttribute('disabled', true);
    } else {
        elementButton.classList.add('popup__button_disabled');
        elementButton.setAttribute('disabled', true);
    };
};


const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
        });
    });
};

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
        setEventListeners(formElement);
    });
};

enableValidation();
