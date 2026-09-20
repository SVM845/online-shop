function renderCart() {
    const cart = getCart();
    const container = document.querySelector("#cart-items");

    if (!cart.length) {
        container.innerHTML = `<div class="empty-cart"><div>∅</div><h2>Your cart is empty.</h2><p>Find something worth adding.</p><a class="button" href="shop.html">Start shopping →</a></div>`;
        updateSummary(0);
        return;
    }

    container.innerHTML = cart.map(item => {
        const p = products.find(product => product.id === item.id);
        return `<article class="cart-item">
      <div class="cart-art">${p.art}</div>
      <div class="cart-item-main"><p class="product-category">${p.category}</p><h3>${p.name}</h3><strong>$${p.price}</strong></div>
      <div class="quantity"><button data-qty="${p.id}" data-change="-1">−</button><span>${item.quantity}</span><button data-qty="${p.id}" data-change="1">+</button></div>
      <button class="remove" data-remove="${p.id}">Remove</button>
    </article>`;
    }).join("");

    updateSummary(cart.reduce((sum, item) => {
        const p = products.find(product => product.id === item.id);
        return sum + p.price * item.quantity;
    }, 0));
}

function updateSummary(subtotal) {
    const shipping = subtotal === 0 ? 0 : subtotal >= 100 ? 0 : 8;
    document.querySelector("#subtotal").textContent = `$${subtotal.toFixed(2)}`;
    document.querySelector("#shipping").textContent = shipping ? `$${shipping.toFixed(2)}` : "FREE";
    document.querySelector("#total").textContent = `$${(subtotal + shipping).toFixed(2)}`;
}

document.addEventListener("click", e => {
    const qtyButton = e.target.closest("[data-qty]");
    const removeButton = e.target.closest("[data-remove]");

    if (qtyButton) {
        const id = Number(qtyButton.dataset.qty);
        const cart = getCart();
        const item = cart.find(i => i.id === id);
        item.quantity += Number(qtyButton.dataset.change);
        saveCart(cart.filter(i => i.quantity > 0));
        renderCart();
        updateCartCount();
    }

    if (removeButton) {
        const id = Number(removeButton.dataset.remove);
        saveCart(getCart().filter(i => i.id !== id));
        renderCart();
        updateCartCount();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    renderCart();
    document.querySelector("#checkout").addEventListener("click", () => alert("Demo checkout — no real payment is connected."));
});