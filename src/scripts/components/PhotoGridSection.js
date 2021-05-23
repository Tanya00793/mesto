export class PhotoGridSection {
  constructor ( { items, renderer }, selector) {
    this._container = document.querySelector(selector);
    this._dataForCardsTemplate = items;
    this._renderer = renderer;
  }

  renderCard () {
    this._dataForCardsTemplate.reverse().forEach(data => {
      this.addCardItem(this._renderer(data));
    })
  }

  addCardItem (element) {
    this._container.prepend(element);
  }
}