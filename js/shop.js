let category = "All";

function renderShop() {
    const query = document.querySelector("#search").value.toLowerCase().trim();
    const sort = document.querySelector("#sort").value;
    let visible = products.filter(p => (category === "All" || p.category === category) && p.name.toLowerCase().includes(query));

    if (sort === "low") visible.sort((a, b) => a.price - b.price);
    if (sort === "high") visible.sort((a, b) => b.price - a.price);
    if (sort === "name") visible.sort((a, b) => a.name.localeCompare(b.name));

    document.querySelector("#result-count").textContent = `${visible.length} products`;
    document.querySelector("#empty-state").hidden = visible.length !== 0;
    document.querySelector("#shop-products").innerHTML = visible.map(productCard).join("");
    observeReveals();
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".filter").forEach(button => button.addEventListener("click", () => {
        document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
        button.classList.add("active");
        category = button.dataset.category;
        renderShop();
    }));
    document.querySelector("#search").addEventListener("input", renderShop);
    document.querySelector("#sort").addEventListener("change", renderShop);
    renderShop();
});