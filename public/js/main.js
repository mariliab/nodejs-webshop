const backdrop = document.querySelector('.backdrop');
const closeBtn = document.querySelector('#mobile-menu-close-button');
const mobileNav = document.querySelector('.mobile-main-header-nav');
const menuToggle = document.querySelector('#mobile-menu-toggle-button');

function backdropClickHandler() {
    closeBtn.style.display = 'none';
    mobileNav.classList.remove('display');
    console.log("Stäng meny")
}

function menuToggleClickHandler() {
    closeBtn.style.display = 'block';
    mobileNav.classList.add('display');
    console.log("Öppna meny")
}

menuToggle.addEventListener('click', menuToggleClickHandler);
closeBtn.addEventListener('click', backdropClickHandler);