import * as data from './data.js';
import {Position, createElement, render} from './utils/utils.js';
import Menu from './components/menu.js';
import Filters from './components/filters.js';
import {initTasksBoard} from './initialization.js';
import {getSearchTemplate} from './components/search.js';
import {createTasksBoard} from './components/tasks-board.js';


//  Рендер меню, поиска и его фильтров
const mainNode = document.querySelector(`main`);
const mainControlNode = mainNode.querySelector(`.control`);
render(mainControlNode, new Menu(data.menu).getElement(), Position.BEFOREEND);
render(mainNode, createElement(getSearchTemplate()), Position.BEFOREEND);
render(mainNode, new Filters(data.filters).getElement(), Position.BEFOREEND);

//  Рендер доски задач и его фильтров
render(mainNode, createElement(createTasksBoard()), Position.BEFOREEND);

const board = mainNode.querySelector(`.board`);
initTasksBoard(board);

