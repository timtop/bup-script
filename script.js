// Lenis animation begins
const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
//Lenis animation ends

// Showing and hiding navigation
const menus = document.querySelectorAll("#menu");
const fullNav = document.querySelector("#openedNav");

let isNavOpened = false;

menus.forEach((menu) => {
  menu.addEventListener("click", () => {
    if (!isNavOpened) {
      fullNav.style.display = "flex";
      isNavOpened = true;
    } else {
      fullNav.style.display = "none";
      isNavOpened = false;
    }
  });
});

// Navbar animation begins
const navbar = document.querySelector("#nav");
const heroHeight = document.querySelector(".hero").offsetHeight;

let lastScrollY = window.scrollY;
let navbarVisible = false;

function showNavbar() {
  if (!navbarVisible) {
    gsap.to(navbar, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" });
    navbarVisible = true;
  }
}

function hideNavbar() {
  if (navbarVisible) {
    gsap.to(navbar, { y: -100, opacity: 0, duration: 0.4, ease: "power2.in" });
    navbarVisible = false;
  }
}

lenis.on("scroll", () => {
  const currentScrollY = window.scrollY;
  const scrollingUp = currentScrollY < lastScrollY;
  let belowHero = currentScrollY > heroHeight;

  if (belowHero && scrollingUp) {
    showNavbar();
  } else {
    hideNavbar();
  }

  lastScrollY = currentScrollY;
});

// Navbar animation ends
