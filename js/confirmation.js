const interestingItems = document.querySelector(".other-interesting-items");
import { productArray } from "./constants/product_list.js";

const randomItem = Math.floor(Math.random() * productArray.length);

for (let i = 0; i < productArray.length; i++) {
  let averageReview = getRating(productArray[i]);
  if (i === randomItem) {
    interestingItems.innerHTML = `
    <section class="product-card">
              <div class="product-image-wrapper">
                <img
                  class="product-card-image"
                  src="${productArray[i].image}"
                  alt="${productArray[i].colour} ${productArray[i].name}"
                />
              </div>
              <h2>${productArray[i].name}</h2>
              <p>£${productArray[i].price}.00</p>
    
              <div class="customer-rating">
        <p>Customer rating:<span class="stars"><span class="rating" style="width:${averageReview}em;"></span></span></p>
          <p>(${averageReview}/5)</p>
        </div>
              </div>
              <div class="view-product__button-wrapper">
                <a id="view-product" class="cta-button" href="./product_page.html?id=${productArray[i].id}">View product</a>
              </div>
            </section>
    `;
  }
}
