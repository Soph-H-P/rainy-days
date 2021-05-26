const basket = document.querySelector(".basket-items");
const basketIcon = document.querySelector(".shopping-basket-container");
let itemsInBasket = 0;
let totalPrice = 0;
let productThumbnail = "images/jacket-green-xsmall.jpg";
const basketLabel = document.querySelector(".basket-label");
const basketNumber = document.querySelector(".basket-number");
const basketItems = document.querySelector(".basket-items");
const itemsInBasketP = document.querySelector("#items-in-basket");
const basketSummary = document.querySelector(".basket-summary__wrapper");

let basketHtml = `
<h3 class="number-items"><span id="number-items">${itemsInBasket}</span> item in basket:</h3>
<h3 class="total-price">Total: £<span id="price-of-items">${totalPrice}</span></h3>
<div class="cta-checkout button__wrapper">
  <a class="cta-button checkout-button" href="checkout.html"
    >Proceed to checkout</a
  >
</div>
`;

let basketProductDetailsHtml = `
<div>
<a href="product_page.html">
  <img
    class="product-thumbnail"
    src="${productThumbnail}"
    alt="Small thumbnail of green lotus jacket"
  />
</a>
</div>

<div class="selection">
<p id="product-name">Product: Lotus</p>
<p id="product-color" >Colour: Lime green</p>
<p id="product-size">Size: M</p>
</div>
`;

basket.innerHTML += basketHtml;


const checkItems = () => {
  if (itemsInBasket >= 1) {
    itemsInBasketP.innerHTML = itemsInBasket;
    basketNumber.style.display = "flex";
  } else {
    basketNumber.style.display = "none";
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
