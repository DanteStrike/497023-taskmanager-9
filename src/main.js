import * as data from './data.js';
import {tasksConfig} from './config.js';
import {Position, createElement, render, hideElement} from './utils/utils.js';
import {getMenuTemplate} from './components/menu.js';
import {getSearchTemplate} from './components/search.js';
import {createFiltersTemplate} from './components/filters.js';
import {createTasksBoard} from './components/tasks-board.js';
import {createBoardFilter} from './components/board-filter.js';
import {createTaskCard} from './components/task.js';
import {createTaskEditForm} from './components/task-edit.js';
import {createLoadMoreButton} from './components/load-more-button.js';

//  Рендер меню, поиска и его фильтров
const mainNode = document.querySelector(`main`);
const mainControl = mainNode.querySelector(`.control`);

render(mainControl, getMenuTemplate());
render(mainNode, getSearchTemplate());
render(mainNode, createFiltersTemplate(data.filters));

//  Рендер доски задач и его фильтров
render(mainNode, createTasksBoard());

const board = mainNode.querySelector(`.board`);
const tasksBoard = board.querySelector(`.board__tasks`);

render(board, createBoardFilter(), `afterbegin`);

//  Рендер первого набора задач
let editTaskData;
let firstInitTaskData;
[editTaskData, ...firstInitTaskData] = data.tasksList.slice(0, tasksConfig.perLoad);
render(tasksBoard, createTaskEditForm(editTaskData));
render(tasksBoard, firstInitTaskData.map(createTaskCard).join(``));

//  Рендер кнопки загрузки
render(board, createLoadMoreButton());

const loadButton = board.querySelector(`.load-more`);
if (data.tasksList.length <= tasksConfig.perLoad) {
  hideElement(loadButton);
} else {
  //  Рендер определенного кол-ва задач при нажатии
  let lastRenderTaskIndex = tasksConfig.perLoad;
  const onLoadButtonClick = () => {
    render(tasksBoard, data.tasksList.slice(lastRenderTaskIndex, lastRenderTaskIndex + tasksConfig.perLoad).map(createTaskCard).join(``));
    lastRenderTaskIndex += tasksConfig.perLoad;
    if (lastRenderTaskIndex >= data.tasksList.length) {
      hideElement(loadButton);
      loadButton.removeEventListener(`click`, onLoadButtonClick);
    }
  };
  loadButton.addEventListener(`click`, onLoadButtonClick);
}
