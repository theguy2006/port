// Menu mobile
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.textContent = isOpen ? "✕" : "☰";
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "☰";
  });
});

// Ano automático no rodapé
document.querySelector("#year").textContent = new Date().getFullYear();

// Botão voltar ao topo
const backTop = document.querySelector(".back-top");
window.addEventListener("scroll", () => {
  backTop.classList.toggle("visible", window.scrollY > 500);
});

// Animação de entrada ao rolar a página
const animatedElements = document.querySelectorAll(
  ".about-grid, .skills-intro, .skill-row, .projects-title, .project-card, .contact-main"
);

animatedElements.forEach((element) => element.classList.add("reveal"));

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  animatedElements.forEach((element) => observer.observe(element));
} else {
  animatedElements.forEach((element) => element.classList.add("in-view"));
}
