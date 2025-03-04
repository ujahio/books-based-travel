import { runLLM } from './llm';
import { addMessage } from './memory';
import { logMessage } from './ui';


export const runAgent = async ({ userMessage }: { userMessage: string }) => {
  const response = await runLLM({ userMessage });

  await addMessage([response]);
  logMessage(response)
};
