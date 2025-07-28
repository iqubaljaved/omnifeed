'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { handleSuggestion, handleSubmit } from './actions';
import { Loader2, Wand2 } from 'lucide-react';

const formSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters long.'),
  content: z.string().min(50, 'Content must be at least 50 characters long.'),
  tags: z.string(),
  categories: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export function CreatePostForm() {
  const { toast } = useToast();
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      tags: '',
      categories: '',
    },
  });

  const contentValue = form.watch('content');

  const onSuggest = async () => {
    setIsSuggesting(true);
    try {
      const result = await handleSuggestion(contentValue);
      if (result) {
        form.setValue('tags', result.tags.join(', '));
        form.setValue('categories', result.categories.join(', '));
        toast({
          title: 'Suggestions generated!',
          description: 'Tags and categories have been populated.',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate suggestions.',
      });
    } finally {
      setIsSuggesting(false);
    }
  };

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      await handleSubmit(values);
      toast({
        title: 'Post Created!',
        description: 'Your new article has been published (simulated).',
      });
      form.reset();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to create post.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Create New Post</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input 
                      placeholder="Article Title" 
                      className="text-4xl font-extrabold tracking-tight border-0 shadow-none px-0 focus-visible:ring-0"
                      {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Write your article here..."
                      className="min-h-[50vh] border-0 shadow-none px-0 focus-visible:ring-0 text-lg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
                 <CardTitle className="text-xl">Organization</CardTitle>
                 <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={onSuggest}
                  disabled={isSuggesting || contentValue.length < 50}
                >
                  {isSuggesting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Wand2 className="mr-2 h-4 w-4" />
                  )}
                  Suggest with AI
                </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., AI, Tech, Innovation"
                        {...field}
                      />
                    </FormControl>
                    <div className="flex flex-wrap gap-1 pt-2">
                      {field.value && field.value.split(',').map(tag => tag.trim() && <Badge key={tag} variant="secondary">{tag.trim()}</Badge>)}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categories</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Technology, Science" {...field} />
                    </FormControl>
                      <div className="flex flex-wrap gap-1 pt-2">
                        {field.value && field.value.split(',').map(cat => cat.trim() && <Badge key={cat} variant="secondary">{cat.trim()}</Badge>)}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
        </Card>
        
        <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Publish Post
            </Button>
        </div>
      </form>
    </Form>
  );
}
