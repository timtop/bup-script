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
// This help prevent vertical resizing closing from chrome and safari URLbar
let prevWidth = window.innerWidth;

window.addEventListener("resize", () => {
  const currentWidth = window.innerWidth;

  if (currentWidth !== prevWidth) {
    prevWidth = currentWidth;

    if (isNavOpened) {
      fullNav.style.display = "none";
      isNavOpened = false;
    }
  }
});
// Showing and hiding navigation ends

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

// Card line animation
// gsap.from(".yellow-stripe-card", {
//   // delay: 0.05,
//   x: "-100%",
//   stagger: 0.08,
//   duration: 0.5,
//   ease: "power2.in",
// });

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
  // delay: 0.2,
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

// Card line nav
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        gsap.from(entry.target, {
          x: "-120%",
          duration: 0.5,
          stagger: 0.2,
          ease: "power2.in",
        });

        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
  }
);

// Observe all .yellow-stripe-card elements
document.querySelectorAll(".stripes-holder-card").forEach((el) => {
  observer.observe(el);
});

// Accordion functionality
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  item.addEventListener("click", () => {
    faqItems.forEach((i) => {
      const answer = i.querySelector(".faq-answer");
      const horizontalLine = i.querySelector(".icon-horizontal-line");

      if (i === item) {
        // Toggle the clicked item
        const isOpen = i.classList.contains("active");

        if (isOpen) {
          i.classList.remove("active");
          answer.style.height = "0px";
          horizontalLine.style.transform = "rotate(0deg)";
        } else {
          i.classList.add("active");
          answer.style.height = answer.scrollHeight + "px";
          horizontalLine.style.transform = "rotate(90deg)";
        }
      } else {
        // Close all others
        i.classList.remove("active");
        answer.style.height = "0px";
        horizontalLine.style.transform = "rotate(0deg)";
      }
    });
  });
});

// Handling form submission manually to google sheet and prevent redirect
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("email-form");
  const successMessage = document.querySelector(".w-form-done");
  const errorMessage = document.querySelector(".w-form-fail");

  const postUrl =
    "https://script.google.com/macros/s/AKfycbxR_FbmYWqlerN_hSEXCT2njp0fgDe0BeSjQPI_zhTgfoQ2gL2Sd4Mvg2ASWjWHgFwqjA/exec";

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Hide previous messages
    successMessage.style.display = "none";
    errorMessage.style.display = "none";

    // Prepare form data
    const formData = new FormData(form);
    const data = new URLSearchParams(formData);

    // Send form data using Fetch
    fetch(postUrl, {
      method: "POST",
      body: data,
    })
      .then((response) => {
        if (response.ok) {
          form.reset();
          successMessage.style.display = "block";
        } else {
          throw new Error("Submission failed.");
        }
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        errorMessage.style.display = "block";
      });
  });
});

// Tyre parralax animation on about page
gsap.to(".about-banner-img-copy", {
  y: "-20%",
  ease: "none",
  scrollTrigger: {
    trigger: ".three-blocks-grid",
    start: "top bottom",
    end: "bottom top",
    scrub: 1,
  },
});
