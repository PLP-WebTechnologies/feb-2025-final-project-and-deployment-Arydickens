// Loading screen
window.addEventListener('load', () => {
    const loader = document.querySelector('.loading');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// Header scroll effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Dark mode toggle
const darkModeToggle = document.createElement('button');
darkModeToggle.innerHTML = '🌙';
darkModeToggle.className = 'dark-mode-toggle';
darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
darkModeToggle.style.display = 'flex'; // Ensure it's visible
document.body.appendChild(darkModeToggle);

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '☀️';
}

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkModeToggle.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

// Typing animation for hero section
function typeWriter(element, text, speed = 100) {
    if (!element || !text) return;
    
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

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    // Check for hero section elements
    const heroTitle = document.querySelector('.hero h1');
    const heroSubtitle = document.querySelector('.hero p');
    
    if (heroTitle && heroSubtitle) {
        typeWriter(heroTitle, heroTitle.textContent);
        setTimeout(() => {
            typeWriter(heroSubtitle, heroSubtitle.textContent, 50);
        }, 1000);
    }
    
    // Check for page titles
    const pageTitle = document.querySelector('h1:not(.hero h1)');
    if (pageTitle) {
        typeWriter(pageTitle, pageTitle.textContent, 50);
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.project-item, .about-me, section, .blog-post').forEach((el) => {
    el.classList.add('fade-in-element');
    observer.observe(el);
});

// Image lazy loading
document.querySelectorAll('img').forEach(img => {
    img.loading = 'lazy';
});

// Form validation
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        let isValid = true;
        
        for (let [key, value] of formData.entries()) {
            if (!value.trim()) {
                isValid = false;
                const input = contactForm.querySelector(`[name="${key}"]`);
                input.classList.add('error');
            }
        }
        
        if (isValid) {
            // Here you would typically send the form data to a server
            alert('Form submitted successfully!');
            contactForm.reset();
        } else {
            alert('Please fill in all required fields');
        }
    });
}

// Remove error class on input
document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', () => {
        input.classList.remove('error');
    });
});

// Scroll to top button
const scrollTopButton = document.createElement('button');
scrollTopButton.innerHTML = '↑';
scrollTopButton.className = 'scroll-top';
document.body.appendChild(scrollTopButton);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopButton.classList.add('visible');
    } else {
        scrollTopButton.classList.remove('visible');
    }
});

scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Project image hover effect
document.querySelectorAll('.project-item').forEach(project => {
    project.addEventListener('mouseenter', () => {
        project.querySelector('img').style.transform = 'scale(1.1)';
    });
    
    project.addEventListener('mouseleave', () => {
        project.querySelector('img').style.transform = 'scale(1)';
    });
});

// Add loading screen to HTML
const loadingScreen = document.createElement('div');
loadingScreen.className = 'loading';
document.body.appendChild(loadingScreen);

// Hamburger Menu
const hamburger = document.createElement('div');
hamburger.className = 'hamburger';
hamburger.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
`;
document.querySelector('header').appendChild(hamburger);

const nav = document.querySelector('nav');
const body = document.body;

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
    body.classList.toggle('menu-open');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !nav.contains(e.target) && nav.classList.contains('active')) {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
        body.classList.remove('menu-open');
    }
});

// Close menu when clicking a link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
        body.classList.remove('menu-open');
    });
});

// Close menu on window resize if screen becomes larger
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && nav.classList.contains('active')) {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
        body.classList.remove('menu-open');
    }
}); 