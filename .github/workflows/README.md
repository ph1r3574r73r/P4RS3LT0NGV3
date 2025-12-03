# GitHub Actions Workflows

## `deploy.yml` - Automated GitHub Pages Deployment

This workflow automatically builds and deploys the project to GitHub Pages whenever changes are pushed to the `main` or `master` branch.

### What it does:

1. **Build Stage:**
   - Checks out the repository
   - Sets up Node.js (v18)
   - Installs dependencies with `npm ci`
   - Runs `npm run build` which:
     - Builds transformer index (`build-index.js`)
     - Bundles all transformers (`build-transforms.js`)
     - Generates emoji data (`build-emoji-data.js`)
     - Injects tool scripts (`inject-tool-scripts.js`)
     - Injects tool templates into `index.html` (`inject-tool-templates.js`)
   - Uploads the entire project as a Pages artifact

2. **Deploy Stage:**
   - Deploys the artifact to GitHub Pages
   - Makes the site available at your GitHub Pages URL

### Manual Deployment

You can also trigger a deployment manually from the GitHub Actions tab by selecting "Build and Deploy to GitHub Pages" and clicking "Run workflow".

### Required GitHub Settings

For this workflow to function, ensure GitHub Pages is configured in your repository settings:

1. Go to **Settings** → **Pages**
2. Under **Build and deployment**:
   - Source: **GitHub Actions**
3. Save the settings

The site will be available at: `https://<username>.github.io/<repository-name>/`

### Troubleshooting

- **Build fails**: Check the Actions tab for error logs
- **Missing templates**: Ensure all templates exist in `templates/` directory
- **Test locally first**: Run `npm run build:templates` before pushing to catch errors early
- **Verify build output**: Check that `index.html` contains injected templates after build

### Workflow Triggers

- **Push**: Automatically runs on push to `main` or `master`
- **Workflow Dispatch**: Can be manually triggered from the Actions tab

