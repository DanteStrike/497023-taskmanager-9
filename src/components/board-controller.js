import {Position, render, hideElement} from '../utils/utils.js';
import {tasksConfig} from '../config.js';
import NoTasks from './no-tasks.js';
import TasksBoard from './tasks-board.js';
import Sort from './board-filter.js';
import Task from './task.js';
import TaskEdit from './task-edit.js';
import LoadMoreBtn from './load-more-button.js';


class BoardController {
  constructor(node, tasks) {
    this._container = node;
    this._tasks = tasks;
    this._board = new TasksBoard();
    this._sort = new Sort();
    this._loadMoreBtn = new LoadMoreBtn();
    this._renderedTasksAmount = null;
  }

  init() {
    if (this._tasks.length === 0) {
      this._firstInit();
      return;
    }

    render(this._container, this._board.getElement(), Position.AFTERBEGIN);
    render(this._container, this._loadMoreBtn.getElement(), Position.AFTERBEGIN);

    if (this._tasks.length <= tasksConfig.perLoad) {
      this._tasks.forEach((task) => this._renderTask(task));
      this._renderedTasksAmount = this._tasks.length;
      hideElement(this._loadMoreBtn.getElement());
      return;
    }

    this._tasks.slice(0, tasksConfig.perLoad)
      .forEach((task) => this._renderTask(task));
    this._renderedTasksAmount = tasksConfig.perLoad;
    this._loadMoreBtn.getElement().addEventListener(`click`, () => this._onLoadButtonClick);
  }

  _firstInit() {
    render(this._container, new NoTasks().getElement(), Position.AFTERBEGIN);
  }

  _renderTask(task) {
    const newTask = new Task(task);
    const tasksBoardNode = this._board.getElement().querySelector(`.board__tasks`);

    const onTaskBtnEditClick = () => {
      const newTaskEdit = new TaskEdit(task);
      tasksBoardNode.replaceChild(newTaskEdit.getElement(), newTask.getElement());

      const onEscKeyDown = (evt) => {
        if (evt.key === `Esc` || evt.key === `Escape`) {
          tasksBoardNode.replaceChild(newTask.getElement(), newTaskEdit.getElement());
          document.removeEventListener(`keydown`, onEscKeyDown);
        }
      };
      document.addEventListener(`keydown`, onEscKeyDown);

      const onTaskEditFormSubmit = (evt) => {
        evt.preventDefault();
        tasksBoardNode.replaceChild(newTask.getElement(), newTaskEdit.getElement());
      };
      newTaskEdit.getElement().querySelector(`form`)
        .addEventListener(`submit`, onTaskEditFormSubmit);


      const onTaskEditTextFocus = () => document.removeEventListener(`keydown`, onEscKeyDown);
      newTaskEdit.getElement().querySelector(`.card__text`)
        .addEventListener(`focus`, onTaskEditTextFocus);


      const onTaskEditTextBlur = () => document.addEventListener(`keydown`, onEscKeyDown);
      newTaskEdit.getElement().querySelector(`.card__text`)
        .addEventListener(`blur`, onTaskEditTextBlur);
    };
    newTask.getElement().querySelector(`.card__btn--edit`)
      .addEventListener(`click`, onTaskBtnEditClick);


    render(tasksBoardNode, newTask.getElement(), Position.BEFOREEND);
  }

  _onLoadButtonClick() {
    this._tasks.slice(this._renderedTasksAmount, this._renderedTasksAmount + tasksConfig.perLoad)
      .map((task) => this._renderTask(task));

    if (this._renderedTasksAmount >= this._tasks.length) {
      this._renderedTasksAmount = this._tasks.length;
      hideElement(this._loadMoreBtn.getElement());
      this._loadMoreBtn.getElement().removeEventListener(`click`, this._onLoadButtonClick);
    } else {
      this._renderedTasksAmount += tasksConfig.perLoad;
    }
  }
}


export default BoardController;
