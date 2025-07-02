/**
 * Bíblia Sagrada - Sistema de Leitura
 * Aplicação Vue.js para navegação e leitura da Bíblia
 * @version 2.0.0
 * @author Sistema Bíblia Sagrada
 */

class BibleApp {
    constructor() {
        this.initializeVueApp();
        this.setupKeyboardEvents();
    }

    initializeVueApp() {
        this.app = new Vue({
            el: '#app',
            data: {
                // Configurações de debug
                debugcode: false,
                
                // Dados da aplicação
                message: '',
                jsonData: [],
                booksbible: booksbible,
                
                // Controles de navegação
                verseCount: 0,
                selectedBook: "",
                selectedChapter: "",
                selectedVerse: "",
                selectedVersion: "rc",
                
                // Estado da interface
                isFullscreen: false,
                
                // Versões da Bíblia disponíveis
                bibleVersions: {
                    rc: null,
                    ra: null
                }
            },
            
            methods: {
                /**
                 * Obtém os capítulos disponíveis para um livro
                 */
                getChapters(book) {
                    return Array.from({ length: book.chapters }, (_, i) => i + 1);
                },

                /**
                 * Exibe o versículo selecionado
                 */
                displayVerse() {
                    let versiculoSelecionado = this.jsonData.filter(versiculo => 
                        versiculo.book == this.selectedBook.book_id && 
                        versiculo.chapter == this.selectedChapter && 
                        versiculo.verse == this.selectedVerse
                    );
                    
                    if (versiculoSelecionado.length == 0) {
                        this.selectedChapter = 1;
                        this.selectedVerse = 1;
                        versiculoSelecionado = this.jsonData.filter(versiculo => 
                            versiculo.book == this.selectedBook.book_id && 
                            versiculo.chapter == this.selectedChapter && 
                            versiculo.verse == this.selectedVerse
                        );  
                    }

                    return versiculoSelecionado[0]?.text || "Versículo não encontrado";
                },

                /**
                 * Navega para o versículo anterior
                 */
                previVerse() {
                    if(this.selectedVerse > 1) {
                        this.selectedVerse = parseInt(this.selectedVerse) - 1;
                        if (this.debugcode) console.log('Verso anterior:', this.selectedVerse);
                    }
                },

                /**
                 * Navega para o próximo versículo
                 */
                nextVerse() {
                    if (this.debugcode) {
                        console.log('nextVerse chamado - selectedVerse:', this.selectedVerse, 'verseCount:', this.verseCount);
                    }
                    
                    if(parseInt(this.selectedVerse) < parseInt(this.verseCount)) {
                        this.selectedVerse = parseInt(this.selectedVerse) + 1;
                        if (this.debugcode) console.log('Próximo verso:', this.selectedVerse);
                    } else {
                        if (this.debugcode) console.log('Já está no último versículo');
                    }
                },

                /**
                 * Alterna entre modo tela cheia
                 */
                toggleFullscreen() {
                    if (!document.fullscreenElement) {
                        document.documentElement.requestFullscreen().then(() => {
                            this.isFullscreen = true;
                            if (this.debugcode) console.log('Entrou em fullscreen');
                        }).catch(err => {
                            console.log('Erro ao entrar em tela cheia:', err);
                        });
                    } else {
                        document.exitFullscreen().then(() => {
                            this.isFullscreen = false;
                            if (this.debugcode) console.log('Saiu do fullscreen');
                        }).catch(err => {
                            console.log('Erro ao sair da tela cheia:', err);
                        });
                    }
                },

                /**
                 * Atualiza o status do modo tela cheia
                 */
                updateFullscreenStatus() {
                    this.isFullscreen = !!document.fullscreenElement;
                    if (this.debugcode) console.log('Status fullscreen atualizado:', this.isFullscreen);
                },

                /**
                 * Atualiza a contagem de versículos do capítulo atual
                 */
                updateVerseCount() {
                    if (!this.selectedBook || !this.selectedChapter) {
                        this.verseCount = 0;
                        return;
                    }
                    
                    let versiculosCapituloLivro = this.jsonData.filter(versiculo => 
                        versiculo.book == this.selectedBook.book_id && 
                        versiculo.chapter == this.selectedChapter
                    );
                    
                    this.verseCount = versiculosCapituloLivro.length;
                    if (this.debugcode) {
                        console.log('updateVerseCount chamado - Total de versículos:', this.verseCount);
                    }
                },

                /**
                 * Carrega a versão da Bíblia selecionada
                 */
                loadBibleVersion() {
                    // Resetar seleções quando trocar de versão
                    this.selectedBook = "";
                    this.selectedChapter = "";
                    this.selectedVerse = "";
                    this.verseCount = 0;
                    
                    // Carregar a versão selecionada
                    if (this.selectedVersion === 'rc' && this.bibleVersions.rc) {
                        this.jsonData = this.bibleVersions.rc.verses;
                        console.log('Carregada versão RC (Revista e Corrigida)');
                    } else if (this.selectedVersion === 'ra' && this.bibleVersions.ra) {
                        this.jsonData = this.bibleVersions.ra.verses;
                        console.log('Carregada versão RA (Revista e Atualizada)');
                    }
                },

                /**
                 * Inicializa as versões da Bíblia disponíveis
                 */
                initializeBibleVersions() {
                    if (typeof jsonDataRC !== 'undefined') {
                        this.bibleVersions.rc = jsonDataRC;
                    }
                    if (typeof jsonDataRA !== 'undefined') {
                        this.bibleVersions.ra = jsonDataRA;
                    }
                    
                    // Carregar a versão padrão (RC)
                    this.loadBibleVersion();
                },

                /**
                 * Configura os listeners para mudanças no estado de tela cheia
                 */
                setupFullscreenListeners() {
                    document.addEventListener('fullscreenchange', this.updateFullscreenStatus);
                    document.addEventListener('webkitfullscreenchange', this.updateFullscreenStatus);
                    document.addEventListener('mozfullscreenchange', this.updateFullscreenStatus);
                    document.addEventListener('MSFullscreenChange', this.updateFullscreenStatus);
                },

                /**
                 * Remove os listeners de tela cheia
                 */
                removeFullscreenListeners() {
                    document.removeEventListener('fullscreenchange', this.updateFullscreenStatus);
                    document.removeEventListener('webkitfullscreenchange', this.updateFullscreenStatus);
                    document.removeEventListener('mozfullscreenchange', this.updateFullscreenStatus);
                    document.removeEventListener('MSFullscreenChange', this.updateFullscreenStatus);
                }
            },

            computed: {
                /**
                 * Calcula os versículos disponíveis para o capítulo atual
                 */
                getVerses() {
                    if (!this.selectedBook || !this.selectedChapter) {
                        this.verseCount = 0;
                        return [];
                    }
                    
                    let versiculosCapituloLivro = this.jsonData.filter(versiculo => 
                        versiculo.book == this.selectedBook.book_id && 
                        versiculo.chapter == this.selectedChapter
                    );
                    
                    this.verseCount = versiculosCapituloLivro.length;
                    
                    if (this.debugcode) {
                        console.log('Contagem de versículos atualizada:', this.verseCount, 
                                  'para livro:', this.selectedBook.book_name, 
                                  'capítulo:', this.selectedChapter);
                    }
                    
                    // Só resetar o versículo se não estiver definido ou for inválido
                    if (!this.selectedVerse || this.selectedVerse > this.verseCount) {
                        this.selectedVerse = 1;
                    }
                    
                    return Array.from({ length: this.verseCount }, (_, i) => i + 1);
                }
            },

            watch: {
                selectedVerse(newVal, oldVal) {
                    if (this.debugcode) {
                        console.log('selectedVerse mudou de', oldVal, 'para', newVal, 'tipo:', typeof newVal);
                    }
                },
                
                verseCount(newVal, oldVal) {
                    if (this.debugcode) {
                        console.log('verseCount mudou de', oldVal, 'para', newVal, 'tipo:', typeof newVal);
                    }
                },
                
                selectedBook(newVal, oldVal) {
                    if (this.debugcode) console.log('selectedBook mudou:', newVal?.book_name);
                    this.selectedChapter = "";
                    this.selectedVerse = "";
                    this.verseCount = 0;
                },
                
                selectedChapter(newVal, oldVal) {
                    if (this.debugcode) console.log('selectedChapter mudou para:', newVal);
                    this.selectedVerse = "";
                    // Forçar recálculo dos versículos
                    this.$nextTick(() => {
                        this.updateVerseCount();
                        if (this.verseCount > 0 && !this.selectedVerse) {
                            this.selectedVerse = 1;
                        }
                    });
                }
            },

            mounted() {
                this.initializeBibleVersions();
                this.setupFullscreenListeners();
            },

            beforeDestroy() {
                this.removeFullscreenListeners();
            }
        });
    }

