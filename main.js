/* Main JavaScript for Abo Salah Shoes Store */

// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const cartIcon = document.querySelector('.cart-icon');
const cartPopup = document.querySelector('.cart-popup');
const closeCart = document.querySelector('.close-cart');
const overlay = document.querySelector('.overlay');
const backToTop = document.querySelector('.back-to-top');
const heroSlides = document.querySelectorAll('.hero-slide');
const heroDots = document.querySelectorAll('.hero-dot');

// Mobile Menu Toggle
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Cart Popup Toggle
if (cartIcon) {
    cartIcon.addEventListener('click', () => {
        cartPopup.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (closeCart) {
    closeCart.addEventListener('click', () => {
        cartPopup.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });
}

if (overlay) {
    overlay.addEventListener('click', () => {
        cartPopup.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Back to Top Button
window.addEventListener('scroll', () => {
    if (backToTop) {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    }
});

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Hero Slider
let currentSlide = 0;
const slideInterval = 5000; // 5 seconds

function showSlide(index) {
    heroSlides.forEach(slide => slide.classList.remove('active'));
    heroDots.forEach(dot => dot.classList.remove('active'));
    
    heroSlides[index].classList.add('active');
    heroDots[index].classList.add('active');
    currentSlide = index;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % heroSlides.length;
    showSlide(currentSlide);
}

// Initialize slider if elements exist
if (heroSlides.length > 0 && heroDots.length > 0) {
    showSlide(0);
    
    // Auto slide
    setInterval(nextSlide, slideInterval);
    
    // Click on dots
    heroDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
}

// Product Quantity Controls
document.addEventListener('click', function(e) {
    // Product detail page quantity buttons
    if (e.target.classList.contains('qty-btn')) {
        const input = e.target.parentElement.querySelector('.qty-input');
        let value = parseInt(input.value);
        
        if (e.target.textContent === '+') {
            value++;
        } else if (e.target.textContent === '-' && value > 1) {
            value--;
        }
        
        input.value = value;
    }
    
    // Cart quantity buttons
    if (e.target.classList.contains('cart-qty-btn')) {
        const input = e.target.parentElement.querySelector('.cart-qty-input');
        let value = parseInt(input.value);
        
        if (e.target.textContent === '+') {
            value++;
        } else if (e.target.textContent === '-' && value > 1) {
            value--;
        }
        
        input.value = value;
        updateCartTotal();
    }
    
    // Remove item from cart
    if (e.target.classList.contains('remove-item')) {
        e.target.closest('.cart-item').remove();
        updateCartTotal();
    }
});

// Product Options Selection
document.addEventListener('click', function(e) {
    // Size options
    if (e.target.classList.contains('size-option')) {
        const sizeOptions = e.target.parentElement.querySelectorAll('.size-option');
        sizeOptions.forEach(option => option.classList.remove('active'));
        e.target.classList.add('active');
    }
    
    // Color options
    if (e.target.classList.contains('color-option')) {
        const colorOptions = e.target.parentElement.querySelectorAll('.color-option');
        colorOptions.forEach(option => option.classList.remove('active'));
        e.target.classList.add('active');
    }
});

// Product Gallery
const mainImage = document.querySelector('.main-image img');
const thumbnails = document.querySelectorAll('.thumbnail');

if (thumbnails.length > 0 && mainImage) {
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            const imgSrc = thumbnail.querySelector('img').getAttribute('src');
            mainImage.setAttribute('src', imgSrc);
            
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            thumbnail.classList.add('active');
        });
    });
}

// Add to Cart Functionality
const addToCartBtns = document.querySelectorAll('.add-to-cart, .add-to-cart-btn');

addToCartBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Get product info
        let productName, productPrice, productImg;
        
        if (this.classList.contains('add-to-cart')) {
            // From product card
            const productCard = this.closest('.product-card');
            productName = productCard.querySelector('.product-name').textContent;
            productPrice = productCard.querySelector('.price').textContent;
            productImg = productCard.querySelector('.product-img img').getAttribute('src');
        } else {
            // From product details page
            productName = document.querySelector('.product-info-details h1').textContent;
            productPrice = document.querySelector('.current-price').textContent;
            productImg = document.querySelector('.main-image img').getAttribute('src');
        }
        
        // Add to cart
        addProductToCart(productName, productPrice, productImg);
        
        // Show cart popup
        cartPopup.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

function addProductToCart(name, price, img) {
    const cartItems = document.querySelector('.cart-items');
    
    // Check if product already in cart
    const cartItemNames = document.querySelectorAll('.cart-item-name');
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].textContent === name) {
            alert('This product is already in your cart!');
            return;
        }
    }
    
    // Create cart item
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    
    cartItem.innerHTML = `
        <div class="cart-item-img">
            <img src="${img}" alt="${name}">
        </div>
        <div class="cart-item-details">
            <div class="cart-item-name">${name}</div>
            <div class="cart-item-price">${price}</div>
            <div class="cart-item-actions">
                <div class="cart-item-quantity">
                    <button class="cart-qty-btn">-</button>
                    <input type="text" class="cart-qty-input" value="1" readonly>
                    <button class="cart-qty-btn">+</button>
                </div>
                <div class="remove-item">Remove</div>
            </div>
        </div>
    `;
    
    cartItems.appendChild(cartItem);
    updateCartTotal();
    
    // Update cart count
    const cartCount = document.querySelector('.cart-count span');
    cartCount.textContent = document.querySelectorAll('.cart-item').length;
}

