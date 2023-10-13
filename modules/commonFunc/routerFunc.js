import Navigo from "navigo";
import { Order } from '../Order/Order';
import { Main } from '../Main/Main';
import { Catalog } from "../Catalog/Catalog";
import { ProductList } from "../ProductList/ProductList";
import { Error } from "../Error/Error";

export const routerFunc = (api, storageService) => {
  const router = new Navigo("/", { linksSelector: "a" });
  
  // api.getProductCategories()
  //   .then(data => {
  //     new Catalog().mount( new Main().element, data );      
  //     console.log('data: ', data);
  //     router.updatePageLinks();
  //   })

  router
    .on("/", async () => {      
      const productCategories = await api.getProductCategories();
      new Catalog().mount( new Main().element, productCategories );      

      const products = await api.getProducts();                  
      new ProductList().mount(new Main().element, products, );

      router.updatePageLinks();
    },
    {
      leave(done) {
        new ProductList().unMount();        
        done();
      },
      already() {
        console.log('already');
      },
    }
    )
    .on('/category', async({params: {slug}}) => {
      const productCategories = await api.getProductCategories();
      new Catalog().mount( new Main().element, productCategories ); 

      const products = await api.getProducts();
      new ProductList().mount(new Main().element, products, slug);
      router.updatePageLinks();
    }, {
      leave(done) {
        new ProductList().unMount();
        console.log('leave');
        done();
      }
    })
    .on('/favorite', async() => {      
      const productCategories = await api.getProductCategories();
      new Catalog().mount( new Main().element, productCategories ); 

      const products = await api.getProducts();
      new ProductList().mount(new Main().element, products, 'Избранное');
      router.updatePageLinks();
    },  {
      leave(done) {
        new ProductList().unMount();
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
    .on('/product/:id', async({data: {id} }) => {
      const productCategories = await api.getProductCategories();
      new Catalog().mount( new Main().element, productCategories ); 
      router.updatePageLinks();
      console.log(id);
      const temp = await api.getProductByID(id)
      console.log(temp);

    }, {
      leave(done) {        
        done();
      }
    })
    .on('/order', () => {
      console.log('On order');
      const order = new Order();
      const main = new Main();
      new Order().mount(new Main().element);                  

    })
    .notFound(() => {      
      console.log(new Main());
      new Error().mount();
      // new Main().element.innerHTML = `
      //   <h2>NOT FOUND</h2>
      //   <p>Через 5 секунд вы будете перенаправлены на <a> главную страницу</a></p>
      // `
      setTimeout(() => {
        router.navigate('/');
      }, 5000)
    }, {
      before(done) {
        new Catalog().unMount();
        done();
      },
      leave(done) {
        console.log('leave');
        new Error().unMount();  
        done();        
      }
    })
  router.resolve()
};