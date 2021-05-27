const interestingItems = document.querySelector(".other-interesting-items");
import { productArray } from "./constants/product_list.js";

const randomItem = Math.floor(Math.random() * productArray.length);

for (let i = 0; i < productArray.length; i++) {
  if (i === randomItem) {
    interestingItems.innerHTML = `
    <section class="product-card">
              <div class="product-image-wrapper">
                <img
                  class="product-card-image"
                  src="${productArray[i].image}"
                  alt="${productArray[i].colour} ${productArray[i].name}"
                />
                <i class="far fa-heart fa-1x"></i>
              </div>
              <h2>${productArray[i].name}</h2>
              <p>£${productArray[i].price}.00</p>
    
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
                <a id="view-product" class="cta-button" href="./product_page.html?id=${productArray[i].id}">View product</a>
              </div>
            </section>
    `;
  }
}
