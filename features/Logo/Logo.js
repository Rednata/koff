import logoImg from '/img/logo.svg';

export class Logo {
  constructor(mainClassname) {
    this.mainClassname = mainClassname;

  }

  create() {
    const logo = document.createElement('a');
    logo.classList.add(`${this.mainClassname}__link-logo`);
    logo.href = '/';
  
    const imgLogo = new Image();
    imgLogo.src = logoImg;
    imgLogo.className = `${this.mainClassname}__logo`;
    imgLogo.alt = 'Логотип мебельного маркета Koff';
  
    logo.append(imgLogo)
    
    return logo;
  }
}

