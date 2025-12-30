// Seleciona todos os elementos h1
const h1Elements = document.querySelectorAll('h1');

// Detecta se é mobile
const isMobile = window.matchMedia("(max-width: 768px)").matches;

h1Elements.forEach(h1 => {
    h1.addEventListener('click', (e) => {
        e.preventDefault(); // Impede a navegação imediata

        // Oculta os outros h1
        h1Elements.forEach(otherH1 => {
            if (otherH1 !== h1) {
                otherH1.style.opacity = '0';
                otherH1.style.transition = 'opacity 0.5s';
            }
        });

        // Estilo base (desktop + mobile)
        h1.style.webkitTextStrokeWidth = '1px';
        h1.style.webkitTextStrokeColor = 'rgb(255, 255, 255)';
        h1.style.color = 'rgba(24, 24, 24, 0)';
        h1.style.transition = 'color 0.5s, transform 0.5s';

        // 🔥 EFEITOS APENAS NO DESKTOP
        if (!isMobile) {
            h1.style.transform = 'scale(1.15)';
            h1.style.marginRight = '160px'; // puxão reduzido
            h1.style.transition += ', margin-right 0.8s ease-out';
        } else {
            // 📱 Mobile limpo e centralizado
            h1.style.transform = 'none';
            h1.style.marginRight = '0';
        }

        // Cria camada de transição de página
        const pageTransition = document.createElement('div');
        pageTransition.style.position = 'fixed';
        pageTransition.style.top = '0';
        pageTransition.style.left = '0';
        pageTransition.style.width = '100%';
        pageTransition.style.height = '100%';
        pageTransition.style.zIndex = '1000';
        pageTransition.style.transformOrigin = 'left center';
        pageTransition.style.transform = 'scaleX(0)';
        pageTransition.style.transition = 'transform 1s ease-in-out';

        // Cor especial para FORMAÇÃO
        if (h1.textContent.includes('/FORMAÇÃO')) {
            pageTransition.style.backgroundColor = '#000';
        } else {
            pageTransition.style.backgroundColor = '#3e3cb9';
        }

        document.body.appendChild(pageTransition);

        // Inicia a animação de transição
        setTimeout(() => {
            pageTransition.style.transform = 'scaleX(1)';
        }, 600);

        // Navega após a animação
        setTimeout(() => {
            window.location.href = h1.parentElement.href;
        }, 1600);
    });
});
