import { addContainer } from "../addContainer";

export class ProductList {
  static instance = null;

  constructor() {
    if (!ProductList.instance) {
      ProductList.instance = this;
      this.element = document.createElement('section');
      this.containerElement = addContainer(this.element);
      this.isMounted = false;
      
      this.addEvents();
    };
    
    return ProductList.instance
  }

  mount(parent, data, title) {    
    this.containerElement.textContent = '';

    const titleElement = document.createElement('h2');
    titleElement.textContent = title ? title : "Список товаров";
    titleElement.className = title ? "goods__title" : "goods__title visually-hidden";

    this.containerElement.append(titleElement);
    this.updateListElem(data, titleElement)

    if (this.isMounted) {
      return;
    }
    
    parent.append(this.element);
    this.isMounted = true;
  }

  unMount() {
    this.element.remove();
    this.isMounted = false;
  }

  addEvents() {

  }

  updateListElem(data = []) {    
    const listElem = document.createElement('ul');
    listElem.classList.add('goods__list');

    const listItems = data.map(item => {
      const listItemElem = document.createElement('li');
      listItemElem.innerHTML = this.getHTMLTemplateListItem(item);
      return listItemElem;
    })
    
    listElem.append(...listItems)

    this.containerElement.append(listElem)
  }

  getHTMLTemplateListItem(item) {
    return `
      <article class="goods__card card">
        <a  class="card__link card__link_img" href="/product/123">
          <img class="card__img" src="/img/photo.jpg" alt="Кресло с подлокотниками">
        </a>

        <div class="card__info">
          <h3 class="card__title">
            <a class="card__link" href="/product/123">
              Кресло с подлокотниками
            </a>
          </h3>                  
          <p class="card__price">${item}&nbsp;000&nbsp;₽</p>
        </div>                

        <button class="card__btn">В корзину</button>

        <button class="card__favorite">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8.41334 13.8733C8.18667 13.9533 7.81334 13.9533 7.58667 13.8733C5.65334 13.2133 1.33334 10.46 1.33334 5.79332C1.33334 3.73332 2.99334 2.06665 5.04 2.06665C6.25334 2.06665 7.32667 2.65332 8 3.55998C8.67334 2.65332 9.75334 2.06665 10.96 2.06665C13.0067 2.06665 14.6667 3.73332 14.6667 5.79332C14.6667 10.46 10.3467 13.2133 8.41334 13.8733Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </article>
    `;
  }
};
