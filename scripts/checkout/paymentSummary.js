import { cart } from '../../data/cart.js';
import { products } from '../../data/products.js';
import { deliveryArr } from '../../data/deliveryOption.js';
import { formattingMoney } from '../../data/utils/money.js';

export function renderPaymentSummary() {
  let productTotalCents = 0;
  let shippingCents = 0;

  cart.forEach(cartItem => {
    const product = products.find(p => p.id === cartItem.productId);
    const delivery = deliveryArr.find(d => d.id === cartItem.deliveryOptionId);

    productTotalCents += product.priceCents * cartItem.quantity;
    shippingCents += delivery.costCents * cartItem.quantity;
  });

  const totalBeforeTax = productTotalCents + shippingCents;
  const estimatedTax = Math.round(totalBeforeTax * 0.1);
  const orderTotal = totalBeforeTax + estimatedTax;

  document.querySelector('.js-payment-summary').innerHTML = `
    <div class="payment-summary-title">Order Summary</div>

    <div class="payment-summary-row">
      <div>Items:</div>
      <div>$${formattingMoney(productTotalCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping & handling:</div>
      <div>$${formattingMoney(shippingCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div>$${formattingMoney(totalBeforeTax)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div>$${formattingMoney(estimatedTax)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div>$${formattingMoney(orderTotal)}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `;
}
