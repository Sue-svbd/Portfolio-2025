// Smooth scroll enhancement for navigation links
document.addEventListener("DOMContentLoaded", function () {
  // Add smooth scroll behavior to navigation links
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Add a subtle click animation
      this.style.transform = "translateX(15px) scale(0.98)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);
    });
  });

  // Add fade-in animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe sections for fade-in effect (including about section)
  const sections = document.querySelectorAll(
    ".description, .navigation-links, .about-section"
  );
  sections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(section);
  });

  // Typing effect for intro text
  const greetingEl = document.querySelector(".typed-greeting");
  const titleEl = document.querySelector(".typed-title");
  const highlightEl = document.querySelector(".title .highlight");

  const greetingText = "Hi, I'm Susanna,";
  const titleText = "a ";
  const highlightText = highlightEl ? highlightEl.textContent : "";

  // Clear initial text
  if (greetingEl) greetingEl.textContent = "";
  if (titleEl) titleEl.textContent = "";
  if (highlightEl) highlightEl.style.visibility = "hidden";

  // Create and add cursor
  function createCursor() {
    const cursor = document.createElement("span");
    cursor.className = "typed-cursor";
    cursor.textContent = "|";
    return cursor;
  }

  async function typeText(element, text, speed = 50) {
    return new Promise((resolve) => {
      let i = 0;
      const cursor = createCursor();
      element.appendChild(cursor);
      function typeChar() {
        if (i < text.length) {
          cursor.before(text.charAt(i));
          i++;
          setTimeout(typeChar, speed);
        } else {
          cursor.remove();
          resolve();
        }
      }
      typeChar();
    });
  }

  async function runTypingEffect() {
    if (greetingEl && titleEl) {
      await typeText(greetingEl, greetingText, 50);
      await new Promise((res) => setTimeout(res, 300));
      await typeText(titleEl, titleText, 50);
      if (highlightEl) {
        highlightEl.textContent = "";
        highlightEl.style.visibility = "visible";
        await typeText(highlightEl, highlightText, 50);
      }
    }
  }

  runTypingEffect();

  // Typing effect for main link on process and work pages
  const mainLinkEl = document.querySelector(".typed-main-link");
  const mainLinkText = "Susanna Capacchione, UX Engineer";
  if (mainLinkEl) {
    mainLinkEl.textContent = "";
    typeText(mainLinkEl, mainLinkText, 50);
  }

  // Typing effect for 'Selected work' link on process and work pages
  const mainLinkWorkEl = document.querySelector(".typed-main-link-work");
  const mainLinkWorkText = "Selected work";
  if (mainLinkWorkEl) {
    mainLinkWorkEl.textContent = "";
    typeText(mainLinkWorkEl, mainLinkWorkText, 50);
  }

  // Typing effect for 'My design process' link on work page
  const mainLinkProcessEl = document.querySelector(".typed-main-link-process");
  const mainLinkProcessText = "My design process";
  if (mainLinkProcessEl) {
    mainLinkProcessEl.textContent = "";
    typeText(mainLinkProcessEl, mainLinkProcessText, 50);
  }

  // Add keyboard navigation support
  document.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
      document.body.classList.add("keyboard-navigation");
    }
  });

  document.addEventListener("mousedown", function () {
    document.body.classList.remove("keyboard-navigation");
  });

  // Add focus styles for keyboard navigation
  const style = document.createElement("style");
  style.textContent = `
        .keyboard-navigation .nav-link:focus {
            outline: 2px solid #00ff88;
            outline-offset: 4px;
        }
    `;
  document.head.appendChild(style);
});
