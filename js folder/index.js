document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM elements
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const footerSubscribeButton = document.getElementById('footer-subscribe-button');
    const footerNewsletterEmail = document.getElementById('footer-newsletter-email');
    const aboutUsSection = document.getElementById('about-us');
    const sizeGuideSection = document.getElementById('size-guide');
    const imageDisplaySection = document.getElementById('image-display-section');
    const cart = [];

    // Navigation toggle
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Search button functionality
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', () => {
            alert(`Search query: ${searchInput.value}`);
        });
    }

    // Footer subscribe button functionality
    if (footerSubscribeButton && footerNewsletterEmail) {
        footerSubscribeButton.addEventListener('click', () => {
            const email = footerNewsletterEmail.value;
            if (email) {
                alert(`Subscribed with: ${email}`);
            } else {
                alert('Please enter a valid email address');
            }
        });
    }

    // Scroll to top button functionality
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            scrollToTopBtn.style.display = window.scrollY > 200 ? 'block' : 'none';
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Scrolling text functionality
    const messages = [
        '&lt;&nbsp;&nbsp;Delivery Takes Between 8-12 Days | Express Shipping Available&nbsp;&nbsp;&gt;',
    ];

    const textElement = document.getElementById('scrolling-text');
    if (textElement) {
        let currentIndex = 0;

        function updateText() {
            currentIndex = (currentIndex + 1) % messages.length;
            textElement.innerHTML = messages[currentIndex];
        }

        setInterval(updateText, 5000);
    }

    // Section navigation functionality
    //document.querySelectorAll('.nav-links a').forEach(link => {
       // link.addEventListener('click', (event) => {
          //  event.preventDefault();
           //// const sectionId = link.getAttribute('href').substring(1);
           // showSection(sectionId);
      //  });
  //  });

    function showSection(sectionId) {
        document.querySelectorAll('main section').forEach(section => {
            section.style.display = 'none';
        });

        if (sectionId === 'about-us' && aboutUsSection) {
            aboutUsSection.style.display = 'block';
        } else if (sectionId === 'size-guide' && sizeGuideSection) {
            sizeGuideSection.style.display = 'block';
        } else if (sectionId === 'cart') {
            showCart();
        } else {
            document.getElementById(sectionId).style.display = 'block';
        }
    }

    if (aboutUsSection) aboutUsSection.style.display = 'none';
    if (sizeGuideSection) sizeGuideSection.style.display = 'none';

    // Cart functionality
    function addToCart(product) {
        cart.push(product);
        updateCartDisplay();
        alert('Product added to cart!');
    }

    function updateCartDisplay() {
        const cartCount = document.getElementById('cart-count');
        const cartItems = document.getElementById('cart-items');
        const emptyCartMessage = document.getElementById('empty-cart-message');

        cartCount.textContent = cart.length;

        if (cart.length === 0) {
            cartItems.style.display = 'none';
            emptyCartMessage.style.display = 'block';
        } else {
            cartItems.style.display = 'block';
            emptyCartMessage.style.display = 'none';

            cartItems.innerHTML = '';
            cart.forEach((product, index) => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <div class="cart-item-details">
                        <span>${product.name}</span>
                        <span class="cart-item-price">${product.price}</span>
                    </div>
                    <span class="remove-item" onclick="removeFromCart(${index})">&times;</span>
                `;
                cartItems.appendChild(cartItem);
            });
        }
    }

    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        updateCartDisplay();
    }

    window.continueShopping = function() {
        document.querySelector('header nav .nav-left a:first-child').click();
    }

    window.showCart = function() {
        showSection('cart');
        updateCartDisplay();
    }

    // Image display functionality
    window.showImages = function(category) {
        const images = {
            jilbabs: [
                'images/jilbab1.jpg',
                'images/jilbab4.jpg',
                // Add more image paths here
            ],
            hijabs: [
                'images/hijab1.jpg',
                'images/hijab2.jpg',
                // Add more image paths here
            ],
            dresses: [
                'images/dress1.jpg',
                'images/dress2.jpg',
                'images/Dresses.JPG',
               'images/RR DRESS.webp' ,
              'images/Pearl dress.webp' ,
            ' images/Aminah dress.mp4' , 
            ],
            jumpsuite: [
                'images/jumpsuite.jpg',
                'images/summer girlies.jpg',
                'images/summer.jpg',

                // Add more image paths here
            ],
            bodytop: [
                'images/bodytop1.jpg',
                'images/bodytop2.jpg',
                // Add more image paths here
            ],
            skirt: [
                'images/skirt1.jpg',
                'images/skirt2.jpg',
                // Add more image paths here
            ],
            kids: [
                'images/kids1.jpg',
                'images/kids2.jpg',
                // Add more image paths here
            ],
            'two piece': [
                'images/two-piece1.jpg',
                'images/two-piece2.jpg',
                // Add more image paths here
            ],
            giftingOptions: [
                'images/gifting1.jpg',
                'images/gifting2.jpg',
                // Add more image paths here
            ],
        };

        const selectedImages = images[category] || [];
        imageDisplaySection.innerHTML = selectedImages.map(src => `<img src="${src}" alt="${category}">`).join('');
        show('image-display-section');
    }

    // Footer content display functionality
    window.showContent = function(sectionId) {
        // Hide all footer content sections
        const sections = document.querySelectorAll('.footer-content');
        sections.forEach(section => {
            section.style.display = 'none';
        });

        // Show the selected section
        const selectedSection = document.getElementById(sectionId);
        if (selectedSection) {
            selectedSection.style.display = 'block';
        }
    }
});

// scripts.js

let cart = [];
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotalPrice = document.getElementById('cart-total-price');

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const name = this.getAttribute('data-name');
        const price = parseFloat(this.getAttribute('data-price'));
        addToCart(name, price);
    });
});

function addToCart(name, price) {
    const itemIndex = cart.findIndex(item => item.name === name);
    if (itemIndex === -1) {
        cart.push({ name, price, quantity:  1});
    } else {
        cart[itemIndex].quantity++;
    }
    updateCartUI();
}

function updateCartUI() {
    cartItemsContainer.innerHTML = '';
    if (cart.length === 0) {
        document.getElementById('empty-cart-message').style.display = 'block';
    } else {
        document.getElementById('empty-cart-message').style.display = 'none';
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
            cartItemsContainer.innerHTML += `
                <div class="cart-item">
                    <p>${item.name} x ${item.quantity}</p>
                    <p>£${item.price.toFixed(2)} each</p>
                    <p>Total: £${(item.price * item.quantity).toFixed(2)}</p>
                </div>
            `;
        });
        cartTotalPrice.textContent = total.toFixed(2);
    }
    cartCount.textContent = cart.length;
}

function toggleCart() {
    if (cartModal.style.display === 'block') {
        cartModal.style.display = 'none';
    } else {
        cartModal.style.display = 'block';
    }
}
// cart.js

// Function to get cart items from localStorage
function getCartItems() {
    return JSON.parse(localStorage.getItem('cartItems')) || [];
}

// Function to update cart count
function updateCartCount() {
    const cartItems = getCartItems();
    const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
}

// Function to add item to cart
function addToCart(name, price) {
    const cartItems = getCartItems();
    const existingItem = cartItems.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ name, price, quantity: 1 });
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartCount();
}

// Function to remove item from cart
function removeFromCart(name) {
    let cartItems = getCartItems();
    cartItems = cartItems.filter(item => item.name !== name);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartCount();
}

// Function to calculate total price
function calculateTotalPrice() {
    const cartItems = getCartItems();
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', updateCartCount);
