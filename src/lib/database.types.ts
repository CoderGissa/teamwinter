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
      players: {
        Row: {
          id: string
          account_name: string
          townhall_level: number
          previous_league: string
          previous_stars: number
          previous_percentage: number
          comments: string | null
          confirmed: boolean
          created_at: string
          user_id: string | null
        }
        Insert: {
          id?: string
          account_name: string
          townhall_level: number
          previous_league: string
          previous_stars: number
          previous_percentage: number
          comments?: string | null
          confirmed?: boolean
          created_at?: string
          user_id?: string | null
        }
        Update: {
          id?: string
          account_name?: string
          townhall_level?: number
          previous_league?: string
          previous_stars?: number
          previous_percentage?: number
          comments?: string | null
          confirmed?: boolean
          created_at?: string
          user_id?: string | null
        }
      }
    }
  }
}