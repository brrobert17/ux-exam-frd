// Hardcoded ticket data for demonstration purposes
let purchasedTickets = [
    {
        id: 'ET-123456',
        type: 'Eco-Friendly Route',
        price: 37,
        from: 'Nærum',
        to: 'Copenhagen Central',
        purchaseDate: new Date(new Date().getTime() - 3600000).toISOString(), // 1 hour ago
        time: '35 min',
        expirationDate: new Date(new Date().getTime() + 82800000).toISOString() // 23 hours from now
    }
];

let travelHistory = [
    {
        id: 'ET-987654',
        type: 'Fastest Route',
        price: 42,
        from: 'Copenhagen Central',
        to: 'Nærum',
        purchaseDate: new Date(new Date().getTime() - 86400000 * 2).toISOString(), // 2 days ago
        time: '25 min'
    },
    {
        id: 'ET-456789',
        type: 'Bike-Friendly Route',
        price: 40,
        from: 'Nærum',
        to: 'Lyngby',
        purchaseDate: new Date(new Date().getTime() - 86400000 * 5).toISOString(), // 5 days ago
        time: '32 min'
    },
    {
        id: 'ET-654321',
        type: 'Accessible Route',
        price: 32,
        from: 'Lyngby',
        to: 'Nærum',
        purchaseDate: new Date(new Date().getTime() - 86400000 * 8).toISOString(), // 8 days ago
        time: '40 min'
    }
];

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    
    // Initialize the home page if on index page
    if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
        initHomePage();
    }
    
    // Initialize tickets page if on tickets page
    if (window.location.pathname.includes('tickets.html')) {
        displayActiveTickets();
        displayTravelHistory();
    }
    
    // Initialize profile page if on profile page
    if (window.location.pathname.includes('profile.html')) {
        initProfilePage();
    }
});

// Function to initialize the home page
function initHomePage() {
    // Initialize date-time picker with current date and time
    const dateTimeInput = document.getElementById('date-time');
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    dateTimeInput.value = now.toISOString().slice(0, 16);

    // Handle search button click
    const searchBtn = document.getElementById('search-btn');
    searchBtn.addEventListener('click', searchRoute);
    
    // Handle map toggle button
    const mapToggleBtn = document.getElementById('map-toggle');
    const mapContainer = document.getElementById('map-container');
    let mapLoaded = false;
    
    mapToggleBtn.addEventListener('click', () => {
        const isExpanded = mapToggleBtn.getAttribute('aria-expanded') === 'true';
        
        // Toggle map visibility
        mapToggleBtn.setAttribute('aria-expanded', !isExpanded);
        mapContainer.classList.toggle('hidden');
        mapContainer.setAttribute('aria-hidden', isExpanded);
        
        // Update button text
        mapToggleBtn.querySelector('span').textContent = isExpanded ? 'Show Map' : 'Hide Map';
        
        // Load map if it hasn't been loaded yet
        if (!mapLoaded && !isExpanded) {
            const iframe = mapContainer.querySelector('iframe');
            iframe.src = iframe.getAttribute('data-src');
            mapLoaded = true;
            
            // Log sustainability impact (in a real app, this could track actual savings)
            console.log('Map loaded on demand - reducing initial page load by approximately 1.5MB');
            
            // Show sustainability message
            showMessage('Map loaded on demand to save energy and data', 'success');
        }
    });
    
    // Handle info buttons for pet and bike rules
    const petInfoBtn = document.getElementById('pet-info');
    const bikeInfoBtn = document.getElementById('bike-info');
    
    if (petInfoBtn) {
        petInfoBtn.addEventListener('click', () => {
            showRulesAndGuidelines('pet');
        });
    }
    
    if (bikeInfoBtn) {
        bikeInfoBtn.addEventListener('click', () => {
            showRulesAndGuidelines('bike');
        });
    }
}

// Function to initialize the tickets page
function initTicketsPage() {
    displayActiveTickets();
    displayTravelHistory();
}

// Function to initialize the profile page
function initProfilePage() {
    // Profile page is just for display - no functionality needed
    console.log('Profile page loaded - display only, no functionality');
    
    // Add a message to inform users that this is a demo
    setTimeout(() => {
        showMessage('This is a demo profile page. All buttons are for display purposes only.', 'info');
    }, 500);
}

// Function to initialize navigation
function initNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetPage = btn.getAttribute('data-page');
            
            if (targetPage) {
                // Navigate to the target page
                window.location.href = targetPage;
            }
        });
    });
    
    // Mark the current page's navigation button as active
    const currentPath = window.location.pathname;
    navButtons.forEach(btn => {
        const targetPage = btn.getAttribute('data-page');
        if (targetPage && currentPath.includes(targetPage)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Accessibility enhancement: Allow pressing Enter in input fields to trigger search
    const inputFields = document.querySelectorAll('input');
    inputFields.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && window.location.pathname.includes('index.html')) {
                searchRoute();
            }
        });
    });
};

// Function to load tickets from storage - simplified for demo
function loadTicketsFromStorage() {
    // Using hardcoded data, no need to load from storage
    // This function is kept for compatibility with the existing code
    console.log('Using hardcoded ticket data for demonstration');
}

// Function to save tickets to storage - simplified for demo
function saveTicketsToStorage() {
    // Using hardcoded data, no need to save to storage
    // This function is kept for compatibility with the existing code
    console.log('In a real app, this would save tickets to storage');
}

// Function to add a new ticket - simplified for demo
function addTicket(ticket) {
    // For demo purposes, just show a message
    console.log('In a real app, this would add a new ticket:', ticket);
    
    // Show a message to the user
    showMessage('Ticket purchased! Check the My Tickets page to view it.', 'success');
}

// Function to add to travel history - simplified for demo
function addToHistory(ticket) {
    // For demo purposes, just show a message
    console.log('In a real app, this would add to travel history:', ticket);
}

