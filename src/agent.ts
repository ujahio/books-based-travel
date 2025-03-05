import { runLLM } from './llm';
import { addMessage, getMessages } from './memory';
import { logMessage, showLoader } from './ui';

export const runAgent = async ({ userMessage }: { userMessage: string }) => {
  const loader = showLoader('Running agent...');
  await addMessage([{ role: 'user', content: userMessage }]);
  const history = await getMessages();

  const response = await runLLM({ messages: history });

  await addMessage([response]);

  logMessage(response);
  loader.stop();
};
