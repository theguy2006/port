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

  /* Tema claro/escuro (salvo no navegador) */
  const CHAVE_TEMA = 'cf-tema';

  function lerTemaSalvo() {
    try {
      const salvo = localStorage.getItem(CHAVE_TEMA);
      if (salvo === 'dark' || salvo === 'light') return salvo;
    } catch (e) {}
    return null;
  }

  function aplicarTema(tema) {
    root.setAttribute('data-theme', tema);
    if (btnTema) {
      btnTema.setAttribute('aria-pressed', tema === 'dark');
      btnTema.setAttribute(
        'aria-label',
        tema === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'
      );
    }
  }

  function salvarTema(tema) {
    try { localStorage.setItem(CHAVE_TEMA, tema); } catch (e) {}
  }

  /* Ao abrir a página: usa o salvo; senão o que já estiver no HTML; senão claro */
  aplicarTema(lerTemaSalvo() || root.getAttribute('data-theme') || 'light');

  /* Clique no botão: troca e salva */
  if (btnTema) {
    btnTema.addEventListener('click', function () {
      const novo = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      aplicarTema(novo);
      salvarTema(novo);
    });
  }

  /* Se o site estiver aberto em outra aba, acompanha a mudança */
  window.addEventListener('storage', function (e) {
    if (e.key === CHAVE_TEMA && (e.newValue === 'dark' || e.newValue === 'light')) {
      aplicarTema(e.newValue);
    }
  });

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