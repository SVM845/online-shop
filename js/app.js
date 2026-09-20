const getCart = () => JSON.parse(localStorage.getItem("nexora-cart")) || [];
const saveCart = cart => localStorage.setItem("nexora-cart", JSON.stringify(cart));

function updateCartCount() {
    const count = getCart().reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll(".cart-count").forEach(el => el.textContent = count);
}

function addToCart(id) {
    const cart = getCart();
    const existing = cart.find(item => item.id === id);
    if (existing) existing.quantity++;
    else cart.push({ id, quantity: 1 });
    saveCart(cart);
    updateCartCount();
}

function productCard(product) {
    return `<article class="product-card reveal">
    <div class="product-visual"><span class="product-art">${product.art}</span>${product.tag ? `<span class="tag">${product.tag}</span>` : ""}</div>
    <div class="product-info"><div><p class="product-category">${product.category}</p><h3>${product.name}</h3></div><strong>$${product.price}</strong></div>
    <button class="add-button" data-add="${product.id}">Add to cart <span>+</span></button>
  </article>`;
}

document.addEventListener("click", e => {
    const button = e.target.closest("[data-add]");
    if (!button) return;
    addToCart(Number(button.dataset.add));
    button.textContent = "Added ✓";
    setTimeout(() => button.innerHTML = "Add to cart <span>+</span>", 900);
});

function observeReveals() {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    observeReveals();
    const featured = document.querySelector("#featured-products");
    if (featured) {
        featured.innerHTML = products.slice(0, 4).map(productCard).join("");
        observeReveals();
    }
});