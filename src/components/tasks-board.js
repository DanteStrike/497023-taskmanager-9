import AbstractComponent from './abstract.js';


class TasksBoard extends AbstractComponent {
  constructor() {
    super();
  }

  _getTemplate() {
    return `<section class="board container">
              <div class="board__tasks">
              </div>
            <section>`;
  }
}


export default TasksBoard;
