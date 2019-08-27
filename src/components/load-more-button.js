import AbstractComponent from './abstract.js';


class LoadMoreBtn extends AbstractComponent {
  constructor() {
    super();
  }

  _getTemplate() {
    return `<button class="load-more" type="button">load more</button>`;
  }
}


export default LoadMoreBtn;
