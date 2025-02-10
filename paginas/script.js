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




// habilidades script

document.addEventListener("DOMContentLoaded", function () {
    const boxes = document.querySelectorAll(".box");
    const container = document.querySelector(".section1");

    boxes.forEach((box, index) => {
        if (index > 0) { // Começa a partir da segunda caixa para conectar com a anterior
            const line = document.createElement("div");
            line.classList.add("line");

            // Obtém as posições das caixas
            const prevBox = boxes[index - 1];
            const prevRect = prevBox.getBoundingClientRect();
            const currRect = box.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();

            // Calcula posição da linha
            const startX = prevRect.left + prevRect.width / 2 - containerRect.left;
            const startY = prevRect.top + prevRect.height / 2 - containerRect.top;
            const endX = currRect.left + currRect.width / 2 - containerRect.left;
            const endY = currRect.top + currRect.height / 2 - containerRect.top;

            // Calcula altura e ângulo da linha
            const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
            const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);

            // Estiliza a linha
            line.style.height = distance + "px";
            line.style.transform = `rotate(${angle}deg)`;
            line.style.left = startX + "px";
            line.style.top = startY + "px";

            // Adiciona a linha ao container
            container.appendChild(line);
        }
    });
});

