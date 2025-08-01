
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArticleCard } from '@/components/article-card';
import ARTICLES from '@/lib/articles.json';
import { CATEGORIES } from '@/lib/mock-data';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Article } from '@/lib/types';

export default function Home() {
  const allArticles: Article[] = (ARTICLES as Article[]).sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()) || [];

  const featuredArticle = allArticles.find((article) => article.featured);

  const otherArticles = allArticles.filter((article) => article.slug !== featuredArticle?.slug).slice(0, 9);
  
  const firstCategorySlug = CATEGORIES[0]?.slug || '';

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-16">
      
      {featuredArticle && (
        <section className="mb-16 text-center">
            <Link href={`/article/${featuredArticle.slug}`} className="group block">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">{featuredArticle.title}</h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                {featuredArticle.description}
              </p>
              <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 max-w-5xl mx-auto aspect-video">
                <Image
                  src={featuredArticle.featuredImage}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint="featured article"
                  priority
                />
              </div>
            </Link>
        </section>
      )}

      <section className="mb-12">
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Latest Posts</h2>
             {firstCategorySlug && (
              <Link href={`/category/${firstCategorySlug}`}>
                <Button variant="link" className="text-primary">
                  View All <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {otherArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

    </div>
  );
}
