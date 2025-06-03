
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
  Zap
} from 'lucide-react';

export const Dashboard = () => {
  const { user, profile, quota } = useAuth();
  const navigate = useNavigate();

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
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {profile?.full_name || user.email?.split('@')[0] || 'User'}!
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Transform your content into accessible formats with AI-powered tools
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <Card className="border-l-4 border-l-blue-500">
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

        <Card className="border-l-4 border-l-green-500">
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

        <Card className="border-l-4 border-l-purple-500">
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

        <Card className="border-l-4 border-l-orange-500">
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
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={action.action}>
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
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
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No recent activity</p>
            <Button onClick={() => document.getElementById('demo-section')?.scrollIntoView({ behavior: 'smooth' })}>
              Start Processing Files
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
