const formPopup = document.querySelector('.popup');
const profileForm = document.querySelector('.popup__form')
const nameInput = document.querySelector('.popup__input_value_name')
const descriptionInput = document.querySelector('.popup__input_value_description');
const currentName = document.querySelector('.profile__name');
const currentDescription = document.querySelector('.profile__description');
const editButton = document.querySelector('.profile__edit-btn');
const plusButton = document.querySelector('.profile__plus-btn');
const closeButton = document.querySelector('.popup__close-button');
const cardTemplate = document.querySelector('#card__template');
const elementImage = document.querySelectorAll('.element__image');

// работа с template //
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

    initialCards.forEach(element => {
        const clonedCard = cardTemplate.content.cloneNode(true);
        clonedCard.querySelector('.element__image').src = element.link;
        clonedCard.querySelector('.element__title').textContent = element.name;
        cardsSection.appendChild(clonedCard);
    });
})


// работа с template для попапов //

const popupTemplate = document.querySelector('#popup');

plusButton.addEventListener('click', function () {
    const clonedPopup = popupTemplate.content.cloneNode(true);
    const popupContainer = clonedPopup.querySelector('.popup');
    const closeButton = clonedPopup.querySelector('.popup__close-button');
    const saveButton = clonedPopup.querySelector('.popup__button');
    const placeInput = clonedPopup.querySelector('#first-input');
    const linkInput = clonedPopup.querySelector('#second-input');
    const popupTitle = clonedPopup.querySelector('.popup__title');
    const popupButton = clonedPopup.querySelector('.popup__button');
    popupTitle.textContent = 'Новое место';
    popupButton.textContent = 'Создать';
    placeInput.placeholder = 'Название';
    linkInput.placeholder = 'Ссылка на картинку';
    document.body.appendChild(clonedPopup);
    setTimeout(() => {
        popupContainer.classList.add('popup_active');
    }, 1);
    closeButton.addEventListener('click', function () {
        popupContainer.classList.remove('popup_active');
    })
    saveButton.addEventListener('click', function (evt) {
        evt.preventDefault();
        const cardsSection = document.querySelector('.cards');
        const clonedCard = cardTemplate.content.cloneNode(true);
        const elementImage = clonedCard.querySelector('.element__image');
        const elementTitle = clonedCard.querySelector('.element__title');
        cardsSection.prepend(clonedCard);
        elementImage.src = linkInput.value;
        elementTitle.textContent = placeInput.value;
        popupContainer.classList.remove('popup_active');
    }
    )
})



editButton.addEventListener('click', function () {
    const clonedPopup = popupTemplate.content.cloneNode(true);
    const popupContainer = clonedPopup.querySelector('.popup');
    const closeButton = clonedPopup.querySelector('.popup__close-button');
    const saveButton = clonedPopup.querySelector('.popup__button');
    const nameInput = clonedPopup.querySelector('#first-input');
    const descriptionInput = clonedPopup.querySelector('#second-input');
    const popupTitle = clonedPopup.querySelector('.popup__title');
    const popupButton = clonedPopup.querySelector('.popup__button');
    popupTitle.textContent = 'Редактировать профиль';
    popupButton.textContent = 'Сохранить';
    nameInput.placeholder = 'Имя';
    descriptionInput.placeholder = 'Описание';
    nameInput.value = currentName.textContent;
    descriptionInput.value = currentDescription.textContent;
    document.body.appendChild(clonedPopup);
    setTimeout(() => {
        popupContainer.classList.add('popup_active');
    }, 1);
    closeButton.addEventListener('click', function () {
        popupContainer.classList.remove('popup_active');
    })
    saveButton.addEventListener('click', function (evt) {
        evt.preventDefault();
        currentName.textContent = nameInput.value;
        currentDescription.textContent = descriptionInput.value;
        popupContainer.classList.remove('popup_active');
    })
});

