const showNavMenu = function(){
    const menu = document.querySelector('.nav-links');
    menu.classList.toggle('nav-links--open');
}

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    hamburger.addEventListener('click', showNavMenu);
});