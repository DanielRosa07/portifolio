// Elementos DOM
const intro = document.getElementById('intro');
const titleScreen = document.getElementById('title-screen');
const crawlContainer = document.getElementById('crawl-container');
const crawlText = document.getElementById('crawl-text');
const finalDownloadBtn = document.getElementById('final-download-btn');
const skipBtn = document.getElementById('skip-btn');
const replayBtn = document.getElementById('replay-btn');
const backBtn = document.querySelector('a.btn[href="../index.html"]');

// Função para ajustar o início da animação baseado no tamanho da tela
function adjustCrawlStart() {
    const screenHeight = window.innerHeight;
    const crawl = document.getElementById('crawl-text');
    
    // Ajustar o padding-top baseado na altura da tela
    if (screenHeight < 400) {
        crawl.style.paddingTop = '120vh'; // Mais alto para telas pequenas
    } else if (screenHeight < 576) {
        crawl.style.paddingTop = '130vh';
    } else if (screenHeight < 768) {
        crawl.style.paddingTop = '140vh';
    } else if (screenHeight < 992) {
        crawl.style.paddingTop = '150vh';
    } else {
        crawl.style.paddingTop = '160vh'; // MUITO alto para desktop
    }
    
    // Ajustar também a velocidade baseado na altura
    const baseTime = 80; // 80 segundos total (mais lento)
    crawl.style.animationDuration = baseTime + 's';
}

// Ajustar inicialmente e quando a janela for redimensionada
window.addEventListener('DOMContentLoaded', adjustCrawlStart);
window.addEventListener('resize', adjustCrawlStart);

// Bloqueio total de scroll
document.body.style.overflow = 'hidden';

// Prevenir qualquer tipo de scroll
document.addEventListener('wheel', preventScroll, { passive: false });
document.addEventListener('touchmove', preventScroll, { passive: false });
document.addEventListener('keydown', preventScrollKeys);

function preventScroll(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
}

function preventScrollKeys(e) {
    const keys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', ' '];
    if (keys.includes(e.key)) {
        e.preventDefault();
    }
}

// Verificar se o arquivo PDF existe
function checkPDFExists() {
    fetch('CV-DANIEL-ROSA-SILVA.pdf')
        .then(response => {
            if (!response.ok) {
                console.warn('PDF não encontrado. Verifique se o arquivo existe.');
                // Opcional: mostrar um alerta ou mudar o botão
                
                finalDownloadBtn.title = 'Arquivo PDF não encontrado. Verifique o nome do arquivo.';
            }
        })
        .catch(error => {
            console.error('Erro ao verificar PDF:', error);
        });
}

// Inicialização
window.addEventListener('DOMContentLoaded', () => {
    // Ajustar a posição inicial
    adjustCrawlStart();
    
    // Verificar se o PDF existe
    checkPDFExists();
    
    // Mostrar botão de download quando a animação terminar
    setTimeout(() => {
        finalDownloadBtn.style.display = 'flex';
    }, 92000); // 80s de animação + 12s de espera
});

// Pular introdução
skipBtn.addEventListener('click', () => {
    // Esconder introdução e título
    intro.style.display = 'none';
    titleScreen.style.display = 'none';
    
    // Mostrar conteúdo principal imediatamente
    crawlContainer.style.opacity = '1';
    crawlContainer.style.animation = 'none';
    
    // Ajustar posição inicial antes de começar
    adjustCrawlStart();
    
    // Parar qualquer animação atual e começar a rolagem
    crawlText.style.animation = 'none';
    setTimeout(() => {
        crawlText.style.animation = 'crawlAnimation 80s linear forwards';
    }, 10);
    
    // Mostrar botão de download mais cedo
    setTimeout(() => {
        finalDownloadBtn.style.display = 'flex';
    }, 80000);
});

// Repetir animação
replayBtn.addEventListener('click', () => {
    // Esconder botão de download
    finalDownloadBtn.style.display = 'none';
    
    // Mostrar introdução e título novamente
    intro.style.display = 'block';
    titleScreen.style.display = 'block';
    
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
    
    // Ajustar posição inicial
    adjustCrawlStart();
    
    // Reiniciar animações EXATAMENTE como no código original
    intro.style.animation = 'introAnimation 5s ease-out';
    titleScreen.style.animation = 'titleAnimation 5s ease-out 5s';
    crawlContainer.style.animation = 'crawlFadeIn 5s ease-out 10s forwards';
    
    setTimeout(() => {
        crawlText.style.animation = 'crawlAnimation 80s linear 12s forwards';
    }, 10);
    
    // Mostrar botão de download no final
    setTimeout(() => {
        finalDownloadBtn.style.display = 'flex';
    }, 92000);
});

// Feedback visual no botão de download do PDF
finalDownloadBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevenir comportamento padrão do link
    
    // Tentar fazer download do arquivo
    const fileUrl = 'CV-DANIEL-ROSA-SILVA.pdf'; // Nome do arquivo
    const fileName = 'CV_Daniel_Rosa_Silva.pdf'; // Nome que vai aparecer no download
    
    // Feedback visual no botão
    const originalHTML = finalDownloadBtn.innerHTML;
    finalDownloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparando...';
    finalDownloadBtn.style.backgroundColor = '#2196F3';
    finalDownloadBtn.style.animation = 'none';
    
    // Verificar se o arquivo existe primeiro
    fetch(fileUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Arquivo não encontrado');
            }
            return response.blob();
        })
        .then(blob => {
            // Criar link de download
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            
            // Adicionar ao documento, clicar e remover
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            
            // Feedback de sucesso
            finalDownloadBtn.innerHTML = '<i class="fas fa-check"></i> Download Iniciado!';
            finalDownloadBtn.style.backgroundColor = '#4CAF50';
            
            // Resetar após 3 segundos
            setTimeout(() => {
                finalDownloadBtn.innerHTML = originalHTML;
                finalDownloadBtn.style.backgroundColor = '';
                finalDownloadBtn.style.animation = 'pulse 2s infinite';
            }, 3000);
        })
        .catch(error => {
            console.error('Erro ao baixar:', error);
            
            // Feedback de erro
            finalDownloadBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Arquivo não encontrado';
            finalDownloadBtn.style.backgroundColor = '#f44336';
            
            // Tentar abrir em nova aba como fallback
            setTimeout(() => {
                window.open(fileUrl, '_blank');
                finalDownloadBtn.innerHTML = '<i class="fas fa-external-link-alt"></i> Abrir em nova aba';
            }, 1000);
            
            // Resetar após 5 segundos
            setTimeout(() => {
                finalDownloadBtn.innerHTML = originalHTML;
                finalDownloadBtn.style.backgroundColor = '';
                finalDownloadBtn.style.animation = 'pulse 2s infinite';
            }, 5000);
        });
});