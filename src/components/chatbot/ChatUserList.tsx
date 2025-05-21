
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export interface ChatUser {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'offline' | 'away';
  lastMessage?: string;
  unreadCount?: number;
}

interface ChatUserListProps {
  users: ChatUser[];
  selectedUserId: string | null;
  onSelectUser: (userId: string) => void;
}

const ChatUserList: React.FC<ChatUserListProps> = ({ 
  users, 
  selectedUserId, 
  onSelectUser 
}) => {
  return (
    <div className="flex flex-col overflow-y-auto">
      <h3 className="font-medium px-3 py-2 text-sm text-muted-foreground">Active Users</h3>
      <div className="flex flex-col space-y-1 px-1">
        {users.map((user) => (
          <button
            key={user.id}
            onClick={() => onSelectUser(user.id)}
            className={`flex items-center gap-3 rounded-md px-2 py-2 text-sm transition-colors hover:bg-secondary ${
              selectedUserId === user.id ? 'bg-secondary' : ''
            }`}
          >
            <div className="relative">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span 
                className={`absolute bottom-0 right-0 h-2 w-2 rounded-full ${
                  user.status === 'online' ? 'bg-green-500' : 
                  user.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'
                } ring-1 ring-background`}
              />
            </div>
            <div className="flex flex-col items-start">
              <span className="font-medium">{user.name}</span>
              {user.lastMessage && (
                <span className="text-xs text-muted-foreground line-clamp-1">{user.lastMessage}</span>
              )}
            </div>
            {user.unreadCount && user.unreadCount > 0 ? (
              <div className="ml-auto bg-blue-500 text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {user.unreadCount}
              </div>
            ) : null}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatUserList;
