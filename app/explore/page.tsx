import type { Metadata } from 'next';
import { MainLayout } from '@/components/layout/main-layout';
import { ExplorePage } from '@/components/pages/explore-page';

export const metadata: Metadata = {
  title: 'Explore / TwitterClone',
  description: 'Discover trending topics, hashtags, and conversations happening right now on TwitterClone.',
  openGraph: {
    title: 'Explore / TwitterClone',
    description: 'Discover trending topics, hashtags, and conversations happening right now on TwitterClone.',
  },
};

export default function Explore() {
  return (
    <MainLayout>
      <ExplorePage />
    </MainLayout>
  );
}