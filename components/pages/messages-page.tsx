'use client';

import { Mail, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function MessagesPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-10">
        <div className="px-4 py-3">
          <h1 className="text-xl font-bold text-gray-900">Messages</h1>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search for people and groups"
            className="pl-12 py-3 text-base bg-gray-100 border-gray-100 focus:bg-white focus:border-blue-500"
          />
        </div>
      </div>

      {/* Empty State */}
      <div className="bg-white p-12 text-center">
        <Mail className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Welcome to your inbox!</h3>
        <p className="text-gray-500 mb-6 max-w-sm mx-auto">
          Drop a line, share posts and more with private conversations between you and others on TwitterClone.
        </p>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 rounded-full">
          Write a message
        </Button>
      </div>
    </div>
  );
}