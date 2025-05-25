
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "@/contexts/UserContext";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ChatWidget from "./components/chatbot/ChatWidget";
import UserProfile from "./components/user/UserProfile";
import Index from "./pages/Index";
import Articles from "./pages/Articles";
import Article from "./pages/Article";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Payments from "./pages/Payments";
import UsersList from "./components/chatbot/UsersList";
import { SAMPLE_USERS } from "./components/chatbot/ChatUserList";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/article/:id" element={<Article />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/payments" element={<Payments />} />
                <Route path="/profile" element={
                  <div className="container mx-auto py-6">
                    <UserProfile />
                  </div>
                } />
                <Route path="/users" element={<UsersList users={SAMPLE_USERS} />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Footer />
            <ChatWidget />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
