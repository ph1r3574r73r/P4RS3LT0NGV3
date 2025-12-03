# Contributing to P4RS3LT0NGV3

Thank you for your interest in contributing! This guide will help you understand the project structure and how to add new features.

## 📁 Project Structure

```
P4RS3LT0NGV3/
├── js/
│   ├── app.js              # Main Vue.js application entry point
│   ├── core/                # Core feature modules (shared libraries)
│   │   ├── decoder.js      # Universal decoder
│   │   ├── emojiLibrary.js  # Emoji library functions
│   │   ├── steganography.js # Steganography encoding/decoding
│   │   └── toolRegistry.js  # Tool registry system
│   ├── bundles/             # Build-generated files
│   │   └── transforms-bundle.js  # Generated bundle from src/transformers/
│   ├── config/              # Configuration constants
│   │   └── constants.js
│   ├── data/                # Generated or static data files
│   │   ├── emojiData.js
│   │   └── emojiCompatibility.js
│   ├── utils/               # Utility functions
│   │   ├── clipboard.js
│   │   ├── escapeParser.js
│   │   ├── focus.js
│   │   ├── history.js
│   │   ├── notifications.js
│   │   └── theme.js
│   └── tools/               # Tool implementations (Vue integration)
│       ├── Tool.js          # Base class
│       ├── TransformTool.js
│       ├── DecodeTool.js
│       ├── EmojiTool.js
│       ├── TokenadeTool.js
│       ├── MutationTool.js
│       ├── TokenizerTool.js
│       ├── SplitterTool.js
│       └── GibberishTool.js
├── src/
│   ├── emojiWordMap.js      # Emoji keyword mappings (source file for build)
│   └── transformers/        # Transformer modules (source)
│       ├── BaseTransformer.js
│       ├── fantasy/
│       ├── text-formatting/
│       └── ...
├── templates/               # HTML templates for tools (injected at build time)
│   ├── decoder.html
│   ├── steganography.html
│   ├── transforms.html
│   ├── tokenade.html
│   ├── fuzzer.html
│   ├── tokenizer.html
│   ├── splitter.html
│   └── gibberish.html
├── build/                   # Build scripts
│   ├── build-transforms.js
│   ├── build-emoji-data.js
│   └── inject-tool-templates.js
├── tests/                   # Test suites
│   ├── test_universal.js
│   └── test_steganography_options.js
└── docs/                    # Documentation
```

## 🎯 Key Concepts

### Core vs Tools

- **`js/core/`** - Shared business logic and infrastructure
  - These are **NOT** tool-specific
  - Examples: 
    - `decoder.js` (used by DecodeTool + app.js)
    - `steganography.js` (used by EmojiTool + decoder.js)
    - `emojiLibrary.js` (used by EmojiTool)
    - `toolRegistry.js` (ToolRegistry class - infrastructure for the tool system)
  
- **Source files** (`src/`) - Source files used by build process
  - `emojiWordMap.js` - Emoji keyword mappings (merged into emojiData.js during build)
  - `transformers/` - Transformer modules (bundled into transforms-bundle.js)
  
- **Generated files** (`js/bundles/`)
  - `transforms-bundle.js` - Generated bundle from `src/transformers/` (created by `npm run build:transforms`)
  
- **`js/tools/`** - Vue.js integration layer for UI features
  - Each tool represents a tab/feature in the UI
  - Tools use core modules and utilities for functionality
  - Example: `DecodeTool.js` uses `window.universalDecode` from `core/decoder.js`

### Transformers vs Tools

- **Transformers** (`src/transformers/`) - Text transformation logic (encoding/decoding)
- **Tools** (`js/tools/`) - UI features/tabs (Transform tab, Decoder tab, Emoji tab)

## 🚀 Getting Started

### Prerequisites

- Node.js (for running tests and builds)
- Modern web browser (for testing)

### Setup

