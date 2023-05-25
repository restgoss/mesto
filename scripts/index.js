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
        const cardRendered = createCard(item, '#card__template');
        cardsSection.append(cardRendered);
    });
})();

function createCard(cardData, cardTemplate) {
    const newCard = new Card(cardData, '#card__template');
    return newCard.generateCard();
}

export function openModalWindow(popup) {
    document.addEventListener('keydown', closeActivePopupOnEscape);
    popup.classList.add('popup_active');
    popup.addEventListener('mousedown', closePopupOnOverlayClick);
}

export function closeModalWindow(popup) {
    document.removeEventListener('keydown', closeActivePopupOnEscape);
    popup.classList.remove('popup_active');
    popup.removeEventListener('mousedown', closePopupOnOverlayClick);
}

export function closeActivePopupOnEscape(event) {
    if (event.key === 'Escape') {
        const activePopup = document.querySelector('.popup_active');
        closeModalWindow(activePopup);
    }
}

const closePopupOnOverlayClick = (evt) => {
    if (evt.target.classList.contains('popup_active')) {
        closeModalWindow(evt.target);
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
    cardsSection.prepend(card);
    closeModalWindow(cardAddModalWindow);
    cardAddForm.reset();
    cardAddValidator.disableButton();
})

profileEditModalWindow.addEventListener('submit', function (event) {
    event.preventDefault();
    currentName.textContent = userNameInput.value;
    currentDescription.textContent = userDescriptionInput.value;
    closeModalWindow(profileEditModalWindow);
    profileValidator.enableButton();
})


document.querySelectorAll('.popup__close-button').forEach((button) => {
    const buttonsPopup = button.closest('.popup');
    button.addEventListener('click', () => closeModalWindow(buttonsPopup));
});

const profileValidator = new FormValidator(profileEditForm, validationSettings);
const cardAddValidator = new FormValidator(cardAddForm, validationSettings);

profileValidator.enableValidation();
cardAddValidator.enableValidation();
