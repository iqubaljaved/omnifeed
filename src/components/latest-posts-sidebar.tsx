
'use client';
import type { Article } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';

interface LatestPostsSidebarProps {
  articles: Article[];
}

export function LatestPostsSidebar({ articles }: LatestPostsSidebarProps) {
  return (
    <div className="p-6 rounded-lg bg-secondary/30 border sticky top-24">
      <h2 className="text-xl font-bold mb-4">Latest Posts</h2>
      <div className="border-b mb-4"></div>
      <ul className="space-y-4">
        {articles.map((article) => (
          <li key={article.slug} className="flex items-start gap-4">
            <Link href={`/article/${article.slug}`} className="flex-shrink-0">
              <Image
                src={article.featuredImage}
                alt={article.title}
                width={80}
                height={80}
                className="rounded-md object-cover aspect-square"
                data-ai-hint="article thumbnail"
              />
            </Link>
            <div>
              <Link href={`/article/${article.slug}`} className="font-semibold hover:text-primary transition-colors line-clamp-2">
                  {article.title}
              </Link>
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(article.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                })}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
