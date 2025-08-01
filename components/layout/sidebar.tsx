'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/components/providers';
import { 
  Home, 
  Search, 
  Bell, 
  Mail, 
  Bookmark, 
  User, 
  Settings, 
  LogOut,
  Twitter,
  Edit3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Explore', href: '/explore', icon: Search },
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Messages', href: '/messages', icon: Mail },
  { name: 'Bookmarks', href: '/bookmarks', icon: Bookmark },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="sticky top-0 h-screen w-64 flex flex-col border-r border-gray-200 bg-white">
      {/* Logo */}
      <div className="flex items-center px-6 py-4">
        <Twitter className="h-8 w-8 text-blue-500" />
        <span className="ml-2 text-xl font-bold">TwitterClone</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1" role="navigation" aria-label="Main navigation">
        {navigation.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center px-4 py-3 text-base font-medium rounded-full transition-colors duration-200',
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              <item.icon className="mr-4 h-6 w-6" aria-hidden="true" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Tweet Button */}
      <div className="px-4 py-4">
        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-full py-3 font-semibold">
          <Edit3 className="mr-2 h-5 w-5" />
          Tweet
        </Button>
      </div>

      {/* User Info */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar} alt={`${user.displayName} avatar`} />
            <AvatarFallback>{user.displayName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-3 flex-1 min-w-0">
            <div className="flex items-center">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.displayName}
              </p>
              {user.verified && (
                <svg className="ml-1 h-4 w-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20" aria-label="Verified account">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <p className="text-sm text-gray-500 truncate">@{user.username}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="text-gray-500 hover:text-red-600"
            aria-label="Log out"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}