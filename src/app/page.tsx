
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArticleCard } from '@/components/article-card';
import ARTICLES from '@/lib/articles.json';
import { CATEGORIES } from '@/lib/mock-data';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Article } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  const allArticles: Article[] = ARTICLES as Article[];

  // Find the welcome article
  const welcomeArticle = allArticles.find(a => a.slug === 'welcome-to-omnifeed');

  // Filter out the welcome article and sort the rest by date
  const otherSortedArticles = allArticles
    .filter(a => a.slug !== 'welcome-to-omnifeed')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  const mainArticle = welcomeArticle; // The welcome article is always the main one
  const topArticles = otherSortedArticles.slice(0, 4);
  const latestArticles = otherSortedArticles.slice(4, 10);

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Main Article */}
            {mainArticle && (
                <div className="lg:col-span-2">
                    <ArticleCard article={mainArticle} isMain />
                </div>
            )}

            {/* Other Top Articles */}
            <div className="space-y-8">
                {topArticles.map(article => (
                     <ArticleCard key={article.slug} article={article} isHorizontal />
                ))}
            </div>
        </section>

      <section className="mb-12">
        <div className="flex justify-between items-center mb-8 border-b pb-2">
            <h2 className="text-2xl font-bold text-primary">Latest Posts</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {latestArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

    </div>
  );
}
