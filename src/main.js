import * as data from './data.js';
import {tasksConfig} from './config.js';
import {Position, createElement, render, hideElement} from './utils/utils.js';
import Menu from './components/menu.js';
import Filters from './components/filters.js';
import Task from './components/task.js';
import TaskEdit from './components/task-edit.js';
import {getSearchTemplate} from './components/search.js';
import {createTasksBoard} from './components/tasks-board.js';
import {createBoardFilter} from './components/board-filter.js';
import {createLoadMoreButton} from './components/load-more-button.js';

//  Рендер меню, поиска и его фильтров
const mainNode = document.querySelector(`main`);
const mainControl = mainNode.querySelector(`.control`);
render(mainControl, new Menu(data.menu).getElement(), Position.BEFOREEND);
render(mainNode, createElement(getSearchTemplate()), Position.BEFOREEND);
render(mainNode, new Filters(data.filters), Position.BEFOREEND);

//  Рендер доски задач и его фильтров
render(mainNode, createElement(createTasksBoard()), Position.BEFOREEND);

const board = mainNode.querySelector(`.board`);
const tasksBoard = board.querySelector(`.board__tasks`);
render(board, createElement(createBoardFilter()), Position.AFTERBEGIN);

//  Рендер первого набора задач
let firstTask;
let overTasks;
[firstTask, ...overTasks] = data.tasksList.slice(0, tasksConfig.perLoad);
render(tasksBoard, new TaskEdit(firstTask), Position.BEFOREEND);
render(tasksBoard, new Task(overTasks[1]), Position.BEFOREEND);

// //  Рендер кнопки загрузки
// render(board, createLoadMoreButton());
// const loadButton = board.querySelector(`.load-more`);
// if (data.tasksList.length <= tasksConfig.perLoad) {
//   hideElement(loadButton);
// } else {
//   //  Рендер определенного кол-ва задач при нажатии
//   let lastRenderTaskIndex = tasksConfig.perLoad;
//   const onLoadButtonClick = () => {
//     render(tasksBoard, data.tasksList.slice(lastRenderTaskIndex, lastRenderTaskIndex + tasksConfig.perLoad).map(createTaskCard).join(``));
//     lastRenderTaskIndex += tasksConfig.perLoad;
//     if (lastRenderTaskIndex >= data.tasksList.length) {
//       hideElement(loadButton);
//       loadButton.removeEventListener(`click`, onLoadButtonClick);
//     }
//   };
//   loadButton.addEventListener(`click`, onLoadButtonClick);
// }
