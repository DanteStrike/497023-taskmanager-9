import {getMenuTemplate} from './components/menu.js';
import {getSearchTemplate} from './components/search.js';
import {createFiltersTemplate} from './components/filters.js';
import {createTasksBoard} from './components/tasks-board.js';
import {createBoardFilter} from './components/board-filter.js';
import {createTaskCard} from './components/task.js';
import {createTaskEditForm} from './components/task-edit.js';
import {createLoadMoreButton} from './components/load-more-button.js';
};

const mainNode = document.querySelector(`main`);
const mainControl = mainNode.querySelector(`.control`);

renderComponent(mainControl, templates.getMenu());
renderComponent(mainNode, templates.getSearch());
renderComponent(mainNode, templates.getFilters());
renderComponent(mainNode, templates.getTasksBoard());

const board = mainNode.querySelector(`.board`);
const tasksBoard = board.querySelector(`.board__tasks`);

renderComponent(tasksBoard, templates.getCardForm(`yellow`));
renderComponent(tasksBoard, templates.getTaskCard(`black`));
renderComponent(tasksBoard, templates.getTaskCard(`blue`));
renderComponent(tasksBoard, templates.getTaskCard(`yellow`));
renderComponent(board, templates.getLoadButton());
