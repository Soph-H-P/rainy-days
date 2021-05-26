import { productArray } from "./constants/product_list.js";

const productsGrid = document.querySelector(".view-products-grid");

productArray.forEach(function (product) {
  const html = `
    <section class="product-card">
              <div class="product-image-wrapper">
                <div class="selector-wrapper">
                  <div class="green-selector circle"></div>
                  <div class="blue-selector circle"></div>
                  <div class="pink-selector circle"></div>
                </div>
    
                <img
                  class="product-card-image"
                  src="${product.image}"
                  alt="${product.colour} ${product.name}"
                />
                <i class="far fa-heart fa-1x"></i>
              </div>
              <h2>${product.name}</h2>
              <p>£${product.price}.00</p>
    
              <div class="customer-rating">
                <p>Customer rating:</p>
                <div class="stars">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="far fa-star"></i>
                </div>
              </div>
              <div class="view-product__button-wrapper">
                <a id="view-product" class="cta-button" href="./product_page.html?id=${product.id}">View product</a>
              </div>
            </section>
    `;

  productsGrid.innerHTML += html;
});