// Function to display active tickets
function displayActiveTickets() {
    const activeTicketsContainer = document.getElementById('active-tickets');
    const noActiveTicketsElement = document.getElementById('no-active-tickets');
    
    if (!activeTicketsContainer) return;
    
    // Remove all existing tickets except the empty state
    const existingTickets = activeTicketsContainer.querySelectorAll('.ticket-card');
    existingTickets.forEach(ticket => ticket.remove());
    
    // Check if there are active tickets
    if (purchasedTickets.length === 0) {
        if (noActiveTicketsElement) {
            noActiveTicketsElement.style.display = 'flex';
        }
        return;
    }
    
    // Hide empty state
    if (noActiveTicketsElement) {
        noActiveTicketsElement.style.display = 'none';
    }
    
    // Sort tickets by expiration date (soonest first)
    const sortedTickets = [...purchasedTickets].sort((a, b) => {
        return new Date(a.expirationDate) - new Date(b.expirationDate);
    });
    
    // Add tickets to container
    sortedTickets.forEach(ticket => {
        const ticketElement = createTicketElement(ticket);
        activeTicketsContainer.appendChild(ticketElement);
    });
}

// Function to create a ticket element
function createTicketElement(ticket) {
    const ticketElement = document.createElement('div');
    ticketElement.className = 'ticket-card';
    ticketElement.setAttribute('data-ticket-id', ticket.id);
    
    // Format dates
    const purchaseDate = new Date(ticket.purchaseDate).toLocaleString('en-DK', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    const expirationDate = new Date(ticket.expirationDate).toLocaleString('en-DK', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    // Calculate time remaining
    const now = new Date();
    const expiration = new Date(ticket.expirationDate);
    const hoursRemaining = Math.max(0, Math.floor((expiration - now) / (1000 * 60 * 60)));
    const minutesRemaining = Math.max(0, Math.floor(((expiration - now) % (1000 * 60 * 60)) / (1000 * 60)));
    
    // Create ticket content
    ticketElement.innerHTML = `
        <div class="ticket-card-header">
            <div class="ticket-route">${ticket.from} to ${ticket.to}</div>
            <div class="ticket-date">${purchaseDate}</div>
        </div>
        <div class="ticket-details">
            <div class="ticket-detail">
                <span class="detail-label">Ticket Type</span>
                <span class="detail-value">${ticket.type}</span>
            </div>
            <div class="ticket-detail">
                <span class="detail-label">Price</span>
                <span class="detail-value">${ticket.price} DKK</span>
            </div>
            <div class="ticket-detail">
                <span class="detail-label">Valid Until</span>
                <span class="detail-value">${expirationDate}</span>
            </div>
        </div>
        <div class="ticket-validity">
            <div class="validity-indicator ${hoursRemaining < 2 ? 'expiring' : ''}">
                <i class="fas ${hoursRemaining < 2 ? 'fa-exclamation-circle' : 'fa-check-circle'}"></i>
                ${hoursRemaining > 0 || minutesRemaining > 0 ? `Valid for ${hoursRemaining}h ${minutesRemaining}m` : 'Expired'}
            </div>
        </div>
        <div class="ticket-actions">
            <button class="btn secondary-btn ticket-btn view-ticket-btn">
                <i class="fas fa-eye"></i> View Ticket
            </button>
        </div>
    `;
    
    // No functionality for view ticket button in demo
    const viewTicketBtn = ticketElement.querySelector('.view-ticket-btn');
    // Display-only button, no functionality
    
    return ticketElement;
}

// Function to display travel history
function displayTravelHistory() {
    const historyContainer = document.getElementById('travel-history');
    const noHistoryElement = document.getElementById('no-travel-history');
    
    if (!historyContainer) return;
    
    // Remove all existing history items except the empty state
    const existingItems = historyContainer.querySelectorAll('.history-card');
    existingItems.forEach(item => item.remove());
    
    // Check if there is travel history
    if (travelHistory.length === 0) {
        if (noHistoryElement) {
            noHistoryElement.style.display = 'flex';
        }
        return;
    }
    
    // Hide empty state
    if (noHistoryElement) {
        noHistoryElement.style.display = 'none';
    }
    
    // Add history items to container
    travelHistory.forEach(historyItem => {
        const historyElement = createHistoryElement(historyItem);
        historyContainer.appendChild(historyElement);
    });
}

// Function to create a history element
function createHistoryElement(historyItem) {
    const historyElement = document.createElement('div');
    historyElement.className = 'history-card';
    
    // Format date
    const purchaseDate = new Date(historyItem.purchaseDate).toLocaleString('en-DK', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    // Create history content
    historyElement.innerHTML = `
        <div class="history-info">
            <div class="history-route">${historyItem.from} to ${historyItem.to}</div>
            <div class="history-date">${purchaseDate}</div>
        </div>
        <div class="history-price">${historyItem.price} DKK</div>
        <button class="repurchase-btn" aria-label="Repurchase this ticket">
            <i class="fas fa-redo-alt"></i> Repurchase
        </button>
    `;
    
    // No functionality for repurchase button in demo
    const repurchaseBtn = historyElement.querySelector('.repurchase-btn');
    // Display-only button, no functionality
    
    return historyElement;
}

// Function to repurchase a ticket from history - simplified for demo
function repurchaseTicket(historyItem) {
    // For demo purposes, just show a message
    console.log('In a real app, this would repurchase the ticket:', historyItem);
    
    // Show confirmation message
    showMessage('Ticket repurchased successfully!', 'success');
    
    // No need to refresh display since we're using hardcoded data
}

// Function to show ticket details
function showTicketDetails(ticket) {
    // Create a modal for the ticket details
    const modal = document.createElement('div');
    modal.className = 'ethical-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', 'ticketDetailsTitle');
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content confirmation-content';
    
    // Format dates
    const purchaseDate = new Date(ticket.purchaseDate).toLocaleString('en-DK', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    const expirationDate = new Date(ticket.expirationDate).toLocaleString('en-DK', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    // Add content
    modalContent.innerHTML = `
        <div class="confirmation-header">
            <h2 id="ticketDetailsTitle">Ticket Details</h2>
        </div>
        
        <div class="ticket">
            <div class="ticket-header">
                <div class="ticket-logo">
                    <i class="fas fa-train"></i> Ethical Transit
                </div>
                <div class="ticket-type">${ticket.type}</div>
            </div>
            
            <div class="ticket-details">
                <div class="ticket-info">
                    <span class="label">Ticket #:</span>
                    <span class="value">${ticket.id}</span>
                </div>
                <div class="ticket-info">
                    <span class="label">Purchase Date:</span>
                    <span class="value">${purchaseDate}</span>
                </div>
                <div class="ticket-info">
                    <span class="label">Valid Until:</span>
                    <span class="value">${expirationDate}</span>
                </div>
                <div class="ticket-info">
                    <span class="label">Route:</span>
                    <span class="value">${ticket.from} to ${ticket.to}</span>
                </div>
                <div class="ticket-info">
                    <span class="label">Price:</span>
                    <span class="value">${ticket.price} DKK</span>
                </div>
            </div>
            
            <div class="ticket-footer">
                <div class="qr-code">
                    <i class="fas fa-qrcode"></i>
                </div>
                <div class="ticket-note">
                    <p>Please show this ticket to the conductor when requested.</p>
                    <p>Valid for the selected journey only.</p>
                </div>
            </div>
        </div>
        
        <button class="btn primary-btn" id="close-ticket-details">
            <i class="fas fa-check"></i> Close
        </button>
    `;
    
    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal-close-btn';
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Close dialog');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    // Handle close button
    modalContent.querySelector('#close-ticket-details').addEventListener('click', () => {
        modal.remove();
    });
    
    // Add close button to modal content
    modalContent.appendChild(closeBtn);
    
    // Add to page
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Accessibility: trap focus in modal
    trapFocus(modal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', escHandler);
        }
    });
}

// Function to handle route search
function searchRoute() {
    const startPoint = document.getElementById('start-point').value;
    const endPoint = document.getElementById('end-point').value;
    const dateTime = document.getElementById('date-time').value;
    const hasPet = document.getElementById('pet-option').checked;
    const hasBike = document.getElementById('bike-option').checked;
    
    // Validate inputs
    if (!startPoint || !endPoint || !dateTime) {
        // Show error message with accessibility in mind
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    // Build message with additional options if selected
    let routeMessage = `Finding routes from ${startPoint} to ${endPoint} at ${formatDateTime(dateTime)}`;
    
    if (hasPet || hasBike) {
        routeMessage += ' with';
        
        if (hasPet) {
            routeMessage += ' a pet';
        }
        
        if (hasPet && hasBike) {
            routeMessage += ' and';
        }
        
        if (hasBike) {
            routeMessage += ' a bike';
        }
    }
    
    // In a real app, we would make an API call to get route information
    // For this mock, we'll just show a success message with ethical considerations
    showMessage(routeMessage, 'success');
    
    // Show ethical design considerations after a short delay
    setTimeout(() => {
        showEthicalRouteOptions(hasPet, hasBike);
    }, 1500);
}

// Helper function to format date and time in a user-friendly way
function formatDateTime(isoString) {
    const date = new Date(isoString);
    return date.toLocaleString('en-DK', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Function to display messages to the user
function showMessage(message, type) {
    // Check if a message container already exists
    let messageContainer = document.querySelector('.message-container');
    
    // If not, create one
    if (!messageContainer) {
        messageContainer = document.createElement('div');
        messageContainer.className = 'message-container';
        document.querySelector('.form-container').appendChild(messageContainer);
    }
    
    // Create the message element
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    messageElement.setAttribute('role', 'alert'); // Accessibility: announce to screen readers
    messageElement.textContent = message;
    
    // Add a close button
    const closeButton = document.createElement('button');
    closeButton.className = 'close-btn';
    closeButton.innerHTML = '&times;';
    closeButton.setAttribute('aria-label', 'Close message');
    closeButton.addEventListener('click', () => {
        messageElement.remove();
    });
    messageElement.appendChild(closeButton);
    
    // Add to container
    messageContainer.appendChild(messageElement);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.remove();
        }
    }, 5000);
}

// Function to show ethical route options
function showEthicalRouteOptions(hasPet = false, hasBike = false) {
    // Create a modal for ethical route options
    const modal = document.createElement('div');
    modal.className = 'ethical-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', 'modalTitle');
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    // Add header
    const header = document.createElement('h2');
    header.id = 'modalTitle';
    header.textContent = 'Ethical Route Options';
    
    // Add description with pet/bike info if applicable
    const description = document.createElement('p');
    let descriptionText = 'We prioritize routes based on environmental impact and accessibility needs';
    
    if (hasPet || hasBike) {
        descriptionText += ', with special consideration for';
        if (hasPet && hasBike) {
            descriptionText += ' both your pet and bicycle';
        } else if (hasPet) {
            descriptionText += ' your pet';
        } else {
            descriptionText += ' your bicycle';
        }
    }
    
    description.textContent = descriptionText + ':';
    
    // Create route options
    const routeOptions = document.createElement('div');
    routeOptions.className = 'route-options';
    
    // Base options that will be modified based on pet/bike selections
    let options = [
        {
            icon: 'fa-leaf',
            title: 'Eco-Friendly Route',
            description: 'Reduces CO₂ emissions by 30%',
            time: '35 min',
            ethical: 'Lower carbon footprint, supports sustainable transport'
        },
        {
            icon: 'fa-bolt',
            title: 'Fastest Route',
            description: 'Standard route via main roads',
            time: '25 min',
            ethical: 'Time-efficient but higher environmental impact'
        },
        {
            icon: 'fa-wheelchair',
            title: 'Accessible Route',
            description: 'Guaranteed step-free access',
            time: '40 min',
            ethical: 'Inclusive design for all mobility needs'
        }
    ];
    
    // Modify options based on pet and bike selections
    if (hasPet) {
        // Add pet-friendly information to options
        options[0].description += ' • Pet-friendly';
        options[1].description += ' • Limited pet areas';
        options[2].description += ' • Pet-friendly';
        
        // Add a pet-specific route option
        options.push({
            icon: 'fa-paw',
            title: 'Pet-Friendly Route',
            description: 'Includes rest areas for pets',
            time: '38 min',
            ethical: 'Considers animal welfare and comfort during travel'
        });
    }
    
    if (hasBike) {
        // Add bike-friendly information to options
        options[0].description += ' • Dedicated bike lanes';
        options[1].description += ' • Shared traffic lanes';
        options[2].description += ' • Bike-friendly facilities';
        
        // Add a bike-specific route option if not already added a pet option
        if (!hasPet) {
            options.push({
                icon: 'fa-bicycle',
                title: 'Bike-Friendly Route',
                description: 'Continuous bike lanes and bike parking',
                time: '32 min',
                ethical: 'Promotes active transportation and reduces emissions'
            });
        } else {
            // If both pet and bike, add a combined option
            options.push({
                icon: 'fa-route',
                title: 'Pet & Bike Route',
                description: 'Optimized for traveling with both',
                time: '42 min',
                ethical: 'Balanced approach for all your travel companions'
            });
        }
    }
    
    // Add prices to each option based on type
    options.forEach((option, index) => {
        // Add price information to each option
        // Base price is 32 DKK, with variations based on route type
        let basePrice = 32;
        
        // Adjust price based on route type
        if (option.title.includes('Eco-Friendly')) {
            option.price = basePrice + 5; // Slightly more expensive for eco option
        } else if (option.title.includes('Fastest')) {
            option.price = basePrice + 10; // Premium for fastest route
        } else if (option.title.includes('Accessible')) {
            option.price = basePrice; // Standard price for accessible route
        } else if (option.title.includes('Pet-Friendly')) {
            option.price = basePrice + 8; // Additional cost for pet accommodations
        } else if (option.title.includes('Bike-Friendly')) {
            option.price = basePrice + 8; // Additional cost for bike accommodations
        } else if (option.title.includes('Pet & Bike')) {
            option.price = basePrice + 12; // Combined additional cost
        }
        
        const routeCard = document.createElement('div');
        routeCard.className = 'route-card';
        // No tabindex needed since cards are not interactive
        
        routeCard.innerHTML = `
            <div class="route-icon"><i class="fas ${option.icon}"></i></div>
            <h3>${option.title}</h3>
            <p>${option.description}</p>
            <div class="route-details">
                <div class="route-time"><i class="fas fa-clock"></i> ${option.time}</div>
                <div class="route-price"><i class="fas fa-ticket-alt"></i> ${option.price} DKK</div>
            </div>
            <div class="ethical-note">
                <i class="fas fa-info-circle"></i>
                <span>${option.ethical}</span>
            </div>
            <button class="buy-ticket-btn" aria-label="Buy ticket for ${option.title}">
                <i class="fas fa-shopping-cart"></i> Buy Ticket
            </button>
        `;
        
        // Route cards are not clickable in this demo version
        // Only the Buy Ticket button has functionality
        
        // Add separate click event for the buy ticket button
        routeCard.querySelector('.buy-ticket-btn').addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent the card click event from firing
            showTicketPurchase(option);
            modal.remove();
        });
        
        routeOptions.appendChild(routeCard);
    });
    
    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal-close-btn';
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Close dialog');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    // Add consent notice
    const consentNotice = document.createElement('div');
    consentNotice.className = 'consent-notice';
    consentNotice.innerHTML = `
        <p><i class="fas fa-shield-alt"></i> Your privacy matters: We only use location data to provide route information and never share it with third parties.</p>
    `;
    
    // Assemble modal
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(header);
    modalContent.appendChild(description);
    modalContent.appendChild(routeOptions);
    modalContent.appendChild(consentNotice);
    modal.appendChild(modalContent);
    
    // Add to page
    document.body.appendChild(modal);
    
    // Accessibility: trap focus in modal
    trapFocus(modal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', escHandler);
        }
    });
}

