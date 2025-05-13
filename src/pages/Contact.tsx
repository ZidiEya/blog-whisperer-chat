
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <main className="py-12">
      <div className="blog-container">
        {/* Header */}
        <section className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </section>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact form */}
          <section>
            <div className="bg-card rounded-lg border p-6 md:p-8">
              <h2 className="text-xl font-bold mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    placeholder="What is your message about?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    placeholder="Your message..."
                    rows={5}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-blue-500 hover:bg-blue-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </section>
          
          {/* Contact info */}
          <section>
            <div className="bg-blue-50 rounded-lg p-6 md:p-8 mb-8">
              <h2 className="text-xl font-bold mb-4">Connect with us</h2>
              <p className="mb-6">
                We aim to respond to all inquiries within 48 hours during business days.
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">Email</h3>
                  <p>hello@blogchat.com</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Address</h3>
                  <p>123 Blog Street<br />San Francisco, CA 94107</p>
                </div>
                <div>
                  <h3 className="font-medium mb-1">Social Media</h3>
                  <div className="flex space-x-4 mt-2">
                    <a href="#" className="hover:text-blue-500">Twitter</a>
                    <a href="#" className="hover:text-blue-500">LinkedIn</a>
                    <a href="#" className="hover:text-blue-500">Instagram</a>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">How can I contribute to the blog?</h3>
                  <p className="text-muted-foreground">
                    We welcome guest posts from industry experts. Please contact us with your proposal.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Do you offer advertising opportunities?</h3>
                  <p className="text-muted-foreground">
                    Yes, please reach out to our advertising team at ads@blogchat.com.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">How does the chatbot work?</h3>
                  <p className="text-muted-foreground">
                    Our AI assistant is trained to help you find relevant content and answer questions about our articles.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Contact;
