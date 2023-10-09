import { addContainer } from "../addContainer";

export class Order {

  static instance = null;

  constructor() {
    if (!Order.instance) {
      Order.instance = this;

      this.element = document.createElement('section');
      this.element.className = 'order';
      this.containerElement = addContainer(this.element, 'order__container');
      this.isMounted = false;
    };

    return Order.instance;    
  }

  mount(parent) {
    if (this.isMounted) {
      return;
    }

    this.containerElement.insertAdjacentHTML('afterbegin', this.getHTML());    

    parent.append(this.element);

    document.body.append(parent);
    this.isMounted = true;
  }

  unMount() {
    this.element.remove();
    this.isMounted = false;
  }

  getHTML() {
    return `
      <div class="order__wrap">
        <div class="order__info">            
          <h3 class="order__title">Заказ успешно размещен</h3>
          <p class="order__price">20&nbsp;000&nbsp;₽</p>
          <p class="order__article">№43435</p>
        </div>
        
        <div class="order__delivery">
          <p class="order__delivery-title">Данные доставки</p>
          <ul class="order__list">
            <li class="order__item">
              <p class="order__item-name">Получатель</p>
              <p class="order__item-mean">Иванов Петр Александрович</p>
            </li>
            <li class="order__item">
              <p class="order__item-name">Телефон</p>
              <p class="order__item-mean">+7 (737) 346 23 00</p>
            </li>
            <li class="order__item">
              <p class="order__item-name">E-mail</p>
              <p class="order__item-mean">Ivanov84@gmail.com</p>
            </li>
            <li class="order__item">
              <p class="order__item-name">Адрес доставки</p>
              <p class="order__item-mean">Москва, ул. Ленина, 21, кв. 33</p>
            </li>
            <li class="order__item">
              <p class="order__item-name">Способ оплаты</p>
              <p class="order__item-mean">Картой при получении</p>
            </li>
            <li class="order__item">
              <p class="order__item-name">Способ получения</p>
              <p class="order__item-mean">Доставка</p>
            </li>
          </ul>
        </div>

        <a class="order__link" href="/">На главную</a>

      </div>  
    `
  }
}