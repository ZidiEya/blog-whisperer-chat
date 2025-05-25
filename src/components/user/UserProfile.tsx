
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';
import { Edit, Save, X } from 'lucide-react';
import ProfilePhotoUpload from './ProfilePhotoUpload';

const UserProfile: React.FC = () => {
  const { currentUser, updateProfile } = useUser();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    bio: currentUser?.bio || '',
    avatar: currentUser?.avatar || ''
  });

  if (!currentUser) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">Please log in to view your profile.</p>
        </CardContent>
      </Card>
    );
  }

  const handleSave = () => {
    updateProfile({
      name: formData.name,
      bio: formData.bio,
      avatar: formData.avatar
    });
    
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleCancel = () => {
    setFormData({
      name: currentUser.name,
      bio: currentUser.bio || '',
      avatar: currentUser.avatar || ''
    });
    setIsEditing(false);
  };

  const handlePhotoChange = (photoUrl: string) => {
    setFormData({ ...formData, avatar: photoUrl });
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>User Profile</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
        >
          <Edit className="h-4 w-4" />
          Edit Profile
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          {isEditing ? (
            <ProfilePhotoUpload
              currentAvatar={formData.avatar}
              userName={formData.name}
              onPhotoChange={handlePhotoChange}
            />
          ) : (
            <div className="flex items-center space-x-4">
              <ProfilePhotoUpload
                currentAvatar={currentUser.avatar}
                userName={currentUser.name}
                onPhotoChange={() => {}} // Read-only when not editing
              />
              <div className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${
                  currentUser.status === 'online' ? 'bg-green-500' : 
                  currentUser.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                }`} />
                <span className="text-sm text-muted-foreground capitalize">
                  {currentUser.status}
                </span>
              </div>
            </div>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your full name"
              />
            </div>
            
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Tell us about yourself..."
                rows={3}
              />
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handleSave} size="sm">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              <Button onClick={handleCancel} variant="outline" size="sm">
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <Label>Name</Label>
              <p className="mt-1 text-sm">{currentUser.name}</p>
            </div>
            
            <div>
              <Label>Email</Label>
              <p className="mt-1 text-sm text-muted-foreground">{currentUser.email}</p>
            </div>
            
            <div>
              <Label>Bio</Label>
              <p className="mt-1 text-sm">{currentUser.bio || 'No bio added yet.'}</p>
            </div>
            
            <div>
              <Label>Member since</Label>
              <p className="mt-1 text-sm text-muted-foreground">
                {currentUser.joinedAt.toLocaleDateString()}
              </p>
            </div>
            
            <div>
              <Label>Last active</Label>
              <p className="mt-1 text-sm text-muted-foreground">
                {currentUser.lastActive.toLocaleString()}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserProfile;
