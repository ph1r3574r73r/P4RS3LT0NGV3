// Emoji Library for P4RS3LT0NGV3

window.emojiLibrary = {};

// Polyfill for Intl.Segmenter
if (!Intl.Segmenter) {
    console.warn('Intl.Segmenter not available, falling back to basic character splitting');
}

window.emojiLibrary.splitEmojis = function(text) {
    if (Intl.Segmenter) {
        const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
        return Array.from(segmenter.segment(text), ({ segment }) => segment);
    }
    return Array.from(text);
};

window.emojiLibrary.joinEmojis = function(emojis) {
    return emojis.join('');
};

// Complete Emoji Categories
window.emojiLibrary.EMOJIS = {
    smileys_emotions: [
        "😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😆", "😉", "😊", "😋", "😎", "😍", "😘", "🥰",
        "😗", "😙", "😚", "🙂", "🤗", "🤩", "🤔", "🤨", "😐", "😑", "😶", "🙄", "😏", "😣", "😥",
        "😮", "🤐", "😯", "😪", "😫", "😴", "😌", "😛", "😜", "😝", "🤤", "😒", "😓", "😔", "😕",
        "🙃", "🤑", "😲", "🙁", "😖", "😞", "😟", "😤", "😢", "😭", "😧", "😨", "😩", "🤯", "😱",
        "😳", "🥵", "🥶", "😡", "😠", "🤬", "😷", "🤒", "🤕", "🤢", "🤮", "🤧", "😇", "🥳", "🥴",
        "🥺", "🧐", "🥱", "🤓", "🤠", "🤡", "🤥", "🤫", "🤭", "🫠", "🫡", "🫢", "🫣", "🫤", "🫥"
    ],
    
    people_body: [
        "👶", "🧒", "👦", "👧", "🧑", "👨", "👩", "🧓", "👴", "👵", "👨‍⚕️", "👩‍⚕️", "👨‍🎓", "👩‍🎓",
        "👨‍🏫", "👩‍🏫", "👨‍⚖️", "👩‍⚖️", "👨‍🌾", "👩‍🌾", "👨‍🍳", "👩‍🍳", "👨‍🔧", "👩‍🔧", "👨‍🏭",
        "👩‍🏭", "👨‍💼", "👩‍💼", "👨‍🔬", "👩‍🔬", "👨‍💻", "👩‍💻", "👨‍🎤", "👩‍🎤", "👨‍🎨", "👩‍🎨",
        "👨‍✈️", "👩‍✈️", "👨‍🚀", "👩‍🚀", "👨‍🚒", "👩‍🚒", "🕵️‍♂️", "🕵️‍♀️", "💂‍♂️", "💂‍♀️", "👮‍♂️",
        "👮‍♀️", "🤴", "👸", "👳‍♂️", "👳‍♀️", "👲", "🧕", "🧔", "👱‍♂️", "👱‍♀️", "🙍‍♂️", "🙍‍♀️",
        "🙎‍♂️", "🙎‍♀️", "🙅‍♂️", "🙅‍♀️", "🙆‍♂️", "🙆‍♀️", "💁‍♂️", "💁‍♀️", "🙋‍♂️", "🙋‍♀️",
        "🧏‍♂️", "🧏‍♀️", "🙇‍♂️", "🙇‍♀️", "🤦‍♂️", "🤦‍♀️", "🤷‍♂️", "🤷‍♀️", "💆‍♂️", "💆‍♀️",
        "💇‍♂️", "💇‍♀️", "🚶‍♂️", "🚶‍♀️", "🏃‍♂️", "🏃‍♀️", "💃", "🕺", "👯‍♂️", "👯‍♀️", "🧑‍🤝‍🧑",
        "👨‍🤝‍👨", "👩‍🤝‍👩", "👪", "👨‍👩‍👦", "👨‍👩‍👧", "👨‍👩‍👧‍👦", "👨‍👨‍👦", "👨‍👨‍👧", "👩‍👩‍👦",
        "👩‍👩‍👧", "🗣️", "👤", "👥", "🫂", "👣"
    ],
    
    gestures: [
        "👋", "🤚", "🖐️", "✋", "🖖", "👌", "🤌", "🤏", "✌️", "🤞", "🤟", "🤘", "🤙", "👈", "👉",
        "👆", "🖕", "👇", "☝️", "👍", "👎", "✊", "👊", "🤛", "🤜", "👏", "🙌", "👐", "🤲", "🤝",
        "🙏", "✍️", "💅", "🤳", "💪", "🦾", "🦿", "🦵", "🦶", "👂", "🦻", "👃", "🧠", "🫀",
        "🫁", "🦷", "🦴", "👀", "👁️", "👅", "👄", "🫦"
    ],
    
    animals_nature: [
        "🐵", "🐒", "🦍", "🦧", "🐶", "🐕", "🦮", "🐕‍🦺", "🐩", "🐺", "🦊", "🦝", "🐱", "🐈",
        "🐈‍⬛", "🦁", "🐯", "🐅", "🐆", "🐴", "🐎", "🦄", "🦓", "🦌", "🦬", "🐮", "🐂", "🐃",
        "🐄", "🐷", "🐖", "🐗", "🐽", "🐏", "🐑", "🐐", "🐪", "🐫", "🦙", "🦒", "🐘", "🦣",
        "🦏", "🦛", "🐭", "🐁", "🐀", "🦫", "🦔", "🐰", "🐇", "🐿️", "🦨", "🦡", "🦦", "🦥",
        "🐻", "🐻‍❄️", "🐨", "🐼", "🦘", "🦃", "🐔", "🐓", "🐣", "🐤", "🐥", "🐦", "🐧", "🕊️",
        "🦅", "🦆", "🦢", "🦉", "🦤", "🪶", "🦩", "🦚", "🦜", "🐸", "🐊", "🐢", "🦎", "🐍",
        "🐲", "🐉", "🦕", "🦖", "🐳", "🐋", "🐬", "🦭", "🐟", "🐠", "🐡", "🦈", "🐙", "🦑",
        "🦪", "🦀", "🦞", "🦐", "🦗", "🪳", "🕷️", "🕸️", "🦂", "🐝", "🪰", "🦋", "🐞", "🦟",
        "🐜", "🪲", "🐌", "🪴", "🌲", "🌳", "🌴", "🌵", "🌾", "🌿", "☘️", "🍀", "🍁", "🍂",
        "🍃", "🪸", "🪹", "🪺"
    ],
    
    food_drink: [
        "🍇", "🍈", "🍉", "🍊", "🍋", "🍌", "🍍", "🥭", "🍎", "🍏", "🍐", "🍑", "🍒", "🍓",
        "🫐", "🥝", "🍅", "🫒", "🥥", "🥑", "🍆", "🥔", "🥕", "🌽", "🌶️", "🫑", "🥒", "🥬",
        "🥦", "🧄", "🧅", "🍄", "🥜", "🫘", "🌰", "🫚", "🫛", "🍞", "🥐", "🥖", "🫓", "🥨",
        "🥯", "🥞", "🧇", "🧀", "🍖", "🍗", "🥩", "🥓", "🍔", "🍟", "🍕", "🌭", "🥪", "🌮",
        "🌯", "🫔", "🥙", "🧆", "🥚", "🍳", "🥘", "🍲", "🫕", "🥣", "🥗", "🍿", "🧈", "🧂",
        "🥫", "🍱", "🍘", "🍙", "🍚", "🍛", "🍜", "🍝", "🍠", "🍢", "🍣", "🍤", "🍥", "🥮",
        "🍡", "🥟", "🥠", "🥡", "🦪", "🦀", "🦞", "🦐", "🦑", "🍦", "🍧", "🍨", "🍩", "🍪",
        "🎂", "🍰", "🧁", "🥧", "🍫", "🍬", "🍭", "🍮", "🍯", "🍼", "🥛", "☕", "🫖", "🍵",
        "🍶", "🍾", "🍷", "🍸", "🍹", "🍺", "🍻", "🥂", "🥃", "🧉", "🧊"
    ],
    
    travel_places: [
        "🌍", "🌎", "🌏", "🌐", "🗺️", "🗾", "🧭", "🏔️", "⛰️", "🌋", "🗻", "🏕️", "🏖️", "🏜️",
        "🏝️", "🏞️", "🏟️", "🏛️", "🏗️", "🪨", "🪵", "🛖", "🏘️", "🏚️", "🏠", "🏡", "🏢", "🏣",
        "🏤", "🏥", "🏦", "🏨", "🏩", "🏪", "🏫", "🏬", "🏭", "🏯", "🏰", "💒", "🗼", "🗽", "⛪",
        "🕌", "🛕", "🕍", "⛩️", "🕋", "⛲", "⛺", "🌁", "🌃", "🏙️", "🌄", "🌅", "🌆", "🌇",
        "🌉", "♨️", "🎠", "🛝", "🎡", "🎢", "💈", "🎪", "🚂", "🚃", "🚄", "🚅", "🚆", "🚇",
        "🚈", "🚉", "🚊", "🚝", "🚞", "🚋", "🚌", "🚍", "🚎", "🚐", "🚑", "🚒", "🚓", "🚔",
        "🚕", "🚖", "🚗", "🚘", "🚙", "🛻", "🚚", "🚛", "🚜", "🏎️", "🏍️", "🛵", "🦽", "🦼",
        "🛺", "🚲", "🛴", "🛹", "🛼", "🚏", "🛣️", "🛤️", "🛢️", "⛽", "🛞", "🚨", "🚥", "🚦",
        "🛑", "🚧", "⚓", "🛟", "⛵", "🛶", "🚤", "🛳️", "⛴️", "🛥️", "🚢", "✈️", "🛩️", "🛫",
        "🛬", "🪂", "💺", "🚁", "🚟", "🚠", "🚡", "🛰️", "🚀", "🛸", "🪐"
    ],
    
    activities: [
        "⚽", "🏀", "🏈", "⚾", "🥎", "🎾", "🏐", "🏉", "🥏", "🎳", "🏏", "🏑", "🏒", "🥍", "🏓",
        "🏸", "🥊", "🥋", "🥅", "⛳", "⛸️", "🎣", "🤿", "🎽", "🎿", "🛷", "🥌", "🎯", "🪀",
        "🪁", "🎱", "🔮", "🪄", "🎲", "🧩", "🪅", "🪆", "🎰", "🎮", "🎳", "🎭", "🎨", "🎬",
        "🎤", "🎧", "🎼", "🎹", "🥁", "🪘", "🎷", "🎺", "🪗", "🎸", "🪕", "🎻", "🪩", "🎪",
        "🎟️", "🎫", "🏅", "🥇", "🥈", "🥉", "🏆", "🏒", "🏸"
    ],
    
    objects: [
        "⌚", "📱", "📲", "💻", "🖥️", "🖨️", "⌨️", "🖱️", "🖲️", "💽", "💾", "💿", "📀", "🧮",
        "📞", "☎️", "📟", "📠", "📡", "📺", "📻", "🎙️", "🎚️", "🎛️", "🎤", "🎧", "📣", "📢",
        "🔔", "🔕", "🎵", "🎶", "🎼", "🎹", "🥁", "🎷", "🎺", "🎸", "🎻", "🪕", "🎬", "🎮",
        "🕹️", "🎲", "🧩", "🃏", "🀄", "🎴", "🎨", "🧵", "🪡", "🧶", "🪢", "👓", "🕶️", "🥽",
        "🥼", "🦺", "👔", "👕", "👖", "🧣", "🧤", "🧥", "🧦", "👗", "👘", "🥻", "🩱", "🩲",
        "🩳", "👙", "👚", "👛", "👜", "👝", "🛍️", "🎒", "🩴", "👞", "👟", "🥾", "🥿", "👠",
        "👡", "🩰", "👢", "👑", "👒", "🎩", "🎓", "🧢", "🪖", "⛑️", "📿", "💄", "💍", "💎",
        "🔇", "🔈", "🔉", "🔊", "📤", "📥", "📦", "📫", "📪", "📬", "📭", "📮", "🗳️", "✏️",
        "✒️", "🖋️", "🖌️", "🖍️", "📝", "💼", "📁", "📂", "🗂️", "📅", "📆", "🗒️", "🗓️",
        "📇", "📈", "📉", "📊", "📋", "📌", "📍", "📎", "🖇️", "📏", "📐", "✂️", "🗃️", "🗄️",
        "🗑️", "🔒", "🔓", "🔏", "🔐", "🔑", "🗝️", "🔨", "🪓", "⛏️", "⚒️", "🛠️", "🗡️", "⚔️",
        "🔫", "🪃", "🏹", "🛡️", "🪚", "🔧", "🪛", "🔩", "⚙️", "🪤", "🧱", "⛓️", "🧲", "💣",
        "🧨", "🪔", "🔥", "🧰", "🧪", "🧫", "🧬", "🔬", "🔭", "📡", "💉", "🩺", "💊", "🩹",
        "🩼", "🚪", "🛗", "🪞", "🪟", "🛏️", "🛋️", "🪑", "🚽", "🪠", "🚿", "🛁", "🪤", "🪒",
        "🧴", "🧷", "🧹", "🧺", "🧻", "🪣", "🧼", "🫧", "🪥", "🧽", "🧯", "🛒", "🚬", "⚰️",
        "🪦", "⚱️", "🗿", "🪧", "🪪"
    ],
    
    symbols: [
        "❤️", "🩷", "🧡", "💛", "💚", "💙", "🩵", "💜", "🤎", "🖤", "🤍", "💔", "❣️", "💕",
        "💞", "💓", "💗", "💖", "💘", "💝", "💟", "☮️", "✝️", "☯️", "🕉️", "☸️", "✡️", "🔯",
        "🕎", "☪️", "♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓", "⛎",
        "🔀", "🔁", "🔂", "▶️", "⏸️", "⏹️", "⏺️", "⏭️", "⏮️", "⏫", "⏬", "⏯️", "🔅", "🔆",
        "🔇", "🔈", "🔉", "🔊", "📶", "🔋", "🔌", "💡", "🔦", "🕯️", "🪫", "🪬", "💲", "©️",
        "®️", "™️", "✅", "❌", "❎", "➕", "➖", "➗", "✖️", "💯", "💢", "💥", "💫", "💦",
        "💨", "🕳️", "💬", "👁️‍🗨️", "🗨️", "🗯️", "💭", "🌀", "🌡️", "☀️", "🌤️", "⛅", "🌥️",
        "☁️", "🌦️", "🌧️", "⛈️", "🌩️", "🌨️", "❄️", "☃️", "⛄", "🌬️", "💧", "🌊", "🌫️",
        "🌪️", "🌈", "☂️", "☔", "⛱️", "⚡", "🔮", "✨", "🌟", "⭐", "💫", "🌠", "♠️", "♥️",
        "♦️", "♣️", "🩶", "🪐", "🪨"
    ],
    
    flags: [
        "🏴‍☠️", "🏳️‍🌈", "🏳️‍⚧️", "🇦🇨", "🇦🇩", "🇦🇪", "🇦🇫", "🇦🇬", "🇦🇮", "🇦🇱", "🇦🇲", "🇦🇴",
        "🇦🇶", "🇦🇷", "🇦🇸", "🇦🇹", "🇦🇺", "🇦🇼", "🇦🇽", "🇦🇿", "🇧🇦", "🇧🇧", "🇧🇩", "🇧🇪", "🇧🇫",
        "🇧🇬", "🇧🇭", "🇧🇮", "🇧🇯", "🇧🇱", "🇧🇲", "🇧🇳", "🇧🇴", "🇧🇶", "🇧🇷", "🇧🇸", "🇧🇹", "🇧🇻",
        "🇧🇼", "🇧🇾", "🇧🇿", "🇨🇦", "🇨🇨", "🇨🇩", "🇨🇫", "🇨🇬", "🇨🇭", "🇨🇮", "🇨🇰", "🇨🇱", "🇨🇲",
        "🇨🇳", "🇨🇴", "🇨🇵", "🇨🇷", "🇨🇺", "🇨🇻", "🇨🇼", "🇨🇽", "🇨🇾", "🇨🇿", "🇩🇪", "🇩🇬", "🇩🇯",
        "🇩🇰", "🇩🇲", "🇩🇴", "🇩🇿", "🇪🇦", "🇪🇨", "🇪🇪", "🇪🇬", "🇪🇭", "🇪🇷", "🇪🇸", "🇪🇹", "🇪🇺",
        "🇫🇮", "🇫🇯", "🇫🇰", "🇫🇲", "🇫🇴", "🇫🇷", "🇬🇦", "🇬🇧", "🇬🇩", "🇬🇪", "🇬🇫", "🇬🇬", "🇬🇭",
        "🇬🇮", "🇬🇱", "🇬🇲", "🇬🇳", "🇬🇵", "🇬🇶", "🇬🇷", "🇬🇸", "🇬🇹", "🇬🇺", "🇬🇼", "🇬🇾", "🇭🇰",
        "🇭🇲", "🇭🇳", "🇭🇷", "🇭🇹", "🇭🇺", "🇮🇨", "🇮🇩", "🇮🇪", "🇮🇱", "🇮🇲", "🇮🇳", "🇮🇴", "🇮🇶",
        "🇮🇷", "🇮🇸", "🇮🇹", "🇯🇪", "🇯🇲", "🇯🇴", "🇯🇵", "🇰🇪", "🇰🇬", "🇰🇭", "🇰🇮", "🇰🇲", "🇰🇳",
        "🇰🇵", "🇰🇷", "🇰🇼", "🇰🇾", "🇰🇿", "🇱🇦", "🇱🇧", "🇱🇨", "🇱🇮", "🇱🇰", "🇱🇷", "🇱🇸", "🇱🇹",
        "🇱🇺", "🇱🇻", "🇱🇾", "🇲🇦", "🇲🇨", "🇲🇩", "🇲🇪", "🇲🇫", "🇲🇬", "🇲🇭", "🇲🇰", "🇲🇱", "🇲🇲",
        "🇲🇳", "🇲🇴", "🇲🇵", "🇲🇶", "🇲🇷", "🇲🇸", "🇲🇹", "🇲🇺", "🇲🇻", "🇲🇼", "🇲🇽", "🇲🇾", "🇲🇿",
        "🇳🇦", "🇳🇨", "🇳🇪", "🇳🇫", "🇳🇬", "🇳🇮", "🇳🇱", "🇳🇴", "🇳🇵", "🇳🇷", "🇳🇺", "🇳🇿", "🇴🇲",
        "🇵🇦", "🇵🇪", "🇵🇫", "🇵🇬", "🇵🇭", "🇵🇰", "🇵🇱", "🇵🇲", "🇵🇳", "🇵🇷", "🇵🇸", "🇵🇹", "🇵🇼",
        "🇵🇾", "🇶🇦", "🇷🇪", "🇷🇴", "🇷🇸", "🇷🇺", "🇷🇼", "🇸🇦", "🇸🇧", "🇸🇨", "🇸🇩", "🇸🇪", "🇸🇬",
        "🇸🇭", "🇸🇮", "🇸🇯", "🇸🇰", "🇸🇱", "🇸🇲", "🇸🇳", "🇸🇴", "🇸🇷", "🇸🇸", "🇸🇹", "🇸🇻", "🇸🇽",
        "🇸🇾", "🇸🇿", "🇹🇦", "🇹🇨", "🇹🇩", "🇹🇫", "🇹🇬", "🇹🇭", "🇹🇯", "🇹🇰", "🇹🇱", "🇹🇲", "🇹🇳",
        "🇹🇴", "🇹🇷", "🇹🇹", "🇹🇻", "🇹🇼", "🇹🇿", "🇺🇦", "🇺🇬", "🇺🇲", "🇺🇳", "🇺🇸", "🇺🇾", "🇺🇿",
        "🇻🇦", "🇻🇨", "🇻🇪", "🇻🇬", "🇻🇮", "🇻🇳", "🇻🇺", "🇼🇫", "🇼🇸", "🇽🇰", "🇾🇪", "🇾🇹", "🇿🇦",
        "🇿🇲", "🇿🇼"
    ]
};

