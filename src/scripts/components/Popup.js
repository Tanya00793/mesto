export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  openPopup () {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._closePopupByEsc); 
  }
  
  closePopup () {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._closePopupByEsc); 
  }
  
  _closePopupByEsc = (e) => {
    if (e.key === 'Escape') {
      this.closePopup();
    }
  }

  setEventListeners () {
    this._popup.addEventListener('click', e => {
      if (e.target.classList.contains('popup_opened') || 
      e.target.classList.contains('popup__close-button')) {
        this.closePopup();
      }
    })
  }
}