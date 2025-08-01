import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Article } from '@/lib/types';
import { CATEGORIES } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

interface ArticleCardProps {
  article: Article;
  isMain?: boolean;
  isHorizontal?: boolean;
}

export function ArticleCard({ article, isMain = false, isHorizontal = false }: ArticleCardProps) {
  const category = CATEGORIES.find((c) => c.slug === article.category);

  if (isHorizontal) {
    return (
      <Link href={`/article/${article.slug}`} className="group grid grid-cols-3 gap-4 items-center">
        <div className="relative aspect-video col-span-1">
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint="article image"
          />
        </div>
        <div className="col-span-2">
          <h3 className="text-base font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h3>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/article/${article.slug}`} className="group block">
      <Card className="overflow-hidden h-full shadow-none border-0 rounded-none">
        <div className={cn("relative", isMain ? "aspect-[16/9]" : "aspect-video")}>
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint="article image"
          />
        </div>
        <CardContent className="p-0 pt-4">
           {category && (
             <p className="text-sm font-medium text-primary mb-2">{category.name}</p>
          )}
          <h3 className={cn("font-bold leading-snug mb-2 group-hover:text-primary transition-colors", isMain ? "text-3xl" : "text-xl")}>
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
