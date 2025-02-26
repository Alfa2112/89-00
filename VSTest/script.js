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

// Navbar scroll effect with throttling
let ticking = false;
window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
            ticking = false;
        });
        ticking = true;
    }
});

// Initialize Bootstrap tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = tooltipTriggerList.map(tooltipTriggerEl => 
    new bootstrap.Tooltip(tooltipTriggerEl)
);

// Portfolio filter implementation
const filterButtons = document.querySelectorAll('.portfolio-filter');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filterValue = button.getAttribute('data-filter');
        
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        portfolioItems.forEach(item => {
            const display = filterValue === 'all' || item.getAttribute('data-category') === filterValue ? 'block' : 'none';
            item.style.display = display;
        });
    });
});

// Animation for skill bars
const skillBars = document.querySelectorAll('.progress-bar');

function animateSkillBars() {
    skillBars.forEach(bar => {
        const targetWidth = bar.getAttribute('aria-valuenow') + '%';
        bar.style.width = '0';
        requestAnimationFrame(() => {
            bar.style.transition = 'width 1s ease-in-out';
            bar.style.width = targetWidth;
        });
    });
}

// Animate skills when in view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            observer.disconnect();
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px'
});

const skillsSection = document.querySelector('#skills');
if (skillsSection) {
    observer.observe(skillsSection);
}

// Contact form handling
document.getElementById('contactForm')?.addEventListener('submit', async function(event) {
    event.preventDefault();

    const submitButton = this.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    
    try {
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';

        const emailValue = document.getElementById('email').value;
        const subjectValue = document.getElementById('subject').value;
        const messageValue = document.getElementById('message').value;

        const templateParams = {
            to_email: 'ninsicirit@gmail.com',
            from_email: emailValue,
            subject: subjectValue,
            message: messageValue
        };

        await emailjs.send('service_nlbefzp', 'template_fb4r7rk', templateParams);
        
        alert('Thank you! Your message has been sent successfully.');
        this.reset();
        
    } catch (error) {
        console.error('EmailJS error:', error);
        alert('Oops! Something went wrong. Please try again later.');
        
    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
    }
});