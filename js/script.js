const basket = document.querySelector(".basket-items")
const basketIcon = document.querySelector(".shopping-basket-container");
let itemsInBasket = 0;
let totalPrice = 0;
let productThumbnail = "images/jacket-green-xsmall.jpg"


let basketHtml = `
<h3 class="number-items"><span id="number-items">${itemsInBasket}</span> item in basket:</h3>
<div class="basket-summary__wrapper">

</div>
<h3 class="total-price">Total: £<span id="price-of-items">${totalPrice}</span></h3>
<div class="cta-checkout button__wrapper">
  <a class="cta-button checkout-button" href="checkout.html"
    >Proceed to checkout</a
  >
</div>
`

let basketProductDetailsHtml = `
<div >
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
`


basket.innerHTML = basketHtml

const checkItems = () => {
   if (itemsInBasket >= 1) {
  basketIcon.innerHTML += `
<div class="basket-number">
    <p>${itemsInBasket}</p>
</div>
`  
} 
}

checkItems();

