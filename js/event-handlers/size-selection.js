export const sizeSelectionHandler = () => {
  const sizeSelection = document.querySelectorAll(".size-selection p");
  const productSize = document.querySelector("#product-size");
  let selectedSize = "Medium";
  sizeSelection.forEach(function (element) {
    let size = "";
    element.addEventListener("click", function (event) {
      sizeSelection.forEach(function (element) {
        if (element.id === "current-selection") {
          element.id = "";
        }
        event.target.id = "current-selection";
      });
      size = event.target.className.replace("size ", "");

      switch (size) {
        case "xs":
          selectedSize = "X-Small";
          break;
        case "s":
          selectedSize = "Small";
          break;
        case "m":
          selectedSize = "Medium";
          break;
        case "l":
          selectedSize = "Large";
          break;
        case "xl":
          selectedSize = "X-Large";
          break;
        default:
          break;
      }
      productSize.innerHTML = selectedSize;
    });
  });
};
