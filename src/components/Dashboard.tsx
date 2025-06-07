
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
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="space-y-6">
          {/* Loading skeleton */}
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-40 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
            <div className="h-64 bg-gray-200 rounded-lg"></div>
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
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Welcome Header */}
      <div className="mb-8 animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Welcome back, {profile?.full_name || user.email?.split('@')[0] || 'User'}!
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Transform your content into accessible formats with AI-powered tools
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 animate-in fade-in-50 slide-in-from-bottom-4 duration-500 delay-100">
        <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-600 truncate">Audio Minutes</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">
                  {quota ? 60 - quota.audio_minutes : 60}
                </p>
                <p className="text-xs text-gray-500">of 60 remaining</p>
              </div>
              <Volume2 className="h-8 w-8 text-blue-500 flex-shrink-0" />
            </div>
            <Progress value={audioUsage} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-600 truncate">Images</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">
                  {quota ? 100 - quota.image_count : 100}
                </p>
                <p className="text-xs text-gray-500">of 100 remaining</p>
              </div>
              <Image className="h-8 w-8 text-green-500 flex-shrink-0" />
            </div>
            <Progress value={imageUsage} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-600 truncate">PDF Pages</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">
                  {quota ? 50 - quota.pdf_pages : 50}
                </p>
                <p className="text-xs text-gray-500">of 50 remaining</p>
              </div>
              <FileText className="h-8 w-8 text-purple-500 flex-shrink-0" />
            </div>
            <Progress value={pdfUsage} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-600 truncate">Plan</p>
                <p className="text-lg sm:text-xl font-bold text-gray-900">
                  {profile?.subscription_tier?.toUpperCase() || 'FREE'}
                </p>
                <p className="text-xs text-gray-500">Current tier</p>
              </div>
              <CreditCard className="h-8 w-8 text-orange-500 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mb-8 animate-in fade-in-50 slide-in-from-bottom-4 duration-500 delay-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Card 
                key={index} 
                className="hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-gray-50" 
                onClick={action.action}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <Card className="animate-in fade-in-50 slide-in-from-bottom-4 duration-500 delay-300 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Recent Activity
          </CardTitle>
          <CardDescription>
            Your latest accessibility transformations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No recent activity</h3>
            <p className="text-gray-600 mb-6">Start processing files to see your activity here</p>
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
