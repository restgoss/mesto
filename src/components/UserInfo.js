export default class UserInfo {
    constructor({ profileNameSelector, profileDescriptionSelector, profileAvatarSelector }) {
        this._name = document.querySelector(profileNameSelector);
        this._description = document.querySelector(profileDescriptionSelector);
        this._avatar = document.querySelector(profileAvatarSelector);
    }

    getUserInfo() {
        const userInfo = {
            name: this._name.textContent,
            about: this._description.textContent,
            avatar: this._avatar.src
        }
        return userInfo;
    }

    setUserInfo(data) {
        this._name.textContent = data.name;
        this._description.textContent = data.about;
        this._avatar.src = data.avatar;
    }
}