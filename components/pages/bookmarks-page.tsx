'use client';

import { Bookmark, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function BookmarksPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-xl font-bold text-gray-900">Bookmarks</h1>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Empty State */}
      <div className="bg-white p-12 text-center">
        <Bookmark className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Save posts for later</h3>
        <p className="text-gray-500 max-w-sm mx-auto">
          Bookmark posts to easily find them again in the future. Tap the bookmark icon on any post to add it here.
        </p>
      </div>
    </div>
  );
}