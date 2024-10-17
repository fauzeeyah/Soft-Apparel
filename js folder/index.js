document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM elements
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const footerSubscribeButton = document.getElementById('footer-subscribe-button');
    const footerNewsletterEmail = document.getElementById('footer-newsletter-email');
    const aboutUsSection = document.getElementById('about-us');
    const sizeGuideSection = document.getElementById('size-guide');
    const imageDisplaySection = document.getElementById('image-display-section');

    // Navigation toggle
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Search button functionality
    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const query = searchInput.value.trim().toLowerCase();
            if (query) {
                performSearch(query);
            }
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
    function showSection(sectionId) {
        document.querySelectorAll('main section').forEach(section => {
            section.style.display = 'none';
        });

        if (sectionId === 'about-us' && aboutUsSection) {
            aboutUsSection.style.display = 'block';
        } else if (sectionId === 'size-guide' && sizeGuideSection) {
            sizeGuideSection.style.display = 'block';
        } else {
            document.getElementById(sectionId).style.display = 'block';
        }
    }

    if (aboutUsSection) aboutUsSection.style.display = 'none';
    if (sizeGuideSection) sizeGuideSection.style.display = 'none';

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
                'images/Aminah dress.mp4',
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
        showSection('image-display-section');
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

let cart = [];
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotalPrice = document.getElementById('cart-total-price');

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const name = this.getAttribute('data-name');
        const price = parseFloat(this.getAttribute('data-price'));
        addToCart(name, price); // Note: Ensure this function is defined in cart.js
    });
});

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

function performSearch(query) {
    const items = document.querySelectorAll(".image-item");
    items.forEach(item => {
        const title = item.querySelector("h2").innerText.toLowerCase();
        const description = item.querySelector(".description").innerText.toLowerCase();
        
        if (title.includes(query) || description.includes(query)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}
