import type { AIMessage } from '../types';
import { openai } from './ai';
import { systemPropmpt as defaultSystemPrompt } from './systemprompt';

export const runLLM = async ({
  messages,
  systemPrompt,
  temperature = 0.1,
}: {
  messages: AIMessage[];
  systemPrompt?: string;
  temperature?: number;
}) => {
  const response = await openai.chat.completions.create({
    model: process.env.LLM_MODEL || 'gpt-4o-mini',
    temperature,
    messages: [
      { role: 'system', content: systemPrompt || defaultSystemPrompt },
      ...messages,
    ],
  });
  return response.choices[0].message;
};
