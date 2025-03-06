import { z } from 'zod';
import type { ToolFn } from '../../types';
import { queryMovies } from '../rag/queryMovie';

export const movieSearchToolDefinition = {
  name: 'movieSearch',
  parameters: z.object({
    query: z.string().describe('query used to vector search on movies'),
  }),
  description:
    'use this tool to find movies or answer questions about movies and their metada like score, rating, costs, director, actors, and more.',
};

type Args = z.infer<typeof movieSearchToolDefinition.parameters>;

export const movieSearch: ToolFn<Args> = async ({ toolArgs }) => {
  try {
    const results = await queryMovies({ query: toolArgs.query });
    const movieResults = results.map((result) => {
      const { data, metadata } = result;
      return {
        ...metadata,
        description: data,
      };
    });

    return JSON.stringify(movieResults, null, 2);
  } catch (error) {
    console.error('Error querying movies:', error);
    return 'Error querying movies';
  }
};
