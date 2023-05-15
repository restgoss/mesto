export class FormValidator {
    constructor(settings) {
      this.formSelector = settings.formSelector;
      this.inputSelector = settings.inputSelector;
      this.submitButtonSelector = settings.submitButtonSelector;
      this.disabledButtonClass = settings.disabledButtonClass;
      this.errorClass = settings.errorClass;
  
      this.formList = Array.from(document.querySelectorAll(this.formSelector));
    }
  
    showInputError(formElement, inputElement, errorMessage) {
      const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this.errorClass);
    }
  
    hideInputError(formElement, inputElement) {
      const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
      errorElement.classList.remove(this.errorClass);
      errorElement.textContent = '';
    }
  
    checkInputValidity(formElement, inputElement) {
      if (!inputElement.validity.valid) {
        this.showInputError(formElement, inputElement, inputElement.validationMessage);
        this.isValidForm(formElement);
      } else {
        this.hideInputError(formElement, inputElement);
        this.isValidForm(formElement);
      }
    }
  
    isValidForm(formElement) {
      const elementButton = formElement.querySelector(this.submitButtonSelector);
      const inputList = Array.from(formElement.querySelectorAll(this.inputSelector));
  
      if (inputList.every((inputElement) => inputElement.validity.valid)) {
        elementButton.classList.remove(this.disabledButtonClass);
        elementButton.removeAttribute('disabled', true);
      } else {
        elementButton.classList.add(this.disabledButtonClass);
        elementButton.setAttribute('disabled', true);
      }
    }
  
    setEventListeners(formElement) {
      const inputList = Array.from(formElement.querySelectorAll(this.inputSelector));
  
      inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this.checkInputValidity(formElement, inputElement);
        });
      });
    }
  
    enableValidation() {
        this.formList.forEach((formElement) => {
          formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const elementButton = formElement.querySelector(this.submitButtonSelector);
            elementButton.classList.add(this.disabledButtonClass);
            elementButton.setAttribute('disabled', true);
          });
    
          this.setEventListeners(formElement);
        });
      }
    }
    
    export const validationSettings = {
      formSelector: '.popup__form',
      inputSelector: '.popup__input',
      submitButtonSelector: '.popup__button',
      disabledButtonClass: 'popup__button_disabled',
      errorClass: 'popup__error_active',
    };
    
   
  