
import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, type Profile, type ProcessingQuota } from '@/lib/supabase';

export interface AuthState {
  user: User | null;
  profile: Profile | null;
  quota: ProcessingQuota | null;
  loading: boolean;
  error: string | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    profile: null,
    quota: null,
    loading: false, // Set to false initially if no Supabase
    error: null
  });

  useEffect(() => {
    let mounted = true;

    async function getInitialSession() {
      try {
        if (!supabase) {
          // No Supabase configured, set loading to false
          setState({
            user: null,
            profile: null,
            quota: null,
            loading: false,
            error: null
          });
          return;
        }

        setState(prev => ({ ...prev, loading: true }));

        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (!mounted) return;

        if (sessionError) {
          console.error('Session error:', sessionError);
          setState(prev => ({
            ...prev,
            loading: false,
            error: sessionError.message
          }));
          return;
        }

        if (session?.user) {
          try {
            const [profileResult, quotaResult] = await Promise.allSettled([
              supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single(),
              supabase
                .from('processing_quota')
                .select('*')
                .eq('user_id', session.user.id)
                .single()
            ]);

            const profile = profileResult.status === 'fulfilled' ? profileResult.value.data : null;
            const quota = quotaResult.status === 'fulfilled' ? quotaResult.value.data : null;

            setState({
              user: session.user,
              profile,
              quota,
              loading: false,
              error: null
            });
          } catch (error) {
            console.error('Profile/quota fetch error:', error);
            setState({
              user: session.user,
              profile: null,
              quota: null,
              loading: false,
              error: null // Don't show error for missing profile/quota
            });
          }
        } else {
          setState({
            user: null,
            profile: null,
            quota: null,
            loading: false,
            error: null
          });
        }
      } catch (error) {
        if (!mounted) return;
        console.error('Auth initialization error:', error);
        setState(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to initialize authentication'
        }));
      }
    }

    getInitialSession();

    // Only set up auth listener if Supabase is configured
    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (!mounted) return;

          console.log('Auth state changed:', event, session?.user?.email);

          if (session?.user) {
            try {
              const [profileResult, quotaResult] = await Promise.allSettled([
                supabase
                  .from('profiles')
                  .select('*')
                  .eq('id', session.user.id)
                  .single(),
                supabase
                  .from('processing_quota')
                  .select('*')
                  .eq('user_id', session.user.id)
                  .single()
              ]);

              const profile = profileResult.status === 'fulfilled' ? profileResult.value.data : null;
              const quota = quotaResult.status === 'fulfilled' ? quotaResult.value.data : null;

              setState({
                user: session.user,
                profile,
                quota,
                loading: false,
                error: null
              });
            } catch (error) {
              console.error('Profile/quota fetch error on auth change:', error);
              setState({
                user: session.user,
                profile: null,
                quota: null,
                loading: false,
                error: null
              });
            }
          } else {
            setState({
              user: null,
              profile: null,
              quota: null,
              loading: false,
              error: null
            });
          }
        }
      );

      return () => {
        mounted = false;
        subscription.unsubscribe();
      };
    }

    return () => {
      mounted = false;
    };
  }, []);

  const signIn = async (provider: 'google' | 'github') => {
    try {
      if (!supabase) {
        setState(prev => ({
          ...prev,
          error: 'Authentication requires Supabase configuration'
        }));
        return;
      }

      setState(prev => ({ ...prev, error: null }));
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error('Sign in error:', error);
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to sign in'
      }));
    }
  };

  const signOut = async () => {
    try {
      if (!supabase) return;

      setState(prev => ({ ...prev, error: null }));
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Sign out error:', error);
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to sign out'
      }));
    }
  };

  return {
    ...state,
    signIn,
    signOut,
  };
}