function updateCartTotal() {
    const cartItems = document.querySelectorAll('.cart-item');
    let total = 0;
    
    cartItems.forEach(item => {
        const priceText = item.querySelector('.cart-item-price').textContent;
        const price = parseFloat(priceText.replace(/[^\d.]/g, ''));
        const quantity = parseInt(item.querySelector('.cart-qty-input').value);
        total += price * quantity;
    });
    
    document.querySelector('.total-amount').textContent = '$' + total.toFixed(2);
}

// Filter functionality for products page
const filterBtn = document.querySelector('.filter-btn');
if (filterBtn) {
    filterBtn.addEventListener('click', function() {
        // Get filter values
        const brandFilters = document.querySelectorAll('input[name="brand"]:checked');
        const typeFilters = document.querySelectorAll('input[name="type"]:checked');
        const minPrice = document.querySelector('#min-price').value;
        const maxPrice = document.querySelector('#max-price').value;
        
        // Filter products
        const products = document.querySelectorAll('.product-card');
        
        products.forEach(product => {
            let showProduct = true;
            
            // Brand filter
            if (brandFilters.length > 0) {
                const productBrand = product.querySelector('.product-brand').textContent;
                const brandMatch = Array.from(brandFilters).some(filter => 
                    productBrand.toLowerCase().includes(filter.value.toLowerCase())
                );
                
                if (!brandMatch) showProduct = false;
            }
            
            // Type filter
            if (typeFilters.length > 0) {
                const productName = product.querySelector('.product-name').textContent;
                const typeMatch = Array.from(typeFilters).some(filter => 
                    productName.toLowerCase().includes(filter.value.toLowerCase())
                );
                
                if (!typeMatch) showProduct = false;
            }
            
            // Price filter
            if (minPrice || maxPrice) {
                const priceText = product.querySelector('.price').textContent;
                const price = parseFloat(priceText.replace(/[^\d.]/g, ''));
                
                if (minPrice && price < parseFloat(minPrice)) showProduct = false;
                if (maxPrice && price > parseFloat(maxPrice)) showProduct = false;
            }
            
            // Show/hide product
            product.style.display = showProduct ? 'block' : 'none';
        });
        
        // Update products count
        const visibleProducts = document.querySelectorAll('.product-card[style="display: block"]');
        document.querySelector('.products-count').textContent = `Showing ${visibleProducts.length} products`;
    });
}

// Sort functionality for products page
const sortSelect = document.querySelector('.sort-select');
if (sortSelect) {
    sortSelect.addEventListener('change', function() {
        const products = Array.from(document.querySelectorAll('.product-card'));
        const productsGrid = document.querySelector('.products-grid');
        
        // Sort products
        products.sort((a, b) => {
            const priceA = parseFloat(a.querySelector('.price').textContent.replace(/[^\d.]/g, ''));
            const priceB = parseFloat(b.querySelector('.price').textContent.replace(/[^\d.]/g, ''));
            
            if (this.value === 'price-low-high') {
                return priceA - priceB;
            } else if (this.value === 'price-high-low') {
                return priceB - priceA;
            }
            
            return 0;
        });
        
        // Re-append sorted products
        products.forEach(product => {
            productsGrid.appendChild(product);
        });
    });
}

// View options for products page
const viewOptions = document.querySelectorAll('.view-option');
const productsGrid = document.querySelector('.products-grid');

if (viewOptions.length > 0 && productsGrid) {
    viewOptions.forEach(option => {
        option.addEventListener('click', function() {
            viewOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            if (this.classList.contains('grid-view')) {
                productsGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(250px, 1fr))';
            } else {
                productsGrid.style.gridTemplateColumns = '1fr';
            }
        });
    });
}

// Contact Form Validation
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameInput = this.querySelector('input[name="name"]');
        const emailInput = this.querySelector('input[name="email"]');
        const messageInput = this.querySelector('textarea[name="message"]');
        
        let isValid = true;
        
        // Validate name
        if (nameInput.value.trim() === '') {
            alert('Please enter your name');
            isValid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            alert('Please enter a valid email address');
            isValid = false;
        }
        
        // Validate message
        if (messageInput.value.trim() === '') {
            alert('Please enter your message');
            isValid = false;
        }
        
        if (isValid) {
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        }
    });
}

// Newsletter Form Validation
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('.newsletter-input');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(emailInput.value)) {
            alert('Please enter a valid email address');
        } else {
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        }
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Update cart count
    const cartCount = document.querySelector('.cart-count span');
    if (cartCount) {
        cartCount.textContent = document.querySelectorAll('.cart-item').length;
    }
    
    // Initialize product count on products page
    const productsCount = document.querySelector('.products-count');
    const products = document.querySelectorAll('.product-card');
    if (productsCount && products) {
        productsCount.textContent = `Showing ${products.length} products`;
    }
});
