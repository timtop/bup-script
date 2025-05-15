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

// Navbar animation begins
const navbar = document.querySelector("#nav");
const heroHeight = document.querySelector(".hero").offsetHeight;
let lastScrollY = window.scrollY;
// console.log("Last scroll Y = " + lastScrollY);
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
  //   console.log("current scroll Y = " + lastScrollY);

  const scrollingUp = currentScrollY < lastScrollY;

  //   console.log("scroll up is = " + scrollingUp);

  if (currentScrollY > heroHeight && scrollingUp) {
    showNavbar();
  } else {
    hideNavbar();
  }

  lastScrollY = currentScrollY;
});

// Navbar animation ends
