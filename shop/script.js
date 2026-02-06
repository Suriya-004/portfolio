/***********************
  PRODUCT DATA
************************/
const products = [
  { name: "iPhone 14", price: 79999, desc: "128GB, A15 Bionic", image: "ultramarine-iphone-16-1.png" },
  { name: "Samsung Galaxy S23", price: 74999, desc: "AMOLED, 256GB", image: "sam.png" },
  { name: "OnePlus Nord CE", price: 29999, desc: "5G, 90Hz Display", image: "one.png" },
  { name: "Realme 12 Pro", price: 25999, desc: "120Hz, 108MP Camera", image: "oip.webp" },
  { name: "Redmi Note 13 Pro", price: 23999, desc: "200MP Camera", image: "red.jpg" },
  { name: "Nothing Phone 2", price: 44999, desc: "Glyph Interface", image: "nt.webp" },
  { name: "Google Pixel 7a", price: 43999, desc: "Best Camera",image: "g.webp" },
  { name: "Vivo T4", price: 42999, desc: "Compact Powerhouse", image: "v.webp" },
];


/***********************
  CART LOGIC
************************/
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  const cartCount = document.getElementById("cartCount");
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert("Added to cart!");
}

/***********************
  PRODUCT RENDERING
************************/
function renderProducts(list = products) {
  const productList = document.getElementById("productList");
  if (!productList) return;

  productList.innerHTML = "<h2>Featured Products</h2>";

  const grid = document.createElement("div");
  grid.className = "product-grid";

  list.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p class="price">₹${product.price}</p>
      <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
    `;

    grid.appendChild(card);
  });

  productList.appendChild(grid);
}

/***********************
  SEARCH FUNCTION
************************/
function searchProducts() {
  const value = document.getElementById("searchBox").value.toLowerCase();
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(value)
  );
  renderProducts(filtered);
}

/***********************
  CHECKOUT PAGE
************************/
function loadCart() {
  const cartItems = document.getElementById("cartItems");
  const totalPrice = document.getElementById("totalPrice");

  if (!cartItems || !totalPrice) return;

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price;
    cartItems.innerHTML += `
      <p>${item.name} - ₹${item.price}</p>
    `;
  });

  totalPrice.textContent = `Total: ₹${total}`;
}

function placeOrder() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  alert("Order placed successfully!");
  cart = [];
  localStorage.removeItem("cart");
  updateCartCount();
  loadCart();
}

/***********************
  LOGIN / SIGNUP TOGGLE
************************/
function toggle() {
  const card = document.getElementById("card");
  if (card) {
    card.classList.toggle("active");
  }
}

/***********************
  LOGIN (DUMMY)
************************/
function login() {
  alert("Login successful (demo)");
  window.location.href = "index.html";
}

/***********************
  INIT ON LOAD
************************/
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderProducts();
  loadCart();
});
