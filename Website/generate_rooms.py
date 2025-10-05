#!/usr/bin/env python3

import os

# Room data from booking.js
rooms = [
    {'id': 'room-2', 'name': 'Deluxe Ocean View', 'price': 399, 'maxGuests': 3, 'amenities': ['Queen Bed', 'Ocean View', 'Balcony', 'Mini Bar', 'Free WiFi', 'Spa Access']},
    {'id': 'room-3', 'name': 'Presidential Suite', 'price': 599, 'maxGuests': 4, 'amenities': ['King Bed', 'Living Room', 'Kitchen', 'Balcony', 'Butler Service', 'Premium WiFi']},
    {'id': 'room-4', 'name': 'Garden Villa', 'price': 449, 'maxGuests': 4, 'amenities': ['King Bed', 'Garden View', 'Private Patio', 'Kitchenette', 'Free WiFi', 'Pool Access']},
    {'id': 'room-5', 'name': 'Penthouse Suite', 'price': 799, 'maxGuests': 6, 'amenities': ['Master Bedroom', 'Panoramic View', 'Full Kitchen', 'Terrace', 'Concierge Service', 'Premium Amenities']},
    {'id': 'room-6', 'name': 'Classic Double', 'price': 199, 'maxGuests': 2, 'amenities': ['Double Bed', 'City View', 'Work Area', 'Free WiFi', 'Daily Housekeeping']},
    {'id': 'room-7', 'name': 'Superior Twin', 'price': 249, 'maxGuests': 2, 'amenities': ['Twin Beds', 'Garden View', 'Seating Area', 'Mini Fridge', 'Free WiFi']},
    {'id': 'room-8', 'name': 'Junior Suite', 'price': 349, 'maxGuests': 3, 'amenities': ['Queen Bed', 'Separate Lounge', 'Work Desk', 'Mini Bar', 'Free WiFi', 'Express Check-in']},
    {'id': 'room-9', 'name': 'Family Room', 'price': 399, 'maxGuests': 5, 'amenities': ['King + Sofa Bed', 'Family Amenities', 'Kitchenette', 'Game Area', 'Free WiFi', 'Kids Welcome']},
    {'id': 'room-10', 'name': 'Luxury Studio', 'price': 279, 'maxGuests': 2, 'amenities': ['Queen Bed', 'Studio Layout', 'Kitchenette', 'Work Space', 'Free WiFi', 'Modern Design']},
    {'id': 'room-11', 'name': 'Romantic Suite', 'price': 459, 'maxGuests': 2, 'amenities': ['King Bed', 'Romantic Decor', 'Jacuzzi', 'Champagne Service', 'Free WiFi', 'Late Checkout']},
    {'id': 'room-12', 'name': 'Business Suite', 'price': 379, 'maxGuests': 2, 'amenities': ['King Bed', 'Office Space', 'Meeting Area', 'Business Center Access', 'Premium WiFi', 'Express Services']},
    {'id': 'room-13', 'name': 'Spa Retreat', 'price': 529, 'maxGuests': 2, 'amenities': ['King Bed', 'Spa Access', 'Wellness Amenities', 'Meditation Space', 'Free WiFi', 'Healthy Minibar']},
    {'id': 'room-14', 'name': 'Artist Loft', 'price': 329, 'maxGuests': 3, 'amenities': ['Queen Bed', 'Creative Space', 'Art Supplies', 'Natural Light', 'Free WiFi', 'Inspiring Views']},
    {'id': 'room-15', 'name': 'Royal Villa', 'price': 999, 'maxGuests': 8, 'amenities': ['Multiple Bedrooms', 'Private Pool', 'Full Kitchen', 'Butler Service', 'Premium WiFi', 'Exclusive Access']}
]

