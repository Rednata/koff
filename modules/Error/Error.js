
export class Error {
  static instance = null;

  constructor() {
    if (!Error.instance) {
      Error.instance = this;
      this.element = document.createElement('div');      
      this.element.classList.add('error')      ;
      this.isMounted = false;
    };
    
    return Error.instance
  }
  mount() {
    if (this.isMounted) {
      return;
    }

    this.renderPageError();
    
    document.body.append(this.element);
    this.isMounted = true;
  }

  unMount() {
    this.element.remove();
    this.isMounted = false;
  }

  renderPageError() {
    this.element.insertAdjacentHTML('afterbegin',
    `
      <p>Страница не найдена	&#128577;</p>
      <p>Через 5 секунд вы будете перенаправлены на&nbsp;<a class="error__link" href='/'>&nbsp;главную&nbsp;страницу</a></p>
    `
    )
  }
};