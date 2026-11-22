(function () {
  const root = document.documentElement;
  const btnTema = document.getElementById('tema');
  const hamb = document.getElementById('hamb');
  const menu = document.getElementById('menu');
  const ALTURA_HEADER = 92;

  /* Espaço extra (em px) acima de cada seção ao rolar.
     Número MAIOR = a tela desce MENOS. */
  const AJUSTES = {
    habilidades: 100
  };

  if (!menu) return;

  /* Tema claro/escuro */
  if (btnTema) {
    btnTema.addEventListener('click', function () {
      const novo = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', novo);
      try { localStorage.setItem('tema', novo); } catch (e) {}
    });
  }

  /* Menu do celular */
  if (hamb) {
    hamb.addEventListener('click', function () {
      const aberto = menu.classList.toggle('aberto');
      hamb.setAttribute('aria-expanded', aberto);
    });
  }

  const links = Array.from(menu.querySelectorAll('a[href^="#"]'));

  /* Clique: rola até a seção */
  links.forEach(function (a) {
    a.addEventListener('click', function (e) {
      const alvo = document.querySelector(a.getAttribute('href'));
      if (!alvo) return;

      e.preventDefault();

      const extra = AJUSTES[alvo.id] || 0;
      const posicao = alvo.getBoundingClientRect().top + window.scrollY - ALTURA_HEADER - extra;
      window.scrollTo({ top: Math.max(posicao, 0), behavior: 'smooth' });

      menu.classList.remove('aberto');
      if (hamb) hamb.setAttribute('aria-expanded', 'false');
    });
  });

  /* Marca no menu a seção que está na tela */
  const secoes = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  const observer = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) {
      if (e.isIntersecting) {
        links.forEach(function (l) {
          l.classList.toggle('ativo', l.getAttribute('href') === '#' + e.target.id);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  secoes.forEach(function (s) { observer.observe(s); });
})();