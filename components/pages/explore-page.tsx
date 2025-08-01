'use client';

import { useState } from 'react';
import { Search, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TweetCard } from '@/components/tweets/tweet-card';
import { mockTweets, mockTrendingTopics } from '@/lib/mock-data';

export function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTweets, setFilteredTweets] = useState(mockTweets);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const filtered = mockTweets.filter(tweet =>
        tweet.content.toLowerCase().includes(query.toLowerCase()) ||
        tweet.displayName.toLowerCase().includes(query.toLowerCase()) ||
        tweet.username.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredTweets(filtered);
    } else {
      setFilteredTweets(mockTweets);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-10">
        <div className="px-4 py-3">
          <h1 className="text-xl font-bold text-gray-900">Explore</h1>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search TwitterClone"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-12 py-3 text-base bg-gray-100 border-gray-100 focus:bg-white focus:border-blue-500"
          />
        </div>
      </div>

      <Tabs defaultValue="trending" className="w-full">
        <div className="bg-white border-b border-gray-200">
          <TabsList className="w-full justify-start h-12 bg-transparent border-b-0 rounded-none">
            <TabsTrigger 
              value="trending" 
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none"
            >
              Trending
            </TabsTrigger>
            <TabsTrigger 
              value="latest" 
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none"
            >
              Latest
            </TabsTrigger>
            <TabsTrigger 
              value="people" 
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none"
            >
              People
            </TabsTrigger>
            <TabsTrigger 
              value="media" 
              className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none"
            >
              Media
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="trending" className="mt-0">
          <div className="bg-white">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                What's happening
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              {mockTrendingTopics.map((topic, index) => (
                <div key={topic.id} className="p-4 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">
                        {index + 1} · Trending in {topic.category}
                      </div>
                      <div className="font-bold text-gray-900 text-lg">
                        {topic.tag}
                      </div>
                      <div className="text-sm text-gray-500">
                        {topic.tweetCount.toLocaleString()} Tweets
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="latest" className="mt-0">
          <div className="divide-y divide-gray-200">
            {filteredTweets.map((tweet) => (
              <TweetCard key={tweet.id} tweet={tweet} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="people" className="mt-0">
          <div className="bg-white p-8 text-center">
            <div className="text-gray-500 mb-2">Try searching for people, topics, or keywords</div>
            <div className="text-sm text-gray-400">People results will appear here</div>
          </div>
        </TabsContent>

        <TabsContent value="media" className="mt-0">
          <div className="divide-y divide-gray-200">
            {filteredTweets.filter(tweet => tweet.images && tweet.images.length > 0).map((tweet) => (
              <TweetCard key={tweet.id} tweet={tweet} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}