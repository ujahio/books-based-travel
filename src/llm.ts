import type { AIMessage } from '../types';
import { openai } from './ai';

export const runLLM = async ({ userMessages }: { userMessages: AIMessage[] }) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      ...userMessages
    ],
  });
  return response.choices[0].message;
};
