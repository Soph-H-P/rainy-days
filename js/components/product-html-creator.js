const productHtmlCreator = (product) => {
  let averageRating = getRating(product);

  let html = `<section class="product-card">
  <a id="card-hover" href="./product_page.html?id=${product.id}">
                <div class="product-image-wrapper">
                  <img
                    class="product-card-image"
                    src="${product.image}"
                    alt="${product.colour} ${product.name}"
                  />
                 
                </div>
                <h2>${product.name}</h2>
                <p>${product.alternatives.length} alternative colours</p>
                <p>£${product.price}.00</p>
      
                <div class="customer-rating">
                  <p>Customer rating:<span class="stars"><span class="rating" style="width:${averageRating}em;"></span></span></p>
                </div>
                <div class="view-product__button-wrapper">
                  <a id="view-product" class="cta-button" href="./product_page.html?id=${product.id}">View product</a>
                </div>
                </a>
              </section>
      `;
  return html;
};
