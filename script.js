// =========================================
// Miolo & Casca | script.js
// =========================================

// Ativa as animações de entrada (o CSS só esconde .reveal quando existe .js)
document.documentElement.classList.add("js");

// ---------- Elementos ----------
const nav = document.getElementById("nav");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const progress = document.getElementById("progress");

// ---------- Menu mobile ----------
function closeMenu() {
  navToggle.classList.remove("is-open");
  navLinks.classList.remove("is-open");
}

navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("is-open");
  navLinks.classList.toggle("is-open");
});

// Fecha o menu ao clicar em um link
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Fecha o menu com a tecla Esc
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});

// ---------- Navbar e barra de progresso ao rolar ----------
function onScroll() {
  // Fundo da navbar
  nav.classList.toggle("is-scrolled", window.scrollY > 40);

  // Barra de progresso de leitura
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
  progress.style.width = pct + "%";
}

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ---------- Animação de entrada ao rolar ----------
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  // Pequeno atraso em cadeia para os cards entrarem em sequência
  revealItems.forEach((item, i) => {
    item.style.transitionDelay = (i % 4) * 90 + "ms";
    observer.observe(item);
  });
} else {
  // Navegadores antigos: mostra tudo
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

// ---------- Filtro do catálogo ----------
const filters = document.getElementById("filters");
const products = document.querySelectorAll(".product");
const emptyMsg = document.getElementById("catalogEmpty");

filters.addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;

  // Marca o botão ativo
  filters.querySelectorAll(".chip").forEach((c) => c.classList.remove("is-active"));
  chip.classList.add("is-active");

  const filter = chip.dataset.filter;
  let visibleCount = 0;

  products.forEach((product) => {
    const show = filter === "todos" || product.dataset.cat === filter;
    product.classList.toggle("is-hidden", !show);

    if (show) {
      visibleCount++;
      // Garante que o card apareça mesmo se ainda não tinha sido rolado até ele
      product.classList.add("is-visible");
    }
  });

  emptyMsg.hidden = visibleCount > 0;
});