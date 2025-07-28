import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArticleCard } from '@/components/article-card';
import { ARTICLES, CATEGORIES } from '@/lib/mock-data';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const featuredArticles = ARTICLES.filter((article) => article.featured).slice(0, 2);
  const latestArticles = ARTICLES.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()).slice(0, 6);

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Featured</h2>
        {featuredArticles.length > 0 && (
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            <Link href={`/article/${featuredArticles[0].slug}`} className="group block">
              <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <Image
                  src={featuredArticles[0].featuredImage}
                  alt={featuredArticles[0].title}
                  width={800}
                  height={450}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint="featured article"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{featuredArticles[0].title}</h3>
                  <p className="text-sm opacity-90 line-clamp-2">{featuredArticles[0].description}</p>
                </div>
              </div>
            </Link>
            <div className="flex flex-col gap-8">
              {featuredArticles.slice(1).map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
               {featuredArticles.length === 1 && latestArticles[0] && (
                 <ArticleCard article={latestArticles[0]} />
               )}
            </div>
          </div>
        )}
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Latest Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      {CATEGORIES.map((category) => {
        const categoryArticles = ARTICLES.filter((a) => a.category === category.slug).slice(0, 3);
        if (categoryArticles.length === 0) return null;

        return (
          <section key={category.slug} className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <category.icon className="w-8 h-8 text-primary" />
                {category.name}
              </h2>
              <Link href={`/category/${category.slug}`}>
                <Button variant="link" className="text-primary">
                  View All <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
