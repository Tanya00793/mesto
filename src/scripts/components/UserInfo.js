export class UserInfo {
  constructor(nameSelector, professionSelector) {
    this._name = document.querySelector(nameSelector);
    this._profession = document.querySelector(professionSelector);
  }

  getUserInfo () {
    return { name: this._name.textContent, profession: this._profession.textContent };
  }

  setUserInfo (_name, _profession) {
    this._name.textContent= _name;
    this._profession.textContent = _profession;
  }
} 