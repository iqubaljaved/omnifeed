import { FileText, Save, Settings, Eye, BarChart2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-muted/40">
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