# Room descriptions
descriptions = {
    'room-2': 'Wake up to breathtaking ocean views in our Deluxe Ocean View room. This elegant space features a comfortable queen bed, private balcony, and direct access to our spa facilities.',
    'room-3': 'Experience ultimate luxury in our Presidential Suite, featuring a separate living room, full kitchen, and butler service. Perfect for extended stays and special occasions.',
    'room-4': 'Relax in our Garden Villa with its private patio overlooking lush gardens. This spacious accommodation includes a kitchenette and direct pool access.',
    'room-5': 'Our crown jewel, the Penthouse Suite offers panoramic views, a full kitchen, and expansive terrace. Includes dedicated concierge service and premium amenities.',
    'room-6': 'Our Classic Double room provides comfortable accommodation with modern amenities at an exceptional value. Perfect for business travelers and couples.',
    'room-7': 'The Superior Twin room features two comfortable beds and garden views. Ideal for friends traveling together or business colleagues.',
    'room-8': 'Enjoy extra space in our Junior Suite with a separate lounge area and express check-in service. Perfect for guests who value comfort and convenience.',
    'room-9': 'Our Family Room is designed with families in mind, featuring a king bed plus sofa bed, game area, and family-friendly amenities throughout.',
    'room-10': 'The Luxury Studio combines living and sleeping areas in a modern, efficient design. Features a kitchenette and dedicated work space.',
    'room-11': 'Create unforgettable memories in our Romantic Suite, featuring romantic decor, in-room jacuzzi, and complimentary champagne service.',
    'room-12': 'Designed for the business traveler, our Business Suite includes a dedicated office space, meeting area, and express business services.',
    'room-13': 'Find your zen in our Spa Retreat room, featuring wellness amenities, meditation space, and direct spa access for the ultimate relaxation experience.',
    'room-14': 'Unleash your creativity in our Artist Loft, featuring a dedicated creative space, art supplies, and inspiring views to fuel your imagination.',
    'room-15': 'The ultimate in luxury, our Royal Villa features multiple bedrooms, private pool, and exclusive access to premium services and amenities.'
}

def generate_room_html(room):
    guest_options = '\n'.join([f'                                    <option value="{i+1}">{i+1} Guest{"s" if i > 0 else ""}</option>' for i in range(room['maxGuests'])])
    
    amenity_list_1 = '\n'.join([f'''                                    <li class="amenity-item flex items-center">
                                        <svg class="amenity-icon w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        <span>{amenity}</span>
                                    </li>''' for amenity in room['amenities'][:3]])
    
    amenity_list_2 = '\n'.join([f'''                                    <li class="amenity-item flex items-center">
                                        <svg class="amenity-icon w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        <span>{amenity}</span>
                                    </li>''' for amenity in room['amenities'][3:]])

    html_content = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{room['name']} - Luxury Villa Retreat</title>
    <meta name="description" content="Book our {room['name']} featuring {', '.join(room['amenities'][:3]).lower()}. Perfect for luxury travelers seeking comfort and elegance.">
    <link rel="stylesheet" href="../css/main.css">
    <link rel="stylesheet" href="../css/responsive.css">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://js.stripe.com/v3/"></script>
