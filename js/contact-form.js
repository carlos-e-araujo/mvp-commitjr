// js/contact-form.js
// Contact form validation and submission handling

class ContactFormValidator {
    constructor(formSelector) {
        this.form = document.querySelector(formSelector);
        this.init();
    }

    init() {
        if (!this.form) return;

        this.nameInput = this.form.querySelector('#name');
        this.emailInput = this.form.querySelector('#email');
        this.messageInput = this.form.querySelector('#message');
        this.submitButton = this.form.querySelector('button[type="submit"]');

        this.attachEventListeners();
    }

    attachEventListeners() {
        // Real-time validation
        if (this.nameInput) {
            this.nameInput.addEventListener('blur', () => this.validateName());
            this.nameInput.addEventListener('input', () => this.clearError(this.nameInput));
        }

        if (this.emailInput) {
            this.emailInput.addEventListener('blur', () => this.validateEmail());
            this.emailInput.addEventListener('input', () => this.clearError(this.emailInput));
        }

        if (this.messageInput) {
            this.messageInput.addEventListener('blur', () => this.validateMessage());
            this.messageInput.addEventListener('input', () => this.clearError(this.messageInput));
        }

        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    validateName() {
        const value = this.nameInput.value.trim();
        const group = this.nameInput.closest('.contact-form__group');
        
        if (value.length < 2) {
            this.showError(group, 'Nome deve ter pelo menos 2 caracteres');
            return false;
        }
        
        if (value.length > 50) {
            this.showError(group, 'Nome deve ter no máximo 50 caracteres');
            return false;
        }

        if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(value)) {
            this.showError(group, 'Nome deve conter apenas letras e espaços');
            return false;
        }

        this.showSuccess(group);
        return true;
    }

    validateEmail() {
        const value = this.emailInput.value.trim();
        const group = this.emailInput.closest('.contact-form__group');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!value) {
            this.showError(group, 'E-mail é obrigatório');
            return false;
        }
        
        if (!emailRegex.test(value)) {
            this.showError(group, 'Por favor, insira um e-mail válido');
            return false;
        }

        if (value.length > 100) {
            this.showError(group, 'E-mail deve ter no máximo 100 caracteres');
            return false;
        }

        this.showSuccess(group);
        return true;
    }

    validateMessage() {
        const value = this.messageInput.value.trim();
        const group = this.messageInput.closest('.contact-form__group');
        
        if (value.length < 10) {
            this.showError(group, 'Mensagem deve ter pelo menos 10 caracteres');
            return false;
        }
        
        if (value.length > 1000) {
            this.showError(group, 'Mensagem deve ter no máximo 1000 caracteres');
            return false;
        }

        this.showSuccess(group);
        return true;
    }

    showError(group, message) {
        // Remove any existing states
        group.classList.remove('contact-form__group--success');
        group.classList.add('contact-form__group--error');
        
        // Remove existing error message
        const existingError = group.querySelector('.contact-form__error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorElement = document.createElement('span');
        errorElement.className = 'contact-form__error-message';
        errorElement.textContent = message;
        group.appendChild(errorElement);
    }

    showSuccess(group) {
        // Remove error state and add success
        group.classList.remove('contact-form__group--error');
        group.classList.add('contact-form__group--success');
        
        // Remove any error messages
        const existingError = group.querySelector('.contact-form__error-message');
        if (existingError) {
            existingError.remove();
        }
    }

    clearError(input) {
        const group = input.closest('.contact-form__group');
        group.classList.remove('contact-form__group--error');
        
        const existingError = group.querySelector('.contact-form__error-message');
        if (existingError) {
            existingError.remove();
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const isNameValid = this.validateName();
        const isEmailValid = this.validateEmail();
        const isMessageValid = this.validateMessage();

        if (isNameValid && isEmailValid && isMessageValid) {
            this.submitForm();
        }
    }

    submitForm() {
        const originalText = this.submitButton.textContent;
        
        // Show loading state
        this.submitButton.disabled = true;
        this.submitButton.textContent = 'Enviando...';
        this.submitButton.classList.add('button--loading');
        
        // Simulate form submission (replace with actual submission logic)
        setTimeout(() => {
            this.showSuccessMessage();
            this.resetForm();
            
            // Reset button
            this.submitButton.disabled = false;
            this.submitButton.textContent = originalText;
            this.submitButton.classList.remove('button--loading');
            
        }, 2000);
    }

    showSuccessMessage() {
        // Remove any existing success messages
        const existingBanner = this.form.querySelector('.contact-form__success-banner');
        if (existingBanner) {
            existingBanner.remove();
        }

        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'contact-form__success-banner';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>Mensagem enviada com sucesso! Entraremos em contato em breve.</span>
        `;
        
        // Insert at the top of the form
        this.form.insertBefore(successMessage, this.form.firstChild);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            if (successMessage.parentNode) {
                successMessage.remove();
            }
        }, 5000);
    }

    resetForm() {
        this.form.reset();
        
        // Remove all validation states
        const groups = this.form.querySelectorAll('.contact-form__group');
        groups.forEach(group => {
            group.classList.remove('contact-form__group--error', 'contact-form__group--success');
            const errorMsg = group.querySelector('.contact-form__error-message');
            if (errorMsg) errorMsg.remove();
        });
    }
}

// Initialize contact form validation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactFormValidator('.contact-form');
});
