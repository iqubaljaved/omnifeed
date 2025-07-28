// This page is not directly used when creating posts via the dialog,
// but it's kept for direct access to the form if needed.
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
