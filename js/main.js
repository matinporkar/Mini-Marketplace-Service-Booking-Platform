
/////////////////////////////////////////////////////////////////////////// Elemans ///////////////////////////////////////////////////////////////////////////
const cartBtn = document.getElementById("cartBtn");
const searchInput = document.getElementById("searchInput");
const skillFilter = document.getElementById("skillFilter");
const priceFilter = document.getElementById("priceFilter");
const genderFilter = document.getElementById("genderFilter");
const freelancerList = document.getElementById("freelancerList");
const freelancerChart = document.getElementById("freelancerChart");

/////////////////////////////////////////////////////////////////////////// Rendering ///////////////////////////////////////////////////////////////////////////
let freelancers = [];

async function fetchFreelancers() {
  try{
    const response = await fetch('data.json');
    freelancers = await response.json();
    renderFreelancers(freelancers);
    renderChart(freelancers);
  } catch(error) {
    console.log("Failed to load freelancers : ", err);
  }
}

function renderFreelancers(list) {
  freelancerList.innerHTML = "";
  list.forEach(item => {
    const card = document.createElement("div");
    card.className = "freelancerCard";
    card.innerHTML = `
    <img src="${item.image}" alt="${item.name}">
    <h3>${item.name}</h3>
    <p>Skills: ${item.skills.join(",")}</p>
    <p>Price/Hour : $${item.pricePerHour}</p>
    <p>Gender : ${item.gender}</p>
    <button onclick="viewDetails(${item.id})">View Details</button>
    <button onclick="addToCart(${item.id})">Book Now</button>
    `;
    freelancerList.appendChild(card);
  });
}

/////////////////////////////////////////////////////////////////////////// Profiles ///////////////////////////////////////////////////////////////////////////
function viewDetails(id) {
  // const profile = freelancers.find(f => f.id == id);
  localStorage.setItem("profile", id);
  // localStorage.setItem("profile",id);
  window.location.href = "freelancer.html";
}

/////////////////////////////////////////////////////////////////////////// Cart ///////////////////////////////////////////////////////////////////////////
let cart = JSON.parse(localStorage.getItem("cart") || "[]");

function addToCart(id) {
  const item = freelancers.find(f => f.id == id);
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

/////////////////////////////////////////////////////////////////////////// Filters ///////////////////////////////////////////////////////////////////////////
let filters = {
  search: "",
  skill: "",
  price: "",
  gender: ""
};

function applyFilters () {
  let results = freelancers;

  if (filters.search) {
    results = results.filter(f => f.name.toLowerCase().includes(filters.search));
  }

  if (filters.skill) {
    results = results.filter(f => f.skills.includes(filters.skill));
  }

  if (filters.renge) {
    results = results.filter(f => f.renge === filters.renge);
  }

  if (filters.gender) {
    results = results.filter(f => f.gender === filters.gender);
  }

  renderFreelancers(results);
}


searchInput.addEventListener("input", e => {
  const query = e.target.value.toLowerCase();
  filters.search = query;
  applyFilters();
});

skillFilter.addEventListener("change", e => {
  const value = e.target.value;
  filters.skill = value;
  applyFilters();
});

priceFilter.addEventListener("change", e => {
  const value = e.target.value;
  filters.renge = value;
  applyFilters();
});

genderFilter.addEventListener("change", e => {
  const value = e.target.value;
  filters.gender = value;
  applyFilters();
});


/////////////////////////////////////////////////////////////////////////// Chart.js ///////////////////////////////////////////////////////////////////////////
function renderChart(data) {
  const ctx = freelancerChart.getContext("2d");
  const skillCount = {};
  data.forEach(f => {
    f.skills.forEach(skill => {
      skillCount[skill] = (skillCount[skill] || 0) + 1;
    });
  });

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(skillCount),
      datasets: [{
        label: 'Number of Freelancers per Skill',
        data: Object.values(skillCount),
        backgroundColor: 'rgba(75, 192, 192, 0.6)'
      }]
    },
    options: { responsive: true }
  });
}

/////////////////////////////////////////////////////////////////////////// Start ///////////////////////////////////////////////////////////////////////////
fetchFreelancers();