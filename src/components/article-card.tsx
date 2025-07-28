import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Article } from '@/lib/types';
import { CATEGORIES } from '@/lib/mock-data';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const category = CATEGORIES.find((c) => c.slug === article.category);

  return (
    <Link href={`/article/${article.slug}`} className="group block">
      <Card className="overflow-hidden h-full transition-shadow duration-300 shadow-md hover:shadow-xl">
        <div className="relative">
          <Image
            src={article.featuredImage}
            alt={article.title}
            width={600}
            height={400}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint="article image"
          />
          {category && (
             <Badge
              variant="default"
              className="absolute top-2 left-2 bg-accent text-accent-foreground"
            >
              {category.name}
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold leading-snug mb-2 group-hover:text-primary transition-colors">
            {article.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {article.description}
          </p>
          <div className="mt-4 flex items-center text-xs text-muted-foreground">
            <span>{article.author}</span>
            <span className="mx-2">·</span>
            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
