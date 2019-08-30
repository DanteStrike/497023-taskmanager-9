import AbstractComponent from './abstract.js';
import {TimeValue} from '../utils/utils.js';


class Task extends AbstractComponent {
  constructor({description, dueDate, repeatingDays, tags, color = `black`, isFavorite, isArchive}) {
    super();
    this._description = description;
    this._dueDate = dueDate;
    this._repeatingDays = repeatingDays;
    this._isRepeating = Object.keys(this._repeatingDays).some((day) => this._repeatingDays[day]);
    this._tags = tags;
    this._color = color;
    this._isFavorite = isFavorite;
    this._isArchive = isArchive;
    this._element = null;
  }

  _getTemplate() {
    return `<article class="card card--${this._color} ${this._isRepeating ? `card--repeat` : ``}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
            <button type="button" class="card__btn card__btn--archive ${this._isArchive ? `` : `card__btn--disabled`}">
              archive
            </button>
            <button
              type="button"
              class="card__btn card__btn--favorites ${this._isFavorite ? `` : `card__btn--disabled`}"
            >
              favorites
            </button>
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <p class="card__text">${this._description}</p>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <div class="card__date-deadline">
                  <p class="card__input-deadline-wrap">
                    <span class="card__date">${(this._dueDate) ? `${new Date(this._dueDate).getDate()} ${TimeValue.MONTHS_NAMES[new Date(this._dueDate).getMonth()]}` : `did not set!`}</span>
                    <span class="card__time">${(this._dueDate) ? `${new Date(this._dueDate).getHours()}:${new Date(this._dueDate).getMinutes()}` : `did not set!`}</span>
                  </p>
                </div>
              </div>

              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${Array.from(this._tags).map((tag) => `<span class="card__hashtag-inner">
                    <span class="card__hashtag-name">
                      #${tag}
                    </span>
                  </span>`).join(``)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>`.trim();
  }
}


export default Task;
