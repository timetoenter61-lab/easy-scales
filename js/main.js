// Mobile menu
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && nav.classList.contains("open")) {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.focus();
    }
  });
}

// Footer year
document.querySelectorAll(".year").forEach(el => (el.textContent = new Date().getFullYear()));

// Static-host-compatible contact form: prepare an email in the visitor's email app.
const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    const msg = form.querySelector(".form-msg");
    const fields = new FormData(form);
    const body = [
      `Name: ${fields.get("name")}`,
      `Email: ${fields.get("email")}`,
      `Phone: ${fields.get("phone") || "Not provided"}`,
      `Enquiry: ${fields.get("enquiry")}`,
      "",
      String(fields.get("message"))
    ].join("\n");
    const subject = `Website enquiry: ${fields.get("enquiry")}`;
    msg.textContent = "Your email app should open with your message. Review it and press Send to complete your enquiry.";
    msg.hidden = false;
    window.location.href = `mailto:kineticmeasure@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

// Showcase filters
const filterBtns = document.querySelectorAll(".filter-btn");
const items = document.querySelectorAll(".gallery .item");
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const cat = btn.dataset.filter;
    items.forEach(it => it.classList.toggle("hide", cat !== "all" && it.dataset.cat !== cat));
  });
});

// Lightbox
const lightbox = document.querySelector(".lightbox");
if (lightbox) {
  const lbImg = lightbox.querySelector("img");
  const lbCap = lightbox.querySelector("p");
  items.forEach(it => {
    it.addEventListener("click", () => {
      const img = it.querySelector("img");
      if (!img) return;
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lbCap.textContent = it.querySelector(".caption").textContent;
      lightbox.classList.add("open");
    });
  });
  const close = () => lightbox.classList.remove("open");
  lightbox.addEventListener("click", e => { if (e.target !== lbImg) close(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
}
