// Elementos DOM
const intro = document.getElementById('intro');
const titleScreen = document.getElementById('title-screen');
const crawlContainer = document.getElementById('crawl-container');
const crawlText = document.getElementById('crawl-text');
const finalDownloadBtn = document.getElementById('final-download-btn');
const skipBtn = document.getElementById('skip-btn');
const replayBtn = document.getElementById('replay-btn');
const speedBtn = document.getElementById('speed-btn');

// Controle MANUAL da animação (como um vídeo)
let isAnimating = false;
let animationStartTime = 0;
let elapsedTimeBeforePause = 0;
let currentSpeed = 1; // 1x, 2x, 4x
let animationFrameId = null;
let totalAnimationTime = 80; // 80 segundos total
let clickCount = 0;

// Altura total que o texto vai percorrer (calculada dinamicamente)
let totalScrollHeight = 0;

// Configurações da animação
const START_POSITION = 100; // Começa 100vh abaixo
const END_POSITION = -200; // Termina 200vh acima
const BASE_DURATION = 80; // 80 segundos em 1x

// Inicializar sistema
function initAnimationSystem() {
    // Calcular altura total baseada no conteúdo
    const contentHeight = crawlText.scrollHeight;
    const viewportHeight = window.innerHeight;
    totalScrollHeight = contentHeight + viewportHeight * 2;
    
    // Resetar posição inicial
    crawlText.style.transform = `translateY(${START_POSITION}vh) rotateX(35deg)`;
    crawlText.style.animation = 'none'; // Remover animação CSS
}

// Função principal de animação (como um game loop)
function animateText(currentTime) {
    if (!isAnimating) return;
    
    // Calcular tempo decorrido considerando velocidade
    const elapsed = (currentTime - animationStartTime) / 1000; // em segundos
    const effectiveElapsed = elapsed * currentSpeed + elapsedTimeBeforePause;
    
    // Calcular progresso (0 a 1)
    const progress = Math.min(effectiveElapsed / totalAnimationTime, 1);
    
    // Calcular posição Y baseada no progresso
    const positionY = START_POSITION - (progress * (START_POSITION - END_POSITION));
    
    // Aplicar transformação
    crawlText.style.transform = `translateY(${positionY}vh) rotateX(35deg)`;
    
    // Verificar se terminou
    if (progress >= 1) {
        isAnimating = false;
        cancelAnimationFrame(animationFrameId);
        showDownloadButton();
        return;
    }
    
    // Continuar animação
    animationFrameId = requestAnimationFrame(animateText);
}

// Iniciar animação
function startAnimation() {
    if (isAnimating) return;
    
    isAnimating = true;
    animationStartTime = performance.now() - (elapsedTimeBeforePause * 1000 / currentSpeed);
    animationFrameId = requestAnimationFrame(animateText);
}

// Pausar animação (para quando mudar velocidade)
function pauseAnimation() {
    if (!isAnimating) return;
    
    // Calcular tempo decorrido até agora
    const currentTime = performance.now();
    const elapsed = (currentTime - animationStartTime) / 1000;
    elapsedTimeBeforePause += elapsed * currentSpeed;
    
    isAnimating = false;
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
}

// Mudar velocidade MANTENDO A POSIÇÃO ATUAL
function changeSpeed() {
    if (!isAnimating && elapsedTimeBeforePause === 0) return;
    
    // Pausar para calcular nova posição
    const wasPlaying = isAnimating;
    if (wasPlaying) pauseAnimation();
    
    // Ciclo de velocidades: 1x → 2x → 4x → 1x
    clickCount++;
    if (clickCount === 1) {
        currentSpeed = 2;
        speedBtn.innerHTML = '<i class="fas fa-forward"></i> 2x';
        speedBtn.classList.add('speed-2x');
    } else if (clickCount === 2) {
        currentSpeed = 4;
        speedBtn.innerHTML = '<i class="fas fa-tachometer-alt"></i> 4x';
        speedBtn.classList.remove('speed-2x');
        speedBtn.classList.add('speed-4x');
    } else {
        clickCount = 0;
        currentSpeed = 1;
        speedBtn.innerHTML = '<i class="fas fa-forward"></i> 1x';
        speedBtn.classList.remove('speed-2x', 'speed-4x');
    }
    
    // Feedback visual
    speedBtn.style.transform = 'scale(1.1)';
    setTimeout(() => speedBtn.style.transform = 'scale(1)', 200);
    
    // Se estava rodando, continuar com nova velocidade
    if (wasPlaying) {
        setTimeout(() => startAnimation(), 10);
    }
}

// Mostrar botão de download
function showDownloadButton() {
    finalDownloadBtn.style.display = 'flex';
}

// Iniciar sequência completa
function startSequence() {
    // Resetar tudo
    isAnimating = false;
    clickCount = 0;
    currentSpeed = 1;
    animationStartTime = 0;
    elapsedTimeBeforePause = 0;
    
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
    
    // Resetar UI
    speedBtn.innerHTML = '<i class="fas fa-forward"></i> 1x';
    speedBtn.classList.remove('speed-2x', 'speed-4x');
    finalDownloadBtn.style.display = 'none';
    
    // Resetar e mostrar elementos
    intro.style.display = 'block';
    titleScreen.style.display = 'block';
    crawlContainer.style.opacity = '0';
    
    // Resetar animações CSS
    intro.style.animation = 'none';
    titleScreen.style.animation = 'none';
    crawlContainer.style.animation = 'none';
    crawlText.style.animation = 'none';
    
    void intro.offsetWidth;
    void titleScreen.offsetWidth;
    void crawlContainer.offsetWidth;
    
    // Configurar texto
    initAnimationSystem();
    
    // Animações CSS sequenciais
    intro.style.animation = 'introAnimation 5s ease-out';
    titleScreen.style.animation = 'titleAnimation 5s ease-out 5s';
    crawlContainer.style.animation = 'crawlFadeIn 5s ease-out 10s forwards';
    
    // Iniciar animação manual após delay
    setTimeout(() => {
        elapsedTimeBeforePause = 0;
        startAnimation();
    }, 12000);
}

// Pular introdução
skipBtn.addEventListener('click', () => {
    intro.style.display = 'none';
    titleScreen.style.display = 'none';
    crawlContainer.style.opacity = '1';
    crawlContainer.style.animation = 'none';
    
    // Resetar e iniciar imediatamente
    elapsedTimeBeforePause = 0;
    initAnimationSystem();
    startAnimation();
});

// Event Listeners
speedBtn.addEventListener('click', changeSpeed);
replayBtn.addEventListener('click', startSequence);

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

// Tecla 'V' para velocidade
document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'v') {
        e.preventDefault();
        changeSpeed();
    }
});

// Tecla espaço para pausar/continuar (extra)
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        if (isAnimating) {
            pauseAnimation();
        } else if (elapsedTimeBeforePause > 0) {
            startAnimation();
        }
    }
});

// Inicializar quando a página carregar
window.addEventListener('DOMContentLoaded', () => {
    initAnimationSystem();
    startSequence();
});

// Ajustar quando redimensionar
window.addEventListener('resize', () => {
    initAnimationSystem();
    // Se estiver animando, continuar da mesma posição
    if (isAnimating || elapsedTimeBeforePause > 0) {
        const progress = elapsedTimeBeforePause / totalAnimationTime;
        const positionY = START_POSITION - (progress * (START_POSITION - END_POSITION));
        crawlText.style.transform = `translateY(${positionY}vh) rotateX(35deg)`;
    }
});