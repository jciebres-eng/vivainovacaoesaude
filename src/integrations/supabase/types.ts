export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      audit_events: {
        Row: {
          context: Json
          created_at: string
          event_type: string
          id: string
          profile_id: string | null
          severity: string
        }
        Insert: {
          context?: Json
          created_at?: string
          event_type: string
          id?: string
          profile_id?: string | null
          severity?: string
        }
        Update: {
          context?: Json
          created_at?: string
          event_type?: string
          id?: string
          profile_id?: string | null
          severity?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_events_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      barriers: {
        Row: {
          created_at: string
          description: string | null
          details: string | null
          id: string
          is_demo: boolean
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          details?: string | null
          id: string
          is_demo?: boolean
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          details?: string | null
          id?: string
          is_demo?: boolean
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      consent_records: {
        Row: {
          consent_type: string
          created_at: string
          granted: boolean
          id: string
          profile_id: string
          revoked_at: string | null
          version: string
        }
        Insert: {
          consent_type: string
          created_at?: string
          granted: boolean
          id?: string
          profile_id: string
          revoked_at?: string | null
          version?: string
        }
        Update: {
          consent_type?: string
          created_at?: string
          granted?: boolean
          id?: string
          profile_id?: string
          revoked_at?: string | null
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "consent_records_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      favorites: {
        Row: {
          created_at: string
          id: string
          profile_id: string
          target_id: string
          target_type: string
        }
        Insert: {
          created_at?: string
          id?: string
          profile_id: string
          target_id: string
          target_type: string
        }
        Update: {
          created_at?: string
          id?: string
          profile_id?: string
          target_id?: string
          target_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      information_resources: {
        Row: {
          created_at: string
          description: string | null
          details: string | null
          duration: string | null
          format: string | null
          id: string
          is_demo: boolean
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          details?: string | null
          duration?: string | null
          format?: string | null
          id: string
          is_demo?: boolean
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          details?: string | null
          duration?: string | null
          format?: string | null
          id?: string
          is_demo?: boolean
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      journey_choices: {
        Row: {
          category: Database["public"]["Enums"]["catalog_category"]
          created_at: string
          decision: Database["public"]["Enums"]["choice_decision"]
          decision_order: number
          entity_id: string
          id: string
          journey_id: string
          title: string
        }
        Insert: {
          category: Database["public"]["Enums"]["catalog_category"]
          created_at?: string
          decision: Database["public"]["Enums"]["choice_decision"]
          decision_order: number
          entity_id: string
          id?: string
          journey_id: string
          title: string
        }
        Update: {
          category?: Database["public"]["Enums"]["catalog_category"]
          created_at?: string
          decision?: Database["public"]["Enums"]["choice_decision"]
          decision_order?: number
          entity_id?: string
          id?: string
          journey_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "journey_choices_journey_id_fkey"
            columns: ["journey_id"]
            isOneToOne: false
            referencedRelation: "journeys"
            referencedColumns: ["id"]
          },
        ]
      }
      journey_feedback: {
        Row: {
          created_at: string
          id: string
          journey_id: string
          response_payload: Json
          response_type: string
        }
        Insert: {
          created_at?: string
          id?: string
          journey_id: string
          response_payload?: Json
          response_type: string
        }
        Update: {
          created_at?: string
          id?: string
          journey_id?: string
          response_payload?: Json
          response_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "journey_feedback_journey_id_fkey"
            columns: ["journey_id"]
            isOneToOne: false
            referencedRelation: "journeys"
            referencedColumns: ["id"]
          },
        ]
      }
      journey_steps: {
        Row: {
          category: Database["public"]["Enums"]["catalog_category"] | null
          configuration: Json
          created_at: string
          id: string
          is_fixed: boolean
          is_optional: boolean
          journey_id: string
          position: number
          source_entity_id: string | null
          status: Database["public"]["Enums"]["journey_step_status"]
          support: string | null
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          category?: Database["public"]["Enums"]["catalog_category"] | null
          configuration?: Json
          created_at?: string
          id?: string
          is_fixed?: boolean
          is_optional?: boolean
          journey_id: string
          position: number
          source_entity_id?: string | null
          status?: Database["public"]["Enums"]["journey_step_status"]
          support?: string | null
          title: string
          type: string
          updated_at?: string
        }
        Update: {
          category?: Database["public"]["Enums"]["catalog_category"] | null
          configuration?: Json
          created_at?: string
          id?: string
          is_fixed?: boolean
          is_optional?: boolean
          journey_id?: string
          position?: number
          source_entity_id?: string | null
          status?: Database["public"]["Enums"]["journey_step_status"]
          support?: string | null
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "journey_steps_journey_id_fkey"
            columns: ["journey_id"]
            isOneToOne: false
            referencedRelation: "journeys"
            referencedColumns: ["id"]
          },
        ]
      }
      journey_versions: {
        Row: {
          created_at: string
          id: string
          journey_id: string
          reason: string
          snapshot: Json
          version_number: number
        }
        Insert: {
          created_at?: string
          id?: string
          journey_id: string
          reason: string
          snapshot: Json
          version_number: number
        }
        Update: {
          created_at?: string
          id?: string
          journey_id?: string
          reason?: string
          snapshot?: Json
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "journey_versions_journey_id_fkey"
            columns: ["journey_id"]
            isOneToOne: false
            referencedRelation: "journeys"
            referencedColumns: ["id"]
          },
        ]
      }
      journeys: {
        Row: {
          completed_at: string | null
          created_at: string
          current_step_id: string | null
          id: string
          place: Json | null
          profile_id: string
          route: Json | null
          situation_id: string | null
          started_at: string | null
          status: Database["public"]["Enums"]["journey_status"]
          title: string
          updated_at: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          current_step_id?: string | null
          id?: string
          place?: Json | null
          profile_id: string
          route?: Json | null
          situation_id?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["journey_status"]
          title: string
          updated_at?: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          current_step_id?: string | null
          id?: string
          place?: Json | null
          profile_id?: string
          route?: Json | null
          situation_id?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["journey_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "journeys_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "journeys_situation_id_fkey"
            columns: ["situation_id"]
            isOneToOne: false
            referencedRelation: "situations"
            referencedColumns: ["id"]
          },
        ]
      }
      location_updates: {
        Row: {
          accuracy: number | null
          current_step_id: string | null
          id: string
          latitude: number | null
          longitude: number | null
          recorded_at: string
          sharing_session_id: string
          step_label: string | null
        }
        Insert: {
          accuracy?: number | null
          current_step_id?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          recorded_at?: string
          sharing_session_id: string
          step_label?: string | null
        }
        Update: {
          accuracy?: number | null
          current_step_id?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          recorded_at?: string
          sharing_session_id?: string
          step_label?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "location_updates_sharing_session_id_fkey"
            columns: ["sharing_session_id"]
            isOneToOne: false
            referencedRelation: "sharing_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      media_assets: {
        Row: {
          bucket: string
          created_at: string
          description: string | null
          id: string
          journey_id: string | null
          kind: string
          mime_type: string | null
          path: string
          profile_id: string
          size_bytes: number | null
          updated_at: string
        }
        Insert: {
          bucket: string
          created_at?: string
          description?: string | null
          id?: string
          journey_id?: string | null
          kind: string
          mime_type?: string | null
          path: string
          profile_id: string
          size_bytes?: number | null
          updated_at?: string
        }
        Update: {
          bucket?: string
          created_at?: string
          description?: string | null
          id?: string
          journey_id?: string | null
          kind?: string
          mime_type?: string | null
          path?: string
          profile_id?: string
          size_bytes?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "media_assets_journey_id_fkey"
            columns: ["journey_id"]
            isOneToOne: false
            referencedRelation: "journeys"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "media_assets_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      needs: {
        Row: {
          created_at: string
          description: string | null
          details: string | null
          id: string
          is_demo: boolean
          situation_id: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          details?: string | null
          id: string
          is_demo?: boolean
          situation_id?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          details?: string | null
          id?: string
          is_demo?: boolean
          situation_id?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "needs_situation_id_fkey"
            columns: ["situation_id"]
            isOneToOne: false
            referencedRelation: "situations"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          archived_at: string | null
          created_at: string
          display_name: string
          id: string
          is_demo: boolean
          updated_at: string
          user_id: string | null
        }
        Insert: {
          archived_at?: string | null
          created_at?: string
          display_name?: string
          id?: string
          is_demo?: boolean
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          archived_at?: string | null
          created_at?: string
          display_name?: string
          id?: string
          is_demo?: boolean
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      sharing_sessions: {
        Row: {
          created_at: string
          expires_at: string
          id: string
          journey_id: string
          owner_id: string
          precision_mode: Database["public"]["Enums"]["sharing_precision"]
          public_token_hash: string
          revoked_at: string | null
        }
        Insert: {
          created_at?: string
          expires_at: string
          id?: string
          journey_id: string
          owner_id: string
          precision_mode?: Database["public"]["Enums"]["sharing_precision"]
          public_token_hash: string
          revoked_at?: string | null
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: string
          journey_id?: string
          owner_id?: string
          precision_mode?: Database["public"]["Enums"]["sharing_precision"]
          public_token_hash?: string
          revoked_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sharing_sessions_journey_id_fkey"
            columns: ["journey_id"]
            isOneToOne: false
            referencedRelation: "journeys"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sharing_sessions_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      sharing_viewers: {
        Row: {
          first_seen_at: string
          id: string
          label: string | null
          last_seen_at: string
          sharing_session_id: string
        }
        Insert: {
          first_seen_at?: string
          id?: string
          label?: string | null
          last_seen_at?: string
          sharing_session_id: string
        }
        Update: {
          first_seen_at?: string
          id?: string
          label?: string | null
          last_seen_at?: string
          sharing_session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sharing_viewers_sharing_session_id_fkey"
            columns: ["sharing_session_id"]
            isOneToOne: false
            referencedRelation: "sharing_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      situations: {
        Row: {
          context: string | null
          created_at: string
          description: string | null
          id: string
          is_demo: boolean
          slug: string
          tags: string[]
          title: string
          updated_at: string
        }
        Insert: {
          context?: string | null
          created_at?: string
          description?: string | null
          id: string
          is_demo?: boolean
          slug: string
          tags?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          context?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_demo?: boolean
          slug?: string
          tags?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      strategies: {
        Row: {
          answers_barriers: string[]
          created_at: string
          description: string | null
          details: string | null
          id: string
          is_demo: boolean
          title: string
          updated_at: string
        }
        Insert: {
          answers_barriers?: string[]
          created_at?: string
          description?: string | null
          details?: string | null
          id: string
          is_demo?: boolean
          title: string
          updated_at?: string
        }
        Update: {
          answers_barriers?: string[]
          created_at?: string
          description?: string | null
          details?: string | null
          id?: string
          is_demo?: boolean
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      training_resources: {
        Row: {
          created_at: string
          description: string | null
          details: string | null
          duration: string | null
          format: string | null
          id: string
          is_demo: boolean
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          details?: string | null
          duration?: string | null
          format?: string | null
          id: string
          is_demo?: boolean
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          details?: string | null
          duration?: string | null
          format?: string | null
          id?: string
          is_demo?: boolean
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          animation_intensity: string
          audio_enabled: boolean
          created_at: string
          extras: Json
          id: string
          information_density: string
          location_sharing_default: Database["public"]["Enums"]["sharing_precision"]
          low_stimulation: boolean
          profile_id: string
          step_size: string
          updated_at: string
        }
        Insert: {
          animation_intensity?: string
          audio_enabled?: boolean
          created_at?: string
          extras?: Json
          id?: string
          information_density?: string
          location_sharing_default?: Database["public"]["Enums"]["sharing_precision"]
          low_stimulation?: boolean
          profile_id: string
          step_size?: string
          updated_at?: string
        }
        Update: {
          animation_intensity?: string
          audio_enabled?: boolean
          created_at?: string
          extras?: Json
          id?: string
          information_density?: string
          location_sharing_default?: Database["public"]["Enums"]["sharing_precision"]
          low_stimulation?: boolean
          profile_id?: string
          step_size?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_preferences_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
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
      arquivo_permitido: { Args: { _name: string }; Returns: boolean }
      follow_shared_journey: { Args: { _token: string }; Returns: Json }
      owns_journey: { Args: { _journey_id: string }; Returns: boolean }
      owns_profile: { Args: { _profile_id: string }; Returns: boolean }
    }
    Enums: {
      catalog_category:
        | "situation"
        | "need"
        | "barrier"
        | "strategy"
        | "information"
        | "training"
        | "monitoring"
        | "feedback"
      choice_decision: "accepted" | "rejected" | "skipped" | "saved_for_later"
      journey_status:
        | "draft"
        | "preparing"
        | "ready"
        | "executing"
        | "paused"
        | "completed"
        | "cancelled"
      journey_step_status: "pending" | "active" | "completed" | "skipped"
      sharing_precision: "exact" | "approximate" | "step_only"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      catalog_category: [
        "situation",
        "need",
        "barrier",
        "strategy",
        "information",
        "training",
        "monitoring",
        "feedback",
      ],
      choice_decision: ["accepted", "rejected", "skipped", "saved_for_later"],
      journey_status: [
        "draft",
        "preparing",
        "ready",
        "executing",
        "paused",
        "completed",
        "cancelled",
      ],
      journey_step_status: ["pending", "active", "completed", "skipped"],
      sharing_precision: ["exact", "approximate", "step_only"],
    },
  },
} as const
