import { calculateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";

export function loadHeader() {
  const amazonHeaderHTML = `
    <div class="amazon-header-left-section">
      <a href="amazon.html" class="header-link">
        <img class="amazon-logo" src="images/amazon-logo-white.png">
        <img class="amazon-mobile-logo" src="images/amazon-mobile-logo-white.png">
      </a>
    </div>

    <div class="amazon-header-middle-section">
      <input class="search-bar js-search-bar" type="text" placeholder="Search">

      <button class="search-button js-search-button">
        <img class="search-icon" src="images/icons/search-icon.png">
      </button>
    </div>

    <div class="amazon-header-right-section">
      <a class="orders-link header-link" href="orders.html">
        <span class="returns-text">Returns</span>
        <span class="orders-text">& Orders</span>
      </a>

      <a class="cart-link header-link" href="checkout.html">
        <img class="cart-icon" src="images/icons/cart-icon.png">
        <div class="cart-quantity js-cart-quantity"></div>
        <div class="cart-text">Cart</div>
      </a>
    </div>
  `;

  document.querySelector(".js-amazon-header").innerHTML = amazonHeaderHTML;

  const cartQuantity = calculateCartQuantity();
  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;

  document.querySelector(".js-search-button").addEventListener("click", () => {
    const search = document.querySelector(".js-search-bar").value;
    window.location.href = `amazon.html?search=${search}`;
  });

  document
    .querySelector(".js-search-bar")
    .addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const searchTerm = document.querySelector(".js-search-bar").value;
        window.location.href = `amazon.html?search=${searchTerm}`;
      }
    });
}

export function filterSearchProducts() {
  const url = new URL(window.location.href);
  const search = url.searchParams.get("search");

  let filterProducts = products;

  if (search) {
    filterProducts = products.filter((product) => {
      let matchingkeyword = false;

      product.keywords.forEach((keyword) => {
        if (keyword.toLowerCase().includes(search.toLowerCase())) {
          matchingkeyword = true;
        }
      });
      return (
        matchingkeyword ||
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    });
  }
  return filterProducts;
}