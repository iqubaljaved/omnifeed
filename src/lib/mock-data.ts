
import type { Category } from './types';
import { Code2, UtensilsCrossed, Globe, Briefcase, Smile, BriefcaseBusiness } from 'lucide-react';

export const CATEGORIES: Category[] = [
  { name: 'Tech', slug: 'tech', icon: Code2 },
  { name: 'Food', slug: 'food', icon: UtensilsCrossed },
  { name: 'World', slug: 'world', icon: Globe },
  { name: 'Business', slug: 'business', icon: Briefcase },
  { name: 'Lifestyle', slug: 'lifestyle', icon: Smile },
  { name: 'Jobs', slug: 'jobs', icon: BriefcaseBusiness },
];
