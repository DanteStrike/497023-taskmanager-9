import * as data from './data.js';
import {Position, render} from './utils/utils.js';
import Menu from './components/menu.js';
import Filters from './components/filters.js';
import Search from './components/search.js';
import BoardController from './controllers/board-controller.js';


//  Рендер меню, поиска и его фильтров
const mainNode = document.querySelector(`main`);
const mainControlNode = mainNode.querySelector(`.control`);
render(mainControlNode, new Menu(data.menu).getElement(), Position.BEFOREEND);
render(mainNode, new Search().getElement(), Position.BEFOREEND);
render(mainNode, new Filters(data.filters).getElement(), Position.BEFOREEND);

const newBoardController = new BoardController(mainNode, data.tasksList);
newBoardController.init();

