import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, X, Users, ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatMessage from './ChatMessage';
import ChatUserList, { ChatUser } from './ChatUserList';

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
  senderId?: string;
  receiverId?: string;
}

const INITIAL_BOT_MESSAGES: Message[] = [
  {
    id: '1',
    content: "Hi there! I'm your Tunisie Hub assistant. How can I help you today?",
    isBot: true,
    timestamp: new Date()
  }
];

// Sample users for demonstration
const SAMPLE_USERS: ChatUser[] = [
  {
    id: 'user-1',
    name: 'Eya Zidi',
    avatar: '/lovable-uploads/0c847fa3-d2fe-4d6a-ad25-637be5fd48a6.png',
    status: 'online',
    lastMessage: 'Hello, how are you doing?',
  },
  {
    id: 'user-2',
    name: 'Sarah Chen',
    avatar: 'https://i.pravatar.cc/150?img=32',
    status: 'online',
    lastMessage: 'Did you see the latest article?',
    unreadCount: 2
  },
  {
    id: 'user-3',
    name: 'Mohamed Ali',
    avatar: 'https://i.pravatar.cc/150?img=67',
    status: 'away',
    lastMessage: 'Looking forward to the meeting',
  },
  {
    id: 'user-4',
    name: 'James Wilson',
    avatar: 'https://i.pravatar.cc/150?img=53',
    status: 'offline',
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

// Sample user conversations
const INITIAL_USER_CONVERSATIONS: Record<string, Message[]> = {
  'user-1': [
    {
      id: 'u1-msg-1',
      content: "Hello, how are you doing?",
      isBot: false,
      timestamp: new Date(Date.now() - 3600000),
      senderId: 'user-1',
      receiverId: 'current-user'
    },
    {
      id: 'u1-msg-2',
      content: "I'm interested in your latest articles about technology.",
      isBot: false,
      timestamp: new Date(Date.now() - 1800000),
      senderId: 'user-1',
      receiverId: 'current-user'
    }
  ],
  'user-2': [
    {
      id: 'u2-msg-1',
      content: "Did you see the latest article?",
      isBot: false,
      timestamp: new Date(Date.now() - 7200000),
      senderId: 'user-2',
      receiverId: 'current-user'
    },
    {
      id: 'u2-msg-2',
      content: "I found it quite insightful!",
      isBot: false,
      timestamp: new Date(Date.now() - 7100000),
      senderId: 'user-2',
      receiverId: 'current-user'
    }
  ],
  'user-3': [
    {
      id: 'u3-msg-1',
      content: "Looking forward to the meeting tomorrow.",
      isBot: false,
      timestamp: new Date(Date.now() - 86400000),
      senderId: 'user-3',
      receiverId: 'current-user'
    }
  ]
};

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [botMessages, setBotMessages] = useState<Message[]>(INITIAL_BOT_MESSAGES);
  const [userConversations, setUserConversations] = useState<Record<string, Message[]>>(INITIAL_USER_CONVERSATIONS);
  const [input, setInput] = useState('');
  const [activeTab, setActiveTab] = useState<'assistant' | 'users'>('assistant');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [botMessages, userConversations, isOpen, selectedUserId]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    if (activeTab === 'assistant') {
      const userMessage: Message = {
        id: Date.now().toString(),
        content: input,
        isBot: false,
        timestamp: new Date()
      };
      
      setBotMessages((prev) => [...prev, userMessage]);
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
        
        setBotMessages((prev) => [...prev, botMessage]);
      }, 800);
    } else if (selectedUserId) {
      // Handle user-to-user message
      const userMessage: Message = {
        id: Date.now().toString(),
        content: input,
        isBot: false,
        timestamp: new Date(),
        senderId: 'current-user',
        receiverId: selectedUserId
      };
      
      setUserConversations((prev) => ({
        ...prev,
        [selectedUserId]: [...(prev[selectedUserId] || []), userMessage]
      }));
      setInput('');
      
      // Simulate response from the other user after a random delay
      if (Math.random() > 0.5) {
        const delay = 1000 + Math.random() * 2000;
        setTimeout(() => {
          const selectedUser = SAMPLE_USERS.find(user => user.id === selectedUserId);
          if (selectedUser) {
            const responses = [
              "Thanks for reaching out!",
              "Great to hear from you.",
              "I'll get back to you soon.",
              "Let me check and get back to you.",
              "Interesting point!"
            ];
            
            const responseMessage: Message = {
              id: (Date.now() + 1).toString(),
              content: responses[Math.floor(Math.random() * responses.length)],
              isBot: false,
              timestamp: new Date(),
              senderId: selectedUserId,
              receiverId: 'current-user'
            };
            
            setUserConversations((prev) => ({
              ...prev,
              [selectedUserId]: [...(prev[selectedUserId] || []), responseMessage]
            }));
          }
        }, delay);
      }
    }
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

  const handleSelectUser = (userId: string) => {
    setSelectedUserId(userId);
    // Mark messages as read (removing unread count)
    const updatedUsers = SAMPLE_USERS.map(user => {
      if (user.id === userId) {
        return { ...user, unreadCount: 0 };
      }
      return user;
    });
  };

  const getCurrentMessages = (): Message[] => {
    if (activeTab === 'assistant') {
      return botMessages;
    } else if (selectedUserId && userConversations[selectedUserId]) {
      return userConversations[selectedUserId];
    }
    return [];
  };

  return (
    <>
      {/* Chat button (always visible) */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className="h-12 w-12 rounded-full shadow-lg bg-blue-500 hover:bg-blue-600"
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
          <div className="p-3 border-b border-border flex items-center justify-between bg-blue-500 text-primary-foreground rounded-t-lg">
            <h3 className="font-medium">
              {activeTab === 'assistant' ? 'Tunisie Hub Assistant' : 
              selectedUserId ? 
                SAMPLE_USERS.find(user => user.id === selectedUserId)?.name : 
                'Chats'
              }
            </h3>
            <div className="flex gap-2">
              {selectedUserId && activeTab === 'users' && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setSelectedUserId(null)}
                  className="h-8 w-8 text-primary-foreground hover:text-primary-foreground/80 hover:bg-blue-600"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Back to users</span>
                </Button>
              )}
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 text-primary-foreground hover:text-primary-foreground/80 hover:bg-blue-600"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={(value) => {
            setActiveTab(value as 'assistant' | 'users');
            setSelectedUserId(null);
          }} className="flex flex-col flex-1">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="assistant">Assistant</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
            </TabsList>
            
            <TabsContent value="assistant" className="flex-1 flex flex-col">
              <ScrollArea className="flex-1 p-3">
                <div className="space-y-2">
                  {botMessages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))}
                </div>
                <div ref={messagesEndRef} />
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="users" className="flex-1 flex flex-col">
              {!selectedUserId ? (
                <ScrollArea className="flex-1">
                  <ChatUserList 
                    users={SAMPLE_USERS} 
                    selectedUserId={selectedUserId} 
                    onSelectUser={handleSelectUser} 
                  />
                </ScrollArea>
              ) : (
                <ScrollArea className="flex-1 p-3">
                  <div className="space-y-2">
                    {getCurrentMessages().map((message) => (
                      <ChatMessage 
                        key={message.id} 
                        message={{
                          ...message,
                          isBot: message.senderId !== 'current-user'
                        }} 
                      />
                    ))}
                  </div>
                  <div ref={messagesEndRef} />
                </ScrollArea>
              )}
            </TabsContent>
            
            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-border">
              <div className="flex items-center gap-2">
                <Input
                  placeholder={
                    activeTab === 'assistant' ? 
                    "Ask the assistant..." : 
                    selectedUserId ? 
                    "Type your message..." : 
                    "Select a user to chat with..."
                  }
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={activeTab === 'users' && !selectedUserId}
                  className="flex-1"
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  disabled={!input.trim() || (activeTab === 'users' && !selectedUserId)}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </div>
            </form>
          </Tabs>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
