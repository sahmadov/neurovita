// Load the uploaded logo
async function loadLogo() {
    const logoImg = document.getElementById('logoImg');

    // Try to read the uploaded logo file
    try {
        const logoData = await window.fs.readFile('assets/images/logo.jpeg');
        const blob = new Blob([logoData], { type: 'image/jpeg' });
        const logoUrl = URL.createObjectURL(blob);
        logoImg.src = logoUrl;
    } catch (error) {
        // Fallback to text if logo file is not found
        console.log('Logo file not found, using text fallback');
        logoImg.parentElement.innerHTML = '<span style="font-size: 1.5rem; font-weight: bold;">NeuroVita-Berlin</span>';
    }
}

// Load logo when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadLogo();
});

// Mobile menu toggle
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.getElementById('navLinks');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        // Close mobile menu if open
        navLinks.classList.remove('active');
    });
});

// Form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const reason = formData.get('reason');

    // Simple validation
    if (!name || !email) {
        alert('Bitte füllen Sie alle Pflichtfelder aus.');
        return;
    }

    // Simulate form submission
    alert(`Vielen Dank, ${name}! Ihre Terminanfrage wurde erhalten. Wir werden Sie unter ${email} innerhalb von 24 Stunden kontaktieren, um Ihren Termin zu bestätigen.`);

    // Reset form
    this.reset();
});

// Add scroll effect to header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(44, 62, 80, 0.95)';
    } else {
        header.style.backgroundColor = '';
    }
});

// Animate service cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to service cards
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});