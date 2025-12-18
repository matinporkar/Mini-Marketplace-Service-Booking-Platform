let cart = JSON.parse(localStorage.getItem("cart") || "[]");
const container = document.getElementById("cartList");
const cartBtn = document.getElementById("cartBtn");
const backBtn = document.getElementById("backBtn");

function renderCart() {
  container.innerHTML = "";
  if (cart.length === 0) {
    container.innerHTML = "<p>Your booking cart is empty.</p>";
    return;
  }
  cart.forEach((f, index) => {
    const item = document.createElement("div");
    item.className = "cart-item";
    item.innerHTML = `
    <div class="profile-image"><img src="${f.image}"></div>
      <h3>${f.name}</h3>
      <p>Price/Hour: $${f.pricePerHour}</p>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    container.appendChild(item);
  });
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  cartBtn.innerHTML = `Booking cart (${cart.length})`;
  renderCart();
}

document.getElementById("clearCart").addEventListener("click", () => {
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  cartBtn.innerHTML = `Booking cart (${cart.length})`;
  renderCart();
});


cartBtn.innerHTML = `Booking cart (${cart.length})`;
backBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});

renderCart();