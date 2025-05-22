// Project data
const projects = [
    {
        name: "CCS Event & Fee Management System",
        description: "Lead Programmer for the College of Computer Studies' comprehensive event and fee management system at Saint Joseph College. Developed a full-stack solution to streamline event organization and fee collection processes.",
        technologies: ["Full Stack", "Web Development", "System Design", "Database Management"]
    },
    {
        name: "Tech Education Content",
        description: "Creating and sharing technical content including electronics repairs and tech tutorials on social media platforms. Helping others learn about technology through practical demonstrations and educational content.",
        technologies: ["Content Creation", "Tech Education", "Social Media", "Electronics"]
    }
];

// Function to create project cards
function createProjectCards() {
    const projectsGrid = document.querySelector('.projects-grid');
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        projectCard.innerHTML = `
            <div class="project-header">
                <i class="fas fa-folder"></i>
                <h3>${project.name}</h3>
            </div>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
}

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
    });
});

// Scroll progress indicator
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    scrollProgress.style.width = scrollPercent + '%';
}

// Enhanced scroll animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.project-card, .skill-category, .profile-container, .social-link');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight * 0.8 && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Typing animation for bio
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    once: true
});

// Loader
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    loader.classList.add('hidden');
});

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    
    // Update icon
    const icon = themeToggle.querySelector('i');
    icon.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    
    // Save preference
    localStorage.setItem('theme', newTheme);
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
    const icon = themeToggle.querySelector('i');
    icon.className = savedTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Scroll Progress Bar
const scrollProgress = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = `${scrolled}%`;
});

// Custom Alert Function
function showAlert(message, type = 'success') {
    const alert = document.querySelector('.custom-alert');
    const alertMessage = alert.querySelector('.alert-message');
    const closeButton = alert.querySelector('.alert-close');
    
    // Set message and type
    alertMessage.textContent = message;
    alert.className = `custom-alert ${type}`;
    
    // Show alert
    alert.classList.add('show');
    
    // Auto hide after 5 seconds
    const timeout = setTimeout(() => {
        hideAlert();
    }, 5000);
    
    // Close button handler
    closeButton.onclick = () => {
        clearTimeout(timeout);
        hideAlert();
    };
}

function hideAlert() {
    const alert = document.querySelector('.custom-alert');
    alert.classList.remove('show');
}

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    
    try {
        // Disable the submit button and show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            // Show success message
            showAlert('Thank you for your message! I will get back to you soon.', 'success');
            contactForm.reset();
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        // Show error message
        showAlert('Sorry, there was a problem sending your message. Please try again later.', 'error');
        console.error('Form submission error:', error);
    } finally {
        // Re-enable the submit button and restore original text
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
    }
});

// Initialize animations and theme toggle
document.addEventListener('DOMContentLoaded', () => {
    createProjectCards();
    
    // Add initial styles for animations
    const animatedElements = document.querySelectorAll('.project-card, .skill-category, .profile-container, .social-link');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Add scroll event listeners
    window.addEventListener('scroll', () => {
        handleScrollAnimations();
        updateScrollProgress();
    });
    
    // Trigger initial animations
    handleScrollAnimations();
    updateScrollProgress();
    
    // Start typing animation for bio
    const bioElement = document.querySelector('.bio');
    if (bioElement) {
        typeWriter(bioElement, bioElement.textContent);
    }
});

// Visit Counter
function updateVisitCount() {
    fetch('counter.php')
        .then(response => response.json())
        .then(data => {
            document.getElementById('visitCount').textContent = data.visits;
        })
        .catch(error => {
            console.error('Error fetching visit count:', error);
            document.getElementById('visitCount').textContent = 'Error';
        });
}

// Update visit count when page loads
document.addEventListener('DOMContentLoaded', updateVisitCount); 