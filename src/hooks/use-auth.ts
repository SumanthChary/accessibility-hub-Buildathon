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
    loading: true,
    error: null
  });

  useEffect(() => {
    let mounted = true;

    async function getInitialSession() {
      try {
        // Get initial session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!mounted) return;

        if (session?.user) {
          // Get profile and quota
          const [profile, quota] = await Promise.all([
            supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single()
              .then(({ data }) => data),
            supabase
              .from('processing_quota')
              .select('*')
              .eq('user_id', session.user.id)
              .single()
              .then(({ data }) => data)
          ]);

          setState({
            user: session.user,
            profile,
            quota,
            loading: false,
            error: null
          });
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
        console.error('Auth error:', error);
        setState(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to load user session'
        }));
      }
    }

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!mounted) return;

        if (session?.user) {
          try {
            const [profile, quota] = await Promise.all([
              supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single()
                .then(({ data }) => data),
              supabase
                .from('processing_quota')
                .select('*')
                .eq('user_id', session.user.id)
                .single()
                .then(({ data }) => data)
            ]);

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
              error: 'Failed to load user data'
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
  }, []);

  const signIn = async (provider: 'google' | 'github') => {
    try {
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
        error: 'Failed to sign in'
      }));
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Sign out error:', error);
      setState(prev => ({
        ...prev,
        error: 'Failed to sign out'
      }));
    }
  };

  return {
    ...state,
    signIn,
    signOut,
  };
}
