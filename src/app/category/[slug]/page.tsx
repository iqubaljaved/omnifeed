
import ARTICLES from '@/lib/articles.json';
import { CATEGORIES } from '@/lib/mock-data';
import { ArticleCard } from '@/components/article-card';
import { notFound } from 'next/navigation';
import { Article } from '@/lib/types';

export async function generateStaticParams() {
  if (!Array.isArray(CATEGORIES)) {
    return [];
  }
  return CATEGORIES.map((category) => ({
    slug: category.slug,
  }));
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const articles = ARTICLES as Article[];
  const category = CATEGORIES.find((c) => c.slug === slug);
  const articlesInCategory = articles.filter((article) => article.category === slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
      <div className="mb-8 text-center">
        <category.icon className="w-16 h-16 mx-auto text-primary mb-4" />
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{category.name}</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Showing {articlesInCategory.length} {articlesInCategory.length === 1 ? 'article' : 'articles'} in this category.
        </p>
      </div>

      {articlesInCategory.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articlesInCategory.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No articles found in this category yet.</p>
        </div>
      )}
    </div>
  );
}
