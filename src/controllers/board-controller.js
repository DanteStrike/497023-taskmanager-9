import {Position, render, hideElement} from '../utils/utils.js';
import {tasksConfig} from '../config.js';
import NoTasks from '../components/no-tasks.js';
import TasksBoard from '../components/tasks-board.js';
import BoardFilter from '../components/board-filter.js';
import LoadMoreBtn from '../components/load-more-button.js';
import TasksList from '../components/tasks-list.js';
import TaskController from './task-controller.js';


class BoardController {
  constructor(node, tasks) {
    this._container = node;
    this._tasks = tasks;
    this._board = new TasksBoard();
    this._tasksList = new TasksList();
    this._sort = new BoardFilter();
    this._noTasks = new NoTasks();
    this._loadMoreBtn = new LoadMoreBtn();
    this._renderedTasksAmount = null;

    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }

  init() {
    render(this._container, this._board.getElement(), Position.BEFOREEND);

    if (this._tasks.length === 0) {
      render(this._board.getElement(), this._noTasks.getElement(), Position.BEFOREEND);
      return;
    }

    render(this._board.getElement(), this._sort.getElement(), Position.BEFOREEND);
    this._sort.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));

    render(this._board.getElement(), this._tasksList.getElement(), Position.BEFOREEND);
    render(this._board.getElement(), this._loadMoreBtn.getElement(), Position.BEFOREEND);

    if (this._tasks.length <= tasksConfig.perLoad) {
      this._tasks.forEach((task) => this._renderTask(task));
      this._renderedTasksAmount = this._tasks.length;
      hideElement(this._loadMoreBtn.getElement());
      return;
    }

    this._tasks.slice(0, tasksConfig.perLoad)
      .forEach((task) => this._renderTask(task));
    this._renderedTasksAmount = tasksConfig.perLoad;
    this._loadMoreBtn.getElement().addEventListener(`click`, () => this._onLoadButtonClick());
  }

  _renderTask(task) {
    const newTaskController = new TaskController(this._tasksList, task, this._onChangeView, this._onDataChange);

    this._subscriptions.push(newTaskController.setDefaultView.bind(newTaskController));
  }

  _onChangeView() {
    this._subscriptions.forEach((sub) => sub());
  }

  _onDataChange(oldData, newData) {
    this._tasks[this._tasks.findIndex((task) => task === oldData)] = newData;
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();

    if (evt.target.tagName !== `A`) {
      return;
    }

    this._tasksList.getElement().innerHTML = ``;

    switch (evt.target.dataset.sortType) {
      case `date-up`:
        const sortedByDateUpTasks = this._tasks.slice().sort((a, b) => a.dueDate - b.dueDate);
        sortedByDateUpTasks.forEach((task) => this._renderTask(task));
        break;
      case `date-down`:
        const sortedByDateDownTasks = this._tasks.slice().sort((a, b) => b.dueDate - a.dueDate);
        sortedByDateDownTasks.forEach((task) => this._renderTask(task));
        break;
      case `default`:
        this._tasks.forEach((task) => this._renderTask(task));
        break;
    }
  }

  _onLoadButtonClick() {
    this._tasks.slice(this._renderedTasksAmount, this._renderedTasksAmount + tasksConfig.perLoad)
      .map((task) => this._renderTask(task));

    this._renderedTasksAmount += tasksConfig.perLoad;
    if (this._renderedTasksAmount >= this._tasks.length) {
      this._renderedTasksAmount = this._tasks.length;
      hideElement(this._loadMoreBtn.getElement());
      this._loadMoreBtn.getElement().removeEventListener(`click`, this._onLoadButtonClick);
    }
  }
}


export default BoardController;
