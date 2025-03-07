import { runTool } from '../toolRunner';
import type { AIMessage } from '../types';
import { approvalLLM, runLLM } from './llm';
import { addMessages, getMessages, saveToolResponse } from './memory';
import { generateImageToolDefinition } from './tools/generateImage';
import { logMessage, showLoader } from './ui';

const handleImageApproval = async ({
  history,
  userMessage,
}: {
  history: AIMessage[];
  userMessage: string;
}) => {
  const lastMessage = history.at(-1);
  const toolCall = lastMessage?.tool_calls?.[0];
  console.log('toolCall', toolCall);
  if (
    !toolCall ||
    toolCall.function.name !== generateImageToolDefinition.name
  ) {
    return false;
  }

  const loader = showLoader('Processing approval...');
  const isApproved = await approvalLLM({
    userMessage,
  });
  if (isApproved) {
    loader.update(`executing tool: ${toolCall.function.name}`);
    const toolResponse = await runTool({ toolCall, userMessage });
    await saveToolResponse(toolCall.id, toolResponse);
    loader.update(`done: ${toolCall.function.name}`);
  } else {
    await saveToolResponse(toolCall.id, 'User denied image generation');
  }

  loader.stop();
  return true;
};

export const runAgent = async ({
  userMessage,
  tools,
}: {
  userMessage: string;
  tools: any;
}) => {
  const history = await getMessages();
  const needsApproval = await handleImageApproval({ history, userMessage });

  if (!needsApproval) {
    await addMessages([{ role: 'user', content: userMessage }]);
  }

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
      const toolCall = response.tool_calls[0];
      logMessage(response);
      loader.update(`Running tool: ${toolCall.function.name}`);
      if (toolCall.function.name === generateImageToolDefinition.name) {
        loader.update('need user approval');
        loader.stop();
        return getMessages();
      }
      const toolResponse = await runTool({ userMessage, toolCall });
      await saveToolResponse(toolCall.id, toolResponse);
      loader.update(`done: ${toolCall.function.name}`);
      loader.stop();
      logMessage(toolResponse);
    }
  }
};
