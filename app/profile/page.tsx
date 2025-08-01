import type { Metadata } from 'next';
import { MainLayout } from '@/components/layout/main-layout';
import { ProfilePage } from '@/components/pages/profile-page';

export const metadata: Metadata = {
  title: 'Profile / TwitterClone',
  description: 'View and edit your TwitterClone profile, see your tweets, and manage your account settings.',
  openGraph: {
    title: 'Profile / TwitterClone',
    description: 'View and edit your TwitterClone profile, see your tweets, and manage your account settings.',
  },
};

export default function Profile() {
  return (
    <MainLayout>
      <ProfilePage />
    </MainLayout>
  );
}