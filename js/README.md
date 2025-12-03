# JavaScript Directory Structure

## Core Modules (`js/core/`)

- `decoder.js` - Universal decoder for automatic encoding detection
- `steganography.js` - Emoji and invisible text steganography
- `emojiLibrary.js` - Emoji search, filtering, and library functions
- `toolRegistry.js` - Tool registration and Vue data/method merging

## Utilities (`js/utils/`)

- `clipboard.js` - `ClipboardUtils.copy()` - Clipboard API wrapper
- `focus.js` - `FocusUtils.focusWithoutScroll()`, `clearFocusAndSelection()`
- `history.js` - `HistoryUtils` - Copy history management
- `notifications.js` - `NotificationUtils` - Toast notifications
- `theme.js` - `ThemeUtils` - Dark/light theme management
- `escapeParser.js` - Escape sequence parsing

## Tools (`js/tools/`)

Tool classes extending `Tool` base class. Auto-discovered by `build/inject-tool-scripts.js`.

## Data (`js/data/`)

- `emojiData.js` - Generated emoji data (build output)
- `emojiCompatibility.js` - Emoji compatibility mappings

## Bundles (`js/bundles/`)

- `transforms-bundle.js` - Bundled transformer modules (build output)

## Load Order

1. Data files (emojiData, emojiCompatibility)
2. Generated bundles (transforms-bundle)
3. Utilities (escapeParser, focus, notifications, history, clipboard, theme)
4. Core modules (steganography, decoder, emojiLibrary)
5. Tool system (Tool.js, *Tool.js files, toolRegistry)
6. Main app (app.js)
