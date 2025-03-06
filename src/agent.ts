import { runTool } from '../toolRunner';
import { runLLM } from './llm';
import { addMessages, getMessages, saveToolResponse } from './memory';
import { logMessage, showLoader } from './ui';

export const runAgent = async ({
  userMessage,
  tools,
}: {
  userMessage: string;
  tools: any;
}) => {
  await addMessages([{ role: 'user', content: userMessage }]);
  const loader = showLoader('Running agent...');

  while (true) {
    const history = await getMessages();
    const response = await runLLM({ messages: history, tools });
    await addMessages([response]);

    if (response.content) {
      loader.stop();
      logMessage(response);
      return getMessages();
    }

    if (response.tool_calls) {
      console.log('Tool calls detected');
      console.log(response.tool_calls);

      const toolCall = response.tool_calls[0];
      loader.update(`Running tool: ${toolCall.function.name}`);
      const toolResponse = await runTool({ userMessage, toolCall });
      await saveToolResponse(toolCall.id, toolResponse);
      loader.update(`done: ${toolCall.function.name}`);
      loader.stop();
      logMessage(toolResponse);
    }
  }
};
