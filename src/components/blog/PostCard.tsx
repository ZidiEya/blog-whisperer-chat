
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import CategoryTags from './CategoryTags';
import { format } from 'date-fns';

interface PostCardProps {
  post: {
    id: string;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    readTime: string;
    categories: string[];
    image?: string;
  };
  featured?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, featured = false }) => {
  const formattedDate = format(new Date(post.date), 'MMMM dd, yyyy');
  
  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-md border-border ${featured ? 'md:flex' : ''}`}>
      {post.image && (
        <div className={`${featured ? 'md:w-2/5' : 'w-full'}`}>
          <Link to={`/article/${post.id}`} className="block overflow-hidden">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
            />
          </Link>
        </div>
      )}
      <div className={`${featured ? 'md:w-3/5' : 'w-full'}`}>
        <CardHeader className="pb-2">
          <CategoryTags categories={post.categories} />
          <Link to={`/article/${post.id}`}>
            <h3 className={`font-bold hover:text-blog-accent transition-colors ${featured ? 'text-2xl mt-2' : 'text-xl mt-1'}`}>
              {post.title}
            </h3>
          </Link>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
        </CardContent>
        <CardFooter className="flex justify-between text-xs text-muted-foreground pt-2">
          <span>{post.author}</span>
          <div>
            <span>{formattedDate}</span>
            <span className="mx-2">•</span>
            <span>{post.readTime}</span>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};

export default PostCard;
