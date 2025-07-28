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
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { handleSuggestion, handleSubmit } from './actions';
import { Loader2, Wand2 } from 'lucide-react';
import { RichTextEditor } from '@/components/rich-text-editor';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters long.'),
  content: z.string().min(50, 'Content must be at least 50 characters long.'),
  tags: z.string(),
  categories: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

interface CreatePostFormProps {
  onPostCreated?: () => void;
}


export function CreatePostForm({ onPostCreated }: CreatePostFormProps) {
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
  const titleValue = form.watch('title');

  const onSuggest = async () => {
    setIsSuggesting(true);
    try {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = contentValue;
      const plainTextContent = tempDiv.textContent || tempDiv.innerText || "";
      
      const result = await handleSuggestion(plainTextContent);
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
        title: 'Post Published!',
        description: 'Your new article has been published.',
      });
      form.reset();
      if(onPostCreated) {
        onPostCreated();
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to publish post.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const isContentEmpty = !contentValue || contentValue.replace(/<[^>]+>/g, '').trim().length === 0;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="h-full flex flex-col">
        <header className="flex items-center justify-between h-16 border-b bg-background px-4 md:px-6">
           <div className="flex items-center gap-2 text-sm text-muted-foreground">
             <p>{titleValue ? (titleValue.length > 30 ? `${titleValue.slice(0,30)}...` : titleValue) : 'New Post'}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button type="submit" size="sm" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Publish
            </Button>
          </div>
        </header>
        
        <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
          <div className="mx-auto max-w-3xl">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input 
                      placeholder="Post Title" 
                      className="text-4xl font-extrabold tracking-tight border-0 shadow-none px-0 h-auto focus-visible:ring-0"
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
                <FormItem className="mt-8">
                  <FormControl>
                    <RichTextEditor
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Start writing your masterpiece..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator className="my-12" />

            <Card>
                <CardHeader>
                    <CardTitle>Metadata</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Add tags..."
                            {...field}
                          />
                        </FormControl>
                         <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="categories"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Add categories..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={onSuggest}
                      disabled={isSuggesting || isContentEmpty}
                    >
                      {isSuggesting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Wand2 className="mr-2 h-4 w-4" />
                      )}
                      Suggest Tags/Categories
                    </Button>
                  </div>
                </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  );
}
