// Emoji Library for P4RS3LT0NGV3

// Create namespace for emoji library
window.emojiLibrary = {};

// Make emoji list globally available
window.emojiLibrary.EMOJI_LIST = [
    // Faces and People
    "😀", // Grinning Face
    "😁", // Beaming Face with Smiling Eyes
    "😂", // Face with Tears of Joy
    "🤣", // Rolling on the Floor Laughing
    "😃", // Grinning Face with Big Eyes
    "😄", // Grinning Face with Smiling Eyes
    "😅", // Grinning Face with Sweat
    "😆", // Grinning Squinting Face
    "😉", // Winking Face
    "😊", // Smiling Face with Smiling Eyes
    "😋", // Face Savoring Food
    "😎", // Smiling Face with Sunglasses
    "😍", // Smiling Face with Heart-Eyes
    "😘", // Face Blowing a Kiss
    "🥰", // Smiling Face with Hearts
    "😗", // Kissing Face
    "😙", // Kissing Face with Smiling Eyes
    "😚", // Kissing Face with Closed Eyes
    "🙂", // Slightly Smiling Face
    "🤗", // Hugging Face
    "🤩", // Star-Struck
    "🤔", // Thinking Face
    "🤨", // Face with Raised Eyebrow
    "😐", // Neutral Face
    "😑", // Expressionless Face
    "😶", // Face Without Mouth
    "🙄", // Face with Rolling Eyes
    "😏", // Smirking Face
    "😣", // Persevering Face
    "😥", // Sad but Relieved Face
    "😮", // Face with Open Mouth
    "🤐", // Zipper-Mouth Face
    "😯", // Hushed Face
    "😪", // Sleepy Face
    "😫", // Tired Face
    "😴", // Sleeping Face
    "😌", // Relieved Face
    "😛", // Face with Tongue
    "😜", // Winking Face with Tongue
    "😝", // Squinting Face with Tongue
    "🤤", // Drooling Face
    "😒", // Unamused Face
    "😓", // Downcast Face with Sweat
    "😔", // Pensive Face
    "😕", // Confused Face
    "🙃", // Upside-Down Face
    "🤑", // Money-Mouth Face
    "😲", // Astonished Face
    "🙁", // Slightly Frowning Face
    "😖", // Confounded Face
    "😞", // Disappointed Face
    "😟", // Worried Face
    "😤", // Face with Steam From Nose
    "😢", // Crying Face
    "😭", // Loudly Crying Face
    "😧", // Anguished Face
    "😨", // Fearful Face
    "😩", // Weary Face
    "🤯", // Exploding Head
    "😱", // Face Screaming in Fear
    "😳", // Flushed Face
    "🥵", // Hot Face
    "🥶", // Cold Face
    "😡", // Pouting Face
    "😠", // Angry Face
    "🤬", // Face with Symbols on Mouth
    "😷", // Face with Medical Mask
    "🤒", // Face with Thermometer
    "🤕", // Face with Head-Bandage
    "🤢", // Nauseated Face
    "🤮", // Face Vomiting
    "🤧", // Sneezing Face
    "😇", // Smiling Face with Halo
    "🥳", // Partying Face
    "🥴", // Woozy Face
    "🥺", // Pleading Face
    "🧐", // Face with Monocle
    "🥱", // Yawning Face
    "🧠", // Brain
    
    // Gestures and Body Parts
    "👍", // Thumbs Up
    "👎", // Thumbs Down
    "👏", // Clapping Hands
    "🙌", // Raising Hands
    "🤝", // Handshake
    "👋", // Waving Hand
    "✌️", // Victory Hand
    "🤟", // Love-You Gesture
    "🤘", // Sign of the Horns
    "👊", // Oncoming Fist
    "✊", // Raised Fist
    "👆", // Backhand Index Pointing Up
    "👇", // Backhand Index Pointing Down
    "👈", // Backhand Index Pointing Left
    "👉", // Backhand Index Pointing Right
    "👌", // OK Hand
    "🤌", // Pinched Fingers
    "🤏", // Pinching Hand
    "✋", // Raised Hand
    "🤚", // Raised Back of Hand
    "🖐️", // Hand with Fingers Splayed
    "🖖", // Vulcan Salute
    "👀", // Eyes
    "👁️", // Eye
    "👄", // Mouth
    "🧿", // Nazar Amulet
    
    // Celebration & Objects
    "🎉", // Party Popper
    "🎊", // Confetti Ball
    "🎂", // Birthday Cake
    "🎁", // Wrapped Gift
    "🎈", // Balloon
    "🎄", // Christmas Tree
    "🎃", // Jack-O-Lantern
    "🏆", // Trophy
    "🏅", // Sports Medal
    "🥇", // 1st Place Medal
    "🥈", // 2nd Place Medal
    "🥉", // 3rd Place Medal
    "💰", // Money Bag
    "💸", // Money with Wings
    "💵", // Dollar Banknote
    "💴", // Yen Banknote
    "💶", // Euro Banknote
    "💷", // Pound Banknote
    "💯", // Hundred Points
    "📱", // Mobile Phone
    "💻", // Laptop
    "⌨️", // Keyboard
    "🖥️", // Desktop Computer
    "🔒", // Locked
    "🔓", // Unlocked
    
    // Food & Drink
    "🍕", // Pizza
    "🍔", // Hamburger
    "🍦", // Ice Cream
    "🍩", // Doughnut
    "🍺", // Beer Mug
    "🍷", // Wine Glass
    "☕", // Hot Beverage
    
    // Nature & Weather
    "🌈", // Rainbow
    "🌞", // Sun with Face
    "🌙", // Crescent Moon
    "⭐", // Star
    "🌟", // Glowing Star
    "⚡", // High Voltage
    "❄️", // Snowflake
    "🔥", // Fire
    "💧", // Droplet
    "🌊", // Water Wave
    
    // Animals
    "🐱", // Cat Face
    "🐶", // Dog Face
    "🦊", // Fox
    "🐼", // Panda
    "🦁", // Lion
    "🐬", // Dolphin
    "🦄", // Unicorn
    
    // Symbols & Special
    "❤️", // Red Heart
    "🧡", // Orange Heart
    "💚", // Green Heart
    "💙", // Blue Heart
    "💜", // Purple Heart
    "🚀", // Rocket
    "👀", // Eyes
    "💀", // Skull
    "🥹", // Face Holding Back Tears
    "🐍", // Snake
    "🐉", // Dragon
    "🐲", // Dragon Face
    "🧙‍♂️", // Wizard 
    "🪄", // Magic Wand 
    "🏴‍☠️", // Pirate Flag
    "🦅", // Eagle (often associated with pirates)
    "🦜", // Parrot (pirate symbol)
    "💻", // Laptop (hacker symbol)
    "🕶️", // Sunglasses (cool guy symbol)
    "🧑‍💻", // Technologist
    "👨‍💻", // Man Technologist
    "👩‍💻", // Woman Technologist
    "🕵️", // Detective
    "🕵️‍♂️", // Man Detective
    "🕵️‍♀️", // Woman Detective
    "🖥️", // Desktop Computer
    "⌨️", // Keyboard
    "🖱️", // Computer Mouse
    "🕹️", // Joystick
    "📱", // Mobile Phone
    "📲", // Mobile Phone with Arrow
    "🔓", // Unlocked (hacker symbol)
    "🔑", // Key (hacker symbol)
    "🗝️", // Old Key (hacker symbol)
    "🛡️", // Shield (hacker symbol)
    "⚔️", // Crossed Swords (hacker symbol)
    "🧬", // DNA (hacker symbol)
    "🧫", // Petri Dish (hacker symbol)
    "🧪", // Test Tube (hacker symbol)
    "🛠️", // Hammer and Wrench (hacker symbol)
    "⚙️", // Gear (hacker symbol)
    "🧰", // Toolbox (hacker symbol)
    "🧲", // Magnet (hacker symbol)
    "💣", // Bomb (hacker symbol)
    "🕳️", // Hole (hacker symbol)
    "📡", // Satellite Antenna (hacker symbol)
    "🛰️", // Satellite (hacker symbol)
    "📞", // Telephone Receiver (hacker symbol)
    "☎️", // Telephone (hacker symbol)
    "📟", // Pager (hacker symbol)
    "📠", // Fax Machine (hacker symbol)
    "🔌", // Electric Plug (hacker symbol)
    "💡", // Light Bulb (hacker symbol)
    "🔦", // Flashlight (hacker symbol)
    "🕯️", // Candle (hacker symbol)
    "🗞️", // Rolled-Up Newspaper (hacker symbol)
    "📜", // Scroll (hacker symbol)
    "📃", // Page with Curl (hacker symbol)
    "📄", // Page Facing Up (hacker symbol)
    "📑", // Bookmark Tabs (hacker symbol)
    "📊", // Bar Chart (hacker symbol)
    "📈", // Chart Increasing (hacker symbol)
    "📉", // Chart Decreasing (hacker symbol)
    "🗂️", // Card Index Dividers (hacker symbol)
    "🗃️", // Card File Box (hacker symbol)
    "🗄️", // File Cabinet (hacker symbol)
    "🗑️", // Wastebasket (hacker symbol)
    "🛢️", // Oil Drum (hacker symbol)
    "🛎️", // Bellhop Bell (hacker symbol)
    "🧳", // Luggage (hacker symbol)
    "🛌", // Person in Bed (hacker symbol)
    "🛏️", // Bed (hacker symbol)
    "🛋️", // Couch and Lamp (hacker symbol)
    "🪑", // Chair (hacker symbol)
    "🚪", // Door (hacker symbol)
    "🧴", // Lotion Bottle (hacker symbol)
    "🧷", // Safety Pin (hacker symbol)
    "🧹", // Broom (hacker symbol)
    "🧺", // Basket (hacker symbol)
    "🧻", // Roll of Paper (hacker symbol)
    "🧼", // Soap (hacker symbol)
    "🧽", // Sponge (hacker symbol)
    "🧯", // Fire Extinguisher (hacker symbol)
    "🛒", // Shopping Cart (hacker symbol)
    "🚬", // Cigarette (hacker symbol)
    "⚰️", // Coffin (hacker symbol)
    "⚱️", // Funeral Urn (hacker symbol)
    "🗿", // Moai (hacker symbol)
    "🛂", // Passport Control (hacker symbol)
    "🛃", // Customs (hacker symbol)
    "🛄", // Baggage Claim (hacker symbol)
    "🛅", // Left Luggage (hacker symbol)
    "🚹", // Men's Room (hacker symbol)
    "🚺", // Women's Room (hacker symbol)
    "🚼", // Baby Symbol (hacker symbol)
    "🚻", // Restroom (hacker symbol)
    "🚮", // Litter in Bin Sign (hacker symbol)
    "🚰", // Potable Water (hacker symbol)
    "🚾", // Water Closet (hacker symbol)
    "🚭", // No Smoking (hacker symbol)
    "🚯", // No Littering (hacker symbol)
    "🚱", // Non-Potable Water (hacker symbol)
];

