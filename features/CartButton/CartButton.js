export class CartButton {
  constructor(className, text) {
    this.className = className;
    this.text = text;
  }

  create(id) {    
    const button = document.createElement('button');
    button.classList.add(this.className);
    button.textContent = this.text;
    button.dataset.id = id;

    button.addEventListener('click', () => {
      console.log('Добавить товар в корзину');
    })
    return button
  }
}