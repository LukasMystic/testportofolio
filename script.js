/* ============================================
   Personal Portfolio - Interactive Features
   Mobile Navigation | Dark Mode | Scroll Effects
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // 1. MOBILE NAVIGATION MENU
    // ============================================
    
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');

    /**
     * Toggle mobile menu visibility and update accessibility attributes
     */
    const toggleMobileMenu = () => {
        const isOpen = navMenu.classList.toggle('open');
        hamburgerMenu.classList.toggle('active', isOpen);
        hamburgerMenu.setAttribute('aria-expanded', isOpen);
    };

    /**
     * Close mobile menu when a navigation link is clicked
     */
    const closeMenuOnNavigation = () => {
        navMenu.classList.remove('open');
        hamburgerMenu.classList.remove('active');
        hamburgerMenu.setAttribute('aria-expanded', 'false');
    };

    // Event listeners for mobile menu
    hamburgerMenu.addEventListener('click', toggleMobileMenu);
    navClose.addEventListener('click', closeMenuOnNavigation);
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenuOnNavigation);
    });

    // ============================================
    // 2. DARK MODE / LIGHT MODE TOGGLE
    // ============================================

    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const THEME_KEY = 'portfolio-theme';
    const LIGHT_THEME_CLASS = 'light-theme';

    /**
     * Load saved theme preference from localStorage and apply it
     */
    const loadSavedTheme = () => {
        const savedTheme = localStorage.getItem(THEME_KEY);
        if (savedTheme === 'light') {
            document.body.classList.add(LIGHT_THEME_CLASS);
            updateThemeIcon(true);
        }
    };

    /**
     * Update the theme toggle icon based on current theme
     * @param {boolean} isLightTheme - true if light theme is active
     */
    const updateThemeIcon = (isLightTheme) => {
        themeIcon.classList.toggle('fa-sun', !isLightTheme);
        themeIcon.classList.toggle('fa-moon', isLightTheme);
    };

    /**
     * Toggle between dark and light themes
     */
    const toggleTheme = () => {
        const isLightThemeActive = document.body.classList.toggle(LIGHT_THEME_CLASS);
        
        // Update icon
        updateThemeIcon(isLightThemeActive);
        
        // Save preference
        localStorage.setItem(THEME_KEY, isLightThemeActive ? 'light' : 'dark');
    };

    // Load saved theme on page load
    loadSavedTheme();

    // Event listener for theme toggle button
    themeToggle.addEventListener('click', toggleTheme);

    // ============================================
    // 3. SMOOTH SCROLLING & HEADER EFFECTS
    // ============================================

    const header = document.querySelector('.header');
    const SCROLL_THRESHOLD = 50;
    const HEADER_SHADOW_CLASS = 'header--scrolled';

    /**
     * Update header appearance based on scroll position
     */
    const handleHeaderScroll = () => {
        if (window.scrollY > SCROLL_THRESHOLD) {
            header.classList.add(HEADER_SHADOW_CLASS);
        } else {
            header.classList.remove(HEADER_SHADOW_CLASS);
        }
    };

    /**
     * Handle smooth scrolling for internal anchor links
     * Adds a small delay to allow menu to close before scrolling
     */
    const handleSmoothScroll = (e) => {
        const href = e.currentTarget.getAttribute('href');
        
        // Only handle internal anchor links
        if (href && href.startsWith('#')) {
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Small delay to ensure mobile menu closes first
                setTimeout(() => {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    };

    // Event listeners for scroll effects
    window.addEventListener('scroll', handleHeaderScroll);

    // Apply smooth scroll to all internal anchor links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', handleSmoothScroll);
    });

    // ============================================
    // INITIALIZATION
    // ============================================
    
    // Initialize header state on page load
    handleHeaderScroll();
});
