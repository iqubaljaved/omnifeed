import { FileText, Save, Settings, Eye, BarChart2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-muted/40">
      <aside className="w-16 flex-col border-r bg-background hidden sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 py-4">
          <Link
            href="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <FileText className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">New Post</span>
          </Link>
          <button className="group flex flex-col items-center justify-center gap-1 text-muted-foreground transition-colors hover:text-foreground">
            <Save className="h-5 w-5" />
            <span className="text-xs">Save</span>
          </button>
           <button className="group flex flex-col items-center justify-center gap-1 text-muted-foreground transition-colors hover:text-foreground">
            <Settings className="h-5 w-5" />
            <span className="text-xs">Settings</span>
          </button>
           <button className="group flex flex-col items-center justify-center gap-1 text-muted-foreground transition-colors hover:text-foreground">
            <Eye className="h-5 w-5" />
            <span className="text-xs">View</span>
          </button>
          <button className="group flex flex-col items-center justify-center gap-1 text-muted-foreground transition-colors hover:text-foreground">
            <BarChart2 className="h-5 w-5" />
            <span className="text-xs">Stats</span>
          </button>
        </nav>
      </aside>
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
