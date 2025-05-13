
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <main className="py-12">
      <div className="blog-container">
        {/* Hero section */}
        <section className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About BlogChat</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A modern blog platform with an integrated AI chatbot to help users discover relevant content and get answers to their questions.
          </p>
        </section>
        
        {/* Mission section */}
        <section className="mb-16">
          <div className="bg-blog-muted rounded-lg p-8 md:p-12">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg mb-6">
                We believe in making knowledge accessible and engaging for everyone. 
                Our mission is to create a platform where insightful content meets 
                innovative technology to provide a seamless reading and discovery experience.
              </p>
              <p className="text-lg">
                Through our AI assistant, we aim to bridge the gap between 
                information and understanding, helping readers navigate our content 
                and find exactly what they're looking for with minimal effort.
              </p>
            </div>
          </div>
        </section>
        
        {/* Team section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Editor-in-Chief",
                bio: "Sarah has 10+ years of experience in technology journalism and leads our editorial strategy.",
                image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80"
              },
              {
                name: "Michael Chen",
                role: "Lead Designer",
                bio: "Michael specializes in accessible design and creates the visual language for our platform.",
                image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&q=80"
              },
              {
                name: "Emily Rodriguez",
                role: "AI Developer",
                bio: "Emily works on our chatbot technology, ensuring it provides helpful and accurate responses.",
                image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=400&q=80"
              }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="aspect-square w-48 h-48 mx-auto rounded-full overflow-hidden mb-4">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-medium mb-1">{member.name}</h3>
                <p className="text-blog-accent mb-2">{member.role}</p>
                <p className="text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* History section */}
        <section className="mb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Our Story</h2>
            <p className="mb-4">
              BlogChat started in 2024 as a small project between friends who were passionate about 
              technology, design, and making information more accessible. We noticed that while there 
              were many excellent blogs available, finding specific information often required 
              significant effort from readers.
            </p>
            <p className="mb-4">
              Our solution was to combine high-quality content with an AI-powered assistant that could 
              help users navigate the site, find relevant articles, and answer questions about the content.
              As our audience grew, we expanded our topics to include business, lifestyle, and more.
            </p>
            <p>
              Today, BlogChat continues to evolve with our commitment to quality content and 
              innovative user experiences at the core of everything we do.
            </p>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="text-center">
          <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Stay updated with our latest articles, features, and announcements by subscribing to our newsletter.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required
            />
            <Button className="bg-blog-accent hover:bg-blog-highlight">
              Subscribe
            </Button>
          </div>
          <div className="mt-8">
            <Button asChild variant="outline">
              <Link to="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default About;
