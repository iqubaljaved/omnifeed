
'use client';

import { useSearchParams } from 'next/navigation';
import ARTICLES from '@/lib/articles.json';
import { Article } from '@/lib/types';
import { ArticleCard } from '@/components/article-card';
import { useEffect, useState } from 'react';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);

  useEffect(() => {
    if (query) {
      const allArticles: Article[] = ARTICLES || [];
      const lowercasedQuery = query.toLowerCase();
      const results = allArticles.filter((article) => {
        const titleMatch = article.title.toLowerCase().includes(lowercasedQuery);
        const descriptionMatch = article.description.toLowerCase().includes(lowercasedQuery);
        const tagMatch = article.tags.some(tag => tag.toLowerCase().includes(lowercasedQuery));
        // Simple content match - more advanced would require stripping HTML
        const contentMatch = article.content.toLowerCase().includes(lowercasedQuery);

        return titleMatch || descriptionMatch || tagMatch || contentMatch;
      });
      setFilteredArticles(results);
    } else {
      setFilteredArticles([]);
    }
  }, [query]);

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Search Results</h1>
        {query && (
          <p className="mt-2 text-lg text-muted-foreground">
            Showing {filteredArticles.length} {filteredArticles.length === 1 ? 'result' : 'results'} for &quot;{query}&quot;
          </p>
        )}
      </div>

      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No articles found matching your search.</p>
          <p className="text-sm text-muted-foreground mt-2">Try searching for something else.</p>
        </div>
      )}
    </div>
  );
}
