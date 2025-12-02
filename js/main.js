/* ============================================
   KIDDYMART - MAIN JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // 1. PRELOADER
    // ============================================
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('hidden');
        }, 1000);
    });

    // ============================================
    // 2. INITIALIZE AOS ANIMATIONS
    // ============================================
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // ============================================
    // 3. HERO SLIDER (Swiper)
    // ============================================
    const heroSlider = new Swiper('.hero-slider', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        pagination: {
            el: '.hero-slider .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.hero-slider .swiper-button-next',
            prevEl: '.hero-slider .swiper-button-prev',
        },
    });

    // ============================================
    // 4. NEW ARRIVALS SLIDER
    // ============================================
    const arrivalsSlider = new Swiper('.arrivals-slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.arrivals-slider .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.arrivals-slider .swiper-button-next',
            prevEl: '.arrivals-slider .swiper-button-prev',
        },
        breakpoints: {
            576: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            1024: {
                slidesPerView: 4,
            },
            1400: {
                slidesPerView: 5,
            }
        }
    });

    // ============================================
    // 5. TESTIMONIALS SLIDER
    // ============================================
    const testimonialsSlider = new Swiper('.testimonials-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.testimonials-slider .swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            }
        }
    });

    // ============================================
    // 6. BRANDS SLIDER
    // ============================================
    const brandsSlider = new Swiper('.brands-slider', {
        slidesPerView: 2,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        breakpoints: {
            576: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 4,
            },
            1024: {
                slidesPerView: 6,
            }
        }
    });

    // ============================================
    // 7. MOBILE MENU
    // ============================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileNavClose = document.querySelector('.mobile-nav-close');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileNav.classList.add('active');
            mobileNavOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (mobileNavClose) {
        mobileNavClose.addEventListener('click', closeMobileMenu);
    }

    if (mobileNavOverlay) {
        mobileNavOverlay.addEventListener('click', closeMobileMenu);
    }

    function closeMobileMenu() {
        mobileNav.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Mobile Submenu Toggle
    const mobileSubmenus = document.querySelectorAll('.mobile-menu .has-submenu > a');
    mobileSubmenus.forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            this.parentElement.classList.toggle('active');
        });
    });

    // ============================================
    // 8. STICKY HEADER
    // ============================================
    const header = document.querySelector('.main-header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
        
        lastScrollTop = scrollTop;
    });

    // ============================================
    // 9. BACK TO TOP BUTTON
    // ============================================
    const backToTop = document.querySelector('.back-to-top');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    if (backToTop) {
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================
    // 10. PRODUCT TABS (Featured Products)
    // ============================================
    const tabButtons = document.querySelectorAll('.products-tabs .tab-btn');
    const productCards = document.querySelectorAll('.products-grid .product-card');

    tabButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.dataset.tab;
            
            productCards.forEach(function(card) {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ============================================
    // 11. COUNTDOWN TIMER (Deal of the Day)
    // ============================================
    function updateCountdown() {
        const now = new Date();
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 2); // 2 days from now
        endDate.setHours(23, 59, 59, 0);
        
        const diff = endDate - now;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        
        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ============================================
    // 12. WISHLIST FUNCTIONALITY
    // ============================================
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');
    
    wishlistButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
            
            const icon = this.querySelector('i');
            if (this.classList.contains('active')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                showNotification('Added to Wishlist! 💖', 'success');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                showNotification('Removed from Wishlist', 'info');
            }
            
            updateWishlistCount();
        });
    });

    function updateWishlistCount() {
        const activeWishlist = document.querySelectorAll('.wishlist-btn.active').length;
        const wishlistBadge = document.querySelector('.wishlist-action .badge');
        if (wishlistBadge) {
            wishlistBadge.textContent = activeWishlist;
        }
    }

    // ============================================
    // 13. ADD TO CART FUNCTIONALITY
    // ============================================
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    
    addToCartButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add animation to cart icon
            const cartIcon = document.querySelector('.cart-action .action-icon');
            cartIcon.classList.add('bounce');
            setTimeout(() => cartIcon.classList.remove('bounce'), 500);
            
            showNotification('Added to Cart! 🛒', 'success');
            updateCartCount();
        });
    });

    function updateCartCount() {
        const cartBadge = document.querySelector('.cart-action .badge');
        if (cartBadge) {
            let count = parseInt(cartBadge.textContent);
            cartBadge.textContent = count + 1;
        }
    }

    // ============================================
    // 14. QUICK VIEW MODAL
    // ============================================
    const quickViewButtons = document.querySelectorAll('.quick-view-btn');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalClose = document.querySelector('.modal-close');

    quickViewButtons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            if (modalOverlay) {
                modalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    }

    function closeModal() {
        if (modalOverlay) {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
            closeMobileMenu();
            closeCartSidebar();
        }
    });

    // ============================================
    // 15. CART SIDEBAR
    // ============================================
    const cartAction = document.querySelector('.cart-action');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartClose = document.querySelector('.cart-close');

    if (cartAction) {
        cartAction.addEventListener('click', function(e) {
            e.preventDefault();
            if (cartSidebar) {
                cartSidebar.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }

    if (cartClose) {
        cartClose.addEventListener('click', closeCartSidebar);
    }

    function closeCartSidebar() {
        if (cartSidebar) {
            cartSidebar.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // ============================================
    // 16. QUANTITY SELECTOR
    // ============================================
    const quantityWrappers = document.querySelectorAll('.quantity-wrapper, .quantity-selector, .cart-quantity');
    
    quantityWrappers.forEach(function(wrapper) {
        const minusBtn = wrapper.querySelector('.quantity-btn:first-child, .qty-btn:first-child, button:first-child');
        const plusBtn = wrapper.querySelector('.quantity-btn:last-child, .qty-btn:last-child, button:last-child');
        const input = wrapper.querySelector('input');
        
        if (minusBtn && plusBtn && input) {
            minusBtn.addEventListener('click', function() {
                let value = parseInt(input.value);
                if (value > 1) {
                    input.value = value - 1;
                }
            });
            
            plusBtn.addEventListener('click', function() {
                let value = parseInt(input.value);
                input.value = value + 1;
            });
        }
    });

    // ============================================
    // 17. PRODUCT COLOR/SIZE SELECTION
    // ============================================
    const colorOptions = document.querySelectorAll('.color-option, .color-option-item, .color-filter-item');
    
    colorOptions.forEach(function(option) {
        option.addEventListener('click', function() {
            const parent = this.closest('.color-options, .color-options-detail, .color-filter');
            if (parent) {
                parent.querySelectorAll('.color-option, .color-option-item, .color-filter-item').forEach(opt => {
                    opt.classList.remove('active');
                });
            }
            this.classList.add('active');
        });
    });

    const sizeOptions = document.querySelectorAll('.size-option, .size-option-item, .size-filter-item');
    
    sizeOptions.forEach(function(option) {
        option.addEventListener('click', function() {
            if (this.classList.contains('disabled')) return;
            
            const parent = this.closest('.size-options, .size-options-detail, .size-filter');
            if (parent) {
                parent.querySelectorAll('.size-option, .size-option-item, .size-filter-item').forEach(opt => {
                    opt.classList.remove('active');
                });
            }
            this.classList.add('active');
        });
    });

    // ============================================
    // 18. PRODUCT TABS (Detail Page)
    // ============================================
    const productTabButtons = document.querySelectorAll('.product-tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    productTabButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const tab = this.dataset.tab;
            
            productTabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            this.classList.add('active');
            const targetPane = document.getElementById(tab);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });

    // ============================================
    // 19. PRODUCT IMAGE GALLERY
    // ============================================
    const thumbnails = document.querySelectorAll('.thumbnail-item, .modal-thumb');
    const mainImage = document.querySelector('.main-image img, .modal-main-image img');

    thumbnails.forEach(function(thumb) {
        thumb.addEventListener('click', function() {
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const newSrc = this.querySelector('img').src;
            if (mainImage) {
                mainImage.style.opacity = 0;
                setTimeout(() => {
                    mainImage.src = newSrc;
                    mainImage.style.opacity = 1;
                }, 200);
            }
        });
    });

    // ============================================
    // 20. STAR RATING (Review Form)
    // ============================================
    const ratingStars = document.querySelectorAll('.rating-select i');
    
    ratingStars.forEach(function(star, index) {
        star.addEventListener('click', function() {
            ratingStars.forEach((s, i) => {
                if (i <= index) {
                    s.classList.remove('far');
                    s.classList.add('fas', 'active');
                } else {
                    s.classList.remove('fas', 'active');
                    s.classList.add('far');
                }
            });
        });
        
        star.addEventListener('mouseenter', function() {
            ratingStars.forEach((s, i) => {
                if (i <= index) {
                    s.classList.add('hover');
                }
            });
        });
        
        star.addEventListener('mouseleave', function() {
            ratingStars.forEach(s => s.classList.remove('hover'));
        });
    });

    // ============================================
    // 21. FAQ ACCORDION
    // ============================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(function(item) {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(i => i.classList.remove('active'));
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ============================================
    // 22. SHOP SIDEBAR TOGGLE (Mobile)
    // ============================================
    const filterToggle = document.querySelector('.filter-toggle-btn');
    const shopSidebar = document.querySelector('.shop-sidebar');
    
    if (filterToggle && shopSidebar) {
        filterToggle.addEventListener('click', function() {
            shopSidebar.classList.toggle('active');
        });
    }

    // ============================================
    // 23. VIEW MODE TOGGLE (Grid/List)
    // ============================================
    const viewModeButtons = document.querySelectorAll('.view-mode-btn');
    const productsGrid = document.querySelector('.products-grid');
    
    viewModeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            viewModeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const mode = this.dataset.view;
            if (productsGrid) {
                if (mode === 'list') {
                    productsGrid.classList.add('list-view');
                } else {
                    productsGrid.classList.remove('list-view');
                }
            }
        });
    });

    // ============================================
    // 24. PASSWORD TOGGLE (Login/Register)
    // ============================================
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    togglePasswordButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const input = this.closest('.input-icon').querySelector('input');
            
            if (input.type === 'password') {
                input.type = 'text';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
        });
    });

    // ============================================
    // 25. PAYMENT METHOD SELECTION
    // ============================================
    const paymentMethods = document.querySelectorAll('.payment-method');
    
    paymentMethods.forEach(function(method) {
        method.addEventListener('click', function() {
            paymentMethods.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
            this.querySelector('input[type="radio"]').checked = true;
        });
    });

    // ============================================
    // 26. NEWSLETTER FORM
    // ============================================
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                showNotification('Thanks for subscribing! 🎉', 'success');
                this.reset();
            }
        });
    }

    // ============================================
    // 27. SEARCH FUNCTIONALITY
    // ============================================
    const searchInput = document.querySelector('.search-wrapper input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function() {
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `pages/shop.html?search=${encodeURIComponent(query)}`;
            }
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim();
                if (query) {
                    window.location.href = `pages/shop.html?search=${encodeURIComponent(query)}`;
                }
            }
        });
    }

    // ============================================
    // 28. NOTIFICATION SYSTEM
    // ============================================
    function showNotification(message, type = 'info') {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span class="notification-message">${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#6BCB77' : type === 'error' ? '#FF6B6B' : '#4D96FF'};
            color: white;
            padding: 15px 25px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 99999;
            display: flex;
            align-items: center;
            gap: 15px;
            animation: slideInRight 0.5s ease;
            font-weight: 600;
        `;
        
        document.body.appendChild(notification);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => notification.remove());
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    // Add notification animations to stylesheet
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        .notification-close {
            background: rgba(255,255,255,0.2);
            border: none;
            width: 25px;
            height: 25px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
        }
    `;
    document.head.appendChild(style);

    // ============================================
    // 29. LAZY LOADING IMAGES
    // ============================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));

    // ============================================
    // 30. 3D CARD TILT EFFECT
    // ============================================
    const tiltCards = document.querySelectorAll('.card-3d');
    
    tiltCards.forEach(function(card) {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });

    // ============================================
    // 31. SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ============================================
    // 32. FORM VALIDATION
    // ============================================
    const forms = document.querySelectorAll('form');
    
    forms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    field.style.borderColor = '#FF6B6B';
                } else {
                    field.classList.remove('error');
                    field.style.borderColor = '';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                showNotification('Please fill in all required fields', 'error');
            }
        });
    });

    // ============================================
    // 33. PRICE RANGE SLIDER (Shop Page)
    // ============================================
    // This would typically use a library like noUiSlider
    // For simplicity, we'll use basic inputs
    const priceMin = document.querySelector('.price-input input[name="min"]');
    const priceMax = document.querySelector('.price-input input[name="max"]');
    
    if (priceMin && priceMax) {
        const updatePriceRange = () => {
            const min = parseInt(priceMin.value) || 0;
            const max = parseInt(priceMax.value) || 100;
            const fill = document.querySelector('.price-range-fill');
            
            if (fill) {
                fill.style.left = `${(min / 200) * 100}%`;
                fill.style.right = `${100 - (max / 200) * 100}%`;
            }
        };
        
        priceMin.addEventListener('input', updatePriceRange);
        priceMax.addEventListener('input', updatePriceRange);
    }

    // ============================================
    // 34. COOKIE CONSENT
    // ============================================
    const showCookieConsent = () => {
        if (!localStorage.getItem('cookieConsent')) {
            const cookieBar = document.createElement('div');
            cookieBar.className = 'cookie-consent';
            cookieBar.innerHTML = `
                <div class="cookie-content">
                    <span>🍪 We use cookies to enhance your shopping experience!</span>
                    <div class="cookie-buttons">
                        <button class="cookie-accept">Accept All</button>
                        <button class="cookie-settings">Settings</button>
                    </div>
                </div>
            `;
            
            cookieBar.style.cssText = `
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: linear-gradient(135deg, #FF6B9D 0%, #FF8E53 100%);
                color: white;
                padding: 20px;
                z-index: 99999;
                animation: slideUp 0.5s ease;
            `;
            
            const style = document.createElement('style');
            style.textContent = `
                @keyframes slideUp {
                    from { transform: translateY(100%); }
                    to { transform: translateY(0); }
                }
                .cookie-content {
                    max-width: 1400px;
                    margin: 0 auto;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    gap: 15px;
                }
                .cookie-buttons {
                    display: flex;
                    gap: 10px;
                }
                .cookie-accept, .cookie-settings {
                    padding: 10px 25px;
                    border: none;
                    border-radius: 25px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .cookie-accept {
                    background: white;
                    color: #FF6B9D;
                }
                .cookie-settings {
                    background: transparent;
                    border: 2px solid white;
                    color: white;
                }
                .cookie-accept:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                }
            `;
            
            document.head.appendChild(style);
            document.body.appendChild(cookieBar);
            
            cookieBar.querySelector('.cookie-accept').addEventListener('click', () => {
                localStorage.setItem('cookieConsent', 'accepted');
                cookieBar.style.animation = 'slideUp 0.5s ease reverse';
                setTimeout(() => cookieBar.remove(), 500);
            });
        }
    };
    
    setTimeout(showCookieConsent, 2000);

    // ============================================
    // 35. INITIALIZE EVERYTHING
    // ============================================
    console.log('🎒 KiddyMart initialized successfully!');

});

// ============================================
// ADDITIONAL HELPER FUNCTIONS
// ============================================

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Local storage helpers
const Storage = {
    get: (key) => {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch {
            return null;
        }
    },
    set: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    },
    remove: (key) => {
        localStorage.removeItem(key);
    }
};

// Cart functionality
const Cart = {
    items: Storage.get('cart') || [],
    
    add: function(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({ ...product, quantity: 1 });
        }
        this.save();
    },
    
    remove: function(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.save();
    },
    
    updateQuantity: function(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
                this.remove(productId);
            }
        }
        this.save();
    },
    
    getTotal: function() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    
    getCount: function() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    },
    
    save: function() {
        Storage.set('cart', this.items);
    },
    
    clear: function() {
        this.items = [];
        this.save();
    }
};

// Wishlist functionality
const Wishlist = {
    items: Storage.get('wishlist') || [],
    
    add: function(product) {
        if (!this.items.find(item => item.id === product.id)) {
            this.items.push(product);
            this.save();
        }
    },
    
    remove: function(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.save();
    },
    
    isInWishlist: function(productId) {
        return this.items.some(item => item.id === productId);
    },
    
    getCount: function() {
        return this.items.length;
    },
    
    save: function() {
        Storage.set('wishlist', this.items);
    }
};