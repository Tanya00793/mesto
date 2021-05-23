export class UserInfo {
  constructor(nameSelector, professionSelector) {
    this.name = document.querySelector(nameSelector);
    this.profession = document.querySelector(professionSelector);
  }

  getUserInfo () {
    return { name: this.name.textContent, profession: this.profession.textContent };
  }

  setUserInfo (name, profession) {
    this.name.textContent= name;
    this.profession.textContent = profession;
  }
} 