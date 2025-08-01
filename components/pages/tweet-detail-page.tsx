'use client';

import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TweetCard } from '@/components/tweets/tweet-card';
import { ComposeTweet } from '@/components/tweets/compose-tweet';
import type { Tweet } from '@/lib/mock-data';

interface TweetDetailPageProps {
  tweet: Tweet;
}

export function TweetDetailPage({ tweet }: TweetDetailPageProps) {
  const [replies, setReplies] = useState<Tweet[]>([]);

  const handleReply = (content: string) => {
    const newReply: Tweet = {
      id: Date.now().toString(),
      userId: '1',
      username: 'johndoe',
      displayName: 'John Doe',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
      content,
      timestamp: new Date().toISOString(),
      likes: 0,
      retweets: 0,
      replies: 0,
      isLiked: false,
      isRetweeted: false,
      verified: true,
    };
    
    setReplies([newReply, ...replies]);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-10">
        <div className="flex items-center px-4 py-3">
          <Button variant="ghost" size="sm" className="mr-4 rounded-full p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-gray-900">Tweet</h1>
        </div>
      </div>

      {/* Main Tweet */}
      <TweetCard tweet={tweet} />

      {/* Reply Composer */}
      <ComposeTweet 
        onTweet={handleReply} 
        placeholder={`Reply to @${tweet.username}`}
      />

      {/* Replies */}
      {replies.length > 0 && (
        <div className="divide-y divide-gray-200">
          {replies.map((reply) => (
            <TweetCard key={reply.id} tweet={reply} />
          ))}
        </div>
      )}

      {/* Mock replies for demonstration */}
      <div className="bg-white p-8 text-center border-b border-gray-200">
        <div className="text-gray-500 mb-2">Be the first to reply</div>
        <div className="text-sm text-gray-400">Share your thoughts about this tweet</div>
      </div>
    </div>
  );
}