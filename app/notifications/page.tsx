import type { Metadata } from 'next';
import { MainLayout } from '@/components/layout/main-layout';
import { NotificationsPage } from '@/components/pages/notifications-page';

export const metadata: Metadata = {
  title: 'Notifications / TwitterClone',
  description: 'Stay updated with your latest notifications, mentions, and interactions on TwitterClone.',
  openGraph: {
    title: 'Notifications / TwitterClone',
    description: 'Stay updated with your latest notifications, mentions, and interactions on TwitterClone.',
  },
};

export default function Notifications() {
  return (
    <MainLayout>
      <NotificationsPage />
    </MainLayout>
  );
}