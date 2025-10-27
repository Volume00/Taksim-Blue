/**
 * Booking System JavaScript for Luxury Villa Retreat
 * Handles booking forms, validation, and reservation management
 */

// Booking state management
const BookingState = {
    selectedRoom: null,
    checkInDate: null,
    checkOutDate: null,
    guests: 1,
    totalPrice: 0,
    isProcessing: false
};

// Room data with pricing and availability
const RoomData = {
    'room-1': {
        id: 'room-1',
        name: 'Executive Suite',
        price: 79,
        maxGuests: 2,
        amenities: ['King Bed', 'City View', 'Work Desk', 'Mini Bar', 'Free WiFi', 'Room Service']
    },
    'room-2': {
        id: 'room-2',
        name: 'Deluxe Ocean View',
        price: 39,
        maxGuests: 3,
        amenities: ['Queen Bed', 'Ocean View', 'Balcony', 'Mini Bar', 'Free WiFi', 'Spa Access']
    },
    'room-3': {
        id: 'room-3',
        name: 'Presidential Suite',
        price: 49,
        maxGuests: 4,
        amenities: ['King Bed', 'Living Room', 'Kitchen', 'Balcony', 'Butler Service', 'Premium WiFi']
    },
    'room-4': {
        id: 'room-4',
        name: 'Garden Villa',
        price: 60,
        maxGuests: 4,
        amenities: ['King Bed', 'Garden View', 'Private Patio', 'Kitchenette', 'Free WiFi', 'Pool Access']
    },
    'room-5': {
        id: 'room-5',
        name: 'Penthouse Suite',
        price: 39,
        maxGuests: 6,
        amenities: ['Master Bedroom', 'Panoramic View', 'Full Kitchen', 'Terrace', 'Concierge Service', 'Premium Amenities']
    },
    'room-6': {
        id: 'room-6',
        name: 'Classic Double',
        price: 55,
        maxGuests: 2,
        amenities: ['Double Bed', 'City View', 'Work Area', 'Free WiFi', 'Daily Housekeeping']
    },
    'room-7': {
        id: 'room-7',
        name: 'Superior Twin',
        price: 45,
        maxGuests: 2,
        amenities: ['Twin Beds', 'Garden View', 'Seating Area', 'Mini Fridge', 'Free WiFi']
    },
    'room-8': {
        id: 'room-8',
        name: 'Junior Suite',
        price: 48,
        maxGuests: 3,
        amenities: ['Queen Bed', 'Separate Lounge', 'Work Desk', 'Mini Bar', 'Free WiFi', 'Express Check-in']
    },
    'room-9': {
        id: 'room-9',
        name: 'Family Room',
        price: 60,
        maxGuests: 5,
        amenities: ['King + Sofa Bed', 'Family Amenities', 'Kitchenette', 'Game Area', 'Free WiFi', 'Kids Welcome']
    },
    'room-10': {
        id: 'room-10',
        name: 'Luxury Studio',
        price: 35,
        maxGuests: 2,
        amenities: ['Queen Bed', 'Studio Layout', 'Kitchenette', 'Work Space', 'Free WiFi', 'Modern Design']
    },
    'room-11': {
        id: 'room-11',
        name: 'Romantic Suite',
        price: 60,
        maxGuests: 2,
        amenities: ['King Bed', 'Romantic Decor', 'Jacuzzi', 'Champagne Service', 'Free WiFi', 'Late Checkout']
    },
    'room-12': {
        id: 'room-12',
        name: 'Business Suite',
        price: 45,
        maxGuests: 2,
        amenities: ['King Bed', 'Office Space', 'Meeting Area', 'Business Center Access', 'Premium WiFi', 'Express Services']
    },
    'room-13': {
        id: 'room-13',
        name: 'Spa Retreat',
        price: 75,
        maxGuests: 2,
        amenities: ['King Bed', 'Spa Access', 'Wellness Amenities', 'Meditation Space', 'Free WiFi', 'Healthy Minibar']
    },
    'room-14': {
        id: 'room-14',
        name: 'Artist Loft',
        price: 64,
        maxGuests: 3,
        amenities: ['Queen Bed', 'Creative Space', 'Art Supplies', 'Natural Light', 'Free WiFi', 'Inspiring Views']
    },
    'room-15': {
        id: 'room-15',
        name: 'Royal Villa',
        price: 58,
        maxGuests: 8,
        amenities: ['Multiple Bedrooms', 'Private Pool', 'Full Kitchen', 'Butler Service', 'Premium WiFi', 'Exclusive Access']
    }
};

