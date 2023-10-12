import 'normalize.css';
import './style.scss';
import { routerFunc } from './modules/commonFunc/routerFunc';
import { Header } from './modules/Header/Header';
import { Main } from './modules/Main/Main';
import { Footer } from './modules/Footer/Footer';
import { productSlider } from './modules/commonFunc/sliderFunc';




const init = () => {
  productSlider();  
  const header = new Header();
  header.mount();  
  const main = new Main();
  main.mount();
  const footer = new Footer();
  footer.mount();
  routerFunc();  
};

init();
