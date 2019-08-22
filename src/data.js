import {getRandomNumber, getRandomElement, getRandomFlag, getRandomData, shuffle} from './utils/utils.js';
import calcTasksAmount from './utils/calcTasksAmount.js';
import {taskConfig, tasksConfig} from './config.js';


const tasksData = {
  descriptions: [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`],
  tags: new Set([`homework`, `theory`, `practice`, `intensive`, `keks`, `flex`, `JS`]),
  colors: new Set([`black`, `yellow`, `blue`, `green`, `pink`])
};

const filtersData = {
  titles: new Set([`All`, `Overdue`, `Today`, `Favorites`, `Repeating`, `Tags`, `Archive`])
};

const menuData = {
  titles: new Set([`+ Add new task`, `Tasks`, `Statistics`])
};


//  Создать экземпляр данных для задачи
const getTask = (data, config) => ({
  description: getRandomElement(data.description),
  dueDate: getRandomData(config.past, config.future),
  repeatingDays: {
    'mo': getRandomFlag(),
    'tu': getRandomFlag(),
    'we': getRandomFlag(),
    'th': getRandomFlag(),
    'fr': getRandomFlag(),
    'sa': getRandomFlag(),
    'su': getRandomFlag()
  },
  tags: shuffle(data.tags)
    .slice(0, getRandomNumber(config.tags.minAmount, config.tags.maxAmount)),
  color: getRandomElement(data.colors),
  isFavorite: getRandomFlag(),
  isArchive: getRandomFlag(),

  get isRepeating() {
    return Object.keys(this.repeatingDays).some((day) => this.repeatingDays[day]);
  }
});
const tasksList = new Array(getRandomNumber(tasksConfig.minAmount, tasksConfig.maxAmount))
  .fill(``)
  .map(getTask(tasksData, taskConfig));

//  Создать экземпляр данных для фильтра
const getFilter = (title, index, tasks) => ({
  title,
  count: calcTasksAmount(tasks),
  isActive: (index === 0) ? true : false
});
const filters = new Array(filtersData.titles.size)
  .fill(``)
  .map((element, index) => {
    const title = Array.from(filtersData.titles)[index];
    return getFilter(title, index, tasksList);
  });

const getMenuItem = (title, index) => {
  return {
    title,
    isActive: (index === 0) ? true : false
  };
};
const menu = menuData.titles.map((title, index) => getMenuItem(title, index));

export {tasksList, filters, menu};
