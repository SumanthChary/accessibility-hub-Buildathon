
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  Mail, 
  Camera, 
  Save, 
  ArrowLeft, 
  TrendingUp, 
  Calendar, 
  FileText, 
  Crown, 
  Sparkles,
  Shield,
  CheckCircle,
  Settings
} from 'lucide-react';

export const Profile = () => {
  const { user, profile, quota, updateProfile, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    avatar_url: '',
    email: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    
    setFormData({
      full_name: profile?.full_name || user.user_metadata?.full_name || '',
      username: profile?.username || user.user_metadata?.username || '',
      avatar_url: profile?.avatar_url || user.user_metadata?.avatar_url || '',
      email: user.email || ''
    });
  }, [user, profile, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);

    try {
      await updateProfile({
        full_name: formData.full_name,
        username: formData.username,
        avatar_url: formData.avatar_url,
      });
      
      toast({
        title: 'Profile Updated Successfully',
        description: 'Your profile information has been saved.',
      });
    } catch (error) {
      toast({
        title: 'Update Failed',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8 pt-24 max-w-4xl">
          <div className="space-y-6">
            {/* Loading skeleton */}
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded-md w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>
              <div className="grid gap-6">
                <div className="h-96 bg-gray-200 rounded-lg"></div>
                <div className="h-64 bg-gray-200 rounded-lg"></div>
                <div className="h-48 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Calculate quota usage percentages
  const audioUsage = quota ? ((60 - quota.audio_minutes) / 60) * 100 : 0;
  const imageUsage = quota ? ((100 - quota.image_count) / 100) * 100 : 0;
  const pdfUsage = quota ? ((50 - quota.pdf_pages) / 50) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8 pt-24 max-w-4xl">
        <div className="mb-8 animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-6 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
              <p className="text-gray-600">Manage your account and track your usage</p>
            </div>
          </div>
        </div>

        <div className="grid gap-8">
          {/* Profile Information */}
          <Card className="animate-in fade-in-50 slide-in-from-bottom-4 duration-500 delay-100 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Update your personal details and profile information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Avatar Section */}
                <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <Avatar className="h-24 w-24 ring-4 ring-blue-100 mx-auto sm:mx-0">
                    <AvatarImage src={formData.avatar_url} alt={formData.full_name} />
                    <AvatarFallback className="text-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      {formData.full_name?.[0] || formData.email?.[0]?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="avatar_url" className="text-sm font-medium">Profile Picture URL</Label>
                    <div className="flex gap-2">
                      <Input
                        id="avatar_url"
                        type="url"
                        placeholder="https://example.com/avatar.jpg"
                        value={formData.avatar_url}
                        onChange={(e) => handleInputChange('avatar_url', e.target.value)}
                        className="flex-1"
                      />
                      <Button type="button" variant="outline" size="sm" className="hover:bg-blue-50 px-3">
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">
                      Enter a URL to your profile picture
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="full_name" className="text-sm font-medium">Full Name</Label>
                    <Input
                      id="full_name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.full_name}
                      onChange={(e) => handleInputChange('full_name', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-sm font-medium">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter your username"
                      value={formData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-400 mr-2" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      disabled
                      className="flex-1 bg-gray-50"
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    Email cannot be changed. Contact support if needed.
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105" 
                  disabled={saving}
                >
                  <Save className="mr-2 h-4 w-4" />
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Usage Statistics */}
          <Card className="animate-in fade-in-50 slide-in-from-bottom-4 duration-500 delay-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Usage & Quota
              </CardTitle>
              <CardDescription>
                Track your monthly usage and available quota
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Audio Processing */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      Audio Processing
                    </span>
                    <span className="text-sm text-gray-600">
                      {quota ? 60 - quota.audio_minutes : 0} / 60 minutes used
                    </span>
                  </div>
                  <Progress value={audioUsage} className="h-3" />
                </div>

                {/* Image Processing */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      Image Processing
                    </span>
                    <span className="text-sm text-gray-600">
                      {quota ? 100 - quota.image_count : 0} / 100 images used
                    </span>
                  </div>
                  <Progress value={imageUsage} className="h-3" />
                </div>

                {/* PDF Processing */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      PDF Processing
                    </span>
                    <span className="text-sm text-gray-600">
                      {quota ? 50 - quota.pdf_pages : 0} / 50 pages used
                    </span>
                  </div>
                  <Progress value={pdfUsage} className="h-3" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Overview */}
          <Card className="animate-in fade-in-50 slide-in-from-bottom-4 duration-500 delay-300 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Account Overview
              </CardTitle>
              <CardDescription>
                Your account activity and membership details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                  <div className="flex items-center justify-center mb-3">
                    <Crown className="h-6 w-6 text-blue-600 mr-2" />
                    <div className="text-2xl font-bold text-blue-600">
                      {profile?.subscription_tier?.toUpperCase() || 'FREE'}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">Current Plan</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                  <div className="flex items-center justify-center mb-3">
                    <Calendar className="h-6 w-6 text-green-600 mr-2" />
                    <div className="text-lg font-bold text-green-600">
                      {new Date(user.created_at || '').toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">Member Since</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                  <div className="flex items-center justify-center mb-3">
                    <CheckCircle className="h-6 w-6 text-purple-600 mr-2" />
                    <div className="text-lg font-bold text-purple-600">
                      Active
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">Account Status</div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      Need more quota?
                    </h3>
                    <p className="text-blue-100">Upgrade to Pro for unlimited processing power</p>
                  </div>
                  <Button 
                    variant="secondary" 
                    onClick={() => navigate('/payments')}
                    className="bg-white text-blue-600 hover:bg-blue-50 transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    <Crown className="mr-2 h-4 w-4" />
                    Upgrade Plan
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};