// Function to show rules and guidelines for pets and bikes
function showRulesAndGuidelines(type) {
    // Create a modal for the rules
    const modal = document.createElement('div');
    modal.className = 'ethical-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', 'rulesTitle');
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content rules-content';
    
    // Add header
    const header = document.createElement('h2');
    header.id = 'rulesTitle';
    
    // Add content based on type
    const content = document.createElement('div');
    content.className = 'rules-container';
    
    if (type === 'pet') {
        header.textContent = 'Pet Travel Rules & Guidelines';
        content.innerHTML = `
            <div class="rules-section">
                <h3><i class="fas fa-check-circle"></i> General Pet Rules</h3>
                <ul>
                    <li>Pets must be kept in a carrier or on a leash at all times</li>
                    <li>You are responsible for cleaning up after your pet</li>
                    <li>Service animals are exempt from carrier requirements</li>
                    <li>Maximum of one pet per passenger</li>
                </ul>
            </div>
            
            <div class="rules-section">
                <h3><i class="fas fa-clock"></i> Time Restrictions</h3>
                <p>Pets are not allowed during peak hours:</p>
                <ul>
                    <li>Weekdays: 7:00-9:00 and 16:00-18:00</li>
                    <li>No restrictions on weekends and holidays</li>
                </ul>
            </div>
            
            <div class="rules-section">
                <h3><i class="fas fa-ticket-alt"></i> Ticket Information</h3>
                <ul>
                    <li>Pet ticket required: 20 DKK per journey</li>
                    <li>Service animals travel free of charge</li>
                    <li>Monthly pet passes available for regular travelers</li>
                </ul>
            </div>
            
            <div class="rules-section ethical-note">
                <p><i class="fas fa-heart"></i> Our pet policy is designed to balance the needs of pet owners with the comfort of all passengers. We welcome feedback to improve our pet-friendly services.</p>
            </div>
        `;
    } else if (type === 'bike') {
        header.textContent = 'Bicycle Travel Rules & Guidelines';
        content.innerHTML = `
            <div class="rules-section">
                <h3><i class="fas fa-check-circle"></i> General Bike Rules</h3>
                <ul>
                    <li>Bicycles must be placed in designated areas only</li>
                    <li>Maximum of 2 bikes per train car</li>
                    <li>Folding bikes can be brought on board at any time if folded</li>
                    <li>Electric scooters follow the same rules as bicycles</li>
                </ul>
            </div>
            
            <div class="rules-section">
                <h3><i class="fas fa-clock"></i> Time Restrictions</h3>
                <p>Bicycles are not allowed during peak hours:</p>
                <ul>
                    <li>Weekdays: 7:00-9:00 and 15:30-17:30</li>
                    <li>No restrictions on weekends and holidays</li>
                </ul>
            </div>
            
            <div class="rules-section">
                <h3><i class="fas fa-ticket-alt"></i> Ticket Information</h3>
                <ul>
                    <li>Bike ticket required: 30 DKK per journey</li>
                    <li>Day passes available: 60 DKK for unlimited travel</li>
                    <li>Monthly bike passes available for regular cyclists</li>
                </ul>
            </div>
            
            <div class="rules-section ethical-note">
                <p><i class="fas fa-leaf"></i> By accommodating bicycles on public transport, we support sustainable multi-modal transportation and reduce overall carbon emissions.</p>
            </div>
        `;
    }
    
    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal-close-btn';
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Close dialog');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    // Assemble modal
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(header);
    modalContent.appendChild(content);
    modal.appendChild(modalContent);
    
    // Add to page
    document.body.appendChild(modal);
    
    // Accessibility: trap focus in modal
    trapFocus(modal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', escHandler);
        }
    });
}

