/**
 * Navigation JavaScript for Luxury Villa Retreat
 * Handles mobile menu, smooth scrolling, and navigation interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    initializeMobileMenu();
    
    // Smooth scrolling for anchor links
    initializeSmoothScrolling();
    
    // Navbar scroll effects
    initializeNavbarScrollEffects();
    
    // Active navigation highlighting
    initializeActiveNavigation();
});

/**
 * Initialize mobile menu toggle functionality
 */
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            const isOpen = mobileMenu.classList.contains('hidden');
            
            if (isOpen) {
                mobileMenu.classList.remove('hidden');
                mobileMenuBtn.setAttribute('aria-expanded', 'true');
                // Change hamburger to X icon
                updateMobileMenuIcon(mobileMenuBtn, true);
            } else {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                // Change X back to hamburger icon
                updateMobileMenuIcon(mobileMenuBtn, false);
            }
        });
        
        // Close mobile menu when clicking on a link
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                updateMobileMenuIcon(mobileMenuBtn, false);
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                updateMobileMenuIcon(mobileMenuBtn, false);
            }
        });
    }
}

/**
 * Update mobile menu icon between hamburger and X
 */
function updateMobileMenuIcon(button, isOpen) {
    const icon = button.querySelector('svg');
    if (icon) {
        if (isOpen) {
            icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
        } else {
            icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
        }
    }
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initializeSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or empty
            if (href === '#' || href === '') {
                return;
            }
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                // Calculate offset for fixed navbar
                const navbarHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                history.pushState(null, null, href);
            }
        });
    });
}

/**
 * Initialize navbar scroll effects
 */
function initializeNavbarScrollEffects() {
    const navbar = document.querySelector('nav');
    let lastScrollTop = 0;
    let isScrolling = false;
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (!isScrolling) {
                window.requestAnimationFrame(function() {
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    
                    // Add/remove scrolled class for styling
                    if (scrollTop > 50) {
                        navbar.classList.add('navbar-scrolled');
                    } else {
                        navbar.classList.remove('navbar-scrolled');
                    }
                    
                    // Hide/show navbar on scroll (optional)
                    if (scrollTop > lastScrollTop && scrollTop > 100) {
                        // Scrolling down
                        navbar.style.transform = 'translateY(-100%)';
                    } else {
                        // Scrolling up
                        navbar.style.transform = 'translateY(0)';
                    }
                    
                    lastScrollTop = scrollTop;
                    isScrolling = false;
                });
                
                isScrolling = true;
            }
        });
    }
}

/**
 * Initialize active navigation highlighting
 */
function initializeActiveNavigation() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    const sections = document.querySelectorAll('section[id]');
    
    if (navLinks.length === 0 || sections.length === 0) {
        return;
    }
    
    function updateActiveNavigation() {
        const scrollPosition = window.scrollY + 100; // Offset for navbar
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section's nav link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Throttle scroll events for performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateActiveNavigation();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Initial call
    updateActiveNavigation();
}

/**
 * Utility function to handle keyboard navigation
 */
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Handle Escape key to close mobile menu
        if (e.key === 'Escape') {
            const mobileMenu = document.getElementById('mobile-menu');
            const mobileMenuBtn = document.getElementById('mobile-menu-btn');
            
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                if (mobileMenuBtn) {
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    updateMobileMenuIcon(mobileMenuBtn, false);
                    mobileMenuBtn.focus();
                }
            }
        }
        
        // Handle Enter and Space for custom buttons
        if (e.key === 'Enter' || e.key === ' ') {
            const target = e.target;
            if (target.hasAttribute('role') && target.getAttribute('role') === 'button') {
                e.preventDefault();
                target.click();
            }
        }
    });
}

/**
 * Initialize navigation on page load
 */
function initializeNavigation() {
    initializeMobileMenu();
    initializeSmoothScrolling();
    initializeNavbarScrollEffects();
    initializeActiveNavigation();
    initializeKeyboardNavigation();
}

// Export functions for use in other scripts
window.NavigationUtils = {
    initializeNavigation,
    initializeMobileMenu,
    initializeSmoothScrolling,
    initializeNavbarScrollEffects,
    initializeActiveNavigation
};

// Auto-initialize if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeNavigation);
} else {
    initializeNavigation();
}