const textos = document.querySelectorAll(
  "h1, h2, h3, p, a, li, span"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1
  }
);

textos.forEach((texto) => {
  texto.classList.add("reveal");
  observer.observe(texto);
});