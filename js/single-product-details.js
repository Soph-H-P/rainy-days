import { productArray } from "./constants/product_list.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
let productId = params.get("id");

//Finding and rendering the correct product

const findProduct = () => {
  for (let i = 0; i < productArray.length; i++) {
    if (productArray[i].id === parseInt(productId)) return productArray[i];
  }
};

let product = findProduct();

const heading = document.querySelector("h1");
heading.innerHTML = product.name;
const title = document.querySelector("title");
title.innerHTML = product.name + " | Rainy Days";
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

//Rating stars
const customerRating = document.querySelector(".customer-rating-link");

let averageRating = getRating(product);

customerRating.innerHTML = `<p>Customer rating:<span class="stars"><span class="rating" style="width:${averageRating}em;"></span></span></p>`;

//Size selection-------------------
let selectedSize = "Medium";
const sizeSelection = document.querySelectorAll(".size-selection p");
const productSize = document.querySelector(".product-size");

const sizeSelectionHandler = () => {
  sizeSelection.forEach((itemSize) => {
    let size = "";
    itemSize.addEventListener("click", function (event) {
      sizeSelection.forEach(function (element) {
        if (element.id === "current-selection") {
          element.id = "";
        }
        event.target.id = "current-selection";
      });
      size = event.target.className.replace("size ", "");

      switch (size) {
        case "xs":
          selectedSize = "X-Small";
          break;
        case "s":
          selectedSize = "Small";
          break;
        case "m":
          selectedSize = "Medium";
          break;
        case "l":
          selectedSize = "Large";
          break;
        case "xl":
          selectedSize = "X-Large";
          break;
        default:
          break;
      }
      productSize.innerHTML = selectedSize;
      windowStorage.setItem("size", selectedSize);
    });
  });
};

sizeSelectionHandler();
productSize.innerHTML = selectedSize;

//Color selection------------------
const colourSelection = document.querySelectorAll(".product-view__wrapper img");
const productColour = document.querySelector("#product-colour");
const mainProductImage = document.querySelector(".main-product__image");
let colour = product.colour;
const colourSelectionHandler = () => {
  productColour.innerHTML = product.colour;
  colourSelection.forEach(function (element) {
    if (element.className === "thumbnail") {
      element.addEventListener("click", function (event) {
        colourSelection.forEach(function (element) {
          if (element.id === "current-selection") {
            element.id = "";
          }
          event.target.id = "current-selection";
        });
        colour = event.target.dataset.colour;
        productColour.innerHTML = colour;
        mainProductImage.src = event.target.src;
      });
    }
  });
};

colourSelectionHandler();

//Accordian menu----------------------
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
    product.reviews.forEach((review) => {
      reviewHtml += `
        <div class="customer-review">
        <h4>${review.title}</h4>
        <p>${review.review}</p>
        <div class="customer-rating">
        <p>Customer rating:<span class="stars"><span class="rating" style="width:${review.rating}em;"></span></span></p>
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

const customerReviewForm = document.querySelector(".customer-review-form");

customerReviewForm.addEventListener("submit", (event) => {
  event.preventDefault();
  event.target.reset();
  event.target.innerHTML = "<p>Thank you for your review it will be posted shortly</p>";
});

const productReview = document.querySelector(".customer-rating");
const reviewCheckbox = document.querySelector("#plus-icon-reviews");

productReview.addEventListener("click", (event) => {
  reviewCheckbox.checked = true;
});

//BASKET FFUNCITONALITY
const addButton = document.querySelector("#add-to-basket__button");
const itemAddCircle = document.querySelector(".item-number");
const userQuantity = document.querySelector("#user-input-quantity");
const itemPrice = document.querySelector("#price");
const numberItemsSpan = document.querySelector("#number-items");
const priceItemsSpan = document.querySelector("#price-of-items");

itemAddCircle.innerHTML = `<p>${userQuantity.value}</p>`;

userQuantity.addEventListener("change", (event) => {
  itemAddCircle.innerHTML = `<p>${userQuantity.value}</p>`;
});

const resetAddItemNumber = () => {
  const addButtonPosition = addButton.getBoundingClientRect();
  itemAddCircle.style.opacity = 0;
  itemAddCircle.style.zIndex = -20;
  const buttonX = addButtonPosition.left + addButtonPosition.width / 2;
  const buttonY = addButtonPosition.top + addButtonPosition.height / 2;
  itemAddCircle.style.top = `${buttonY}px`;
  itemAddCircle.style.left = `${buttonX}px`;
};

resetAddItemNumber();

let priceHtml = "";
let basketProductDetailsHtml;
if (itemsInBasket >= 1) {
  basketProductDetailsHtml = JSON.parse(windowStorage.getItem("itemDetails"));
} else {
  basketProductDetailsHtml = [];
}

const handleAddToBasket = () => {
  const basketPosition = basketIcon.getBoundingClientRect();
  itemAddCircle.style.opacity = 1;
  itemAddCircle.style.zIndex = 10000;
  const x = basketPosition.left + 20;
  const y = basketPosition.top - 10;
  itemAddCircle.style.top = `${y}px`;
  itemAddCircle.style.left = `${x}px`;
  itemsInBasket += parseInt(userQuantity.value);

  totalPrice += parseInt(itemPrice.innerText) * parseInt(userQuantity.value);
  priceHtml = totalPrice;
  numberItemsSpan.innerHTML = itemsInBasket;
  priceItemsSpan.innerHTML = priceHtml;
  windowStorage.setItem("quantity", itemsInBasket);
  windowStorage.setItem("totalPrice", totalPrice);
  windowStorage.setItem("image", mainProductImage.src);
  windowStorage.setItem("colour", colour);
  basketProductDetailsHtml.push(`
          <div class="basket-item__wrapper">
            <a href="product_page.html?id=${product.id}">
              <img class="product-thumbnail" src="${mainProductImage.src}" alt="${colour} ${product.name}"/>
            </a>
            <div class="selection">
              <p id="product-quantity">Quantity: ${parseInt(userQuantity.value)}</p>
              <p id="product-name">Product: ${product.name}</p>
              <p id="product-color" >Colour: ${colour}</p>
              <p id="product-size">Size: ${selectedSize}</p>
              <p id="product-price">Item Price: £${product.price}.00</p>
            </div>
          </div>
`);
  windowStorage.setItem("itemDetails", JSON.stringify(basketProductDetailsHtml));
  setTimeout(function () {
    basketItems.style.display = "flex";
  }, 1000);
  setTimeout(checkItems, 1000);
  setTimeout(resetAddItemNumber, 1000);
};

addButton.onclick = handleAddToBasket;
