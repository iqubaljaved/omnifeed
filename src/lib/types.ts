import type { LucideIcon } from 'lucide-react';

export interface Category {
  slug: string;
  name: string;
  icon: LucideIcon;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  content: string;
  author: string;
  publishedAt: string;
  featuredImage: string;
  category: Category['slug'];
  tags: string[];
  featured?: boolean;
}
