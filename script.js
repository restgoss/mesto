let formElement = document.querySelector('.edit-form');
let nameInput = document.querySelector('#name')
let descriptionInput = document.querySelector('#description');
let currentName = document.querySelector('.profile__name');
let currentDescription = document.querySelector('.profile__description');

let editButton = document.querySelector('.profile__edit-btn');
let closeEditButton = document.querySelector('.edit-form__close-button');
let saveButton = document.querySelector('.edit-form__button');

let heartButton = document.querySelectorAll('.element__button').forEach(function (heartButton) {
    heartButton.addEventListener('click', function () {
            heartButton.classList.toggle('element__button_active');
        })
    });


console.log(currentName.textContent);

function popupOpen() {
    formElement.classList.add('edit-form_active');
}

function popupClose() {
    formElement.classList.remove('edit-form_active');
}

function handleFormSubmit(evt) {
    evt.preventDefault();
    currentName.textContent = nameInput.value;
    currentDescription.textContent = descriptionInput.value;
    popupClose();
}


formElement.addEventListener('submit', handleFormSubmit);
saveButton.addEventListener('click', handleFormSubmit);
closeEditButton.addEventListener('click', popupClose);
editButton.addEventListener('click', popupOpen);

