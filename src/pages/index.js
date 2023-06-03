import {
    initialCards,
    validationSettings,
    cardAddModalWindow,
    profileEditModalWindow,
    currentNameSelector,
    currentDescriptionSelector,
    profileEditButton,
    cardAddButton,
    cardsSectionSelector,
    cardAddForm,
    profileEditForm,
    imageModalWindow
} from '../utils/Constants.js';
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import './index.css'

function submitProfileForm(userInfo) {
    profileInfo.setUserInfo(userInfo);
};

function submitCardForm(data) {
    const card = createCard(data, '#card__template', openImagePopup);
    cardList.addItem(card);
    cardAddValidator.disableButton();
    cardAddPopup.closePopup();
}

function createCard(cardData, cardTemplate, openImagePopup) {
    const newCard = new Card(cardData, '#card__template', openImagePopup);
    return newCard.generateCard();
}

function openImagePopup(title, src) {
    imagePopup.openPopup(title, src);
}

cardAddButton.addEventListener('click', function () {
    cardAddPopup.openPopup();
});

profileEditButton.addEventListener('click', () => {
    profilePopup.setInputValue(profileInfo.getUserInfo());
    profilePopup.openPopup();
    profileValidator.hideAllErrors();
});

const cardList = new Section({
    items: initialCards,
    renderer: (cardData) => {
        const card = createCard(cardData, '#card__template', openImagePopup);
        cardList.addItem(card);
    }
}, cardsSectionSelector);
cardList.renderItems();
const imagePopup = new PopupWithImage(imageModalWindow);
imagePopup.setEventListeners();
const profilePopup = new PopupWithForm(profileEditModalWindow, submitProfileForm);
profilePopup.setEventListeners();
const profileInfo = new UserInfo({
    profileNameSelector: currentNameSelector,
    profileDescriptionSelector: currentDescriptionSelector
});
const profileValidator = new FormValidator(profileEditForm, validationSettings);
profileValidator.enableValidation();
const cardAddValidator = new FormValidator(cardAddForm, validationSettings);
cardAddValidator.enableValidation();
const cardAddPopup = new PopupWithForm(cardAddModalWindow, submitCardForm);
cardAddPopup.setEventListeners();



