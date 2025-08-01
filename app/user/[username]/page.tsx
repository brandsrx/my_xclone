import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MainLayout } from '@/components/layout/main-layout';
import { UserProfilePage } from '@/components/pages/user-profile-page';
import { getUserByUsername } from '@/lib/mock-data';

interface UserPageProps {
  params: {
    username: string;
  };
}

export async function generateMetadata({ params }: UserPageProps): Promise<Metadata> {
  const user = getUserByUsername(params.username);
  
  if (!user) {
    return {
      title: 'Profile not found / TwitterClone',
    };
  }

  return {
    title: `${user.displayName} (@${user.username}) / TwitterClone`,
    description: user.bio || `${user.displayName}'s profile on TwitterClone. ${user.followers} followers.`,
    openGraph: {
      title: `${user.displayName} (@${user.username})`,
      description: user.bio || `${user.displayName}'s profile on TwitterClone. ${user.followers} followers.`,
      images: [
        {
          url: user.avatar,
          width: 400,
          height: 400,
          alt: `${user.displayName} avatar`,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title: `${user.displayName} (@${user.username})`,
      description: user.bio || `${user.displayName}'s profile on TwitterClone.`,
      images: [user.avatar],
    },
  };
}

export default function UserPage({ params }: UserPageProps) {
  const user = getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  return (
    <MainLayout>
      <UserProfilePage user={user} />
    </MainLayout>
  );
}