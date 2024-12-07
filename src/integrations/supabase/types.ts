export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      activity_logs: {
        Row: {
          action_type: string
          created_at: string
          details: Json
          id: string
          profile_id: string
        }
        Insert: {
          action_type: string
          created_at?: string
          details?: Json
          id?: string
          profile_id: string
        }
        Update: {
          action_type?: string
          created_at?: string
          details?: Json
          id?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "activity_logs_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      liquidity_pools: {
        Row: {
          apr: number
          contract_address: string
          created_at: string
          description: string
          id: string
          lockup_period: string
          management_fee: string
          minimum_investment: string
          name: string
          performance_fee: string
          slug: string
          token_contract_address: string
          token_symbol: string
          tvl: number
          updated_at: string
          utilization: number
        }
        Insert: {
          apr?: number
          contract_address?: string
          created_at?: string
          description?: string
          id?: string
          lockup_period?: string
          management_fee?: string
          minimum_investment?: string
          name: string
          performance_fee?: string
          slug: string
          token_contract_address?: string
          token_symbol?: string
          tvl?: number
          updated_at?: string
          utilization?: number
        }
        Update: {
          apr?: number
          contract_address?: string
          created_at?: string
          description?: string
          id?: string
          lockup_period?: string
          management_fee?: string
          minimum_investment?: string
          name?: string
          performance_fee?: string
          slug?: string
          token_contract_address?: string
          token_symbol?: string
          tvl?: number
          updated_at?: string
          utilization?: number
        }
        Relationships: []
      }
      pool_assets: {
        Row: {
          allocation: number
          created_at: string
          id: string
          name: string
          pool_id: string
          updated_at: string
        }
        Insert: {
          allocation?: number
          created_at?: string
          id?: string
          name: string
          pool_id: string
          updated_at?: string
        }
        Update: {
          allocation?: number
          created_at?: string
          id?: string
          name?: string
          pool_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pool_assets_pool_id_fkey"
            columns: ["pool_id"]
            isOneToOne: false
            referencedRelation: "liquidity_pools"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          github_url: string | null
          id: string
          linkedin_url: string | null
          twitter_url: string | null
          updated_at: string
          username: string | null
          wallet_address: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          github_url?: string | null
          id: string
          linkedin_url?: string | null
          twitter_url?: string | null
          updated_at?: string
          username?: string | null
          wallet_address: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          github_url?: string | null
          id?: string
          linkedin_url?: string | null
          twitter_url?: string | null
          updated_at?: string
          username?: string | null
          wallet_address?: string
        }
        Relationships: []
      }
      synthetic_assets: {
        Row: {
          amount: number
          collateral_amount: number
          created_at: string
          id: string
          initial_price: number
          name: string
          profile_id: string
          symbol: string
          updated_at: string
        }
        Insert: {
          amount?: number
          collateral_amount?: number
          created_at?: string
          id?: string
          initial_price: number
          name: string
          profile_id: string
          symbol: string
          updated_at?: string
        }
        Update: {
          amount?: number
          collateral_amount?: number
          created_at?: string
          id?: string
          initial_price?: number
          name?: string
          profile_id?: string
          symbol?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "synthetic_assets_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
