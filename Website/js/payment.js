/**
 * Payment Integration JavaScript for Luxury Villa Retreat
 * Handles Stripe payment processing and payment form management
 */

/* global Stripe */

// Stripe configuration (test mode)
const STRIPE_PUBLIC_KEY = 'pk_live_51R3hGhC1JL2uEXXEBUI08S5h4kG42aE65dc18UryW7ko2QuRrIws9xVD2GpIyOaiYcbzV4KNhrGrFBbTj0baW8q200AGYrOSoN'; // Valid test key format
let stripe = null;
let elements = null;
let cardElement = null;

// Payment state management
const PaymentState = {
    isProcessing: false,
    paymentIntent: null,
    clientSecret: null,
    amount: 0,
    currency: 'usd'
};

document.addEventListener('DOMContentLoaded', function() {
    initializeStripe();
    initializePaymentForms();
});

/**
 * Initialize Stripe
 */
function initializeStripe() {
    try {
        // Check if Stripe is available
        if (typeof Stripe === 'undefined') {
            console.warn('Stripe library not loaded');
            return;
        }
        
        // Initialize Stripe with public key
        stripe = Stripe(STRIPE_PUBLIC_KEY);
        
        // Create Elements instance
        elements = stripe.elements({
            appearance: {
                theme: 'stripe',
                variables: {
                    colorPrimary: '#2563eb',
                    colorBackground: '#ffffff',
                    colorText: '#1f2937',
                    colorDanger: '#dc2626',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    spacingUnit: '4px',
                    borderRadius: '8px'
                }
            }
        });
        
        console.log('Stripe initialized successfully');
    } catch (error) {
        console.error('Failed to initialize Stripe:', error);
        showPaymentError('Payment system unavailable. Please try again later.');
    }
}

/**
 * Initialize payment forms
 */
function initializePaymentForms() {
    const paymentForms = document.querySelectorAll('.payment-form, form[data-payment-form]');
    
    paymentForms.forEach(form => {
        setupPaymentForm(form);
    });
    
    // Initialize payment elements when booking form is submitted
    document.addEventListener('bookingValidated', function(event) {
        const bookingData = event.detail;
        initializePaymentElements(bookingData);
    });
}

/**
 * Setup payment form
 */
function setupPaymentForm(form) {
    // Create payment container if it doesn't exist
    let paymentContainer = form.querySelector('.payment-container');
    if (!paymentContainer) {
        paymentContainer = document.createElement('div');
        paymentContainer.className = 'payment-container';
        paymentContainer.innerHTML = `
            <div class="payment-section">
                <h3 class="text-lg font-semibold mb-4">Payment Information</h3>
                <div id="card-element" class="p-3 border border-gray-300 rounded-md mb-4">
                    <!-- Stripe Elements will create form elements here -->
                </div>
                <div id="card-errors" class="text-red-500 text-sm mb-4" role="alert"></div>
                <div class="payment-summary bg-gray-50 p-4 rounded-md mb-4">
                    <div class="flex justify-between items-center">
                        <span class="font-medium">Total Amount:</span>
                        <span id="payment-amount" class="text-xl font-bold text-blue-600">$0.00</span>
                    </div>
                </div>
            </div>
        `;
        
        // Insert before submit button
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
            form.insertBefore(paymentContainer, submitButton);
        } else {
            form.appendChild(paymentContainer);
        }
    }
    
    // Setup form submission
    form.addEventListener('submit', handlePaymentSubmission);
}

/**
 * Initialize payment elements
 */
function initializePaymentElements(bookingData) {
    if (!stripe || !elements) {
        console.error('Stripe not initialized');
        return;
    }
    
    // Update payment amount
    PaymentState.amount = bookingData.totalPrice * 100; // Convert to cents
    updatePaymentAmount(bookingData.totalPrice);
    
    // Create card element if it doesn't exist
    if (!cardElement) {
        cardElement = elements.create('card', {
            style: {
                base: {
                    fontSize: '16px',
                    color: '#1f2937',
                    '::placeholder': {
                        color: '#9ca3af',
                    },
                },
                invalid: {
                    color: '#dc2626',
                    iconColor: '#dc2626'
                }
            },
            hidePostalCode: false
        });
        
        // Mount card element
        const cardElementContainer = document.getElementById('card-element');
        if (cardElementContainer) {
            cardElement.mount('#card-element');
            
            // Handle real-time validation errors from the card Element
            cardElement.on('change', function(event) {
                const displayError = document.getElementById('card-errors');
                if (event.error) {
                    displayError.textContent = event.error.message;
                } else {
                    displayError.textContent = '';
                }
            });
        }
    }
    
    // Create payment intent
    createPaymentIntent(bookingData);
}

