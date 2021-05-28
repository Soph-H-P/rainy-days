import { productArray } from "./constants/product_list.js";
const numberOfItems = document.querySelector(".number-of-items");
const productsGrid = document.querySelector(".view-products-grid");
const filters = document.querySelectorAll(".filter-checkbox");

let userFilters = [];
let userCategories = [];
const checkFilters = () => {
  userFilters = [];
  userCategories = [];
  filters.forEach((filter) => {
    if (filter.checked) {
      userCategories.push(filter.dataset.filter);
      userFilters.push(filter.id);
    }
  });
};

let productsToRender = [];
let individualProductsToRender;
const productFilterer = (filters, products) => {
  individualProductsToRender = [];
  productsToRender = [];
  for (let i = 0; i < userCategories.length; i++) {
    products.forEach((product) => {
      if (product[userCategories[i]] === filters[i]) {
        productsToRender.push(product.name);
      }
    });
  }
  function removeDuplicates(array) {
    return array.filter((item, index) => {
      return array.indexOf(item) === index;
    });
  }
  individualProductsToRender = removeDuplicates(productsToRender);
  console.log(individualProductsToRender);
};

let productHtml = "";
let numberToView = 0;

const renderProductList = () => {
  checkFilters();
  productFilterer(userFilters, productArray);
  numberToView = 0;
  productHtml = "";
  productArray.forEach((product) => {
    if (individualProductsToRender.includes(product.name)) {
      productHtml += productHtmlCreator(product);
      numberToView++;
    }
  });
  numberOfItems.innerHTML = `${numberToView} items of ${numberToView}`;
  productsGrid.innerHTML = productHtml;
};

renderProductList();

const applyFiltersButton = document.querySelector("#apply-filters");

applyFiltersButton.addEventListener("click", (event) => {
  productsGrid.innerHTML = "";
  renderProductList();
});
