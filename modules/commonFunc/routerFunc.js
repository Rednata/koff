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
      const data = {data: products}            
      new ProductList().mount(new Main().element, data, );

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
      
      const data = await api.getProducts(1, 12, [], slug);

      new ProductList().mount(new Main().element, data, slug);
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
      const data = {data: products}  
      new ProductList().mount(new Main().element, data, 'Избранное');
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
      new Error().mount();      
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