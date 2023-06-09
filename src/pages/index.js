import {
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
    imageModalWindow,
    currentAvatarSelector,
    avatarEditModalWindow,
    avatarEditButton,
    avatarEditForm,
    cardDeleteModalWindow
} from '../utils/Constants.js';
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Api from '../components/Api.js';
import './index.css'
import PopupConfirm from '../components/PopupConfirm.js';

let userId;

const cardList = new Section({
    renderer: (data) => {
        const card = createCard(data);
        cardList.addItem(card);
    }
}, cardsSectionSelector);

function submitProfileForm(userInfo) {
    console.log('submiting');
    profilePopup.renderLoading(true, 'Сохранение...')
    try {
        profileInfo.setUserInfo(userInfo);
        api.setUserInfo(userInfo);
        profilePopup.closePopup();
    } catch (e) {
        console.warn(e)
    } finally {
        profilePopup.renderLoading(false);
    }


};

async function submitCardForm(data) {
    cardAddPopup.renderLoading(true, 'Сохранение...')
    try {
        data.likes = [];
        const res = await api.addNewCard(data);
        const card = createCard(res);
        cardList.addItem(card);
        cardAddPopup.closePopup();
    } catch (e) {
        console.warn(e);
    } finally {
        cardAddPopup.renderLoading(false);
    }
}

function createCard(data) {
    const newCard = new Card({
        name: data.name,
        link: data.link,
        likes: data.likes,
        userId,
        ownerId: data.owner._id,
        id: data._id
    },
        '#card__template',
        openImagePopup,
        async () => {
            try {
                const res = await api.like(data._id);
                newCard.like();
                newCard.setLikeCount(res);
            } catch (e) {
                console.warn(e)
            }
        },
        async () => {
            try {
                const res = await api.dislike(data._id);
                newCard.dislike();
                newCard.setLikeCount(res);
            } catch (e) {
                console.warn(e)
            }
        },
        () => {
            cardDeletePopup.openPopup(newCard);
        }
    );
    return newCard.generateCard();
}

function openImagePopup(title, src) {
    imagePopup.openPopup(title, src);
}

function submitAvatarForm() {
    avatarPopup.renderLoading(true, 'Сохранение...')
    try {
        const res = api.changeAvatar(avatarPopup._getInputValue());
        avatarPopup.closePopup();
    } catch (e) {
        console.warn(e);
    } finally {
        avatarPopup.renderLoading(false);
    }

}

cardAddButton.addEventListener('click', function () {
    cardAddPopup.openPopup();
});

profileEditButton.addEventListener('click', () => {
    profilePopup.setInputValue(profileInfo.getUserInfo());
    profilePopup.openPopup();
    profileValidator.hideAllErrors();
});

avatarEditButton.addEventListener('click', () => {
    avatarPopup.openPopup();
})


const profileInfo = new UserInfo({
    profileNameSelector: currentNameSelector,
    profileDescriptionSelector: currentDescriptionSelector,
    profileAvatarSelector: currentAvatarSelector
});

const profilePopup = new PopupWithForm(profileEditModalWindow, submitProfileForm);
profilePopup.setEventListeners();

const imagePopup = new PopupWithImage(imageModalWindow);
imagePopup.setEventListeners();

const avatarPopup = new PopupWithForm(avatarEditModalWindow, submitAvatarForm);
avatarPopup.setEventListeners();

const cardDeletePopup = new PopupConfirm(cardDeleteModalWindow, async (card) => {
    try {
        await api.deleteCard(card._id);
        card._handleDeleteCard();
        cardDeletePopup.closePopup();
    } catch (e) {
        console.warn(e)
    }
});
cardDeletePopup.setEventListeners();

const profileValidator = new FormValidator(profileEditForm, validationSettings);
profileValidator.enableValidation();

const cardAddValidator = new FormValidator(cardAddForm, validationSettings);
cardAddValidator.enableValidation();

const avatarFormValidator = new FormValidator(avatarEditForm, validationSettings);
avatarFormValidator.enableValidation();

const cardAddPopup = new PopupWithForm(cardAddModalWindow, submitCardForm);
cardAddPopup.setEventListeners();

const api = new Api({
    defaultUrl: "https://mesto.nomoreparties.co/v1/cohort-68",
    headers: {
        authorization: "e4b97e6c-db3d-488c-9d45-b67fd2ee22aa",
        "Content-Type": "application/json",
    },
})

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cards]) => {
        userId = userData._id;
        profileInfo.setUserInfo(userData);
        cardList.renderItems(cards.reverse());
    })
    .catch((e) => console.log(e));