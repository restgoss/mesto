export const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  disabledButtonClass: 'popup__button_disabled',
  errorClass: 'popup__error_active',
};

export class FormValidator {
  constructor(formElement, settings) {
    this._formElement = formElement;
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButton = formElement.querySelector(settings.submitButtonSelector);
    this._disabledButtonClass = settings.disabledButtonClass;
    this._errorClass = settings.errorClass;
  }

  _enableButton() {
    this._submitButton.classList.remove(this._disabledButtonClass);
    this._submitButton.removeAttribute('disabled');
  }

  _disableButton() {
    this._submitButton.classList.add(this._disabledButtonClass);
    this._submitButton.setAttribute('disabled', true);
  }


  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
      this._isValidForm(formElement);
    }
  }

  _isValidForm(formElement) {
    const inputElements = Array.from(formElement.querySelectorAll(this._inputSelector));
    if (inputElements.every((inputElement) => inputElement.validity.valid)) {
      this._enableButton();
    } else {
      this._disableButton();
    }
  }

  _setEventListeners(formElement) {
    const inputElements = Array.from(formElement.querySelectorAll(this._inputSelector));
    inputElements.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValidForm(formElement);
        this._checkInputValidity(formElement, inputElement);
      });
    });
  }

  enableValidation() {
    const formElements = Array.from(document.querySelectorAll(this._formSelector));
    formElements.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._submitButton.classList.add(this._disabledButtonClass);
        this._submitButton.setAttribute('disabled', true);
      });

      this._setEventListeners(formElement);
    });
  }

 

}

