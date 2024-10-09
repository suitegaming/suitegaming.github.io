const filterButtons = document.querySelectorAll('.filter');
const items = document.querySelectorAll('.reel__item');
const reelContainer = document.querySelector('.reel__container');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
let offset = 0, autoSlideInterval, isManualControl = false;

// Mostrar todos los elementos inicialmente
items.forEach(item => item.style.display = 'block');

// Función para mover el carrusel
const moveCarousel = direction => {
    const itemWidth = 370, visibleWidth = reelContainer.parentElement.clientWidth, maxOffset = items.length * itemWidth - visibleWidth;
    offset = direction === 'next' ? Math.min(offset + itemWidth, maxOffset) : Math.max(offset - itemWidth, 0);
    reelContainer.style.transform = `translateX(-${offset}px)`;
};

// Botones de navegación
nextButton.addEventListener('click', () => { moveCarousel('next'); isManualControl = true; });
prevButton.addEventListener('click', () => { moveCarousel('prev'); isManualControl = true; });

// Función para filtrar elementos
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const category = button.getAttribute('data-category');
        items.forEach(item => item.style.display = (category === 'all' || item.getAttribute('data-category') === category) ? 'block' : 'none');
        offset = 0; reelContainer.style.transform = 'translateX(0px)';
    });
});

// Función para desplazamiento automático del carrusel
const startAutoSlide = () => autoSlideInterval = setInterval(() => { if (!isManualControl) moveCarousel('next'); }, 3000);
startAutoSlide();

// Detener el carrusel cuando se selecciona una tarjeta o botón
items.forEach(item => item.addEventListener('click', () => { clearInterval(autoSlideInterval); isManualControl = true; }));

// Reiniciar desplazamiento automático cuando no se interactúa manualmente
setTimeout(() => { isManualControl = false; startAutoSlide(); }, 5000);


