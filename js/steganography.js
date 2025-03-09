// Steganography carriers
const carriers = [
    { emoji: '🐍', name: 'SNAKE', desc: 'Classic Snake', preview: text => `🐍${text}` },
    { emoji: '🐉', name: 'DRAGON', desc: 'Mystical Dragon', preview: text => `🐉${text}` },
    { emoji: '🦎', name: 'LIZARD', desc: 'Sneaky Lizard', preview: text => `🦎${text}` },
    { emoji: '🐊', name: 'CROCODILE', desc: 'Dangerous Croc', preview: text => `🐊${text}` }
];

// Variation selector functions
function toVariationSelector(byte) {
    return String.fromCodePoint(0xFE00 + byte);
}

function fromVariationSelector(codePoint) {
    return codePoint - 0xFE00;
}

// Emoji encoding/decoding
function encodeEmoji(emoji, text) {
    if (!text) return '';
    
    const bytes = new TextEncoder().encode(text);
    let result = emoji;
    
    for (const byte of bytes) {
        result += toVariationSelector(byte);
    }
    
    return result;
}

function decodeEmoji(text) {
    if (!text) return '';
    
    const matches = [...text.matchAll(/[\uFE00-\uFE0F]/g)];
    if (!matches.length) return '';
    
    const bytes = new Uint8Array(matches.map(m => fromVariationSelector(m[0].codePointAt(0))));
    return new TextDecoder().decode(bytes);
}

// Invisible text encoding/decoding
function encodeInvisible(text) {
    if (!text) return '';
    
    const bytes = new TextEncoder().encode(text);
    return Array.from(bytes)
        .map(byte => String.fromCodePoint(0xE0000 + byte))
        .join('');
}

function decodeInvisible(text) {
    if (!text) return '';
    
    const matches = [...text.matchAll(/[\uE0000-\uE007F]/g)];
    if (!matches.length) return '';
    
    const bytes = new Uint8Array(
        matches.map(m => m[0].codePointAt(0) - 0xE0000)
    );
    
    return new TextDecoder().decode(bytes);
}

// Export for use in app.js
window.steganography = {
    carriers,
    encodeEmoji,
    decodeEmoji,
    encodeInvisible,
    decodeInvisible
};
