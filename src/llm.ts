import type { AIMessage } from '../types';
import { openai } from './ai';
import { zodFunction } from 'openai/helpers/zod';
import { systemPropmpt as defaultSystemPrompt } from './systemprompt';

export const runLLM = async ({
  messages,
  systemPrompt,
  temperature = 0.1,
  tools,
}: {
  messages: AIMessage[];
  systemPrompt?: string;
  temperature?: number;
  tools: any;
}) => {
  const formattedTools = tools.map(zodFunction);
  const response = await openai.chat.completions.create({
    model: process.env.LLM_MODEL || 'gpt-4o-mini',
    temperature,
    messages: [
      { role: 'developer', content: systemPrompt || defaultSystemPrompt },
      ...messages,
    ],
    ...(formattedTools.length > 0 && {
      tools: formattedTools,
      tool_choice: 'auto',
      parallel_tool_calls: false,
    }),
  });
  return response.choices[0].message;
};
