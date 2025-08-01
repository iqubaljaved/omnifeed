
import { Suspense } from 'react';
import { SearchResults } from '@/components/search-results';

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchSkeleton />}>
      <SearchResults />
    </Suspense>
  );
}

function SearchSkeleton() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
      <div className="mb-8 text-center">
        <div className="h-12 w-1/2 mx-auto bg-muted rounded-md animate-pulse"></div>
        <div className="h-6 w-1/3 mx-auto bg-muted rounded-md animate-pulse mt-4"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
           <div key={i} className="space-y-2">
            <div className="aspect-video w-full bg-muted rounded-lg animate-pulse"></div>
            <div className="h-4 w-1/4 bg-muted rounded-md animate-pulse"></div>
            <div className="h-6 w-full bg-muted rounded-md animate-pulse"></div>
            <div className="h-4 w-3/4 bg-muted rounded-md animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  )
}
