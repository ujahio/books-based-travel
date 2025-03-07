import type { AIMessage } from '../types';
import { openai } from './ai';
import { zodFunction, zodResponseFormat } from 'openai/helpers/zod';
import { systemPropmpt as defaultSystemPrompt } from './systemprompt';
import { z } from 'zod';

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
    model: process.env.OPENAI_TEXT_GEN_LLM_MODEL || 'gpt-4o-mini',
    temperature,
    messages: [
      { role: 'system', content: systemPrompt || defaultSystemPrompt },
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

const approvalEvent = z.object({
  approved: z.boolean().describe('Whether the image generation was approved'),
});

export const approvalLLM = async ({
  temperature = 0.1,
  userMessage,
}: {
  temperature?: number;
  userMessage: string;
}) => {
  const completion = await openai.beta.chat.completions.parse({
    model: process.env.OPENAI_TEXT_GEN_LLM_MODEL || 'gpt-4o-mini',
    temperature,
    messages: [
      {
        role: 'system',
        content: 'Do you approve generating an image? (yes/no)',
      },
      {
        role: 'user',
        content: userMessage,
      },
    ],
    response_format: zodResponseFormat(approvalEvent, 'approval'),
  });
  return completion.choices[0].message.parsed?.approved;
};
