import dotenv from 'dotenv';
dotenv.config();

export const env = {
  BASE_URL: process.env.BASE_URL!,
  LLM_CHECK_URL: process.env.LLM_CHECK_URL,
  PROMPT_INSURANCE: process.env.PROMPT_INSURANCE,
}