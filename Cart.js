// داده‌های نمونه محصولات با تصاویر واقعی
const products = [
    {
        id: 1,
        name: "پیراهن مردانه کلاسیک",
        price: 149000,
        originalPrice: 199000,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "men",
        badge: "discount",
        isNew: false,
        isHot: true
    },
    {
        id: 2,
        name: "بلوز زنانه مجلسی",
        price: 189000,
        originalPrice: 239000,
        image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "women",
        badge: "new",
        isNew: true,
        isHot: false
    },
    {
        id: 3,
        name: "شلوار جین مردانه",
        price: 219000,
        originalPrice: 279000,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "men",
        badge: "hot",
        isNew: false,
        isHot: true
    },
    {
        id: 4,
        name: "دامن زنانه",
        price: 129000,
        originalPrice: 169000,
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "women",
        badge: "discount",
        isNew: false,
        isHot: false
    },
    {
        id: 5,
        name: "تی‌شرت ورزشی",
        price: 79000,
        originalPrice: 99000,
        image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "sale",
        badge: "discount",
        isNew: true,
        isHot: false
    },
    {
        id: 6,
        name: "لباس بچه‌گانه",
        price: 89000,
        originalPrice: 119000,
        image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "kids",
        badge: "new",
        isNew: true,
        isHot: false
    },
    {
        id: 7,
        name: "کت و شلوار مردانه",
        price: 359000,
        originalPrice: 459000,
        image: "https://images.unsplash.com/photo-1593030103066-0093718efeb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "men",
        badge: "hot",
        isNew: false,
        isHot: true
    },
    {
        id: 8,
        name: "لباس مجلسی زنانه",
        price: 289000,
        originalPrice: 359000,
        image: "https://images.unsplash.com/photo-1566479179816-d55d961d6b1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "women",
        badge: "new",
        isNew: true,
        isHot: false
    }
];

// مدیریت state برنامه
const state = {
    cart: JSON.parse(localStorage.getItem('redBoutiqueCart')) || [],
    wishlist: JSON.parse(localStorage.getItem('redBoutiqueWishlist')) || [],
    currentUser: null,
    currentFilter: 'all'
};

// DOM Elements
const elements = {
    // Preloader
    preloader: document.getElementById('preloader'),
    
    // Navigation
    mainMenu: document.getElementById('main-menu'),
    mobileMenuBtn: document.getElementById('mobile-menu-btn'),
    menuLinks: document.querySelectorAll('.menu-link'),
    
    // Search
    searchToggle: document.getElementById('search-toggle'),
    searchBox: document.getElementById('search-box'),
    searchInput: document.querySelector('.search-input'),
    
    // Actions
    cartCount: document.getElementById('cart-count'),
    wishlistCount: document.getElementById('wishlist-count'),
    profileBtn: document.getElementById('profile-btn'),
    
    // Products
    productsGrid: document.getElementById('products-grid'),
    filterBtns: document.querySelectorAll('.filter-btn'),
    
    // Auth Modal
    authModal: document.getElementById('auth-modal'),
    closeAuthModal: document.getElementById('close-auth-modal'),
    authTabs: document.querySelectorAll('.auth-tab'),
    authForms: document.querySelectorAll('.auth-form'),
    
    // Sections
    heroSection: document.getElementById('home'),
    productsSection: document.getElementById('products')
};

// مدیریت Preloader
function initPreloader() {
    if (elements.preloader) {
        setTimeout(() => {
            elements.preloader.style.opacity = '0';
            setTimeout(() => {
                elements.preloader.style.display = 'none';
            }, 500);
        }, 2000);
    }
}

// مدیریت ناوبری
function initNavigation() {
    // منوی موبایل
    if (elements.mobileMenuBtn) {
        elements.mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    // اسکرول نرم برای منو
    elements.menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // آپدیت منوی فعال
                updateActiveMenu(link);
                
                // بستن منوی موبایل
                if (window.innerWidth <= 768) {
                    toggleMobileMenu();
                }
            }
        });
    });

    // آپدیت منوی فعال بر اساس اسکرول
    window.addEventListener('scroll', updateActiveMenuOnScroll);
}

