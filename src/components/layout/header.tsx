'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CATEGORIES } from '@/lib/mock-data';
import { MountainIcon, MenuIcon, PlusIcon } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreatePostForm } from '@/app/admin/create/create-post-form';
import { useState, useEffect } from 'react';

export function Header() {
  const [dialogOpen, setDialogOpen] = useState(false);
  // In a real app, you'd get this from an auth context
  const [isAdmin, setIsAdmin] = useState(false);

  // Simulate login for demonstration purposes
  useEffect(() => {
    setIsAdmin(true);
  }, []);


  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <MountainIcon className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg text-foreground">TrendTide</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
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
            {isAdmin && (
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Create Post
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-5xl h-[90vh] flex flex-col p-6 gap-0">
                <CreatePostForm onPostCreated={() => setDialogOpen(false)} />
              </DialogContent>
            </Dialog>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="grid gap-4 p-4">
                <Link href="/" className="flex items-center gap-2" prefetch={false}>
                  <MountainIcon className="h-6 w-6 text-primary" />
                  <span className="font-bold text-lg">TrendTide</span>
                </Link>
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