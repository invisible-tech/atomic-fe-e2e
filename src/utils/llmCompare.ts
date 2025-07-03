import { request as playwrightRequest, APIRequestContext } from '@playwright/test';

export interface LlmCompareOptions {
  headers?: Record<string, string>;
  timeoutMs?: number;
  apiRequestContext?: APIRequestContext;
}

const LLM_CHECK_URL = 'https://script.google.com/macros/s/AKfycbyU1ev45sxhYSgNxdxSrkZvt3Su1bvbxL55xoXtZQ5OhZxsecBL56ELuNPeDaCgNyx07g/exec';

export async function llmCompare(
  expected: string,
  actual: string,
  options: LlmCompareOptions = {},
): Promise<number> {
  const {
    headers = { 'Content-Type': 'application/json' },
    timeoutMs = 10000,
    apiRequestContext,
  } = options;

  const requestContext =
    apiRequestContext || (await playwrightRequest.newContext({ timeout: timeoutMs }));

  const response = await requestContext.post(LLM_CHECK_URL, {
    data: { expected, actual },
    headers,
  });

  if (response.status() !== 200) {
    throw new Error(`llmCompare: HTTP ${response.status()} from LLM service`);
  }

  let json: unknown;
  try {
    json = await response.json();
  } catch {
    throw new Error('llmCompare: response is not valid JSON');
  }

  if (
    typeof json !== 'object' ||
    json === null ||
    typeof (json as any).score !== 'number'
  ) {
    throw new Error('llmCompare: JSON lacks a numeric "score" field');
  }

  return (json as any).score;
}
