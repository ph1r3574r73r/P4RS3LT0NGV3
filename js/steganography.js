// Steganography carriers
const carriers = [
    { emoji: '🐍', name: 'SNAKE', desc: 'Classic Snake', preview: text => `🐍${text}` },
    { emoji: '🐉', name: 'DRAGON', desc: 'Mystical Dragon', preview: text => `🐉${text}` },
    { emoji: '🦎', name: 'LIZARD', desc: 'Sneaky Lizard', preview: text => `🦎${text}` },
    { emoji: '🐊', name: 'CROCODILE', desc: 'Dangerous Croc', preview: text => `🐊${text}` }
];

// Emoji encoding/decoding
function encodeEmoji(emoji, text) {
    if (!text) return emoji;
    
    // Convert text to binary string
    const binary = Array.from(text)
        .map(c => c.charCodeAt(0).toString(2).padStart(8, '0'))
        .join('');
    
    // Use variation selectors to encode binary
    const vs15 = '\ufe0e';  // text variation selector (0)
    const vs16 = '\ufe0f';  // emoji variation selector (1)
    
    let result = emoji;
    for (const bit of binary) {
        result += bit === '0' ? vs15 : vs16;
    }
    
    return result;
}

function decodeEmoji(text) {
    if (!text) return '';
    
    // Extract variation selectors
    const matches = [...text.matchAll(/[\ufe0e\ufe0f]/g)];
    if (!matches.length) return '';
    
    // Convert variation selectors to binary
    const binary = matches.map(m => m[0] === '\ufe0e' ? '0' : '1').join('');
    
    // Convert binary to text
    let decoded = '';
    for (let i = 0; i < binary.length; i += 8) {
        const byte = binary.slice(i, i + 8);
        if (byte.length === 8) {
            decoded += String.fromCharCode(parseInt(byte, 2));
        }
    }
    
    return decoded;
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
