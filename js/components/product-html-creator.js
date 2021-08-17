const productHtmlCreator = (product, productArray) => {
  const foundValue = productArray.filter((obj) => {
    return obj.name === product.name;
  });

  let averageRating = getRating(foundValue[0]);
  const productPrice = product.prices.price.slice(0, -2);
  let html = `<section class="product-card">
                  <a id="card-hover" href="./product_page.html?id=${
                    product.id
                  }">
                    <div class="product-image-wrapper">
                    <img
                      class="product-card-image"
                      src="${product.images[0].src}"
                      alt="${product.colour} ${product.name}"
                    />
                  
                  </div>
                  <h2>${product.name}</h2>
                  <p>${product.images.length - 1} alternative colours</p>
                  <p>£${productPrice}.00</p>
                  <div class="customer-rating">
                    <p>Customer rating:<span class="stars"><span class="rating" style="width:${averageRating}em;"></span></span></p>
                  </div>
                  <div class="view-product__button-wrapper">
                  <a id="view-product" class="cta-button" href="./product_page.html?id=${
                    product.id
                  }">View product</a>
                </div>
                </a>
              </section>
      `;
  return html;
};
