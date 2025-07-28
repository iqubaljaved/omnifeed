import { CreatePostForm } from "./create-post-form";

export default function CreatePostPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Create New Post</h1>
          <p className="text-muted-foreground mt-2">Fill out the form below to publish a new article.</p>
        </div>
        <CreatePostForm />
      </div>
    </div>
  );
}
