
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
          
          // Force redirect to home page which will show dashboard for authenticated users
          window.location.href = '/';
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-pulse text-center p-4">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">Completing sign in...</h2>
        <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-sm text-gray-600 mt-4">Redirecting to dashboard...</p>
      </div>
    </div>
  );
};
