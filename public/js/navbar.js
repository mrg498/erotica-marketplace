

const showNavMenu = function(){
    //slide menu in
    const menu = document.querySelector('.nav-links');
    if(menu.classList.contains('nav-links--open')){
        menu.classList.add('nav-links--close');
        menu.classList.remove('nav-links--open');
    }
    else{
       menu.classList.add('nav-links--open');
       menu.classList.remove('nav-links--close');
    }
    //hamburger animation
    this.classList.toggle("is-active");
    
}

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    hamburger.addEventListener('click', showNavMenu);
});