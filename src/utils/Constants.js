export const cardAddModalWindow = document.querySelector('.popup_form_add');
export const profileEditModalWindow = document.querySelector('.popup_form_edit');
export const avatarEditModalWindow = document.querySelector('.popup_form_avatar');
export const avatarEditForm = avatarEditModalWindow.querySelector('.popup__form');
export const cardDeleteModalWindow = document.querySelector('.popup_delete_ask');
export const currentNameSelector = '.profile__name';
export const currentDescriptionSelector = '.profile__description';
export const currentAvatarSelector = '.profile__avatar'
export const avatarEditButton = document.querySelector('.profile__avatar-circle');
export const profileEditButton = document.querySelector('.profile__edit-btn');
export const cardAddButton = document.querySelector('.profile__plus-btn');
export const cardsSectionSelector = '.cards';
export const cardAddForm = cardAddModalWindow.querySelector('.popup__form');
export const profileEditForm = profileEditModalWindow.querySelector('.popup__form');
export const imageModalWindow = document.querySelector('.popup_image-view');
export const userNameInput = profileEditModalWindow.querySelector('#userName');
export const userDescriptionInput = profileEditModalWindow.querySelector('#userDescription');
export const newCardTitle = cardAddModalWindow.querySelector('#cardTitle');
export const newCardLink = cardAddModalWindow.querySelector('#cardLink');

export const initialCards = [
    {
        cardTitle: 'Архыз',
        cardLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        cardTitle: 'Челябинская область',
        cardLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        cardTitle: 'Иваново',
        cardLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        cardTitle: 'Камчатка',
        cardLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        cardTitle: 'Холмогорский район',
        cardLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        cardTitle: 'Байкал',
        cardLink: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

export const validationSettings = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    disabledButtonClass: 'popup__button_disabled',
    errorClass: 'popup__error_active',
};