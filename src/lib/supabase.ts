import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export interface Profile {
  id: string;
  email: string;
  full_name?: string;
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
    const { data: quota, error } = await supabase
      .from('processing_quota')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    
    // If no quota record exists, create one with default values
    if (!quota) {
      const defaultQuota = {
        user_id: userId,
        audio_minutes: 60, // 1 hour free
        image_count: 100,  // 100 images free
        pdf_pages: 500     // 500 pages free
      };
      
      await supabase
        .from('processing_quota')
        .insert(defaultQuota);
      
      return true;
    }

    // Check if quota is available
    return quota[type] > 0;
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
    const { error } = await supabase
      .from('processing_quota')
      .update({ [type]: supabase.raw(`${type} - ${amount}`) })
      .eq('user_id', userId);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating quota:', error);
  }
};
