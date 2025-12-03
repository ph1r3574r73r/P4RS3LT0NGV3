/**
 * Tokenizer Tool - Tokenizer visualization tool
 */
class TokenizerTool extends Tool {
    constructor() {
        super({
            id: 'tokenizer',
            name: 'Tokenizer',
            icon: 'fa-layer-group',
            title: 'Tokenizer visualization',
            order: 6
        });
    }
    
    getVueData() {
        return {
            tokenizerInput: '',
            tokenizerEngine: 'byte',
            tokenizerTokens: [],
            tokenizerCharCount: 0,
            tokenizerWordCount: 0
        };
    }
    
    getVueMethods() {
        return {
            runTokenizer: async function() {
                const text = this.tokenizerInput || '';
                const engine = this.tokenizerEngine;
                const tokens = [];
                if (!text) { this.tokenizerTokens = []; this.tokenizerCharCount = 0; this.tokenizerWordCount = 0; return; }
                if (engine === 'byte') {
                    const encoder = new TextEncoder();
                    const bytes = encoder.encode(text);
                    for (let i=0;i<bytes.length;i++) {
                        tokens.push({ id: bytes[i], text: `0x${bytes[i].toString(16).padStart(2,'0')}` });
                    }
                } else if (engine === 'word') {
                    const parts = text.split(/(\s+|[\.,!?:;()\[\]{}])/);
                    for (const p of parts) { if (p) tokens.push({ text: p }); }
                } else if (['cl100k','o200k','p50k','r50k'].includes(engine)) {
                    try {
                        if (!window.gptTok) {
                            window.gptTok = await import('https://cdn.jsdelivr.net/npm/gpt-tokenizer@2/+esm');
                        }
                        const map = { cl100k: 'cl100k_base', o200k: 'o200k_base', p50k: 'p50k_base', r50k: 'r50k_base' };
                        const enc = map[engine];
                        const ids = window.gptTok.encode(text, enc);
                        for (const id of ids) {
                            const piece = window.gptTok.decode([id], enc);
                            tokens.push({ id, text: piece });
                        }
                    } catch (e) {
                        console.warn('Failed to load/use gpt-tokenizer; falling back to bytes', e);
                        this.tokenizerEngine = 'byte';
                        return this.runTokenizer();
                    }
                } else {
                    const encoder = new TextEncoder();
                    const bytes = encoder.encode(text);
                    for (let i=0;i<bytes.length;i++) tokens.push({ id: bytes[i], text: `0x${bytes[i].toString(16).padStart(2,'0')}` });
                }
                this.tokenizerTokens = tokens;
                this.tokenizerCharCount = Array.from(text).length;
                const wordMatches = text.trim().match(/[^\s]+/g) || [];
                this.tokenizerWordCount = wordMatches.length;
            }
        };
    }
    
    getVueWatchers() {
        return {
            tokenizerInput() {
                this.runTokenizer();
            },
            tokenizerEngine() {
                this.runTokenizer();
            }
        };
    }
    
    onActivate(vueInstance) {
        vueInstance.$nextTick(() => vueInstance.runTokenizer());
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TokenizerTool;
} else {
    window.TokenizerTool = TokenizerTool;
}



