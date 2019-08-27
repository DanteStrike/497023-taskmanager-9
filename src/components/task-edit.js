import AbstractComponent from './abstract.js';
import {TimeValue} from '../utils/utils.js';


class TaskEdit extends AbstractComponent {
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
    return `<article class="card card--edit card--${this._color} ${this._isRepeating ? `card--repeat` : ``}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--archive ${this._isArchive ? `` : `card__btn--disabled`}">
              archive
            </button>
            <button
              type="button"
              class="card__btn card__btn--favorites ${this._isFavorite ? `` : `card__btn--disabled`}">
              favorites
            </button>
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <label>
              <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text"
              >${this._description}</textarea>
            </label>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">${(this._dueDate !== 0) ? `yes` : `no`}</span>
                </button>

                <fieldset class="card__date-deadline" ${(this._dueDate !== 0) ? `` : `disabled`}>
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__date"
                      type="text"
                      placeholder="23 September"
                      name="date"
                      value="${new Date(this._dueDate).getDate()} ${TimeValue.MONTHS_NAMES[new Date(this._dueDate).getMonth()]} ${new Date(this._dueDate).getHours()}:${new Date(this._dueDate).getMinutes()}"
                    />
                  </label>
                </fieldset>

                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">${this._isRepeating ? `yes` : `no`}</span>
                </button>

                <fieldset class="card__repeat-days" ${this._isRepeating ? `` : `disabled`}>
                  <div class="card__repeat-days-inner">
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-mo-1"
                      name="repeat"
                      value="mo"
                      ${this._repeatingDays.mo ? `checked` : ``}
                    />
                    <label class="card__repeat-day" for="repeat-mo-1"
                      >mo</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-tu-1"
                      name="repeat"
                      value="tu"
                      ${this._repeatingDays.tu ? `checked` : ``}
                    />
                    <label class="card__repeat-day" for="repeat-tu-1"
                      >tu</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-we-1"
                      name="repeat"
                      value="we"
                      ${this._repeatingDays.we ? `checked` : ``}
                    />
                    <label class="card__repeat-day" for="repeat-we-1"
                      >we</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-th-1"
                      name="repeat"
                      value="th"
                      ${this._repeatingDays.th ? `checked` : ``}
                    />
                    <label class="card__repeat-day" for="repeat-th-1"
                      >th</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-fr-1"
                      name="repeat"
                      value="fr"
                      ${this._repeatingDays.fr ? `checked` : ``}
                    />
                    <label class="card__repeat-day" for="repeat-fr-1"
                      >fr</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      name="repeat"
                      value="sa"
                      id="repeat-sa-1"
                      ${this._repeatingDays.sa ? `checked` : ``}
                    />
                    <label class="card__repeat-day" for="repeat-sa-1"
                      >sa</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-su-1"
                      name="repeat"
                      value="su"
                      ${this._repeatingDays.su ? `checked` : ``}
                    />
                    <label class="card__repeat-day" for="repeat-su-1"
                      >su</label
                    >
                  </div>
                </fieldset>
              </div>

              <div class="card__hashtag">
                <div class="card__hashtag-list">
                  ${Array.from(this._tags).map((tag) => `<span class="card__hashtag-inner">
                      <input
                        type="hidden"
                        name="hashtag"
                        value="repeat"
                        class="card__hashtag-hidden-input"
                      />
                      <p class="card__hashtag-name">
                        #${tag}
                      </p>
                      <button type="button" class="card__hashtag-delete">
                        delete
                      </button>
                    </span>`).join(``)}
                </div>

                <label>
                  <input
                    type="text"
                    class="card__hashtag-input"
                    name="hashtag-input"
                    placeholder="Type new hashtag here"
                  />
                </label>
              </div>
            </div>

            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                <input
                  type="radio"
                  id="color-black-1"
                  class="card__color-input card__color-input--black visually-hidden"
                  name="color"
                  value="black"
                  ${(this._color === `black`) ? `checked` : ``}
                />
                <label
                  for="color-black-1"
                  class="card__color card__color--black"
                  >black</label
                >
                <input
                  type="radio"
                  id="color-yellow-1"
                  class="card__color-input card__color-input--yellow visually-hidden"
                  name="color"
                  value="yellow"
                  ${(this._color === `yellow`) ? `checked` : ``}
                />
                <label
                  for="color-yellow-1"
                  class="card__color card__color--yellow"
                  >yellow</label
                >
                <input
                  type="radio"
                  id="color-blue-1"
                  class="card__color-input card__color-input--blue visually-hidden"
                  name="color"
                  value="blue"
                  ${(this._color === `blue`) ? `checked` : ``}
                />
                <label
                  for="color-blue-1"
                  class="card__color card__color--blue"
                  >blue</label
                >
                <input
                  type="radio"
                  id="color-green-1"
                  class="card__color-input card__color-input--green visually-hidden"
                  name="color"
                  value="green"
                  ${(this._color === `green`) ? `checked` : ``}
                />
                <label
                  for="color-green-1"
                  class="card__color card__color--green"
                  >green</label
                >
                <input
                  type="radio"
                  id="color-pink-1"
                  class="card__color-input card__color-input--pink visually-hidden"
                  name="color"
                  value="pink"
                  ${(this._color === `pink`) ? `checked` : ``}
                />
                <label
                  for="color-pink-1"
                  class="card__color card__color--pink"
                  >pink</label
                >
              </div>
            </div>
          </div>

          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>`.trim();
  }
}


export default TaskEdit;
