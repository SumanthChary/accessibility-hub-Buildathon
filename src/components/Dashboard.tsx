
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, 
  FileText, 
  Image, 
  Volume2, 
  TrendingUp, 
  CreditCard,
  User,
  Zap,
  Sparkles
} from 'lucide-react';

export const Dashboard = () => {
  const { user, profile, quota, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 max-w-7xl">
        <div className="space-y-4 sm:space-y-6">
          {/* Loading skeleton */}
          <div className="animate-pulse">
            <div className="h-6 sm:h-8 bg-gray-200 rounded w-1/3 mb-3 sm:mb-4"></div>
            <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/2 mb-6 sm:mb-8"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 sm:h-32 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 sm:h-40 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
            <div className="h-48 sm:h-64 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  // Calculate usage percentages
  const audioUsage = quota ? ((60 - quota.audio_minutes) / 60) * 100 : 0;
  const imageUsage = quota ? ((100 - quota.image_count) / 100) * 100 : 0;
  const pdfUsage = quota ? ((50 - quota.pdf_pages) / 50) * 100 : 0;

  const quickActions = [
    {
      title: 'Upload Files',
      description: 'Convert audio, images, and PDFs to accessible formats',
      icon: Upload,
      action: () => {
        document.getElementById('demo-section')?.scrollIntoView({ behavior: 'smooth' });
      },
      color: 'bg-blue-500'
    },
    {
      title: 'View Results',
      description: 'Check your processed files and download them',
      icon: FileText,
      action: () => navigate('/results'),
      color: 'bg-green-500'
    },
    {
      title: 'Upgrade Plan',
      description: 'Get unlimited processing with Pro plan',
      icon: Zap,
      action: () => navigate('/payments'),
      color: 'bg-purple-500'
    },
    {
      title: 'Profile Settings',
      description: 'Update your profile and account settings',
      icon: User,
      action: () => navigate('/profile'),
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="container mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 max-w-7xl">
      {/* Welcome Header */}
      <div className="mb-6 sm:mb-8 animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
              Welcome back, {profile?.full_name || user.email?.split('@')[0] || 'User'}!
            </h1>
            <p className="text-gray-600 text-xs sm:text-sm md:text-base">
              Transform your content into accessible formats with AI-powered tools
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 animate-in fade-in-50 slide-in-from-bottom-4 duration-500 delay-100">
        <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Audio Minutes</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                  {quota ? 60 - quota.audio_minutes : 60}
                </p>
                <p className="text-xs text-gray-500">of 60 remaining</p>
              </div>
              <Volume2 className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-blue-500 flex-shrink-0" />
            </div>
            <Progress value={audioUsage} className="mt-2 sm:mt-3 h-1.5 sm:h-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Images</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                  {quota ? 100 - quota.image_count : 100}
                </p>
                <p className="text-xs text-gray-500">of 100 remaining</p>
              </div>
              <Image className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-green-500 flex-shrink-0" />
            </div>
            <Progress value={imageUsage} className="mt-2 sm:mt-3 h-1.5 sm:h-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">PDF Pages</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                  {quota ? 50 - quota.pdf_pages : 50}
                </p>
                <p className="text-xs text-gray-500">of 50 remaining</p>
              </div>
              <FileText className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-purple-500 flex-shrink-0" />
            </div>
            <Progress value={pdfUsage} className="mt-2 sm:mt-3 h-1.5 sm:h-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <CardContent className="p-3 sm:p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Plan</p>
                <p className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
                  {profile?.subscription_tier?.toUpperCase() || 'FREE'}
                </p>
                <p className="text-xs text-gray-500">Current tier</p>
              </div>
              <CreditCard className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-orange-500 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mb-6 sm:mb-8 animate-in fade-in-50 slide-in-from-bottom-4 duration-500 delay-200">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Card 
                key={index} 
                className="hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-gray-50" 
                onClick={action.action}
              >
                <CardContent className="p-4 sm:p-5 md:p-6 text-center">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 ${action.color} rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors text-sm sm:text-base">{action.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600">{action.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <Card className="animate-in fade-in-50 slide-in-from-bottom-4 duration-500 delay-300 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
            Recent Activity
          </CardTitle>
          <CardDescription className="text-sm">
            Your latest accessibility transformations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 sm:py-12">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
            </div>
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No recent activity</h3>
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">Start processing files to see your activity here</p>
            <Button 
              onClick={() => document.getElementById('demo-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-blue-600 hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
            >
              <Upload className="mr-2 h-4 w-4" />
              Start Processing Files
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
