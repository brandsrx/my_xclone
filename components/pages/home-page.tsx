'use client';

import { useState } from 'react';
import { TweetCard } from '@/components/tweets/tweet-card';
import { ComposeTweet } from '@/components/tweets/compose-tweet';
import { mockTweets } from '@/lib/mock-data';
import type { Tweet } from '@/lib/mock-data';

export function HomePage() {
  const [tweets, setTweets] = useState<Tweet[]>(mockTweets);

  const handleNewTweet = (content: string) => {
    const newTweet: Tweet = {
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
    
    setTweets([newTweet, ...tweets]);
  };

  const handleLike = (tweetId: string) => {
    setTweets(tweets.map(tweet => 
      tweet.id === tweetId 
        ? { 
            ...tweet, 
            isLiked: !tweet.isLiked,
            likes: tweet.isLiked ? tweet.likes - 1 : tweet.likes + 1
          }
        : tweet
    ));
  };

  const handleRetweet = (tweetId: string) => {
    setTweets(tweets.map(tweet => 
      tweet.id === tweetId 
        ? { 
            ...tweet, 
            isRetweeted: !tweet.isRetweeted,
            retweets: tweet.isRetweeted ? tweet.retweets - 1 : tweet.retweets + 1
          }
        : tweet
    ));
  };

  const handleReply = (tweetId: string) => {
    // In a real app, this would open a reply modal or navigate to tweet detail
    console.log('Reply to tweet:', tweetId);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-10">
        <div className="px-4 py-3">
          <h1 className="text-xl font-bold text-gray-900">Home</h1>
        </div>
      </div>

      {/* Compose Tweet */}
      <ComposeTweet onTweet={handleNewTweet} />

      {/* Timeline */}
      <div className="divide-y divide-gray-200">
        {tweets.map((tweet) => (
          <TweetCard
            key={tweet.id}
            tweet={tweet}
            onLike={handleLike}
            onRetweet={handleRetweet}
            onReply={handleReply}
          />
        ))}
      </div>
    </div>
  );
}