// Categories Definition
window.emojiLibrary.CATEGORIES = [
    { id: 'all', name: 'All Emojis', icon: '🔍' },
    { id: 'smileys_emotions', name: 'Smileys & Emotions', icon: '😀' },
    { id: 'people_body', name: 'People & Body', icon: '🧑' },
    { id: 'gestures', name: 'Gestures', icon: '👍' },
    { id: 'animals_nature', name: 'Animals & Nature', icon: '🐶' },
    { id: 'food_drink', name: 'Food & Drink', icon: '🍎' },
    { id: 'travel_places', name: 'Travel & Places', icon: '✈️' },
    { id: 'activities', name: 'Activities', icon: '⚽' },
    { id: 'objects', name: 'Objects', icon: '📱' },
    { id: 'symbols', name: 'Symbols', icon: '❤️' },
    { id: 'flags', name: 'Flags', icon: '🏳️' }
];

// Render Emoji Grid Function
window.emojiLibrary.renderEmojiGrid = function(containerId, onEmojiSelect, filteredList) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error('Container not found:', containerId);
        return;
    }

    container.innerHTML = '';

    // Header
    const emojiHeader = document.createElement('div');
    emojiHeader.className = 'emoji-header';
    emojiHeader.innerHTML = '<h3><i class="fas fa-icons"></i> Choose an Emoji</h3><p class="emoji-subtitle"><i class="fas fa-magic"></i> Click any emoji to copy your hidden message</p>';
    container.appendChild(emojiHeader);

    // Category Tabs
    const categoryTabs = document.createElement('div');
    categoryTabs.className = 'emoji-category-tabs';
    window.emojiLibrary.CATEGORIES.forEach(category => {
        const tab = document.createElement('button');
        tab.className = 'emoji-category-tab';
        tab.classList.toggle('active', category.id === 'all');
        tab.setAttribute('data-category', category.id);
        tab.innerHTML = `${category.icon} ${category.name}`;
        categoryTabs.appendChild(tab);
    });
    container.appendChild(categoryTabs);

    // Emoji Grid
    const gridContainer = document.createElement('div');
    gridContainer.className = 'emoji-grid';
    
    const getActiveCategory = () => {
        const activeTab = container.querySelector('.emoji-category-tab.active');
        return activeTab ? activeTab.getAttribute('data-category') : 'all';
    };

    const renderGrid = () => {
        gridContainer.innerHTML = '';
        const activeCategory = getActiveCategory();
        let emojisToShow = [];

        if (filteredList?.length > 0) {
            emojisToShow = filteredList;
        } else if (activeCategory === 'all') {
            emojisToShow = Object.values(window.emojiLibrary.EMOJIS).flat();
        } else {
            emojisToShow = window.emojiLibrary.EMOJIS[activeCategory] || [];
        }

        emojisToShow.forEach(emoji => {
            const emojiButton = document.createElement('button');
            emojiButton.className = 'emoji-button';
            emojiButton.textContent = emoji;
            emojiButton.title = 'Click to encode with this emoji';
            emojiButton.addEventListener('click', () => {
                if (typeof onEmojiSelect === 'function') {
                    onEmojiSelect(emoji);
                    emojiButton.style.backgroundColor = '#e6f7ff';
                    setTimeout(() => emojiButton.style.backgroundColor = '', 300);
                }
            });
            gridContainer.appendChild(emojiButton);
        });

        const countDisplay = container.querySelector('.emoji-count') || document.createElement('div');
        countDisplay.className = 'emoji-count';
        countDisplay.textContent = `${emojisToShow.length} emojis available`;
        container.appendChild(countDisplay);
    };

    container.appendChild(gridContainer);
    renderGrid();

    // Category Tab Event Listeners
    container.querySelectorAll('.emoji-category-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            container.querySelectorAll('.emoji-category-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderGrid();
        });
    });
};
