import { BrowserCheck, Frequency, RetryStrategyBuilder } from 'checkly/constructs'

new BrowserCheck('basic-check', {
  name: 'Basic Check',
  frequency: Frequency.EVERY_24H,
  locations: ['us-east-1'],
  code: {
	entrypoint: './basic-check.spec.ts',
  },
  retryStrategy: RetryStrategyBuilder.linearStrategy({
	baseBackoffSeconds: 60,
	maxRetries: 2,
	maxDurationSeconds: 600,
	sameRegion: true,
  }),
})
