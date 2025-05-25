import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Menu, Search, X, User, LogOut } from "lucide-react";
import { useUser } from '@/contexts/UserContext';
import AuthModal from '@/components/auth/AuthModal';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const location = useLocation();
  const { currentUser, isAuthenticated, logout } = useUser();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <header className="py-4 border-b border-border sticky top-0 bg-background/80 backdrop-blur-sm z-40">
        <div className="container flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-foreground">
            Tunisie Hub
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`text-sm ${isActive('/') ? 'font-medium text-blog-accent' : 'text-foreground hover:text-blog-accent transition-colors'}`}>
              Home
            </Link>
            <Link to="/articles" className={`text-sm ${isActive('/articles') ? 'font-medium text-blog-accent' : 'text-foreground hover:text-blog-accent transition-colors'}`}>
              Articles
            </Link>
            <Link to="/about" className={`text-sm ${isActive('/about') ? 'font-medium text-blog-accent' : 'text-foreground hover:text-blog-accent transition-colors'}`}>
              About
            </Link>
            <Link to="/contact" className={`text-sm ${isActive('/contact') ? 'font-medium text-blog-accent' : 'text-foreground hover:text-blog-accent transition-colors'}`}>
              Contact
            </Link>
            <Button variant="ghost" size="icon" className="text-foreground hover:text-blog-accent">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </nav>

          {/* Authentication Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated && currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                      <AvatarFallback>
                        {currentUser.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{currentUser.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2">
                    <LogOut className="h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={() => setIsAuthModalOpen(true)} variant="outline">
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="sr-only">Menu</span>
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-[61px] left-0 right-0 bg-background border-b border-border animate-fade-in z-50">
            <div className="container py-4">
              <nav className="flex flex-col space-y-4">
                <Link 
                  to="/" 
                  className={`text-base py-2 ${isActive('/') ? 'font-medium text-blog-accent' : 'text-foreground'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/articles" 
                  className={`text-base py-2 ${isActive('/articles') ? 'font-medium text-blog-accent' : 'text-foreground'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Articles
                </Link>
                <Link 
                  to="/about" 
                  className={`text-base py-2 ${isActive('/about') ? 'font-medium text-blog-accent' : 'text-foreground'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  to="/contact" 
                  className={`text-base py-2 ${isActive('/contact') ? 'font-medium text-blog-accent' : 'text-foreground'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                <div className="pt-2 border-t border-border">
                  {isAuthenticated && currentUser ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 py-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                          <AvatarFallback>
                            {currentUser.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{currentUser.name}</span>
                      </div>
                      <Link 
                        to="/profile" 
                        className="block py-2 text-base"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <button 
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className="block py-2 text-base text-left w-full"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <Button 
                      onClick={() => {
                        setIsAuthModalOpen(true);
                        setIsMenuOpen(false);
                      }} 
                      variant="outline" 
                      className="w-full"
                    >
                      Sign In
                    </Button>
                  )}
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
};

export default Header;
