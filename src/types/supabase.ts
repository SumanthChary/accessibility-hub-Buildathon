export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          updated_at: string | null
          api_quota: number | null
          subscription_tier: 'free' | 'pro' | 'enterprise' | null
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          updated_at?: string | null
          api_quota?: number | null
          subscription_tier?: 'free' | 'pro' | 'enterprise' | null
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          updated_at?: string | null
          api_quota?: number | null
          subscription_tier?: 'free' | 'pro' | 'enterprise' | null
        }
      }
      processing_quota: {
        Row: {
          user_id: string
          audio_minutes: number
          image_count: number
          pdf_pages: number
          updated_at: string
        }
        Insert: {
          user_id: string
          audio_minutes?: number
          image_count?: number
          pdf_pages?: number
          updated_at?: string
        }
        Update: {
          user_id?: string
          audio_minutes?: number
          image_count?: number
          pdf_pages?: number
          updated_at?: string
        }
      }
      processing_history: {
        Row: {
          id: string
          user_id: string
          type: 'audio' | 'image' | 'pdf'
          file_name: string
          file_size: number
          processing_time: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: 'audio' | 'image' | 'pdf'
          file_name: string
          file_size: number
          processing_time: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: 'audio' | 'image' | 'pdf'
          file_name?: string
          file_size?: number
          processing_time?: number
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      subscription_tier: 'free' | 'pro' | 'enterprise'
    }
  }
}
