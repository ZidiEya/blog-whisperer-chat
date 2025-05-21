
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChatUserList, { SAMPLE_USERS } from './ChatUserList';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';
import { 
  Message, 
  INITIAL_BOT_MESSAGES, 
  INITIAL_USER_CONVERSATIONS,
  generateBotResponse
} from './chatUtils';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [botMessages, setBotMessages] = useState<Message[]>(INITIAL_BOT_MESSAGES);
  const [userConversations, setUserConversations] = useState<Record<string, Message[]>>(INITIAL_USER_CONVERSATIONS);
  const [activeTab, setActiveTab] = useState<'assistant' | 'users'>('assistant');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const handleSendMessage = (input: string) => {
    if (activeTab === 'assistant') {
      const userMessage: Message = {
        id: Date.now().toString(),
        content: input,
        isBot: false,
        timestamp: new Date()
      };
      
      setBotMessages((prev) => [...prev, userMessage]);
      
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
      
      // Simulate response from the other user after a random delay
      simulateUserResponse(selectedUserId);
    }
  };

  const simulateUserResponse = (userId: string) => {
    if (Math.random() > 0.5) {
      const delay = 1000 + Math.random() * 2000;
      setTimeout(() => {
        const selectedUser = SAMPLE_USERS.find(user => user.id === userId);
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
            senderId: userId,
            receiverId: 'current-user'
          };
          
          setUserConversations((prev) => ({
            ...prev,
            [userId]: [...(prev[userId] || []), responseMessage]
          }));
        }
      }, delay);
    }
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

  const getSelectedUser = () => {
    if (selectedUserId) {
      return SAMPLE_USERS.find(user => user.id === selectedUserId) || null;
    }
    return null;
  };

  const getInputPlaceholder = () => {
    if (activeTab === 'assistant') {
      return "Ask the assistant...";
    } else if (selectedUserId) {
      return "Type your message...";
    }
    return "Select a user to chat with...";
  };

  const handleBackToUsers = () => setSelectedUserId(null);

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
          <ChatHeader 
            activeTab={activeTab}
            selectedUser={getSelectedUser()}
            onClose={() => setIsOpen(false)}
            onBackToUsers={handleBackToUsers}
          />
          
          <Tabs value={activeTab} onValueChange={(value) => {
            setActiveTab(value as 'assistant' | 'users');
            setSelectedUserId(null);
          }} className="flex flex-col flex-1">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="assistant">Assistant</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
            </TabsList>
            
            <TabsContent value="assistant" className="flex-1 flex flex-col">
              <ChatMessages messages={botMessages} />
            </TabsContent>
            
            <TabsContent value="users" className="flex-1 flex flex-col">
              {!selectedUserId ? (
                <ChatUserList 
                  users={SAMPLE_USERS} 
                  selectedUserId={selectedUserId} 
                  onSelectUser={handleSelectUser} 
                />
              ) : (
                <ChatMessages messages={getCurrentMessages()} />
              )}
            </TabsContent>
            
            {/* Input */}
            <ChatInput 
              placeholder={getInputPlaceholder()}
              disabled={activeTab === 'users' && !selectedUserId}
              onSendMessage={handleSendMessage}
            />
          </Tabs>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
