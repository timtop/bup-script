// Init Gsap plugins
gsap.registerPlugin(ScrollTrigger);

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
// Close the nav if the window is resized
window.addEventListener("resize", () => {
  if (isNavOpened) {
    fullNav.style.display = "none";
    isNavOpened = false;
  }
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

// About Line animation
gsap.set(".yellow-stripe-lg", {
  x: "100%",
});

gsap.to(".yellow-stripe-lg", {
  delay: 0.5,
  x: "0%",
  stagger: 0.08,
  duration: 0.5,
  ease: "power2.in",
});

// News line animation
gsap.from(".c-yellowbox", {
  delay: 0.2,
  x: "-100%",
  stagger: 0.08,
  duration: 0.5,
  ease: "power2.in",
});

// BUP Footer animation
gsap.to(".line", {
  clipPath: "inset(0% 0% 0% 0%)",
  duration: 0.2,
  ease: "power4.inOut",
  stagger: {
    each: 0.1,
    from: "left",
  },
  scrollTrigger: {
    trigger: ".line",
    start: "50% bottom",
    // markers: true,
  },
});

// strips animation around the pictures
const stripes = document.querySelectorAll("#stripe");

stripes.forEach((stripe) => {
  // Set initial rotation
  gsap.set(stripe, {
    rotationX: "90deg",
  });

  const interactionCallBack = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Animate when in view
        gsap.to(entry.target, {
          rotationX: "0deg",
          duration: 1.5,
          ease: "power2.out",
          transformOrigin: "center center",
        });

        // Stop observing this one
        observer.unobserve(entry.target);
      }
    });
  };

  const interactionOptions = {
    rootMargin: "0px -10% -10% 0px",
    threshold: 0.9,
  };

  const observer = new IntersectionObserver(
    interactionCallBack,
    interactionOptions
  );

  observer.observe(stripe);
});
