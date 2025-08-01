'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { ArrowLeft, Calendar, MapPin, Link as LinkIcon, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TweetCard } from '@/components/tweets/tweet-card';
import { useAuth } from '@/components/providers';

interface UserProfilePageProps {
  user: {
    id: string;
    username: string;
    displayName: string;
    avatar: string;
    bio: string;
    location: string;
    website: string;
    joinDate: string;
    following: number;
    followers: number;
    verified: boolean;
    tweets: any[];
  };
}

export function UserProfilePage({ user }: UserProfilePageProps) {
  const { user: currentUser } = useAuth();
  const [isFollowing, setIsFollowing] = useState(false);
  
  const isOwnProfile = currentUser?.username === user.username;

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-10">
        <div className="flex items-center px-4 py-3">
          <Button variant="ghost" size="sm" className="mr-4 rounded-full p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{user.displayName}</h1>
            <p className="text-sm text-gray-500">{user.tweets.length} Tweets</p>
          </div>
          <div className="ml-auto">
            <Button variant="ghost" size="sm" className="rounded-full p-2">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Cover Photo */}
      <div className="h-48 bg-gradient-to-r from-purple-400 to-pink-500"></div>

      {/* Profile Info */}
      <div className="bg-white">
        <div className="px-4 pb-4">
          <div className="flex justify-between items-start -mt-16 mb-4">
            <Avatar className="h-32 w-32 border-4 border-white">
              <AvatarImage src={user.avatar} alt={`${user.displayName} avatar`} />
              <AvatarFallback className="text-2xl">{user.displayName.charAt(0)}</AvatarFallback>
            </Avatar>
            {isOwnProfile ? (
              <Button 
                variant="outline" 
                className="mt-16 border-gray-300 hover:bg-gray-50"
              >
                Edit profile
              </Button>
            ) : (
              <Button 
                variant={isFollowing ? "outline" : "default"}
                className={`mt-16 ${isFollowing ? 'border-gray-300 hover:bg-gray-50' : 'bg-black text-white hover:bg-gray-800'}`}
                onClick={() => setIsFollowing(!isFollowing)}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </Button>
            )}
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex items-center space-x-1">
                <h1 className="text-xl font-bold text-gray-900">{user.displayName}</h1>
                {user.verified && (
                  <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20" aria-label="Verified account">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <p className="text-gray-500">@{user.username}</p>
            </div>

            {user.bio && (
              <p className="text-gray-900 text-base leading-relaxed">{user.bio}</p>
            )}

            <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-500">
              {user.location && (
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{user.location}</span>
                </div>
              )}
              {user.website && (
                <div className="flex items-center space-x-1">
                  <LinkIcon className="h-4 w-4" />
                  <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    {user.website.replace('https://', '')}
                  </a>
                </div>
              )}
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>Joined {format(new Date(user.joinDate), 'MMMM yyyy')}</span>
              </div>
            </div>

            <div className="flex space-x-6 text-sm">
              <div>
                <span className="font-bold text-gray-900">{user.following.toLocaleString()}</span>
                <span className="text-gray-500 ml-1">Following</span>
              </div>
              <div>
                <span className="font-bold text-gray-900">{user.followers.toLocaleString()}</span>
                <span className="text-gray-500 ml-1">Followers</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="tweets" className="w-full">
        <div className="bg-white border-b border-gray-200">
          <TabsList className="w-full justify-start h-12 bg-transparent border-b-0 rounded-none">
            <TabsTrigger 
              value="tweets" 
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none"
            >
              Tweets
            </TabsTrigger>
            <TabsTrigger 
              value="replies" 
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none"
            >
              Tweets & replies
            </TabsTrigger>
            <TabsTrigger 
              value="media" 
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none"
            >
              Media
            </TabsTrigger>
            <TabsTrigger 
              value="likes" 
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none"
            >
              Likes
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="tweets" className="mt-0">
          <div className="divide-y divide-gray-200">
            {user.tweets.length > 0 ? (
              user.tweets.map((tweet) => (
                <TweetCard key={tweet.id} tweet={tweet} />
              ))
            ) : (
              <div className="bg-white p-12 text-center">
                <div className="text-gray-500 mb-2">No tweets yet</div>
                <div className="text-sm text-gray-400">When {user.displayName} posts tweets, they'll show up here.</div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="replies" className="mt-0">
          <div className="bg-white p-12 text-center">
            <div className="text-gray-500 mb-2">No tweets and replies yet</div>
            <div className="text-sm text-gray-400">{user.displayName}'s tweets and replies will show up here.</div>
          </div>
        </TabsContent>

        <TabsContent value="media" className="mt-0">
          <div className="divide-y divide-gray-200">
            {user.tweets.filter(tweet => tweet.images && tweet.images.length > 0).length > 0 ? (
              user.tweets
                .filter(tweet => tweet.images && tweet.images.length > 0)
                .map((tweet) => (
                  <TweetCard key={tweet.id} tweet={tweet} />
                ))
            ) : (
              <div className="bg-white p-12 text-center">
                <div className="text-gray-500 mb-2">No media yet</div>
                <div className="text-sm text-gray-400">{user.displayName}'s photos and videos will show up here.</div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="likes" className="mt-0">
          <div className="bg-white p-12 text-center">
            <div className="text-gray-500 mb-2">No likes yet</div>
            <div className="text-sm text-gray-400">When {user.displayName} likes tweets, they'll show up here.</div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}