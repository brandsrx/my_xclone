'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/components/providers';
import { ImageIcon, Smile, Calendar, MapPin } from 'lucide-react';

interface ComposeTweetProps {
  onTweet?: (content: string) => void;
  placeholder?: string;
}

export function ComposeTweet({ onTweet, placeholder = "What's happening?" }: ComposeTweetProps) {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const maxLength = 280;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() && content.length <= maxLength) {
      onTweet?.(content);
      setContent('');
    }
  };

  const remainingChars = maxLength - content.length;
  const isOverLimit = remainingChars < 0;
  const isNearLimit = remainingChars <= 20;

  if (!user) return null;

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-3">
          <Avatar className="h-12 w-12 flex-shrink-0">
            <AvatarImage src={user.avatar} alt={`${user.displayName} avatar`} />
            <AvatarFallback>{user.displayName.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={placeholder}
              className="min-h-[120px] text-xl placeholder-gray-500 border-none resize-none focus:ring-0 p-0 shadow-none"
              maxLength={maxLength + 50} // Allow typing over limit to show error
            />
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-4">
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  className="text-blue-500 hover:bg-blue-50 rounded-full p-2"
                  disabled
                >
                  <ImageIcon className="h-5 w-5" />
                </Button>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  className="text-blue-500 hover:bg-blue-50 rounded-full p-2"
                  disabled
                >
                  <Smile className="h-5 w-5" />
                </Button>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  className="text-blue-500 hover:bg-blue-50 rounded-full p-2"
                  disabled
                >
                  <Calendar className="h-5 w-5" />
                </Button>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  className="text-blue-500 hover:bg-blue-50 rounded-full p-2"
                  disabled
                >
                  <MapPin className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="flex items-center space-x-3">
                {content && (
                  <div className="flex items-center space-x-2">
                    <div className={`text-sm ${isOverLimit ? 'text-red-500' : isNearLimit ? 'text-yellow-500' : 'text-gray-500'}`}>
                      {remainingChars}
                    </div>
                    <div className="w-8 h-8 relative">
                      <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
                        <circle
                          cx="16"
                          cy="16"
                          r="14"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="2"
                        />
                        <circle
                          cx="16"
                          cy="16"
                          r="14"
                          fill="none"
                          stroke={isOverLimit ? '#ef4444' : isNearLimit ? '#f59e0b' : '#3b82f6'}
                          strokeWidth="2"
                          strokeDasharray={`${(content.length / maxLength) * 87.96} 87.96`}
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>
                )}
                
                <Button
                  type="submit"
                  disabled={!content.trim() || isOverLimit}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Tweet
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}