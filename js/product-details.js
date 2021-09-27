import { productArray } from "./constants/product_list.js";

const numberOfItems = document.querySelector(".number-of-items");
const productsGrid = document.querySelector(".view-products-grid");
const filters = document.querySelectorAll(".filter-checkbox");

let productsURL =
  "https://www.soph-web-dev.eu/rainydays/wp-json/wc/store/products?per_page=15&orderby=price&order=asc";



const fetchAllProducts = async (url) => {
  try {
    const response = await fetch(url);
    const results = await response.json();
console.log(results)
    return results;
  } catch (error) {
    productsGrid.innerHTML = `<p class="error" >Unfortunatly we seem to be having some issues getting the product list, we appologise for any inconvenience.</p>`;
    console.log(error);
  }
};

const productsList = await fetchAllProducts(productsURL);

let userFilters = [];
const checkFilters = () => {
  userFilters = [];
  filters.forEach((filter) => {
    if (filter.checked) {
      userFilters.push(filter.id);
    }
  });
};

let individualProductsToRender;

const productFilterer = (filters, products) => {
  individualProductsToRender = [];

  products.forEach((product) => {
    let productCategories = [];
    let productCategory = "";
    product.categories.forEach((category) => {
      productCategory = category.name;
      productCategories.push(category.slug);
    });
    let included = filters.some((filter) => productCategories.includes(filter));
    if (included) {
      individualProductsToRender.push(product.name);
    }
  });
};

let productHtml = "";
let numberToView = 0;

const renderNewProductList = () => {
  checkFilters();
  productFilterer(userFilters, productsList);

  numberToView = 0;
  productHtml = "";
  

  productsList.forEach((product) => {
    console.log(product.name)
    if (individualProductsToRender.includes(product.name)) {
      productHtml += productHtmlCreator(product, productArray);
      numberToView++;
    }
  });
  numberOfItems.innerHTML = `${numberToView} items of ${numberToView}`;
  productsGrid.innerHTML = productHtml;
};

if (productsList) {
  renderNewProductList();
}

const applyFiltersButton = document.querySelector("#apply-filters");

applyFiltersButton.addEventListener("click", (event) => {
  productsGrid.innerHTML = "";
  if (productsList) {
    renderNewProductList();
  }
});


