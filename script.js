// Seleciona todos os elementos h1
const h1Elements = document.querySelectorAll('h1');

h1Elements.forEach(h1 => {
    h1.addEventListener('click', (e) => {
        e.preventDefault(); // Impede a navegação imediata

        // Oculta os outros h1
        h1Elements.forEach(otherH1 => {
            if (otherH1 !== h1) {
                otherH1.style.opacity = '0'; // Transição suave de saída
                otherH1.style.transition = 'opacity 0.5s';
            }
        });

        h1.style.webkitTextStrokeWidth = '1px'; /* Aumenta a espessura */
        h1.style.webkitTextStrokeColor = 'rgb(255, 255, 255)'; /* Altera a cor do contorno */
        h1.style.color = 'rgb(24, 24, 24, 0)';
        h1.style.transition = 'transform 0.5s, color 0.5s'; /* Transições para transform e cor */
        h1.style.transform = 'scale(1.2)'; // Efeito de foco
        h1.style.marginRight = "300px"; // Modifica a margem direita
        h1.style.transition += ', margin-right 0.8s ease-out'; /* Transição separada para margin-right */

        // Adiciona o efeito de transição estilo livro
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
        
        // Se o h1 clicado for "FORMAÇÃO", a tela fica preta
        if (h1.textContent.includes('/FORMAÇÃO')) {
            pageTransition.style.backgroundColor = '#000';
        } else {
            pageTransition.style.backgroundColor = '#3e3cb9';
        }
        
        document.body.appendChild(pageTransition);

        // Aguarda a animação de foco antes de iniciar a transição
        setTimeout(() => {
            pageTransition.style.transform = 'scaleX(1)';
        }, 950);

        // Navega para a nova página após a animação
        setTimeout(() => {
            window.location.href = h1.parentElement.href;
        }, 1960);
    });
});
