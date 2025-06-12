import { BrowserCheck, Frequency, RetryStrategyBuilder } from 'checkly/constructs'

new BrowserCheck('basic-llm-check', {
  name: '[Atomic] Basic Google Authentication Check',
  activated: true,
  muted: false,
  shouldFail: false,
  runParallel: true,
  locations: [],
  tags: ['atomic'],
  sslCheckDomain: '',
  frequency: Frequency.EVERY_30M,
  code: { entrypoint: './basic-auth.spec.ts' },
  environmentVariables: [],
  retryStrategy: RetryStrategyBuilder.linearStrategy({
	  baseBackoffSeconds: 60,
	  maxRetries: 2,
	  maxDurationSeconds: 600,
	  sameRegion: true,
  }),
})