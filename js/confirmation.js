const interestingItems = document.querySelector(".other-interesting-items");
import { productArray } from "./constants/product_list.js";

let productsURL =
  "https://www.soph-web-dev.eu/rainydays/wp-json/wc/store/products?per_page=15&orderby=price&order=asc";

const fetchAllProducts = async (url) => {
  try {
    const response = await fetch(url);
    const results = await response.json();

    return results;
  } catch (error) {
    productsGrid.innerHTML = `<p class="error" >Unfortunatly we seem to be having some issues getting the product list, we appologise for any inconvenience.</p>`;
    console.log(error);
  }
};

const productsList = await fetchAllProducts(productsURL);

const randomItem = Math.floor(Math.random() * productsList.length);

for (let i = 0; i < productsList.length; i++) {
  let averageReview = getRating(productArray[i]);
  console.log(productsList[i].prices.price);
  if (i === randomItem) {
    interestingItems.innerHTML = `
    <section class="product-card">
              <div class="product-image-wrapper">
                <img
                  class="product-card-image"
                  src="${productsList[i].images[0].src}"
                  alt="${productsList[i].colour} ${productsList[i].name}"
                />
              </div>
              <h2>${productsList[i].name}</h2>
              <p>£${productsList[i].prices.price}.00</p>
    
              <div class="customer-rating">
        <p>Customer rating:<span class="stars"><span class="rating" style="width:${averageReview}em;"></span></span></p>
          <p>(${averageReview}/5)</p>
        </div>
              </div>
              <div class="view-product__button-wrapper">
                <a id="view-product" class="cta-button" href="./product_page.html?id=${
                  productsList[i].id
                }">View product</a>
              </div>
            </section>
    `;
  }
}
