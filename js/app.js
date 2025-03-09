// Initialize Vue app
new Vue({
    el: '#app',
    data: {
        // Theme
        isDarkTheme: true,

        // Tab Management
        activeTab: 'transforms',

        // Transform Tab
        transformInput: '',
        transformOutput: '',
        activeTransform: null,
        transforms: Object.entries(window.transforms).map(([key, transform]) => ({
            name: transform.name,
            func: transform.func.bind(transform),
            preview: transform.preview.bind(transform)
        })),

        // Steganography Tab
        emojiMessage: '',
        encodedMessage: '',
        decodeInput: '',
        decodedMessage: '',
        selectedCarrier: null,
        activeSteg: null,
        carriers: window.steganography.carriers,
        showDecoder: true
    },
    methods: {
        // Theme Toggle
        toggleTheme() {
            this.isDarkTheme = !this.isDarkTheme;
            document.body.classList.toggle('light-theme');
        },

        // Transform Methods
        applyTransform(transform) {
            if (this.transformInput) {
                this.activeTransform = transform;
                this.transformOutput = transform.func(this.transformInput);
                this.copyToClipboard(this.transformOutput);
            }
        },
        autoTransform() {
            if (this.transformInput && this.activeTransform) {
                this.transformOutput = this.activeTransform.func(this.transformInput);
                this.copyToClipboard(this.transformOutput);
            }
        },

        // Steganography Methods
        selectCarrier(carrier) {
            this.selectedCarrier = carrier;
            this.activeSteg = 'emoji';
            this.autoEncode();
        },
        setStegMode(mode) {
            this.activeSteg = mode;
            this.autoEncode();
        },
        autoEncode() {
            if (!this.emojiMessage) {
                this.encodedMessage = '';
                return;
            }

            if (this.activeSteg === 'invisible') {
                this.encodedMessage = window.steganography.encodeInvisible(this.emojiMessage);
                this.copyToClipboard(this.encodedMessage);
            } else if (this.selectedCarrier) {
                this.encodedMessage = window.steganography.encodeEmoji(
                    this.selectedCarrier.emoji,
                    this.emojiMessage
                );
                this.copyToClipboard(this.encodedMessage);
            }
        },
        autoDecode() {
            if (!this.decodeInput) {
                this.decodedMessage = '';
                return;
            }

            // Use the universal decoder
            const result = this.universalDecode(this.decodeInput);
            
            if (result) {
                this.decodedMessage = `Decoded (${result.method}): ${result.text}`;
                this.copyToClipboard(result.text);
            } else {
                this.decodedMessage = 'No encoded message detected';
            }
        },
        previewInvisible(text) {
            return '[invisible]';
        },

        // Utility Methods
        async copyToClipboard(text) {
            if (!text) return;
            
            try {
                await navigator.clipboard.writeText(text);
                
                // Show a brief notification
                const notification = document.createElement('div');
                notification.className = 'copy-notification';
                notification.innerHTML = '<i class="fas fa-check"></i> Copied!';
                document.body.appendChild(notification);
                
                // Remove after animation
                setTimeout(() => {
                    notification.classList.add('fade-out');
                    setTimeout(() => document.body.removeChild(notification), 300);
                }, 1000);
            } catch (err) {
                console.error('Failed to copy text:', err);
                // Show error notification
                const notification = document.createElement('div');
                notification.className = 'copy-notification error';
                notification.innerHTML = '<i class="fas fa-times"></i> Copy failed';
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.classList.add('fade-out');
                    setTimeout(() => document.body.removeChild(notification), 300);
                }, 1000);
            }
        },
        
        // Universal Decoder - tries all decoding methods
        universalDecode(input) {
            if (!input) return '';
            
            // Try all decoders in order
            
            // 1. Try steganography decoders
            // - Check for emoji steganography first
            // The emoji encoding uses variation selectors which are hard to see
            if (/[\u{1F300}-\u{1F6FF}\u{2600}-\u{26FF}]/u.test(input)) {
                const decoded = window.steganography.decodeEmoji(input);
                if (decoded) {
                    return { text: decoded, method: 'Emoji Steganography' };
                }
            }
            
            // - Invisible text
            let decoded = window.steganography.decodeInvisible(input);
            if (decoded) {
                return { text: decoded, method: 'Invisible Text' };
            }
            
            // 2. Try transform reversals
            // - Binary
            if (/^[01\s]+$/.test(input.trim())) {
                try {
                    // Use binary transform's reverse function if available
                    if (window.transforms.binary && window.transforms.binary.reverse) {
                        const result = window.transforms.binary.reverse(input);
                        if (result && /[\x20-\x7E]/.test(result)) { // Make sure it's readable ASCII
                            return { text: result, method: 'Binary' };
                        }
                    } else {
                        // Fallback implementation
                        const binText = input.replace(/\s+/g, '');
                        let result = '';
                        for (let i = 0; i < binText.length; i += 8) {
                            const byte = binText.substr(i, 8);
                            if (byte.length === 8) {
                                result += String.fromCharCode(parseInt(byte, 2));
                            }
                        }
                        if (result && /[\x20-\x7E]/.test(result)) { // Make sure it's readable ASCII
                            return { text: result, method: 'Binary' };
                        }
                    }
                } catch (e) { 
                    console.error('Binary decode error:', e);
                }
            }
            
            // - Morse code
            if (/^[.\-\s\/]+$/.test(input.trim())) {
                try {
                    // Use morse transform's reverse function if available
                    if (window.transforms.morse && window.transforms.morse.reverse) {
                        const result = window.transforms.morse.reverse(input);
                        if (result !== input && /[a-zA-Z0-9]/.test(result)) {
                            return { text: result, method: 'Morse Code' };
                        }
                    }
                } catch (e) {
                    console.error('Morse decode error:', e);
                }
            }
            
            // - Try reverse each transform
            for (const name in window.transforms) {
                const transform = window.transforms[name];
                if (transform.reverse) {
                    try {
                        const result = transform.reverse(input);
                        // Only return if the result is different and contains readable characters
                        if (result !== input && /[a-zA-Z0-9\s]/.test(result)) {
                            return { text: result, method: transform.name };
                        }
                    } catch (e) {
                        console.error(`Error decoding with ${name}:`, e);
                    }
                }
            }
            
            return null;
        }
    },
    // Initialize theme
    mounted() {
        if (this.isDarkTheme) {
            document.body.classList.add('dark-theme');
        }
    },
    // Keyboard shortcuts
    created() {
        window.addEventListener('keydown', (e) => {
            // Theme toggle
            if (e.key === 'd' || e.key === 'D') {
                this.toggleTheme();
            }
            // Tab switching
            else if (e.key === 't' || e.key === 'T') {
                this.activeTab = 'transforms';
            }
            else if (e.key === 'h' || e.key === 'H') {
                this.activeTab = 'steganography';
            }
            // Transform shortcuts (1-9)
            else if (this.activeTab === 'transforms' && e.key >= '1' && e.key <= '9') {
                const index = parseInt(e.key) - 1;
                if (index < this.transforms.length) {
                    this.applyTransform(this.transforms[index]);
                }
            }

        });
    }
});
