// Navbar Fixed
window.onscroll = function () {
  const header = document.querySelector('header');
  const fixedNav = header.offsetTop;

  if (window.pageYOffset > fixedNav) {
    header.classList.add("navbar-fixed");
  } else {
    header.classList.remove("navbar-fixed");
  }
};

// Hamburger
const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector('#nav-menu');

hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("hamburger-active");
  navMenu.classList.toggle('hidden');
});

const checkbox = document.querySelector('#toggle');
const html = document.querySelector('html');
const header = document.querySelector('header');

checkbox.addEventListener('click', function () {
  if (checkbox.checked) {
    html.classList.add('dark');
    header.classList.remove('navbar-fixed');
    header.classList.add('navbar-fixed-dark');
  } else {
    html.classList.remove('dark');
    header.classList.remove('navbar-fixed-dark');
    header.classList.add('navbar-fixed');
  }
});