// Function to show ethical design message
function showEthicalMessage(section) {
    const modal = document.createElement('div');
    modal.className = 'ethical-modal';
    modal.setAttribute('role', 'dialog');
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    // Add header
    const header = document.createElement('h2');
    header.textContent = `${section} - Ethical Design`;
    
    // Add content based on section
    const content = document.createElement('div');
    
    if (section === 'Profile') {
        content.innerHTML = `
            <p>In our ethical design approach to user profiles:</p>
            <ul>
                <li><strong>Data Minimization:</strong> We only collect information that's necessary for the service.</li>
                <li><strong>Transparent Controls:</strong> Clear options to manage your data and privacy preferences.</li>
                <li><strong>Inclusive Design:</strong> Profile settings accommodate diverse needs and preferences.</li>
                <li><strong>No Dark Patterns:</strong> We don't use manipulative design to extract more data.</li>
            </ul>
            <p class="ethical-highlight">Your data belongs to you. We're just borrowing it to provide you with better service.</p>
        `;
    } else if (section === 'My Tickets') {
        content.innerHTML = `
            <p>Our ethical approach to digital tickets:</p>
            <ul>
                <li><strong>Accessibility First:</strong> Tickets are designed to be usable by everyone, including screen reader compatibility.</li>
                <li><strong>Offline Access:</strong> Tickets remain available without an internet connection.</li>
                <li><strong>Environmental Impact:</strong> Digital tickets reduce paper waste while minimizing battery drain.</li>
                <li><strong>Fair Pricing:</strong> Transparent pricing with no hidden fees or manipulative scarcity tactics.</li>
            </ul>
            <p class="ethical-highlight">Technology should serve all users equally and sustainably.</p>
        `;
    }
    
    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal-close-btn';
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Close dialog');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    // Assemble modal
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(header);
    modalContent.appendChild(content);
    modal.appendChild(modalContent);
    
    // Add to page
    document.body.appendChild(modal);
    
    // Accessibility: trap focus in modal
    trapFocus(modal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', escHandler);
        }
    });
}

