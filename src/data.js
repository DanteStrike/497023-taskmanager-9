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
