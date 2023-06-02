export default class UserInfo {
    constructor({ profileNameSelector, profileDescriptionSelector }) {
        this._name = document.querySelector(profileNameSelector);
        this._description = document.querySelector(profileDescriptionSelector);
    }

    getUserInfo() {
        const userInfo = {
            userName: this._name.textContent,
            userDescription: this._description.textContent,
        }
        return userInfo;
    }

    setUserInfo(data) {
        this._name.textContent = data.userName;
        this._description.textContent = data.userDescription;
    }
}