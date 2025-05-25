
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
      content: 'Great article! Really insightful perspective on the future of web development.',
      date: '2025-05-20',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150'
    },
    {
      id: '2',
      author: 'Ahmed Ben Ali',
      email: 'ahmed@example.com',
      content: 'Thanks for sharing this. The section on WebAssembly was particularly helpful.',
      date: '2025-05-21'
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
          <h4 className="text-lg font-semibold">Leave a Comment</h4>
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
              placeholder="Write your comment..."
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
                  <p className="text-muted-foreground">{comment.content}</p>
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
