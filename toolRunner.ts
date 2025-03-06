import type { ChatCompletionMessageToolCall } from 'openai/resources/index.mjs';
import {
  movieSearch,
  movieSearchToolDefinition,
} from './src/tools/movieSearch';

export const runTool = async ({
  userMessage,
  toolCall,
}: {
  userMessage: string;
  toolCall: ChatCompletionMessageToolCall;
}) => {
  const toolArgs = JSON.parse(toolCall.function.arguments || '{}');

  const input = {
    userMessage,
    toolArgs,
  };

  switch (toolCall.function.name) {
    case movieSearchToolDefinition.name:
      return movieSearch(input);

    default:
      return 'Tool not found';
  }
};
