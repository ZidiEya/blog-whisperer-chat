
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, X } from 'lucide-react';
import ChatMessage from './ChatMessage';

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    content: "Hi there! I'm your BlogChat assistant. How can I help you today?",
    isBot: true,
    timestamp: new Date()
  }
];

const CHATBOT_RESPONSES: Record<string, string[]> = {
  "technology": [
    "Here are some great technology articles you might enjoy reading.",
    "I found several technology posts that might interest you."
  ],
  "design": [
    "Check out these design articles from our blog.",
    "I've found some design-related content you might find helpful."
  ],
  "author": [
    "This blog is maintained by a team of expert writers passionate about sharing knowledge.",
    "Our authors are industry professionals with years of experience in their fields."
  ],
  "contact": [
    "You can contact us through our contact page or by emailing hello@blogchat.com.",
    "The best way to reach our team is through the contact form on our contact page."
  ],
  "hello": [
    "Hello! How can I assist you with our blog content today?",
    "Hi there! Looking for any specific articles or topics?"
  ],
  "help": [
    "I can help you find articles, learn about our authors, or navigate the site. What do you need?",
    "I'm here to assist! I can recommend articles or answer questions about our blog."
  ]
};

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isBot: false,
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    
    // Generate bot response after a short delay
    setTimeout(() => {
      const botResponse = generateBotResponse(input);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, botMessage]);
    }, 800);
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Check for keywords in the input
    for (const [keyword, responses] of Object.entries(CHATBOT_RESPONSES)) {
      if (input.includes(keyword)) {
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }
    
    // Default responses
    const defaultResponses = [
      "That's an interesting question. Let me help you find some relevant articles.",
      "Thanks for your message! Is there something specific you're looking for?",
      "I'm here to help you navigate our blog. What topic are you interested in?",
      "I can help you find articles on various topics. What would you like to explore?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  return (
    <>
      {/* Chat button (always visible) */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className="h-12 w-12 rounded-full shadow-lg bg-blog-accent hover:bg-blog-highlight"
        >
          {isOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <MessageCircle className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle chat</span>
        </Button>
      </div>
      
      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 md:w-96 h-[450px] bg-background border border-border rounded-lg shadow-lg flex flex-col animate-chat-open">
          {/* Header */}
          <div className="p-3 border-b border-border flex items-center justify-between bg-blog-accent text-primary-foreground rounded-t-lg">
            <h3 className="font-medium">BlogChat Assistant</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-primary-foreground hover:text-primary-foreground/80 hover:bg-blog-highlight"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-border">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1"
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={!input.trim()}
                className="bg-blog-accent hover:bg-blog-highlight"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
