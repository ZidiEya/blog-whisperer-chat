
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border mt-12 py-8 bg-background">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-lg font-bold text-foreground">Tunisie Valley</Link>
            <p className="mt-2 text-sm text-muted-foreground">
              🇹🇳 Tunisie Hub – The Digital Pulse of Tunisia
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              A forward-thinking digital ecosystem that brings together innovation, culture, 
              and entrepreneurship from across Tunisia.
            </p>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-medium mb-2">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-blue-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/articles" className="text-sm text-muted-foreground hover:text-blue-500 transition-colors">
                  Articles
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-blue-500 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-blue-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-medium mb-2">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/articles?category=technology" className="text-sm text-muted-foreground hover:text-blue-500 transition-colors">
                  Technology
                </Link>
              </li>
              <li>
                <Link to="/articles?category=design" className="text-sm text-muted-foreground hover:text-blue-500 transition-colors">
                  Design
                </Link>
              </li>
              <li>
                <Link to="/articles?category=business" className="text-sm text-muted-foreground hover:text-blue-500 transition-colors">
                  Business
                </Link>
              </li>
              <li>
                <Link to="/articles?category=lifestyle" className="text-sm text-muted-foreground hover:text-blue-500 transition-colors">
                  Lifestyle
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Tunisie Valley. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <Link to="/privacy" className="text-xs text-muted-foreground hover:text-blue-500 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-xs text-muted-foreground hover:text-blue-500 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
