
import React, { useRef, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import ChatMessage from './ChatMessage';

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
  senderId?: string;
  receiverId?: string;
}

interface ChatMessagesProps {
  messages: Message[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <ScrollArea className="flex-1 p-3">
      <div className="space-y-2">
        {messages.map((message) => (
          <ChatMessage 
            key={message.id} 
            message={message} 
          />
        ))}
      </div>
      <div ref={messagesEndRef} />
    </ScrollArea>
  );
};

export default ChatMessages;
