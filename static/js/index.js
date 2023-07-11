const root = document.querySelector('html');
const body = document.querySelector('body');
const mainNav = document.querySelector("nav");
const menu = document.querySelector('.nav-links');
const menuButton = document.getElementById('menu-display');
const themeDisplay = document.getElementById('theme-display');
const themeContainer = document.querySelector('.theme-container');
const themeSelectors = document.getElementsByClassName('theme-select');

mainNav.classList.add('js-nav');

const getTheme = () => {
  const theme = localStorage.getItem('theme');
  theme && setActiveSelector(theme);
  root.className = theme;
  const shade = getComputedStyle(document.documentElement).getPropertyValue('--shade-100');
  document.querySelector('meta[name="theme-color"]').setAttribute('content', shade);
}

const setTheme = (className) => {
  var root = document.getElementsByTagName('html')[0];
  root.className = className;
  localStorage.setItem('theme', className);
  const shade = getComputedStyle(document.documentElement).getPropertyValue('--shade-100');
  document.querySelector('meta[name="theme-color"]').setAttribute('content', shade);
  setActiveSelector(className);
}

const setActiveSelector = (className) => {
  var selectedTheme = document.getElementById(`${className}-select`);
  [...themeSelectors].forEach(item => {
    item.classList.remove('active')
  });
  selectedTheme.classList.add('active');
  hideThemeContainer();
}

const showThemeContainer = () => {
  themeContainer.classList.add('visible');
  [...themeSelectors].forEach(item => {
    item.tabIndex = 0
  });
}

const hideThemeContainer = () => {
  themeContainer.classList.remove('visible');
  [...themeSelectors].forEach(item => {
    item.tabIndex = -1
  });
}

const showMenu = () => {
  menu.classList.add('visible');
  menuButton.classList.add('active');
}

const hideMenu = () => {
  menu.classList.remove('visible');
  menuButton.classList.remove('active');
}

let previousScrollPosition = 0;

const isScrollingDown = () => {
  let scrolledPosition = window.scrollY;
  let isScrollDown;

  if (scrolledPosition > previousScrollPosition) {
    isScrollDown = true;
  } else {
    isScrollDown = false;
  }
  previousScrollPosition = scrolledPosition;
  return isScrollDown;
}

const handleNavScroll = () => {
  if (mainNav.classList.contains('visible')) {
    if (isScrollingDown()) {
      mainNav.classList.add('scroll-down');
      mainNav.classList.remove('scroll-up')
    } else {
      mainNav.classList.add('scroll-up');
      mainNav.classList.remove('scroll-down')
    }
  } else {
    mainNav.classList.remove('scroll-up');
    mainNav.classList.remove('scroll-down')
  }
}

getTheme();

themeDisplay.addEventListener("click", function () {
  hideMenu()
  if (themeContainer.classList.contains('visible')) {
    hideThemeContainer();
  } else {
    showThemeContainer();
  }
})

menuButton.addEventListener("click", function () {
  hideThemeContainer();
  if (menu.classList.contains('visible')) {
    hideMenu();
  } else {
    showMenu();
  }
})

menu.addEventListener("click", function () {
  hideThemeContainer();
  hideMenu()
})

window.addEventListener('scroll', () => {
  handleNavScroll()
})

// LANDING PAGE
const header = document.querySelector("header");
const fixedHeader = document.querySelector(".fixed-header");
const main = document.querySelector("main");
const nav = document.querySelector("nav");
const scrollButton = document.querySelector(".scroll-button");
const topOfMain = main.getBoundingClientRect().top;
const scrollElements = document.querySelectorAll('.scroll-in');
const projects = document.querySelectorAll('.project')

header.classList.add('js-fixed');
scrollElements.forEach((el) => {
  el.classList.add('js-opacity');
})

const elementInViewport = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;
  return (elementTop <= ((window.innerHeight || document.documentElement.clientHeight) / dividend))
}

const elementOutofView = (el) => {
  const elementTop = el.getBoundingClientRect().top;
  return (elementTop > (window.innerHeight || document.documentElement.clientHeight))
}

const handleHeaderScroll = () => {
  const headerBottomOffset = header.getBoundingClientRect().bottom;
  if (headerBottomOffset <= fixedHeader.clientHeight) {
    fixedHeader.classList.add('scrolled');
  } else {
    fixedHeader.classList.remove('scrolled');
  }
}

const handleVisibleNav = () => {
  if (elementInViewport(nav)) {
    nav.classList.add('visible');
    nav.classList.remove('hidden');
  } else if (nav.classList.contains('visible') && !elementInViewport(nav)) {
    nav.classList.remove('visible');
    nav.classList.add('hidden');
  }
}

const displayScrollElement = (element) => {
  element.classList.add('scrolled')
}

const hideScrollElement = (element) => {
  element.classList.remove('scrolled')
}

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInViewport(el, 1.25)) {
      displayScrollElement(el);
    } else if (elementOutofView(el)) {
      hideScrollElement(el)
    }
  })
}

projects.forEach((el) => {
  el.addEventListener('click', () => {
    if (el.classList.contains('active')) {
      el.classList.remove('active')
    } else {
      el.classList.add('active')
    }
  })
})

var throttleTimer;

const throttle = (callback, time) => {
  if (throttleTimer) return;

  throttleTimer = true;
  setTimeout(() => {
    callback();
    throttleTimer = false;
  }, time);
}

scrollButton.addEventListener("click", function () {
  window.scroll({ top: topOfMain, behavior: "smooth" });
})

const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

window.addEventListener("scroll", () => {
  handleHeaderScroll();
  handleVisibleNav();
  if (mediaQuery && !mediaQuery.matches) {
    throttle(handleScrollAnimation, 250)
  }
});


const openDetails = () => {
  if (!!window.location.hash) {
    const details = document.querySelector(`${window.location.hash} details`)
    details.open = true;
  }
}

openDetails();
window.addEventListener("hashchange", openDetails);

// CONTACT FORM
window.onload = function() {
  document.getElementById('contact-form').addEventListener('submit', function(event) {
      event.preventDefault();
      // generate a five digit number for the contact_number variable
      this.contact_number.value = Math.random() * 100000 | 0;
      // these IDs from the previous steps
      successMessage()
      emailjs.sendForm('contact_service', 'contact_form', this)
  });
}

const display = document.querySelector(".modal_container");
const continuebtn = document.querySelector(".success button");
const input = document.querySelectorAll(".form-input");
const input2 = document.querySelector(".two");
const email = document.querySelector(".user-email");

function successMessage() {
  display.classList.remove("hidden");
  email.innerHTML = input2.value
}

function continueButton() {
  display.classList.add("hidden")
  resetInput()
}

function resetInput() {
  let i;
  for (i = 0; i < input.length; i++) {
    input[i].value = "";
  }
}

continuebtn.addEventListener("click", continueButton);

