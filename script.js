// ---------------------------------------------
// AutoGallery cart logic
// kept it simple, everything lives in localStorage
// ---------------------------------------------

const cars = [
	{
		id: 1,
		name: "Toyota Supra MK5",
		category: "sports",
		tag: "Sports Coupe",
		price: 52500,
		desc: "2020 model, straight six turbo, barely 8k miles on it. Drives like it's on rails.",
		img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=500&q=80"
	},
	{
		id: 2,
		name: "Ford Mustang GT",
		category: "sports",
		tag: "Muscle Car",
		price: 41000,
		desc: "5.0L V8, manual transmission. That sound alone is worth the price tag honestly.",
		img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=500&q=80"
	},
	{
		id: 3,
		name: "BMW M3 Competition",
		category: "sedan",
		tag: "Performance Sedan",
		price: 74900,
		desc: "The daily driver that doubles as a track weapon. Comes fully loaded.",
		img: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=500&q=80"
	},
	{
		id: 4,
		name: "Jeep Wrangler Rubicon",
		category: "suv",
		tag: "Off-Road SUV",
		price: 46200,
		desc: "Removable doors and roof, locking diffs, ready for whatever trail you throw at it.",
		img: "https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?auto=format&fit=crop&w=500&q=80"
	},
	{
		id: 5,
		name: "Tesla Model 3",
		category: "electric",
		tag: "Electric Sedan",
		price: 38900,
		desc: "Long range battery, autopilot included. Cheap to run and quick off the line.",
		img: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=500&q=80"
	},
	{
		id: 6,
		name: "Porsche 911 Carrera",
		category: "sports",
		tag: "Sports Car",
		price: 118500,
		desc: "The classic silhouette everyone recognizes. Flat six engine, rear-wheel drive.",
		img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=500&q=80"
	},
	{
		id: 7,
		name: "Audi RS6 Avant",
		category: "suv",
		tag: "Performance Wagon",
		price: 89700,
		desc: "Twin turbo V8 wagon that can haul groceries and also embarrass sports cars.",
		img: "https://commons.wikimedia.org/wiki/Special:FilePath/Black%20Audi%20wagon%20side%201.jpg?width=500"
	},
	{
		id: 8,
		name: "VW Golf GTI",
		category: "sedan",
		tag: "Hot Hatch",
		price: 29800,
		desc: "The hot hatch that started it all. Fun, practical, and easy on gas too.",
		img: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=500&q=80"
	},
	{
		id: 9,
		name: "Rivian R1S",
		category: "electric",
		tag: "Electric SUV",
		price: 78000,
		desc: "Room for the whole family plus gear, and it'll still keep up on the highway.",
		img: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=500&q=80"
	}
];

let cart = JSON.parse(localStorage.getItem("ag_cart")) || {};

const grid = document.getElementById("car-grid");
const cartItemsEl = document.getElementById("cart-items");
const cartCountEl = document.getElementById("cart-count");
const cartTotalEl = document.getElementById("cart-total");
const toast = document.getElementById("toast");

function money(n) {
	return "$" + n.toLocaleString("en-US");
}

function renderCars(filter) {
	grid.innerHTML = "";
	let list = cars;
	if (filter && filter !== "all") {
		list = cars.filter(c => c.category === filter);
	}
	list.forEach(car => {
		const card = document.createElement("div");
		card.className = "car-card";
		card.innerHTML = `
			<img class="car-img" src="${car.img}" alt="${car.name}">
			<div class="car-info">
				<span class="car-tag">${car.tag}</span>
				<h3>${car.name}</h3>
				<p class="desc">${car.desc}</p>
				<div class="price-row">
					<span class="price">${money(car.price)}</span>
					<button class="add-btn" data-id="${car.id}">Add to Cart</button>
				</div>
			</div>
		`;
		grid.appendChild(card);
	});
}

renderCars("all");

// filter buttons
document.getElementById("filter-bar").addEventListener("click", function(e) {
	if (e.target.tagName !== "BUTTON") return;
	document.querySelectorAll("#filter-bar button").forEach(b => b.classList.remove("active"));
	e.target.classList.add("active");
	renderCars(e.target.dataset.filter);
});

// add to cart (delegated cause cards get re-rendered on filter)
grid.addEventListener("click", function(e) {
	if (!e.target.classList.contains("add-btn")) return;
	const id = e.target.dataset.id;
	cart[id] = (cart[id] || 0) + 1;
	saveCart();
	showToast("Added to cart ✓");
});

function saveCart() {
	localStorage.setItem("ag_cart", JSON.stringify(cart));
	renderCart();
}

function renderCart() {
	const ids = Object.keys(cart);
	cartItemsEl.innerHTML = "";

	let totalCount = 0;
	let totalPrice = 0;

	if (ids.length === 0) {
		cartItemsEl.innerHTML = '<div class="cart-empty-msg">Your cart is empty.<br>Go find something nice 🚗</div>';
	}

	ids.forEach(id => {
		const car = cars.find(c => c.id == id);
		if (!car) return;
		const qty = cart[id];
		totalCount += qty;
		totalPrice += qty * car.price;

		const row = document.createElement("div");
		row.className = "cart-item";
		row.innerHTML = `
			<img src="${car.img}" alt="${car.name}">
			<div class="cart-item-info">
				<h4>${car.name}</h4>
				<div>${money(car.price)}</div>
				<div class="qty-controls">
					<button class="qty-minus" data-id="${id}">-</button>
					<span>${qty}</span>
					<button class="qty-plus" data-id="${id}">+</button>
				</div>
				<button class="remove-x" data-id="${id}">remove</button>
			</div>
		`;
		cartItemsEl.appendChild(row);
	});

	cartCountEl.textContent = totalCount;
	cartTotalEl.textContent = money(totalPrice);
}

cartItemsEl.addEventListener("click", function(e) {
	const id = e.target.dataset.id;
	if (!id) return;

	if (e.target.classList.contains("qty-plus")) {
		cart[id]++;
	} else if (e.target.classList.contains("qty-minus")) {
		cart[id]--;
		if (cart[id] <= 0) delete cart[id];
	} else if (e.target.classList.contains("remove-x")) {
		delete cart[id];
	}
	saveCart();
});

// cart panel open/close
const cartPanel = document.getElementById("cart-panel");
const overlay = document.getElementById("overlay");

function openCart() {
	cartPanel.classList.add("open");
	overlay.classList.add("show");
}
function closeCart() {
	cartPanel.classList.remove("open");
	overlay.classList.remove("show");
}

document.getElementById("open-cart-btn").addEventListener("click", openCart);
document.getElementById("close-cart").addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);

document.getElementById("checkout-btn").addEventListener("click", function() {
	if (Object.keys(cart).length === 0) {
		showToast("Cart's empty, add a car first!");
		return;
	}
	showToast("Thanks! We'll reach out over email to finish up 🎉");
	cart = {};
	saveCart();
	setTimeout(closeCart, 1200);
});

function showToast(msg) {
	toast.textContent = msg;
	toast.classList.add("show");
	clearTimeout(showToast._t);
	showToast._t = setTimeout(() => toast.classList.remove("show"), 2200);
}

renderCart();
