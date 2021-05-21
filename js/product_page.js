const addButton = document.querySelector("#add-to-basket__button");
const itemAddCircle = document.querySelector(".item-number");
const userQuantity = document.querySelector("#user-input-quantity");
const itemPrice = document.querySelector(".price");
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

const handleAddToBasket = () => {
  const basketPosition = basketIcon.getBoundingClientRect();
  itemAddCircle.style.opacity = 1;
  itemAddCircle.style.zIndex = 10000;
  const x = basketPosition.left + 20;
  const y = basketPosition.top - 10;
  itemAddCircle.style.top = `${y}px`;
  itemAddCircle.style.left = `${x}px`;
  itemsInBasket += parseInt(userQuantity.value);

  setTimeout(checkItems, 3000);
  setTimeout(resetAddItemNumber, 3000);
  totalPrice += parseInt(itemPrice.innerText) * parseInt(userQuantity.value);
};

addButton.onclick = handleAddToBasket;
