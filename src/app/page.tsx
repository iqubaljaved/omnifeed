
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArticleCard } from '@/components/article-card';
import ARTICLES from '@/lib/articles.json';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Article } from '@/lib/types';

export default function Home() {
  const allArticles: Article[] = ARTICLES || [];
  const featuredArticles = allArticles.filter((article) => article.featured).slice(0, 1);
  const otherArticles = allArticles.filter((article) => !article.featured).sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()).slice(0, 9);

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-16">
      
      {featuredArticles.length > 0 && (
        <section className="mb-16 text-center">
            <Link href={`/article/${featuredArticles[0].slug}`} className="group block">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">{featuredArticles[0].title}</h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                {featuredArticles[0].description}
              </p>
              <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 max-w-5xl mx-auto aspect-video">
                <Image
                  src={featuredArticles[0].featuredImage}
                  alt={featuredArticles[0].title}
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
             <Link href={`/`}>
                <Button variant="link" className="text-primary">
                  View All <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
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
