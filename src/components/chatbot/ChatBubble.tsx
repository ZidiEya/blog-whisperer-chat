
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

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

// Sample user data mapping - in a real app, this would come from a database
const USER_DATA: Record<string, { name: string, avatar: string }> = {
  'user-1': { name: 'Eya Zidi', avatar: '/lovable-uploads/0c847fa3-d2fe-4d6a-ad25-637be5fd48a6.png' },
  'user-2': { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/150?img=32' },
  'user-3': { name: 'Mohamed Ali', avatar: 'https://i.pravatar.cc/150?img=67' },
  'user-4': { name: 'James Wilson', avatar: 'https://i.pravatar.cc/150?img=53' }
};

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  // Format the timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Get user data for sender if available
  const getUserData = (userId?: string) => {
    if (!userId || userId === 'current-user') {
      return { name: 'You', avatar: '' };
    }
    return USER_DATA[userId] || { name: 'Unknown User', avatar: '' };
  };

  const senderData = message.senderId ? getUserData(message.senderId) : null;
  const avatarInitials = message.isBot ? 'AI' : senderData?.name.substring(0, 2).toUpperCase() || 'YOU';

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
          {message.senderId && message.senderId !== 'current-user' && senderData ? (
            <>
              <AvatarImage src={senderData.avatar} alt={senderData.name} />
              <AvatarFallback>{senderData.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </>
          ) : (
            <>
              <AvatarImage src="/placeholder.svg" alt="You" />
              <AvatarFallback>YOU</AvatarFallback>
            </>
          )}
        </Avatar>
      )}
    </div>
  );
};

export default ChatBubble;
