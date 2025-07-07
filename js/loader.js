// js/loader.js

function loadComponent(url, elementId) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            const element = document.querySelector(elementId);
            if (element) {
                element.innerHTML = data;
            } else {
                console.error(`Element with ID '${elementId}' not found.`);
            }
        })
        .catch(error => console.error('Error loading component:', error));
}

// Function to initialize all components on a page
function initComponents() {
    loadComponent('components/header.html', '#main-header');
    loadComponent('components/footer.html', '#main-footer');
}