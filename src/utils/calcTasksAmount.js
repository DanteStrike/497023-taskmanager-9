import {TimeValue} from './utils.js';


/**
 * Рассчитать кол-во задач, рассчитанных ранее, удовлетворяющих заданному фильтру.
 *
 * @param {object} filterName - текущий фильтр.
 * @param {object[]} tasks - список данных всех задач.
 * @return {number} Число задач удовлетворяющих заданному фильтру.
 */
const calcTasksAmount = (filterName, tasks) => {
  let count = 0;

  switch (filterName) {
    case `All`:
      count = tasks.length;
      break;

    case `Overdue`:
      let currentDate = Date.now();
      //  Точность до минуты
      count = tasks.filter((task) => (task.dueDate - currentDate) <= TimeValue.MILLISECONDS_IN_MINUTE).length;
      break;

    case `Today`:
      let currentDay = new Date().getDate();
      count = tasks.filter((task) => new Date(task.dueDate).getDate() === currentDay).length;
      break;

    case `Favorites`:
      count = tasks.filter((task) => task.isFavorite).length;
      break;

    case `Repeating`:
      count = tasks.filter((task) => task.isRepeating).length;
      break;

    case `Tags`:
      count = tasks.filter((task) => task.tags.size > 0).length;
      break;

    case `Archive`:
      count = tasks.filter((task) => task.isArchive).length;
      break;
  }

  return count;
};


export default calcTasksAmount;
