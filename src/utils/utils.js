export const TimeValue = {
  MILLISECONDS_IN_SECOND: 1000,
  SECONDS_IN_MINUTE: 60,
  MINUTES_IN_HOUR: 60,
  HOURS_IN_DAY: 24,
  MILLISECONDS_IN_MINUTE: 1000 * 60,
  MILLISECONDS_IN_HOUR: 1000 * 60 * 60,
  MILLISECONDS_IN_DAY: 1000 * 60 * 60 * 24,
  MONTHS_NAMES: [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`]
};

export const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

// export const Key = {
//   ESCAPE: new Set([`Escape`, `Esc`]),
// };


/**
 * Возвращает случайный число в заданном диапазоне.
 *
 * @param {number} min - нижняя граница диапазона.
 * @param {number} max - верхняя граница диапазона.
 * @return {number} Случайный число.
 */
export const getRandomNumber = (min, max) => {
  if (min > max) {
    throw new Error(`ArgError: "max" = ${max} cant be less than "min" = ${min}`);
  }

  return Math.round(Math.random() * (max - min)) + min;
};

/**
 * Возвращает случайный элемент любого массивоподобного объекта.
 *
 * @param {iterable} iterableObject - итерируемый объект.
 * @return {any} Случайный элемент.
 */
export const getRandomElement = (iterableObject) => Array.from(iterableObject)[getRandomNumber(0, Array.from(iterableObject).length - 1)];

/**
 * Возвращает случайное логическое значение.
 *
 * @return {boolean} True or False.
 */
export const getRandomFlag = () => getRandomNumber(0, 1) ? true : false;

/**
 * Возвращает случайную дату в указанном промежутке времени с точностью до минут.
 *
 * @param {number} past - нижняя граница разрешенного промежутка.
 * @param {number} future - верхняя граница разрешенного промежутка.
 * @return {number} Случайная дата в миллисекундах.
 */
export const getRandomData = (past = 0, future = 0) => {
  return Date.now()
  + getRandomNumber(past, future - 1) * TimeValue.MILLISECONDS_IN_DAY
  + getRandomNumber(0, TimeValue.HOURS_IN_DAY - 1) * TimeValue.MILLISECONDS_IN_HOUR
  + getRandomNumber(0, TimeValue.MINUTES_IN_HOUR - 1) * TimeValue.MILLISECONDS_IN_MINUTE;
};

/**
 * Возвращает новый массив, перетасовывая значения итерируемый объекта в случайном порядке.
 *
 * @param {iterable} iterableObject - итерируемый объект.
 * @return {array} Перетасованный массив.
 */
export const shuffle = (iterableObject) => {
  let newArray = Array.from(iterableObject);
  newArray.forEach((element, index, arr) => {
    let randomIndex = getRandomNumber(0, arr.length - 1);
    [arr[randomIndex], arr[index]] = [arr[index], arr[randomIndex]];
  });
  return newArray;
};

/**
 * Возвращает DOM на основе разметки.
 *
 * @param {string} template - разметка.
 * @return {node} DOM разметки.
 */
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

/**
 * Скрыть DOM-элемент.
 *
 * @param {node} element - разметка.
 */
export const hideElement = (element) => {
  element.style.display = `none`;
};

/**
 * Показать DOM-элемент.
 *
 * @param {node} element - разметка.
 */
export const showElement = (element) => {
  element.style.display = ``;
};

/**
 * Вставляет элемент в определенную позицию контейнера.
 *
 * @param {node} container - контейнер.
 * @param {node} element - элемент.
 * @param {Position} place - позиция.
 */
export const render = (container, element, place) => {
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      container.append(element);
      break;
  }
};

/**
 * Удалить DOM-элемент.
 *
 * @param {node} element - элемент.
 */
export const unrender = (element) => {
  if (element) {
    element.remove();
  }
};

