
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
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
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  comment: z.string().min(10, {
    message: 'Comment must be at least 10 characters.',
  }),
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  saveInfo: z.boolean().default(false).optional(),
});

export function CommentForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: '',
      name: '',
      email: '',
      saveInfo: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // This is where you would handle form submission, e.g., send to an API.
    // For now, we'll just show a success message.
    console.log(values);
    toast({
      title: 'Comment Submitted!',
      description: 'Your comment is awaiting moderation.',
    });
    form.reset();
  }

  return (
    <div className="p-6 rounded-lg border bg-card text-card-foreground">
        <h2 className="text-2xl font-bold mb-2">Add a Comment</h2>
        <p className="text-muted-foreground mb-6 text-sm">
            We're glad you have chosen to leave a comment. Please keep in mind that all comments are moderated according to our privacy policy, and all links are nofollow. Do NOT use keywords in the name field. Let's have a personal and meaningful conversation.
        </p>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
                <FormItem>
                <FormControl>
                    <Textarea placeholder="Your Comment" {...field} rows={6} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                <FormControl>
                    <Input placeholder="Your Real Name" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                <FormControl>
                    <Input placeholder="Your Email Address" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="saveInfo"
            render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                    <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    />
                </FormControl>
                <div className="space-y-1 leading-none">
                    <FormLabel>
                    Save my name, and email in this browser for the next time I comment.
                    </FormLabel>
                </div>
                </FormItem>
            )}
            />
            <Button type="submit">Add Your Comment</Button>
        </form>
        </Form>
    </div>
  );
}

