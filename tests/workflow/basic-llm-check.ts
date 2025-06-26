import { BrowserCheck, Frequency, RetryStrategyBuilder } from 'checkly/constructs'

new BrowserCheck('basic-llm-check', {
  name: '[Atomic] Basic LLM + Homepage Check',
  activated: true,
  muted: false,
  shouldFail: false,
  runParallel: true,
  locations: [],
  tags: ['atomic'],
  sslCheckDomain: '',
  frequency: Frequency.EVERY_24H,
  code: { entrypoint: './basic-llm-check.spec.ts' },
  environmentVariables: [],
  locations: ['us-east-1'],
  retryStrategy: RetryStrategyBuilder.linearStrategy({
      baseBackoffSeconds: 60,
      maxRetries: 2,
      maxDurationSeconds: 600,
      sameRegion: true,
  }),
})