function toggleMobileMenu() {
    if (elements.mainMenu) {
        elements.mainMenu.classList.toggle('active');
    }
}

function updateActiveMenu(clickedLink) {
    elements.menuLinks.forEach(link => link.classList.remove('active'));
    clickedLink.classList.add('active');
}

function updateActiveMenuOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    const headerHeight = document.querySelector('.header').offsetHeight;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - headerHeight - 50;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            const activeLink = document.querySelector(`.menu-link[href="#${sectionId}"]`);
            if (activeLink) {
                elements.menuLinks.forEach(link => link.classList.remove('active'));
                activeLink.classList.add('active');
            }
        }
    });
}

// مدیریت جستجو
function initSearch() {
    if (elements.searchToggle && elements.searchBox) {
        elements.searchToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            elements.searchBox.classList.toggle('active');
            if (elements.searchBox.classList.contains('active')) {
                elements.searchInput.focus();
            }
        });

        // بستن جستجو با کلیک خارج
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                elements.searchBox.classList.remove('active');
            }
        });

        // جستجوی محصولات
        if (elements.searchInput) {
            elements.searchInput.addEventListener('input', handleSearch);
        }
    }
}

function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    if (searchTerm.length === 0) {
        displayProducts(products);
        return;
    }

    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );

    displayProducts(filteredProducts);
}

// مدیریت سبد خرید و علاقه‌مندی‌ها
function initCartAndWishlist() {
    updateCartCount();
    updateWishlistCount();
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = state.cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        state.cart.push({
            ...product,
            quantity: 1
        });
    }
    
    saveToLocalStorage('redBoutiqueCart', state.cart);
    updateCartCount();
    showNotification(`${product.name} به سبد خرید اضافه شد`, 'success');
    
    // افکت ویبره
    createVibrationEffect(elements.cartCount);
}

function removeFromCart(productId) {
    state.cart = state.cart.filter(item => item.id !== productId);
    saveToLocalStorage('redBoutiqueCart', state.cart);
    updateCartCount();
    showNotification('محصول از سبد خرید حذف شد', 'info');
}

function toggleWishlist(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = state.wishlist.findIndex(item => item.id === productId);
    
    if (existingIndex > -1) {
        state.wishlist.splice(existingIndex, 1);
        showNotification(`${product.name} از علاقه‌مندی‌ها حذف شد`, 'info');
    } else {
        state.wishlist.push(product);
        showNotification(`${product.name} به علاقه‌مندی‌ها اضافه شد`, 'success');
    }
    
    saveToLocalStorage('redBoutiqueWishlist', state.wishlist);
    updateWishlistCount();
    
    // آپدیت نمایش دکمه‌های علاقه‌مندی
    updateWishlistButtons();
}

function updateCartCount() {
    if (elements.cartCount) {
        const count = state.cart.reduce((total, item) => total + item.quantity, 0);
        elements.cartCount.textContent = count;
        
        // افکت وقتی آیتم اضافه می‌شود
        if (count > 0) {
            elements.cartCount.classList.add('pulse');
            setTimeout(() => {
                elements.cartCount.classList.remove('pulse');
            }, 1000);
        }
    }
}

function updateWishlistCount() {
    if (elements.wishlistCount) {
        elements.wishlistCount.textContent = state.wishlist.length;
    }
}

function updateWishlistButtons() {
    document.querySelectorAll('.product-wishlist').forEach(btn => {
        const productId = parseInt(btn.closest('.product-card').dataset.id);
        const isInWishlist = state.wishlist.some(item => item.id === productId);
        
        if (isInWishlist) {
            btn.classList.add('active');
            btn.innerHTML = '<i class="fas fa-heart"></i>';
        } else {
            btn.classList.remove('active');
            btn.innerHTML = '<i class="far fa-heart"></i>';
        }
    });
}

// نمایش محصولات
function initProducts() {
    displayProducts(products);
    initProductFilters();
}

