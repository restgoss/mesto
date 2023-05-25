import { openModalWindow } from "./index.js";

const imagePopup = document.querySelector('.popup_image-view');
const imageDescription = imagePopup.querySelector('.popup__description');
const cardImage = imagePopup.querySelector('.popup__image');

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
        this._deleteButton = this._element.querySelector('.element__delete-btn')
        this._setEventListeners();
        this._cardImage.src = this._image;
        this._cardImage.alt = this._title;
        this._element.querySelector('.element__title').textContent = this._title;
        return this._element;
    }

    _handleOpenImagePopup() {
        cardImage.src = this._image;
        cardImage.alt = this._title;
        imageDescription.textContent = this._title;
        openModalWindow(imagePopup);
    }

    _handleLikeClick() {
        this._likeButton.classList.toggle('element__button_active');
    }

    _handleDeleteCard() {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {
        const deleteButton = this._element.querySelector('.element__delete-btn');
        this._cardImage.addEventListener('click', () => {
            this._handleOpenImagePopup();
        });

        this._likeButton.addEventListener('click', () => this._handleLikeClick());
        this._deleteButton.addEventListener('click', () => this._handleDeleteCard());
    }
}
