import {createElement} from '../utils/utils.js';


class Menu {
  constructor(menuItems) {
    this._menuItems = menuItems;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
    }

    return this._element;
  }

  _getTemplate() {
    return `<section class="control__btn-wrap">
      <input
        type="radio"
        name="control"
        id="control__new-task"
        class="control__input visually-hidden"
        ${(this._menuItems[0].isActive) ? `checked` : ``}
      />
      <label for="control__new-task" class="control__label control__label--new-task"
        >${this._menuItems[0].title.toUpperCase()}</label
      >
      <input
        type="radio"
        name="control"
        id="control__task"
        class="control__input visually-hidden"
        ${(this._menuItems[1].isActive) ? `checked` : ``}
      />
      <label for="control__task" class="control__label">${this._menuItems[1].title.toUpperCase()}</label>
      <input
        type="radio"
        name="control"
        id="control__statistic"
        class="control__input visually-hidden"
        ${(this._menuItems[2].isActive) ? `checked` : ``}
      />
      <label for="control__statistic" class="control__label"
        >${this._menuItems[2].title.toUpperCase()}</label
      >
    </section>`;
  }
}


export default Menu;