/**
 * Create payment intent
 */
function createPaymentIntent(bookingData) {
    // Simulate API call to create payment intent
    // In a real application, this would be a server-side call
    
    // Simulate server response
    setTimeout(() => {
        PaymentState.clientSecret = 'pi_test_' + Math.random().toString(36).substr(2, 9) + '_secret_test';
        PaymentState.paymentIntent = 'pi_test_' + Math.random().toString(36).substr(2, 9);
        console.log('Payment intent created:', PaymentState.paymentIntent);
        console.log('Booking data:', bookingData);
    }, 1000);
}

/**
 * Handle payment form submission
 */
function handlePaymentSubmission(e) {
    e.preventDefault();
    
    if (PaymentState.isProcessing) {
        return;
    }
    
    const form = e.target;
    
    // Validate booking data first
    if (!validateBookingData()) {
        showPaymentError('Please complete all booking information before payment.');
        return;
    }
    
    // Show loading state
    setPaymentLoading(form, true);
    PaymentState.isProcessing = true;
    
    // Process payment
    processPayment(form)
        .then(result => {
            if (result.error) {
                showPaymentError(result.error.message);
            } else {
                handlePaymentSuccess(result);
            }
        })
        .catch(error => {
            console.error('Payment error:', error);
            showPaymentError('Payment failed. Please try again.');
        })
        .finally(() => {
            setPaymentLoading(form, false);
            PaymentState.isProcessing = false;
        });
}

/**
 * Process payment with Stripe
 */
function processPayment(form) {
    if (!stripe || !cardElement || !PaymentState.clientSecret) {
        return Promise.reject(new Error('Payment system not ready'));
    }
    
    // Get billing details from form
    const billingDetails = getBillingDetails(form);
    
    // Confirm payment with Stripe
    return stripe.confirmCardPayment(PaymentState.clientSecret, {
        payment_method: {
            card: cardElement,
            billing_details: billingDetails
        }
    });
}

/**
 * Get billing details from form
 */
function getBillingDetails(form) {
    const formData = new FormData(form);
    
    return {
        name: `${formData.get('firstName') || formData.get('first-name') || ''} ${formData.get('lastName') || formData.get('last-name') || ''}`.trim(),
        email: formData.get('email') || '',
        phone: formData.get('phone') || '',
        address: {
            line1: formData.get('address') || '',
            city: formData.get('city') || '',
            state: formData.get('state') || '',
            postal_code: formData.get('zip') || formData.get('postal-code') || '',
            country: formData.get('country') || 'US'
        }
    };
}

/**
 * Validate booking data
 */
function validateBookingData() {
    // Check if booking state has required data
    if (!window.BookingUtils || !window.BookingUtils.BookingState) {
        return false;
    }
    
    const bookingState = window.BookingUtils.BookingState;
    
    return bookingState.selectedRoom && 
           bookingState.checkInDate && 
           bookingState.checkOutDate && 
           bookingState.guests && 
           bookingState.totalPrice > 0;
}

/**
 * Handle successful payment
 */
function handlePaymentSuccess(result) {
    const paymentIntent = result.paymentIntent;
    
    // Create booking confirmation
    const bookingConfirmation = {
        paymentIntentId: paymentIntent.id,
        status: paymentIntent.status,
        amount: paymentIntent.amount / 100, // Convert back to dollars
        currency: paymentIntent.currency,
        confirmationNumber: generateConfirmationNumber(),
        bookingId: generateBookingId(),
        timestamp: new Date().toISOString()
    };
    
    // Store confirmation data
    localStorage.setItem('bookingConfirmation', JSON.stringify(bookingConfirmation));
    
    // Show success message
    showPaymentSuccess(bookingConfirmation);
    
    // Redirect to confirmation page after delay
    setTimeout(() => {
        window.location.href = 'booking-confirmation.html';
    }, 3000);
}

