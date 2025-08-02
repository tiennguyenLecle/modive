# Modive - A Modern Next.js Application

This is a comprehensive Next.js project designed with modern best practices, including internationalization, theming, and a robust development environment.

## Quick Start

Follow these steps to get the project up and running on your local machine.

1.  **Install Dependencies:**
    This project uses `pnpm` as the package manager.

    ```bash
    pnpm install
    ```

2.  **Setup Environment Variables:**
    You need to set up environment variables to run the application properly.

    ```bash
    # Copy the example environment file
    cp .env.example .env
    ```

    **Important:** Contact **"tiennguyen"** to get the required environment variable values for your `.env` file. The application may not work correctly without proper environment configuration.

3.  **Setup VS Code Settings:**
    This project includes recommended VS Code settings for consistency. To use them, create a local copy of the settings file.

    ```bash
    # Copy the example settings file
    cp .vscode/settings.json.example .vscode/settings.json
    ```

    Your local `.vscode/settings.json` is ignored by Git, so you can customize it as needed without affecting other collaborators.

4.  **Run the Development Server:**
    Start the Next.js development server.

    ```bash
    pnpm dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development Workflow

To maintain code quality and consistency, please use the following scripts after making changes.

- **Type Checking:**
  Verifies TypeScript types across the project.

  ```bash
  pnpm type-check
  ```

- **Linting:**
  Finds and fixes problems in your code based on our ESLint configuration.

  ```bash
  pnpm lint
  ```

- **Formatting:**
  Automatically formats code using Prettier to ensure a consistent style.

  ```bash
  pnpm format
  ```

- **Building for Production:**
  Compiles and optimizes the application for production. This is a good way to check for build errors before committing.
  ```bash
  pnpm build
  ```

## 🧪 Testing

This project uses [Playwright](https://playwright.dev/) for End-to-End (E2E) testing. This allows us to simulate real user interactions in a browser to verify application behavior, including UI logic, SEO metadata, and internationalization.

### Running Tests

To run the entire test suite, use the following command:

```bash
pnpm test:e2e
```

This command will automatically:

1. Start the Next.js development server.
2. Wait for the server to be ready.
3. Run all tests in the `tests/` directory across Chromium, Firefox, and WebKit.
4. Shut down the server after the tests are complete.

### Test Structure

- **Configuration:** The main configuration is located in `playwright.config.ts`. It's set up to automatically handle the development server.
- **Test Files:** Test files are located in the `tests/` directory and should end with `.spec.ts`.

### Viewing Test Reports

After running the tests, a detailed HTML report will be generated in the `playwright-report/` directory. To view it, run:

```bash
pnpm exec playwright show-report
```

## Key Technologies & Notes

This project leverages several key technologies to provide a modern development experience.

- **Styling:**
  - **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
  - **SCSS:** Used within CSS Modules (`*.module.scss`) for structured, component-scoped styles.

- **Internationalization (i18n):**
  - **`next-intl`:** Handles routing, message loading, and translations. Language files are located in the `/messages` directory.

- **Theming (Dark/Light Mode):**
  - **`next-themes`:** Manages theme switching and persists user preferences. Theming is configured via Tailwind's `darkMode: 'class'` strategy.

## Recommended VS Code Extensions

To get the best development experience, we highly recommend installing the following Visual Studio Code extensions:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

## Project Structure

A brief overview of the key directories in this project:

- **/src/app**: Contains all aplication routes, following the Next.js App Router structure.
- **/src/components**: Reusable UI components (e.g., `Spinner`, `ThemeSwitcher`).
- **/src/lib**: Houses core library files and "registry" components (e.g., `theme-registry`, `antd-registry`).
- **/src/styles**: Global styles and font configurations.
- **/messages**: Contains JSON files for translations used by `next-intl`.

## Architectural Notes

This project contains important architectural patterns that are documented to help developers understand key decisions.

- **Middleware**: Handles request processing for internationalization and authentication. For a detailed explanation, see the [Middleware Documentation](./docs/middleware.md).
- **API Client**: Manages communication with external and internal APIs. For a detailed explanation, please see the [API Client Documentation](./src/lib/api/README.md).

---

This README was generated by @tiennguyen with the help of an AI assistant.
