// مدیریت منوی موبایل
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // بستن منو با کلیک روی لینک‌ها
    document.querySelectorAll('.nav-menu li a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
        });
    });
    
    // مدیریت سوالات متداول
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // بستن سایر آیتم‌ها
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // باز/بسته کردن آیتم جاری
            item.classList.toggle('active');
        });
    });
    
    // لودینگ تدریجی
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
    
    // افکت اسکرول برای روایات
    window.addEventListener('scroll', function() {
        const traditionItems = document.querySelectorAll('.tradition-item');
        const windowHeight = window.innerHeight;
        
        traditionItems.forEach(item => {
            const position = item.getBoundingClientRect().top;
            if (position < windowHeight - 100) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        });
    });
    
    // محاسبه زمان غیبت کبرا
    function calculateGhaybatTime() {
        const startDate = new Date(941, 7, 15); // شروع غیبت کبرا
        const currentDate = new Date();
        
        const diffTime = currentDate - startDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const years = Math.floor(diffDays / 365);
        const remainingDays = diffDays % 365;
        const months = Math.floor(remainingDays / 30);
        const days = remainingDays % 30;
        
        document.getElementById('years').textContent = years;
        document.getElementById('months').textContent = months;
        document.getElementById('days').textContent = days;
    }
    
    // محاسبه سن امام زمان
    function calculateImamAge() {
        const birthDate = new Date(869, 7, 7); // تولد امام زمان
        const currentDate = new Date();
        
        const diffTime = currentDate - birthDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const years = Math.floor(diffDays / 365);
        const remainingDays = diffDays % 365;
        const months = Math.floor(remainingDays / 30);
        const days = remainingDays % 30;
        
        document.getElementById('imam-years').textContent = years;
        document.getElementById('imam-months').textContent = months;
        document.getElementById('imam-days').textContent = days;
    }
    
    // اسکرول نرم برای منو
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // اجرای محاسبات اولیه
    calculateGhaybatTime();
    calculateImamAge();
    
    // به روز رسانی هر دقیقه
    setInterval(function() {
        calculateGhaybatTime();
        calculateImamAge();
    }, 60000);
});

// ثبت Service Worker برای PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// مدیریت حالت آفلاین
window.addEventListener('online', function() {
    document.body.classList.remove('offline');
});

window.addEventListener('offline', function() {
    document.body.classList.add('offline');
});

// مدیریت کلیک روی آیتم‌های صوتی
document.querySelectorAll('.audio-item').forEach(item => {
    item.addEventListener('click', function() {
        // در اینجا می‌توانید منطق پخش صوت را اضافه کنید
        alert('برای دسترسی به فایل‌های صوتی کامل، لطفاً از طریق پیج اینستاگرام با ما در ارتباط باشید.');
    });
});

// مدیریت رویدادهای لمسی برای بهبود UX در موبایل
document.addEventListener('touchstart', function() {}, {passive: true});

// بهینه‌سازی عملکرد
window.addEventListener('load', function() {
    // حذف انیمیشن‌ها هنگام کاهش حرکت
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (mediaQuery.matches) {
        document.querySelectorAll('*').forEach(el => {
            el.style.animation = 'none';
            el.style.transition = 'none';
        });
    }
});
