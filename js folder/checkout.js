document.addEventListener("DOMContentLoaded", function () {
  displayCartItems();
  updateCartTotal();
});

function getCartItems() {
  // Example data structure for cart items
  return [
    { id: 1, name: 'Jumpsuit', price: 30, quantity: 2, image: 'images/jumpsuit 1.webp' },
    { id: 2, name: 'Dresses', price: 35, quantity: 3, image: 'images/Dresses.jpg' }
  ];
}

function displayCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartItems = getCartItems();

  cartItemsContainer.innerHTML = '';

  cartItems.forEach(item => {
    // Create a new cart item element
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';

    // Insert HTML for the cart item
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <div class="item-details">
        <h3>${item.name}</h3>
        <p>Price: £${item.price.toFixed(2)}</p>
        <p>Quantity: ${item.quantity}</p>
      </div>
    `;

    // Append the new cart item element to the container
    cartItemsContainer.appendChild(cartItem);
  });
}

function updateCartTotal() {
  const totalPriceElement = document.getElementById('total-price');
  const cartItems = getCartItems();

  let total = 0;
  cartItems.forEach(item => {
    total += item.price * item.quantity;
  });

  // Update total price with proper formatting
  totalPriceElement.textContent = `£${total.toFixed(2)}`;
}