// Function to show ticket purchase interface
function showTicketPurchase(routeOption) {
    // Create a modal for the ticket purchase
    const modal = document.createElement('div');
    modal.className = 'ethical-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', 'purchaseTitle');
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content purchase-content';
    
    // Add header
    const header = document.createElement('h2');
    header.id = 'purchaseTitle';
    header.textContent = 'Purchase Ticket';
    
    // Create route summary
    const routeSummary = document.createElement('div');
    routeSummary.className = 'purchase-summary';
    
    routeSummary.innerHTML = `
        <div class="selected-route">
            <div class="route-icon"><i class="fas ${routeOption.icon}"></i></div>
            <div class="route-info">
                <h3>${routeOption.title}</h3>
                <div class="route-details">
                    <div class="route-time"><i class="fas fa-clock"></i> ${routeOption.time}</div>
                    <div class="route-price"><i class="fas fa-ticket-alt"></i> ${routeOption.price} DKK</div>
                </div>
            </div>
        </div>
    `;
    
    // Create user info display (similar to profile page)
    const userInfoDisplay = document.createElement('div');
    userInfoDisplay.className = 'purchase-info-display';
    
    // Add user and payment info sections
    userInfoDisplay.innerHTML = `
        <div class="info-section">
            <h3><i class="fas fa-user-circle"></i> Passenger Information</h3>
            <div class="profile-info-container">
                <div class="profile-field">
                    <div class="field-label">Name</div>
                    <div class="field-value">
                        <span>Alex Jensen</span>
                    </div>
                </div>
                
                <div class="profile-field">
                    <div class="field-label">Email</div>
                    <div class="field-value">
                        <span>alex.jensen@example.com</span>
                    </div>
                </div>
                
                <div class="profile-field">
                    <div class="field-label">Phone Number</div>
                    <div class="field-value">
                        <span>+45 12 34 56 78</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="info-section">
            <h3><i class="fas fa-credit-card"></i> Payment Method</h3>
            <div class="saved-card">
                <div class="card-icon">
                    <i class="fab fa-cc-visa"></i>
                </div>
                <div class="card-details">
                    <div class="card-name">Visa ending in 4321</div>
                    <div class="card-expiry">Expires 09/27</div>
                </div>
            </div>
        </div>
        
        <div class="ethical-note purchase-note">
            <i class="fas fa-shield-alt"></i>
            <p>Your payment information is securely processed and never stored on our servers. We use industry-standard encryption to protect your data.</p>
        </div>
        
        <div class="form-actions">
            <button type="button" class="btn secondary-btn" id="cancel-purchase">Cancel</button>
            <button type="button" class="btn primary-btn" id="confirm-purchase">
                <i class="fas fa-check-circle"></i> Confirm Purchase (${routeOption.price} DKK)
            </button>
        </div>
    `;
    
    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal-close-btn';
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Close dialog');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    // Handle confirm purchase button
    const confirmButton = userInfoDisplay.querySelector('#confirm-purchase');
    confirmButton.addEventListener('click', () => {
        // In a real app, this would process the payment
        // For this demo, we'll just show a success message
        modal.remove();
        
        // Show success message after a short delay to simulate processing
        setTimeout(() => {
            showTicketConfirmation(routeOption);
        }, 1000);
    });
    
    // Handle cancel button
    const cancelButton = userInfoDisplay.querySelector('#cancel-purchase');
    cancelButton.addEventListener('click', () => {
        modal.remove();
        // Go back to route options
        showEthicalRouteOptions(document.getElementById('pet-option').checked, document.getElementById('bike-option').checked);
    });
    
    // Assemble modal
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(header);
    modalContent.appendChild(routeSummary);
    modalContent.appendChild(userInfoDisplay);
    modal.appendChild(modalContent);
    
    // Add to page
    document.body.appendChild(modal);
    
    // Accessibility: trap focus in modal
    trapFocus(modal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', escHandler);
        }
    });
}

