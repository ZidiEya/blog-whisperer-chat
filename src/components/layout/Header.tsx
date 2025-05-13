
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, Search, X } from "lucide-react";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
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
              <div className="pt-2">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