```bash
# Clone the repository
git clone <repo-url>
cd P4RS3LT0NGV3

# Install dependencies (if any)
npm install

# Build transformers bundle
npm run build

# Run tests
npm test
```

## ✨ Adding New Features

### 1. Adding a New Transformer

Transformers are the core text transformation logic. See `src/transformers/README.md` for detailed instructions.

**Quick Start:**

1. Create a new file in the appropriate category directory:
   ```bash
   src/transformers/ciphers/my-cipher.js
   ```

2. Use the `BaseTransformer` class:
   ```javascript
   import BaseTransformer from '../BaseTransformer.js';
   
   export default new BaseTransformer({
       name: 'My Cipher',
       priority: 60,              // See priority guide in transformers/README.md
       category: 'ciphers',
       func: function(text) {
           // Encoding logic
           return encoded;
       },
       reverse: function(text) {
           // Decoding logic
           return decoded;
       },
       detector: function(text) {
           // Optional: pattern detection for universal decoder
           return /pattern/.test(text);
       }
   });
   ```

3. Rebuild the bundle:
   ```bash
   npm run build
   ```

4. Test it:
   - Open `index.html` in a browser
   - Your transformer will appear in the Transform tab automatically
   - Test encoding/decoding
   - Test with the Universal Decoder

5. Add tests (optional but recommended):
   - Add test cases to `tests/test_universal.js`
   - Run `npm test` to verify

**Important:** Transformers are automatically discovered and bundled. No manual registration needed!

### 2. Adding a New Tool (New Tab/Feature)

Tools represent UI features/tabs. Examples: Transform tab, Decoder tab, Emoji tab.

**Steps:**

1. Create a new tool class in `js/tools/`:
   ```javascript
   // js/tools/MyNewTool.js
   class MyNewTool extends Tool {
       constructor() {
           super({
               id: 'myfeature',        // Unique ID (used for tab switching)
               name: 'My Feature',     // Display name
               icon: 'fa-star',        // Font Awesome icon class
               title: 'My Feature (M)', // Tooltip with keyboard shortcut
               order: 5                // Display order (lower = earlier)
           });
       }
       
       getVueData() {
           return {
               // Vue data properties for this tool
               myInput: '',
               myOutput: ''
           };
       }
       
       getVueMethods() {
           return {
               // Vue methods for this tool
               doSomething: function() {
                   // Your logic here
               }
           };
       }
       
       getTabContentHTML() {
           return `
               <!-- HTML template for this tool's tab -->
               <div class="my-feature-layout">
                   <textarea v-model="myInput"></textarea>
                   <div>{{ myOutput }}</div>
               </div>
           `;
       }
   }
   ```

2. Run the build script to auto-register your tool:
   ```bash
   npm run build:tools
   ```
   
   This will:
   - Auto-discover your new tool file
   - Add script tag to `index.template.html`
   - Generate registration code in `toolRegistry.js`

3. If you created a template file, build templates:
   ```bash
   npm run build:templates
   ```

4. Test it:
   - Open `index.html`
   - Your new tab should appear automatically
   - Test all functionality

**See `js/tools/Tool.js` for the base class API and `js/tools/TransformTool.js` for a complete example.**

### 3. Adding a New Utility Function

Utilities are shared helper functions used across the app. Currently, utility functions are typically added directly to the modules that need them or as part of core modules.

**If you need to create a new utility module:**

1. Create a new file in `js/` (root level) or `js/core/`:
   ```javascript
   // js/myUtility.js
   window.MyUtility = {
       doSomething: function(param) {
           // Your utility function
           return result;
       }
   };
   ```

2. Add script tag to `index.html` (before `app.js`):
   ```html
   <script src="js/myUtility.js"></script>
   ```

3. Use it in your code:
   ```javascript
   window.MyUtility.doSomething(value);
   ```

