
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

const supabaseUrl = "https://tcodkxsulqoabihlcagu.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjb2RreHN1bHFvYWJpaGxjYWd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2MDEyMTYsImV4cCI6MjA2NDE3NzIxNn0.EY-cM2XjYbp64Wki6g21bYYnrk3nQ0Kgm6HiYAnTIDQ";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});

export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  username?: string;
  avatar_url?: string;
  updated_at?: string;
  api_quota?: number;
  subscription_tier?: 'free' | 'pro' | 'enterprise';
}

export interface ProcessingQuota {
  audio_minutes: number;
  image_count: number;
  pdf_pages: number;
}

// Profile-related functions
export const getProfile = async (userId: string): Promise<Profile | null> => {
  try {
    if (!supabase) return null;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
};

// Check and update processing quota
export const checkQuota = async (userId: string, type: keyof ProcessingQuota): Promise<boolean> => {
  try {
    if (!supabase) return true; // Allow all operations if no Supabase
    
    const { data: quota, error } = await supabase
      .from('processing_quota')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    if (!quota) return false;

    // Use SQL function for safe decrement
    const { error: updateError } = await supabase
      .rpc('decrement_quota', {
        user_id: userId,
        quota_type: type,
        amount: 1
      });

    if (updateError) throw updateError;
    return true;
  } catch (error) {
    console.error('Error checking quota:', error);
    return false;
  }
};

// Update quota after processing
export const updateQuota = async (
  userId: string,
  type: keyof ProcessingQuota,
  amount: number
): Promise<void> => {
  try {
    if (!supabase) return; // Skip if no Supabase
    
    const { error } = await supabase.rpc('decrement_quota', {
      user_id: userId,
      quota_type: type,
      amount: amount
    });

    if (error) throw error;
  } catch (error) {
    console.error('Error updating quota:', error);
  }
};
