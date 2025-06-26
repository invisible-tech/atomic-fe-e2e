import { test, expect } from '@playwright/test';
import { assertProcessBuilderOutput } from '../asserts/assertProcessBuilderOutput';

test('TC0001 - Create workflow via natural language prompt', async ({ page }) => {
  // Step 1: Ensure user is logged in and on the dashboard
  await page.goto('/dashboard');
  await expect(page.getByRole('heading', { name: 'Processes' })).toBeVisible();

  // Step 2: Click "Start new" and "Start building"
  await page.getByText('Start new').click();
  await page.getByText('Start building').click();

  // Step 3: Wait for assistant input to appear and fill prompt
  const assistantTextarea = page.locator('textarea[placeholder="Type a message..."]');
  await assistantTextarea.waitFor({ state: 'visible', timeout: 15000 });

  const prompt = 'Create a workflow for insurance claim processing';
  await assistantTextarea.fill(prompt);

  const sendButton = page.locator('button[type="submit"][aria-label="Send message"]');
  await expect(sendButton).toBeEnabled();
  await sendButton.click();

  // Step 4: Wait for the assistant to finish generating
  await page.getByRole('button', { name: 'Accept' }).waitFor({ state: 'visible', timeout: 40000 });


  // Step 5: Extract all stage names from rendered canvas
  const rawStages = await page.locator('.truncate.font-semibold').allInnerTexts();
  const stageNames = rawStages.map(text => text.trim());

  // Debug output
  console.log('[Extracted Stage Names]', stageNames);

  // Step 6: Custom assertion logic using AI evaluator + stage check
  await assertProcessBuilderOutput({
    prompt,
    outputStages: stageNames,
    outputConnections: [], // Leave empty unless parsing connections from canvas
    expected: {
      minStages: 3,
      requiredStages: ['Intake', 'Normalize & Extract', 'Validate & Lookup', 'Analyze & Enrich'],
      semanticExpectation: 'A workflow for insurance claim processing including intake, data normalization, validation, and analysis',
      llmMinScore: 4
    }
  });
});
