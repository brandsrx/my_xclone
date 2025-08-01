'use client';

import { useAuth } from '@/components/providers';
import { Sidebar } from './sidebar';
import { MobileNav } from './mobile-nav';
import { AuthPage } from '@/components/auth/auth-page';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>
        
        {/* Main Content */}
        <main className="flex-1 md:ml-0">
          <div className="max-w-2xl mx-auto">
            {children}
          </div>
        </main>
        
        {/* Right Sidebar for trends/suggestions */}
        <div className="hidden lg:block w-80 p-4">
          <div className="sticky top-4 space-y-4">
            {/* Trending Topics */}
            <div className="bg-white rounded-xl p-4 shadow-sm border">
              <h2 className="text-xl font-bold text-gray-900 mb-3">What's happening</h2>
              <div className="space-y-3">
                <div className="cursor-pointer hover:bg-gray-50 p-2 rounded-lg -m-2">
                  <div className="text-sm text-gray-500">Trending in Technology</div>
                  <div className="font-semibold text-gray-900">#WebDevelopment</div>
                  <div className="text-sm text-gray-500">15.4K Tweets</div>
                </div>
                <div className="cursor-pointer hover:bg-gray-50 p-2 rounded-lg -m-2">
                  <div className="text-sm text-gray-500">Trending in Programming</div>
                  <div className="font-semibold text-gray-900">#ReactJS</div>
                  <div className="text-sm text-gray-500">8.9K Tweets</div>
                </div>
                <div className="cursor-pointer hover:bg-gray-50 p-2 rounded-lg -m-2">
                  <div className="text-sm text-gray-500">Trending</div>
                  <div className="font-semibold text-gray-900">#AI</div>
                  <div className="text-sm text-gray-500">23.1K Tweets</div>
                </div>
              </div>
            </div>
            
            {/* Who to follow */}
            <div className="bg-white rounded-xl p-4 shadow-sm border">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Who to follow</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg?auto=compress&cs=tinysrgb&w=400"
                      alt="AI Researcher"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">AI Researcher</div>
                      <div className="text-sm text-gray-500">@airesearcher</div>
                    </div>
                  </div>
                  <button className="bg-black text-white px-4 py-1 rounded-full text-sm font-semibold hover:bg-gray-800">
                    Follow
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"
                      alt="Design Master"
                    />
                    <div>
                      <div className="font-semibold text-gray-900">Design Master</div>
                      <div className="text-sm text-gray-500">@designmaster</div>
                    </div>
                  </div>
                  <button className="bg-black text-white px-4 py-1 rounded-full text-sm font-semibold hover:bg-gray-800">
                    Follow
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <MobileNav />
      </div>
    </div>
  );
}