'use server';

import { suggestTagsAndCategories } from '@/ai/flows/suggest-tags-and-categories';
import * as z from 'zod';

const formSchema = z.object({
  title: z.string(),
  content: z.string(),
  tags: z.string(),
  categories: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export async function handleSuggestion(articleContent: string) {
  if (articleContent.length < 50) {
    throw new Error('Content is too short to generate suggestions.');
  }

  try {
    const result = await suggestTagsAndCategories({ articleContent });
    return result;
  } catch (error) {
    console.error('Error getting suggestions:', error);
    throw new Error('Failed to get AI suggestions.');
  }
}

export async function handleSubmit(values: FormValues) {
  // Here you would typically save the data to your database.
  // For this example, we'll just log it to the console.
  console.log('New post submitted:', {
    ...values,
    tags: values.tags.split(',').map(t => t.trim()),
    categories: values.categories.split(',').map(c => c.trim()),
  });

  // Simulate a delay
  await new Promise(resolve => setTimeout(resolve, 1000));
}
