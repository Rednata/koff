import { likeSvg } from "../likeSvg/likeSvg";
import { FavoriteService } from "../../services/StorageService";

export class LikeButton {
  constructor(className) {
    this.className = className;
    this.favoriteService = new FavoriteService();
  }

  create(id) {
    const button = document.createElement('button');
    button.classList.add(this.className);   
    button.dataset.id = id;

    if (this.favoriteService.check(id)) {
      button.classList.add(`${this.className}_active`)
    }

    button.addEventListener('click', () => {
      console.log('Добавить товар в избранное');

      if (this.favoriteService.check(id)) {        
        this.favoriteService.remove(id)
        button.classList.remove(`${this.className}_active`)
      } else {
        this.favoriteService.add(id);
        button.classList.add(`${this.className}_active`)
      }
      
      
    })

    likeSvg().then((svg) => button.append(svg));

    return button
  }
}