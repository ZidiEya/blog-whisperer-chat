
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: {
    id: string;
    content: string;
    isBot: boolean;
    timestamp: Date;
  };
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div className={cn(
      "flex w-full items-start gap-2 py-2",
      message.isBot ? "justify-start" : "justify-end"
    )}>
      {message.isBot && (
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg" alt="Bot" />
          <AvatarFallback>BC</AvatarFallback>
        </Avatar>
      )}
      
      <div className={cn(
        "rounded-lg px-3 py-2 max-w-[80%] text-sm",
        message.isBot ? 
          "bg-muted text-foreground" : 
          "bg-blog-accent text-primary-foreground ml-auto"
      )}>
        {message.content}
      </div>
      
      {!message.isBot && (
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg" alt="You" />
          <AvatarFallback>YOU</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
