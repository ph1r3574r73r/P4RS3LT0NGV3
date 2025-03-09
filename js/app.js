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

            // Try invisible text decoding
            let decoded = window.steganography.decodeInvisible(this.decodeInput);
            if (decoded) {
                this.decodedMessage = decoded;
                this.copyToClipboard(decoded);
                return;
            }

            // Try emoji decoding
            decoded = window.steganography.decodeEmoji(this.decodeInput);
            if (decoded) {
                this.decodedMessage = decoded;
                this.copyToClipboard(decoded);
                return;
            }

            this.decodedMessage = 'No hidden message found';
        },
        previewInvisible(text) {
            return '[invisible]';
        },

        // Utility Methods
        async copyToClipboard(text) {
            try {
                await navigator.clipboard.writeText(text);
            } catch (err) {
                console.error('Failed to copy text:', err);
            }
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
