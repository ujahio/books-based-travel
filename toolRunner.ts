import type { ChatCompletionMessageToolCall } from 'openai/resources/index.mjs';
import {
  movieSearch,
  movieSearchToolDefinition,
} from './src/tools/movieSearch';
import { booksSearch, booksSearchToolDefinition } from './src/tools/findBooks';

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

    case booksSearchToolDefinition.name:
      return booksSearch(input);

    default:
      return 'Tool not found';
  }
};
