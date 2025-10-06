// داده‌های نمونه محصولات با تصاویر واقعی
const products = [
    {
        id: 1,
        name: "پیراهن مردانه کلاسیک",
        price: 149000,
        originalPrice: 199000,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "مردانه"
    },
    {
        id: 2,
        name: "بلوز زنانه مجلسی",
        price: 189000,
        originalPrice: 239000,
        image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "زنانه"
    },
    {
        id: 3,
        name: "شلوار جین مردانه",
        price: 219000,
        originalPrice: 279000,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "مردانه"
    },
    {
        id: 4,
        name: "دامن زنانه",
        price: 129000,
        originalPrice: 169000,
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "زنانه"
    },
    {
        id: 5,
        name: "تی‌شرت ورزشی",
        price: 79000,
        originalPrice: 99000,
        image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "ورزشی"
    },
    {
        id: 6,
        name: "لباس بچه‌گانه",
        price: 89000,
        originalPrice: 119000,
        image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "بچه‌گانه"
    },
    {
        id: 7,
        name: "کت و شلوار مردانه",
        price: 359000,
        originalPrice: 459000,
        image: "https://images.unsplash.com/photo-1593030103066-0093718efeb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "مردانه"
    },
    {
        id: 8,
        name: "لباس مجلسی زنانه",
        price: 289000,
        originalPrice: 359000,
        image: "https://images.unsplash.com/photo-1566479179816-d55d961d6b1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "زنانه"
    }
];

// اسلایدر داینامیک
const slides = [
    {
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        title: "کالکشن جدید 2024",
        description: "جدیدترین مدل‌های روز را در بوتیک قرمز تجربه کنید"
    },
    {
        image: "https://images.unsplash.com/photo-1558769132-cb25e5b8b7b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        title: "تخفیف‌های ویژه",
        description: "تا 50% تخفیف برای محصولات منتخب بوتیک قرمز"
    },
    {
        image: "https://images.unsplash.com/photo-1485231183945-fffde7cb34f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        title: "مد بهاری",
        description: "آماده شوید برای فصل بهار با جدیدترین طرح‌ها"
    }
];

// سبد خرید
let cart = JSON.parse(localStorage.getItem('redBoutiqueCart')) || [];
let cartCount = 0;
let cartTotal = 0;
let currentSlide = 0;

// DOM Elements
const productsGrid = document.getElementById('products-grid');
const cartIcon = document.getElementById('cart-icon');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCart = document.getElementById('close-cart');
const cartItems = document.getElementById('cart-items');
const cartCountElement = document.getElementById('cart-count');
const cartTotalPrice = document.getElementById('cart-total-price');
const loginBtn = document.getElementById('login-btn');
const loginModal = document.getElementById('login-modal');
const closeModal = document.querySelector('.close-modal');
const sliderContainer = document.getElementById('slider-container');
const preloader = document.getElementById('preloader');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const categoriesMenu = document.getElementById('categories-menu');

