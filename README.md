# AutoGallery 🚗

A small front-end car shop demo — browse cars, filter by type, add them to a cart, and "check out" (no real payment, no backend, just vibes).

Built as a learning project with plain HTML, CSS and JavaScript — no frameworks, no build step, no backend. Just open it in a browser.

## Features

- Browse a lot of 9 cars, each with a photo, tag, description and price
- Filter cars by category — All / Sedans / SUVs / Sports / Electric
- Add to cart, adjust quantity, or remove items
- Cart total updates live and persists across page reloads (via `localStorage`)
- Slide-out cart panel with an overlay
- Toast notifications for feedback ("Added to cart ✓", etc.)
- Glassy, sticky header with a scrolling info strip
- Fully responsive — works down to phone-sized screens

## File structure

```
autogallery/
├── index.html      → page structure/markup
├── style.css        → all styling
├── script.js         → cart logic + car data
└── README.md      → this file
```

Keep all three files in the same folder — `index.html` links to `style.css` and `script.js` by relative path, so they won't work if separated.

## Running it

No installation, no server, no dependencies. Just double-click `index.html` (or right-click → Open With → your browser) and it works.

If images don't load, check your internet connection — car photos are pulled from external URLs (Unsplash / Wikimedia Commons), not stored locally.

## How the cart works

There's no backend and no database. The cart lives in the browser's `localStorage`, keyed by car ID and quantity. That means:

- Your cart survives a page refresh
- Your cart is only visible on your own browser/device
- Clicking "Checkout" just clears the cart and shows a thank-you toast — no real order is placed

## Editing the car list

All car data lives at the top of `script.js` in the `cars` array. Each car looks like this:

```js
{
	id: 1,
	name: "Toyota Supra MK5",
	category: "sports",       // used by the filter buttons
	tag: "Sports Coupe",       // small badge shown on the card
	price: 52500,
	desc: "A short description shown on the card.",
	img: "https://..."         // image URL
}
```

To add a car, copy an existing object, give it a unique `id`, and fill in the details. To add a new filter category, add a matching `data-filter` button in `index.html`'s `.filter-bar`.

## Notes

- This is a static demo — nothing is actually for sale, no payments are processed, and no data is sent anywhere.
- Built for practice/fun, not production. Feel free to fork it and make it your own.

---

Made by **Hesam Sormeyli** // SVM845