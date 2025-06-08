
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Sparkles, User, Settings, LogOut, CreditCard } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profile, signOut, loading } = useAuth();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navigateTo = (path: string) => {
    window.location.href = path;
    setIsMenuOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group" 
            onClick={() => navigateTo('/')}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AccessifyAI
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            <Button 
              variant="ghost"
              onClick={() => navigateTo('/')}
              className="text-gray-800 hover:text-blue-600 hover:bg-blue-50 font-semibold text-base px-4 py-2 border border-transparent hover:border-blue-200 transition-all duration-200"
            >
              Home
            </Button>
            <Button 
              variant="ghost"
              onClick={() => scrollToSection('features')} 
              className="text-gray-800 hover:text-blue-600 hover:bg-blue-50 font-semibold text-base px-4 py-2 border border-transparent hover:border-blue-200 transition-all duration-200"
            >
              Features
            </Button>
            <Button 
              variant="ghost"
              onClick={() => scrollToSection('pricing')} 
              className="text-gray-800 hover:text-blue-600 hover:bg-blue-50 font-semibold text-base px-4 py-2 border border-transparent hover:border-blue-200 transition-all duration-200"
            >
              Pricing
            </Button>
            <Button 
              variant="ghost"
              onClick={() => scrollToSection('testimonials')} 
              className="text-gray-800 hover:text-blue-600 hover:bg-blue-50 font-semibold text-base px-4 py-2 border border-transparent hover:border-blue-200 transition-all duration-200"
            >
              Reviews
            </Button>
            <Button 
              variant="ghost"
              onClick={() => scrollToSection('faq')} 
              className="text-gray-800 hover:text-blue-600 hover:bg-blue-50 font-semibold text-base px-4 py-2 border border-transparent hover:border-blue-200 transition-all duration-200"
            >
              FAQ
            </Button>
          </nav>

          {/* Auth Section - Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            {loading ? (
              <div className="flex space-x-2">
                <div className="w-20 h-10 bg-gray-200 animate-pulse rounded-md"></div>
                <div className="w-24 h-10 bg-gray-200 animate-pulse rounded-md"></div>
              </div>
            ) : user ? (
              <div className="flex items-center space-x-3">
                <Button 
                  variant="ghost"
                  onClick={() => navigateTo('/dashboard')}
                  className="text-gray-800 hover:text-blue-600 hover:bg-blue-50 font-semibold border border-gray-300 hover:border-blue-300 px-4 py-2 transition-all duration-200"
                >
                  Dashboard
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full border-2 border-gray-300 hover:border-blue-400 transition-all duration-200">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={profile?.avatar_url} alt={profile?.full_name || user.email} />
                        <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold">
                          {profile?.full_name?.[0] || user.email?.[0]?.toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 mr-4 bg-white border border-gray-200 shadow-lg" align="end">
                    <div className="flex flex-col space-y-1 p-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">{profile?.full_name || 'User'}</p>
                      <p className="text-xs text-gray-600">{user.email}</p>
                    </div>
                    <DropdownMenuItem onClick={() => navigateTo('/profile')} className="cursor-pointer hover:bg-blue-50">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigateTo('/payments')} className="cursor-pointer hover:bg-blue-50">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigateTo('/dashboard')} className="cursor-pointer hover:bg-blue-50">
                      <Settings className="mr-2 h-4 w-4" />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600 hover:bg-red-50">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => navigateTo('/auth')}
                  className="border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white font-semibold text-base px-6 py-2 transition-all duration-200"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => navigateTo('/auth')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-base px-6 py-2 border-2 border-transparent shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 border-2 border-gray-800 transition-all duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-800" />
            ) : (
              <Menu className="h-6 w-6 text-gray-800" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="p-4 space-y-3">
              {/* Navigation Links */}
              <div className="space-y-2">
                <Button 
                  variant="ghost"
                  onClick={() => navigateTo('/')}
                  className="w-full justify-start text-gray-800 hover:text-blue-600 hover:bg-blue-50 font-semibold text-base py-3 border border-transparent hover:border-blue-200"
                >
                  Home
                </Button>
                <Button 
                  variant="ghost"
                  onClick={() => scrollToSection('features')} 
                  className="w-full justify-start text-gray-800 hover:text-blue-600 hover:bg-blue-50 font-semibold text-base py-3 border border-transparent hover:border-blue-200"
                >
                  Features
                </Button>
                <Button 
                  variant="ghost"
                  onClick={() => scrollToSection('pricing')} 
                  className="w-full justify-start text-gray-800 hover:text-blue-600 hover:bg-blue-50 font-semibold text-base py-3 border border-transparent hover:border-blue-200"
                >
                  Pricing
                </Button>
                <Button 
                  variant="ghost"
                  onClick={() => scrollToSection('testimonials')} 
                  className="w-full justify-start text-gray-800 hover:text-blue-600 hover:bg-blue-50 font-semibold text-base py-3 border border-transparent hover:border-blue-200"
                >
                  Reviews
                </Button>
                <Button 
                  variant="ghost"
                  onClick={() => scrollToSection('faq')} 
                  className="w-full justify-start text-gray-800 hover:text-blue-600 hover:bg-blue-50 font-semibold text-base py-3 border border-transparent hover:border-blue-200"
                >
                  FAQ
                </Button>
              </div>
              
              {/* Auth Section - Mobile */}
              <div className="pt-4 border-t border-gray-200">
                {loading ? (
                  <div className="space-y-2">
                    <div className="w-full h-12 bg-gray-200 animate-pulse rounded-lg"></div>
                    <div className="w-full h-12 bg-gray-200 animate-pulse rounded-lg"></div>
                  </div>
                ) : user ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={profile?.avatar_url} alt={profile?.full_name || user.email} />
                        <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold">
                          {profile?.full_name?.[0] || user.email?.[0]?.toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-gray-900">{profile?.full_name || 'User'}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      onClick={() => navigateTo('/dashboard')}
                      className="w-full justify-start text-gray-800 hover:bg-blue-50 hover:text-blue-600 text-base py-3 border border-gray-300 hover:border-blue-300"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Dashboard
                    </Button>
                    <Button 
                      variant="ghost" 
                      onClick={() => navigateTo('/profile')}
                      className="w-full justify-start text-gray-800 hover:bg-blue-50 hover:text-blue-600 text-base py-3 border border-gray-300 hover:border-blue-300"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                    <Button 
                      variant="ghost" 
                      onClick={() => navigateTo('/payments')}
                      className="w-full justify-start text-gray-800 hover:bg-blue-50 hover:text-blue-600 text-base py-3 border border-gray-300 hover:border-blue-300"
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Billing
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={handleSignOut}
                      className="w-full justify-start text-red-600 hover:bg-red-50 hover:border-red-300 border-red-200 text-base py-3"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      onClick={() => navigateTo('/auth')}
                      className="w-full border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white font-semibold text-base py-3"
                    >
                      Sign In
                    </Button>
                    <Button 
                      onClick={() => navigateTo('/auth')}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-base py-3 shadow-md"
                    >
                      Get Started
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