// Function to show ticket confirmation
function showTicketConfirmation(routeOption) {
    // Create a modal for the ticket confirmation
    const modal = document.createElement('div');
    modal.className = 'ethical-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', 'confirmationTitle');
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content confirmation-content';
    
    // Generate a random ticket number
    const ticketNumber = 'ET-' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    
    // Get current date for the purchase date
    const purchaseDate = new Date();
    const formattedPurchaseDate = purchaseDate.toLocaleDateString('en-DK', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    // Create ticket object to save
    const ticket = {
        id: ticketNumber,
        type: routeOption.title,
        price: routeOption.price,
        from: document.getElementById('start-point').value,
        to: document.getElementById('end-point').value,
        purchaseDate: purchaseDate.toISOString(),
        time: routeOption.time
    };
    
    // Save the ticket to storage
    if (typeof addTicket === 'function') {
        addTicket(ticket);
    }
    
    // Add to history
    if (typeof addToHistory === 'function') {
        addToHistory(ticket);
    }
    
    // Add content
    modalContent.innerHTML = `
        <div class="confirmation-header">
            <i class="fas fa-check-circle confirmation-icon"></i>
            <h2 id="confirmationTitle">Ticket Purchased!</h2>
            <p>Your ticket has been successfully purchased and sent to your email.</p>
        </div>
        
        <div class="ticket">
            <div class="ticket-header">
                <div class="ticket-logo">
                    <i class="fas fa-train"></i> Nærumbanen
                </div>
                <div class="ticket-type">${routeOption.title}</div>
            </div>
            
            <div class="ticket-details">
                <div class="ticket-info">
                    <span class="label">Ticket #:</span>
                    <span class="value">${ticketNumber}</span>
                </div>
                <div class="ticket-info">
                    <span class="label">Purchase Date:</span>
                    <span class="value">${formattedPurchaseDate}</span>
                </div>
                <div class="ticket-info">
                    <span class="label">Route:</span>
                    <span class="value">${document.getElementById('start-point').value} to ${document.getElementById('end-point').value}</span>
                </div>
                <div class="ticket-info">
                    <span class="label">Travel Time:</span>
                    <span class="value">${routeOption.time}</span>
                </div>
                <div class="ticket-info">
                    <span class="label">Price:</span>
                    <span class="value">${routeOption.price} DKK</span>
                </div>
            </div>
            
            <div class="ticket-footer">
                <div class="qr-code">
                    <i class="fas fa-qrcode"></i>
                </div>
                <div class="ticket-note">
                    <p>Please show this ticket to the conductor when requested.</p>
                    <p>Valid for the selected journey only.</p>
                </div>
            </div>
        </div>
        
        <div class="ethical-note confirmation-note">
            <i class="fas fa-leaf"></i>
            <p>By choosing digital tickets, you're helping save approximately 12g of paper per ticket. Thank you for making an eco-friendly choice!</p>
        </div>
        
        <button class="btn primary-btn" id="close-confirmation">
            <i class="fas fa-check"></i> Done
        </button>
    `;
    
    // Handle close button
    modalContent.querySelector('#close-confirmation').addEventListener('click', () => {
        modal.remove();
    });
    
    // Add to page
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Accessibility: trap focus in modal
    trapFocus(modal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', escHandler);
        }
    });
}

// Accessibility function to trap focus in modal dialogs
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    // Set initial focus
    firstElement.focus();
    
    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            // Shift + Tab
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } 
            // Tab
            else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Add styles for the dynamic elements
