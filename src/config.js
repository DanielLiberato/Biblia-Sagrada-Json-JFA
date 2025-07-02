/**
 * Configurações do Sistema Bíblia Sagrada
 * @version 2.0.0
 */

const BibleConfig = {
    // Informações da aplicação
    app: {
        name: 'Bíblia Sagrada - Sistema de Leitura',
        version: '2.0.0',
        author: 'Sistema Bíblia Sagrada',
        description: 'Sistema de leitura da Bíblia Sagrada com navegação intuitiva e modo tela cheia'
    },

    // Versões da Bíblia disponíveis
    versions: {
        rc: {
            name: 'Almeida Revista e Corrigida',
            code: 'RC',
            file: 'jsondata_almeida_rc.js',
            variable: 'jsonDataRC'
        },
        ra: {
            name: 'Almeida Revista e Atualizada',
            code: 'RA',
            file: 'jsondata_almeida_ra.js',
            variable: 'jsonDataRA'
        }
    },

    // Configurações padrão
    defaults: {
        version: 'rc',
        debugMode: false,
        book: '',
        chapter: '',
        verse: ''
    },

    // Atalhos de teclado
    keyboard: {
        previousVerse: ['ArrowLeft', 37],
        nextVerse: ['ArrowRight', 39],
        toggleFullscreen: ['F11', 122],
        exitFullscreen: ['Escape', 27]
    },

    // Configurações de interface
    ui: {
        animations: {
            fadeInDuration: 500,
            hintFadeDuration: 4000
        },
        fullscreen: {
            showNavigationHint: true,
            hintText: 'Use ⬅️ ➡️ para navegar • ESC para sair'
        }
    },

    // Mensagens do sistema
    messages: {
        welcome: 'Bem-vindo ao Sistema da Bíblia Sagrada',
        selectToStart: 'Selecione uma versão, livro, capítulo e versículo para começar',
        verseNotFound: 'Versículo não encontrado',
        loadingVersion: {
            rc: 'Carregada versão RC (Revista e Corrigida)',
            ra: 'Carregada versão RA (Revista e Atualizada)'
        }
    },

    // Configurações de debug
    debug: {
        enabled: false,
        logNavigation: true,
        logVersionChanges: true,
        logFullscreenChanges: true
    }
};

// Exportar configurações (compatibilidade com diferentes ambientes)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BibleConfig;
} else if (typeof window !== 'undefined') {
    window.BibleConfig = BibleConfig;
} 