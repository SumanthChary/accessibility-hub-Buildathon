
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthState, AuthContext } from '@/types/auth';
import type { Database } from '@/integrations/supabase/types';
import {
  getInitialSession,
  fetchUserProfile,
  fetchUserQuota,
  signInWithOAuth,
  signOutUser,
  updateUserProfile
} from '@/services/auth.service';

type Profile = Database['public']['Tables']['profiles']['Row'];

export function useAuth(): AuthContext {
  const [state, setState] = useState<AuthState>({
    user: null,
    profile: null,
    quota: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    let mounted = true;

    async function initializeAuth() {
      try {
        if (!supabase) {
          setState({
            user: null,
            profile: null,
            quota: null,
            loading: false,
            error: null
          });
          return;
        }

        const session = await getInitialSession();
        
        if (!mounted) return;

        if (session?.user) {
          try {
            const [profile, quota] = await Promise.allSettled([
              fetchUserProfile(session.user.id),
              fetchUserQuota(session.user.id)
            ]);

            const profileData = profile.status === 'fulfilled' ? profile.value : null;
            const quotaData = quota.status === 'fulfilled' ? quota.value : null;

            setState({
              user: session.user,
              profile: profileData,
              quota: quotaData,
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

    initializeAuth();

    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (!mounted) return;

          console.log('Auth state changed:', event, session?.user?.email);

          if (event === 'SIGNED_IN' && session?.user) {
            setState(prev => ({ ...prev, loading: true }));
            
            try {
              const [profile, quota] = await Promise.allSettled([
                fetchUserProfile(session.user.id),
                fetchUserQuota(session.user.id)
              ]);

              const profileData = profile.status === 'fulfilled' ? profile.value : null;
              const quotaData = quota.status === 'fulfilled' ? quota.value : null;

              setState({
                user: session.user,
                profile: profileData,
                quota: quotaData,
                loading: false,
                error: null
              });

              // Clean redirect to dashboard
              if (window.location.pathname === '/auth' || window.location.pathname === '/auth/callback') {
                window.location.replace('/');
              }
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
          } else if (event === 'SIGNED_OUT') {
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
      setState(prev => ({ ...prev, error: null, loading: true }));
      await signInWithOAuth(provider);
    } catch (error) {
      console.error('Sign in error:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to sign in'
      }));
    }
  };

  const signOut = async () => {
    try {
      setState(prev => ({ ...prev, error: null, loading: true }));
      await signOutUser();
      // Force redirect to home after sign out
      window.location.replace('/');
    } catch (error) {
      console.error('Sign out error:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to sign out'
      }));
    }
  };

  const updateProfile = async (profileData: Partial<Profile>) => {
    try {
      if (!state.user) {
        setState(prev => ({
          ...prev,
          error: 'Authentication required to update profile'
        }));
        return;
      }

      setState(prev => ({ ...prev, error: null }));
      
      await updateUserProfile(state.user, profileData);

      setState(prev => ({
        ...prev,
        user: prev.user ? {
          ...prev.user,
          user_metadata: {
            ...prev.user.user_metadata,
            ...profileData
          }
        } : null,
        profile: prev.profile ? {
          ...prev.profile,
          ...profileData
        } : null
      }));

    } catch (error) {
      console.error('Update profile error:', error);
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to update profile'
      }));
      throw error;
    }
  };

  return {
    ...state,
    signIn,
    signOut,
    updateProfile,
  };
}
