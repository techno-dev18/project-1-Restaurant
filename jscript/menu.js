// Get filter elements
const categoryFilter = document.getElementById('categoryFilter');
const priceFilter = document.getElementById('priceFilter');
const searchInput = document.getElementById('searchInput');
const clearBtn = document.getElementById('clearFilters');

// Get all menu items
const sections = document.querySelectorAll('.menu-section h2');

let foodItems = [];

// Convert HTML → JS data
sections.forEach((heading) => {
  const category = heading.innerText;
  const container = heading.nextElementSibling;
  const items = container.querySelectorAll('.menu-item');

  items.forEach((item) => {
    const name = item.querySelector('h3').innerText;
    const price = Number(
      item.querySelector('p').innerText.replace('₹', '')
    );

    foodItems.push({
      name,
      price,
      category,
      element: item
    });
  });
});

// Filter function
function applyFilters() {
  const selectedCategory = categoryFilter.value;
  const searchText = searchInput.value.toLowerCase();
  const priceSort = priceFilter.value;

  let filtered = [...foodItems];

  // Category filter
  if (selectedCategory) {
    filtered = filtered.filter(
      item => item.category === selectedCategory
    );
  }

  // Search filter
  if (searchText) {
    filtered = filtered.filter(
      item => item.name.toLowerCase().includes(searchText)
    );
  }

  // Sort by price
  if (priceSort === "low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (priceSort === "high") {
    filtered.sort((a, b) => b.price - a.price);
  }

  // Hide all first
  foodItems.forEach(item => {
    item.element.style.display = "none";
  });

  // Show filtered
  filtered.forEach(item => {
    item.element.style.display = "block";
  });
}

// Event listeners
categoryFilter.addEventListener('change', applyFilters);
priceFilter.addEventListener('change', applyFilters);
searchInput.addEventListener('input', applyFilters);

// Clear button
clearBtn.addEventListener('click', () => {
  categoryFilter.value = "";
  priceFilter.value = "";
  searchInput.value = "";

  applyFilters();
});