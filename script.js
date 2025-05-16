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

// Check screen size
let isMobile = false;

function checkDevice() {
  if (window.innerWidth <= 767) {
    isMobile = true;
  } else {
    isMobile = false;
  }
}
checkDevice();
window.addEventListener("resize", checkDevice);
//Check screen size ends

// Navbar animation begins
const navbar = document.querySelector("#nav");
const heroHeight = document.querySelector(".hero").offsetHeight;
const navContent = document.querySelector("#nav-content");

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
  let navContentDisplayValue = window.getComputedStyle(navContent).display;

  //This prevent the navbar from hiding when you scroll up when it is opened
  if (
    isMobile &&
    navbarVisible &&
    !scrollingUp &&
    belowHero &&
    navContentDisplayValue === "flex"
  ) {
    lastScrollY = currentScrollY;
    return;
  }
  //Ends

  if (belowHero && scrollingUp) {
    showNavbar();
  } else {
    hideNavbar();
  }

  lastScrollY = currentScrollY;
});

// Navbar animation ends
