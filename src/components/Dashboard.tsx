
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
  Sparkles,
  BarChart3,
  CheckCircle,
  Clock
} from 'lucide-react';

export const Dashboard = () => {
  const { user, profile, quota, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-7xl">
        <div className="space-y-8">
          {/* Header Skeleton */}
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          </div>
          
          {/* Stats Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
          
          {/* Quick Actions Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-40 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
          
          {/* Recent Activity Skeleton */}
          <div className="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
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
      description: 'Convert audio, images, and PDFs',
      icon: Upload,
      action: () => document.getElementById('demo-section')?.scrollIntoView({ behavior: 'smooth' }),
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'View Results',
      description: 'Check processed files',
      icon: FileText,
      action: () => navigate('/results'),
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Upgrade Plan',
      description: 'Get unlimited processing',
      icon: Zap,
      action: () => navigate('/payments'),
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'Profile Settings',
      description: 'Update account settings',
      icon: User,
      action: () => navigate('/profile'),
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    }
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-7xl">
      {/* Welcome Header */}
      <div className="mb-8 animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Welcome back, {profile?.full_name || user.email?.split('@')[0] || 'User'}!
              </h1>
              <p className="text-gray-600">
                Transform your content into accessible formats with AI-powered tools
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              <CheckCircle className="w-4 h-4 mr-1" />
              {profile?.subscription_tier?.toUpperCase() || 'FREE'} Plan
            </span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-in fade-in-50 slide-in-from-bottom-4 duration-500 delay-100">
        <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-r from-blue-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Audio Minutes</p>
                <p className="text-2xl font-bold text-gray-900">
                  {quota ? 60 - quota.audio_minutes : 60}
                </p>
                <p className="text-xs text-gray-500">of 60 remaining</p>
              </div>
              <Volume2 className="h-8 w-8 text-blue-500" />
            </div>
            <Progress value={audioUsage} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-r from-green-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Images</p>
                <p className="text-2xl font-bold text-gray-900">
                  {quota ? 100 - quota.image_count : 100}
                </p>
                <p className="text-xs text-gray-500">of 100 remaining</p>
              </div>
              <Image className="h-8 w-8 text-green-500" />
            </div>
            <Progress value={imageUsage} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-r from-purple-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">PDF Pages</p>
                <p className="text-2xl font-bold text-gray-900">
                  {quota ? 50 - quota.pdf_pages : 50}
                </p>
                <p className="text-xs text-gray-500">of 50 remaining</p>
              </div>
              <FileText className="h-8 w-8 text-purple-500" />
            </div>
            <Progress value={pdfUsage} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-r from-orange-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Plan</p>
                <p className="text-xl font-bold text-gray-900">
                  {profile?.subscription_tier?.toUpperCase() || 'FREE'}
                </p>
                <p className="text-xs text-gray-500">Current tier</p>
              </div>
              <CreditCard className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mb-8 animate-in fade-in-50 slide-in-from-bottom-4 duration-500 delay-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Card 
                key={index} 
                className="hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-2 border-0 bg-white" 
                onClick={action.action}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
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
              <Clock className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No recent activity</h3>
            <p className="text-gray-600 mb-6">Start processing files to see your activity here</p>
            <Button 
              onClick={() => document.getElementById('demo-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
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
