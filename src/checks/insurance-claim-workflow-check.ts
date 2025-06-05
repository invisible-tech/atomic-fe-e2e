import { BrowserCheck, Frequency } from 'checkly/constructs';

new BrowserCheck('insurance-claim-workflow-check', {
  name: 'Insurance Claim Workflow LLM Validation',
  frequency: Frequency.EVERY_30M,
  code: { entrypoint: './src/insurance-claim-workflow-check-spec.ts' },
  locations: ['us-east-1'],
});