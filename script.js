// Menu Mobile
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('active');
    
    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger Animation
    burger.classList.toggle('toggle');
});

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        burger.classList.remove('toggle');
        navLinks.forEach(link => {
            link.style.animation = '';
        });
    });
});

// Scroll Suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Efeito de scroll nas seções
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    // Adiciona sombra ao header quando scrollar
    if (scrollPosition > 50) {
        document.querySelector('header').style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.2)';
    } else {
        document.querySelector('header').style.boxShadow = 'none';
    }
    
    // Animação nas seções
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const id = section.getAttribute('id');
            document.querySelector(`a[href="#${id}"]`).classList.add('active-link');
        } else {
            const id = section.getAttribute('id');
            document.querySelector(`a[href="#${id}"]`).classList.remove('active-link');
        }
    });
});

// Adiciona classe active ao link do menu correspondente à seção visível
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const menuLink = document.querySelector(`a[href="#${id}"]`);
        
        if (entry.isIntersecting) {
            menuLink.classList.add('active-link');
        } else {
            menuLink.classList.remove('active-link');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});