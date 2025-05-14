import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Check, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const About = () => {
  return (
    <main className="py-12">
      <div className="blog-container">
        {/* Hero section with logo */}
        <section className="text-center mb-12">
          <div className="mx-auto w-48 h-48 mb-6">
            <AspectRatio ratio={1/1} className="bg-white rounded-full overflow-hidden">
              <img 
                src="/lovable-uploads/e3651d87-8ded-4f52-bc0a-ea44f577a923.png" 
                alt="Tunisie Valley Hub Logo" 
                className="object-cover w-full h-full"
              />
            </AspectRatio>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About Tunisie Hub</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A modern platform connecting Tunisia's digital future with its cultural roots, empowering local creators, entrepreneurs, and artisans.
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
        
        {/* Consulting Services section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Consulting Services</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h3 className="text-xl font-bold mb-4 text-blog-accent">Expert Guidance for Your Tunisian Ventures</h3>
              <p className="mb-6">
                Leverage our deep understanding of Tunisian business landscape, culture, and market dynamics. 
                Our team of experts provides tailored consulting services to help businesses, entrepreneurs, 
                and individuals navigate opportunities in Tunisia.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start">
                  <div className="bg-blog-muted p-2 rounded-full mr-4">
                    <Check className="h-5 w-5 text-blog-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Market Entry Strategy</h4>
                    <p className="text-sm text-muted-foreground">
                      Custom strategies for international companies entering the Tunisian market.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blog-muted p-2 rounded-full mr-4">
                    <Check className="h-5 w-5 text-blog-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Cultural Integration</h4>
                    <p className="text-sm text-muted-foreground">
                      Training and insights on Tunisian business etiquette and cultural nuances.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blog-muted p-2 rounded-full mr-4">
                    <Check className="h-5 w-5 text-blog-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Local Partnership Facilitation</h4>
                    <p className="text-sm text-muted-foreground">
                      Connect with vetted Tunisian businesses and potential partners.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blog-muted p-2 rounded-full mr-4">
                    <Check className="h-5 w-5 text-blog-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Regulatory Navigation</h4>
                    <p className="text-sm text-muted-foreground">
                      Guidance on navigating Tunisian business regulations and compliance requirements.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <Button className="bg-blog-accent hover:bg-blog-highlight" asChild>
                  <Link to="/payments?tab=consultation">
                    Schedule a Consultation
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Membership section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Membership Plans</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
            Join our community and get exclusive access to premium content, resources, and benefits tailored to your interests in Tunisian culture and business.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <Card className="relative overflow-hidden">
              <CardHeader>
                <CardTitle>Basic</CardTitle>
                <CardDescription>Free access to standard content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold mb-6">
                  Free
                </div>
                <ul className="space-y-2 mb-8">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-blog-accent mr-2" />
                    <span className="text-sm">Access to all public articles</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-blog-accent mr-2" />
                    <span className="text-sm">AI chatbot assistance</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-blog-accent mr-2" />
                    <span className="text-sm">Receive monthly newsletter</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Get Started</Button>
              </CardFooter>
            </Card>
            
            {/* Premium Plan */}
            <Card className="relative overflow-hidden border-blog-accent shadow-lg">
              <div className="absolute top-0 left-0 w-full bg-blog-accent text-white text-center py-1 text-xs font-bold">
                MOST POPULAR
              </div>
              <CardHeader className="pt-8">
                <CardTitle>Premium</CardTitle>
                <CardDescription>Enhanced access and benefits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold mb-6">
                  $9.99<span className="text-base font-normal">/month</span>
                </div>
                <ul className="space-y-2 mb-8">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-blog-accent mr-2" />
                    <span className="text-sm">Everything in Basic</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-blog-accent mr-2" />
                    <span className="text-sm">Exclusive premium articles</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-blog-accent mr-2" />
                    <span className="text-sm">Monthly virtual events</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-blog-accent mr-2" />
                    <span className="text-sm">Digital resources & guides</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-blog-accent hover:bg-blog-highlight" asChild>
                  <Link to="/payments?tab=membership">Subscribe Now</Link>
                </Button>
              </CardFooter>
            </Card>
            
            {/* Business Plan */}
            <Card className="relative overflow-hidden">
              <CardHeader>
                <CardTitle>Business</CardTitle>
                <CardDescription>For organizations and teams</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold mb-6">
                  $29.99<span className="text-base font-normal">/month</span>
                </div>
                <ul className="space-y-2 mb-8">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-blog-accent mr-2" />
                    <span className="text-sm">Everything in Premium</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-blog-accent mr-2" />
                    <span className="text-sm">Up to 5 team members</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-blog-accent mr-2" />
                    <span className="text-sm">Quarterly consultation calls</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-blog-accent mr-2" />
                    <span className="text-sm">Customized market reports</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-blog-accent mr-2" />
                    <span className="text-sm">Priority support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/payments?tab=membership">Contact Sales</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="text-center mt-8">
            <Button size="lg" className="bg-blog-accent hover:bg-blog-highlight" asChild>
              <Link to="/payments">View All Plans & Services</Link>
            </Button>
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
              Tunisie Hub started as a small project between friends who were passionate about 
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
              Today, Tunisie Hub continues to evolve with our commitment to quality content and 
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
