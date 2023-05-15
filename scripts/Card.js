export const imagePopup = document.querySelector('.image-popup');
export const imagePopupCloseButton = imagePopup.querySelector('.image-popup__button');
const imageDescriptionSelector = imagePopup.querySelector('.image-popup__description');
const cardImageSelector = imagePopup.querySelector('.image-popup__image');


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
            .cloneNode(true);

        return cardTemplate;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.element__image').src = this._image;
        this._element.querySelector('.element__title').textContent = this._title;
        return this._element;
    }

    _handleOpenImagePopup() {
        cardImageSelector.src = this._image;
        imageDescriptionSelector.textContent = this._title;
        imagePopup.classList.add('popup_active');
    }

    _handleCloseImagePopup() {
        cardImageSelector.src = '';
        imageDescriptionSelector.textContent = '';
        imagePopup.classList.remove('popup_active');
    }

    _setEventListeners() {
        const likeButton = this._element.querySelector('.element__button');
        const elementImage = this._element.querySelector('.element__image');
        const deleteButton = this._element.querySelector('.element__delete-btn');
        elementImage.addEventListener('click', () => {
            this._handleOpenImagePopup();
        })

        likeButton.addEventListener('click', () => {
            likeButton.classList.toggle('element__button_active');
        })

        deleteButton.addEventListener('click', () => {
            deleteButton.parentNode.remove();
        })
    }
}


