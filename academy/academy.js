(() => {
  const grid = document.getElementById("templateGrid");
  const search = document.getElementById("templateSearch");
  const filters = [...document.querySelectorAll("[data-filter]")];
  const empty = document.getElementById("noResults");
  if (!grid || !search) return;
  let active = "all";
  const cards = [...grid.querySelectorAll(".template-card")];
  const refresh = () => {
    const query = search.value.trim().toLowerCase();
    let showing = 0;
    for (const card of cards) {
      const matchingCategory = active === "all" || card.dataset.category === active || card.dataset.origin === active;
      const matchingName = !query || (card.dataset.name || "").includes(query);
      card.hidden = !(matchingCategory && matchingName);
      if (!card.hidden) showing++;
    }
    if (empty) empty.hidden = showing !== 0;
  };
  search.addEventListener("input", refresh);
  for (const filter of filters) {
    filter.addEventListener("click", () => {
      active = filter.dataset.filter || "all";
      for (const item of filters) {
        const selected = item === filter;
        item.classList.toggle("active", selected);
        item.setAttribute("aria-pressed", String(selected));
      }
      refresh();
    });
    filter.setAttribute("aria-pressed", String(filter.dataset.filter === "all"));
  }
  refresh();
})();
