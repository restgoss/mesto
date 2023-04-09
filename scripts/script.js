const formPopup = document.querySelector('.popup');
const plusPopup = document.querySelector('.popup_form_add');
const editPopup = document.querySelector('.popup_form_edit');
const currentName = document.querySelector('.profile__name');
const currentDescription = document.querySelector('.profile__description');
const editButton = document.querySelector('.profile__edit-btn');
const plusButton = document.querySelector('.profile__plus-btn');
const closeButton = document.querySelector('.popup__close-button');
const cardTemplate = document.querySelector('#card__template');
const elementImage = document.querySelectorAll('.element__image');
const body = document.querySelector('body');
const imagePopup = document.querySelector('.image-popup');

document.addEventListener('DOMContentLoaded', function () {
    const initialCards = [
        {
            name: 'Архыз',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
        },
        {
            name: 'Челябинская область',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
        },
        {
            name: 'Иваново',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
        },
        {
            name: 'Камчатка',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
        },
        {
            name: 'Холмогорский район',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
        },
        {
            name: 'Байкал',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
        }
    ];
    const cardsSection = document.querySelector('.cards');
    const imagePopup = document.querySelector('.image-popup');
    initialCards.forEach(element => {
        const clonedCard = cardTemplate.content.cloneNode(true);
        clonedCard.querySelector('.element__image').src = element.link;
        clonedCard.querySelector('.element__title').textContent = element.name;
        cardsSection.appendChild(clonedCard);
    });
    cardsSection.addEventListener('click', function (evt) {
        if (evt.target.classList.contains('element__delete-btn')) {
            evt.target.closest('.element').remove();
        }
        if (evt.target.classList.contains('element__button')) {
            evt.target.classList.toggle('element__button_active');
        }
        if (evt.target.classList.contains('element__image')) {
            const parentNode = evt.target.closest('.element');
            const parentTitle = parentNode.querySelector('.element__title');
            imagePopup.querySelector('.image-popup__description').textContent = parentTitle.textContent;
            imagePopup.querySelector('.image-popup__image').src = evt.target.src;
            imagePopup.classList.add('image-popup_active');
        }
    })

})

body.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('image-popup__button')) {
        imagePopup.classList.remove('image-popup_active');
    }
})

function openPlusPopup() {
    plusPopup.classList.add('popup_active');
}

function closePlusPopup() {
    plusPopup.classList.remove('popup_active');
}

function handlePlusSubmit(evt) {
    const cardsSection = document.querySelector('.cards');
    const cardTitleForm = plusPopup.querySelector('#cardTitle');
    const cardLinkForm = plusPopup.querySelector('#cardLink');
    const clonedCard = cardTemplate.content.cloneNode(true);
    evt.preventDefault();
    clonedCard.querySelector('.element__image').src = cardLinkForm.value;
    clonedCard.querySelector('.element__title').textContent = cardTitleForm.value;
    cardsSection.prepend(clonedCard);
    closePlusPopup()
}

function openEditPopup() {
    editPopup.classList.add('popup_active');
}

function closeEditPopup() {
    editPopup.classList.remove('popup_active');
}

function handleEditSubmit(evt) {
    const newName = editPopup.querySelector('#userName');
    const newDescr = editPopup.querySelector('#userDescription');
    evt.preventDefault();
    currentName.textContent = newName.value;
    currentDescription.textContent = newDescr.value;
    closeEditPopup()
}


plusButton.addEventListener('click', openPlusPopup);
plusPopup.querySelector('.popup__close-button').addEventListener('click', closePlusPopup);
plusPopup.addEventListener('submit', handlePlusSubmit);
editButton.addEventListener('click', openEditPopup);
editPopup.querySelector('.popup__close-button').addEventListener('click', closeEditPopup);
editPopup.addEventListener('submit', handleEditSubmit);
