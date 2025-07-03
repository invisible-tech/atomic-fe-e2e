import { BrowserCheck, Frequency, RetryStrategyBuilder } from 'checkly/constructs'

new BrowserCheck('TC0001-Natural-Language-Workflow-check', {
  name: '[Atomic] TC0001 Natural Language Workflow',
  activated: true,
  muted: false,
  shouldFail: false,
  runParallel: true,
  locations: [],
  tags: ['atomic'],
  sslCheckDomain: '',
  frequency: Frequency.EVERY_24H,
  code: { entrypoint: './TC0001-natural-language-workflow.spec.ts' },
  environmentVariables: [],
  retryStrategy: RetryStrategyBuilder.linearStrategy({
	  baseBackoffSeconds: 60,
	  maxRetries: 2,
	  maxDurationSeconds: 600,
	  sameRegion: true,
  }),
})
