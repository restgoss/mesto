import { initialCards } from './data.js';
const addCardModalWindow = document.querySelector('.popup_form_add');
const editProfileModalWindow = document.querySelector('.popup_form_edit');
const currentName = document.querySelector('.profile__name');
const currentDescription = document.querySelector('.profile__description');
const editProfileButton = document.querySelector('.profile__edit-btn');
const addCardButton = document.querySelector('.profile__plus-btn');
const imagePopup = document.querySelector('.image-popup');
const imagePopupCloseButton = imagePopup.querySelector('.image-popup__button');
const cardsSection = document.querySelector('.cards');
const addCardForm = addCardModalWindow.querySelector('.popup__form');
const imageDescriptionSelector = imagePopup.querySelector('.image-popup__description');
const cardImageSelector = imagePopup.querySelector('.image-popup__image');
const userNameInput = editProfileModalWindow.querySelector('#userName');
const userDescriptionInput = editProfileModalWindow.querySelector('#userDescription');
const newCardTitle = addCardModalWindow.querySelector('#cardTitle');
const newCardLink = addCardModalWindow.querySelector('#cardLink');


function closeActivePopupOnEscape(event) {
    if (event.key === 'Escape') {
        const activePopup = document.querySelector('.popup_active');
        if (activePopup) {
            closeModalWindow(activePopup);
        }
    }
}

function openModalWindow(popup) {
    popup.classList.add('popup_active');
    document.addEventListener('keydown', closeActivePopupOnEscape);
}

function closeModalWindow(popup) {
    popup.classList.remove('popup_active');
    document.removeEventListener('keydown', closeActivePopupOnEscape);
}


function closePopupOnOverlayClick(event) {
    if (event.target.classList.contains('popup') || event.target.classList.contains('image-popup')) {
        closeModalWindow(event.target);
    }
}


editProfileButton.addEventListener('click', function () {
    openModalWindow(editProfileModalWindow);
    userNameInput.value = currentName.textContent;
    userDescriptionInput.value = currentDescription.textContent;
});

addCardButton.addEventListener('click', function () {
    openModalWindow(addCardModalWindow);
});

editProfileModalWindow.querySelector('.popup__close-button').addEventListener('click', function () {
    closeModalWindow(editProfileModalWindow);
});

addCardModalWindow.querySelector('.popup__close-button').addEventListener('click', function () {
    closeModalWindow(addCardModalWindow);
});

imagePopupCloseButton.addEventListener('click', function () {
    closeModalWindow(imagePopup);
});

addCardModalWindow.addEventListener('submit', function (event) {
    event.preventDefault();
    const cardData = {
        name: newCardTitle.value,
        link: newCardLink.value
    };
    const card = new Card(cardData, '#card__template');
    const cardElement = card.generateCard();
    cardsSection.prepend(cardElement);
    closeModalWindow(addCardModalWindow);
    addCardForm.reset();
})

editProfileModalWindow.addEventListener('submit', function (event) {
    event.preventDefault();
    currentName.textContent = userNameInput.value;
    currentDescription.textContent = userDescriptionInput.value;
    closeModalWindow(editProfileModalWindow);
})

document.addEventListener('keydown', closeActivePopupOnEscape);

addCardModalWindow.addEventListener('mousedown', closePopupOnOverlayClick);

editProfileModalWindow.addEventListener('mousedown', closePopupOnOverlayClick);

imagePopup.addEventListener('mousedown', closePopupOnOverlayClick);



class Card {
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

const renderElements = () => {
    initialCards.forEach((item) => {
        const card = new Card(item, '#card__template');
        const cardElement = card.generateCard();
        cardsSection.append(cardElement);
    });
};

renderElements();
