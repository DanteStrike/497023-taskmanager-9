import {createElement} from '../utils/utils.js';


class Filters {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
    }

    return this._element;
  }

  _getTemplate() {
    return `<section class="main__filter filter container">
      <input
        type="radio"
        id="filter__all"
        class="filter__input visually-hidden"
        name="filter"
        checked
        ${(this._filters[0].tasksAmount === 0) ? `disabled` : ``}
      />
      <label for="filter__all" class="filter__label"
        >${this._filters[0].title} <span class="filter__all-tasksAmount">${this._filters[0].tasksAmount}</span></label
      >
      <input
        type="radio"
        id="filter__overdue"
        class="filter__input visually-hidden"
        name="filter"
        ${(this._filters[1].tasksAmount === 0) ? `disabled` : ``}
      />
      <label for="filter__overdue" class="filter__label"
        >${this._filters[1].title} <span class="filter__overdue-tasksAmount">${this._filters[1].tasksAmount}</span></label
      >
      <input
        type="radio"
        id="filter__today"
        class="filter__input visually-hidden"
        name="filter"
        ${(this._filters[2].tasksAmount === 0) ? `disabled` : ``}
      />
      <label for="filter__today" class="filter__label"
        >${this._filters[2].title} <span class="filter__today-tasksAmount">${this._filters[2].tasksAmount}</span></label
      >
      <input
        type="radio"
        id="filter__favorites"
        class="filter__input visually-hidden"
        name="filter"
        ${(this._filters[3].tasksAmount === 0) ? `disabled` : ``}
      />
      <label for="filter__favorites" class="filter__label"
        >${this._filters[3].title} <span class="filter__favorites-tasksAmount">${this._filters[3].tasksAmount}</span></label
      >
      <input
        type="radio"
        id="filter__repeating"
        class="filter__input visually-hidden"
        name="filter"
        ${(this._filters[4].tasksAmount === 0) ? `disabled` : ``}
      />
      <label for="filter__repeating" class="filter__label"
        >${this._filters[4].title} <span class="filter__repeating-tasksAmount">${this._filters[4].tasksAmount}</span></label
      >
      <input
        type="radio"
        id="filter__tags"
        class="filter__input visually-hidden"
        name="filter"
        ${(this._filters[5].tasksAmount === 0) ? `disabled` : ``}
      />
      <label for="filter__tags" class="filter__label"
        >${this._filters[5].title} <span class="filter__tags-tasksAmount">${this._filters[5].tasksAmount}</span></label
      >
      <input
        type="radio"
        id="filter__archive"
        class="filter__input visually-hidden"
        name="filter"
        ${(this._filters[6].tasksAmount === 0) ? `disabled` : ``}
      />
      <label for="filter__archive" class="filter__label"
        >${this._filters[6].title} <span class="filter__archive-tasksAmount">${this._filters[6].tasksAmount}</span></label
      >
    </section>`.trim();
  }
}


export default Filters;

