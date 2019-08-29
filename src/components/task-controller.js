import {Position, render} from '../utils/utils.js';
import Task from './task.js';
import TaskEdit from './task-edit.js';


class TaskController {
  constructor(container, taskData, onChangeView, onDataChange) {
    this._tasksList = container;
    this._data = taskData;
    this._onChangeView = onChangeView;
    this._onDataChange = onDataChange;

    this.init();
  }

  init() {
    this._taskView = new Task(this._data);
    this._hangHandlers();
    render(this._tasksList.getElement(), this._taskView.getElement(), Position.BEFOREEND);
  }

  _update(entry) {
    //    const oldTask = this._taskView;
    const oldTaskEdit = this._taskEdit;
    this._data = entry;
    this._taskView = new Task(this._data);
    this._taskEdit = new TaskEdit(this._data);
    this._hangHandlers();
    this._tasksList.getElement().replaceChild(this._taskView.getElement(), oldTaskEdit.getElement());
  }

  _hangHandlers() {
    const onTaskBtnEditClick = () => {
      this._taskEdit = new TaskEdit(this._data);
      this._onChangeView();
      this._tasksList.getElement().replaceChild(this._taskEdit.getElement(), this._taskView.getElement());

      const onEscKeyDown = (evt) => {
        if (evt.key === `Esc` || evt.key === `Escape`) {
          this._tasksList.getElement().replaceChild(this._taskView.getElement(), this._taskEdit.getElement());
          document.removeEventListener(`keydown`, onEscKeyDown);
        }
      };
      document.addEventListener(`keydown`, onEscKeyDown);

      const onTaskEditFormSubmit = (evt) => {
        evt.preventDefault();
        const formData = new FormData(this._taskEdit.getElement().querySelector(`.card__form`));

        const entry = {
          description: formData.get(`text`),
          color: formData.get(`color`),
          tags: new Set(formData.getAll(`hashtag`)),
          dueDate: new Date(formData.get(`date`)),
          repeatingDays: formData.getAll(`repeat`).reduce((acc, it) => {
            acc[it] = true;
            return acc;
          }, {
            'mo': false,
            'tu': false,
            'we': false,
            'th': false,
            'fr': false,
            'sa': false,
            'su': false,
          })
        };

        this._update(entry);

        document.removeEventListener(`keydown`, onEscKeyDown);
      };
      this._taskEdit.getElement().querySelector(`form`)
        .addEventListener(`submit`, onTaskEditFormSubmit);


      const onTaskEditTextFocus = () => document.removeEventListener(`keydown`, onEscKeyDown);
      this._taskEdit.getElement().querySelector(`.card__text`)
        .addEventListener(`focus`, onTaskEditTextFocus);


      const onTaskEditTextBlur = () => document.addEventListener(`keydown`, onEscKeyDown);
      this._taskEdit.getElement().querySelector(`.card__text`)
        .addEventListener(`blur`, onTaskEditTextBlur);
    };
    this._taskView.getElement().querySelector(`.card__btn--edit`)
      .addEventListener(`click`, onTaskBtnEditClick);
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
