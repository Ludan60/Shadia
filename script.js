// Mobile WhatsApp Button and Scroll Animations

// Mobile Menu Toggle Functionality
function toggleMobileMenu() {
    console.log('toggleMobileMenu called'); // Debug log
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
    } else {
        console.log('Elements not found:', { navMenu, navToggle });
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
    
    // Add animation classes to CSS
    const style = document.createElement('style');
    style.textContent = `
        section {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease-out;
        }
        
        section.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .hero-section {
            opacity: 1;
            transform: none;
        }
        
        .whatsapp-btn {
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
      
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Create and show loading spinner
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loading);
    
    // Hide loading after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loading.classList.add('hidden');
            setTimeout(() => {
                document.body.removeChild(loading);
            }, 500);
        }, 1000);
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
    scrollToTop.style.cssText = `
        position: fixed;
        bottom: 90px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: linear-gradient(45deg, #D4AF37, #FFD700);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
    `;
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
    
    // Sudanese Hero functionality
    const sudaneseSelectors = document.querySelectorAll('.selector-sudanese');
    const dynamicSubtitle = document.getElementById('dynamic-subtitle');

    // Sudanese content data
    const sudaneseContent = {
        dress: {
            subtitle: 'فساتين مخصصة بروح سودانية أصيلة'
        },
        bedding: {
            subtitle: 'مفروشات فاخرة لأحلام هانئة'
        },
        curtains: {
            subtitle: 'ستائر أنيقة تكمل جمال منزلك'
        }
    };

    // Initialize sudanese hero
    function initSudaneseHero() {
        // Set initial active product
        updateSudaneseDisplay('dress');

        // Add click event listeners
        sudaneseSelectors.forEach(selector => {
            selector.addEventListener('click', function() {
                const product = this.dataset.product;
                updateSudaneseDisplay(product);

                // Remove active class from all selectors
                sudaneseSelectors.forEach(s => s.classList.remove('active'));
                // Add active class to clicked selector
                this.classList.add('active');
            });
        });

        // Start sudanese animations
        startSudaneseAnimations();
    }

    function updateSudaneseDisplay(product) {
        // Update subtitle
        if (dynamicSubtitle) {
            dynamicSubtitle.textContent = sudaneseContent[product].subtitle;
            dynamicSubtitle.style.opacity = '0';
            dynamicSubtitle.style.transform = 'translateY(10px)';

            setTimeout(() => {
                dynamicSubtitle.style.opacity = '1';
                dynamicSubtitle.style.transform = 'translateY(0)';
            }, 300);
        }
    }

    function startSudaneseAnimations() {
        // Add floating effect to geometric shapes
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            shape.style.animationDelay = `${index * 0.5}s`;
        });
    }

    // Initialize sudanese hero when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSudaneseHero);
    } else {
        initSudaneseHero();
    }

    // Contact Form functionality
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const submitBtn = document.querySelector('.submit-btn');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset messages
            successMessage.classList.add('d-none');
            errorMessage.classList.add('d-none');
            
            // Validate form
            if (!validateForm()) {
                showError('يرجى ملء جميع الحقول المطلوبة بشكل صحيح');
                return;
            }
            
            // Show loading state
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>جاري الإرسال...';
            submitBtn.disabled = true;
            
            // Prepare WhatsApp message
            const formData = new FormData(contactForm);
            const message = prepareWhatsAppMessage(formData);
            
            // Send to WhatsApp after a short delay (simulating processing)
            setTimeout(() => {
                try {
                    const whatsappURL = `https://wa.me/249123456789?text=${encodeURIComponent(message)}`;
                    window.open(whatsappURL, '_blank');
                    showSuccess();
                    contactForm.reset();
                } catch (error) {
                    showError('حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.');
                } finally {
                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }
            }, 1500);
        });
    }
    
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
        if (!document.querySelector('#toast-styles')) {
            const toastStyles = document.createElement('style');
            toastStyles.id = 'toast-styles';
            toastStyles.textContent = `
                .toast-notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: linear-gradient(135deg, #D4AF37, #FFD700);
                    color: #2c1810;
                    padding: 1rem 1.5rem;
                    border-radius: 10px;
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    animation: slideInRight 0.3s ease-out;
                    max-width: 300px;
                    font-weight: 500;
                }
                
                .toast-notification.error {
                    background: linear-gradient(135deg, #dc3545, #c82333);
                    color: white;
                }
                
                .toast-notification.success {
                    background: linear-gradient(135deg, #28a745, #20c997);
                    color: white;
                }
                
                .toast-content i {
                    font-size: 1.2rem;
                }
                
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
                
                .toast-notification {
                    animation: slideInRight 0.3s ease-out, slideOutRight 0.3s ease-out 2.7s forwards;
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
            `;
            document.head.appendChild(toastStyles);
        }
        
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
