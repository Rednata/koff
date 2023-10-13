import Navigo from "navigo";
import { Order } from '../Order/Order';
import { Main } from '../Main/Main';
import { ProductList } from "../ProductList/ProductList";

export const routerFunc = (api, storageService) => {
  const router = new Navigo("/", { linksSelector: "a" });
  
  router
    .on("/", async () => {
      const products = await api.getProducts();
      console.log(products);
      new ProductList().mount(new Main().element, products, );
    },
    {
      leave(done, match) {
        console.log('leave');
        done();
      },
      already() {
        console.log('already');
      },
    }
    )
    .on('/category', () => {
      console.log("On category");
      new ProductList().mount(new Main().element, [1, 2, 3, 4, 5, 6], 'Category');
    }, {
      leave(done) {
        console.log('leave');
        done();
      }
    })
    .on('/favorite', () => {      
      new ProductList().mount(new Main().element, [1], 'Избранное');
    },  {
      leave(done) {
        console.log('leave');
        done();
      }
    })
    .on('/search', () => {
      console.log("On search");
    })
    .on('/cart', () => {
      console.log("On cart");
    })
    .on('/product/:id', (obj) => {
      console.log(obj);
      console.log(obj.data);
    })
    .on('/order', () => {
      console.log('On order');
      const order = new Order();
      const main = new Main();
      new Order().mount(new Main().element);                  

    })
    .notFound(() => {      
      new Main().element.innerHTML = `
        <h2>NOT FOUND</h2>
        <p>Через 5 секунд вы будете перенаправлены на <a> главную страницу</a></p>
      `
      setTimeout(() => {
        router.navigate('/');
      }, 5000)
    }, {
      leave(done) {
        console.log('leave');
        new Main().element.innerHTML = '';    
        done();        
      }
    })
  router.resolve()
};