import { test, expect } from '@playwright/test';
import { assertProcessBuilderOutput } from '../asserts/assertProcessBuilderOutput';

const llmCheckUrl =
  'https://script.google.com/macros/s/AKfycbyU1ev45sxhYSgNxdxSrkZvt3Su1bvbxL55xoXtZQ5OhZxsecBL56ELuNPeDaCgNyx07g/exec';

test('Insurance Claim Workflow LLM Validation', async ({ page }) => {
  const prompt = 'Create a workflow for insurance claim processing';

  await page.goto('https://genesis.inv.tech/dashboard');
  const input = page.locator('[data-testid="assistant-input"]');
  await input.fill(prompt);
  await page.keyboard.press('Enter');

  const stageEls = page.locator('[data-testid="canvas-stage-title"]');
  await expect(stageEls.first()).toBeVisible({ timeout: 10000 });

  const stageTitles = await stageEls.allTextContents();

  const edges = await page.evaluate(() => {
    const arrows = Array.from(document.querySelectorAll('[data-connection-from]'));
    return arrows.map(el => [
      el.getAttribute('data-connection-from') ?? '',
      el.getAttribute('data-connection-to') ?? '',
    ]);
  });

  await assertProcessBuilderOutput({
    prompt,
    outputStages: stageTitles,
    outputConnections: edges,
    expected: {
      minStages: 3,
      requiredStages: ['Intake', 'Analysis'],
      requiredConnections: [['Intake', 'Normalize'], ['Normalize', 'Analysis']],
      semanticExpectation: 'Insurance processing must include Intake, Validation, and Analysis.',
      llmCheckUrl,
      llmMinScore: 4,
    },
  });
});