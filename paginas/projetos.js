// script.js
document.addEventListener('DOMContentLoaded', function() {
    const projetos = document.querySelectorAll('.projeto');
    let projetoAtivo = null;
    
    function isMobile() {
        return window.innerWidth <= 1023;
    }
    
    function abrirProjeto(projeto) {
        // Se já está ativo e é mobile, fecha (toggle)
        if (isMobile() && projeto === projetoAtivo) {
            projeto.classList.remove('ativo');
            projetoAtivo = null;
            return;
        }
        
        // Remove classe ativo de todos
        projetos.forEach(p => {
            p.classList.remove('ativo');
        });
        
        // Adiciona classe ativo ao clicado
        projeto.classList.add('ativo');
        projetoAtivo = projeto;
    }
    
    // Adiciona evento de clique a cada projeto
    projetos.forEach(projeto => {
        projeto.addEventListener('click', function(e) {
            e.stopPropagation();
            abrirProjeto(this);
        });
    });
    
    // Fechar ao clicar fora (só no desktop)
    document.addEventListener('click', function() {
        if (!isMobile()) {
            projetos.forEach(p => {
                p.classList.remove('ativo');
            });
            projetoAtivo = null;
        }
    });
    
    // Evitar fechar ao clicar dentro do projeto
    projetos.forEach(projeto => {
        projeto.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
    
    // Ajusta quando redimensiona a janela
    window.addEventListener('resize', function() {
        // Se mudou para mobile e tinha projeto ativo, mantém
        if (isMobile() && projetoAtivo) {
            projetoAtivo.classList.add('ativo');
        }
        // Se mudou para desktop e tinha projeto ativo, fecha
        else if (!isMobile() && projetoAtivo) {
            projetoAtivo.classList.remove('ativo');
            projetoAtivo = null;
        }
    });
});