// src/utils/__tests__/llmCompare.test.ts
import { describe, it, expect } from 'vitest';
import { llmCompare } from '../llmCompare';

function wrap(json: object): string {
  return JSON.stringify(json, null, 2);
}

describe('llmCompare – realistic LLM output scoring cases', () => {
  it('score 2 – completely different workflows', async () => {
    const expected = wrap({
      reasoning: "To ensure safe machine shutdown...",
      workflow: {
        stages: [
          {
            id: "stage-1",
            icon: "power",
            name: "Shutdown Preparation",
            description: "Prepare machine for shutdown.",
          },
        ],
        steps: [
          {
            id: "step-1",
            step_template: {
              id: "shutdown-101",
              icon: "bell-off",
              name: "Notify personnel",
              description: "Notify all personnel.",
              type: "communication",
            },
            name: "Notify Team",
            stage_id: "stage-1",
          },
        ],
        edges: [],
      },
      assistant_response: "I've created a structured shutdown workflow.",
    });

    const actual = wrap({
      reasoning: "This workflow is designed to onboard a new employee...",
      workflow: {
        stages: [
          {
            id: "onboarding-1",
            icon: "user-plus",
            name: "Document Collection",
            description: "Collect employment documents.",
          },
        ],
        steps: [
          {
            id: "step-onboard-1",
            step_template: {
              id: "onboard-template-1",
              icon: "file-text",
              name: "Collect ID",
              description: "Request ID and tax forms.",
              type: "document",
            },
            name: "Collect Documents",
            stage_id: "onboarding-1",
          },
        ],
        edges: [],
      },
      assistant_response: "Here's the onboarding workflow.",
    });

    const score = await llmCompare(expected, actual);
    expect(score).toBe(2);
  });

  it('score 5 – near-identical workflow', async () => {
    const expected = wrap({
      reasoning: "Initiate safe shutdown by alerting personnel and disabling power.",
      workflow: {
        stages: [
          {
            id: "stage-1",
            icon: "power",
            name: "Shutdown Preparation",
            description: "Alert personnel and check systems.",
          },
        ],
        steps: [
          {
            id: "step-1",
            step_template: {
              id: "shutdown-101",
              icon: "bell-off",
              name: "Notify personnel",
              description: "Notify all personnel in the area.",
              type: "communication",
            },
            name: "Notify Team",
            stage_id: "stage-1",
          },
        ],
        edges: [],
      },
      assistant_response: "Here's the shutdown workflow you asked for.",
    });

    const actual = wrap({
      reasoning: "Initiate safe shutdown by alerting personnel and disabling power.",
      workflow: {
        stages: [
          {
            id: "stage-1",
            icon: "power",
            name: "Shutdown Preparation",
            description: "Alert personnel and check systems.",
          },
        ],
        steps: [
          {
            id: "step-1",
            step_template: {
              id: "shutdown-101",
              icon: "bell-off",
              name: "Notify personnel",
              description: "Notify all personnel in the area.",
              type: "communication",
            },
            name: "Notify Team",
            stage_id: "stage-1",
          },
        ],
        edges: [],
      },
      assistant_response: "Here's the shutdown workflow you asked for.",
    });

    const score = await llmCompare(expected, actual);
    expect(score).toBe(5);
  });

  it('score 1 – nonsense or missing structure', async () => {
    const expected = wrap({
      reasoning: "Detailed and structured onboarding workflow.",
      workflow: {
        stages: [
          {
            id: "onboard-1",
            icon: "user",
            name: "Start",
            description: "Beginning onboarding.",
          },
        ],
        steps: [
          {
            id: "step-a",
            step_template: {
              id: "template-1",
              icon: "doc",
              name: "Welcome",
              description: "Welcome message",
              type: "text",
            },
            name: "Welcome new hire",
            stage_id: "onboard-1",
          },
        ],
        edges: [],
      },
      assistant_response: "Here's your onboarding flow.",
    });

    const actual = wrap({ foo: "bar", assistant_response: "???", workflow: null });
    const score = await llmCompare(expected, actual);
    expect(score).toBe(1);
  });

  it('edge case – actual is a string instead of JSON', async () => {
    const expected = wrap({
      reasoning: "Initiate safe shutdown.",
      workflow: {
        stages: [],
        steps: [],
        edges: [],
      },
      assistant_response: "Shutdown initiated.",
    });

    const actual = `"Just shutting everything down"`;

    const score = await llmCompare(expected, actual);
    expect(score).toBe(1);
  });

  it('edge case – both inputs are completely empty', async () => {
    const expected = '';
    const actual = '';
    let score: number;

    try {
      score = await llmCompare(expected, actual);
    } catch {
      return; // acceptable: function throws or exits
    }

    throw new Error("Function fails to exit due to missing inputs");
  });
});
