import {Position, render} from '../utils/utils.js';
import Task from '../components/task.js';
import TaskEdit from '../components/task-edit.js';


class TaskController {
  constructor(container, taskData, onChangeView, onDataChange) {
    this._tasksList = container;
    this._data = taskData;
    this._onChangeView = onChangeView;
    this._onDataChange = onDataChange;

    this.init();
  }

  init() {
    this._createNewTaskView();
    render(this._tasksList.getElement(), this._taskView.getElement(), Position.BEFOREEND);
  }

  _createNewTaskView() {
    this._taskView = new Task(this._data);
    this._taskView.getElement().querySelector(`.card__btn--edit`)
      .addEventListener(`click`, () => this._onTaskBtnEditClick());
    this._taskView.getElement().querySelector(`.card__btn--archive`)
      .addEventListener(`click`, (evt) => this._onTaskBtnArchiveClick(evt));
    this._taskView.getElement().querySelector(`.card__btn--favorites`)
      .addEventListener(`click`, (evt) => this._onTaskBtnFavoritesClick(evt));
  }

  //  Обновить данные текущей карточки полностью или частично
  _updateTaskData(data) {
    let newData = Object.assign({}, this._data);
    for (const key in data) {
      if (newData.hasOwnProperty(key)) {
        newData[key] = data[key];
      }
    }

    //  Обновить данные в коллекции карточек "доски"
    this._onDataChange(this._data, newData);
    this._data = newData;
  }

  _onTaskBtnEditClick() {
    this._taskEdit = new TaskEdit(this._data);
    this._onChangeView();
    this._tasksList.getElement().replaceChild(this._taskEdit.getElement(), this._taskView.getElement());


    const onEscKeyDown = (evt) => {
      if (evt.key === `Esc` || evt.key === `Escape`) {
        if (this._tasksList.getElement().contains(this._taskEdit.getElement())) {
          this._tasksList.getElement().replaceChild(this._taskView.getElement(), this._taskEdit.getElement());
        }
        document.removeEventListener(`keydown`, onEscKeyDown);
        this._taskEdit = null;
      }
    };
    document.addEventListener(`keydown`, onEscKeyDown);


    this._taskEdit.getElement().querySelector(`.card__btn--archive`)
      .addEventListener(`click`, (evt) => this._onTaskBtnArchiveClick(evt));
    this._taskEdit.getElement().querySelector(`.card__btn--favorites`)
      .addEventListener(`click`, (evt) => this._onTaskBtnFavoritesClick(evt));


    const onTaskEditFormSubmit = (evt) => {
      evt.preventDefault();
      const formData = new FormData(this._taskEdit.getElement().querySelector(`.card__form`));

      const entry = {
        description: formData.get(`text`),
        dueDate: new Date(formData.get(`date`)).valueOf(),
        repeatingDays: formData.getAll(`repeat`).reduce((acc, day) => {
          acc[day] = true;
          return acc;
        }, {
          'mo': false,
          'tu': false,
          'we': false,
          'th': false,
          'fr': false,
          'sa': false,
          'su': false,
        }),
        tags: new Set(formData.getAll(`hashtag`)),
        color: formData.get(`color`)
      };

      // Перерисовать только текущую карточку путем создания нового TaskView и подмены replaceChild. Не требуется перерисовывать всю "доску".
      this._updateTaskData(entry);
      this._createNewTaskView();

      this._tasksList.getElement().replaceChild(this._taskView.getElement(), this._taskEdit.getElement());
      this._taskEdit = null;

      document.removeEventListener(`keydown`, onEscKeyDown);
    };
    this._taskEdit.getElement().querySelector(`form`)
      .addEventListener(`submit`, onTaskEditFormSubmit);

    //  ESC не должен прерывать ввод текстовых данных в форме редактирования
    const onTaskEditTextFocus = () => document.removeEventListener(`keydown`, onEscKeyDown);
    this._taskEdit.getElement().querySelector(`.card__text`)
      .addEventListener(`focus`, onTaskEditTextFocus);
    this._taskEdit.getElement().querySelector(`.card__hashtag-input`)
      .addEventListener(`focus`, onTaskEditTextFocus);


    const onTaskEditTextBlur = () => document.addEventListener(`keydown`, onEscKeyDown);
    this._taskEdit.getElement().querySelector(`.card__text`)
      .addEventListener(`blur`, onTaskEditTextBlur);
    this._taskEdit.getElement().querySelector(`.card__hashtag-input`)
      .addEventListener(`blur`, onTaskEditTextBlur);
  }

  _onTaskBtnArchiveClick(evt) {
    const target = evt.target;

    const entry = {
      isArchive: !this._data.isArchive
    };
    this._updateTaskData(entry);

    target.classList.toggle(`card__btn--disabled`);
  }

  _onTaskBtnFavoritesClick(evt) {
    const target = evt.target;

    const entry = {
      isFavorite: !this._data.isFavorite
    };
    this._updateTaskData(entry);

    target.classList.toggle(`card__btn--disabled`);
  }

  setDefaultView() {
    if (!this._taskEdit) {
      return;
    }

    if (this._tasksList.getElement().contains(this._taskEdit.getElement())) {
      this._tasksList.getElement().replaceChild(this._taskView.getElement(), this._taskEdit.getElement());
    }
  }
}


export default TaskController;
