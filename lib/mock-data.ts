export interface Tweet {
  id: string;
  userId: string;
  username: string;
  displayName: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  retweets: number;
  replies: number;
  isLiked: boolean;
  isRetweeted: boolean;
  verified: boolean;
  images?: string[];
}

export interface Notification {
  id: string;
  type: 'like' | 'retweet' | 'follow' | 'reply';
  userId: string;
  username: string;
  displayName: string;
  avatar: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface TrendingTopic {
  id: string;
  tag: string;
  tweetCount: number;
  category: string;
}

export const mockTweets: Tweet[] = [
  {
    id: '1',
    userId: '1',
    username: 'johndoe',
    displayName: 'John Doe',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
    content: 'Just finished building an amazing React component library! The developer experience is so smooth with TypeScript and Tailwind CSS. 🚀',
    timestamp: '2024-01-15T10:30:00Z',
    likes: 24,
    retweets: 8,
    replies: 3,
    isLiked: false,
    isRetweeted: false,
    verified: true,
    images: ['https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800']
  },
  {
    id: '2',
    userId: '2',
    username: 'techguru',
    displayName: 'Tech Guru',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400',
    content: 'The future of web development is looking bright! AI-assisted coding, better performance tools, and amazing frameworks. What are you most excited about? 🤔',
    timestamp: '2024-01-15T09:15:00Z',
    likes: 156,
    retweets: 34,
    replies: 28,
    isLiked: true,
    isRetweeted: false,
    verified: false,
  },
  {
    id: '3',
    userId: '3',
    username: 'designmaster',
    displayName: 'Design Master',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    content: 'Color theory is everything in UI design. A well-chosen palette can make or break your user experience. Here are my top 5 tools for color inspiration ✨',
    timestamp: '2024-01-15T08:45:00Z',
    likes: 89,
    retweets: 23,
    replies: 12,
    isLiked: false,
    isRetweeted: true,
    verified: true,
  },
  {
    id: '4',
    userId: '4',
    username: 'codewriter',
    displayName: 'Code Writer',
    avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400',
    content: 'Clean code is not written by following a set of rules. Clean code is written by someone who cares about the craft. 💻',
    timestamp: '2024-01-15T07:20:00Z',
    likes: 67,
    retweets: 19,
    replies: 8,
    isLiked: true,
    isRetweeted: false,
    verified: false,
  },
  {
    id: '5',
    userId: '5',
    username: 'airesearcher',
    displayName: 'AI Researcher',
    avatar: 'https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg?auto=compress&cs=tinysrgb&w=400',
    content: 'Machine learning models are getting more sophisticated every day. The applications in healthcare, finance, and climate science are truly revolutionary! 🧠🤖',
    timestamp: '2024-01-14T22:10:00Z',
    likes: 203,
    retweets: 67,
    replies: 45,
    isLiked: false,
    isRetweeted: false,
    verified: true,
    images: ['https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800']
  }
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'like',
    userId: '2',
    username: 'techguru',
    displayName: 'Tech Guru',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400',
    content: 'liked your tweet about React components',
    timestamp: '2024-01-15T10:00:00Z',
    read: false,
  },
  {
    id: '2',
    type: 'retweet',
    userId: '3',
    username: 'designmaster',
    displayName: 'Design Master',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    content: 'retweeted your post',
    timestamp: '2024-01-15T09:30:00Z',
    read: false,
  },
  {
    id: '3',
    type: 'follow',
    userId: '4',
    username: 'codewriter',
    displayName: 'Code Writer',
    avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400',
    content: 'started following you',
    timestamp: '2024-01-15T08:15:00Z',
    read: true,
  },
];

export const mockTrendingTopics: TrendingTopic[] = [
  {
    id: '1',
    tag: '#WebDevelopment',
    tweetCount: 15420,
    category: 'Technology',
  },
  {
    id: '2',
    tag: '#ReactJS',
    tweetCount: 8930,
    category: 'Programming',
  },
  {
    id: '3',
    tag: '#AI',
    tweetCount: 23140,
    category: 'Technology',
  },
  {
    id: '4',
    tag: '#Design',
    tweetCount: 6780,
    category: 'Creative',
  },
  {
    id: '5',
    tag: '#NextJS',
    tweetCount: 4250,
    category: 'Programming',
  },
];

export const getUserTweets = (userId: string): Tweet[] => {
  return mockTweets.filter(tweet => tweet.userId === userId);
};

export const getUserByUsername = (username: string) => {
  const userTweets = mockTweets.filter(tweet => tweet.username === username);
  if (userTweets.length === 0) return null;
  
  const user = userTweets[0];
  return {
    id: user.userId,
    username: user.username,
    displayName: user.displayName,
    avatar: user.avatar,
    bio: user.username === 'johndoe' ? 'Frontend Developer | React enthusiast | Coffee lover ☕' : 'Passionate about technology and innovation',
    location: user.username === 'johndoe' ? 'San Francisco, CA' : 'New York, NY',
    website: user.username === 'johndoe' ? 'https://johndoe.dev' : '',
    joinDate: '2021-03-15',
    following: Math.floor(Math.random() * 500),
    followers: Math.floor(Math.random() * 2000),
    verified: user.verified,
    tweets: userTweets,
  };
};