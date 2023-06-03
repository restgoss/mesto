export class Card {
    constructor(cardData, cardTemplate, handleCardClick) {
        this._cardTemplate = cardTemplate;
        this._title = cardData.cardTitle;
        this._image = cardData.cardLink;
        this._handleCardClick = handleCardClick; 
        console.log(cardData);
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

    _handleLikeClick() {
        this._likeButton.classList.toggle('element__button_active');
    }

    _handleDeleteCard() {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._title, this._image);
        });

        this._likeButton.addEventListener('click', () => this._handleLikeClick());
        this._deleteButton.addEventListener('click', () => this._handleDeleteCard());
    }
}
