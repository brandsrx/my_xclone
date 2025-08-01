import type { Metadata } from 'next';
import { MainLayout } from '@/components/layout/main-layout';
import { MessagesPage } from '@/components/pages/messages-page';

export const metadata: Metadata = {
  title: 'Messages / TwitterClone',
  description: 'Send and receive direct messages with other TwitterClone users.',
  openGraph: {
    title: 'Messages / TwitterClone',
    description: 'Send and receive direct messages with other TwitterClone users.',
  },
};

export default function Messages() {
  return (
    <MainLayout>
      <MessagesPage />
    </MainLayout>
  );
}