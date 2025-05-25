
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Share, Mail } from 'lucide-react';
import { toast } from 'sonner';

interface SocialShareProps {
  title: string;
  url?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ title, url = window.location.href }) => {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=Check out this article: ${encodedUrl}`
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
      return;
    }

    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      handleShare('copy');
    }
  };

  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <div className="text-center">
          <h4 className="text-lg font-semibold mb-4 flex items-center justify-center gap-2">
            <Share className="h-5 w-5" />
            Share this Article
          </h4>
          
          <div className="flex flex-wrap justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare('twitter')}
              className="bg-blue-500 text-white hover:bg-blue-600 border-blue-500"
            >
              Twitter
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare('facebook')}
              className="bg-blue-600 text-white hover:bg-blue-700 border-blue-600"
            >
              Facebook
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare('linkedin')}
              className="bg-blue-700 text-white hover:bg-blue-800 border-blue-700"
            >
              LinkedIn
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare('email')}
              className="bg-gray-600 text-white hover:bg-gray-700 border-gray-600"
            >
              <Mail className="h-4 w-4 mr-1" />
              Email
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleNativeShare}
            >
              <Share className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialShare;
