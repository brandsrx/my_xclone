import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MainLayout } from '@/components/layout/main-layout';
import { TweetDetailPage } from '@/components/pages/tweet-detail-page';
import { mockTweets } from '@/lib/mock-data';

interface TweetPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: TweetPageProps): Promise<Metadata> {
  const tweet = mockTweets.find(t => t.id === params.id);
  
  if (!tweet) {
    return {
      title: 'Tweet not found / TwitterClone',
    };
  }

  const truncatedContent = tweet.content.length > 160 
    ? tweet.content.substring(0, 160) + '...' 
    : tweet.content;

  return {
    title: `${tweet.displayName} on TwitterClone: "${truncatedContent}"`,
    description: `${tweet.content} - Posted by ${tweet.displayName} (@${tweet.username})`,
    openGraph: {
      title: `${tweet.displayName} on TwitterClone`,
      description: tweet.content,
      images: tweet.images?.length ? [
        {
          url: tweet.images[0],
          width: 800,
          height: 600,
          alt: 'Tweet image',
        },
      ] : [
        {
          url: tweet.avatar,
          width: 400,
          height: 400,
          alt: `${tweet.displayName} avatar`,
        },
      ],
    },
    twitter: {
      card: tweet.images?.length ? 'summary_large_image' : 'summary',
      title: `${tweet.displayName} on TwitterClone`,
      description: tweet.content,
      images: tweet.images?.length ? [tweet.images[0]] : [tweet.avatar],
    },
  };
}

export default function TweetPage({ params }: TweetPageProps) {
  const tweet = mockTweets.find(t => t.id === params.id);

  if (!tweet) {
    notFound();
  }

  return (
    <MainLayout>
      <TweetDetailPage tweet={tweet} />
    </MainLayout>
  );
}