    /**
     * Configura os eventos de teclado para navegação
     */
    setupKeyboardEvents() {
        const handleKeyboardEvent = (event) => {
            // Navegar com setas apenas se há versículo selecionado
            if (this.app.selectedBook && this.app.selectedChapter && this.app.selectedVerse) {
                if (event.keyCode === 39 || event.key === 'ArrowRight') { // Seta direita
                    if (this.app.selectedVerse < this.app.verseCount) {
                        this.app.nextVerse();
                    }
                    event.preventDefault();
                }

                if (event.keyCode === 37 || event.key === 'ArrowLeft') { // Seta esquerda
                    if (this.app.selectedVerse > 1) {
                        this.app.previVerse();
                    }
                    event.preventDefault();
                }
            }

            // F11 para toggle fullscreen
            if (event.keyCode === 122) { // F11
                this.app.toggleFullscreen();
                event.preventDefault();
            }

            // ESC para sair do fullscreen (funcionalidade nativa do navegador)
            if (event.keyCode === 27 && document.fullscreenElement) { // ESC
                document.exitFullscreen();
            }
        };

        // Adicionar listener de evento de teclado
        document.addEventListener('keydown', handleKeyboardEvent);
    }
}

// Inicializar a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    window.bibleApp = new BibleApp();
});

// Fallback para compatibilidade
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (!window.bibleApp) {
            window.bibleApp = new BibleApp();
        }
    });
} else {
    window.bibleApp = new BibleApp();
} 