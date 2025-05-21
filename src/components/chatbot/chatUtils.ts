
// Define common types and utilities for the chat system

export interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
  senderId?: string;
  receiverId?: string;
}

export const INITIAL_BOT_MESSAGES: Message[] = [
  {
    id: '1',
    content: "Hi there! I'm your Tunisie Hub assistant. How can I help you today?",
    isBot: true,
    timestamp: new Date()
  }
];

// Chatbot responses based on keywords
export const CHATBOT_RESPONSES: Record<string, string[]> = {
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
export const INITIAL_USER_CONVERSATIONS: Record<string, Message[]> = {
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

// Generate bot response based on user input
export const generateBotResponse = (userInput: string): string => {
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
