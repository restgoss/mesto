import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popup, submitHandler) {
        super(popup);
        this._submitHandler = submitHandler;
        this._form = this._popup.querySelector('.popup__form');
        this._inputs = this._popup.querySelectorAll('.popup__input');
        this._submitButton = this._popup.querySelector('.popup__button');
        this._submitButtonText = this._submitButton.textContent;
    }

    _getInputValue() {
        this._inputValues = {};
        this._inputs.forEach(input => {
            if (input.id === 'name2' || input.id === 'name1') {
                return this._inputValues['name'] = input.value;
            } else {
                return this._inputValues[input.id] = input.value;
            }
        })
        return this._inputValues;
    }

    setInputValue(data) {
        this._inputs.forEach((item) => {
            if (item.id === 'name1') {
                item.value = data.name;
            } else {
                item.value = data[item.id];
            }
        })
    }

    renderLoading(isLoading, text) {
        if (isLoading) {
            this._submitButton.textContent = text;
        } else {
            this._submitButton.textContent = this._submitButtonText;
        }
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitHandler(this._getInputValue());
        })
    }

    closePopup() {
        super.closePopup();
        this._form.reset();
    }

}

