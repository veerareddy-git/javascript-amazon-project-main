import {cart, addToCart} from '../data/cart.js';
import { products } from '../data/products.js';
import {formattingMoney} from '../data/utils/money.js'

let productsHtml = '';
products.forEach(productObj => {
  productsHtml += `
   <div class="product-container">

          <div class="product-image-container">
            <img class="product-image"
              src="${productObj.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${productObj.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${productObj.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${productObj.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${formattingMoney(productObj.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-cart"
           data-product-id="${productObj.id}">
            Add to Cart
          </button>

    </div>
  `;
});


function getTotalQuantity() {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

document.querySelector('.js-grid-container').innerHTML = productsHtml;
document.querySelectorAll('.js-add-cart').forEach((button) => {
  button.addEventListener('click', () => {

  const productId = button.dataset.productId;
  const container = button.closest('.product-container');
  const quantity = Number(container.querySelector('.js-quantity-selector').value);
  addToCart(productId, quantity)
  const totalQuantity = getTotalQuantity();
   document.querySelector('.js-cart-quantity').innerHTML = totalQuantity;
  });

});
