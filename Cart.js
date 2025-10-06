// داده‌های سبد خرید
let cart = JSON.parse(localStorage.getItem('redBoutiqueCart')) || [];
let cartCount = 0;
let cartTotal = 0;

// DOM Elements
const cartContent = document.getElementById('cart-content');
const cartCountElement = document.getElementById('cart-count');
const loginBtn = document.getElementById('login-btn');
const loginModal = document.getElementById('login-modal');
const closeModal = document.querySelector('.close-modal');

// نمایش سبد خرید
function displayCart() {
    cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // به‌روزرسانی تعداد در نوار ناوبری
    cartCountElement.textContent = cartCount;
    
    if (cart.length === 0) {
        showEmptyCart();
    } else {
        showCartItems();
    }
}

// نمایش حالت سبد خرید خالی
function showEmptyCart() {
    cartContent.innerHTML = `
        <div class="empty-cart">
            <div class="empty-cart-icon">
                <i class="fas fa-shopping-cart"></i>
            </div>
            <h2>سبد خرید شما خالی است</h2>
            <p>می‌توانید از محصولات متنوع ما دیدن کنید</p>
            <a href="index.html" class="shopping-btn">
                <i class="fas fa-shopping-bag"></i>
                شروع به خرید
            </a>
        </div>
    `;
}

// نمایش آیتم‌های سبد خرید
function showCartItems() {
    const subtotal = cartTotal;
    const shipping = subtotal > 200000 ? 0 : 25000;
    const discount = 0; // می‌تواند از کوپن محاسبه شود
    const total = subtotal + shipping - discount;

    cartContent.innerHTML = `
        <div class="cart-content">
            <div class="cart-items-section">
                <div class="cart-items-list">
                    ${cart.map(item => `
                        <div class="cart-item" data-id="${item.id}">
                            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                            <div class="cart-item-details">
                                <h3 class="cart-item-title">${item.name}</h3>
                                <p class="cart-item-category">${item.category}</p>
                                <div class="cart-item-price">${item.price.toLocaleString()} تومان</div>
                            </div>
                            <div class="quantity-controls">
                                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                                <span class="quantity-display">${item.quantity}</span>
                                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                            </div>
                            <button class="remove-btn" onclick="removeFromCart(${item.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    `).join('')}
                </div>
                
                <a href="index.html" class="continue-shopping">
                    <i class="fas fa-arrow-right"></i>
                    ادامه خرید
                </a>
            </div>
            
            <div class="cart-summary">
                <h3 class="summary-title">خلاصه سفارش</h3>
                
                <div class="summary-row">
                    <span>جمع کل:</span>
                    <span>${subtotal.toLocaleString()} تومان</span>
                </div>
                
                <div class="summary-row">
                    <span>هزینه ارسال:</span>
                    <span>${shipping === 0 ? 'رایگان' : shipping.toLocaleString() + ' تومان'}</span>
                </div>
                
                ${discount > 0 ? `
                    <div class="summary-row">
                        <span>تخفیف:</span>
                        <span style="color: #10b981;">-${discount.toLocaleString()} تومان</span>
                    </div>
                ` : ''}
                
                <div class="discount-section">
                    <h4>کد تخفیف دارید؟</h4>
                    <div class="discount-input">
                        <input type="text" placeholder="کد تخفیف را وارد کنید" id="discount-code">
                        <button class="apply-discount" onclick="applyDiscount()">اعمال</button>
                    </div>
                </div>
                
                <div class="summary-row total">
                    <span>مبلغ قابل پرداخت:</span>
                    <span>${total.toLocaleString()} تومان</span>
                </div>
                
                <button class="checkout-btn" onclick="proceedToCheckout()">
                    <i class="fas fa-lock"></i>
                    ادامه فرآیند خرید
                </button>
                
                <div style="text-align: center; margin-top: 1rem;">
                    <img src="https://img.icons8.com/color/48/000000/verified-account.png" alt="امن" style="width: 20px; height: 20px; display: inline-block; margin-left: 5px;">
                    <span style="color: #6b7280; font-size: 0.9rem;">پرداخت امن</span>
                </div>
            </div>
        </div>
    `;
}

// به‌روزرسانی تعداد محصول
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            displayCart();
            showNotification(`تعداد ${item.name} به‌روزرسانی شد`);
        }
    }
}

// حذف از سبد خرید
function removeFromCart(productId) {
    const item = cart.find(item => item.id === productId);
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    displayCart();
    showNotification(`${item.name} از سبد خرید حذف شد`);
}

// اعمال کد تخفیف
function applyDiscount() {
    const discountCode = document.getElementById('discount-code').value;
    // در اینجا می‌توانید منطق اعتبارسنجی کد تخفیف را اضافه کنید
    showNotification('کد تخفیف اعمال شد');
}

// ادامه به صفحه پرداخت
function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('سبد خرید شما خالی است');
        return;
    }
    
    // ذخیره اطلاعات سبد خرید برای صفحه پرداخت
    localStorage.setItem('redBoutiqueCheckout', JSON.stringify({
        items: cart,
        total: cartTotal,
        timestamp: new Date().toISOString()
    }));
    
    // هدایت به صفحه پرداخت
    window.location.href = 'checkout.html';
}

// ذخیره سبد خرید در localStorage
function saveCart() {
    localStorage.setItem('redBoutiqueCart', JSON.stringify(cart));
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

// Event Listeners
loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.classList.add('active');
});

closeModal.addEventListener('click', () => {
    loginModal.classList.remove('active');
});

// بستن مودال با کلیک خارج از آن
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.classList.remove('active');
    }
});

// جستجوی محصولات
document.querySelector('.search-box input')?.addEventListener('input', function(e) {
    // اینجا می‌توانید جستجو را پیاده‌سازی کنید
});

// مقداردهی اولیه
document.addEventListener('DOMContentLoaded', function() {
    displayCart();
    
    // اضافه کردن افکت‌های انیمیشن
    setTimeout(() => {
        document.querySelectorAll('.cart-item').forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            item.classList.add('fade-in-up');
        });
    }, 100);
});

// افکت‌های ویبره برای تعاملات
function addVibrationEffect(element) {
    element.style.transform = 'scale(1.1)';
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 300);
}

// مدیریت رویدادهای تاچ برای موبایل
document.addEventListener('touchstart', function() {}, { passive: true });
