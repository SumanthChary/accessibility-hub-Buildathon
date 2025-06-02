
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Sparkles } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
            <span className="text-lg sm:text-xl font-bold text-gray-900">AccessifyAI</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {!user && (
              <>
                <button 
                  onClick={() => scrollToSection('features')} 
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm lg:text-base"
                >
                  Features
                </button>
                <button 
                  onClick={() => scrollToSection('pricing')} 
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm lg:text-base"
                >
                  Pricing
                </button>
                <button 
                  onClick={() => scrollToSection('demo-section')} 
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm lg:text-base"
                >
                  Demo
                </button>
              </>
            )}
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            {user ? (
              <>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => window.location.href = '/profile'}
                  className="text-sm lg:text-base"
                >
                  Profile
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => window.location.href = '/payments'}
                  className="text-sm lg:text-base"
                >
                  Billing
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSignOut}
                  className="text-sm lg:text-base"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => window.location.href = '/auth'}
                  className="text-sm lg:text-base"
                >
                  Sign In
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => window.location.href = '/auth'}
                  className="bg-blue-600 hover:bg-blue-700 text-sm lg:text-base"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              {!user && (
                <>
                  <button 
                    onClick={() => scrollToSection('features')} 
                    className="text-left text-gray-600 hover:text-gray-900 transition-colors py-2"
                  >
                    Features
                  </button>
                  <button 
                    onClick={() => scrollToSection('pricing')} 
                    className="text-left text-gray-600 hover:text-gray-900 transition-colors py-2"
                  >
                    Pricing
                  </button>
                  <button 
                    onClick={() => scrollToSection('demo-section')} 
                    className="text-left text-gray-600 hover:text-gray-900 transition-colors py-2"
                  >
                    Demo
                  </button>
                </>
              )}
              
              {user ? (
                <>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      window.location.href = '/profile';
                      setIsMenuOpen(false);
                    }}
                    className="justify-start"
                  >
                    Profile
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      window.location.href = '/payments';
                      setIsMenuOpen(false);
                    }}
                    className="justify-start"
                  >
                    Billing
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleSignOut}
                    className="justify-start"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      window.location.href = '/auth';
                      setIsMenuOpen(false);
                    }}
                    className="justify-start"
                  >
                    Sign In
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => {
                      window.location.href = '/auth';
                      setIsMenuOpen(false);
                    }}
                    className="justify-start bg-blue-600 hover:bg-blue-700"
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
