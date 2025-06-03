
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
    window.location.href = '/';
  };

  const navigateToAuth = () => {
    window.location.href = '/auth';
    setIsMenuOpen(false);
  };

  const navigateToPayments = () => {
    window.location.href = '/payments';
    setIsMenuOpen(false);
  };

  const navigateToProfile = () => {
    window.location.href = '/profile';
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center space-x-1 sm:space-x-2 min-w-0">
            <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-blue-600 flex-shrink-0" />
            <span className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 truncate">
              AccessifyAI
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            {!user && (
              <>
                <button 
                  onClick={() => scrollToSection('features')} 
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm xl:text-base whitespace-nowrap"
                >
                  Features
                </button>
                <button 
                  onClick={() => scrollToSection('pricing')} 
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm xl:text-base whitespace-nowrap"
                >
                  Pricing
                </button>
                <button 
                  onClick={() => scrollToSection('demo-section')} 
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm xl:text-base whitespace-nowrap"
                >
                  Demo
                </button>
              </>
            )}
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-3 min-w-0">
            {user ? (
              <>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={navigateToProfile}
                  className="text-xs lg:text-sm whitespace-nowrap px-2 lg:px-3"
                >
                  Profile
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={navigateToPayments}
                  className="text-xs lg:text-sm whitespace-nowrap px-2 lg:px-3"
                >
                  Billing
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSignOut}
                  className="text-xs lg:text-sm whitespace-nowrap px-2 lg:px-3"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={navigateToAuth}
                  className="text-xs lg:text-sm whitespace-nowrap px-2 lg:px-3"
                >
                  Sign In
                </Button>
                <Button 
                  size="sm" 
                  onClick={navigateToAuth}
                  className="bg-blue-600 hover:bg-blue-700 text-xs lg:text-sm whitespace-nowrap px-2 lg:px-3"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-1.5 flex-shrink-0"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5 text-gray-600" />
            ) : (
              <Menu className="h-5 w-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-3 bg-white">
            <div className="flex flex-col space-y-3">
              {!user && (
                <>
                  <button 
                    onClick={() => scrollToSection('features')} 
                    className="text-left text-gray-600 hover:text-gray-900 transition-colors py-2 px-1 text-sm"
                  >
                    Features
                  </button>
                  <button 
                    onClick={() => scrollToSection('pricing')} 
                    className="text-left text-gray-600 hover:text-gray-900 transition-colors py-2 px-1 text-sm"
                  >
                    Pricing
                  </button>
                  <button 
                    onClick={() => scrollToSection('demo-section')} 
                    className="text-left text-gray-600 hover:text-gray-900 transition-colors py-2 px-1 text-sm"
                  >
                    Demo
                  </button>
                </>
              )}
              
              <div className="pt-2 space-y-2">
                {user ? (
                  <>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={navigateToProfile}
                      className="justify-start w-full text-sm"
                    >
                      Profile
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={navigateToPayments}
                      className="justify-start w-full text-sm"
                    >
                      Billing
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleSignOut}
                      className="justify-start w-full text-sm"
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={navigateToAuth}
                      className="justify-start w-full text-sm"
                    >
                      Sign In
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={navigateToAuth}
                      className="justify-start w-full bg-blue-600 hover:bg-blue-700 text-sm"
                    >
                      Get Started
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
