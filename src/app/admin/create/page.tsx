import { CreatePostForm } from "./create-post-form";

export default function CreatePostPage() {
  return (
    <div className="bg-muted min-h-screen">
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <CreatePostForm />
        </div>
      </div>
    </div>
  );
}
