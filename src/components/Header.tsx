
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-bold text-xl text-slate-800 hover:text-blue-600 transition-colors">
            AccessibilityHub
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#how-it-works" 
              className="text-slate-600 hover:text-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded-sm px-1 py-1"
              aria-label="Learn how it works"
            >
              How it Works
            </a>
            <a 
              href="#about" 
              className="text-slate-600 hover:text-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded-sm px-1 py-1"
              aria-label="About us"
            >
              About
            </a>
            <a 
              href="#contact" 
              className="text-slate-600 hover:text-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded-sm px-1 py-1"
              aria-label="Contact us"
            >
              Contact
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};
