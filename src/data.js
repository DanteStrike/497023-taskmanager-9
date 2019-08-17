const TASK_DESCRIPTIONS = [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`];
const MINUTES_IN_DAY = 60;
const HOURS_IN_DAY = 24;
const MILLISECONDS_IN_MINUTE = 1000 * 60;
const MILLISECONDS_IN_HOUR = 1000 * 60 * 60;
const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24;
const AVAILABLE_DATA_PERIOD = {
  past: -7,
  future: 7
};
const TAGS_COUNT = {
  min: 0,
  max: 3
};
const AVAILABLE_TAGS = new Set([`homework`, `theory`, `practice`, `intensive`, `keks`, `flex`, `JS`]);
const AVAILABLE_COLORS = new Set([`black`, `yellow`, `blue`, `green`, `pink`]);
const MONTH_NAMES = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];
const AVAILABLE_FILTERS = new Set([`All`, `Overdue`, `Today`, `Favorites`, `Repeating`, `Tags`, `Archive`]);
/**
 * Возвращает случайный элемент любого массивоподобного объекта.
 *
 * @param {iterable} iterable - итерируемый объект.
 * @return {any} Случайный элемент.
 */
const getIterableRandomElement = (iterable) => Array.from(iterable)[Math.floor(Math.random() * Array.from(iterable).length)];

/**
 * Возвращает случайное логическое значение.
 *
 * @return {boolean} True or False.
 */
const getRandomFlag = () => Math.round(Math.random()) ? true : false;

/**
 * Возвращает случайную дату в указанном промежутке времени с точностью до минут.
 *
 * @param {number} past - нижняя граница разрешенного промежутка.
 * @param {number} future - верхняя граница разрешенного промежутка.
 * @return {number} Случайная дата в миллисекундах.
 */
const getRandomData = (past = 0, future = 0) => {
  if (future < past) {
    throw new Error(`ArgError: "future"=${future} cant be less than "past"=${past}`);
  }

  return Date.now()
  + (Math.round(Math.random() * past) + Math.floor(Math.random() * future)) * MILLISECONDS_IN_DAY
  + Math.floor(Math.random() * HOURS_IN_DAY) * MILLISECONDS_IN_HOUR
  + Math.floor(Math.random() * MINUTES_IN_DAY) * MILLISECONDS_IN_MINUTE;
};

/**
 * Перетасовывает значения полученного массива в случайном порядке.
 *
 * @param {array} array - исходный массив.
 * @return {array} Перетасованный массив.
 */
const shuffleArray = (array) => array.forEach((element, index, arr) => {
  let randomIndex = Math.floor(Math.random() * (arr.length));
  [arr[randomIndex], arr[index]] = [arr[index], arr[randomIndex]];
});

/**
 * Возвращает случайную последовательность случайной длинны на базе исходной.
 *
 * @param {set} set - исходная последовательность.
 * @param {number} minSize - минимальная возможная длинна последовательности.
 * @param {number} maxSize - максимальная возможная длинна последовательности.
 * @return {set} Новая последовательность.
 */
const getRandomSet = (set, minSize = 0, maxSize = 0) => {
  if (maxSize < minSize) {
    throw new Error(`ArgError: "maxSize" = ${maxSize} cant be less than "minSize" = ${minSize}`);
  }

  const newSize = Math.round(Math.random() * maxSize) + minSize;
  let newSet = Array.from(set);
  shuffleArray(newSet);
  newSet.length = newSize;
  return new Set(newSet);
};
//  Создать экземпляр данных для задачи
const getTaskData = () => ({
  description: getIterableRandomElement(TASK_DESCRIPTIONS),
  dueDate: getRandomData(AVAILABLE_DATA_PERIOD.past, AVAILABLE_DATA_PERIOD.future),
  repeatingDays: {
    'mo': getRandomFlag(),
    'tu': getRandomFlag(),
    'we': getRandomFlag(),
    'th': getRandomFlag(),
    'fr': getRandomFlag(),
    'sa': getRandomFlag(),
    'su': getRandomFlag()
  },
  get isRepeating() {
    return Object.keys(this.repeatingDays).some((day) => this.repeatingDays[day]);
  },
  tags: getRandomSet(AVAILABLE_TAGS, TAGS_COUNT.min, TAGS_COUNT.max),
  color: getIterableRandomElement(AVAILABLE_COLORS),
  isFavorite: getRandomFlag(),
  isArchive: getRandomFlag()
});

//  Создать экземпляр данных для фильтра
const getFilter = (element, index = 0) => ({
  title: Array.from(AVAILABLE_FILTERS)[index],
  count: 0
});

let tasksData = new Array(TASKS_COUNT)
  .fill(``)
  .map(getTaskData);

let filtersData = new Array(AVAILABLE_FILTERS.size)
  .fill(``)
  .map(getFilter)
  });

export {tasksData, filtersData, MONTH_NAMES};
