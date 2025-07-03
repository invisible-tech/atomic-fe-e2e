import { expect, request } from '@playwright/test';
import { compareTwoStrings } from '../utils/compareTwoStrings';
import { llmCompare } from '../utils/llmCompare';

export interface ProcessBuilderOutput {
  prompt: string;
  outputStages: string[];
  outputConnections: [string, string][];
  expected: {
    minStages?: number;
    requiredStages?: string[];
    requiredConnections?: [string, string][];
    semanticExpectation?: string;
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

  if (semanticExpectation) {
    const llmScore = await llmCompare(semanticExpectation, outputStages.join('\n'));
    expect(llmScore).toBeGreaterThanOrEqual(llmMinScore);
    
    const combinedOutput = outputStages.join(' ');
    const similarity = compareTwoStrings(
      semanticExpectation.toLowerCase(),
      combinedOutput.toLowerCase()
    );
    console.log(`[Vector Similarity] ${similarity}`);
    expect(similarity).toBeGreaterThan(0.3);
  }
}
