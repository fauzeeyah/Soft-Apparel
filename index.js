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
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            showSection(sectionId);
        });
    });

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

    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCartDisplay();
    }

    function continueShopping() {
        document.querySelector('header nav .nav-left a:first-child').click();
    }

    window.showCart = function() {
        showSection('cart');
        updateCartDisplay();
    }

    
});

// document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const imageDisplaySection = document.getElementById('image-display-section');

    function showImages(category) {
        const images = {
            jilbabs: [
                'images/jilbab1.jpg',
                'images/jilbab2.jpg',
                // Add more image paths here
            ],
            hijabs: [
                'images/hijab1.jpg',
                'images/hijab4.jpg',
                // Add more image paths here
            ],
            // Add more categories and images here
        };

        const selectedImages = images[category] || [];
        imageDisplaySection.innerHTML = selectedImages.map(src => `<img src="${src}" alt="${category}">`).join('');
        show('image-display-section');
    }

    function show(sectionId) {
        document.querySelectorAll('main section').forEach(section => {
            section.style.display = 'none';
        });
        document.getElementById(sectionId).style.display = 'block';
    }

    
//});

