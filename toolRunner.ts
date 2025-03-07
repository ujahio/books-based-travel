import type { ChatCompletionMessageToolCall } from 'openai/resources/index.mjs';
import {
  movieSearch,
  movieSearchToolDefinition,
} from './src/tools/movieSearch';
import { booksSearch, booksSearchToolDefinition } from './src/tools/findBooks';
import {
  generateImage,
  generateImageToolDefinition,
} from './src/tools/generateImage';

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

    case generateImageToolDefinition.name:
      return generateImage(input);
    default:
      return 'Tool not found';
  }
};
