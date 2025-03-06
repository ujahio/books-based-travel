import { z } from 'zod';
import type { ToolFn } from '../../types';

export const booksSearchToolDefinition = {
  name: 'bookSearch',
  parameters: z.object({
    bookTitle: z
      .string()
      .optional()
      .describe('query used to search for book by title'),
    bookGenres: z
      .array(z.string())
      .optional()
      .describe('selection of genres to search books on'),
  }),
  description: 'use this tool to find books by title or genres',
};

type Args = z.infer<typeof booksSearchToolDefinition.parameters>;

export const booksSearch: ToolFn<Args, string> = async ({ toolArgs }) => {
  const { bookTitle, bookGenres } = toolArgs;

  try {
    let query = '';
    if (bookTitle) {
      query += `title=${encodeURIComponent(bookTitle)}&`;
    }
    if (bookGenres && bookGenres.length > 0) {
      query += `subject=${encodeURIComponent(bookGenres.join(','))}&`;
    }

    query += 'limit=5&';

    const { docs } = await fetch(
      `https://openlibrary.org/search.json?${query}`,
    ).then((res) => res.json());

    const formattedResults = docs.map((book: any) => ({
      title: book.title,
      author: book.author_name,
      publishYear: book.first_publish_year,
      genres: book.subject,
    }));
    return JSON.stringify(formattedResults, null, 2);
  } catch (error) {
    console.error('Error querying books:', error);
    return 'Error querying books';
  }
};
