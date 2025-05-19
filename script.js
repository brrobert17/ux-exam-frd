document.addEventListener('DOMContentLoaded', () => {
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

    // Mobile navigation
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            navButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            // In a real app, we would navigate to the corresponding page
            // For now, just show a message about ethical design
            if (btn.getAttribute('aria-label') !== 'Home') {
                showEthicalMessage(btn.getAttribute('aria-label'));
            }
        });
    });

    // Accessibility enhancement: Allow pressing Enter in input fields to trigger search
    const inputFields = document.querySelectorAll('input');
    inputFields.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchRoute();
            }
        });
    });
});

// Function to handle route search
function searchRoute() {
    const startPoint = document.getElementById('start-point').value;
    const endPoint = document.getElementById('end-point').value;
    const dateTime = document.getElementById('date-time').value;
    
    // Validate inputs
    if (!startPoint || !endPoint || !dateTime) {
        // Show error message with accessibility in mind
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    // In a real app, we would make an API call to get route information
    // For this mock, we'll just show a success message with ethical considerations
    showMessage(
        `Finding routes from ${startPoint} to ${endPoint} at ${formatDateTime(dateTime)}`, 
        'success'
    );
    
    // Show ethical design considerations after a short delay
    setTimeout(() => {
        showEthicalRouteOptions();
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
function showEthicalRouteOptions() {
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
    
    // Add description
    const description = document.createElement('p');
    description.textContent = 'We prioritize routes based on environmental impact and accessibility needs:';
    
    // Create route options
    const routeOptions = document.createElement('div');
    routeOptions.className = 'route-options';
    
    const options = [
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
    
    options.forEach(option => {
        const routeCard = document.createElement('div');
        routeCard.className = 'route-card';
        routeCard.setAttribute('tabindex', '0'); // Make focusable for keyboard navigation
        
        routeCard.innerHTML = `
            <div class="route-icon"><i class="fas ${option.icon}"></i></div>
            <h3>${option.title}</h3>
            <p>${option.description}</p>
            <div class="route-time">${option.time}</div>
            <div class="ethical-note">
                <i class="fas fa-info-circle"></i>
                <span>${option.ethical}</span>
            </div>
        `;
        
        routeCard.addEventListener('click', () => {
            // In a real app, this would select the route
            showMessage(`You selected the ${option.title}`, 'success');
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
    
    @media (max-width: 768px) {
        .route-options {
            grid-template-columns: 1fr;
        }
        
        .modal-content {
            padding: 15px;
            max-height: 80vh;
        }
    }
`;

document.head.appendChild(style);
