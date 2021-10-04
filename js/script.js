const windowStorage = window.sessionStorage;

const basket = document.querySelector(".basket-items");
const basketIcon = document.querySelector(".shopping-basket-container");
let itemsInBasket = parseInt(windowStorage.getItem("quantity"));
let totalPrice = parseInt(windowStorage.getItem("totalPrice"));
let productThumbnail = "images/jacket-green-xsmall.jpg";
const basketLabel = document.querySelector(".basket-label");
const basketNumber = document.querySelector(".basket-number");
const basketItems = document.querySelector(".basket-items");
const itemsInBasketP = document.querySelector("#items-in-basket");
const basketSummary = document.querySelector(".basket-summary__wrapper");
let basketSummaryItems = JSON.parse(windowStorage.getItem("itemDetails"));
//Displaying the correct items in the basket

const findValue = (currentItem, start, end) => {
  const result = currentItem.match(new RegExp(start + "(.*)" + end));
  return result[1];
};

let basketHtml = `
<h3 class="number-items"><span id="number-items">${itemsInBasket}</span> items in basket:</h3>
<h3 class="total-price">Total: £<span id="price-of-items">${totalPrice}</span></h3>
<div class="cta-checkout button__wrapper">
  <a class="cta-button checkout-button" href="checkout.html"
    >Proceed to checkout</a
  >
</div>
`;

const addBinEventListeners = (bins) => {
  for (let i = 0; i < bins.length; i++) {
    bins[i].addEventListener("click", (event) => {
      const clickedItem = event.target.parentElement.childNodes[1].innerHTML;
      const currentColour = findValue(clickedItem, "Colour: ", "</p>");
      const currentSize = findValue(clickedItem, "Size: ", "</p>");
      const currentProduct = findValue(clickedItem, "Product: ", "</p>");
      const currentQuantity = parseInt(findValue(clickedItem, `item-quantity">`, "</span>"));
      const currentPrice = parseInt(findValue(clickedItem, `single-item-price">`, "</span>"));
      basketSummaryItems = JSON.parse(windowStorage.getItem("itemDetails"));
      const found = basketSummaryItems.find((item) => {
        if (
          item.includes(currentColour) &&
          item.includes(currentSize) &&
          item.includes(currentProduct) &&
          item.includes(currentQuantity)
        ) {
          return item;
        }
      });

      basketSummaryItems.splice(basketSummaryItems.indexOf(found), 1);
      windowStorage.setItem("quantity", (itemsInBasket -= currentQuantity));
      windowStorage.setItem("totalPrice", (totalPrice -= currentPrice * currentQuantity));

      windowStorage.setItem("itemDetails", JSON.stringify(basketSummaryItems));
      window.location.href = window.location.href;
    });
  }
};

const checkItems = () => {
  if (itemsInBasket >= 1) {
    let basketHtml = `
<h3 class="number-items"><span id="number-items">${itemsInBasket}</span> items in basket:</h3>
<h3 class="total-price">Total: £<span id="price-of-items">${totalPrice}</span></h3>
<div class="cta-checkout button__wrapper">
      <a class="cta-button checkout-button" href="checkout.html">Proceed to checkout</a>
    </div>
    <div class="cta-checkout button__wrapper">
    <a class="signup-button continue-button" href="#">Continue Shopping</a>
    </div>
`;
    let basketSummaryHtml = "";
    JSON.parse(windowStorage.getItem("itemDetails")).forEach((item) => {
      basketSummaryHtml += item;
    });
    

    basketSummary.innerHTML = basketSummaryHtml + basketHtml;
    itemsInBasketP.innerHTML = parseInt(itemsInBasket);
    basketNumber.style.display = "flex";
  } else {
    let basketHtml = `
    <h3 class="number-items"><span id="number-items">0</span> items in basket:</h3>
    <h3 class="total-price">Total: £<span id="price-of-items">0.00</span></h3>
    <div class="cta-checkout button__wrapper">
      <a class="cta-button checkout-button" href="checkout.html">Proceed to checkout</a>
    </div>
    <div class="cta-checkout button__wrapper">
    <a class="signup-button continue-button" href="#">Continue Shopping</a>
    </div>
    `;
    basketNumber.style.display = "none";
    itemsInBasket = 0;
    totalPrice = 0;
    basketSummary.innerHTML += basketHtml;
  }
  const continueButton = document.querySelector(".continue-button");
  continueButton.addEventListener("click", function () {
    basketItems.style.display = "none";
  });
  const bins = document.querySelectorAll(".checkout-trash");
  addBinEventListeners(bins);
};

checkItems();

basketNumber.addEventListener("change", checkItems);

basketLabel.addEventListener("click", function () {
  if (basketItems.style.display === "flex") {
    basketItems.style.display = "none";
  } else {
    basketItems.style.display = "flex";
  }
});

//Handling the email signup buttons
const emailSignupForms = document.querySelectorAll(".email-signup__form");

const emailhandleSubmit = (event) => {
  event.preventDefault();
  let emailRegEx = /\S+@\S+\.\S+/;
  let checkInput = emailRegEx.test(event.target.lastElementChild.firstElementChild.value);
  if (checkInput) {
    event.srcElement.reset();
    event.srcElement.innerHTML = "<p>Subscribe successful</p>";
  } else {
    event.target.firstElementChild.innerText = "Please enter a valid email";
    event.target.firstElementChild.style.color = "var(--mid-button-color)";
  }
};

emailSignupForms.forEach((form) => {
  form.addEventListener("submit", emailhandleSubmit);
});

//Get average rating for stars
const getRating = (product) => {
  let averageRating = 0;
  let numberOfReviews = 0;
  product.reviews.forEach((review) => {
    averageRating += review.rating;
    numberOfReviews++;
  });
  averageRating = (averageRating / numberOfReviews).toFixed(2);
  return averageRating;
};

const numberItemsSpan = document.querySelector("#number-items");

const searchButton = document.querySelector(".search-label");
const searchContainer = document.querySelector(".search-input");
const searchInput = document.querySelector("#search__input");

searchButton.addEventListener("click", (e) => {
  if (searchContainer.classList.contains("open")) {
    searchContainer.classList.remove("open");
  } else {
    searchContainer.classList.add("open");
  }
});

//search function
const addSearchFunction = () => {
  searchInput.addEventListener("keyup", (e) => {
    const searchInput = e.target.value;
    const key = e.key;
    if (key === "Enter" && e.target.value.length > 0) {
      window.location.href = `/search-results.html?search=${searchInput}`;
    }

    if (key === "Escape") {
      e.target.blur();
      searchContainer.classList.remove("open");
    }
  });
};

addSearchFunction();

let viewportWidth = window.innerWidth;
let isDesktop = viewportWidth >= 800 ? true : false;

const menuButton = document.querySelector(".hamburger-button");
const navMenu =  document.querySelector(".navigation");

window.addEventListener("resize", () => {
  const newViewportWidth = window.innerWidth;
  if (newViewportWidth >= 800 && viewportWidth < 800) {
    isDesktop = true;
    viewportWidth = newViewportWidth;
    console.log("desktop")
    menuButton.style.display = "none"
  } else if (newViewportWidth < 800 && viewportWidth >= 800) {
    isDesktop = false;
    viewportWidth = newViewportWidth;
    console.log("mobile")
    menuButton.style.display = "block"
  }
});

menuButton.addEventListener("click", () => {
if(navMenu.classList.contains("open")) {
  navMenu.classList.remove("open")
} else {
  navMenu.classList.add("open")
}
})