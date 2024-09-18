const productsContainer = document.getElementById("productsContainer");
const searchInput = document.getElementById("searchInput");
const loadingSpinner = document.getElementById("loading");
const productDetail = document.getElementById("productDetail");
const productTitle = document.getElementById("productTitle");
const productImage = document.getElementById("productImage");
const productDescription = document.getElementById("productDescription");
const productPrice = document.getElementById("productPrice");
const closeModal = document.getElementById("closeModal");

// Fetch products from the API and exclude the first 3
fetchProducts();

function fetchProducts() {
  // Show loading spinner
  loadingSpinner.classList.remove("hidden");

  fetch('https://dummyjson.com/products')
    .then(response => response.json())
    .then(data => {
      loadingSpinner.classList.add("hidden"); // Hide loading spinner
      let products = data.products.slice(3); // Exclude first 3 products
      renderProducts(products);

      // Filter products based on search input
      searchInput.addEventListener("input", (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filteredProducts = products.filter(product =>
          product.title.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm)
        );
        renderProducts(filteredProducts);
      });
    })
    .catch(error => {
      loadingSpinner.classList.add("hidden");
      console.error("Error fetching products:", error);
    });
}

// Function to render products
function renderProducts(products) {
  productsContainer.innerHTML = products
    .map(product => {
      return `
        <div class="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer" onclick="showProductDetail(${product.id})">
          <img src="${product.thumbnail}" alt="${product.title}" class="w-full h-48 object-cover rounded-md mb-4" />
          <h2 class="text-xl font-bold mb-2">${product.title}</h2>
          <p class="text-gray-700 mb-4">${product.description.slice(0, 100)}...</p>
          <span class="text-green-500 font-semibold">$${product.price}</span>
        </div>
      `;
    })
    .join("");
}

// Function to show product detail in a modal
function showProductDetail(productId) {
  fetch(`https://dummyjson.com/products/${productId}`)
    .then(response => response.json())
    .then(product => {
      productTitle.innerText = product.title;
      productImage.src = product.thumbnail;
      productDescription.innerText = product.description;
      productPrice.innerText = `$${product.price}`;
      
      productDetail.classList.remove("hidden");
    })
    .catch(error => console.error("Error fetching product details:", error));
}

// Close modal when 'X' button is clicked
closeModal.addEventListener("click", () => {
  productDetail.classList.add("hidden");
});
