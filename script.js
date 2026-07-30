const root = document.documentElement;
const progress = document.querySelector(".scroll-progress");
const cursorGlow = document.querySelector(".cursor-glow");
const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const themeButton = document.querySelector(".theme-toggle");
const contactForm = document.querySelector(".contact-form");
const contactEmail = "imthiyaz.design@gmail.com";

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "light") root.classList.add("light");

themeButton.addEventListener("click", () => {
  root.classList.toggle("light");
  localStorage.setItem("portfolio-theme", root.classList.contains("light") ? "light" : "dark");
});

menuButton.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  document.body.classList.toggle("menu-open", open);
  menuButton.setAttribute("aria-expanded", String(open));
});

navLinks.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    navLinks.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
  }
});

window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${Math.max(0, window.scrollY / max) * 100}%`;
}, { passive: true });

if (matchMedia("(pointer:fine)").matches) {
  window.addEventListener("pointermove", (event) => {
    cursorGlow.style.transform = `translate(${event.clientX - 190}px, ${event.clientY - 190}px)`;
  }, { passive: true });

  document.querySelectorAll(".magnetic").forEach((item) => {
    item.addEventListener("pointermove", (event) => {
      const box = item.getBoundingClientRect();
      item.style.transform = `translate(${(event.clientX - box.left - box.width / 2) * .08}px, ${(event.clientY - box.top - box.height / 2) * .08}px)`;
    });
    item.addEventListener("pointerleave", () => {
      item.style.transform = "";
    });
  });
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("in-view");

    if (entry.target.matches(".metric-card")) {
      const number = entry.target.querySelector("[data-count]");
      if (number && !number.dataset.done) animateCount(number);
    }
    revealObserver.unobserve(entry.target);
  });
}, { threshold: .18 });

document.querySelectorAll(".reveal, .metric-card, .system-board").forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index % 6, 5) * 55}ms`;
  revealObserver.observe(item);
});

function animateCount(element) {
  element.dataset.done = "true";
  const target = Number(element.dataset.count);
  const start = performance.now();
  const duration = 1100;
  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    element.textContent = Math.round(target * (1 - Math.pow(1 - progress, 3)));
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const status = contactForm.querySelector(".form-status");
  const data = new FormData(contactForm);
  const name = String(data.get("name") || "").trim();
  const email = String(data.get("email") || "").trim();
  const message = String(data.get("message") || "").trim();
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  status.className = "form-status";
  if (name.length < 2 || !validEmail || message.length < 2) {
    status.textContent = "Please enter a valid name, email and message.";
    status.classList.add("error");
    return;
  }

  const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  );

  window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  status.textContent = "Opening your email app to send the message.";
  status.classList.add("success");
});
