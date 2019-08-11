import {getMenuTemplate} from './components/menu.js';
import {getSearchTemplate} from './components/search.js';
import {createFiltersTemplate} from './components/filters.js';
import {createTasksBoard} from './components/tasks-board.js';
import {createBoardFilter} from './components/board-filter.js';
import {createTaskCard} from './components/task.js';
import {createTaskEditForm} from './components/task-edit.js';
import {createLoadMoreButton} from './components/load-more-button.js';

const renderComponent = (node, markup, position = `beforeend`) => {
  node.insertAdjacentHTML(position, markup);
};

const mainNode = document.querySelector(`main`);
const mainControl = mainNode.querySelector(`.control`);

renderComponent(mainControl, getMenuTemplate());
renderComponent(mainNode, getSearchTemplate());
renderComponent(mainNode, createFiltersTemplate());
renderComponent(mainNode, createTasksBoard());

const board = mainNode.querySelector(`.board`);
const tasksBoard = board.querySelector(`.board__tasks`);

renderComponent(board, createBoardFilter(), `afterbegin`);
renderComponent(tasksBoard, createTaskEditForm(`yellow`));

[`black`, `blue`, `yellow`].map((color) => renderComponent(tasksBoard, createTaskCard(color)));

renderComponent(board, createLoadMoreButton());
