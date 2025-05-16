
import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import PostCard from '@/components/blog/PostCard';
import CategoryTags from '@/components/blog/CategoryTags';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

// Sample data for all blog posts
const ALL_POSTS = [
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
  },
  {
    id: "4",
    title: "How to Build a Successful Remote Work Culture",
    excerpt: "Strategies for maintaining team cohesion, productivity, and employee satisfaction in distributed teams and remote work environments.",
    author: "Eya Zidi",
    date: "2025-04-15",
    readTime: "7 min read",
    categories: ["Business", "Remote Work"],
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "5",
    title: "Understanding Web3 and the Decentralized Internet",
    excerpt: "A beginner's guide to Web3 technologies, blockchain applications, and how decentralized systems are changing online interactions.",
    author: "Eya Zidi",
    date: "2025-04-10",
    readTime: "9 min read",
    categories: ["Technology", "Blockchain"],
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "6",
    title: "The Psychology of Color in Digital Design",
    excerpt: "How color choices affect user perception, emotions, and behavior, with practical tips for effective color schemes in your designs.",
    author: "Eya Zidi",
    date: "2025-04-05",
    readTime: "6 min read",
    categories: ["Design", "Psychology"],
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "7",
    title: "Building Sustainable Business Models in a Digital Economy",
    excerpt: "Strategies for creating businesses that thrive long-term in today's ever-changing digital landscape while minimizing environmental impact.",
    author: "Eya Zidi",
    date: "2025-03-28",
    readTime: "8 min read",
    categories: ["Business", "Sustainability"],
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "8",
    title: "Digital Minimalism: Simplifying Your Online Life",
    excerpt: "Practical approaches to reducing digital clutter, managing your online presence, and creating a healthier relationship with technology.",
    author: "Eya Zidi",
    date: "2025-03-22",
    readTime: "5 min read",
    categories: ["Lifestyle", "Technology"],
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80"
  }
];

// Extract all unique categories from posts
const ALL_CATEGORIES = Array.from(
  new Set(ALL_POSTS.flatMap(post => post.categories))
).sort();

const Articles = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Get category from URL params
  const categoryFilter = searchParams.get('category')?.toLowerCase() || '';
  
  // Filter posts based on category and search query
  const filteredPosts = useMemo(() => {
    return ALL_POSTS.filter(post => {
      // Filter by category if specified
      const matchesCategory = categoryFilter 
        ? post.categories.some(cat => cat.toLowerCase() === categoryFilter)
        : true;
      
      // Filter by search query if specified
      const matchesSearch = searchQuery
        ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      
      return matchesCategory && matchesSearch;
    });
  }, [categoryFilter, searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you could update URL params for search, but for simplicity we're just using state
  };

  const handleCategoryClick = (category: string) => {
    setSearchParams({ category: category.toLowerCase() });
  };

  const clearFilters = () => {
    setSearchParams({});
    setSearchQuery('');
  };

  return (
    <main>
      {/* Page Header */}
      <section className="py-10 bg-muted/30">
        <div className="blog-container">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {categoryFilter 
              ? `Articles on ${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)}` 
              : 'All Articles'}
          </h1>
          <p className="text-muted-foreground mb-6">
            Discover our collection of insightful blog posts on various topics
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="relative max-w-md">
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
            <Button 
              type="submit" 
              size="icon" 
              variant="ghost" 
              className="absolute right-0 top-0 h-10"
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </form>
        </div>
      </section>

      <section className="py-8">
        <div className="blog-container">
          {/* Categories filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              <Button 
                variant={!categoryFilter ? "default" : "outline"} 
                size="sm"
                onClick={clearFilters}
                className={!categoryFilter ? "bg-blog-accent hover:bg-blog-highlight" : ""}
              >
                All
              </Button>
              {ALL_CATEGORIES.map(category => (
                <Button 
                  key={category} 
                  variant={categoryFilter === category.toLowerCase() ? "default" : "outline"} 
                  size="sm"
                  onClick={() => handleCategoryClick(category)}
                  className={categoryFilter === category.toLowerCase() ? "bg-blog-accent hover:bg-blog-highlight" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
            
            {(categoryFilter || searchQuery) && (
              <div className="mb-4 flex items-center gap-2">
                <p className="text-sm text-muted-foreground">
                  {filteredPosts.length} {filteredPosts.length === 1 ? 'result' : 'results'} found
                </p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters} 
                  className="h-8 text-xs"
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>

          {/* Articles grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No articles found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button onClick={clearFilters} className="bg-blog-accent hover:bg-blog-highlight">
                View all articles
              </Button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Articles;
