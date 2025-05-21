
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

interface ChatInputProps {
  placeholder: string;
  disabled?: boolean;
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  placeholder, 
  disabled = false, 
  onSendMessage 
}) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    onSendMessage(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border-t border-border">
      <div className="flex items-center gap-2">
        <Input
          placeholder={placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={disabled}
          className="flex-1"
        />
        <Button 
          type="submit" 
          size="icon" 
          disabled={!input.trim() || disabled}
          className="bg-blue-500 hover:bg-blue-600"
        >
          <Send className="h-4 w-4" />
          <span className="sr-only">Send</span>
        </Button>
      </div>
    </form>
  );
};

export default ChatInput;
