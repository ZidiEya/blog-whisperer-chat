import React from 'react';
import FeaturedPosts from '@/components/blog/FeaturedPosts';
import NewsletterSignup from '@/components/newsletter/NewsletterSignup';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const Index = () => {
  return (
    <main>
      {/* Hero Section with Tunisia background image */}
      <section 
        className="py-20 md:py-32 relative bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&q=80")'
        }}
      >
        {/* Overlay to ensure text is readable */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        <div className="blog-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Discover Insights & Ideas on Our Blog
            </h1>
            <p className="text-xl mb-8 text-white">
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
              <Button asChild variant="outline" size="lg" className="bg-white/20 text-white hover:bg-white/30 border-white">
                <Link to="/about">About Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <FeaturedPosts />

      {/* About Author Section */}
      <section className="py-10 bg-white">
        <div className="blog-container">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3">
              <Avatar className="h-36 w-36 rounded-full mx-auto">
                <AvatarImage 
                  src="/lovable-uploads/0c847fa3-d2fe-4d6a-ad25-637be5fd48a6.png" 
                  alt="Eya Zidi" 
                  className="object-cover"
                />
                <AvatarFallback>EZ</AvatarFallback>
              </Avatar>
            </div>
            <div className="md:w-2/3 text-center md:text-left">
              <h2 className="text-2xl font-bold mb-3">Meet Eya Zidi</h2>
              <p className="text-muted-foreground mb-4">
                Founder of Tunisie Hub and passionate advocate for Tunisian culture and technology. 
                Through this platform, I share insights about innovation, design, and the vibrant 
                cultural landscape of Tunisia.
              </p>
              <Button asChild variant="outline" className="border-blog-accent text-blog-accent hover:bg-blog-accent/10">
                <Link to="/about">Learn More About Me</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

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
          <NewsletterSignup />
        </div>
      </section>
    </main>
  );
};

export default Index;
