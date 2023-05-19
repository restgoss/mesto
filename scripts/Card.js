import { closeActivePopupOnEscape, openModalWindow, closeModalWindow } from "./index.js";

const imagePopup = document.querySelector('.popup_image-view');
const imageDescriptionSelector = imagePopup.querySelector('.popup__description');
const cardImageSelector = imagePopup.querySelector('.popup__image');

export class Card {
    constructor(cardData, cardTemplate) {
        this._cardTemplate = cardTemplate;
        this._title = cardData.name;
        this._image = cardData.link;
    }

    _getTemplate() {
        const cardTemplate = document
            .querySelector(this._cardTemplate)
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardTemplate;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.element__image');
        this._likeButton = this._element.querySelector('.element__button');
        this._setEventListeners();
        this._cardImage.src = this._image;
        this._cardImage.alt = this._title;
        this._element.querySelector('.element__title').textContent = this._title;
        return this._element;
    }

    _handleOpenImagePopup() {
        cardImageSelector.src = this._image;
        cardImageSelector.alt = this._title;
        imageDescriptionSelector.textContent = this._title;
        openModalWindow(imagePopup);
    }

    _handleCloseImagePopup() {
        cardImageSelector.src = '';
        imageDescriptionSelector.textContent = '';
        closeModalWindow(imagePopup);
    }

    _handleLikeClick() {
        this._likeButton.classList.toggle('element__button_active');
    }

    _setEventListeners() {
        const deleteButton = this._element.querySelector('.element__delete-btn');
        this._cardImage.addEventListener('click', () => {
            this._handleOpenImagePopup();
        });

        this._likeButton.addEventListener('click', () => this._handleLikeClick());
        deleteButton.addEventListener('click', () => {
            this._element.remove();
            this.element = null;
        });
    }
}
