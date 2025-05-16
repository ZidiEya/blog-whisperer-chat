
import React from 'react';
import PostCard from './PostCard';

// Sample data for featured posts
const FEATURED_POSTS = [
  {
    id: "1",
    title: "The Future of Web Development: What's Next in 2025",
    excerpt: "Explore the emerging trends and technologies that will shape web development in the coming years, from WebAssembly to AI-powered development tools.",
    author: "Eya Zidi",
    date: "2025-05-01",
    readTime: "6 min read",
    categories: ["Technology", "Web Development"],
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "2",
    title: "Designing for Accessibility: Best Practices for Inclusive UX",
    excerpt: "Learn how to create web experiences that are accessible to all users, including those with disabilities, and why inclusive design benefits everyone.",
    author: "Eya Zidi",
    date: "2025-04-28",
    readTime: "8 min read",
    categories: ["Design", "Accessibility"],
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "3",
    title: "The Rise of AI-Powered Content Creation Tools",
    excerpt: "An in-depth look at how artificial intelligence is revolutionizing content creation, from writing assistants to image generators and beyond.",
    author: "Eya Zidi",
    date: "2025-04-22",
    readTime: "5 min read",
    categories: ["AI", "Content"],
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=1200&q=80"
  }
];

const FeaturedPosts: React.FC = () => {
  return (
    <section className="py-8">
      <div className="blog-container">
        <h2 className="text-2xl font-bold mb-6">Featured Posts</h2>
        <div className="grid grid-cols-1 gap-6 md:gap-8">
          {FEATURED_POSTS.map((post, index) => (
            <PostCard 
              key={post.id} 
              post={post} 
              featured={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
