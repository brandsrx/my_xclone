import type { Metadata } from 'next';
import { MainLayout } from '@/components/layout/main-layout';
import { BookmarksPage } from '@/components/pages/bookmarks-page';

export const metadata: Metadata = {
  title: 'Bookmarks / TwitterClone',
  description: 'View your saved tweets and bookmarked content on TwitterClone.',
  openGraph: {
    title: 'Bookmarks / TwitterClone',
    description: 'View your saved tweets and bookmarked content on TwitterClone.',
  },
};

export default function Bookmarks() {
  return (
    <MainLayout>
      <BookmarksPage />
    </MainLayout>
  );
}