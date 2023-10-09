import Navigo from "navigo";

export const routerFunc = () => {
  const router = new Navigo("/", { linksSelector: "a" });

  router
    .on("/", () => {
      console.log("On main");
    })
    .on('/category', (obj) => {
      console.log("On category");
      console.log('obj: ', obj);
    })
    .on('/favorite', () => {      
      console.log("On favorite");      
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
    })
    .notFound(() => {
      document.body.innerHTML = '<h2>NOT FOUND</h2>'
    })
  router.resolve()
};