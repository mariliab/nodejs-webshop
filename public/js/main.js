const backdrop = document.querySelector('.backdrop');
const mobileNav = document.querySelector('.mobile-main-header-nav');
const menuToggle = document.querySelector('#mobile-menu-toggle-button');

function backdropClickHandler() {
    closeBtn.style.display = 'none';
    mobileNav.classList.remove('display');
    console.log("Stäng meny")
}

function menuToggleClickHandler() {
    if (mobileNav.classList.contains('display')) {
        mobileNav.classList.remove('display');
        console.log("Stäng meny");
    } else {
        mobileNav.classList.add('display');
        console.log("Öppna meny");
    }

}

menuToggle.addEventListener('click', menuToggleClickHandler);

let dropdown = document.querySelector('.dropdown');

dropdown.addEventListener('click', (e) => {
  if (dropdown.classList.contains('closed')) {
    dropdown.classList.remove('closed');
  } else {
    dropdown.classList.add('closed');    
  }
})