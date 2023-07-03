import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
    constructor(popupSelector, handleSubmit) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
        this._form = this._popup.querySelector(".popup__form");
    }

    openPopup(card) {
        this._card = card;
        super.openPopup();
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleSubmit(this._card);
        });
    }
}

    