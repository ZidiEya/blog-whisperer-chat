
import React from 'react';
import { Button } from '@/components/ui/button';
import { X, ArrowLeft } from 'lucide-react';
import { ChatUser } from './ChatUserList';

interface ChatHeaderProps {
  activeTab: 'assistant' | 'users';
  selectedUser: ChatUser | null;
  onClose: () => void;
  onBackToUsers: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  activeTab, 
  selectedUser, 
  onClose, 
  onBackToUsers 
}) => {
  return (
    <div className="p-3 border-b border-border flex items-center justify-between bg-blue-500 text-primary-foreground rounded-t-lg">
      <h3 className="font-medium">
        {activeTab === 'assistant' ? 'Tunisie Hub Assistant' : 
        selectedUser ? selectedUser.name : 'Chats'}
      </h3>
      <div className="flex gap-2">
        {selectedUser && activeTab === 'users' && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onBackToUsers}
            className="h-8 w-8 text-primary-foreground hover:text-primary-foreground/80 hover:bg-blue-600"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to users</span>
          </Button>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose}
          className="h-8 w-8 text-primary-foreground hover:text-primary-foreground/80 hover:bg-blue-600"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
