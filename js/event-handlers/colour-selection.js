export const colourSelectionHandler = (product) => {
  const colourSelection = document.querySelectorAll(".product-view__wrapper img");
  const productColour = document.querySelector("#product-colour");
  const mainProductImage = document.querySelector(".main-product__image");
  productColour.innerHTML = product.colour;
  colourSelection.forEach(function (element) {
    let colour = product.colour;
    if (element.className === "thumbnail") {
      element.addEventListener("click", function (event) {
        colourSelection.forEach(function (element) {
          if (element.id === "current-selection") {
            element.id = "";
          }
          event.target.id = "current-selection";
        });
        colour = event.target.dataset.colour;
        productColour.innerHTML = colour;
        mainProductImage.src = event.target.src;
      });
    }
  });
};
