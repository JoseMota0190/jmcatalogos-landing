// Header scroll effect - disabled
// const brand = document.getElementById('brand');
// window.addEventListener('scroll', () => {
//     if (window.scrollY > 50) {
//         brand.classList.add('scrolled');
//     } else {
//         brand.classList.remove('scrolled');
//     }
// }, { passive: true });

// Intersection Observer for sections
const sections = document.querySelectorAll('.section');
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Smooth scroll for internal links (if any added later)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add click effect to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// FAQ Toggle - permitir múltiples abiertos
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const faqItem = this.parentElement;
        faqItem.classList.toggle('active');
    });
});

// Checklist interactivo
const checklistItems = document.querySelectorAll('.checklist-item');
const checklistResult = document.getElementById('checklist-result');

checklistItems.forEach(item => {
    item.addEventListener('click', function() {
        this.classList.toggle('checked');
        updateChecklistResult();
    });
});

function updateChecklistResult() {
    const positiveChecked = document.querySelectorAll('.checklist-item[data-positive="true"].checked').length;
    const negativeChecked = document.querySelectorAll('.checklist-item[data-positive="false"].checked').length;
    
    if (positiveChecked >= 2 && negativeChecked === 0) {
        checklistResult.style.display = 'block';
        checklistResult.classList.add('show');
        checklistResult.classList.remove('no-match');
        checklistResult.innerHTML = `
            <h4>¡Esto es para ti!</h4>
            <p>Un catálogo simple puede transformar tu negocio. Escribime y lo conversamos.</p>
        `;
    } else if (negativeChecked > 0) {
        checklistResult.style.display = 'block';
        checklistResult.classList.add('show', 'no-match');
        checklistResult.innerHTML = `
            <h4>Podría no ser lo que buscas</h4>
            <p>Si ya tienes tienda online o necesitas algo más complejo, quizás este no es el servicio indicado. Pero si tienes dudas, escríbime igual.</p>
        `;
    } else {
        checklistResult.style.display = 'none';
        checklistResult.classList.remove('show');
    }
}

// Carrusel de imágenes de problema
const carouselTrack = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const indicators = document.querySelectorAll('.indicator');

let currentSlide = 0;

function showSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    
    currentSlide = index;
    
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

if (prevBtn) prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
if (nextBtn) nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));

indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => showSlide(index));
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') showSlide(currentSlide - 1);
    if (e.key === 'ArrowRight') showSlide(currentSlide + 1);
});
