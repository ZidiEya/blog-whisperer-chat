
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Store the message locally
    const messages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
    const newMessage = {
      ...formState,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      status: 'unread'
    };
    messages.push(newMessage);
    localStorage.setItem('contact_messages', JSON.stringify(messages));
    
    // Create a mailto link with form data
    const mailtoLink = `mailto:eyzvalleycartagena@outlook.com?subject=${encodeURIComponent(
      `Contact Form: ${formState.subject}`
    )}&body=${encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}\n\n---\nSent from Tunisie Hub Contact Form`
    )}`;
    
    try {
      // Open the user's email client with the populated email
      window.location.href = mailtoLink;
      
      // Show success message
      toast.success("Message saved and email client opened! We'll get back to you soon.");
      
      // Reset form after a short delay
      setTimeout(() => {
        setFormState({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }, 1000);
    } catch (error) {
      console.error("Error opening email client:", error);
      toast.error("Message saved but couldn't open email client. We'll still respond to your message!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="py-12 bg-cover bg-center min-h-screen" style={{ 
      backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80")',
      backgroundAttachment: 'fixed'
    }}>
      <div className="blog-container">
        {/* Header */}
        <section className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">Contact Us</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </section>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact form */}
          <section>
            <Card className="bg-white/90 backdrop-blur-sm border shadow-lg">
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email *
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
                      Subject *
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
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us more about your inquiry..."
                      rows={5}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-blue-500 hover:bg-blue-600"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending Message...' : 'Send Message'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </section>
          
          {/* Contact info */}
          <section>
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 md:p-8 mb-8 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Connect with us</h2>
              <p className="mb-6">
                We aim to respond to all inquiries within 48 hours during business days.
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">Email</h3>
                  <p>eyzvalleycartagena@outlook.com</p>
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
            
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 md:p-8 shadow-lg">
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
