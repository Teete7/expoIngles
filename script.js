document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".nav-links");
  const menuToggle = document.querySelector(".menu-toggle");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
      });
    });
  }

  const filterButtons = [...document.querySelectorAll(".filter-button")];
  const productCards = [...document.querySelectorAll(".product-card")];
  const searchInput = document.querySelector("#product-search");
  const emptyState = document.querySelector("#empty-state");

  function filterProducts() {
    const activeFilter = document.querySelector(".filter-button.active")?.dataset.filter || "all";
    const query = (searchInput?.value || "").trim().toLowerCase();
    let visible = 0;

    productCards.forEach(card => {
      const categoryMatches = activeFilter === "all" || card.dataset.category === activeFilter;
      const searchMatches = (card.dataset.name || card.textContent).toLowerCase().includes(query);
      const show = categoryMatches && searchMatches;
      card.hidden = !show;
      if (show) visible += 1;
    });

    if (emptyState) emptyState.hidden = visible > 0;
  }

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(item => {
        item.classList.remove("active");
        item.setAttribute("aria-pressed", "false");
      });
      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");
      filterProducts();
    });
  });

  searchInput?.addEventListener("input", filterProducts);

  // This is a presentation shortlist, not a real checkout or shopping cart.
  const shortlist = new Set();
  const toast = document.querySelector("#toast");
  let toastTimeout;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("visible");
    window.clearTimeout(toastTimeout);
    toastTimeout = window.setTimeout(() => toast.classList.remove("visible"), 2800);
  }

  document.querySelectorAll(".btn-cart").forEach(button => {
    button.addEventListener("click", () => {
      const card = button.closest(".product-card");
      const productName = card?.querySelector("h3")?.textContent.trim() || "Product";
      if (shortlist.has(productName)) {
        shortlist.delete(productName);
        button.classList.remove("is-added");
        button.innerHTML = 'Add to shortlist <span>+</span>';
        showToast(`${productName} removed from your shortlist.`);
      } else {
        shortlist.add(productName);
        button.classList.add("is-added");
        button.innerHTML = 'Added <span>✓</span>';
        showToast(`${productName} added to your shortlist.`);
      }
    });
  });

  // Correct totals from the prices shown in the catalogue.
  const packItems = [350, 12, 55, 45];
  const packTotal = packItems.reduce((sum, price) => sum + price, 0);
  const promoPrice = 449.99;
  const saving = (packTotal - promoPrice).toFixed(2);
  const priceNote = document.querySelector(".price-note");
  if (priceNote) {
    priceNote.textContent = `Individual total: €${packTotal.toFixed(2)}. Save €${saving}. Prices are for this class project.`;
  }
});
