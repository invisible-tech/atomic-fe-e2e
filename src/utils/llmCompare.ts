export interface LlmCompareOptions {
  headers?: Record<string, string>;
  timeoutMs?: number;
  fetcher?: typeof fetch;
}

const LLM_CHECK_URL =
  'https://script.google.com/macros/s/AKfycbyIzT6NhytfLgaCAa-bLWCjiuYg7FIWMS8SZcyNNb7J7iYFBUXQYTuOnPa5DEt0LV_4/exec';

export async function llmCompare(
  expected: string,
  actual: string,
  {
    headers = { 'Content-Type': 'application/json' },
    timeoutMs = 10000,
    fetcher = fetch,
  }: LlmCompareOptions = {},
): Promise<number> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetcher(LLM_CHECK_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({ expected, actual }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`llmCompare: HTTP ${response.status} from LLM service`);
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
  } finally {
    clearTimeout(timer);
  }
}
