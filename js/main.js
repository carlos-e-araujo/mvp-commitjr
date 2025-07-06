// js/main.js

document.addEventListener('DOMContentLoaded', () => {
    // We need to wait for the header to be loaded before adding event listeners
    // A simple timeout or MutationObserver is a good way to handle this.
    // Let's use a MutationObserver for a robust solution.

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
                // Stop observing once the elements are found and listeners are attached
                obs.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
});