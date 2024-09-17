document.addEventListener("DOMContentLoaded", function () {
  displayCartItems();
  updateCartTotal();
  updateCartCount();
});

function getCartItems() {

  return [
    { id: 1, name: 'Jumpsuit', price: 30, quantity: 1, image: 'images/jumpsuit 1.webp' },
    { id: 2, name: 'Adire', price: 35, quantity: 1, image: 'images/Adire (1).jpg' },
    { id: 3, name: 'pearl', price: 35, quantity: 2, image: 'images/Pearl dress.webp' },
    { id: 4, name: 'Hijab', price: 35, quantity: 1, image: 'images/hijabs1.jpg' }
  ];
}

function saveCartItems(cartItems) {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
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
        <button onclick="removeFromCart(${item.id})">Remove</button>
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
  totalPriceElement.textContent = `£${total.toFixed()}`;
}

function updateCartCount() {
  const cartItems = getCartItems();
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  document.getElementById('cart-count').textContent = cartCount;
}

function addToCart(name, price, image) {
  const cartItems = getCartItems();
  const existingItem = cartItems.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    const newId = cartItems.length > 0 ? Math.max(...cartItems.map(item => item.id)) + 1 : 1;
    cartItems.push({ id: newId, name, price, quantity: 1, image });
  }
  saveCartItems(cartItems);
  displayCartItems();
  updateCartTotal();
  updateCartCount();
}

function removeFromCart(id) {
  let cartItems = getCartItems();
  cartItems = cartItems.filter(item => item.id !== id);
  saveCartItems(cartItems);
  displayCartItems(); // Refresh cart display
  updateCartTotal();  // Update total
  updateCartCount();  // Update count
}

function calculateTotalPrice() {
  const cartItems = getCartItems();
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
}
