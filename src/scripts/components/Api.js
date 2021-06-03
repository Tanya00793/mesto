export class Api {
  constructor(options) {
    this.address = options.address;
    this.token = options.token;
    this.cohortId = options.cohortId;
  }

  _handleResponse = (response) => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response.status);
    }
  }

  _request (endpoint, method, body) {
    const fetchInit = {
      method: method,  
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      }
    };
    return fetch (
      `${this.address}/${this.cohortId}/${endpoint}`,
      body ? { ...fetchInit, body: JSON.stringify(body) } : fetchInit)
    .then (
      this._handleResponse
    )
    .catch(console.error);
  }

  getUserInfo () {
    return this._request('users/me', 'GET');
  }
  
  getInitialCards () {
    return this._request('cards', 'GET');
  }

  updateUserInfo (userInfo) {
    return this._request('users/me', 'PATCH', userInfo);
  }

  updateAvatar (avatar) {
    return this._request('users/me/avatar', 'PATCH', avatar);
  }

  addNewCard (cardData) {
    return this._request('cards', 'POST', cardData);
  }

  likeCard (cardID, isLiked) {
    return this._request(`cards/likes/${cardID}`, isLiked ? 'DELETE' : 'PUT');
  }

  deleteCard (cardID) {
    return this._request(`cards/${cardID}`, 'DELETE');
  }
}

