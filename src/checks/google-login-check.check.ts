import { BrowserCheck, Frequency, RetryStrategyBuilder } from 'checkly/constructs'

new BrowserCheck('google-login-check', {
  name: 'Google Login Check',
  frequency: Frequency.EVERY_24H,
  locations: ['us-east-1'],
  code: {
    entrypoint: './google-login-check.spec.ts',
  },
  retryStrategy: RetryStrategyBuilder.linearStrategy({
    baseBackoffSeconds: 60,
    maxRetries: 2,
    maxDurationSeconds: 600,
    sameRegion: true,
  }),
})