document.addEventListener('DOMContentLoaded', function() {
    initializeBookingSystem();
    generateRoomCards();
});

/**
 * Initialize the booking system
 */
function initializeBookingSystem() {
    initializeDatePickers();
    initializeBookingForms();
    initializeGuestSelectors();
    initializeRoomSelection();
    updateBookingSummary();
}

/**
 * Generate room cards for the homepage
 */
function generateRoomCards() {
    const roomsContainer = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3.gap-8');
    
    if (roomsContainer) {
        roomsContainer.innerHTML = '';
        
        Object.values(RoomData).forEach(room => {
            const roomCard = createRoomCard(room);
            roomsContainer.appendChild(roomCard);
        });
    }
}

/**
 * Create a room card element
 */
function createRoomCard(room) {
    const card = document.createElement('div');
    card.className = 'room-card bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300';
    
    card.innerHTML = `
        <div class="room-card-body p-6">
            <h3 class="room-title text-xl font-semibold text-gray-900 mb-2">${room.name}</h3>
            <p class="room-description text-gray-600 mb-4">Experience luxury and comfort in our beautifully appointed ${room.name.toLowerCase()}.</p>
            <div class="room-price text-2xl font-bold text-blue-600 mb-4">$${room.price}<span class="text-sm font-normal text-gray-500">/night</span></div>
            <ul class="room-features mb-6">
                ${room.amenities.slice(0, 4).map(amenity => `<li class="text-gray-600 text-sm mb-1">✓ ${amenity}</li>`).join('')}
            </ul>
            <div class="flex flex-col sm:flex-row gap-2">
                <a href="rooms/${room.id}.html" class="btn btn-primary flex-1 text-center">View Details</a>
                <button onclick="quickBook('${room.id}')" class="btn btn-outline-primary flex-1">Quick Book</button>
            </div>
        </div>
    `;
    
    return card;
}

/**
 * Initialize date pickers
 */
function initializeDatePickers() {
    const checkInInputs = document.querySelectorAll('input[name="checkin"], input[name="check-in"]');
    const checkOutInputs = document.querySelectorAll('input[name="checkout"], input[name="check-out"]');
    
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    checkInInputs.forEach(input => {
        input.min = today;
        input.addEventListener('change', function() {
            BookingState.checkInDate = this.value;
            updateCheckOutMinDate();
            calculateTotalPrice();
            updateBookingSummary();
        });
    });
    
    checkOutInputs.forEach(input => {
        input.min = tomorrow;
        input.addEventListener('change', function() {
            BookingState.checkOutDate = this.value;
            calculateTotalPrice();
            updateBookingSummary();
        });
    });
}

/**
 * Update minimum checkout date based on checkin date
 */
function updateCheckOutMinDate() {
    if (BookingState.checkInDate) {
        const checkInDate = new Date(BookingState.checkInDate);
        const minCheckOut = new Date(checkInDate.getTime() + 24 * 60 * 60 * 1000);
        const minCheckOutString = minCheckOut.toISOString().split('T')[0];
        
        const checkOutInputs = document.querySelectorAll('input[name="checkout"], input[name="check-out"]');
        checkOutInputs.forEach(input => {
            input.min = minCheckOutString;
            if (input.value && input.value <= BookingState.checkInDate) {
                input.value = minCheckOutString;
                BookingState.checkOutDate = minCheckOutString;
            }
        });
    }
}

