
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Mail } from 'lucide-react';

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubscribing(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsSubscribing(false);
      toast.success('Successfully subscribed to our newsletter!');
      
      // Store subscription in localStorage
      const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
      if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
      }
      
      setEmail('');
    }, 1000);
  };

  if (isSubscribed) {
    return (
      <Card className="bg-green-50 border-green-200">
        <CardContent className="pt-6 text-center">
          <Mail className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-green-800 mb-2">Welcome to our newsletter!</h3>
          <p className="text-green-700">You'll receive our latest articles and insights directly in your inbox.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center flex items-center justify-center gap-2">
          <Mail className="h-5 w-5" />
          Subscribe to Our Newsletter
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground mb-6">
          Get the latest articles and insights delivered straight to your inbox. No spam, unsubscribe anytime.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button 
            type="submit" 
            className="w-full bg-blog-accent hover:bg-blog-highlight"
            disabled={isSubscribing}
          >
            {isSubscribing ? 'Subscribing...' : 'Subscribe Now'}
          </Button>
        </form>
        <p className="text-xs text-center text-muted-foreground mt-4">
          By subscribing, you agree to receive emails from us. You can unsubscribe at any time.
        </p>
      </CardContent>
    </Card>
  );
};

export default NewsletterSignup;
