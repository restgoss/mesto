
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
const addCardForm = addCardModalWindow.querySelector('.popup__form');
const popupOverlay = document.querySelector('.popup');
const submitButton = addCardModalWindow.querySelector('.popup__button');
const imageDescriptionSelector = imagePopup.querySelector('.image-popup__description');
const cardImageSelector = imagePopup.querySelector('.image-popup__image');
const userNameInput = editProfileModalWindow.querySelector('#userName');
const userDescriptionInput = editProfileModalWindow.querySelector('#userDescription');
const newCardTitle = addCardModalWindow.querySelector('#cardTitle');
const newCardLink = addCardModalWindow.querySelector('#cardLink');
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

function closeActivePopupOnEscape(event) {
    if (event.key === 'Escape') {
        const activePopup = document.querySelector('.popup_active');
        if (activePopup) {
            closeModalWindow(activePopup);
        }
    }
}

function openModalWindow(popup) {
    popup.classList.add('popup_active');
    document.addEventListener('keydown', closeActivePopupOnEscape);
}

function closeModalWindow(popup) {
    popup.classList.remove('popup_active');
    document.removeEventListener('keydown', closeActivePopupOnEscape);
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
        imageDescriptionSelector.textContent = cardTitle.textContent;
        cardImageSelector.src = cardImage.src;
        cardImageSelector.alt = cardTitle.textContent;
        openModalWindow(imagePopup);
    })

    return card;
}

function renderCard(cardData, container) {
    const card = createCard(cardData.name, cardData.link);
    container.prepend(card);

}

function closePopupOnOverlayClick(event) {
    if (event.target.classList.contains('popup') || event.target.classList.contains('image-popup')) {
        closeModalWindow(event.target);
    }
}

initialCards.forEach((data) => {
    renderCard(data, cardsSection);
})

editProfileButton.addEventListener('click', function () {
    openModalWindow(editProfileModalWindow);
    userNameInput.value = currentName.textContent;
    userDescriptionInput.value = currentDescription.textContent;
});

addCardButton.addEventListener('click', function () {
    openModalWindow(addCardModalWindow);
});

editProfileModalWindow.querySelector('.popup__close-button').addEventListener('click', function () {
    closeModalWindow(editProfileModalWindow);
});

addCardModalWindow.querySelector('.popup__close-button').addEventListener('click', function () {
    closeModalWindow(addCardModalWindow);
});

imagePopupCloseButton.addEventListener('click', function () {
    closeModalWindow(imagePopup);
});

addCardModalWindow.addEventListener('submit', function (event) {
    event.preventDefault();
    const cardData = { name: newCardTitle.value, link: newCardLink.value };
    renderCard(cardData, cardsSection);
    closeModalWindow(addCardModalWindow);
    addCardForm.reset();
    submitButton.classList.add('popup__button_disabled');
    submitButton.setAttribute('disabled', true);
})

editProfileModalWindow.addEventListener('submit', function (event) {
    event.preventDefault();
    currentName.textContent = userNameInput.value;
    currentDescription.textContent = userDescriptionInput.value;
    closeModalWindow(editProfileModalWindow);
})

document.addEventListener('keydown', closeActivePopupOnEscape);

addCardModalWindow.addEventListener('mousedown', closePopupOnOverlayClick);

editProfileModalWindow.addEventListener('mousedown', closePopupOnOverlayClick);

imagePopup.addEventListener('mousedown', closePopupOnOverlayClick);



