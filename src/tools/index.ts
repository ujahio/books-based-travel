import { booksSearchToolDefinition } from './findBooks';
import { generateImageToolDefinition } from './generateImage';
import { movieSearchToolDefinition } from './movieSearch';

export const tools = [
  movieSearchToolDefinition,
  booksSearchToolDefinition,
  generateImageToolDefinition,
];
