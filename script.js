document.addEventListener('DOMContentLoaded', function() {

    // --- Menú Móvil ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mainNav = document.getElementById('main-nav');

    if (mobileMenuButton && mainNav) {
        mobileMenuButton.addEventListener('click', () => {
            mainNav.classList.toggle('active'); // Añade o quita la clase 'active' para mostrar/ocultar
        });

        // Opcional: Cerrar menú al hacer clic en un enlace
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Solo cierra si el menú está activo (visible en móvil)
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                }
            });
        });
    } else {
        console.warn("Elementos del menú móvil no encontrados.");
    }

    // --- Opcional: Resaltar enlace de navegación activo según la sección visible ---
    const sections = document.querySelectorAll('main section[id]');
    const navLiAnchors = document.querySelectorAll('#main-nav ul li a'); // Selecciona los <a> dentro de <li>

    if (sections.length > 0 && navLiAnchors.length > 0) {
        window.addEventListener('scroll', () => {
            let currentSectionId = '';
            const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            const activationOffset = 100; // Ajusta este valor si es necesario

            sections.forEach( section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollPosition >= (sectionTop - activationOffset) && scrollPosition < (sectionTop + sectionHeight - activationOffset)) {
                    currentSectionId = section.getAttribute('id');
                }
            });

            if (scrollPosition < sections[0].offsetTop - activationOffset) {
                currentSectionId = sections[0].getAttribute('id');
            }
            if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 50) {
                currentSectionId = sections[sections.length - 1].getAttribute('id');
            }

            navLiAnchors.forEach( a => {
                a.classList.remove('active');
                if (a.getAttribute('href') === '#' + currentSectionId) {
                    a.classList.add('active');
                }
            });

            if (!currentSectionId && scrollPosition < 200) {
                const homeLink = document.querySelector('#main-nav a[href="#inicio"]');
                if (homeLink) homeLink.classList.add('active');
            }
        });
        window.dispatchEvent(new Event('scroll')); // Llama una vez al cargar
    } else {
         console.warn("Secciones o enlaces de navegación no encontrados para la funcionalidad de resaltado.");
    }

    // --- El código de la funcionalidad del Modal de Imagen ha sido eliminado ---

}); // Fin del DOMContentLoaded