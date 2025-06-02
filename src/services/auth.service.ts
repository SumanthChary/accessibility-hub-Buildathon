
import { supabase, type Profile } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

type DatabaseProfile = Database['public']['Tables']['profiles']['Row'];

export const getInitialSession = async () => {
  if (!supabase) return null;
  
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;
  return session;
};

export const fetchUserProfile = async (userId: string) => {
  if (!supabase) return null;
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
    
  if (error && error.code !== 'PGRST116') {
    console.warn('Profile fetch error:', error);
  }
  return data as DatabaseProfile | null;
};

export const fetchUserQuota = async (userId: string) => {
  if (!supabase) return null;
  
  const { data, error } = await supabase
    .from('processing_quota')
    .select('*')
    .eq('user_id', userId)
    .single();
    
  if (error && error.code !== 'PGRST116') {
    console.warn('Quota fetch error:', error);
  }
  return data;
};

export const signInWithOAuth = async (provider: 'google' | 'github') => {
  if (!supabase) throw new Error('Authentication requires Supabase configuration');
  
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
  
  if (error) throw error;
};

export const signOutUser = async () => {
  if (!supabase) return;
  
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const updateUserProfile = async (user: User, profileData: Partial<DatabaseProfile>) => {
  if (!supabase) throw new Error('Authentication required to update profile');
  
  // Update user metadata in auth
  const { error: authError } = await supabase.auth.updateUser({
    data: {
      full_name: profileData.full_name,
      username: profileData.username,
      avatar_url: profileData.avatar_url,
    }
  });

  if (authError) throw authError;

  // Update profile in database if it exists
  const { error: profileError } = await supabase
    .from('profiles')
    .update(profileData)
    .eq('id', user.id);

  if (profileError) {
    console.warn('Profile update in database failed:', profileError);
  }
};
