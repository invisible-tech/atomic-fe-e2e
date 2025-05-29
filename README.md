# atomic-fe-e2e

End-to-end (E2E) testing suite for `genesis-fe`. This repository is intended to live independently of the main application and is responsible for running and deploying browser and API checks using [Checkly](https://checklyhq.com).

---

## Purpose

This repository provides a standalone E2E testing framework to:

* Maintain tests separately from the application codebase.
* Integrate Checkly for continuous monitoring and alerting.
* Automate the deployment of updated checks on every push to `main`.

---

## Prerequisites

Ensure the following tools are installed:

* [Bun](https://bun.sh/) (latest version recommended)
* [Node.js](https://nodejs.org/) (only required if you’re using tooling that depends on Node runtime)
* GitHub repository with:

  * `CHECKLY_API_KEY` and `CHECKLY_ACCOUNT_ID` stored in GitHub Secrets.

---

## Initial Setup

1. **Install dependencies:**

   ```bash
   bun install
   ```

2. **Create and populate a `.env` file:**

   Copy the example:

   ```bash
   cp .env.example .env
   ```

   Fill in the required values:

   ```
   CHECKLY_API_KEY=your-checkly-api-key
   ENVIRONMENT_URL=https://staging-or-prod-url-to-test
   ```

---

## Running Tests Locally

* **Run browser and API tests:**

  ```bash
  bunx playwright test
  ```

* **Run specific tests:**

  ```bash
  bunx playwright test path/to/test.spec.ts
  ```

* **View test report (if configured):**

  ```bash
  bunx playwright show-report
  ```

* **Install Playwright Browsers (only needed once):**

  ```bash
  bunx playwright install --with-deps
  ```

---

## Checkly Integration

This repo uses the [Checkly CLI](https://www.checklyhq.com/docs/cli/) to deploy and manage monitoring checks.

### Manual Deployment

You can manually deploy the checks via CLI:

```bash
bunx checkly deploy --force
```

### Validate API credentials

To ensure credentials are set:

```bash
echo $CHECKLY_API_KEY
echo $CHECKLY_ACCOUNT_ID
```

### GitHub Actions

A GitHub Actions workflow is included to automate Checkly deployments on every push to `main`.

**Workflow path:**

```
.github/workflows/checkly.yml
```

**Environment Variables Required (GitHub Secrets):**

* `CHECKLY_API_KEY`
* `CHECKLY_ACCOUNT_ID`

The workflow will:

* Checkout the repository.
* Set up Bun.
* Install dependencies.
* Install Playwright browsers.
* Run tests.
* Deploy tests to Checkly.

---

## Project Structure

```
.
├── src/
│   └── checks/              # Checkly browser/API test definitions
│       └── homepage.check.ts
├── __checks__/              # Playwright test files
│   └── basic.spec.ts
├── .github/
│   └── workflows/
│       └── checkly.yml      # GitHub Actions workflow
├── .env.example             # Template for environment variables
├── bun.lockb                # Bun lockfile
├── checkly.config.ts        # Checkly config (runtime, locations, frequency)
├── package.json
└── tsconfig.json
```

---

## Modifying or Adding Tests

1. Place Checkly checks under `src/checks/`, following the `.check.ts` convention.
2. Place Playwright specs under `__checks__/`, following the `.spec.ts` convention.
3. Frequency, runtime, and tags can be configured in `checkly.config.ts`.

---

## Notes

* This repo **does not include** unit or integration tests for the main app.
* Only E2E and monitoring concerns should live here.
* Checkly CLI version is pinned in `package.json`.

