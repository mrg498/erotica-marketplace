const showNavMenu = function(){
    //slide menu in
    const menu = document.querySelector('.nav-links');
    menu.classList.toggle('nav-links--open');
    //hamburger animation
    this.classList.toggle("is-active");
    
}

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    hamburger.addEventListener('click', showNavMenu);
});