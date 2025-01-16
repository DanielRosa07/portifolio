// Seleciona o link específico
const link = document.querySelector('a.link');

link.addEventListener('click', (e) => {
    e.preventDefault(); // Impede a navegação imediata

    // Seleciona todos os elementos h1
    const h1Elements = document.querySelectorAll('h1');

    h1Elements.forEach(h1 => {
        // Oculta os outros h1
       
        // Adiciona o efeito de transição estilo livro
        const pageTransition = document.createElement('div');
        pageTransition.style.position = 'fixed';
        pageTransition.style.top = '0';
        pageTransition.style.left = '0';
        pageTransition.style.width = '100%';
        pageTransition.style.height = '100%';
        pageTransition.style.backgroundColor = '#5451f8';
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
