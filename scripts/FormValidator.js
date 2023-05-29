export class FormValidator {
  constructor(formElement, settings) {
    this._formElement = formElement;
    this._inputSelector = settings.inputSelector;
    this._submitButton = formElement.querySelector(settings.submitButtonSelector);
    this._disabledButtonClass = settings.disabledButtonClass;
    this._errorClass = settings.errorClass;
    this._inputElements = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  }

  enableButton() {
    this._submitButton.classList.remove(this._disabledButtonClass);
    this._submitButton.removeAttribute('disabled');
  }

  disableButton() {
    this._submitButton.classList.add(this._disabledButtonClass);
    this._submitButton.setAttribute('disabled', true);
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _isValidForm() {
    if (this._inputElements.every((inputElement) => inputElement.validity.valid)) {
      this.enableButton();
    } else {
      this.disableButton();
    }
  }

  _setEventListeners() {
    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._isValidForm();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