</head>
<body>
    <!-- Navigation -->
    <nav class="bg-white shadow-lg fixed w-full top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <a href="../index.html" class="text-2xl font-bold text-gray-800">Luxury Villa Retreat</a>
                </div>
                <div class="hidden md:flex items-center space-x-8">
                    <a href="../index.html" class="text-gray-700 hover:text-blue-600 font-medium">Home</a>
                    <a href="../location.html" class="text-gray-700 hover:text-blue-600 font-medium">Location</a>
                    <a href="../index.html#rooms" class="text-gray-700 hover:text-blue-600 font-medium">Rooms</a>
                    <a href="../index.html#contact" class="text-gray-700 hover:text-blue-600 font-medium">Contact</a>
                </div>
                <div class="md:hidden flex items-center">
                    <button id="mobile-menu-btn" class="text-gray-700 hover:text-blue-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <!-- Mobile menu -->
        <div id="mobile-menu" class="hidden md:hidden bg-white border-t">
            <div class="px-2 pt-2 pb-3 space-y-1">
                <a href="../index.html" class="block px-3 py-2 text-gray-700 hover:text-blue-600">Home</a>
                <a href="../location.html" class="block px-3 py-2 text-gray-700 hover:text-blue-600">Location</a>
                <a href="../index.html#rooms" class="block px-3 py-2 text-gray-700 hover:text-blue-600">Rooms</a>
                <a href="../index.html#contact" class="block px-3 py-2 text-gray-700 hover:text-blue-600">Contact</a>
            </div>
        </div>
    </nav>

    <!-- Room Header -->
    <section class="room-header bg-gradient-to-r from-gray-50 to-blue-50 pt-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div class="text-center">
                <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{room['name']}</h1>
                <p class="text-xl text-gray-600 mb-6">{descriptions[room['id']]}</p>
                <div class="room-price text-3xl font-bold text-blue-600 mb-8">
                    ${room['price']}<span class="text-lg font-normal text-gray-500">/night</span>
                </div>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <button onclick="scrollToBooking()" class="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
                        Book Now
                    </button>
                    <a href="../index.html#rooms" class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition duration-300">
                        View All Rooms
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Room Details -->
    <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <!-- Room Information -->
                <div class="lg:col-span-2">
                    <div class="mb-12">
                        <h2 class="text-3xl font-bold text-gray-900 mb-6">Room Overview</h2>
                        <p class="text-lg text-gray-600 mb-6">
                            {descriptions[room['id']]} This thoughtfully designed space combines luxury with functionality to create the perfect retreat for discerning guests.
                        </p>
                        <p class="text-lg text-gray-600 mb-6">
                            Every detail has been carefully considered to ensure your comfort and satisfaction. From premium furnishings to state-of-the-art amenities, this room provides everything you need for an exceptional stay.
                        </p>
                        <p class="text-lg text-gray-600">
                            Whether you're traveling for business or leisure, our {room['name'].lower()} offers the perfect blend of comfort, style, and convenience to make your stay truly memorable.
                        </p>
                    </div>

                    <!-- Room Amenities -->
                    <div class="room-amenities mb-12">
                        <h3 class="text-2xl font-bold text-gray-900 mb-6">Room Amenities</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="amenities-list">
                                <ul class="space-y-3">
{amenity_list_1}
                                </ul>
                            </div>
                            <div class="amenities-list">
                                <ul class="space-y-3">
{amenity_list_2}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Booking Sidebar -->
                <div class="lg:col-span-1">
                    <div class="booking-form bg-white p-6 rounded-lg shadow-lg border sticky top-24">
                        <h3 class="text-2xl font-bold text-gray-900 mb-6">Book This Room</h3>
                        
                        <form id="room-booking-form" class="space-y-4">
                            <div>
                                <label for="checkin" class="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
                                <input type="date" id="checkin" name="checkin" required 
                                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                            </div>
                            
                            <div>
                                <label for="checkout" class="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
                                <input type="date" id="checkout" name="checkout" required 
                                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                            </div>
                            
                            <div>
                                <label for="guests" class="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                                <select id="guests" name="guests" required 
                                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
{guest_options}
                                </select>
                            </div>
                            
                            <div class="booking-summary bg-gray-50 p-4 rounded-md">
                                <div class="flex justify-between items-center mb-2">
                                    <span class="text-sm text-gray-600">Room Rate:</span>
                                    <span class="text-sm font-medium">${room['price']}/night</span>
                                </div>
                                <div class="flex justify-between items-center mb-2">
                                    <span class="text-sm text-gray-600">Nights:</span>
                                    <span class="text-sm font-medium" id="nights-display">0</span>
                                </div>
                                <div class="border-t pt-2">
                                    <div class="flex justify-between items-center">
                                        <span class="font-medium">Total:</span>
                                        <span class="text-xl font-bold text-blue-600" id="total-price">$0</span>
                                    </div>
                                </div>
                            </div>
                            
                            <h4 class="text-lg font-semibold text-gray-900 mt-6 mb-4">Guest Information</h4>
                            
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                    <input type="text" id="firstName" name="firstName" required 
                                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                                </div>
                                <div>
                                    <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                    <input type="text" id="lastName" name="lastName" required 
                                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                                </div>
                            </div>
                            
                            <div>
                                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input type="email" id="email" name="email" required 
                                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                            </div>
                            
                            <div>
                                <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input type="tel" id="phone" name="phone" required 
                                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                            </div>
                            
                            <div>
                                <label for="special-requests" class="block text-sm font-medium text-gray-700 mb-1">Special Requests (Optional)</label>
                                <textarea id="special-requests" name="special-requests" rows="3" 
                                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                          placeholder="Any special requests or preferences..."></textarea>
                            </div>
                            
                            <button type="submit" class="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-blue-700 transition duration-300">
                                Complete Booking
                            </button>
                        </form>
                        
                        <div class="mt-4 text-center">
                            <p class="text-xs text-gray-500">
                                Secure payment processing with SSL encryption
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Room Policies -->
    <section class="py-16 bg-gray-50">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Room Policies</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="bg-white p-6 rounded-lg shadow">
                    <h3 class="text-xl font-semibold text-gray-900 mb-4">Check-in & Check-out</h3>
                    <ul class="space-y-2 text-gray-600">
                        <li>• Check-in: 3:00 PM</li>
                        <li>• Check-out: 11:00 AM</li>
                        <li>• Early check-in available upon request</li>
                        <li>• Late check-out available for additional fee</li>
                    </ul>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow">
                    <h3 class="text-xl font-semibold text-gray-900 mb-4">Cancellation Policy</h3>
                    <ul class="space-y-2 text-gray-600">
                        <li>• Free cancellation up to 24 hours before check-in</li>
                        <li>• 50% charge for cancellations within 24 hours</li>
                        <li>• No-show bookings are charged in full</li>
                        <li>• Modifications subject to availability</li>
                    </ul>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow">
                    <h3 class="text-xl font-semibold text-gray-900 mb-4">Room Rules</h3>
                    <ul class="space-y-2 text-gray-600">
                        <li>• Maximum occupancy: {room['maxGuests']} guests</li>
                        <li>• No smoking in rooms</li>
                        <li>• Pets allowed with prior approval</li>
                        <li>• Quiet hours: 10:00 PM - 7:00 AM</li>
                    </ul>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow">
                    <h3 class="text-xl font-semibold text-gray-900 mb-4">Additional Services</h3>
                    <ul class="space-y-2 text-gray-600">
                        <li>• 24/7 room service available</li>
                        <li>• Daily housekeeping included</li>
                        <li>• Laundry and dry cleaning services</li>
                        <li>• Concierge assistance</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 class="text-xl font-semibold mb-4">Luxury Villa Retreat</h3>
                    <p class="text-gray-400">Experience the finest in luxury accommodation with our 15 unique rooms.</p>
                </div>
                <div>
                    <h3 class="text-xl font-semibold mb-4">Quick Links</h3>
                    <ul class="space-y-2">
                        <li><a href="../index.html" class="text-gray-400 hover:text-white">Home</a></li>
                        <li><a href="../location.html" class="text-gray-400 hover:text-white">Location</a></li>
                        <li><a href="../index.html#rooms" class="text-gray-400 hover:text-white">Rooms</a></li>
                        <li><a href="../index.html#contact" class="text-gray-400 hover:text-white">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h3 class="text-xl font-semibold mb-4">Contact Info</h3>
                    <ul class="space-y-2 text-gray-400">
                        <li>Phone: +1 (555) 123-4567</li>
                        <li>Email: info@luxuryvillaretreat.com</li>
                        <li>24/7 Concierge Service</li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-gray-800 mt-8 pt-8 text-center">
                <p class="text-gray-400">&copy; 2024 Luxury Villa Retreat. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script src="../js/navigation.js"></script>
    <script src="../js/booking.js"></script>
    <script src="../js/payment.js"></script>
    
    <script>
        function scrollToBooking() {{
            document.querySelector('.booking-form').scrollIntoView({{ 
                behavior: 'smooth',
                block: 'start'
            }});
        }}
    </script>
</body>
</html>'''
    
    return html_content

# Generate all room files
for room in rooms:
    html_content = generate_room_html(room)
    filename = f"./rooms/{room['id']}.html"
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print(f"Generated {filename}")

print("All room pages generated successfully!")
