import { expect, request } from '@playwright/test';
import stringSimilarity from 'string-similarity';

export interface ProcessBuilderOutput {
  prompt: string;
  outputStages: string[];
  outputConnections: [string, string][];
  expected: {
    minStages?: number;
    requiredStages?: string[];
    requiredConnections?: [string, string][];
    semanticExpectation?: string;
    llmCheckUrl: string;
    llmMinScore?: number;
  };
}

export async function assertProcessBuilderOutput({
  prompt,
  outputStages,
  outputConnections,
  expected,
}: ProcessBuilderOutput): Promise<void> {
  const {
    minStages = 1,
    requiredStages = [],
    requiredConnections = [],
    semanticExpectation = '',
    llmCheckUrl,
    llmMinScore = 4,
  } = expected;

  expect(Array.isArray(outputStages)).toBe(true);
  expect(outputStages.length).toBeGreaterThanOrEqual(minStages);

  for (const stage of requiredStages) {
    expect(outputStages).toContain(stage);
  }

  for (const [from, to] of requiredConnections) {
    const exists = outputConnections.some(([a, b]) => a === from && b === to);
    expect(exists).toBe(true);
  }

  const llmResponse = await request.newContext().then(ctx =>
    ctx.post(llmCheckUrl, {
      data: {
        instructions: semanticExpectation,
        prompt: prompt,
        llm_response: outputStages.join('\n'),
      },
      headers: { 'Content-Type': 'application/json' },
    })
  );

  expect(llmResponse.status()).toBe(200);

  const llmJson = await llmResponse.json();
  console.log(`[LLM Cloud Judgment]`, llmJson);
  expect(llmJson.result).toBe(true);
  if (llmJson.score) {
    expect(llmJson.score).toBeGreaterThanOrEqual(llmMinScore);
  }

  if (semanticExpectation) {
    const combinedOutput = outputStages.join(' ');
    const similarity = stringSimilarity.compareTwoStrings(
      semanticExpectation.toLowerCase(),
      combinedOutput.toLowerCase()
    );
    console.log(`[Vector Similarity] ${similarity}`);
    expect(similarity).toBeGreaterThan(0.6);
  }
}