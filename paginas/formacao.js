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
        
        // Inicialização
        window.addEventListener('DOMContentLoaded', () => {
            // Ajustar a posição inicial
            adjustCrawlStart();
            
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
        
        // Simular download do CV (botão final)
        finalDownloadBtn.addEventListener('click', () => {
            const cvContent = `
DANIEL ROSA SILVA
17 anos, Solteiro
Santo André – São Paulo/SP
Cel.: (11) 98297-3901
E-mail: danielrosilvad@gmail.com
LinkedIn: https://www.linkedin.com/in/daniel-rosa-430472291/

OBJETIVO:
Estágio na área de desenvolvimento de sistemas

QUALIFICAÇÃO PROFISSIONAL:
Profissional com formação técnica em Sistemas Operacionais
Conhecimento em Windows, Figma, Git, GitHub
Experiência com HTML, CSS, JS, PHP, React, React Native
Banco de Dados: MySQL e Firebase

FORMAÇÃO ACADÊMICA:
Ensino Médio Completo - SESI (2024)
Curso Técnico: Desenvolvimento de Sistemas - Senai (2023-2024)

ATIVIDADES EXTRACURRICULARES:
Curso Básico: Power BI - Senai
Curso Básico: Java  - Senai

INFORMAÇÕES COMPLEMENTARES:
Inglês (Intermediário)
Disponibilidade para início imediato
Pró-ativo e com boa capacidade de aprendizado
            `;
            
            const blob = new Blob([cvContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'CV_Daniel_Rosa_Silva.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            // Feedback visual no botão
            const originalHTML = finalDownloadBtn.innerHTML;
            finalDownloadBtn.innerHTML = '<i class="fas fa-check"></i> CV Baixado!';
            finalDownloadBtn.style.backgroundColor = '#4CAF50';
            finalDownloadBtn.style.color = '#000';
            finalDownloadBtn.style.animation = 'none';
            
            setTimeout(() => {
                finalDownloadBtn.innerHTML = originalHTML;
                finalDownloadBtn.style.backgroundColor = '';
                finalDownloadBtn.style.color = '';
                finalDownloadBtn.style.animation = 'pulse 2s infinite';
            }, 2000);
        });
        
        // Botão de voltar também pode servir para repetir
        backBtn.addEventListener('click', (e) => {
            // Se clicar com Ctrl ou queremos apenas voltar, não fazemos nada
            // O link já leva para a página inicial
        });
        
        // Prevenir que o usuário arraste a tela em dispositivos móveis
        document.addEventListener('touchstart', (e) => {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        }, { passive: false });
        
        // Prevenir zoom em dispositivos móveis
        document.addEventListener('gesturestart', (e) => {
            e.preventDefault();
        });