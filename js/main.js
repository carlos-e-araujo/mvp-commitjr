// js/main.js
// Main JavaScript file for general site functionality

document.addEventListener('DOMContentLoaded', () => {
    // Initialize header navigation
    initHeaderNavigation();
    
    // Initialize active page highlighting
    highlightActivePage();
});

// Header Navigation Functionality
function initHeaderNavigation() {
    const headerContainer = document.querySelector('#main-header');

    if (headerContainer) {
        const observer = new MutationObserver((mutations, obs) => {
            const menuButton = document.querySelector('.header__menu-toggle');
            const nav = document.querySelector('.header__nav');

            if (menuButton && nav) {
                menuButton.addEventListener('click', () => {
                    nav.classList.toggle('header__nav--active');
                    menuButton.classList.toggle('header__menu-toggle--active');
                });
                
                // Close menu when clicking on nav links
                const navLinks = nav.querySelectorAll('.header__nav-link');
                navLinks.forEach(link => {
                    link.addEventListener('click', () => {
                        nav.classList.remove('header__nav--active');
                        menuButton.classList.remove('header__menu-toggle--active');
                    });
                });
                
                // Stop observing once the elements are found and listeners are attached
                obs.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
}

// Highlight active page in navigation
function highlightActivePage() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    
    // Wait for header to load
    setTimeout(() => {
        const navLinks = document.querySelectorAll('.header__nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('header__nav-link--active');
            }
        });
    }, 100);
}