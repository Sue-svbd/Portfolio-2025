// Smooth scroll enhancement for navigation links
document.addEventListener("DOMContentLoaded", function () {
  // Add smooth scroll behavior to navigation links
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("mousedown", () => {
      link.classList.add("is-pressed");
    });
    link.addEventListener("mouseup", () => {
      link.classList.remove("is-pressed");
    });
    link.addEventListener("mouseleave", () => {
      link.classList.remove("is-pressed");
    });
    link.addEventListener("click", () => {
      link.classList.add("is-pressed");
      setTimeout(() => link.classList.remove("is-pressed"), 160);
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

  // Home page: toggle Selected work accordion
  const toggleBtn = document.querySelector(".js-toggle-work");
  const panel = document.getElementById("selected-work-panel");
  if (toggleBtn && panel) {
    // use hidden attribute and aria-expanded for accessibility
    const setOpen = (isOpen) => {
      toggleBtn.setAttribute("aria-expanded", String(isOpen));
      if (isOpen) {
        panel.hidden = false;
        panel.setAttribute("aria-hidden", "false");
        // measure content height and animate
        const contentHeight = panel.scrollHeight;
        panel.style.height = "0px";
        panel.classList.add("is-open");
        requestAnimationFrame(() => {
          panel.style.height = contentHeight + "px";
        });
        const onEnd = () => {
          panel.style.height = "auto";
          panel.removeEventListener("transitionend", onEnd);
        };
        panel.addEventListener("transitionend", onEnd);
        document.body.classList.add("work-open");
      } else {
        // collapse to height 0
        const currentHeight = panel.scrollHeight;
        panel.style.height = currentHeight + "px";
        requestAnimationFrame(() => {
          panel.style.height = "0px";
        });
        panel.setAttribute("aria-hidden", "true");
        panel.classList.remove("is-open");
        document.body.classList.remove("work-open");
        setTimeout(() => {
          panel.hidden = true;
        }, 700);
      }
    };
    toggleBtn.addEventListener("click", () => {
      const open = toggleBtn.getAttribute("aria-expanded") === "true";
      // close process if open
      if (!open) closeProcess();
      setOpen(!open);
    });
  }

  // Process accordion toggle
  const processBtn = document.querySelector(".js-toggle-process");
  const processPanel = document.getElementById("process-panel");
  function setProcessOpen(isOpen) {
    if (!processBtn || !processPanel) return;
    processBtn.setAttribute("aria-expanded", String(isOpen));
    if (isOpen) {
      processPanel.hidden = false;
      processPanel.setAttribute("aria-hidden", "false");
      const h = processPanel.scrollHeight;
      processPanel.style.height = "0px";
      processPanel.classList.add("is-open");
      requestAnimationFrame(() => {
        processPanel.style.height = h + "px";
      });
      const onEnd = () => {
        processPanel.style.height = "auto";
        processPanel.removeEventListener("transitionend", onEnd);
      };
      processPanel.addEventListener("transitionend", onEnd);
      document.body.classList.add("process-open");
      document.body.classList.remove("work-open");
    } else {
      const h = processPanel.scrollHeight;
      processPanel.style.height = h + "px";
      requestAnimationFrame(() => {
        processPanel.style.height = "0px";
      });
      processPanel.setAttribute("aria-hidden", "true");
      processPanel.classList.remove("is-open");
      document.body.classList.remove("process-open");
      setTimeout(() => {
        processPanel.hidden = true;
      }, 700);
    }
  }
  function closeProcess() {
    setProcessOpen(false);
  }
  if (processBtn && processPanel) {
    processBtn.addEventListener("click", () => {
      const open = processBtn.getAttribute("aria-expanded") === "true";
      // close work if opening process
      if (!open) {
        if (toggleBtn && panel) {
          toggleBtn.setAttribute("aria-expanded", "false");
          panel.classList.remove("is-open");
          panel.setAttribute("aria-hidden", "true");
          document.body.classList.remove("work-open");
          setTimeout(() => {
            panel.hidden = true;
          }, 300);
        }
      }
      setProcessOpen(!open);
    });
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
