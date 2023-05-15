import { initialCards } from './data.js';
import { FormValidator, validationSettings} from './FormValidator.js';
import { Card, imagePopup, imagePopupCloseButton } from './Card.js';

const addCardModalWindow = document.querySelector('.popup_form_add');
const editProfileModalWindow = document.querySelector('.popup_form_edit');
const currentName = document.querySelector('.profile__name');
const currentDescription = document.querySelector('.profile__description');
const editProfileButton = document.querySelector('.profile__edit-btn');
const addCardButton = document.querySelector('.profile__plus-btn');
const cardsSection = document.querySelector('.cards');
const addCardForm = addCardModalWindow.querySelector('.popup__form');
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

const renderElements = () => {
    initialCards.forEach((item) => {
        const card = new Card(item, '#card__template');
        const cardElement = card.generateCard();
        cardsSection.append(cardElement);
    });
};

renderElements();

const formValidator = new FormValidator(validationSettings);
formValidator.enableValidation();