const style = document.createElement('style');
style.textContent = `
    .message-container {
        margin-top: 15px;
        width: 100%;
    }
    
    .message {
        padding: 12px;
        border-radius: var(--border-radius);
        margin-bottom: 10px;
        position: relative;
        animation: slideIn 0.3s ease-out;
    }
    
    .error {
        background-color: rgba(207, 102, 121, 0.2);
        border-left: 4px solid var(--error-color);
        color: var(--error-color);
    }
    
    .success {
        background-color: rgba(76, 175, 80, 0.2);
        border-left: 4px solid var(--success-color);
        color: var(--success-color);
    }
    
    .close-btn {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        color: inherit;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0.7;
    }
    
    .close-btn:hover {
        opacity: 1;
    }
    
    @keyframes slideIn {
        from { transform: translateY(-20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    /* Ethical Modal Styles */
    .ethical-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1001;
        padding: 20px;
    }
    
    .modal-content {
        background-color: var(--secondary-bg);
        border-radius: var(--border-radius);
        max-width: 600px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        padding: 25px;
        position: relative;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        animation: fadeIn 0.3s ease-out;
    }
    
    .modal-content h2 {
        color: var(--accent-color);
        margin-bottom: 15px;
    }
    
    .modal-close-btn {
        position: absolute;
        top: 15px;
        right: 15px;
        background: none;
        border: none;
        color: var(--secondary-text);
        font-size: 1.5rem;
        cursor: pointer;
        transition: color var(--transition-speed);
    }
    
    .modal-close-btn:hover {
        color: var(--primary-text);
    }
    
    .route-options {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 15px;
        margin: 20px 0;
    }
    
    .route-card {
        background-color: var(--primary-bg);
        border-radius: var(--border-radius);
        padding: 15px;
        cursor: pointer;
        transition: transform var(--transition-speed), box-shadow var(--transition-speed);
        position: relative;
    }
    
    .route-card:hover, .route-card:focus {
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        outline: none;
    }
    
    .route-card:focus-visible {
        outline: 2px solid var(--accent-color);
    }
    
    .route-icon {
        font-size: 1.5rem;
        color: var(--accent-color);
        margin-bottom: 10px;
    }
    
    .route-time {
        font-weight: bold;
        margin: 10px 0;
    }
    
    .ethical-note {
        font-size: 0.85rem;
        color: var(--secondary-text);
        margin-top: 10px;
        padding-top: 10px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .ethical-note i {
        margin-right: 5px;
        color: var(--accent-color);
    }
    
    .consent-notice {
        margin-top: 20px;
        padding: 10px;
        background-color: rgba(78, 154, 241, 0.1);
        border-radius: var(--border-radius);
        font-size: 0.9rem;
    }
    
    .consent-notice i {
        color: var(--accent-color);
        margin-right: 5px;
    }
    
    .ethical-highlight {
        margin-top: 15px;
        font-style: italic;
        color: var(--accent-color);
        text-align: center;
    }
    
    ul {
        margin-left: 20px;
        margin-bottom: 15px;
    }
    
    li {
        margin-bottom: 8px;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
    }
    
    /* Profile page modal styles */
    .edit-field-form {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    
    .edit-field-form label {
        display: block;
        margin-bottom: 5px;
        color: var(--secondary-text);
    }
    
    .edit-field-form input {
        width: 100%;
        padding: 12px;
        border-radius: var(--border-radius);
        border: 1px solid #444;
        background-color: var(--primary-bg);
        color: var(--primary-text);
    }
    
    .edit-field-form input:focus {
        border-color: var(--accent-color);
        outline: none;
    }
    
    .edit-field-actions {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        margin-top: 10px;
    }
    
    .verification-form {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    
    .verification-form-field {
        margin-bottom: 15px;
    }
    
    .verification-form-field label {
        display: block;
        margin-bottom: 5px;
        color: var(--secondary-text);
    }
    
    .verification-form-field input,
    .verification-form-field select {
        width: 100%;
        padding: 12px;
        border-radius: var(--border-radius);
        border: 1px solid #444;
        background-color: var(--primary-bg);
        color: var(--primary-text);
    }
    
    .verification-form-actions {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
    }
    
    .verification-note {
        margin-top: 15px;
        font-size: 0.85rem;
        color: var(--secondary-text);
    }
    
    .verification-note i {
        color: var(--accent-color);
        margin-right: 5px;
    }
    
    .payment-form {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
    }
    
    .payment-form-field {
        margin-bottom: 15px;
    }
    
    .payment-form-field.full-width {
        grid-column: span 2;
    }
    
    .payment-form-field label {
        display: block;
        margin-bottom: 5px;
        color: var(--secondary-text);
    }
    
    .payment-form-field input {
        width: 100%;
        padding: 12px;
        border-radius: var(--border-radius);
        border: 1px solid #444;
        background-color: var(--primary-bg);
        color: var(--primary-text);
    }
    
    .payment-form-actions {
        grid-column: span 2;
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        margin-top: 10px;
    }
    
    @media (max-width: 768px) {
        .route-options {
            grid-template-columns: 1fr;
        }
        
        .modal-content {
            padding: 15px;
            max-height: 80vh;
        }
        
        .payment-form {
            grid-template-columns: 1fr;
        }
        
        .payment-form-field.full-width {
            grid-column: span 1;
        }
        
        .payment-form-actions {
            grid-column: span 1;
        }
    }
`;

document.head.appendChild(style);

