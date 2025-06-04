import { BrowserCheck, Frequency } from 'checkly/constructs'

new BrowserCheck('basic-llm-check', {
  name: 'Basic LLM + Homepage Check',
  frequency: Frequency.EVERY_30M,
  code: { entrypoint: './basic-llm-check.spec.ts' },
  locations: ['us-east-1'],
})
