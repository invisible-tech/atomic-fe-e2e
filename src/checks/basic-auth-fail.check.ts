import { BrowserCheck, Frequency, RetryStrategyBuilder } from 'checkly/constructs'

new BrowserCheck('basic-auth-fail-check', {
  name: '[Atomic] Basic Google Authentication Failure Check',
  activated: true,
  muted: false,
  shouldFail: false,
  runParallel: true,
  locations: [],
  tags: ['atomic'],
  sslCheckDomain: '',
  frequency: Frequency.EVERY_30M,
  code: { entrypoint: './basic-auth-fail.spec.ts' },
  environmentVariables: [],
  retryStrategy: RetryStrategyBuilder.linearStrategy({
	  baseBackoffSeconds: 60,
	  maxRetries: 2,
	  maxDurationSeconds: 600,
	  sameRegion: true,
  }),
})