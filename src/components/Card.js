export class Card {
    constructor(data, cardTemplate, handleCardClick, like, dislike, deleteCard) {
        this._title = data.name;
        this._image = data.link;
        this._cardTemplate = cardTemplate;
        this._handleCardClick = handleCardClick;
        this._id = data.id;
        this._likes = data.likes;
        this._userId = data.userId;
        this._ownerId = data.ownerId;
        this._deleteCard = deleteCard;
        this._like = like;
        this._dislike = dislike;
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
        this._cardImage.src = this._image;
        this._cardImage.alt = this._title;
        this._cardTitle = this._element.querySelector('.element__title');
        this._cardTitle.textContent = this._title;
        this._likeButton = this._element.querySelector('.element__button');
        this._likeCounter = this._element.querySelector('.element__like-counter');
        this._likeCounter.textContent = `${this._likes.length}`;
        this._deleteButton = this._element.querySelector('.element__delete-btn');
        this._setEventListeners();
        this._isLiked();
        this.isOwner();
        return this._element;
    }

    _handleLikeClick() {
        this._likeButton.classList.toggle('element__button_active');
    }

    _handleDeleteCard() {
        this._element.remove();
        this._element = null;
    }

    like() {
        this._likeButton.classList.add('element__button_active');
    }

    dislike() {
        this._likeButton.classList.remove('element__button_active');
    }

    _setEventListeners() {
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._title, this._image);
        });
        this._deleteButton.addEventListener('click', () => {
            this._deleteCard(this._id);
        });
        this._likeButton.addEventListener('click', () => {
            if (this._likeButton.classList.contains('element__button_active')) {
                this._dislike();
            } else {
                this._like();
            }
        })
    }

    isOwner() {
        if (this._userId !== this._ownerId) {
            this._deleteButton.remove();
            this._deleteButton = null;
        }
    }

    _isLiked() {
        this._likes.forEach((user) => {
            if(user._id === this._userId) {
                this.like();
            } else {
                this.dislike();
            }
        })
    }

    setLikeCount(res) {
        this._likeCounter.textContent = `${res.likes.length}`;
    }
}
