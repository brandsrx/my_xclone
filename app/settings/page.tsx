import type { Metadata } from 'next';
import { MainLayout } from '@/components/layout/main-layout';
import { SettingsPage } from '@/components/pages/settings-page';

export const metadata: Metadata = {
  title: 'Settings / TwitterClone',
  description: 'Manage your TwitterClone account settings, privacy preferences, and notification options.',
  openGraph: {
    title: 'Settings / TwitterClone',
    description: 'Manage your TwitterClone account settings, privacy preferences, and notification options.',
  },
};

export default function Settings() {
  return (
    <MainLayout>
      <SettingsPage />
    </MainLayout>
  );
}