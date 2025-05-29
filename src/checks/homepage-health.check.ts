import { BrowserCheck, Frequency } from 'checkly/constructs'

new BrowserCheck('homepage-health-check', {
  name: 'Homepage Health Check',
  frequency: Frequency.EVERY_30M,
  code: { entrypoint: './basic-check.spec.ts' },
  locations: ['us-east-1']
})
