import 'normalize.css';
import './style.scss';
import { routerFunc } from './modules/commonFunc/routerFunc';
import { Header } from './modules/Header/Header';
import { Main } from './modules/Main/Main';
import { Footer } from './modules/Footer/Footer';
import { productSlider } from './modules/commonFunc/sliderFunc';
import { ApiService } from './services/ApiService';

const init = () => {
  const api = new ApiService();  
  
  new Header().mount();  
  new Main().mount();
  new Footer().mount();
  productSlider();  
  routerFunc(api);  
};

init();
