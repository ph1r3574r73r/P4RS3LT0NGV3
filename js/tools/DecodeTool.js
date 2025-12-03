/**
 * Decode Tool - Universal decoder tool
 */
class DecodeTool extends Tool {
    constructor() {
        super({
            id: 'decoder',
            name: 'Decoder',
            icon: 'fa-key',
            title: 'Universal Decoder (D)',
            order: 2
        });
    }
    
    getVueData() {
        return {
            decoderInput: '',
            decoderOutput: '',
            decoderResult: null,
            selectedDecoder: 'auto'
        };
    }
    
    getVueMethods() {
        return {
            getAllTransformsWithReverse: function() {
                return this.transforms.filter(t => t && typeof t.reverse === 'function');
            },
            runUniversalDecode: function() {
                const input = this.decoderInput;
                
                if (!input) {
                    this.decoderOutput = '';
                    this.decoderResult = null;
                    return;
                }
                
                let result = null;
                
                if (this.selectedDecoder !== 'auto') {
                    const selectedTransform = this.transforms.find(t => t.name === this.selectedDecoder);
                    if (selectedTransform && selectedTransform.reverse) {
                        try {
                            const decoded = selectedTransform.reverse(input);
                            if (decoded && decoded !== input) {
                                result = {
                                    text: decoded,
                                    method: selectedTransform.name,
                                    alternatives: []
                                };
                            }
                        } catch (e) {
                            console.error(`Error using manual decoder ${this.selectedDecoder}:`, e);
                        }
                    }
                } else {
                    result = window.universalDecode(input, {
                        activeTab: this.activeTab,
                        activeTransform: this.activeTransform
                    });
                }
                
                this.decoderResult = result;
                this.decoderOutput = result ? result.text : '';
            },
            useAlternative: function(alternative) {
                if (alternative && alternative.text) {
                    this.decoderOutput = alternative.text;
                    this.decoderResult = {
                        method: alternative.method,
                        text: alternative.text,
                        alternatives: this.decoderResult.alternatives.filter(a => a.method !== alternative.method)
                    };
                }
            }
        };
    }
    
    getVueWatchers() {
        return {
            decoderInput() {
                this.runUniversalDecode();
            }
        };
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DecodeTool;
} else {
    window.DecodeTool = DecodeTool;
}



