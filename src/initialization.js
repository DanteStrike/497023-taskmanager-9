import * as data from './data.js';
import {tasksConfig} from './config.js';
import {Position, createElement, render, hideElement} from './utils/utils.js';
import Task from './components/task.js';
import TaskEdit from './components/task-edit.js';
import {createBoardFilter} from './components/board-filter.js';
import {createLoadMoreButton} from './components/load-more-button.js';
import {createNoTasks} from './components/no-tasks.js';


export const firstInit = (boardNode) => {
  render(boardNode, createElement(createNoTasks()), Position.AFTERBEGIN);
};

export const initTasksBoard = (boardNode) => {
  const tasksBoardNode = boardNode.querySelector(`.board__tasks`);
  render(boardNode, createElement(createBoardFilter()), Position.AFTERBEGIN);


  const renderTask = (task) => {
    const newTask = new Task(task);
    const newTaskEdit = new TaskEdit(task);


    const onEscKeyDown = (evt) => {
      if (evt.key === `Esc` || evt.key === `Escape`) {
        tasksBoardNode.replaceChild(newTask.getElement(), newTaskEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };


    const onTaskBtnEditClick = () => {
      tasksBoardNode.replaceChild(newTaskEdit.getElement(), newTask.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    };
    newTask.getElement().querySelector(`.card__btn--edit`)
      .addEventListener(`click`, onTaskBtnEditClick);


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


    render(tasksBoardNode, newTask.getElement(), Position.BEFOREEND);
  };


  //  Рендер списка задач и кнопки загрузки
  render(boardNode, createElement(createLoadMoreButton()), Position.BEFOREEND);
  const loadButton = boardNode.querySelector(`.load-more`);

  if (data.tasksList.length <= tasksConfig.perLoad) {
    data.tasksList.forEach((task) => renderTask(task));
    hideElement(loadButton);
  } else {

    //  Рендер определенного кол-ва задач при нажатии
    data.tasksList.slice(0, tasksConfig.perLoad)
      .forEach((task) => renderTask(task));
    let lastRenderTaskIndex = tasksConfig.perLoad;


    const onLoadButtonClick = () => {
      data.tasksList.slice(lastRenderTaskIndex, lastRenderTaskIndex + tasksConfig.perLoad)
        .map((task) => renderTask(task));
      lastRenderTaskIndex += tasksConfig.perLoad;

      if (lastRenderTaskIndex >= data.tasksList.length) {
        hideElement(loadButton);
        loadButton.removeEventListener(`click`, onLoadButtonClick);
      }
    };


    loadButton.addEventListener(`click`, onLoadButtonClick);
  }
};


