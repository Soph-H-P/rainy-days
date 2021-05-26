import { productArray } from "./constants/product_list.js";
import { sizeSelectionHandler } from "./event-handlers/size-selection.js";
import { colourSelectionHandler } from "./event-handlers/colour-selection.js";
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
let productId = params.get("id");

const findProduct = () => {
  for (let i = 0; i < productArray.length; i++) {
    if (productArray[i].id === parseInt(productId)) return productArray[i];
  }
};

let product = findProduct();

const heading = document.querySelector("h1");
heading.innerHTML = product.name;
const breadcrumb = document.querySelector("#product-name-breadcrumb");
breadcrumb.innerHTML = product.name;
const productImages = document.querySelector(".product-view__wrapper");
let productImagesHtml = `<img class="main-product__image" src="${product.image}" alt="${product.colour} ${product.name}" />`;
const findImages = () => {
  productImagesHtml += `<img id="current-selection" class="thumbnail" src="${product.image}" data-colour="${product.colour}" alt="${product.colour} ${product.name}" />`;
  if (product.alternatives.length >= 1) {
    for (let i = 0; i < product.alternatives.length; i++) {
      productImagesHtml += `<img class="thumbnail" src="${product.alternatives[i].thumbnail}" data-colour="${product.alternatives[i].colour}" alt="${product.alternatives[i].colour} ${product.name}" />`;
    }
  }
};
findImages();
productImages.innerHTML = productImagesHtml;

const productPrice = document.querySelector("#price");
productPrice.innerHTML = product.price;

//Size selection-------------------
sizeSelectionHandler();

//Color selection
colourSelectionHandler(product);

//Accordian menu
const overview = document.querySelector(".accordian-content-overview");
overview.innerHTML = product.overview;
const techSpec = document.querySelector(".accordian-content-tech-spec");
const techHtml = `
            <img id="tech-image"src="${product.tech.fabric} " alt="Diagram membrane technology" />
              ${product.tech.description} 
              <div class="image-wrapper-accordian">
                <img class="lotus-image-accordian" src="${product.tech.image}" alt="water proof technology" />
              </div>
`;
techSpec.innerHTML = techHtml;
const weather = document.querySelector(".accordian-content-weather");

const weatherHtml = `
<img id="weather-icon" src="${product.weather.icon}" alt="weather icon" />
${product.weather.description}
`;
weather.innerHTML = weatherHtml;

const reviews = document.querySelector(".customer-reviews");

let reviewHtml = "";
const getReviews = () => {
  if (product.reviews.length >= 1) {
    product.reviews.forEach(function (review) {
      reviewHtml += `
        <div class="customer-review">
        <h4>${review.title}</h4>
        <p>${review.review}</p>
        <div class="customer-rating">
          <p>Customer rating:</p>
          <div class="stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="far fa-star"></i>
          </div>
          <p>(${review.rating}/5)</p>
        </div>
      </div>
      `;
    });
  } else {
    const reviewInvite = document.querySelector("#other-reviews-title");
    reviewInvite.innerHTML = "Be the first to review this product";
  }
};
getReviews();
reviews.innerHTML = reviewHtml;
