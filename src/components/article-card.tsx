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
      <Card className="overflow-hidden h-full shadow-none border-0 rounded-lg">
        <div className="relative aspect-video">
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105 rounded-lg"
            data-ai-hint="article image"
          />
        </div>
        <CardContent className="p-0 pt-4">
           {category && (
             <p className="text-sm font-medium text-primary mb-1">{category.name}</p>
          )}
          <h3 className="text-xl font-bold leading-snug mb-2 group-hover:text-primary transition-colors">
            {article.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {article.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
