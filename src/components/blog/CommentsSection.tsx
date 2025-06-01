
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { toast } from 'sonner';
import { MessageSquare } from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  email: string;
  content: string;
  date: string;
  avatar?: string;
}

interface CommentsSectionProps {
  articleId: string;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ articleId }) => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: 'Sarah Johnson',
      email: 'sarah@example.com',
      content: "This is exactly what I needed to read today! I've been struggling with implementing WebAssembly in my current project, and your explanation about it going mainstream really gives me hope. The performance improvements you mentioned align perfectly with what we're trying to achieve. Thanks for breaking it down so clearly! 🚀",
      date: '2025-05-20',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150'
    },
    {
      id: '2',
      author: 'Ahmed Ben Ali',
      email: 'ahmed@example.com',
      content: "Great insights, Eya! As a fellow Tunisian developer, I'm really excited about the AI-assisted development tools you mentioned. I've been using GitHub Copilot for a few months now and it's incredible how much it speeds up my workflow. Do you have any specific recommendations for AI tools that work well with Arabic documentation?",
      date: '2025-05-21'
    },
    {
      id: '3',
      author: 'Maria Rodriguez',
      email: 'maria.dev@gmail.com',
      content: "Absolutely loved the section on edge computing! I'm working at a startup and we're considering migrating our architecture to edge nodes. Your point about low latency and resilience really resonates with our challenges. Would love to see a follow-up article with some practical implementation examples. Keep up the amazing work! 💪",
      date: '2025-05-22',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
    },
    {
      id: '4',
      author: 'David Chen',
      email: 'dchen.tech@outlook.com',
      content: "I have mixed feelings about AI-assisted development tbh. While I agree it boosts productivity, I'm concerned about developers becoming too dependent on these tools and losing fundamental coding skills. What's your take on balancing AI assistance with traditional learning methods?",
      date: '2025-05-22'
    },
    {
      id: '5',
      author: 'Fatima Al-Zahra',
      email: 'fatima.codes@protonmail.com',
      content: "This article came at the perfect time! I'm preparing for a tech talk about the future of web development at our local meetup in Tunis. Your points about component-based design systems are spot on - we've been implementing exactly this approach at our company. Mind if I reference some of your insights? Will definitely credit you! 🙏",
      date: '2025-05-23',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
    },
    {
      id: '6',
      author: 'James Wilson',
      email: 'j.wilson.dev@gmail.com',
      content: "Really solid article! I'm curious though - you mentioned frameworks that 'seamlessly deploy to the edge' will become the default. Which specific frameworks are you most bullish on? I'm evaluating options for our next project and would love your thoughts on Vercel vs Cloudflare Workers vs others.",
      date: '2025-05-23'
    }
  ]);

  const [newComment, setNewComment] = useState({
    author: '',
    email: '',
    content: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.author || !newComment.email || !newComment.content) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    const comment: Comment = {
      id: Date.now().toString(),
      author: newComment.author,
      email: newComment.email,
      content: newComment.content,
      date: new Date().toISOString().split('T')[0]
    };

    setTimeout(() => {
      setComments(prev => [...prev, comment]);
      setNewComment({ author: '', email: '', content: '' });
      setIsSubmitting(false);
      toast.success('Comment added successfully!');
    }, 500);
  };

  return (
    <div className="mt-12 border-t pt-8">
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <MessageSquare className="h-6 w-6" />
        Comments ({comments.length})
      </h3>

      {/* Add Comment Form */}
      <Card className="mb-8">
        <CardHeader>
          <h4 className="text-lg font-semibold">Join the Conversation</h4>
          <p className="text-sm text-muted-foreground">Share your thoughts and experiences with the community</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitComment} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Your name"
                value={newComment.author}
                onChange={(e) => setNewComment(prev => ({ ...prev, author: e.target.value }))}
                required
              />
              <Input
                type="email"
                placeholder="Your email"
                value={newComment.email}
                onChange={(e) => setNewComment(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            <Textarea
              placeholder="What are your thoughts? Share your experience, ask questions, or add to the discussion..."
              rows={4}
              value={newComment.content}
              onChange={(e) => setNewComment(prev => ({ ...prev, content: e.target.value }))}
              required
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Posting...' : 'Post Comment'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <Card key={comment.id}>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage src={comment.avatar} alt={comment.author} />
                  <AvatarFallback>
                    {comment.author.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h5 className="font-semibold">{comment.author}</h5>
                    <span className="text-sm text-muted-foreground">{comment.date}</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{comment.content}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;
