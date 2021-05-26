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
const handleAddToBasket = () => {
  const basketPosition = basketIcon.getBoundingClientRect();
  itemAddCircle.style.opacity = 1;
  itemAddCircle.style.zIndex = 10000;
  const x = basketPosition.left + 20;
  const y = basketPosition.top - 10;
  itemAddCircle.style.top = `${y}px`;
  itemAddCircle.style.left = `${x}px`;
  itemsInBasket += parseInt(userQuantity.value);
  console.log(itemsInBasket);
  setTimeout(checkItems, 3000);
  setTimeout(resetAddItemNumber, 3000);
  totalPrice += parseInt(itemPrice.innerText) * parseInt(userQuantity.value);
  priceHtml = totalPrice;
  console.log(priceHtml);
  numberItemsSpan.innerHTML = itemsInBasket;
  priceItemsSpan.innerHTML = priceHtml;
  basketSummary.innerHTML += "<p>big fat poopies</p>";
  console.log(basketSummary);
};

addButton.onclick = handleAddToBasket;

// const basketstuff= `
// <section class="basket-items">
// <h3 class="number-items">1 item in basket:</h3>
// <div class="basket-summary__wrapper">
//   <div>
//     <a href="product_page.html">
//       <img class="product-thumbnail" src="images/jacket-green-xsmall.jpg" alt="Small thumbnail of green lotus jacket" />
//     </a>
//   </div>

//   <div class="selection">
//     <p>Product: Lotus</p>
//     <p>Colour: Lime green</p>
//     <p>Size: M</p>
//   </div>
// </div>
// <h3 class="total-price">Total: £150.00</h3>
// <div class="cta-checkout button__wrapper">
//   <a class="cta-button checkout-button" href="checkout.html">Proceed to checkout</a>
// </div>
// </section>`
