import Link from "next/link";
import { MountainIcon } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col gap-2 items-center md:items-start">
                <Link href="/" className="flex items-center gap-2" prefetch={false}>
                    <MountainIcon className="h-6 w-6 text-primary" />
                    <span className="font-bold text-lg">OmniFeed</span>
                </Link>
                <p className="text-muted-foreground text-sm">
                    Your daily feed of trending stories and insightful articles.
                </p>
            </div>
            <p className="text-muted-foreground text-xs">&copy; 2024 OmniFeed. A Project by Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