// Function to render emoji grid
window.emojiLibrary.renderEmojiGrid = function(containerId, onEmojiSelect, filteredList) {
    console.log('Rendering emoji grid to:', containerId);
    
    // Get container by ID
    const container = document.getElementById(containerId);
    if (!container) {
        console.error('Container not found:', containerId);
        return;
    }
    
    // Clear container
    container.innerHTML = '';
    
    // Create emoji grid with enforced styling
    const gridContainer = document.createElement('div');
    gridContainer.className = 'emoji-grid';
    
    // Force grid styling
    gridContainer.style.display = 'grid';
    gridContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(50px, 1fr))';
    gridContainer.style.gap = '8px';
    gridContainer.style.padding = '15px';
    gridContainer.style.maxHeight = '300px';
    gridContainer.style.overflowY = 'auto';
    gridContainer.style.border = '1px solid #ccc';
    gridContainer.style.borderRadius = '4px';
    gridContainer.style.margin = '10px 0';
    
    // Add a message showing we're displaying all emojis
    const fullLibraryNote = document.createElement('div');
    fullLibraryNote.className = 'emoji-grid-note';
    fullLibraryNote.innerHTML = '<i class="fas fa-magic"></i> Click an emoji to automatically copy your hidden message';
    fullLibraryNote.style.padding = '10px';
    fullLibraryNote.style.marginBottom = '10px';
    fullLibraryNote.style.backgroundColor = 'rgba(0,0,0,0.05)';
    fullLibraryNote.style.borderRadius = '4px';
    fullLibraryNote.style.textAlign = 'center';
    container.appendChild(fullLibraryNote);
    
    // Always use full emoji list - search removed
    // Use the provided filtered list if available, otherwise default to full list
    // This ensures we always show ALL emojis regardless of input state
    const emojisToShow = filteredList && filteredList.length > 0 ? filteredList : window.emojiLibrary.EMOJI_LIST;
    console.log(`Adding ${emojisToShow.length} emojis to grid`);
    
    // Add emojis to grid with enforced styling
    emojisToShow.forEach(emoji => {
        const emojiButton = document.createElement('button');
        emojiButton.className = 'emoji-button';
        emojiButton.textContent = emoji; // Use textContent for better emoji handling
        emojiButton.title = 'Click to encode with this emoji';
        
        // Force button styling
        emojiButton.style.fontSize = '24px';
        emojiButton.style.padding = '8px';
        emojiButton.style.border = '1px solid #ddd';
        emojiButton.style.borderRadius = '8px';
        emojiButton.style.cursor = 'pointer';
        emojiButton.style.backgroundColor = '#fff';
        emojiButton.style.transition = 'transform 0.1s';
        
        // Add hover effect
        emojiButton.onmouseover = function() { 
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 0 5px rgba(0,0,0,0.2)';
        };
        emojiButton.onmouseout = function() { 
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        };
        
        emojiButton.addEventListener('click', () => {
            if (typeof onEmojiSelect === 'function') {
                onEmojiSelect(emoji);
                // Add visual feedback when clicked
                emojiButton.style.backgroundColor = '#e6f7ff';
                setTimeout(() => {
                    emojiButton.style.backgroundColor = '#fff';
                }, 300);
            }
        });
        
        gridContainer.appendChild(emojiButton);
    });
    
    container.appendChild(gridContainer);
    console.log('Emoji grid rendering complete');
    
    // Force container to be visible
    container.style.display = 'block !important';
    container.style.visibility = 'visible !important';
    
    // Debug info - add count display
    const countDisplay = document.createElement('div');
    countDisplay.className = 'emoji-count';
    countDisplay.textContent = `${emojisToShow.length} emojis available`;
    container.appendChild(countDisplay);
};