// نمایش محصولات
function displayProducts() {
    productsGrid.innerHTML = '';
    products.forEach(product => {
        const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
        
        const productCard = document.createElement('div');
        productCard.className = 'product-card fade-in-up';
        productCard.innerHTML = `
            ${discount > 0 ? `<div class="discount-badge">${discount}%</div>` : ''}
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">
                    ${product.price.toLocaleString()} تومان
                    ${product.originalPrice ? `<span class="original-price">${product.originalPrice.toLocaleString()}</span>` : ''}
                </div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i>
                    افزودن به سبد خرید
                </button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
    
    // فعال کردن انیمیشن‌های اسکرول
    setTimeout(() => {
        observeElements();
    }, 100);
}

// مدیریت سبد خرید
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification(`${product.name} به سبد خرید اضافه شد`);
    
    // افکت ویبره برای آیکون سبد خرید
    cartIcon.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartIcon.style.transform = 'scale(1)';
    }, 300);
}

function removeFromCart(productId) {
    const item = cart.find(item => item.id === productId);
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    
    if (item) {
        showNotification(`${item.name} از سبد خرید حذف شد`);
    }
}

function updateCartQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
        }
    }
}

function updateCart() {
    // به‌روزرسانی تعداد
    cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = cartCount;
    
    // به‌روزرسانی جمع کل
    cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    cartTotalPrice.textContent = cartTotal.toLocaleString() + ' تومان';
    
    // ذخیره در localStorage
    saveCart();
    
    // نمایش آیتم‌های سبد خرید
    updateCartItems();
}

function updateCartItems() {
    if (!cartItems) return;
    
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <div class="cart-item-price">${item.price.toLocaleString()} تومان</div>
            </div>
            <div class="cart-item-actions">
                <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, 1)">+</button>
                <button class="remove-item" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
}

// ذخیره سبد خرید در localStorage
function saveCart() {
    localStorage.setItem('redBoutiqueCart', JSON.stringify(cart));
}

// بارگذاری سبد خرید از localStorage
function loadCart() {
    const savedCart = localStorage.getItem('redBoutiqueCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

// نوتیفیکیشن
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// اسلایدر داینامیک
function initSlider() {
    if (!sliderContainer) return;
    
    // ایجاد اسلایدها
    slides.forEach((slide, index) => {
        const slideElement = document.createElement('div');
        slideElement.className = `slide ${index === 0 ? 'active' : ''}`;
        slideElement.innerHTML = `
            <img src="${slide.image}" alt="${slide.title}">
            <div class="slide-content">
                <h2>${slide.title}</h2>
                <p>${slide.description}</p>
                <button class="shop-now" onclick="scrollToProducts()">همین حالا بخرید</button>
            </div>
        `;
        sliderContainer.appendChild(slideElement);
    });

    // ایجاد کنترل‌ها
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'slider-controls';
    
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        controlsContainer.appendChild(dot);
    });

    // ایجاد فلش‌ها
    const prevArrow = document.createElement('button');
    prevArrow.className = 'slider-arrow prev-slide';
    prevArrow.innerHTML = '❮';
    prevArrow.addEventListener('click', prevSlide);

    const nextArrow = document.createElement('button');
    nextArrow.className = 'slider-arrow next-slide';
    nextArrow.innerHTML = '❯';
    nextArrow.addEventListener('click', nextSlide);

    sliderContainer.appendChild(prevArrow);
    sliderContainer.appendChild(nextArrow);
    sliderContainer.appendChild(controlsContainer);
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    goToSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(currentSlide);
}

// اسلاید خودکار
function startAutoSlide() {
    setInterval(nextSlide, 5000);
}

// اسکرول به بخش محصولات
function scrollToProducts() {
    const productsSection = document.querySelector('.featured-products');
    if (productsSection) {
        productsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Observer برای انیمیشن‌های اسکرول
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.fade-in-up').forEach(el => {
        observer.observe(el);
    });
}

// Preloader
function hidePreloader() {
    if (!preloader) return;
    
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 2000);
}

// مدیریت منوی موبایل
function initMobileMenu() {
    if (mobileMenuBtn && categoriesMenu) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            categoriesMenu.classList.toggle('active');
        });

        // بستن منوی موبایل با کلیک خارج
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.category-menu') && !e.target.closest('.mobile-menu-btn')) {
                categoriesMenu.classList.remove('active');
            }
        });

        // بستن منو با کلیک روی لینک‌ها
        categoriesMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                categoriesMenu.classList.remove('active');
            });
        });
    }
}

// مدیریت سایدبار سبد خرید
function initCartSidebar() {
    if (cartIcon && cartSidebar && closeCart) {
        cartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            cartSidebar.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        closeCart.addEventListener('click', () => {
            cartSidebar.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        // بستن سایدبار با کلیک خارج
        document.addEventListener('click', (e) => {
            if (e.target === cartSidebar) {
                cartSidebar.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // بستن سایدبار با کلید ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && cartSidebar.classList.contains('active')) {
                cartSidebar.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// مدیریت مودال ورود
function initLoginModal() {
    if (loginBtn && loginModal && closeModal) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        closeModal.addEventListener('click', () => {
            loginModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        // بستن مودال با کلیک خارج
        window.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                loginModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // بستن مودال با کلید ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && loginModal.classList.contains('active')) {
                loginModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// جستجوی محصولات
function initSearch() {
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const filteredProducts = products.filter(product => 
                product.name.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm)
            );
            
            if (searchTerm) {
                displayFilteredProducts(filteredProducts);
            } else {
                displayProducts();
            }
        });
    }
}

function displayFilteredProducts(filteredProducts) {
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    filteredProducts.forEach(product => {
        const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
        
        const productCard = document.createElement('div');
        productCard.className = 'product-card fade-in-up';
        productCard.innerHTML = `
            ${discount > 0 ? `<div class="discount-badge">${discount}%</div>` : ''}
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">
                    ${product.price.toLocaleString()} تومان
                    ${product.originalPrice ? `<span class="original-price">${product.originalPrice.toLocaleString()}</span>` : ''}
                </div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i>
                    افزودن به سبد خرید
                </button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// اسکرول نرم برای لینک‌ها
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// تغییر استایل نوار ناوبری هنگام اسکرول
function initNavbarScroll() {
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
                header.style.boxShadow = '0 2px 30px rgba(220, 38, 38, 0.1)';
            } else {
                header.style.background = 'var(--white)';
                header.style.backdropFilter = 'none';
                header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            }
        });
    }
}

// افکت‌های اضافی برای تعاملات
function initInteractiveEffects() {
    // افکت Ripple برای دکمه‌ها
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart') || 
            e.target.closest('.add-to-cart')) {
            const btn = e.target.classList.contains('add-to-cart') ? e.target : e.target.closest('.add-to-cart');
            createRippleEffect(btn, e);
        }
    });

    // افکت Hover برای کارت محصولات
    document.addEventListener('mousemove', function(e) {
        const cards = document.querySelectorAll('.product-card');
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

function createRippleEffect(button, event) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// اضافه کردن استایل ripple به صورت داینامیک
function addRippleStyles() {
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textC
