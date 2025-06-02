
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
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { User, Mail, Camera, Save, ArrowLeft, TrendingUp, Calendar, FileText } from 'lucide-react';

export const Profile = () => {
  const { user, profile, quota, updateProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
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

    setLoading(true);

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
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account and track your usage</p>
        </div>

        <div className="grid gap-6">
          {/* Profile Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Update your personal details and profile information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={formData.avatar_url} alt={formData.full_name} />
                    <AvatarFallback className="text-lg bg-blue-100 text-blue-600">
                      {formData.full_name?.[0] || formData.email?.[0]?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Label htmlFor="avatar_url">Profile Picture URL</Label>
                    <div className="flex mt-1">
                      <Input
                        id="avatar_url"
                        type="url"
                        placeholder="https://example.com/avatar.jpg"
                        value={formData.avatar_url}
                        onChange={(e) => handleInputChange('avatar_url', e.target.value)}
                        className="flex-1"
                      />
                      <Button type="button" variant="outline" size="sm" className="ml-2">
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Enter a URL to your profile picture
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input
                      id="full_name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.full_name}
                      onChange={(e) => handleInputChange('full_name', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter your username"
                      value={formData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <div className="flex items-center mt-1">
                    <Mail className="h-4 w-4 text-gray-400 mr-2" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      disabled
                      className="flex-1 bg-gray-50"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Email cannot be changed. Contact support if needed.
                  </p>
                </div>

                <Button type="submit" className="w-full md:w-auto" disabled={loading}>
                  <Save className="mr-2 h-4 w-4" />
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Usage Statistics */}
          <Card>
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
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Audio Processing</span>
                    <span className="text-sm text-gray-600">
                      {quota ? 60 - quota.audio_minutes : 0} / 60 minutes used
                    </span>
                  </div>
                  <Progress value={audioUsage} className="h-2" />
                </div>

                {/* Image Processing */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Image Processing</span>
                    <span className="text-sm text-gray-600">
                      {quota ? 100 - quota.image_count : 0} / 100 images used
                    </span>
                  </div>
                  <Progress value={imageUsage} className="h-2" />
                </div>

                {/* PDF Processing */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">PDF Processing</span>
                    <span className="text-sm text-gray-600">
                      {quota ? 50 - quota.pdf_pages : 0} / 50 pages used
                    </span>
                  </div>
                  <Progress value={pdfUsage} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Statistics */}
          <Card>
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {profile?.subscription_tier?.toUpperCase() || 'FREE'}
                  </div>
                  <div className="text-sm text-gray-600">Current Plan</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {new Date(user.created_at || '').toLocaleDateString()}
                  </div>
                  <div className="text-sm text-gray-600">Member Since</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {new Date().toLocaleDateString()}
                  </div>
                  <div className="text-sm text-gray-600">Last Login</div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">Need more quota?</h3>
                    <p className="text-sm text-gray-600">Upgrade to Pro for unlimited processing</p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/payments')}
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
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
