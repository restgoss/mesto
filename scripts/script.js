const formPopup = document.querySelector('.popup');
const profileForm = document.querySelector('.popup__form')
const nameInput = document.querySelector('.popup__input_value_name')
const descriptionInput = document.querySelector('.popup__input_value_description');
const currentName = document.querySelector('.profile__name');
const currentDescription = document.querySelector('.profile__description');
const editButton = document.querySelector('.profile__edit-btn');
const closeButton = document.querySelector('.popup__close-button');
const saveButton = document.querySelector('.popup__button');

function openPopup() {
    nameInput.value = currentName.textContent;
    descriptionInput.value = currentDescription.textContent;
    formPopup.classList.add('popup_active');
}

function closePopup() {
    formPopup.classList.remove('popup_active');
}

function handleFormSubmit(evt) {
    evt.preventDefault();
    currentName.textContent = nameInput.value;
    currentDescription.textContent = descriptionInput.value;
    closePopup();
}

profileForm.addEventListener('submit', handleFormSubmit);
closeButton.addEventListener('click', closePopup);
editButton.addEventListener('click', openPopup);

