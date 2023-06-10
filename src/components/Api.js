export default class Api {
    constructor(data) {
        this._defaultUrl = data.defaultUrl;
        this._headers = data.headers;
    }

    _handleResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Error: ${res.status}`);
        }
    }

    getUserInfo() {
        return fetch(`${this._defaultUrl}/users/me`, { headers: this._headers }).then(this._handleResponse);
    }

    getInitialCards() {
        return fetch(`${this._defaultUrl}/cards`, { headers: this._headers }).then(this._handleResponse);
    }

    setUserInfo(userInfo) {
        return fetch(`${this._defaultUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: userInfo.name,
                about: userInfo.about,
            })
        }).then(this._handleResponse);
    }

    addNewCard(data) {
        console.log(data);
        return fetch(`${this._defaultUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(data),
        }).then(this._handleResponse);
    }

    deleteCard(id) {
        return fetch(`${this._defaultUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        }).then(this._handleResponse);
    }

    changeAvatar(data) {
        return fetch(`${this._defaultUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar,
            }),
        }).then(this._handleResponse);
    }

    like(id) {
        return fetch(`${this._defaultUrl}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._headers
        }).then(this._handleResponse);
    }

    dislike(id) {
        return fetch(`${this._defaultUrl}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._headers
        }).then(this._handleResponse);
    }
}