function displayProducts(productsToShow) {
    if (!elements.productsGrid) return;

    elements.productsGrid.innerHTML = productsToShow.map(product => `
        <div class="product-card fade-in-up" data-id="${product.id}" data-category="${product.category}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <div class="product-badges">
                    ${product.badge === 'discount' ? 
                        `<span class="product-badge badge-discount">${calculateDiscount(product)}%</span>` : ''}
                    ${product.isNew ? '<span class="product-badge badge-new">جدید</span>' : ''}
                    ${product.isHot ? '<span class="product-badge badge-hot">پرفروش</span>' : ''}
                </div>
                <button class="product-wishlist ${state.wishlist.some(item => item.id === product.id) ? 'active' : ''}" 
                        onclick="toggleWishlist(${product.id})">
                    <i class="${state.wishlist.some(item => item.id === product.id) ? 'fas' : 'far'} fa-heart"></i>
                </button>
            </div>
            <div class="product-info">
                <div class="product-category">${getCategoryName(product.category)}</div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">
                    <span class="current-price">${product.price.toLocaleString()} تومان</span>
                    ${product.originalPrice ? 
                        `<span class="original-price">${product.originalPrice.toLocaleString()} تومان</span>` : ''}
                </div>
                <div class="product-actions">
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-bag"></i>
                        افزودن به سبد
                    </button>
                    <button class="quick-view" onclick="quickView(${product.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // فعال کردن انیمیشن‌های اسکرول
    initScrollAnimations();
}

function calculateDiscount(product) {
    if (!product.originalPrice) return 0;
    return Math.round((1 - product.price / product.originalPrice) * 100);
}

function getCategoryName(category) {
    const categories = {
        'men': 'مردانه',
        'women': 'زنانه',
        'kids': 'بچه‌گانه',
        'sale': 'تخفیف‌دار'
    };
    return categories[category] || category;
}

// فیلتر محصولات
function initProductFilters() {
    elements.filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // آپدیت دکمه‌های فعال
            elements.filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // فیلتر محصولات
            const filter = btn.dataset.filter;
            state.currentFilter = filter;
            
            let filteredProducts = products;
            if (filter !== 'all') {
                filteredProducts = products.filter(product => 
                    filter === 'sale' ? product.originalPrice : product.category === filter
                );
            }
            
            displayProducts(filteredProducts);
        });
    });
}

// مشاهده سریع محصول
function quickView(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // در اینجا می‌توانید یک مودال برای مشاهده سریع ایجاد کنید
    showNotification(`مشاهده ${product.name}`, 'info');
}

// مدیریت مودال احراز هویت
function initAuthModal() {
    // باز کردن مودال
    if (elements.profileBtn) {
        elements.profileBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openAuthModal();
        });
    }

    // بستن مودال
    if (elements.closeAuthModal) {
        elements.closeAuthModal.addEventListener('click', closeAuthModal);
    }

    // تغییر تب‌ها
    elements.authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            switchAuthTab(tabName);
        });
    });

    // بستن مودال با کلیک خارج
    if (elements.authModal) {
        elements.authModal.addEventListener('click', (e) => {
            if (e.target === elements.authModal) {
                closeAuthModal();
            }
        });
    }

    // بستن با کلید ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && elements.authModal.classList.contains('active')) {
            closeAuthModal();
        }
    });

    // مدیریت فرم‌ها
    initAuthForms();
}

function openAuthModal() {
    if (elements.authModal) {
        elements.authModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeAuthModal() {
    if (elements.authModal) {
        elements.authModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function switchAuthTab(tabName) {
    // آپدیت تب‌های فعال
    elements.authTabs.forEach(tab => {
        tab.classList.toggle('active', tab.dataset.tab === tabName);
    });

    // نمایش فرم مربوطه
    elements.authForms.forEach(form => {
        form.classList.toggle('active', form.classList.contains(`${tabName}-form`));
    });
}

function initAuthForms() {
    const loginForm = document.querySelector('.login-form');
    const registerForm = document.querySelector('.register-form');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
}

function handleLogin(e) {
    e.preventDefault();
    // در اینجا می‌توانید منطق ورود را پیاده‌سازی کنید
    showNotification('ورود با موفقیت انجام شد', 'success');
    closeAuthModal();
}

function handleRegister(e) {
    e.preventDefault();
    // در اینجا می‌توانید منطق ثبت‌نام را پیاده‌سازی کنید
    showNotification('ثبت‌نام با موفقیت انجام شد', 'success');
    switchAuthTab('login');
}

// انیمیشن‌های اسکرول
function initScrollAnimations() {
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

// افکت‌های بصری
function initVisualEffects() {
    // افکت‌های hover برای کارت محصولات
    initProductCardEffects();
    
    // افکت‌های کلیک
    initClickEffects();
}

function initProductCardEffects() {
    document.addEventListener('mousemove', (e) => {
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

function initClickEffects() {
    // افکت Ripple برای دکمه‌ها
    document.addEventListener('click', (e) => {
        if (e.target.matches('.btn, .add-to-cart, .category-btn')) {
            createRippleEffect(e.target, e);
        }
    });
}

function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
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
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function createVibrationEffect(element) {
    element.style.transform = 'scale(1.3)';
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 300);
}

// سیستم نوتیفیکیشن
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${getNotificationIcon(type)}"></i>
        <span>${message}</span>
    `;
    
    // استایل‌های نوتیفیکیشن
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        left: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 3000;
        animation: slideInLeft 0.3s ease, slideOutLeft 0.3s ease 2.7s forwards;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function getNotificationIcon(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getNotificationColor(type) {
    const colors = {
        'success': '#10b981',
        'error': '#ef4444',
        'warning': '#f59e0b',
        'info': '#3b82f6'
    };
    return colors[type] || '#3b82f6';
}

// utility functions
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

function loadFromLocalStorage(key) {
    try {
        return JSON.parse(localStorage.getItem(key)) || [];
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        return [];
    }
}

// مدیریت رویدادهای پنجره
function initWindowEvents() {
    // ریسایز
    window.addEventListener('resize', handleResize);
    
    // لود
    window.addEventListener('load', handleLoad);
    
    // اسکرول
    window.addEventListener('scroll', handleScroll);
}

function handleResize() {
    // بستن منوی موبایل در صورت تغییر سایز به دسکتاپ
    if (window.innerWidth > 768 && elements.mainMenu) {
        elements.mainMenu.classList.remove('active');
    }
}

function handleLoad() {
    // لود lazy برای تصاویر
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.loading = 'lazy';
    });
}

function handleScroll() {
    // افکت‌های اسکرول پیشرفته
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-background');
    
    parallaxElements.forEach(element => {
        element.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
}

// مقداردهی اولیه برنامه
function initApp() {
    initPreloader();
    initNavigation();
    initSearch();
    initCartAndWishlist();
    initProducts();
    initAuthModal();
    initScrollAnimations();
    initVisualEffects();
    initWindowEvents();
    
    // اضافه کردن استایل‌های داینامیک
    addDynamicStyles();
}

// اضافه کردن استایل‌های داینامیک
function addDynamicStyles() {
    if (!document.querySelector('#dynamic-styles')) {
        const style = document.createElement('style');
        style.id = 'dynamic-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            @keyframes slideInLeft {
                from {
                    transform: translateX(-100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutLeft {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(-100%);
                    opacity: 0;
                }
            }
            
            .pulse {
                animation: pulse 0.5s ease-in-out;
            }
            
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.2); }
            }
        `;
        document.head.appendChild(style);
    }
}

// راه�اندازی برنامه وقتی DOM لود شد
document.addEventListener('DOMContentLoaded', initApp);

// مدیریت رویدادهای تاچ برای موبایل
document.addEventListener('touchstart', function() {}, { passive: true });

// توابع global برای استفاده در HTML
window.addToCart = addToCart;
window.toggleWishlist = toggleWishlist;
window.quickView = quickView;

// بهینه‌سازی عملکرد
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // در اینجا می‌توانید Service Worker ثبت کنید
    });
}
