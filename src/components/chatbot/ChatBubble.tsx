
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useUser } from '@/contexts/UserContext';

interface ChatBubbleProps {
  message: {
    id: string;
    content: string;
    isBot: boolean;
    timestamp: Date;
    senderId?: string;
    receiverId?: string;
  };
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const { currentUser, getAllUsers } = useUser();
  
  // Format the timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Get user data for sender if available
  const getUserData = (userId?: string) => {
    if (!userId || userId === 'current-user') {
      return currentUser ? { name: currentUser.name, avatar: currentUser.avatar } : { name: 'You', avatar: '' };
    }
    
    const user = getAllUsers().find(u => u.id === userId);
    return user ? { name: user.name, avatar: user.avatar } : { name: 'Unknown User', avatar: '' };
  };

  const senderData = message.senderId ? getUserData(message.senderId) : null;
  const isCurrentUser = message.senderId === 'current-user' || message.senderId === currentUser?.id;

  return (
    <div className={cn(
      "flex w-full items-start gap-2 py-2",
      message.isBot ? "justify-start" : "justify-end"
    )}>
      {message.isBot && (
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg" alt="Bot" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      )}
      
      <div className={cn(
        "rounded-lg px-3 py-2 max-w-[80%] text-sm",
        message.isBot ? 
          "bg-muted text-foreground" : 
          "bg-blue-500 text-primary-foreground ml-auto"
      )}>
        <div className="flex flex-col gap-1">
          {message.content}
          <span className="text-xs opacity-70 self-end">
            {formatTime(message.timestamp)}
          </span>
        </div>
      </div>
      
      {!message.isBot && (
        <Avatar className="h-8 w-8">
          {senderData && senderData.avatar ? (
            <>
              <AvatarImage src={senderData.avatar} alt={senderData.name} />
              <AvatarFallback>{senderData.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </>
          ) : (
            <>
              <AvatarImage src="/placeholder.svg" alt={senderData?.name || 'User'} />
              <AvatarFallback>
                {senderData?.name.substring(0, 2).toUpperCase() || 'U'}
              </AvatarFallback>
            </>
          )}
        </Avatar>
      )}
    </div>
  );
};

export default ChatBubble;
