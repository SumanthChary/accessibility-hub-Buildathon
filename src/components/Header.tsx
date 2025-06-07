
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-gray-200 shadow-lg">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group" 
            onClick={() => navigateTo('/')}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AccessifyAI
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Button 
              variant="ghost"
              onClick={() => navigateTo('/')}
              className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium text-lg px-4 py-2"
            >
              Home
            </Button>
            <Button 
              variant="ghost"
              onClick={() => scrollToSection('features')} 
              className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium text-lg px-4 py-2"
            >
              Features
            </Button>
            <Button 
              variant="ghost"
              onClick={() => scrollToSection('pricing')} 
              className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium text-lg px-4 py-2"
            >
              Pricing
            </Button>
            <Button 
              variant="ghost"
              onClick={() => scrollToSection('testimonials')} 
              className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium text-lg px-4 py-2"
            >
              Reviews
            </Button>
            <Button 
              variant="ghost"
              onClick={() => scrollToSection('faq')} 
              className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium text-lg px-4 py-2"
            >
              FAQ
            </Button>
          </nav>

          {/* Auth Section - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
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
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium"
                >
                  Dashboard
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10 ring-2 ring-blue-100">
                        <AvatarImage src={profile?.avatar_url} alt={profile?.full_name || user.email} />
                        <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                          {profile?.full_name?.[0] || user.email?.[0]?.toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 mr-4" align="end">
                    <div className="flex flex-col space-y-1 p-2">
                      <p className="text-sm font-medium">{profile?.full_name || 'User'}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigateTo('/profile')} className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigateTo('/payments')} className="cursor-pointer">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigateTo('/dashboard')} className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  onClick={() => navigateTo('/auth')}
                  className="hover:bg-blue-50 hover:text-blue-600 font-medium text-lg px-6 py-2"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => navigateTo('/auth')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium text-lg px-6 py-2"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 border-2 border-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
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
          <div className="md:hidden bg-white border-t-2 border-gray-200 shadow-lg">
            <div className="p-4 space-y-4">
              {/* Navigation Links */}
              <div className="space-y-2">
                <Button 
                  variant="ghost"
                  onClick={() => navigateTo('/')}
                  className="w-full justify-start text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium text-lg py-3"
                >
                  Home
                </Button>
                <Button 
                  variant="ghost"
                  onClick={() => scrollToSection('features')} 
                  className="w-full justify-start text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium text-lg py-3"
                >
                  Features
                </Button>
                <Button 
                  variant="ghost"
                  onClick={() => scrollToSection('pricing')} 
                  className="w-full justify-start text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium text-lg py-3"
                >
                  Pricing
                </Button>
                <Button 
                  variant="ghost"
                  onClick={() => scrollToSection('testimonials')} 
                  className="w-full justify-start text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium text-lg py-3"
                >
                  Reviews
                </Button>
                <Button 
                  variant="ghost"
                  onClick={() => scrollToSection('faq')} 
                  className="w-full justify-start text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium text-lg py-3"
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
                    <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={profile?.avatar_url} alt={profile?.full_name || user.email} />
                        <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                          {profile?.full_name?.[0] || user.email?.[0]?.toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">{profile?.full_name || 'User'}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      onClick={() => navigateTo('/dashboard')}
                      className="w-full justify-start hover:bg-blue-50 hover:text-blue-600 text-lg py-3"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Dashboard
                    </Button>
                    <Button 
                      variant="ghost" 
                      onClick={() => navigateTo('/profile')}
                      className="w-full justify-start hover:bg-blue-50 hover:text-blue-600 text-lg py-3"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                    <Button 
                      variant="ghost" 
                      onClick={() => navigateTo('/payments')}
                      className="w-full justify-start hover:bg-blue-50 hover:text-blue-600 text-lg py-3"
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Billing
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={handleSignOut}
                      className="w-full justify-start hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-lg py-3"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Button 
                      variant="ghost" 
                      onClick={() => navigateTo('/auth')}
                      className="w-full justify-start hover:bg-blue-50 hover:text-blue-600 text-lg py-3"
                    >
                      Sign In
                    </Button>
                    <Button 
                      onClick={() => navigateTo('/auth')}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg py-3"
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
