
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CATEGORIES } from '@/lib/mock-data';
import { MountainIcon, MenuIcon, SearchIcon } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from '@/components/ui/input';

export function Header() {

  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-40 border-b">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <MountainIcon className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg text-foreground">OmniFeed</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="text-muted-foreground transition-colors hover:text-foreground"
              prefetch={false}
            >
              {category.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
           <div className="hidden md:flex items-center gap-2 relative">
             <SearchIcon className="absolute left-3 w-4 h-4 text-muted-foreground" />
             <Input 
                type="search" 
                placeholder="Search articles..."
                className="pl-10 w-48 lg:w-64"
              />
           </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                 <SheetTitle>
                  <Link href="/" className="flex items-center gap-2 mb-4" prefetch={false}>
                    <MountainIcon className="h-6 w-6 text-primary" />
                    <span className="font-bold text-lg">OmniFeed</span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="px-3 relative">
                  <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search..." className="pl-10"/>
                </div>
                <nav className="grid gap-2 text-base font-medium">
                  {CATEGORIES.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/category/${category.slug}`}
                      className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                      prefetch={false}
                    >
                      <category.icon className="h-5 w-5" />
                      {category.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
