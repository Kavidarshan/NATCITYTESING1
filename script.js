// DOM Elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const messageForm = document.getElementById('messageForm');
const branchMessageForm = document.getElementById('branchMessageForm');
const expediaLink = document.getElementById('expediaLink');
const bookingLink = document.getElementById('bookingLink');
const bookingLkLink = document.getElementById('bookingLkLink');
const currentYearSpan = document.getElementById('currentYear');

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Form submission (home page)
if (messageForm) {
    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const branchSelect = document.getElementById('branchSelect');
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        const branch = branchSelect ? branchSelect.value : 'General';
        
        // In a real application, you would send this data to a server
        // For now, we'll just show a confirmation message
        let branchName = 'General';
        if (branch === 'nuwara-eliya') branchName = 'Nuwara Eliya';
        if (branch === 'ella') branchName = 'Ella';
        
        alert(`Thank you ${name}! Your message has been sent to ${branchName} branch. We will get back to you at ${email} soon.`);
        
        // Reset form
        messageForm.reset();
    });
}

// Form submission (branch pages)
if (branchMessageForm) {
    branchMessageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('branchName').value;
        const email = document.getElementById('branchEmail').value;
        const subject = document.getElementById('branchSubject').value;
        const message = document.getElementById('branchMessage').value;
        
        // Get current page to determine branch
        const currentPage = window.location.pathname;
        let branchName = 'Ella';
        if (currentPage.includes('nuwara-eliya')) branchName = 'Nuwara Eliya';
        
        alert(`Thank you ${name}! Your message has been sent to ${branchName} branch. We will get back to you at ${email} soon.`);
        
        // Reset form
        branchMessageForm.reset();
    });
}

// Set current year in footer
const currentYear = new Date().getFullYear();
if (currentYearSpan) {
    currentYearSpan.textContent = currentYear;
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (href === '#') return;
        
        // If it's an external link, don't prevent default
        if (href.startsWith('http')) return;
        
        e.preventDefault();
        
        const targetId = href;
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Calculate header height for offset
            const headerHeight = document.querySelector('header').offsetHeight;
            
            window.scrollTo({
                top: targetElement.offsetTop - headerHeight - 20,
                behavior: 'smooth'
            });
        }
    });
});

// Track external link clicks
if (expediaLink) {
    expediaLink.addEventListener('click', () => {
        console.log('Expedia link clicked');
        // In a real app, you might send analytics data here
    });
}

if (bookingLink) {
    bookingLink.addEventListener('click', () => {
        console.log('Booking.com link clicked');
        // In a real app, you might send analytics data here
    });
}

if (bookingLkLink) {
    bookingLkLink.addEventListener('click', () => {
        console.log('Booking.lk link clicked');
        // In a real app, you might send analytics data here
    });
}

// Room card hover effect enhancement
document.querySelectorAll('.room-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    console.log('NAT City Hotel website loaded successfully');
    
    // Highlight current page in navigation
    const currentPage = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(item => {
        const itemHref = item.getAttribute('href');
        
        if (currentPage.includes(itemHref) && itemHref !== '#' && itemHref !== 'index.html') {
            item.classList.add('active');
        }
        
        // Special case for home page
        if (currentPage.endsWith('index.html') || currentPage.endsWith('/')) {
            if (itemHref === 'index.html' || itemHref === '#home') {
                item.classList.add('active');
            }
        }
    });
    
    // Add animation to elements when they come into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.room-card, .dish, .feature, .branch-card').forEach(el => {
        observer.observe(el);
    });
});