
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Upload, Camera } from 'lucide-react';

interface ProfilePhotoUploadProps {
  currentAvatar?: string;
  userName: string;
  onPhotoChange: (photoUrl: string) => void;
}

const ProfilePhotoUpload: React.FC<ProfilePhotoUploadProps> = ({
  currentAvatar,
  userName,
  onPhotoChange
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file.",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB.",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    // Convert to base64 or object URL for demo purposes
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onPhotoChange(result);
      setIsUploading(false);
      toast({
        title: "Photo updated",
        description: "Your profile photo has been updated successfully."
      });
    };
    reader.onerror = () => {
      setIsUploading(false);
      toast({
        title: "Upload failed",
        description: "Failed to process the image. Please try again.",
        variant: "destructive"
      });
    };
    reader.readAsDataURL(file);
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative group">
        <Avatar className="h-24 w-24 cursor-pointer" onClick={triggerFileSelect}>
          <AvatarImage src={currentAvatar} alt={userName} />
          <AvatarFallback className="text-xl">
            {userName.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div 
          className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          onClick={triggerFileSelect}
        >
          <Camera className="h-6 w-6 text-white" />
        </div>
      </div>
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={triggerFileSelect}
        disabled={isUploading}
      >
        <Upload className="h-4 w-4 mr-2" />
        {isUploading ? 'Uploading...' : 'Change Photo'}
      </Button>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

export default ProfilePhotoUpload;
