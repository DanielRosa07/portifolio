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













document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".section1, .section2, .section3");
    const svg = document.querySelector(".lines");

    function connectElements(el1, el2) {
        const pos1 = el1.getBoundingClientRect();
        const pos2 = el2.getBoundingClientRect();
    
        const x1 = pos1.left + pos1.width / 2 + window.scrollX;
        const y1 = pos1.top + pos1.height / 2 + window.scrollY;
        
        const x2 = pos2.left + pos2.width / 2 + window.scrollX;
        const y2 = pos2.top + pos2.height / 2 + window.scrollY;

        // Pequenas variações para deixar a linha irregular
        const curveX = (x1 + x2) / 2 + (Math.random() * 40 - 20); // Ajusta um pouco o ponto médio
        const curveY = (y1 + y2) / 2 + (Math.random() * 40 - 20); // Desloca levemente a curvatura

        // Criar a linha de fundo (mais grossa e com irregularidade)
        const backgroundPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        backgroundPath.setAttribute("d", `M ${x1} ${y1} Q ${curveX} ${curveY}, ${x2} ${y2}`);
        backgroundPath.classList.add("line-background");
        svg.appendChild(backgroundPath);
    
        // Criar a linha de frente (mais fina e sobreposta)
        const foregroundPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        foregroundPath.setAttribute("d", `M ${x1} ${y1} Q ${curveX} ${curveY}, ${x2} ${y2}`);
        foregroundPath.classList.add("line-foreground");
        svg.appendChild(foregroundPath);
    }

    function connectSection(section) {
        const layers = section.querySelectorAll(".camada, .camada2");
        if (layers.length < 2) return;

        const firstLayer = section.querySelector(".box"); // Somente o primeiro (PHP)
        const secondLayer = layers[0].querySelectorAll(".box");
        const thirdLayer = layers[1].querySelectorAll(".box");

        if (!firstLayer || secondLayer.length === 0) return;

        // ✅ Primeira camada conecta-se com TODOS os elementos da segunda camada
        secondLayer.forEach(box => {
            connectElements(firstLayer, box);
        });

        // ✅ Segunda camada conecta-se SOMENTE com o correspondente da terceira camada
        secondLayer.forEach((box, index) => {
            if (thirdLayer[index]) {
                connectElements(box, thirdLayer[index]);
            }
        });
    }

    svg.innerHTML = "";
    sections.forEach(section => connectSection(section));
});

document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".box, .section1, .section2, .section3");

    elements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.remove("hidden");
        }, 500 * index);
    });

    setTimeout(() => {
        document.querySelectorAll(".line-background, .line-foreground").forEach(line => {
            line.style.animation = "drawLine 1.5s ease-out forwards";
        });
    }, 2000);
});






document.addEventListener("DOMContentLoaded", function () {
    const boxes = document.querySelectorAll(".box");
    const infoBar = document.getElementById("info-bar");
    const infoTitle = document.getElementById("info-title");
    const infoText = document.getElementById("info-text");
    const closeBar = document.querySelector(".close-bar");

    // 🔹 Descrições Personalizadas
    const descriptions = {
        "PHP": "Adquiri minhas habilidades em PHP no Senai Jacob Lifer. Tenho proficiência nessa linguagem para desenvolvimento web e back-end.",
        "CSS": "Adquiri minhas habilidades em CSS no Senai Jacob Lifer. Tenho proficiência na estilização de interfaces responsivas e modernas.",
        "JS": "Adquiri minhas habilidades em JavaScript no Senai Jacob Lifer. Tenho proficiência no desenvolvimento de interatividade e lógica para aplicações web.",
        "Bootstrap": "Adquiri minhas habilidades em Bootstrap no Senai Jacob Lifer. Tenho proficiência no uso desse framework para criar layouts responsivos rapidamente.",
        "React": "Adquiri minhas habilidades em React no Senai Jacob Lifer. Tenho proficiência no desenvolvimento de aplicações front-end dinâmicas e escaláveis.",
        "Java": "Atualmente estou adquirindo habilidades em Java através de um curso no Senai Jacob Lifer. Aprendendo sobre desenvolvimento back-end e aplicações robustas.",
        "Estágio": "O estágio está desativado.",
        "Status": "O status está desativado."
    };

    // 🔹 Apenas o ESTÁGIO e STATUS são desativados
    const disabledBoxes = ["Estágio", "Status"];

    // 🔹 Adiciona evento de clique em cada caixa
    boxes.forEach(box => {
        const title = box.textContent.trim();

        if (disabledBoxes.includes(title)) {
            box.style.opacity = "0.5"; // Deixa desativado visualmente
            box.style.pointerEvents = "none"; // Remove a interatividade
        } else {
            box.addEventListener("click", function (event) {
                event.stopPropagation(); // Evita que o clique feche imediatamente a barra
                
                // Remove destaque de todas as caixas
                boxes.forEach(b => b.classList.remove("active"));

                // Destaca a caixa clicada
                this.classList.add("active");

                // Atualiza a barra de informações
                infoTitle.textContent = title;
                infoText.textContent = descriptions[title] || `Adquiri minhas habilidades em ${title} no Senai Jacob Lifer.`;

                // Exibe a barra inferior
                infoBar.style.bottom = "0px";
            });
        }
    });

    // 🔹 Fechar a barra ao clicar fora das caixas
    document.addEventListener("click", function () {
        infoBar.style.bottom = "-120px";
        boxes.forEach(b => b.classList.remove("active"));
    });

    // 🔹 Fechar ao clicar no botão de fechar
    closeBar.addEventListener("click", function (event) {
        event.stopPropagation(); // Evita que o clique fora das caixas aconteça também
        infoBar.style.bottom = "-120px";
        boxes.forEach(b => b.classList.remove("active"));
    });
});
