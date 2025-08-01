'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageCircle, Repeat2, Share, MoreHorizontal } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Tweet } from '@/lib/mock-data';

interface TweetCardProps {
  tweet: Tweet;
  onLike?: (tweetId: string) => void;
  onRetweet?: (tweetId: string) => void;
  onReply?: (tweetId: string) => void;
}

export function TweetCard({ tweet, onLike, onRetweet, onReply }: TweetCardProps) {
  const [isLiked, setIsLiked] = useState(tweet.isLiked);
  const [isRetweeted, setIsRetweeted] = useState(tweet.isRetweeted);
  const [likes, setLikes] = useState(tweet.likes);
  const [retweets, setRetweets] = useState(tweet.retweets);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
    onLike?.(tweet.id);
  };

  const handleRetweet = () => {
    setIsRetweeted(!isRetweeted);
    setRetweets(isRetweeted ? retweets - 1 : retweets + 1);
    onRetweet?.(tweet.id);
  };

  const handleReply = () => {
    onReply?.(tweet.id);
  };

  const formatNumber = (num: number) => {
    if (num < 1000) return num.toString();
    if (num < 1000000) return (num / 1000).toFixed(1) + 'K';
    return (num / 1000000).toFixed(1) + 'M';
  };

  return (
    <article className="bg-white border-b border-gray-200 p-4 hover:bg-gray-50 transition-colors duration-200">
      <div className="flex space-x-3">
        {/* Avatar */}
        <Link href={`/user/${tweet.username}`} className="flex-shrink-0">
          <Avatar className="h-12 w-12">
            <AvatarImage src={tweet.avatar} alt={`${tweet.displayName} avatar`} />
            <AvatarFallback>{tweet.displayName.charAt(0)}</AvatarFallback>
          </Avatar>
        </Link>

        {/* Tweet Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center space-x-2 mb-1">
            <Link href={`/user/${tweet.username}`} className="hover:underline">
              <span className="font-semibold text-gray-900">{tweet.displayName}</span>
            </Link>
            {tweet.verified && (
              <svg className="h-4 w-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20" aria-label="Verified account">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
            <span className="text-gray-500">@{tweet.username}</span>
            <span className="text-gray-500">·</span>
            <Link href={`/tweet/${tweet.id}`} className="text-gray-500 hover:underline">
              <time dateTime={tweet.timestamp}>
                {formatDistanceToNow(new Date(tweet.timestamp), { addSuffix: true })}
              </time>
            </Link>
            <div className="ml-auto">
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full p-2">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Tweet Text */}
          <div className="mb-3">
            <p className="text-gray-900 text-base leading-relaxed whitespace-pre-wrap">
              {tweet.content}
            </p>
          </div>

          {/* Images */}
          {tweet.images && tweet.images.length > 0 && (
            <div className="mb-3">
              <div className="grid grid-cols-1 gap-2">
                {tweet.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt=""
                    className="rounded-lg max-w-full h-auto border border-gray-200"
                    style={{ maxHeight: '400px', objectFit: 'cover' }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between max-w-md">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReply}
              className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full p-2 flex items-center space-x-1 group"
            >
              <MessageCircle className="h-5 w-5 group-hover:fill-current" />
              <span className="text-sm">{tweet.replies}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleRetweet}
              className={cn(
                "rounded-full p-2 flex items-center space-x-1 group",
                isRetweeted
                  ? "text-green-600 hover:text-green-700 hover:bg-green-50"
                  : "text-gray-500 hover:text-green-600 hover:bg-green-50"
              )}
            >
              <Repeat2 className={cn("h-5 w-5", isRetweeted && "fill-current")} />
              <span className="text-sm">{formatNumber(retweets)}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={cn(
                "rounded-full p-2 flex items-center space-x-1 group",
                isLiked
                  ? "text-red-600 hover:text-red-700 hover:bg-red-50"
                  : "text-gray-500 hover:text-red-600 hover:bg-red-50"
              )}
            >
              <Heart className={cn("h-5 w-5", isLiked && "fill-current")} />
              <span className="text-sm">{formatNumber(likes)}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full p-2 group"
            >
              <Share className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}