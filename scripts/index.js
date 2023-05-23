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

// Вы наконец определитесь, что больше расходует памяти: постоянное установление/удаление слушателей, или что они постоянно висят?)) Надоело туда сюда исправлять.

export function openModalWindow(popup) {
  document.addEventListener('keydown', closeActivePopupOnEscape);
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_active')) {
        closeModalWindow(evt.target);
    }
  });
  popup.classList.add('popup_active');
}

export function closeModalWindow(popup) {
  document.removeEventListener('keydown', closeActivePopupOnEscape);
  popup.closest('.popup').removeEventListener('mousedown', () => closePopupOnOverlayClick);
  popup.classList.remove('popup_active');
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
