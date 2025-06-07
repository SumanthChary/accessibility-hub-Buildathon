
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Sparkles } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut, loading } = useAuth();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
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

  const navigateToHome = () => {
    window.location.href = '/';
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 transition-all duration-200">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-18">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer transition-transform hover:scale-105" 
            onClick={navigateToHome}
          >
            <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-blue-600 animate-pulse" />
            <span className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 tracking-tight">
              AccessifyAI
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <button 
              onClick={navigateToHome}
              className="text-sm xl:text-base text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('features')} 
              className="text-sm xl:text-base text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('pricing')} 
              className="text-sm xl:text-base text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              Pricing
            </button>
            <button 
              onClick={() => scrollToSection('demo-section')} 
              className="text-sm xl:text-base text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              Demo
            </button>
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
            {loading ? (
              <div className="flex space-x-2">
                <div className="w-12 h-8 bg-gray-200 animate-pulse rounded-md"></div>
                <div className="w-16 h-8 bg-gray-200 animate-pulse rounded-md"></div>
              </div>
            ) : user ? (
              <>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={navigateToProfile}
                  className="text-xs lg:text-sm hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                >
                  Profile
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={navigateToPayments}
                  className="text-xs lg:text-sm hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                >
                  Billing
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSignOut}
                  className="text-xs lg:text-sm hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all duration-200"
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
                  className="text-xs lg:text-sm hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                >
                  Sign In
                </Button>
                <Button 
                  size="sm" 
                  onClick={navigateToAuth}
                  className="text-xs lg:text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
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
          <div className="md:hidden border-t border-gray-200 py-4 bg-white/95 backdrop-blur-md animate-in slide-in-from-top duration-300">
            <div className="flex flex-col space-y-3">
              <button 
                onClick={navigateToHome}
                className="text-left text-gray-600 hover:text-blue-600 transition-colors duration-200 py-2 px-3 font-medium text-base"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('features')} 
                className="text-left text-gray-600 hover:text-blue-600 transition-colors duration-200 py-2 px-3 font-medium text-base"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('pricing')} 
                className="text-left text-gray-600 hover:text-blue-600 transition-colors duration-200 py-2 px-3 font-medium text-base"
              >
                Pricing
              </button>
              <button 
                onClick={() => scrollToSection('demo-section')} 
                className="text-left text-gray-600 hover:text-blue-600 transition-colors duration-200 py-2 px-3 font-medium text-base"
              >
                Demo
              </button>
              
              <div className="pt-3 border-t border-gray-200 space-y-3">
                {loading ? (
                  <div className="space-y-2 px-3">
                    <div className="w-full h-10 bg-gray-200 animate-pulse rounded-md"></div>
                    <div className="w-full h-10 bg-gray-200 animate-pulse rounded-md"></div>
                  </div>
                ) : user ? (
                  <>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={navigateToProfile}
                      className="justify-start w-full hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                    >
                      Profile
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={navigateToPayments}
                      className="justify-start w-full hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                    >
                      Billing
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleSignOut}
                      className="justify-start w-full hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all duration-200"
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
                      className="justify-start w-full hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                    >
                      Sign In
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={navigateToAuth}
                      className="justify-start w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200"
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
