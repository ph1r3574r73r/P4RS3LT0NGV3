# Build Scripts

## Scripts

### `build-transforms.js`
Bundles all transformers from `src/transformers/` into `js/bundles/transforms-bundle.js`

```bash
npm run build:transforms
```

### `build-emoji-data.js`
Fetches Unicode emoji data and generates `js/data/emojiData.js`

```bash
npm run build:emoji
```

### `inject-tool-scripts.js`
Auto-discovers tools in `js/tools/` and:
- Generates script tags in `index.template.html`
- Generates auto-registration code in `js/core/toolRegistry.js`

```bash
npm run build:tools
```

### `inject-tool-templates.js`
Injects tool templates from `templates/` into `index.html`

```bash
npm run build:templates
```

### `build-index.js`
Generates transformer index

```bash
npm run build:index
```

## Build Pipeline

```bash
npm run build  # Runs all scripts in order:
# 1. build:index
# 2. build:transforms
# 3. build:emoji
# 4. build:tools
# 5. build:templates
```

## Development Workflow

- **Edit transformers** → `npm run build:transforms`
- **Add new tool** → `npm run build:tools`
- **Edit templates** → `npm run build:templates`
- **Full rebuild** → `npm run build`
