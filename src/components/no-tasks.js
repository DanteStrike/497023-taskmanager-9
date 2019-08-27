import AbstractComponent from './abstract.js';


class NoTasks extends AbstractComponent {
  constructor() {
    super();
  }

  _getTemplate() {
    return `<p class="board__no-tasks">
              Congratulations, all tasks were completed! To create a new click on
              «add new task» button.
            </p>`;
  }
}


export default NoTasks;
