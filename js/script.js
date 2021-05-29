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

//Displaying the correct items in the basket

let basketHtml = `
<h3 class="number-items"><span id="number-items">${itemsInBasket}</span> items in basket:</h3>
<h3 class="total-price">Total: £<span id="price-of-items">${totalPrice}</span></h3>
<div class="cta-checkout button__wrapper">
  <a class="cta-button checkout-button" href="checkout.html"
    >Proceed to checkout</a
  >
</div>
`;

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
};

checkItems();

basketLabel.addEventListener("click", function () {
  if (basketItems.style.display === "flex") {
    basketItems.style.display = "none";
  } else {
    basketItems.style.display = "flex";
  }
});

const continueButton = document.querySelector(".continue-button");

continueButton.addEventListener("click", function () {
  basketItems.style.display = "none";
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
