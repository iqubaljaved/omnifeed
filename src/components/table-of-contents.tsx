
'use client';

import type { Heading } from '@/lib/types';
import { ArrowRightCircle } from 'lucide-react';
import Link from 'next/link';

interface TocProps {
  headings: Heading[];
}

export function TableOfContents({ headings }: TocProps) {
  return (
    <div className="p-6 rounded-lg bg-secondary/30 border">
      <h2 className="text-xl font-bold mb-4">In This Article</h2>
      <div className="border-b mb-4"></div>
      <ul className="space-y-3">
        {headings.map((heading, index) => (
          <li key={heading.id} className="flex items-center gap-3">
            <ArrowRightCircle className="w-5 h-5 text-primary/70 flex-shrink-0" />
            <Link
              href={`#${heading.id}`}
              className="text-primary hover:underline"
            >
              {heading.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
