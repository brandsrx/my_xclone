import type { Metadata } from 'next';
import { MainLayout } from '@/components/layout/main-layout';
import { HomePage } from '@/components/pages/home-page';

export const metadata: Metadata = {
  title: 'Home / TwitterClone',
  description: 'See what\'s happening in the world right now. Join the conversation on TwitterClone.',
  openGraph: {
    title: 'Home / TwitterClone',
    description: 'See what\'s happening in the world right now. Join the conversation on TwitterClone.',
  },
};

export default function Home() {
  return (
    <MainLayout>
      <HomePage />
    </MainLayout>
  );
}