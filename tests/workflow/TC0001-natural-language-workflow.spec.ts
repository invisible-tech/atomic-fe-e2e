import { test } from '@playwright/test';
import { DashboardPage } from '../../src/pages/dashboardPage';
import { BuilderPage } from '../../src/pages/builderPage';
import { assertProcessBuilderOutput } from '../../src/asserts/assertProcessBuilderOutput';
import { env } from '../../src/utils/env';

test('TC0001 - Create workflow via natural language prompt', async ({ page }) => {
  const dashboard = new DashboardPage(page);
  const builder = new BuilderPage(page);

  // Navigate to builder
  await dashboard.open();
  await dashboard.clickStartNew();
  await dashboard.clickStartBuilding();

  // Create workflow
  await builder.enterPrompt('Create a workflow for insurance claim processing');
  await builder.sendMessage();
  await builder.waitForAcceptButton();

  // Validate output
  const stageNames = await builder.getStageTitles();
  await assertProcessBuilderOutput({
    prompt: 'Create a workflow for insurance claim processing',
    outputStages: stageNames,
    outputConnections: [],
    expected: {
      minStages: 3,
      requiredStages: ['Intake', 'Normalize & Extract', 'Validate & Lookup', 'Analyze & Enrich'],
      semanticExpectation: 'A workflow for insurance claim processing including intake, data normalization, validation, and analysis',
      llmCheckUrl: env.LLM_CHECK_URL,
      llmMinScore: 4
    }
  });
});