// Mobile WhatsApp Button and Scroll Animations

// Mobile Menu Toggle Functionality
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');

    if (navMenu && navToggle) {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');

        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Show WhatsApp button on mobile
    function showWhatsAppButton() {
        const whatsappBtn = document.querySelector('.whatsapp-fixed');
        if (window.innerWidth <= 768) {
            whatsappBtn.style.display = 'block';
        } else {
            whatsappBtn.style.display = 'none';
        }
    }
    
    // Initial check
    showWhatsAppButton();
    
    // Check on resize
    window.addEventListener('resize', showWhatsAppButton);
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const navMenu = document.querySelector('.nav-menu');
            const navToggle = document.querySelector('.nav-toggle');

            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');

        if (navMenu && navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
    
    // Smooth scroll for internal links
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
    
    // Scroll animations for sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    
    // Preloader Animation
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            setTimeout(function() {
                preloader.classList.add('fade-out');
                setTimeout(function() {
                    preloader.style.display = 'none';
                }, 500);
            }, 1000); // Adjusted delay for a better experience
        }
    });
    
    // Add hover effects for cards
    document.querySelectorAll('.dress-card, .bedding-card, .faq-item').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add click tracking for analytics (optional)
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        link.addEventListener('click', function() {
            // Track WhatsApp clicks (you can replace with your analytics)
            console.log('WhatsApp link clicked:', this.href);
        });
    });
    
    // Add scroll-to-top functionality
    const scrollToTop = document.createElement('button');
    scrollToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTop.className = 'scroll-to-top';
    document.body.appendChild(scrollToTop);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTop.style.opacity = '1';
            scrollToTop.style.visibility = 'visible';
        } else {
            scrollToTop.style.opacity = '0';
            scrollToTop.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    scrollToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    

    // Contact Form functionality
   
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function(e) {
      e.preventDefault();
    
      const formData = new FormData(form);
      const params = new URLSearchParams(formData);
    
      fetch("https://script.google.com/macros/s/AKfycbyt5HJl_VOqhPaBcV_GICHwDyJZ9NAWekX45Ui0YRRz8OPTxRIRURAfY0tmvDtQL5QdVQ/exec", {
        method: "POST",
        body: params
      })
      .then(res => res.text())
      .then(data => {
        // ✅ عرض رسالة النجاح
        document.getElementById('successMessage').style.display = 'block';
        
        // ✅ جمع بيانات المستخدم من الحقول
        const name = formData.get('name') || '';
        const email = formData.get('email') || '';
        const phone = formData.get('phone') || '';
        const service = formData.get('service') || '';
        const details = formData.get('details') || '';
        
        // ✅ تكوين نص رسالة واتساب
        const whatsappMessage =
          `مرحبًا، أنا ${name}%0A` +
          `📧 الإيميل: ${email}%0A` +
          `📞 الهاتف: ${phone}%0A` +
          `🛠 الخدمة المطلوبة: ${service}%0A` +
          `📝 التفاصيل: ${details}`;
    
        // ✅ رقم الواتساب (بدون +)
        const phoneNumber = "249908302209"; // ← غيّريه لرقمك الصحيح
        
        // ✅ تحويل المستخدم إلى واتساب
        window.location.href = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
        
        // ✅ تفريغ الحقول
        form.reset();
      })
      .catch(err => {
        document.getElementById('errorMessage').style.display = 'block';
      });
    });
    


    
    function validateForm() {
        const requiredFields = contactForm.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('is-invalid');
                isValid = false;
            } else {
                field.classList.remove('is-invalid');
                field.classList.add('is-valid');
            }
        });
        
        // Validate email if provided
        const emailField = document.getElementById('emailAddress');
        if (emailField.value && !isValidEmail(emailField.value)) {
            emailField.classList.add('is-invalid');
            isValid = false;
        } else if (emailField.value) {
            emailField.classList.remove('is-invalid');
            emailField.classList.add('is-valid');
        }
        
        return isValid;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function prepareWhatsAppMessage(formData) {
        const name = formData.get('fullName');
        const phone = formData.get('phoneNumber');
        const email = formData.get('emailAddress');
        const productType = formData.get('productType');
        const message = formData.get('message');
        const budget = formData.get('budget');
        
        let whatsappMessage = `🌟 طلب جديد  🌟\n\n`;
        whatsappMessage += `👤 الاسم: ${name}\n`;
        whatsappMessage += `📱 الهاتف: ${phone}\n`;
        if (email) whatsappMessage += `✉️ البريد الإلكتروني: ${email}\n`;
        if (productType) whatsappMessage += `🛍️ نوع المنتج: ${productType}\n`;
        if (budget) whatsappMessage += `💰 الميزانية: ${budget}\n`;
        whatsappMessage += `\n📝 التفاصيل:\n${message}\n\n`;
        whatsappMessage += `تم إرسال هذا الطلب من خلال موقع شادية `;
        
        return whatsappMessage;
    }
    
    function showSuccess() {
        successMessage.classList.remove('d-none');
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            successMessage.classList.add('d-none');
        }, 5000);
    }
    
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('d-none');
        errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            errorMessage.classList.add('d-none');
        }, 5000);
    }
    
    // Real-time validation
    const formInputs = contactForm.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.classList.add('is-invalid');
            } else if (this.type === 'email' && this.value && !isValidEmail(this.value)) {
                this.classList.add('is-invalid');
            } else if (this.value.trim()) {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            }
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('is-invalid') && this.value.trim()) {
                this.classList.remove('is-invalid');
                if (this.type === 'email' && isValidEmail(this.value)) {
                    this.classList.add('is-valid');
                }
            }
        });
    });
    
    // Newsletter form functionality
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('.newsletter-input');
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                // Simulate newsletter signup
                emailInput.value = '';
                showToast('تم الاشتراك في النشرة الإخبارية بنجاح!', 'success');
            } else {
                showToast('يرجى إدخال بريد إلكتروني صحيح', 'error');
            }
        });
    }
    
    // Social media click tracking
    document.querySelectorAll('.social-icon').forEach(icon => {
        icon.addEventListener('click', function() {
            const platform = this.classList[1]; // Get the platform class name
            console.log(`Social media click: ${platform}`);
            // You can add analytics tracking here
        });
    });
    
    // Footer animation on scroll
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.8s ease-out forwards';
            }
        });
    }, { threshold: 0.1 });
    
    const footerElements = document.querySelectorAll('.footer-brand, .footer-links, .footer-services, .footer-social');
    footerElements.forEach(element => footerObserver.observe(element));
    
    // Toast notification function
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast-notification ${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-triangle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(toast);
        
        // Add CSS for toast
        
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 3000);
    }
    
    // Toast notification system (existing code remains)
    
    // Stats Counter Animation - REMOVED (no longer needed in minimalist design)
    // The new design doesn't use animated stats counters
    
    // Initialize systems (existing code remains)
});

// Additional utility functions
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('is-invalid');
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
        }
    });
    
    return isValid;
}

// Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Call lazy loading
lazyLoadImages();
