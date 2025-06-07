
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const AuthCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleAuthCallback = async () => {
      if (!supabase) {
        navigate('/');
        return;
      }

      try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Auth callback error:', error);
          toast({
            title: 'Authentication Error',
            description: error.message,
            variant: 'destructive',
          });
          navigate('/auth');
          return;
        }

        if (session) {
          // Create or update user profile
          const { error: profileError } = await supabase
            .from('profiles')
            .upsert({
              id: session.user.id,
              email: session.user.email,
              full_name: session.user.user_metadata?.full_name || '',
              username: session.user.user_metadata?.username || '',
              avatar_url: session.user.user_metadata?.avatar_url || '',
              updated_at: new Date().toISOString(),
            });

          if (profileError) {
            console.error('Error updating profile:', profileError);
          }

          toast({
            title: 'Welcome!',
            description: 'You have been successfully signed in.',
          });
          
          // Clean redirect to dashboard
          setTimeout(() => {
            window.location.replace('/');
          }, 1000);
        } else {
          navigate('/auth');
        }
      } catch (error) {
        console.error('Unexpected error in auth callback:', error);
        navigate('/auth');
      }
    };

    handleAuthCallback();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 px-3 sm:px-4">
      <div className="text-center p-6 sm:p-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl max-w-md mx-4 w-full">
        <div className="mb-4 sm:mb-6">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 animate-pulse">
            <div className="w-6 h-6 sm:w-8 sm:h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Almost there!</h2>
          <p className="text-gray-600 text-sm sm:text-base">Completing your sign in...</p>
        </div>
        
        <div className="space-y-2">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse" style={{ width: '75%' }}></div>
          </div>
          <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
        </div>
      </div>
    </div>
  );
};
