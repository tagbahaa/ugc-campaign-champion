
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
      campaigns: {
        Row: {
          id: string
          title: string
          status: 'active' | 'in-review' | 'completed'
          created_at: string
          budget: number
          budget_spent: number
          estimated_delivery: string
          progress: number | null
        }
        Insert: {
          id?: string
          title: string
          status: 'active' | 'in-review' | 'completed'
          created_at?: string
          budget: number
          budget_spent: number
          estimated_delivery: string
          progress?: number | null
        }
        Update: {
          id?: string
          title?: string
          status?: 'active' | 'in-review' | 'completed'
          created_at?: string
          budget?: number
          budget_spent?: number
          estimated_delivery?: string
          progress?: number | null
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
      [_ in never]: never
    }
  }
}
