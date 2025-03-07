import { z } from 'zod';
import type { ToolFn } from '../../types';
import { openai } from '../ai';

export const generateImageToolDefinition = {
  name: 'generateImage',
  parameters: z.object({
    prompt: z.string().describe('The prompt to generate an image'),
  }),
  description: 'use this tool with a prompt to generate an image',
};

export type Args = z.infer<typeof generateImageToolDefinition.parameters>;

export const generateImage: ToolFn<Args> = async ({ toolArgs }) => {
  try {
    const response = await openai.images.generate({
      model: process.env.OPENAI_IMAGE_GEN_LLM_MODEL || 'dall-e-3',
      prompt: toolArgs.prompt,
    });
    return response.data[0].url;
  } catch (error) {
    console.error('Error generating images:', error);
    return 'Error generating images';
  }
};
