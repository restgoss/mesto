export default class Popup {
    constructor(popup) {
        this._popup = popup;
        this._handleEscClose = this._handleEscClose.bind(this);
        this.closePopup = this.closePopup.bind(this);
    }

    openPopup() {
        this._popup.classList.add('popup_active');
        document.addEventListener('keydown', this._handleEscClose);
    }

    closePopup() {
        this._popup.classList.remove('popup_active');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this.closePopup();
        }
    }

    setEventListeners() {
        this._popup.querySelector('.popup__close-button').addEventListener('click', this.closePopup);
        this._popup.addEventListener('mousedown', (event) => {
            if (event.target.classList.contains('popup_active')) {
                this.closePopup();
            }
        })
    }
}