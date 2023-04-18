const addCardModalWindow = document.querySelector('.popup_form_add');
const editProfileModalWindow = document.querySelector('.popup_form_edit');
const currentName = document.querySelector('.profile__name');
const currentDescription = document.querySelector('.profile__description');
const editProfileButton = document.querySelector('.profile__edit-btn');
const addCardButton = document.querySelector('.profile__plus-btn');
const cardTemplate = document.querySelector('#card__template').content;
const elementImage = document.querySelectorAll('.element__image');
const body = document.querySelector('body');
const imagePopup = document.querySelector('.image-popup');
const imagePopupCloseButton = imagePopup.querySelector('.image-popup__button');
const cardsSection = document.querySelector('.cards');

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

editProfileButton.addEventListener('click', function () {
    const modalWindow = editProfileModalWindow;
    openModalWindow(modalWindow);
});

addCardButton.addEventListener('click', function () {
    const modalWindow = addCardModalWindow;
    openModalWindow(modalWindow);
});

editProfileModalWindow.querySelector('.popup__close-button').addEventListener('click', function () {
    const modalWindow = editProfileModalWindow;
    closeModalWindow(modalWindow);
});

addCardModalWindow.querySelector('.popup__close-button').addEventListener('click', function () {
    const modalWindow = addCardModalWindow;
    closeModalWindow(modalWindow);
});

imagePopupCloseButton.addEventListener('click', function () {
    const modalWindow = imagePopup;
    closeModalWindow(modalWindow);
})

addCardModalWindow.addEventListener('submit', function (event) {
    event.preventDefault();
    const name = addCardModalWindow.querySelector('#cardTitle').value;
    const link = addCardModalWindow.querySelector('#cardLink').value;
    const cardData = { name: name, link: link };
    renderCard(cardData, cardsSection);
    closeModalWindow(addCardModalWindow);
})

editProfileModalWindow.addEventListener('submit', function (event) {
    event.preventDefault();
    currentName.textContent = editProfileModalWindow.querySelector('#userName').value;
    currentDescription.textContent = editProfileModalWindow.querySelector('#userDescription').value;
    closeModalWindow(editProfileModalWindow);
})


function openModalWindow(modalWindow) {
    modalWindow.classList.add('popup_active');
    if (modalWindow == addCardModalWindow) {
        addCardModalWindow.querySelector('#cardTitle').value = '';
        addCardModalWindow.querySelector('#cardLink').value = '';
    }
}

function closeModalWindow(modalWindow) {
    modalWindow.classList.remove('popup_active');
}

function createCard(name, link) {
    const clonedContent = cardTemplate.cloneNode(true);
    const card = clonedContent.querySelector('.element');
    const cardImage = clonedContent.querySelector('.element__image');
    const cardTitle = clonedContent.querySelector('.element__title');
    const likeButton = clonedContent.querySelector('.element__button');
    const deleteButton = clonedContent.querySelector('.element__delete-btn');
    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;

    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('element__button_active');
    });

    deleteButton.addEventListener('click', () => {
        card.remove();
    });

    cardImage.addEventListener('click', () => {
        imagePopup.querySelector('.image-popup__description').textContent = cardTitle.textContent;
        imagePopup.querySelector('.image-popup__image').src = cardImage.src;
        imagePopup.classList.add('popup_active');
    })

    return card;
}

function renderCard(cardData, container) {
    if (!Array.isArray(cardData)) {
        cardData = [cardData];
    }
    for (let data of cardData) {
        const card = createCard(data.name, data.link);
        container.prepend(card);
    }
}

renderCard(initialCards, cardsSection);
