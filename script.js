const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const nav = document.querySelector(".nav");
const yearEl = document.querySelector("#year");
const navLinkItems = navLinks ? Array.from(navLinks.querySelectorAll("a")) : [];
const sections = Array.from(document.querySelectorAll("main section[id]"));

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    navToggle.classList.toggle("open");
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      navLinks.classList.remove("open");
      navToggle.classList.remove("open");
    }
  });
}

const updateActiveLink = (id) => {
  navLinkItems.forEach((link) => {
    if (link.getAttribute("href") === `#${id}`) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
};

if (sections.length && navLinkItems.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateActiveLink(entry.target.id);
        }
      });
    },
    { rootMargin: "-45% 0px -45%" }
  );

  sections.forEach((section) => observer.observe(section));
}

const setNavAppearance = () => {
  if (!nav) return;
  if (window.scrollY > 12) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
};

setNavAppearance();
window.addEventListener("scroll", setNavAppearance, { passive: true });

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

