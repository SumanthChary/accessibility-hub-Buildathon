
import { User } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

type Profile = Database['public']['Tables']['profiles']['Row'];
type ProcessingQuota = Database['public']['Tables']['processing_quota']['Row'];

export interface AuthState {
  user: User | null;
  profile: Profile | null;
  quota: ProcessingQuota | null;
  loading: boolean;
  error: string | null;
}

export interface AuthActions {
  signIn: (provider: 'google' | 'github') => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (profileData: Partial<Profile>) => Promise<void>;
}

export interface AuthContext extends AuthState, AuthActions {}
