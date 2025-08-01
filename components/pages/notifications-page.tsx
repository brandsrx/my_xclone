'use client';

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Heart, Repeat2, UserPlus, MessageCircle, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockNotifications } from '@/lib/mock-data';
import type { Notification } from '@/lib/mock-data';

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'like':
      return <Heart className="h-6 w-6 text-red-500 fill-current" />;
    case 'retweet':
      return <Repeat2 className="h-6 w-6 text-green-500 fill-current" />;
    case 'follow':
      return <UserPlus className="h-6 w-6 text-blue-500 fill-current" />;
    case 'reply':
      return <MessageCircle className="h-6 w-6 text-blue-500 fill-current" />;
    default:
      return null;
  }
};

const getNotificationText = (notification: Notification) => {
  switch (notification.type) {
    case 'like':
      return `${notification.displayName} liked your tweet`;
    case 'retweet':
      return `${notification.displayName} retweeted your tweet`;
    case 'follow':
      return `${notification.displayName} followed you`;
    case 'reply':
      return `${notification.displayName} replied to your tweet`;
    default:
      return notification.content;
  }
};

export function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
          <Button variant="ghost" size="sm">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-2">
            <TabsList className="bg-transparent border-b-0 rounded-none h-10">
              <TabsTrigger 
                value="all" 
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none"
              >
                All {unreadCount > 0 && <span className="ml-1 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">{unreadCount}</span>}
              </TabsTrigger>
              <TabsTrigger 
                value="mentions" 
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none"
              >
                Mentions
              </TabsTrigger>
            </TabsList>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-blue-500 hover:text-blue-600 text-sm"
              >
                Mark all as read
              </Button>
            )}
          </div>
        </div>

        <TabsContent value="all" className="mt-0">
          <div className="divide-y divide-gray-200">
            {notifications.length === 0 ? (
              <div className="bg-white p-12 text-center">
                <Bell className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications yet</h3>
                <p className="text-gray-500">When you get notifications, they'll show up here.</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`bg-white p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200 ${
                    !notification.read ? 'border-l-4 border-blue-500' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex space-x-3">
                    <div className="flex-shrink-0 pt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={notification.avatar} alt={`${notification.displayName} avatar`} />
                          <AvatarFallback>{notification.displayName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">
                            <span className="font-semibold">{notification.displayName}</span>
                            <span className="text-gray-500 ml-1">@{notification.username}</span>
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-700 mb-2">
                        {getNotificationText(notification)}
                      </p>
                      
                      <p className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="mentions" className="mt-0">
          <div className="bg-white p-12 text-center">
            <MessageCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No mentions yet</h3>
            <p className="text-gray-500">When someone mentions you, you'll find it here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}