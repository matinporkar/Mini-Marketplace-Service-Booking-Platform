
const cartBtn = document.getElementById("cartBtn");
const backBtn = document.getElementById("backBtn");
const img = document.getElementById("img");
const Name = document.getElementById("name");
const role = document.getElementById("role");
const userLocation = document.getElementById("location");
const experience = document.getElementById("experience");
const rate = document.getElementById("rate");
const description = document.getElementById("description");
const skills = document.getElementById("skills");
const addToCartBtn = document.getElementById("addToCart");

let data = [];

async function fetchFreelancerDetail() {
  let ID = localStorage.getItem("profile");
  if (!ID) return;

  const response = await fetch("./data.json");
  data = await response.json();
  const profile = data.find(f => f.id === ID);
  if (!profile) return;
  
  img.src = profile.image;
  Name.innerHTML = profile.name;
  role.innerHTML = profile.role;
  userLocation.innerHTML = `📍 ${profile.location}`;
  experience.innerHTML = `💼 ${profile.experience} Years Experience`;
  rate.innerHTML = `⭐ ${profile.rate} Rating`;
  description.innerHTML = profile.description;
  skills.innerHTML = `💎 Skills :  ${profile.skills.join(",")}`;
}

let cart = JSON.parse(localStorage.getItem("cart") || "[]");
function addToCart(id) {
  const item = data.find(f => f.id == id);
  if (!cart.find(f => f.id == id)) {
      cart.push(item);
      alert(`${item.name} added to your booking cart!`);
  } else {
    alert(`${item.name} have been already added to your booking cart!`);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  cartBtn.innerHTML = `Booking cart (${cart.length})`;
}

cartBtn.innerHTML = `Booking cart (${cart.length})`;
cartBtn.addEventListener("click",() => {
  window.location.href = "cart.html";
});

addToCartBtn.addEventListener("click",() => {
  let ID = localStorage.getItem("profile");
  addToCart(ID);
});



backBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});

fetchFreelancerDetail();