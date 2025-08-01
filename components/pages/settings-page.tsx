'use client';

import { useState } from 'react';
import { ArrowLeft, User, Lock, Bell, Shield, Palette, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/components/providers';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function SettingsPage() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    bio: user?.bio || '',
    location: user?.location || '',
    website: user?.website || '',
  });

  const [notifications, setNotifications] = useState({
    likes: true,
    retweets: true,
    follows: true,
    mentions: true,
    directMessages: true,
    emailDigest: false,
  });

  const handleSaveProfile = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [field]: value }));
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-10">
        <div className="flex items-center px-4 py-3">
          <Button variant="ghost" size="sm" className="mr-4 rounded-full p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-gray-900">Settings</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <Tabs defaultValue="account" className="w-full">
          <div className="bg-white border-b border-gray-200">
            <TabsList className="w-full justify-start h-12 bg-transparent border-b-0 rounded-none overflow-x-auto">
              <TabsTrigger 
                value="account" 
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none flex items-center"
              >
                <User className="mr-2 h-4 w-4" />
                Account
              </TabsTrigger>
              <TabsTrigger 
                value="privacy" 
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none flex items-center"
              >
                <Shield className="mr-2 h-4 w-4" />
                Privacy
              </TabsTrigger>
              <TabsTrigger 
                value="notifications" 
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none flex items-center"
              >
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger 
                value="security" 
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none flex items-center"
              >
                <Lock className="mr-2 h-4 w-4" />
                Security
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="account" className="mt-6 px-4 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your profile details and how others see you on TwitterClone.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={user.avatar} alt={`${user.displayName} avatar`} />
                    <AvatarFallback className="text-xl">{user.displayName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" disabled>
                    Change photo
                  </Button>
                </div>

                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input
                      id="displayName"
                      value={isEditing ? formData.displayName : user.displayName}
                      onChange={(e) => handleInputChange('displayName', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={user.username}
                      disabled
                      className="bg-gray-50 text-gray-500"
                    />
                    <p className="text-sm text-gray-500">Username cannot be changed</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={isEditing ? formData.bio : user.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      disabled={!isEditing}
                      placeholder="Tell people about yourself"
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={isEditing ? formData.location : user.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      disabled={!isEditing}
                      placeholder="Where are you located?"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={isEditing ? formData.website : user.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      disabled={!isEditing}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>

                <div className="flex space-x-2">
                  {isEditing ? (
                    <>
                      <Button onClick={handleSaveProfile} className="bg-blue-500 hover:bg-blue-600">
                        Save changes
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditing(true)} variant="outline">
                      Edit profile
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="mt-6 px-4 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>
                  Control who can see your content and interact with you.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Protected Tweets</Label>
                    <p className="text-sm text-gray-500">Only approved followers can see your tweets</p>
                  </div>
                  <Switch />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Photo tagging</Label>
                    <p className="text-sm text-gray-500">Allow people to tag you in photos</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Direct messages</Label>
                    <p className="text-sm text-gray-500">Receive messages from anyone</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="mt-6 px-4 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Push Notifications</CardTitle>
                <CardDescription>
                  Choose what notifications you want to receive.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Likes</Label>
                    <p className="text-sm text-gray-500">When someone likes your tweets</p>
                  </div>
                  <Switch 
                    checked={notifications.likes}
                    onCheckedChange={(checked) => handleNotificationChange('likes', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Retweets</Label>
                    <p className="text-sm text-gray-500">When someone retweets your tweets</p>
                  </div>
                  <Switch 
                    checked={notifications.retweets}
                    onCheckedChange={(checked) => handleNotificationChange('retweets', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>New followers</Label>
                    <p className="text-sm text-gray-500">When someone follows you</p>
                  </div>
                  <Switch 
                    checked={notifications.follows}
                    onCheckedChange={(checked) => handleNotificationChange('follows', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Mentions</Label>
                    <p className="text-sm text-gray-500">When someone mentions you</p>
                  </div>
                  <Switch 
                    checked={notifications.mentions}
                    onCheckedChange={(checked) => handleNotificationChange('mentions', checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Email digest</Label>
                    <p className="text-sm text-gray-500">Weekly summary of your activity</p>
                  </div>
                  <Switch 
                    checked={notifications.emailDigest}
                    onCheckedChange={(checked) => handleNotificationChange('emailDigest', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="mt-6 px-4 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Security</CardTitle>
                <CardDescription>
                  Keep your account secure with these settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    placeholder="Enter current password"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="Enter new password"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm new password"
                  />
                </div>

                <Button className="bg-blue-500 hover:bg-blue-600">
                  Update password
                </Button>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Two-factor authentication</Label>
                    <p className="text-sm text-gray-500">Add an extra layer of security</p>
                  </div>
                  <Button variant="outline">
                    Enable
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}