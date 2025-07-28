'use server';

/**
 * @fileOverview This file defines a Genkit flow to suggest tags and categories for articles based on their content.
 *
 * - suggestTagsAndCategories - A function that handles the tag and category suggestion process.
 * - SuggestTagsAndCategoriesInput - The input type for the suggestTagsAndCategories function.
 * - SuggestTagsAndCategoriesOutput - The return type for the suggestTagsAndCategories function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTagsAndCategoriesInputSchema = z.object({
  articleContent: z.string().describe('The content of the article.'),
});
export type SuggestTagsAndCategoriesInput = z.infer<typeof SuggestTagsAndCategoriesInputSchema>;

const SuggestTagsAndCategoriesOutputSchema = z.object({
  tags: z.array(z.string()).describe('An array of suggested tags for the article.'),
  categories: z.array(z.string()).describe('An array of suggested categories for the article.'),
});
export type SuggestTagsAndCategoriesOutput = z.infer<typeof SuggestTagsAndCategoriesOutputSchema>;

export async function suggestTagsAndCategories(input: SuggestTagsAndCategoriesInput): Promise<SuggestTagsAndCategoriesOutput> {
  return suggestTagsAndCategoriesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTagsAndCategoriesPrompt',
  input: {schema: SuggestTagsAndCategoriesInputSchema},
  output: {schema: SuggestTagsAndCategoriesOutputSchema},
  prompt: `You are an expert in content categorization and tagging.

  Given the content of an article, suggest relevant tags and categories to improve its discoverability.
  Return the tags and categories as arrays of strings.

  Article Content: {{{articleContent}}}
  Tags: 
  Categories:`,
});

const suggestTagsAndCategoriesFlow = ai.defineFlow(
  {
    name: 'suggestTagsAndCategoriesFlow',
    inputSchema: SuggestTagsAndCategoriesInputSchema,
    outputSchema: SuggestTagsAndCategoriesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
