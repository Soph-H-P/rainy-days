const orderSummary = document.querySelector(".order-summary__wrapper");
let basketSummaryItems = JSON.parse(windowStorage.getItem("itemDetails"));
const paymentButton = document.querySelector(".payment-button");
let updatedSummaryItems = basketSummaryItems;
if (!itemsInBasket) {
  orderSummary.innerHTML = `<h3>Your basket is empty</h3>`;
} else {
  for (let i = 0; i < basketSummaryItems.length; i++) {
    orderSummary.innerHTML += `
        <div id="checkout-item">
            ${basketSummaryItems[i]}  
            <i class="fas fa-trash fa-2x"></i>
        </div>`;
  }
  orderSummary.innerHTML += `
  <div class="summary-total">
    <h3>Total: £${windowStorage.getItem("totalPrice")}.00 </h3>
  </div>`;
}

const bins = document.querySelectorAll(".fa-trash");

for (let i = 0; i < bins.length; i++) {
  bins[i].addEventListener("click", (event) => {
    event.target.parentNode.parentNode.removeChild(event.target.parentNode);
  });
}

paymentButton.innerHTML = `Pay £${windowStorage.getItem("totalPrice")} <i class="fas fa-lock"></i>`;

paymentButton.addEventListener("click", () => {
  windowStorage.clear();
});
