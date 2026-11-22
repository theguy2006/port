
const themeButton = document.querySelector("#theme-toggle");
const html = document.documentElement;

// Recupera o tema salvo
let theme = localStorage.getItem("theme") || "dark";

function changeTheme() {
  html.classList.remove("dark-mode", "light-mode");
  html.classList.add(`${theme}-mode`);

  themeButton.textContent = theme === "dark" ? "☀" : "☾";

  themeButton.setAttribute(
    "aria-label",
    theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"
  );

  localStorage.setItem("theme", theme);
}

// Aplica o tema inicial
changeTheme();

// Alterna os temas
themeButton.addEventListener("click", () => {
  theme = theme === "dark" ? "light" : "dark";
  changeTheme();
});
