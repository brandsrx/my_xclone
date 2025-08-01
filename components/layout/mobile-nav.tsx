'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/components/providers';
import { 
  Home, 
  Search, 
  Bell, 
  User 
} from 'lucide-react';

const mobileNavigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Explore', href: '/explore', icon: Search },
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Profile', href: '/profile', icon: User },
];

export function MobileNav() {
  const pathname = usePathname();
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden">
      <nav className="flex justify-around py-2" role="navigation" aria-label="Mobile navigation">
        {mobileNavigation.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex flex-col items-center px-3 py-2 text-xs font-medium transition-colors duration-200',
                isActive
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-gray-900'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              <item.icon className="h-6 w-6 mb-1" aria-hidden="true" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}