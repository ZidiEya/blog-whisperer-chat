
import React from 'react';
import FeaturedPosts from '@/components/blog/FeaturedPosts';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-blog-muted to-background">
        <div className="blog-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Discover Insights & Ideas on Our Blog
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Explore thoughtful articles on technology, design, and more. 
              Our AI assistant is ready to help you find what you're looking for.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-blog-accent hover:bg-blog-highlight">
                <Link to="/articles">
                  Explore Articles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/about">About Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <FeaturedPosts />

      {/* Categories Section */}
      <section className="py-12 bg-muted/50">
        <div className="blog-container">
          <h2 className="text-2xl font-bold mb-6 text-center">Explore Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Technology", image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80" },
              { name: "Design", image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80" },
              { name: "Business", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80" },
              { name: "Lifestyle", image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=600&q=80" }
            ].map((category) => (
              <Link
                key={category.name}
                to={`/articles?category=${category.name.toLowerCase()}`}
                className="group relative rounded-lg overflow-hidden h-48"
              >
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <h3 className="text-white text-xl font-bold">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services CTA */}
      <section className="py-12 bg-white border-y">
        <div className="blog-container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Premium Services for Tunisia Enthusiasts</h2>
            <p className="text-muted-foreground mb-6">
              Unlock expert consulting services and premium content with our membership plans. Elevate your Tunisian business and cultural experience.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild className="bg-blog-accent hover:bg-blog-highlight">
                <Link to="/payments">
                  View Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 md:py-16">
        <div className="blog-container">
          <div className="bg-blog-accent/10 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Get the latest articles and insights delivered straight to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row max-w-md mx-auto gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              />
              <Button type="submit" className="bg-blog-accent hover:bg-blog-highlight">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
