import { cart, updateDeliveryOption, removeFromCart } from '../../data/cart.js';
import { products } from '../../data/products.js';
import { formattingMoney } from '../../data/utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryArr } from '../../data/deliveryOption.js';
import { renderPaymentSummary } from './paymentSummary.js';

export function renderOrderSummary() {
  let cartSummary = '';

  cart.forEach(cartItem => {
    const product = products.find(p => p.id === cartItem.productId);
    const delivery = deliveryArr.find(d => d.id === cartItem.deliveryOptionId);

    const deliveryDate = dayjs()
      .add(delivery.deliveryDate, 'days')
      .format('dddd, MMMM D');

    cartSummary += `
      <div class="cart-item-container">
        <div class="delivery-date">
          Delivery date: ${deliveryDate}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image" src="${product.image}">

          <div class="cart-item-details">
            <div class="product-name">${product.name}</div>
            <div class="product-price">
              $${formattingMoney(product.priceCents)}
            </div>
            <div class="product-quantity">
              Quantity: ${cartItem.quantity}
              <span class="delete-quantity-link link-primary js-delete"
                data-product-id="${cartItem.productId}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(cartItem)}
          </div>
        </div>
      </div>
    `;
  });

  document.querySelector('.js-order-summary').innerHTML = cartSummary;

  addDeliveryListeners();
  addDeleteListeners();
}

function deliveryOptionsHTML(cartItem) {
  let html = '';

  deliveryArr.forEach(option => {
    const date = dayjs()
      .add(option.deliveryDate, 'days')
      .format('dddd, MMMM D');

    const price =
      option.costCents === 0
        ? 'FREE'
        : `$${formattingMoney(option.costCents)}`;

    html += `
      <div class="delivery-option js-delivery-option"
        data-product-id="${cartItem.productId}"
        data-delivery-option-id="${option.id}">
        <input type="radio"
          name="${cartItem.productId}"
          ${option.id === cartItem.deliveryOptionId ? 'checked' : ''}>
        <div>
          <div class="delivery-option-date">${date}</div>
          <div class="delivery-option-price">${price}</div>
        </div>
      </div>
    `;
  });

  return html;
}

function addDeliveryListeners() {
  document.querySelectorAll('.js-delivery-option')
    .forEach(el => {
      el.addEventListener('click', () => {
        updateDeliveryOption(
          el.dataset.productId,
          el.dataset.deliveryOptionId
        );
        renderOrderSummary();
        renderPaymentSummary();
      });
    });
}

function addDeleteListeners() {
  document.querySelectorAll('.js-delete')
    .forEach(el => {
      el.addEventListener('click', () => {
        removeFromCart(el.dataset.productId);
        renderOrderSummary();
        renderPaymentSummary();
      });
    });
}
