export class Section {
  constructor ( { items, renderer }, selector) {
    this._container = document.querySelector(selector);
    this._dataForCardsTemplate = items;
    this._renderer = renderer;
  }

  renderItems () {
    this._dataForCardsTemplate.reverse().forEach(data => {
      this._renderer(data);
    })
  }

  addItem (element) {
    this._container.prepend(element);
  }
}