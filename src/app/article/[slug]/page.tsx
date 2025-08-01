
import ARTICLES from '@/lib/articles.json';
import { CATEGORIES } from '@/lib/mock-data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Calendar, User } from 'lucide-react';
import { ArticleCard } from '@/components/article-card';
import { Article, Heading } from '@/lib/types';
import { JSDOM } from 'jsdom';
import { TableOfContents } from '@/components/table-of-contents';

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}

export async function generateStaticParams() {
  const articles = ARTICLES as Article[];
  if (!Array.isArray(articles)) {
    return [];
  }
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const articles = ARTICLES as Article[];
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const category = CATEGORIES.find((c) => c.slug === article.category);
  const relatedArticles = articles
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 3);

  // Parse content to add IDs to headings and extract them for TOC
  const dom = new JSDOM(article.content);
  const headings: Heading[] = [];
  dom.window.document.querySelectorAll('h1, h2, h3').forEach((heading) => {
    const level = parseInt(heading.tagName.substring(1));
    const text = heading.textContent || '';
    const id = slugify(text);
    heading.id = id;
    headings.push({ id, text, level });
  });
  const contentWithIds = dom.window.document.body.innerHTML;

  return (
    <article>
      <div className="container mx-auto px-4 md:px-6 my-12">
        <div className="max-w-3xl mx-auto">
          <header className="mb-8">
            {category && (
              <Link href={`/category/${category.slug}`} className="mb-4">
                <p className="text-base font-semibold text-primary">
                  {category.name}
                </p>
              </Link>
            )}
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight my-4">
              {article.title}
            </h1>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
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
          </header>

          <div className="relative w-full aspect-video mb-12">
            <Image
              src={article.featuredImage}
              alt={article.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
              data-ai-hint="article hero"
              priority
            />
          </div>

          {headings.length > 0 && (
            <div className="mb-12">
              <TableOfContents headings={headings} />
            </div>
           )}

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: contentWithIds }} />
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
        <aside className="border-t py-12">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Related Articles
            </h2>
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
