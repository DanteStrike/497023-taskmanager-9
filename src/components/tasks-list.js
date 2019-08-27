import AbstractComponent from './abstract.js';


class TasksList extends AbstractComponent {
  constructor() {
    super();
  }

  _getTemplate() {
    return `<div class="board__tasks"></div>`;
  }
}


export default TasksList;
