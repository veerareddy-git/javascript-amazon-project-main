

const cart = {
  items: JSON.parse(localStorage.getItem('cart')) || [],

  saveToStorage: function() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  },

  addToCart: function(productId, quantity = 1) {
    let matchingItem = this.items.find(item => item.productId === productId);

    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      this.items.push({
        productId: productId,
        quantity: quantity,
        deliveryOptionId: '1'
      });
    }

    this.saveToStorage();
  },

  updateDeliveryOption: function(productId, deliveryOptionId) {
    const item = this.items.find(item => item.productId === productId);
    if (item) {
      item.deliveryOptionId = deliveryOptionId;
      this.saveToStorage();
    }
  },

  removeFromCart: function(productId) {
    this.items = this.items.filter(item => item.productId !== productId);
    this.saveToStorage();
  },

  getTotalQuantity: function() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }
};


export { cart };



