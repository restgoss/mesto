import { initialCards, validationSettings } from './data.js';
import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';

const cardAddModalWindow = document.querySelector('.popup_form_add');
const profileEditModalWindow = document.querySelector('.popup_form_edit');
const currentName = document.querySelector('.profile__name');
const currentDescription = document.querySelector('.profile__description');
const profileEditButton = document.querySelector('.profile__edit-btn');
const cardAddButton = document.querySelector('.profile__plus-btn');
const cardsSection = document.querySelector('.cards');
const cardAddForm = cardAddModalWindow.querySelector('.popup__form');
const profileEditForm = profileEditModalWindow.querySelector('.popup__form');
const userNameInput = profileEditModalWindow.querySelector('#userName');
const userDescriptionInput = profileEditModalWindow.querySelector('#userDescription');
const newCardTitle = cardAddModalWindow.querySelector('#cardTitle');
const newCardLink = cardAddModalWindow.querySelector('#cardLink');



const renderElements = (() => {
    initialCards.forEach((item) => {
        const card = createCard(item, '#card__template');
        const cardElement = card.generateCard();
        cardsSection.append(cardElement);
    });
})();

function createCard(cardData, cardTemplate) {
    return new Card(cardData, '#card__template');
}

export function openModalWindow(popup) {
    document.addEventListener('keydown', closeActivePopupOnEscape);
    popup.addEventListener('mousedown', () => closeActivePopupOnEscape(popup));
    popup.classList.add('popup_active');
}

export function closeModalWindow(popup) {
    document.removeEventListener('keydown', () => closePopupOnOverlayClick);
    popup.removeEventListener('mousedown', () => closeActivePopupOnEscape(popup));
    popup.classList.remove('popup_active');
}

function closePopupOnOverlayClick(event) {
    closeModalWindow(event.target);
}

export function closeActivePopupOnEscape(event) {
    if (event.key === 'Escape') {
        const activePopup = document.querySelector('.popup_active');
        closeModalWindow(activePopup);
    }
}

profileEditButton.addEventListener('click', function () {
    openModalWindow(profileEditModalWindow);
    userNameInput.value = currentName.textContent;
    userDescriptionInput.value = currentDescription.textContent;
});

cardAddButton.addEventListener('click', function () {
    openModalWindow(cardAddModalWindow);
});

cardAddModalWindow.addEventListener('submit', function (event) {
    event.preventDefault();
    const cardData = {
        name: newCardTitle.value,
        link: newCardLink.value
    };
    const card = createCard(cardData, '#card__template');
    const cardElement = card.generateCard();
    cardsSection.prepend(cardElement);
    closeModalWindow(cardAddModalWindow);
    cardAddForm.reset();
    cardAddValidator._disableButton();
})

profileEditModalWindow.addEventListener('submit', function (event) {
    event.preventDefault();
    currentName.textContent = userNameInput.value;
    currentDescription.textContent = userDescriptionInput.value;
    closeModalWindow(profileEditModalWindow);
    profileValidator._enableButton();
})


document.querySelectorAll('.popup__close-button').forEach((button) => {
    const buttonsPopup = button.closest('.popup');
    button.addEventListener('click', () => closeModalWindow(buttonsPopup));
});

document.querySelectorAll('.popup').forEach((overlay) => {
    overlay.addEventListener('mousedown', closePopupOnOverlayClick);
});

const profileValidator = new FormValidator(profileEditForm, validationSettings);
const cardAddValidator = new FormValidator(cardAddForm, validationSettings);

profileValidator.enableValidation(profileEditForm);
cardAddValidator.enableValidation(cardAddForm);
