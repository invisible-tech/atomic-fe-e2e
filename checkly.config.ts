import 'dotenv/config'
import { defineConfig } from 'checkly'
import { Frequency } from 'checkly/constructs'


/*
  These default Checkly settings should work for most projects.
  Feel free to tweak the settings to fit your team’s objectives.
*/

// Checkly runtime version — controls Node/browser/Playwright env.
// Change only if needed for new runtime features. Docs: https://checklyhq.com/docs/runtimes
const CHECKLY_RUNTIME = '2025.04'

export default defineConfig({
  projectName: "atomic-fe-e2e Monitoring", // Display name in Checkly
  logicalId: "atomic-fe-e2e_monitoring",   // Unique internal project ID
  repoUrl: "https://github.com/invisible-tech/atomic-fe-e2e", // The E2E test repo itself

  checks: {
    activated: true,
    muted: false,
    runtimeId: CHECKLY_RUNTIME,
    frequency: Frequency.EVERY_10M, // API checks every 10m
    locations: ['us-east-1', 'us-west-1'],
    checkMatch: '**/tests/**/*.check.ts', // API checks path

    browserChecks: {
      frequency: Frequency.EVERY_30M, // UI checks every 30m
      testMatch: '**/src/checks/**/*.spec.ts'  // UI checks path
    }
  },

  cli: {
    runLocation: 'us-east-1'
  }
})
