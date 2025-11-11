// ----------------------
// Navbar scroll effect
// ----------------------
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    // Navbar scrolled class
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Aktif link güncelle
    updateActiveNavLink();
});

// ----------------------
// Smooth scroll
// ----------------------
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const navbarHeight = navbar.offsetHeight;
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

    window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
    });
}

// Smooth scroll event
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('href').substring(1);
        scrollToSection(sectionId);
    });
});

// ----------------------
// Active link on scroll (manuel)
// ----------------------
function updateActiveNavLink() {
    const scrollPos = window.scrollY + navbar.offsetHeight + 20; // biraz offset ekleyelim
    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;

        const navLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
        if (!navLink) return;

        if (scrollPos >= top && scrollPos < bottom) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLink.classList.add('active');
        }
    });
}

// ----------------------
// Fade-in animations
// ----------------------
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.service-card, .reference-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 100}ms`;
        fadeObserver.observe(card);
    });
});

// ----------------------
// Contact form handling
// ----------------------
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            projectType: document.getElementById('projectType').value,
            message: document.getElementById('message').value
        };
        console.log('Form submitted:', formData);
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// ----------------------
// Mobile menu toggle
// ----------------------
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        const navLinksContainer = document.querySelector('.nav-links');
        if (navLinksContainer) {
            navLinksContainer.style.display = navLinksContainer.style.display === 'flex' ? 'none' : 'flex';
        }
    });
}
