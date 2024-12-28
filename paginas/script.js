// Seleciona todos os elementos com a classe 'link' dentro da navbar
const linkElements = document.querySelectorAll('.navbar .link');

linkElements.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Impede a navegação imediata

        // Oculta os outros links
        linkElements.forEach(otherLink => {
            if (otherLink !== link) {
                otherLink.style.opacity = '0'; // Transição suave de saída
                otherLink.style.transition = 'opacity 0.5s';
            }
        });

        link.style.webkitTextStrokeWidth = '1px'; /* Aumenta a espessura */
        link.style.webkitTextStrokeColor = 'rgb(255, 255, 255)'; /* Altera a cor do contorno */
        link.style.color = 'rgb(24, 24, 24, 0)';
        link.style.transition = 'transform 0.5s, color 0.5s'; /* Transições para transform e cor */
        link.style.transform = 'scale(1.2)'; // Efeito de foco
        link.style.marginRight = "300px"; // Modifica a margem direita
        link.style.transition += ', margin-right 0.8s ease-out'; /* Transição separada para margin-right */

        // Adiciona o efeito de transição estilo livro
        const pageTransition = document.createElement('div');
        pageTransition.style.position = 'fixed';
        pageTransition.style.top = '0';
        pageTransition.style.left = '0';
        pageTransition.style.width = '100%';
        pageTransition.style.height = '100%';
        pageTransition.style.backgroundColor = '#3e3cb9';
        pageTransition.style.zIndex = '1000';
        pageTransition.style.transformOrigin = 'left center';
        pageTransition.style.transform = 'scaleX(0)';
        pageTransition.style.transition = 'transform 1s ease-in-out';
        document.body.appendChild(pageTransition);

        // Aguarda a animação de foco antes de iniciar a transição
        setTimeout(() => {
            pageTransition.style.transform = 'scaleX(1)';
        }, 950);

        // Navega para a nova página após a animação
        setTimeout(() => {
            window.location.href = link.href;
        }, 1960);
    });
});
