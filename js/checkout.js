const orderSummary = document.querySelector(".order-summary__wrapper");
const paymentButton = document.querySelector(".payment-button");

const renderBasketItems = () => {
  for (let i = 0; i < basketSummaryItems.length; i++) {
    orderSummary.innerHTML += basketSummaryItems[i];
  }
  orderSummary.innerHTML += `
  <div class="summary-total">
    <h3>Total: £${windowStorage.getItem("totalPrice")}.00 </h3>
  </div>`;
};

const renderBasket = () => {
  renderBasketItems();
  const bins = document.querySelectorAll(".order-summary__wrapper .checkout-trash");
  addBinEventListeners(bins);
};

if (!itemsInBasket) {
  orderSummary.innerHTML = `<h3>Your basket is empty</h3>`;
} else {
  renderBasket();
}

paymentButton.innerHTML = `Pay £${windowStorage.getItem("totalPrice")} <i class="fas fa-lock"></i>`;

paymentButton.addEventListener("click", () => {
  windowStorage.clear();
});
