
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Sparkles, User, LogOut } from 'lucide-react';
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
    <header className="w-full bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer" 
            onClick={() => navigateTo('/')}
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">AccessifyAI</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => navigateTo('/')}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('features')} 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('pricing')} 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Pricing
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')} 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Reviews
            </button>
            <button 
              onClick={() => scrollToSection('faq')} 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              FAQ
            </button>
          </nav>

          {/* Auth Section - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {loading ? (
              <div className="flex space-x-2">
                <div className="w-16 h-8 bg-gray-200 animate-pulse rounded"></div>
                <div className="w-20 h-8 bg-gray-200 animate-pulse rounded"></div>
              </div>
            ) : user ? (
              <div className="flex items-center space-x-3">
                <Button 
                  variant="outline"
                  onClick={() => navigateTo('/dashboard')}
                  className="text-gray-700 border-gray-300 hover:bg-gray-50"
                >
                  Dashboard
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={profile?.avatar_url} alt={profile?.full_name || user.email} />
                        <AvatarFallback className="bg-blue-600 text-white text-sm">
                          {profile?.full_name?.[0] || user.email?.[0]?.toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-white border shadow-lg" align="end">
                    <div className="flex flex-col space-y-1 p-2">
                      <p className="text-sm font-medium text-gray-900">{profile?.full_name || 'User'}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigateTo('/profile')} className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button 
                  variant="outline" 
                  onClick={() => navigateTo('/auth')}
                  className="text-gray-700 border-gray-300 hover:bg-gray-50"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => navigateTo('/auth')}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button 
                onClick={() => navigateTo('/')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('features')} 
                className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('pricing')} 
                className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Pricing
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')} 
                className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Reviews
              </button>
              <button 
                onClick={() => scrollToSection('faq')} 
                className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                FAQ
              </button>
              
              {/* Mobile Auth Section */}
              <div className="pt-4 border-t">
                {loading ? (
                  <div className="space-y-2">
                    <div className="w-full h-10 bg-gray-200 animate-pulse rounded"></div>
                    <div className="w-full h-10 bg-gray-200 animate-pulse rounded"></div>
                  </div>
                ) : user ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 px-3 py-2 bg-gray-50 rounded-md">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={profile?.avatar_url} alt={profile?.full_name || user.email} />
                        <AvatarFallback className="bg-blue-600 text-white text-sm">
                          {profile?.full_name?.[0] || user.email?.[0]?.toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{profile?.full_name || 'User'}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => navigateTo('/dashboard')}
                      className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      Dashboard
                    </button>
                    <button 
                      onClick={() => navigateTo('/profile')}
                      className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      Profile
                    </button>
                    <button 
                      onClick={handleSignOut}
                      className="block w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      onClick={() => navigateTo('/auth')}
                      className="w-full text-gray-700 border-gray-300 hover:bg-gray-50"
                    >
                      Sign In
                    </Button>
                    <Button 
                      onClick={() => navigateTo('/auth')}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
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
