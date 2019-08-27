import AbstractComponent from './abstract.js';


class TasksBoard extends AbstractComponent {
  constructor() {
    super();
  }

  _getTemplate() {
    return `<section class="board container"></section>`;
  }
}


export default TasksBoard;