/**
 * Initialize booking forms
 */
function initializeBookingForms() {
    const bookingForms = document.querySelectorAll('.booking-form, form[data-booking-form]');
    
    bookingForms.forEach(form => {
        form.addEventListener('submit', handleBookingSubmission);
        
        // Add real-time validation
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    });
}

/**
 * Initialize guest selectors
 */
function initializeGuestSelectors() {
    const guestInputs = document.querySelectorAll('input[name="guests"], select[name="guests"]');
    
    guestInputs.forEach(input => {
        input.addEventListener('change', function() {
            BookingState.guests = parseInt(this.value) || 1;
            validateGuestCount();
            updateBookingSummary();
        });
    });
}

/**
 * Initialize room selection
 */
function initializeRoomSelection() {
    // Get room ID from URL if on room detail page
    const pathParts = window.location.pathname.split('/');
    const roomFileName = pathParts[pathParts.length - 1];
    const roomId = roomFileName.replace('.html', '');
    
    if (RoomData[roomId]) {
        BookingState.selectedRoom = roomId;
        populateRoomDetails(roomId);
    }
}

/**
 * Populate room details on room pages
 */
function populateRoomDetails(roomId) {
    const room = RoomData[roomId];
    if (!room) return;
    
    // Update page title
    const titleElement = document.querySelector('h1, .room-title');
    if (titleElement) {
        titleElement.textContent = room.name;
    }
    
    // Update price display
    const priceElements = document.querySelectorAll('.room-price, .price-display');
    priceElements.forEach(element => {
        element.innerHTML = `$${room.price}<span class="text-sm font-normal text-gray-500">/night</span>`;
    });
    
    // Update amenities list
    const amenitiesContainer = document.querySelector('.amenities-list, .room-amenities ul');
    if (amenitiesContainer) {
        amenitiesContainer.innerHTML = room.amenities.map(amenity => 
            `<li class="amenity-item flex items-center py-2">
                <span class="amenity-icon mr-3">✓</span>
                <span>${amenity}</span>
            </li>`
        ).join('');
    }
    
    // Update max guests
    const guestInputs = document.querySelectorAll('input[name="guests"], select[name="guests"]');
    guestInputs.forEach(input => {
        input.max = room.maxGuests;
        if (input.tagName === 'SELECT') {
            input.innerHTML = '';
            for (let i = 1; i <= room.maxGuests; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = `${i} Guest${i > 1 ? 's' : ''}`;
                input.appendChild(option);
            }
        }
    });
}

/**
 * Quick booking function
 */
function quickBook(roomId) {
    BookingState.selectedRoom = roomId;
    
    // Redirect to room detail page or show booking modal
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        window.location.href = `rooms/${roomId}.html`;
    } else {
        showBookingModal(roomId);
    }
}

/**
 * Show booking modal
 */
