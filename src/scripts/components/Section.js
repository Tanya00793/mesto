export class Section {
  constructor ( { renderer }, selector) {
    this._container = document.querySelector(selector);
    this._renderer = renderer;
  }

  renderItems (items) {
    items.reverse().forEach(item => {
      this._renderer(item);
    })
  }

  addItem (element) {
    this._container.prepend(element);
  }
}