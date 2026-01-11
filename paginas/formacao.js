// Elementos DOM
const intro = document.getElementById('intro');
const titleScreen = document.getElementById('title-screen');
const crawlContainer = document.getElementById('crawl-container');
const crawlText = document.getElementById('crawl-text');
const finalDownloadBtn = document.getElementById('final-download-btn');
const skipBtn = document.getElementById('skip-btn');
const replayBtn = document.getElementById('replay-btn');

// Função para iniciar sequência
function startSequence() {
    // Resetar e mostrar elementos
    intro.style.display = 'block';
    titleScreen.style.display = 'block';
    crawlContainer.style.opacity = '0';
    finalDownloadBtn.style.display = 'none';
    
    // Resetar animações
    intro.style.animation = 'none';
    titleScreen.style.animation = 'none';
    crawlContainer.style.animation = 'none';
    crawlText.style.animation = 'none';
    
    // Forçar reflow
    void intro.offsetWidth;
    void titleScreen.offsetWidth;
    void crawlContainer.offsetWidth;
    void crawlText.offsetWidth;
    
    // Iniciar animações sequenciais
    intro.style.animation = 'introAnimation 5s ease-out';
    titleScreen.style.animation = 'titleAnimation 5s ease-out 5s';
    crawlContainer.style.animation = 'crawlFadeIn 5s ease-out 10s forwards';
    
    // Iniciar animação do texto
    setTimeout(() => {
        crawlText.style.animation = 'crawlAnimation 60s linear forwards';
        
        // Mostrar botão de download no final
        setTimeout(() => {
            finalDownloadBtn.style.display = 'flex';
        }, 64000); // 80s + 12s de delay
    }, 12000);
}

// Pular introdução
skipBtn.addEventListener('click', () => {
    // Parar animações
    intro.style.display = 'none';
    titleScreen.style.display = 'none';

    crawlContainer.style.opacity = '1';
    crawlContainer.style.animation = 'none';

    crawlText.style.animation = 'none';
    crawlText.style.transform = 'translateY(-100%)'; // força o fim do crawl

    // Mostrar botão FINAL imediatamente
    finalDownloadBtn.style.display = 'flex';
});

// Reiniciar
replayBtn.addEventListener('click', startSequence);

// Botão de download
finalDownloadBtn.addEventListener('click', (e) => {
    const originalHTML = finalDownloadBtn.innerHTML;
    finalDownloadBtn.innerHTML = '<i class="fas fa-check"></i> Baixando...';
    finalDownloadBtn.style.backgroundColor = '#4CAF50';
    finalDownloadBtn.style.color = '#000';
    
    setTimeout(() => {
        finalDownloadBtn.innerHTML = originalHTML;
        finalDownloadBtn.style.backgroundColor = '';
        finalDownloadBtn.style.color = '';
    }, 2000);
});

// Prevenir scroll
document.body.style.overflow = 'hidden';
document.addEventListener('wheel', e => e.preventDefault(), { passive: false });
document.addEventListener('touchmove', e => {
    if (e.touches.length > 1) e.preventDefault();
}, { passive: false });

// Iniciar quando a página carregar
window.addEventListener('DOMContentLoaded', startSequence);