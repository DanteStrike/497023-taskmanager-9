import {getMenuTemplate} from './components/menu.js';
import {getSearchTemplate} from './components/search.js';
import {createFiltersTemplate} from './components/filters.js';
import {createTasksBoard} from './components/tasks-board.js';
import {createBoardFilter} from './components/board-filter.js';
import {createTaskCard} from './components/task.js';
import {createTaskEditForm} from './components/task-edit.js';
import {createLoadMoreButton} from './components/load-more-button.js';
import {tasksData} from './data.js';
import {filtersData} from './data.js';


const TASKS_PER_LOAD = 8;


const hideElement = (element) => {
  element.style.display = `none`;
};
const renderComponent = (node, markup, position = `beforeend`) => {
  node.insertAdjacentHTML(position, markup);
};

//  Рендер определенного кол-ва задач при нажатии
let lastRenderTaskIndex = null;
const onLoadButtonClick = () => {
  renderComponent(tasksBoard, tasksData.slice(lastRenderTaskIndex, lastRenderTaskIndex + TASKS_PER_LOAD).map(createTaskCard).join(``));
  lastRenderTaskIndex += TASKS_PER_LOAD;
  if (lastRenderTaskIndex >= tasksData.length) {
    hideElement(loadButton);
    loadButton.removeEventListener(`click`, onLoadButtonClick);
  }
};

//  Рендер меню, поиска и его фильтров
const mainNode = document.querySelector(`main`);
const mainControl = mainNode.querySelector(`.control`);

renderComponent(mainControl, getMenuTemplate());
renderComponent(mainNode, getSearchTemplate());
renderComponent(mainNode, createFiltersTemplate(filtersData));

//  Рендер доски задач и его фильтров
renderComponent(mainNode, createTasksBoard());

const board = mainNode.querySelector(`.board`);
const tasksBoard = board.querySelector(`.board__tasks`);

renderComponent(board, createBoardFilter(), `afterbegin`);

//  Рендер первого набора задач
let editTaskData;
let firstInitTaskData;
[editTaskData, ...firstInitTaskData] = tasksData.slice(0, TASKS_PER_LOAD);
renderComponent(tasksBoard, createTaskEditForm(editTaskData));
renderComponent(tasksBoard, firstInitTaskData.map(createTaskCard).join(``));

//  Рендер кнопки загрузки
renderComponent(board, createLoadMoreButton());

let loadButton = board.querySelector(`.load-more`);

if (tasksData.length <= TASKS_PER_LOAD) {
  hideElement(loadButton);
} else {
  lastRenderTaskIndex = TASKS_PER_LOAD;
  loadButton.addEventListener(`click`, onLoadButtonClick);
}
