
const defaultPopup = document.querySelectorAll('.popup')
const formPopup = document.querySelector('#popup__edit');
const plusPopup = document.querySelector('#popup__plus');
const profileForm = document.querySelector('.popup__form')
const nameInput = document.querySelector('.popup__input_value_name')
const descriptionInput = document.querySelector('.popup__input_value_description');
const currentName = document.querySelector('.profile__name');
const currentDescription = document.querySelector('.profile__description');
const plusButton = document.querySelector('.profile__plus-btn');
const editButton = document.querySelector('.profile__edit-btn');
const closeButton = document.querySelector('.popup__close-button');
const saveButton = document.querySelector('.popup__button');
// const createButton = document.querySelector('#popup__plus-btn');

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

function addCard() {

}

function openProfilePopup() {
    nameInput.value = currentName.textContent;
    descriptionInput.value = currentDescription.textContent;
    formPopup.classList.add('popup_active');
}

function openPlusPopup() {
    plusPopup.classList.add('popup_active');
}

function closePopup() {
    defaultPopup.classList.remove('popup_active');
}

function handleCardAdd() {
    closePopup();
}

function handleFormSubmit(evt) {
    evt.preventDefault();
    currentName.textContent = nameInput.value;
    currentDescription.textContent = descriptionInput.value;
    closePopup();
}


profileForm.addEventListener('submit', handleFormSubmit);
closeButton.addEventListener('click', closePopup);
editButton.addEventListener('click', openProfilePopup);
plusButton.addEventListener('click', openPlusPopup);
profileForm.addEventListener('click', handleCardAdd);
