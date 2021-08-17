import { productArray } from "./constants/product_list.js";
const productsGrid = document.querySelector(".content-wrapper");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
let productId = params.get("id");

//Finding and rendering the correct product
const productsURL =
  "https://www.soph-web-dev.eu/rainy-days/wp-json/wc/store/products?per_page=15";

const fetchAllProducts = async () => {
  try {
    const response = await fetch(productsURL);
    const results = await response.json();

    return results;
  } catch (error) {
    productsGrid.innerHTML = `<p class="error" >Unfortunatly we seem to be having some issues getting the product list, we appologise for any inconvenience.</p>`;
    console.log(error);
  }
};

const productsList = await fetchAllProducts();

const findProduct = () => {
  for (let i = 0; i < productsList.length; i++) {
    if (productsList[i].id === parseInt(productId)) return productsList[i];
  }
};

let product = findProduct();
const findDetails = () => {
  for (let i = 0; i < productArray.length; i++) {
    if (productArray[i].id === parseInt(productId)) return productArray[i];
  }
};

let details = findDetails();

const heading = document.querySelector("h1");
heading.innerHTML = product.name;
const title = document.querySelector("title");
title.innerHTML = product.name + " | Rainy Days";
const breadcrumb = document.querySelector("#product-name-breadcrumb");
breadcrumb.innerHTML = product.name;
const productImages = document.querySelector(".product-view__wrapper");
let productImagesHtml = `<img class="main-product__image" src="${product.images[0].src}" alt="${product.images[0].alt}" />`;
const findImages = () => {
  if (product.images.length >= 1) {
    for (let i = 0; i < product.images.length; i++) {
      if (i === 0) {
        continue;
      } else if (product.images[i].src === product.images[0].src) {
        productImagesHtml += `<img id="current-selection" class="thumbnail" src="${product.images[i].src}" data-colour="${product.images[i].name}" alt="${product.images[i].alt}" />`;
      } else {
        productImagesHtml += `<img class="thumbnail" src="${product.images[i].src}" data-colour="${product.images[i].name}" alt="${product.images[i].alt}" />`;
      }
    }
  }
};
findImages();
productImages.innerHTML = productImagesHtml;
const productPrice = document.querySelector("#price");
productPrice.innerHTML = product.prices.price.slice(0, -2);

//Rating stars
const customerRating = document.querySelector(".customer-rating-link");

let averageRating = getRating(details);

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
let colour = product.images[0].name;
const colourSelectionHandler = () => {
  productColour.innerHTML = colour;
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
overview.innerHTML = product.description;
const techSpec = document.querySelector(".accordian-content-tech-spec");
const techHtml = `
            <img id="tech-image"src="${details.tech.fabric} " alt="Diagram membrane technology" />
              ${details.tech.description} 
              <div class="image-wrapper-accordian">
                <img class="lotus-image-accordian" src="${details.tech.image}" alt="water proof technology" />
              </div>
`;
techSpec.innerHTML = techHtml;
const weather = document.querySelector(".accordian-content-weather");

const weatherHtml = `
<img id="weather-icon" src="${details.weather.icon}" alt="weather icon" />
${details.weather.description}
`;
weather.innerHTML = weatherHtml;

const reviews = document.querySelector(".customer-reviews");

let reviewHtml = "";
const getReviews = () => {
  if (details.reviews.length >= 1) {
    details.reviews.forEach((review) => {
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
getReviews(details);
reviews.innerHTML = reviewHtml;

const customerReviewForm = document.querySelector(".customer-review-form");

customerReviewForm.addEventListener("submit", (event) => {
  event.preventDefault();
  event.target.reset();
  event.target.innerHTML =
    "<p>Thank you for your review it will be posted shortly</p>";
});

//BASKET FFUNCITONALITY
const addButton = document.querySelector("#add-to-basket__button");
const itemAddCircle = document.querySelector(".item-number");
const userQuantity = document.querySelector("#user-input-quantity");
const itemPrice = document.querySelector("#price");

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
let quantityOfItems = [];
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
              <img class="product-thumbnail" src="${
                mainProductImage.src
              }" alt="${colour} ${product.name}"/>
            </a>
            <div class="selection">
              <p id="product-quantity">Quantity: <span id="single-item-quantity">${parseInt(
                userQuantity.value
              )}</span></p>
              <p id="product-name">Product: ${product.name}</p>
              <p id="product-color">Colour: ${colour}</p>
              <p id="product-size">Size: ${selectedSize}</p>
              <p id="product-price">Item Price: £<span id="single-item-price">${product.prices.price.slice(
                0,
                -2
              )}</span>.00</p>
            </div>
          </div>
`);
  windowStorage.setItem(
    "itemDetails",
    JSON.stringify(basketProductDetailsHtml)
  );
  quantityOfItems.push(userQuantity.value);
  windowStorage.setItem("quantityOfItems", JSON.stringify(quantityOfItems));
  setTimeout(function () {
    basketItems.style.display = "flex";
  }, 1000);
  setTimeout(checkItems, 1000);
  setTimeout(resetAddItemNumber, 1000);
};

addButton.onclick = handleAddToBasket;

const reviewCheckbox = document.querySelector("#plus-icon-reviews");
customerRating.addEventListener("click", (event) => {
  reviewCheckbox.checked = true;
});