// Function to show edit field modal
function showEditFieldModal(fieldId, currentValue) {
    // Create field label based on field ID
    let fieldLabel = '';
    switch(fieldId) {
        case 'user-name':
            fieldLabel = 'Name';
            break;
        case 'user-email':
            fieldLabel = 'Email';
            break;
        case 'user-phone':
            fieldLabel = 'Phone Number';
            break;
        default:
            fieldLabel = 'Field';
    }
    
    // Create modal for editing field
    const modal = document.createElement('div');
    modal.className = 'ethical-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', 'edit-field-title');
    
    // Create modal content
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close-btn" aria-label="Close modal">
                <i class="fas fa-times"></i>
            </button>
            <h2 id="edit-field-title">Edit ${fieldLabel}</h2>
            <form class="edit-field-form">
                <div>
                    <label for="edit-field-input">${fieldLabel}</label>
                    <input type="text" id="edit-field-input" value="${currentValue}" required>
                </div>
                <div class="edit-field-actions">
                    <button type="button" class="btn secondary-btn" id="cancel-edit">Cancel</button>
                    <button type="submit" class="btn primary-btn">Save</button>
                </div>
            </form>
            <div class="ethical-note">
                <i class="fas fa-info-circle"></i>
                Your personal information is stored locally and never shared with third parties without your explicit consent.
            </div>
        </div>
    `;
    
    // Add modal to the document
    document.body.appendChild(modal);
    
    // Trap focus in the modal
    trapFocus(modal);
    
    // Focus on the input field
    const inputField = document.getElementById('edit-field-input');
    inputField.focus();
    inputField.select();
    
    // Handle form submission
    const form = modal.querySelector('form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Update the field value
        const newValue = inputField.value.trim();
        if (newValue) {
            document.getElementById(fieldId).textContent = newValue;
            showMessage(`${fieldLabel} updated successfully`, 'success');
            closeModal();
        }
    });
    
    // Handle cancel button
    const cancelBtn = document.getElementById('cancel-edit');
    cancelBtn.addEventListener('click', closeModal);
    
    // Handle close button
    const closeBtn = modal.querySelector('.modal-close-btn');
    closeBtn.addEventListener('click', closeModal);
    
    // Handle escape key
    document.addEventListener('keydown', handleEscapeKey);
    
    // Function to close the modal
    function closeModal() {
        document.body.removeChild(modal);
        document.removeEventListener('keydown', handleEscapeKey);
    }
    
    // Function to handle escape key
    function handleEscapeKey(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    }
}

// Function to show student verification modal
function showStudentVerificationModal() {
    // Create modal for student verification
    const modal = document.createElement('div');
    modal.className = 'ethical-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', 'verification-title');
    
    // Create modal content
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close-btn" aria-label="Close modal">
                <i class="fas fa-times"></i>
            </button>
            <h2 id="verification-title"><i class="fas fa-graduation-cap"></i> Student Verification</h2>
            <p>Please provide your student information to verify your status and receive a 20% discount on all tickets.</p>
            
            <form class="verification-form">
                <div class="verification-form-field">
                    <label for="student-id">Student ID</label>
                    <input type="text" id="student-id" placeholder="Enter your student ID" required>
                </div>
                
                <div class="verification-form-field">
                    <label for="institution">Educational Institution</label>
                    <select id="institution" required>
                        <option value="" disabled selected>Select your institution</option>
                        <option value="cph-business">Copenhagen Business Academy</option>
                        <option value="ku">University of Copenhagen</option>
                        <option value="dtu">Technical University of Denmark</option>
                        <option value="cbs">Copenhagen Business School</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                
                <div class="verification-form-field">
                    <label for="email">Student Email</label>
                    <input type="email" id="email" placeholder="Enter your student email" required>
                </div>
                
                <div class="verification-form-actions">
                    <button type="button" class="btn secondary-btn" id="cancel-verification">Cancel</button>
                    <button type="submit" class="btn primary-btn">Verify Status</button>
                </div>
            </form>
            
            <div class="verification-note">
                <i class="fas fa-info-circle"></i>
                We will send a verification link to your student email. Your discount will be applied once verification is complete.
            </div>
        </div>
    `;
    
    // Add modal to the document
    document.body.appendChild(modal);
    
    // Trap focus in the modal
    trapFocus(modal);
    
    // Focus on the first input field
    const firstInput = document.getElementById('student-id');
    firstInput.focus();
    
    // Handle form submission
    const form = modal.querySelector('form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show success message
        showMessage('Verification email sent. Please check your student email to complete verification.', 'success');
        closeModal();
    });
    
    // Handle cancel button
    const cancelBtn = document.getElementById('cancel-verification');
    cancelBtn.addEventListener('click', closeModal);
    
    // Handle close button
    const closeBtn = modal.querySelector('.modal-close-btn');
    closeBtn.addEventListener('click', closeModal);
    
    // Handle escape key
    document.addEventListener('keydown', handleEscapeKey);
    
    // Function to close the modal
    function closeModal() {
        document.body.removeChild(modal);
        document.removeEventListener('keydown', handleEscapeKey);
    }
    
    // Function to handle escape key
    function handleEscapeKey(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    }
}

// Function to show add payment method modal
function showAddPaymentModal() {
    // Create modal for adding payment method
    const modal = document.createElement('div');
    modal.className = 'ethical-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', 'payment-title');
    
    // Create modal content
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close-btn" aria-label="Close modal">
                <i class="fas fa-times"></i>
            </button>
            <h2 id="payment-title"><i class="fas fa-credit-card"></i> Add Payment Method</h2>
            <p>Add a new payment method to your account for faster checkout.</p>
            
            <form class="payment-form">
                <div class="payment-form-field full-width">
                    <label for="card-number">Card Number</label>
                    <input type="text" id="card-number" placeholder="1234 5678 9012 3456" required>
                </div>
                
                <div class="payment-form-field">
                    <label for="expiry-date">Expiry Date</label>
                    <input type="text" id="expiry-date" placeholder="MM/YY" required>
                </div>
                
                <div class="payment-form-field">
                    <label for="cvv">CVV</label>
                    <input type="text" id="cvv" placeholder="123" required>
                </div>
                
                <div class="payment-form-field full-width">
                    <label for="card-name">Name on Card</label>
                    <input type="text" id="card-name" placeholder="John Doe" required>
                </div>
                
                <div class="payment-form-actions">
                    <button type="button" class="btn secondary-btn" id="cancel-payment">Cancel</button>
                    <button type="submit" class="btn primary-btn">Add Card</button>
                </div>
            </form>
            
            <div class="verification-note">
                <i class="fas fa-shield-alt"></i>
                Your payment information is encrypted and securely stored. We never store your CVV.
            </div>
        </div>
    `;
    
    // Add modal to the document
    document.body.appendChild(modal);
    
    // Trap focus in the modal
    trapFocus(modal);
    
    // Focus on the first input field
    const firstInput = document.getElementById('card-number');
    firstInput.focus();
    
    // Handle form submission
    const form = modal.querySelector('form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show success message
        showMessage('Payment method added successfully', 'success');
        closeModal();
    });
    
    // Handle cancel button
    const cancelBtn = document.getElementById('cancel-payment');
    cancelBtn.addEventListener('click', closeModal);
    
    // Handle close button
    const closeBtn = modal.querySelector('.modal-close-btn');
    closeBtn.addEventListener('click', closeModal);
    
    // Handle escape key
    document.addEventListener('keydown', handleEscapeKey);
    
    // Function to close the modal
    function closeModal() {
        document.body.removeChild(modal);
        document.removeEventListener('keydown', handleEscapeKey);
    }
    
    // Function to handle escape key
    function handleEscapeKey(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    }
}

// Function to adjust text size
function adjustTextSize(action) {
    // Get all size dots
    const sizeDots = document.querySelectorAll('.size-dot');
    const activeDots = document.querySelectorAll('.size-dot.active');
    const totalDots = sizeDots.length;
    const activeDotCount = activeDots.length;
    
    if (action === 'increase' && activeDotCount < totalDots) {
        // Increase text size - activate one more dot
        sizeDots[activeDotCount].classList.add('active');
        showMessage('Text size increased', 'success');
    } else if (action === 'decrease' && activeDotCount > 1) {
        // Decrease text size - deactivate one dot
        activeDots[activeDotCount - 1].classList.remove('active');
        showMessage('Text size decreased', 'success');
    } else if (action === 'increase') {
        showMessage('Maximum text size reached', 'info');
    } else {
        showMessage('Minimum text size reached', 'info');
    }
}
