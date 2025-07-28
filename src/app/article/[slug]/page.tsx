import { ARTICLES, CATEGORIES } from '@/lib/mock-data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Calendar, User } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ArticleCard } from '@/components/article-card';

export async function generateStaticParams() {
  return ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const category = CATEGORIES.find((c) => c.slug === article.category);
  const relatedArticles = ARTICLES.filter(
    (a) => a.category === article.category && a.slug !== article.slug
  ).slice(0, 3);

  return (
    <article>
      <div className="relative w-full h-[40vh] md:h-[60vh]">
        <Image
          src={article.featuredImage}
          alt={article.title}
          layout="fill"
          objectFit="cover"
          className="brightness-50"
          data-ai-hint="article hero"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
          {category && (
            <Link href={`/category/${category.slug}`} className="mb-4">
              <Badge variant="default" className="bg-accent text-accent-foreground text-sm">
                {category.name}
              </Badge>
            </Link>
          )}
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 max-w-4xl">
            {article.title}
          </h1>
          <div className="flex items-center space-x-4 text-sm opacity-90">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={article.publishedAt}>
                {new Date(article.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 my-12">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-xl leading-relaxed text-muted-foreground">{article.description}</p>
            <Separator className="my-8" />
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      
      {relatedArticles.length > 0 && (
        <aside className="bg-muted py-12">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-3xl font-bold mb-8 text-center">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {relatedArticles.map((related) => (
                        <ArticleCard key={related.slug} article={related} />
                    ))}
                </div>
            </div>
        </aside>
      )}
    </article>
  );
}
