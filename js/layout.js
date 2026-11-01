// Componentes partilhados — Tomás Silva Digital (GitHub Pages / Live Server)
(() => {
  "use strict";

  async function injectComponent(targetId, file) {
    const target = document.getElementById(targetId);
    if (!target) return;
    try {
      const response = await fetch(file, { cache: "no-cache" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      target.innerHTML = await response.text();
    } catch (error) {
      console.error(`Não foi possível carregar ${file}:`, error);
      target.textContent = "Não foi possível carregar esta secção. Atualiza a página.";
    }
  }

  async function initLayout() {
    await Promise.all([
      injectComponent("site-header", "components/header.html"),
      injectComponent("site-footer", "components/footer.html")
    ]);

    const currentPage = decodeURIComponent(location.pathname.split("/").pop() || "index.html");
    document.querySelectorAll("#site-header .nav-link").forEach(link => {
      const active = link.getAttribute("href") === currentPage;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });

    // Fechar o menu móvel após selecionar uma ligação.
    const menu = document.getElementById("menu");
    if (menu && window.bootstrap?.Collapse) {
      menu.querySelectorAll("a[href]").forEach(link => {
        link.addEventListener("click", () => {
          if (menu.classList.contains("show")) {
            window.bootstrap.Collapse.getOrCreateInstance(menu, { toggle: false }).hide();
          }
        });
      });
    }
    document.dispatchEvent(new CustomEvent("layout:ready"));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLayout, { once: true });
  } else {
    initLayout();
  }
})();