**Guidelines:**
- Keep utilities pure (no side effects when possible)
- Use `window` namespace for browser compatibility
- Document with JSDoc comments
- Consider adding to existing modules if functionality is related

**Note:** The `js/utils/` directory contains utility functions: clipboard, escapeParser, focus, history, notifications, and theme. The `js/config/` directory contains configuration constants.

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run specific test suite
npm run test:universal      # Universal decoder tests
npm run test:steg           # Steganography options tests
```

### Writing Tests

- **Transformer tests**: Add to `tests/test_universal.js`
  - Tests are automatically discovered
  - Add limitations/expected behavior to the `limitations` object if needed
  
- **Steganography tests**: Add to `tests/test_steganography_options.js`
  - Tests encoding/decoding round-trips with various option combinations

- **New test files**: Create in `tests/` directory
  - Use `path.resolve(__dirname, '..')` to get project root
  - Use `path.join(projectRoot, '...')` for file paths

## 📝 Code Style

### JavaScript

- Use ES6+ features (arrow functions, const/let, template literals)
- Use meaningful variable names
- Add JSDoc comments for public functions
- Follow existing code style in the file you're editing

### File Organization

- **Core modules** (`js/core/`) - Shared business logic (e.g., `decoder.js`)
- **Root-level modules** (`js/`) - Feature libraries (e.g., `steganography.js`, `emojiLibrary.js`)
- **Tools** (`js/tools/`) - Vue.js UI integration layer
- **Templates** (`templates/`) - HTML templates for tools (injected at build time)
- **Transformers** (`src/transformers/`) - Text transformation logic
- **Bundles** (`js/bundles/`) - Build-generated files

### Naming Conventions

- **Files**: `camelCase.js` for utilities/tools, `kebab-case.js` for transformers
- **Classes**: `PascalCase` (e.g., `DecodeTool`)
- **Functions**: `camelCase` (e.g., `runUniversalDecode`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `MAX_HISTORY_ITEMS`)

## 🔧 Build Process

### Building Templates

```bash
npm run build:templates
```

This:
1. Reads all `.html` files from `templates/` directory
2. Injects them into `index.html` at the `#tool-content-container` marker
3. Creates a single static HTML file for fast loading

**When to run:**
- After editing any template in `templates/`
- Before committing template changes

**Note:** Transformers are loaded from `js/bundles/transforms-bundle.js` which may be pre-built or generated separately.

## 🐛 Debugging

### Common Issues

1. **Template changes not showing**: Run `npm run build:templates` to inject templates into `index.html`
2. **Tool not showing**: Check that:
   - Tool is registered in `js/core/toolRegistry.js`
   - Script tag is in `index.html` before `app.js`
   - Template file exists in `templates/` directory
3. **Tests failing**: Check file paths use `path.join(projectRoot, '...')`

### Browser Console

- Open browser DevTools (F12)
- Check console for errors
- Use `window.transforms` to see all transformers
- Use `window.steganography` to access steganography functions
- Use `window.emojiLibrary` to access emoji functions

## 📚 Documentation

- **Project README**: `README.md` - Overview and user guide
- **Templates**: `templates/README.md` - How to edit tool templates
- **Build Process**: `build/README.md` - Build script documentation
- **Tool System**: `docs/TOOL-SYSTEM.md` - Tool architecture details
- **Code Review**: `docs/CODE-REVIEW.md` - Architecture and code review guidelines

## ✅ Checklist Before Submitting

- [ ] Code follows existing style
- [ ] Tests pass (`npm test`)
- [ ] Templates built (`npm run build:templates`) if template files were edited
- [ ] Tested in browser (open `index.html`)
- [ ] No console errors
- [ ] Documentation updated (if needed)
- [ ] JSDoc comments added (for new functions)

## 🤝 Questions?

- Check existing code for examples
- Review `docs/CODE_REVIEW.md` for architecture details
- Look at similar features to understand patterns

Thank you for contributing! 🎉