function showBookingModal(roomId) {
    const room = RoomData[roomId];
    if (!room) return;
    
    // Create modal HTML
    const modalHTML = `
        <div id="booking-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div class="bg-white rounded-lg max-w-md w-full max-h-90vh overflow-y-auto">
                <div class="p-6">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-xl font-semibold">Book ${room.name}</h3>
                        <button onclick="closeBookingModal()" class="text-gray-400 hover:text-gray-600">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <form id="quick-booking-form" class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
                            <input type="date" name="checkin" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
                            <input type="date" name="checkout" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                            <select name="guests" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                                ${Array.from({length: room.maxGuests}, (_, i) => 
                                    `<option value="${i + 1}">${i + 1} Guest${i > 0 ? 's' : ''}</option>`
                                ).join('')}
                            </select>
                        </div>
                        <div class="bg-gray-50 p-4 rounded-md">
                            <div class="flex justify-between items-center">
                                <span class="font-medium">Total:</span>
                                <span id="modal-total" class="text-xl font-bold text-blue-600">$${room.price}/night</span>
                            </div>
                        </div>
                        <button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
                            Continue to Booking
                        </button>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Initialize modal form
    const modalForm = document.getElementById('quick-booking-form');
    modalForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        BookingState.checkInDate = formData.get('checkin');
        BookingState.checkOutDate = formData.get('checkout');
        BookingState.guests = parseInt(formData.get('guests'));
        
        closeBookingModal();
        window.location.href = `rooms/${roomId}.html`;
    });
    
    // Initialize date pickers in modal
    initializeDatePickers();
}

/**
 * Close booking modal
 */
function closeBookingModal() {
    const modal = document.getElementById('booking-modal');
    if (modal) {
        modal.remove();
    }
}

/**
 * Handle booking form submission
 */
function handleBookingSubmission(e) {
    e.preventDefault();
    
    if (BookingState.isProcessing) {
        return;
    }
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Validate form
    if (!validateBookingForm(form)) {
        return;
    }
    
    // Show loading state
    setFormLoading(form, true);
    BookingState.isProcessing = true;
    
    // Collect booking data
    const bookingData = {
        roomId: BookingState.selectedRoom,
        checkIn: formData.get('checkin') || formData.get('check-in'),
        checkOut: formData.get('checkout') || formData.get('check-out'),
        guests: parseInt(formData.get('guests')),
        firstName: formData.get('firstName') || formData.get('first-name'),
        lastName: formData.get('lastName') || formData.get('last-name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        specialRequests: formData.get('special-requests') || formData.get('requests'),
        totalPrice: BookingState.totalPrice
    };
    
    // Process booking
    processBooking(bookingData)
        .then(result => {
            showBookingSuccess(result);
            form.reset();
            BookingState.isProcessing = false;
            setFormLoading(form, false);
        })
        .catch(error => {
            showBookingError(error.message);
            BookingState.isProcessing = false;
            setFormLoading(form, false);
        });
}

/**
 * Validate booking form
 */
function validateBookingForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateField({target: field})) {
            isValid = false;
        }
    });
    
    // Validate dates
    if (BookingState.checkInDate && BookingState.checkOutDate) {
        if (new Date(BookingState.checkInDate) >= new Date(BookingState.checkOutDate)) {
            showFieldError(form.querySelector('[name="checkout"], [name="check-out"]'), 'Check-out date must be after check-in date');
            isValid = false;
        }
    }
    
    // Validate guest count
    if (!validateGuestCount()) {
        isValid = false;
    }
    
    return isValid;
}

/**
 * Validate individual field
 */
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    let isValid = true;
    
    // Clear previous errors
    clearFieldError(e);
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        isValid = false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            isValid = false;
        }
    }
    
    // Phone validation
    if (field.name === 'phone' && value) {
        const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-()]/g, ''))) {
            showFieldError(field, 'Please enter a valid phone number');
            isValid = false;
        }
    }
    
    // Date validation
    if (field.type === 'date' && value) {
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            showFieldError(field, 'Date cannot be in the past');
            isValid = false;
        }
    }
    
    return isValid;
}

/**
 * Show field error
 */
function showFieldError(field, message) {
    field.classList.add('border-red-500');
    
    let errorElement = field.parentNode.querySelector('.field-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'field-error text-red-500 text-sm mt-1';
        field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
}

/**
 * Clear field error
 */
function clearFieldError(e) {
    const field = e.target;
    field.classList.remove('border-red-500');
    
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

/**
 * Validate guest count
 */
function validateGuestCount() {
    if (BookingState.selectedRoom && BookingState.guests) {
        const room = RoomData[BookingState.selectedRoom];
        if (room && BookingState.guests > room.maxGuests) {
            const guestInput = document.querySelector('input[name="guests"], select[name="guests"]');
            if (guestInput) {
                showFieldError(guestInput, `Maximum ${room.maxGuests} guests allowed for this room`);
            }
            return false;
        }
    }
    return true;
}

/**
 * Calculate total price
 */
function calculateTotalPrice() {
    if (BookingState.selectedRoom && BookingState.checkInDate && BookingState.checkOutDate) {
        const room = RoomData[BookingState.selectedRoom];
        const checkIn = new Date(BookingState.checkInDate);
        const checkOut = new Date(BookingState.checkOutDate);
        const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
        
        if (nights > 0) {
            BookingState.totalPrice = room.price * nights;
        }
    }
}

/**
 * Update booking summary
 */
function updateBookingSummary() {
    const summaryElements = document.querySelectorAll('.booking-summary, .booking-total');
    
    summaryElements.forEach(element => {
        if (BookingState.selectedRoom && BookingState.checkInDate && BookingState.checkOutDate) {
            const room = RoomData[BookingState.selectedRoom];
            const checkIn = new Date(BookingState.checkInDate);
            const checkOut = new Date(BookingState.checkOutDate);
            const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
            
            if (nights > 0) {
                element.innerHTML = `
                    <div class="booking-summary-content">
                        <div class="flex justify-between mb-2">
                            <span>Room:</span>
                            <span>${room.name}</span>
                        </div>
                        <div class="flex justify-between mb-2">
                            <span>Nights:</span>
                            <span>${nights}</span>
                        </div>
                        <div class="flex justify-between mb-2">
                            <span>Rate:</span>
                            <span>$${room.price}/night</span>
                        </div>
                        <div class="flex justify-between font-bold text-lg border-t pt-2">
                            <span>Total:</span>
                            <span>$${BookingState.totalPrice}</span>
                        </div>
                    </div>
                `;
            }
        }
    });
}

/**
 * Set form loading state
 */
function setFormLoading(form, isLoading) {
    const submitButton = form.querySelector('button[type="submit"]');
    const inputs = form.querySelectorAll('input, select, textarea');
    
    if (isLoading) {
        form.classList.add('loading');
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.innerHTML = '<span class="spinner"></span>Processing...';
        }
        inputs.forEach(input => input.disabled = true);
    } else {
        form.classList.remove('loading');
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.innerHTML = 'Complete Booking';
        }
        inputs.forEach(input => input.disabled = false);
    }
}

/**
 * Process booking (simulate API call)
 */
function processBooking(bookingData) {
    return new Promise((resolve, reject) => {
        // Simulate API call delay
        setTimeout(() => {
            // Simulate random success/failure for demo
            if (Math.random() > 0.1) { // 90% success rate
                resolve({
                    bookingId: 'BK' + Date.now(),
                    confirmationNumber: 'CONF' + Math.random().toString(36).substr(2, 9).toUpperCase(),
                    ...bookingData
                });
            } else {
                reject(new Error('Booking failed. Please try again.'));
            }
        }, 2000);
    });
}

/**
 * Show booking success message
 */
function showBookingSuccess(result) {
    const message = `
        <div class="success-message">
            <h3>Booking Confirmed!</h3>
            <p>Your reservation has been confirmed.</p>
            <p><strong>Confirmation Number:</strong> ${result.confirmationNumber}</p>
            <p><strong>Booking ID:</strong> ${result.bookingId}</p>
            <p>A confirmation email has been sent to your email address.</p>
        </div>
    `;
    
    showNotification(message, 'success');
}

/**
 * Show booking error message
 */
function showBookingError(message) {
    const errorMessage = `
        <div class="error-message">
            <h3>Booking Error</h3>
            <p>${message}</p>
            <p>Please check your information and try again.</p>
        </div>
    `;
    
    showNotification(errorMessage, 'error');
}

/**
 * Show notification
 */
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type} fixed top-4 right-4 max-w-md p-4 rounded-lg shadow-lg z-50`;
    notification.innerHTML = message;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
    
    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.className = 'absolute top-2 right-2 text-xl';
    closeBtn.onclick = () => notification.remove();
    notification.appendChild(closeBtn);
}

// Export booking utilities
window.BookingUtils = {
    BookingState,
    RoomData,
    quickBook,
    closeBookingModal,
    calculateTotalPrice,
    updateBookingSummary
};