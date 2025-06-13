import { BrowserCheck, Frequency, RetryStrategyBuilder } from 'checkly/constructs'

new BrowserCheck('process-creation-check', {
  name: '[Atomic] Process Creation Check',
  activated: true,
  muted: false,
  shouldFail: false,
  runParallel: true,
  locations: [],
  tags: ['atomic'],
  sslCheckDomain: '',
  frequency: Frequency.EVERY_30M,
  code: { entrypoint: './process-creation.spec.ts' },
  environmentVariables: [],
  retryStrategy: RetryStrategyBuilder.linearStrategy({
	  baseBackoffSeconds: 60,
	  maxRetries: 2,
	  maxDurationSeconds: 600,
	  sameRegion: true,
  }),
})
