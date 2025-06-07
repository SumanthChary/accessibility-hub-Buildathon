
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
            className="flex items-center space-x-3 cursor-pointer group transition-all duration-300 hover:scale-105" 
            onClick={() => navigateTo('/')}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white animate-pulse" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AccessifyAI
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button 
              onClick={() => navigateTo('/')}
              className="text-gray-700 hover:text-blue-600 transition-all duration-200 font-medium relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button 
              onClick={() => scrollToSection('features')} 
              className="text-gray-700 hover:text-blue-600 transition-all duration-200 font-medium relative group"
            >
              Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button 
              onClick={() => scrollToSection('pricing')} 
              className="text-gray-700 hover:text-blue-600 transition-all duration-200 font-medium relative group"
            >
              Pricing
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button 
              onClick={() => scrollToSection('demo-section')} 
              className="text-gray-700 hover:text-blue-600 transition-all duration-200 font-medium relative group"
            >
              Demo
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </button>
          </nav>

          {/* Auth Section - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {loading ? (
              <div className="flex space-x-2">
                <div className="w-20 h-9 bg-gray-200 animate-pulse rounded-md"></div>
                <div className="w-24 h-9 bg-gray-200 animate-pulse rounded-md"></div>
              </div>
            ) : user ? (
              <div className="flex items-center space-x-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10 ring-2 ring-blue-100 transition-all duration-200 hover:ring-blue-300">
                        <AvatarImage src={profile?.avatar_url} alt={profile?.full_name || user.email} />
                        <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                          {profile?.full_name?.[0] || user.email?.[0]?.toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 mr-4" align="end" forceMount>
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
                  className="hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => navigateTo('/auth')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
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
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg animate-in slide-in-from-top duration-300">
            <div className="p-4 space-y-4">
              {/* Navigation Links */}
              <div className="space-y-2">
                <button 
                  onClick={() => navigateTo('/')}
                  className="block w-full text-left py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
                >
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection('features')} 
                  className="block w-full text-left py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
                >
                  Features
                </button>
                <button 
                  onClick={() => scrollToSection('pricing')} 
                  className="block w-full text-left py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
                >
                  Pricing
                </button>
                <button 
                  onClick={() => scrollToSection('demo-section')} 
                  className="block w-full text-left py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
                >
                  Demo
                </button>
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
                      onClick={() => navigateTo('/profile')}
                      className="w-full justify-start hover:bg-blue-50 hover:text-blue-600"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                    <Button 
                      variant="ghost" 
                      onClick={() => navigateTo('/payments')}
                      className="w-full justify-start hover:bg-blue-50 hover:text-blue-600"
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      Billing
                    </Button>
                    <Button 
                      variant="ghost" 
                      onClick={() => navigateTo('/dashboard')}
                      className="w-full justify-start hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Dashboard
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={handleSignOut}
                      className="w-full justify-start hover:bg-red-50 hover:text-red-600 hover:border-red-200"
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
                      className="w-full justify-start hover:bg-blue-50 hover:text-blue-600"
                    >
                      Sign In
                    </Button>
                    <Button 
                      onClick={() => navigateTo('/auth')}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
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
