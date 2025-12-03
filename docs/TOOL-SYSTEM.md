# Tool System - Build-Time Template Injection

## Architecture

- **Templates**: Separate `.html` files in `templates/` directory
- **Build Process**: Injected into `index.html` at build time
- **Result**: Single static HTML file (fast loading, no HTTP requests)

## File Structure

```
├── index.template.html      # Base shell
├── index.html               # Generated (templates injected)
├── templates/               # Edit HTML here
│   ├── decoder.html
│   ├── steganography.html
│   └── ...
├── js/tools/               # Tool classes (logic)
│   ├── Tool.js            # Base class
│   └── *Tool.js           # Auto-discovered
└── build/
    └── inject-tool-templates.js
```

## Creating a New Tool

### 1. Create Tool Class

`js/tools/MyTool.js`:
```javascript
class MyTool extends Tool {
    constructor() {
        super({
            id: 'mytool',
            name: 'My Tool',
            icon: 'fa-star',
            title: 'Description',
            order: 10
        });
    }
    
    getVueData() {
        return { myInput: '', myOutput: '' };
    }
    
    getVueMethods() {
        return {
            processInput() {
                this.myOutput = this.myInput.toUpperCase();
            }
        };
    }
}
```

### 2. Create Template

`templates/mytool.html`:
```html
<div v-if="activeTab === 'mytool'" class="tab-content">
    <div class="transform-layout">
        <textarea v-model="myInput" @input="processInput"></textarea>
        <div v-if="myOutput">{{ myOutput }}</div>
    </div>
</div>
```

### 3. Build

```bash
npm run build:tools      # Auto-discovers and registers tool
npm run build:templates  # Injects template into index.html
```

## How It Works

1. **Development**: Edit templates in `templates/*.html`
2. **Build**: `inject-tool-templates.js` reads templates and injects into `index.template.html`
3. **Output**: Complete `index.html` with all templates embedded
4. **Browser**: Vue compiles templates at page load (already in DOM)