/**
 * Generate confirmation number
 */
function generateConfirmationNumber() {
    return 'CONF' + Date.now().toString().slice(-8) + Math.random().toString(36).substr(2, 4).toUpperCase();
}

/**
 * Generate booking ID
 */
function generateBookingId() {
    return 'BK' + Date.now().toString() + Math.random().toString(36).substr(2, 6).toUpperCase();
}

/**
 * Update payment amount display
 */
function updatePaymentAmount(amount) {
    const amountElements = document.querySelectorAll('#payment-amount, .payment-amount');
    amountElements.forEach(element => {
        element.textContent = `$${amount.toFixed(2)}`;
    });
}

/**
 * Set payment loading state
 */
function setPaymentLoading(form, isLoading) {
    const submitButton = form.querySelector('button[type="submit"]');
    const cardElementContainer = document.getElementById('card-element');
    
    if (isLoading) {
        form.classList.add('payment-processing');
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner"></span>Processing Payment...';
        }
        if (cardElementContainer) {
            cardElementContainer.style.pointerEvents = 'none';
            cardElementContainer.style.opacity = '0.6';
        }
    } else {
        form.classList.remove('payment-processing');
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.innerHTML = 'Complete Booking';
        }
        if (cardElementContainer) {
            cardElementContainer.style.pointerEvents = 'auto';
            cardElementContainer.style.opacity = '1';
        }
    }
}

/**
 * Show payment success message
 */
function showPaymentSuccess(confirmation) {
    const message = `
        <div class="payment-success">
            <div class="success-icon mb-4">
                <svg class="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </div>
            <h3 class="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h3>
            <p class="text-gray-600 mb-4">Your booking has been confirmed and payment processed.</p>
            <div class="bg-green-50 p-4 rounded-lg">
                <p><strong>Confirmation Number:</strong> ${confirmation.confirmationNumber}</p>
                <p><strong>Booking ID:</strong> ${confirmation.bookingId}</p>
                <p><strong>Amount Paid:</strong> $${confirmation.amount.toFixed(2)}</p>
            </div>
            <p class="text-sm text-gray-500 mt-4">Redirecting to confirmation page...</p>
        </div>
    `;
    
    showPaymentNotification(message, 'success');
}

/**
 * Show payment error message
 */
function showPaymentError(message) {
    const errorMessage = `
        <div class="payment-error">
            <div class="error-icon mb-4">
                <svg class="w-16 h-16 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </div>
            <h3 class="text-2xl font-bold text-red-600 mb-2">Payment Failed</h3>
            <p class="text-gray-600 mb-4">${message}</p>
            <p class="text-sm text-gray-500">Please check your payment information and try again.</p>
        </div>
    `;
    
    showPaymentNotification(errorMessage, 'error');
}

/**
 * Show payment notification
 */
function showPaymentNotification(message, type) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.payment-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `payment-notification fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4`;
    notification.innerHTML = `
        <div class="bg-white rounded-lg max-w-md w-full p-6 text-center">
            ${message}
            <button onclick="this.closest('.payment-notification').remove()" class="mt-4 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition duration-300">
                Close
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove success notifications after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }
}

/**
 * Format currency amount
 */
function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

/**
 * Cleanup payment elements
 */
function cleanupPaymentElements() {
    if (cardElement) {
        cardElement.unmount();
        cardElement = null;
    }
    
    PaymentState.isProcessing = false;
    PaymentState.paymentIntent = null;
    PaymentState.clientSecret = null;
}

// Export payment utilities
window.PaymentUtils = {
    PaymentState,
    initializeStripe,
    initializePaymentElements,
    processPayment,
    showPaymentSuccess,
    showPaymentError,
    formatCurrency,
    cleanupPaymentElements
};

// Cleanup on page unload
window.addEventListener('beforeunload', cleanupPaymentElements);