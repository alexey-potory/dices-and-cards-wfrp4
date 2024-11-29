
# VTT Foundry Module Starter Template (Typescript + Vite)

This repository is a template for developing VTT Foundry modules using Vite and TypeScript. It provides a streamlined setup for building, packaging, and deploying your modules efficiently. With separate configurations for production and development, along with GitHub Actions for automated releases.

---

## Features

- **Vite + TypeScript**: Modern and fast development environment with support for TypeScript.
- **Single `.js` Output**: Compiles the entire project into a single JavaScript file for easy distribution.
- **Two Vite Configurations**:
  - **Production**: Optimized build with minification.
  - **Development**: Supports development module updates by automatically copying the built module to the VTT Foundry directory for seamless testing.
- **GitHub Actions**:
  - Automatically generates `module.json` and `module.zip` on new releases.
  - Ensures your module is packaged and ready for deployment with minimal effort.

---

## Getting Started

### Prerequisites

1. **Node.js**: Ensure you have Node.js (version 16 or later) installed.
2. **Foundry VTT**: Install and configure Foundry Virtual Tabletop.

---

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/alexey-potory/vite-foundry-project.git
   ```
2. Navigate to the project directory:
   ```bash
   cd vite-foundry-project
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

---

### Configuration

#### Update `module.json`
Edit the `src/module.json` file to configure your module's metadata, including:
- `id`
- `title`
- `description`
- `author`
- `version`
- `esmodules`
- `styles`
- `languages`

---

### Scripts

- **Development Build**:
  ```bash
  npm run dev
  ```
- **Production Build** (minified and optimized with `terser`):
  ```bash
  npm run prod
  ```

---

## Triggering a Release via GitHub Web UI
1. Navigate to your repository on GitHub.
2. Click on the **Releases** tab (usually located under the "Code" tab).
3. Click the **Draft a new release** button.
4. Fill out the release details:
   - Tag version: Enter a version tag (e.g., `v1.0.0`). If the tag doesn't exist yet, GitHub will create it.
   - Release title: Add a title for your release (e.g., `Initial Release`).
   - Description: Optionally, include a description of the changes or features in this release.
5. Scroll down and click **Publish release**.

Once the release is published, the GitHub Actions workflow will automatically:

- Build the module using the production configuration.
- Generate the `module.json` and `module.zip` files.
- Attach the ZIP file to the release.

---

## File Structure

```
├── .github/
│   └── workflows/
│       └── main.yml        # GitHub Actions workflow for releases
├── src/
│   ├── module.json         # Module configuration file
│   └── init.ts             # Main entry point for your module
├── vite.config.js          # Vite config for development
├── vite.config.prod.js     # Vite config for production
├── utils/build-utils.js    # Additional utils for build
├── package.json            # Project dependencies and scripts
└── README.md               # This file
```

---

## Contribution

Feel free to submit issues or pull requests to improve this template. Contributions are welcome and appreciated!

---

## License

This project is licensed under the [MIT License](LICENSE).

---

Happy developing! 🚀