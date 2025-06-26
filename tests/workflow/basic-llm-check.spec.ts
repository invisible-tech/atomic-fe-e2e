import { expect, test } from '@playwright/test';

test('LLM validation with expected/actual comparison', async ({ request }) => {
  const llmCheckUrl = 'https://script.google.com/macros/s/AKfycbyU1ev45sxhYSgNxdxSrkZvt3Su1bvbxL55xoXtZQ5OhZxsecBL56ELuNPeDaCgNyx07g/exec';

  const expected = {
    reasoning: "To ensure safe machine shutdown, it's essential to follow a sequence that guarantees zero energy state...",
    workflow: {
      stages: [
        {
          id: "stage-1",
          icon: "power",
          name: "Shutdown Preparation",
          description: "Prepare machine for shutdown by notifying personnel and checking conditions.",
        },
      ],
      steps: [
        {
          id: "step-1",
          step_template: {
            id: "shutdown-101",
            icon: "bell-off",
            name: "Notify personnel",
            description: "Notify all personnel in the vicinity.",
            type: "communication",
          },
          name: "Notify Team",
          stage_id: "stage-1",
        },
      ],
      edges: [],
    },
    assistant_response: "I've created a structured shutdown workflow...",
  };

  const actual = {
    reasoning: "This workflow is designed to onboard a new employee efficiently by assigning tasks and collecting documentation.",
    workflow: {
      stages: [
        {
          id: "onboarding-1",
          icon: "user-plus",
          name: "Document Collection",
          description: "Collect necessary employment documents.",
        },
      ],
      steps: [
        {
          id: "step-onboard-1",
          step_template: {
            id: "onboard-template-1",
            icon: "file-text",
            name: "Collect ID",
            description: "Request employee ID and tax forms.",
            type: "document",
          },
          name: "Collect Documents",
          stage_id: "onboarding-1",
        },
      ],
      edges: [],
    },
    assistant_response: "Here's the onboarding workflow. Let me know if you want to assign tasks to HR.",
  };

  const payload = {
    expected: JSON.stringify(expected, null, 2),
    actual: JSON.stringify(actual, null, 2),
  };

  const llmResponse = await request.post(llmCheckUrl, {
    data: payload,
    headers: { 'Content-Type': 'application/json' },
  });

  expect(llmResponse.status()).toBe(200);

  const llmJson = await llmResponse.json();
  console.log("LLM Check Result:", llmJson);

  expect(llmJson.score).toBe(2);
});
