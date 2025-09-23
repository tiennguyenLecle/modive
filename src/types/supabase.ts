export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '13.0.4';
  };
  public: {
    Tables: {
      _migrations: {
        Row: {
          created_at: number | null;
          hash: string;
          id: number;
        };
        Insert: {
          created_at?: number | null;
          hash: string;
          id?: number;
        };
        Update: {
          created_at?: number | null;
          hash?: string;
          id?: number;
        };
        Relationships: [];
      };
      announcements: {
        Row: {
          content: string | null;
          created_at: string | null;
          deleted_at: string | null;
          expiration_date: string | null;
          id: string;
          publication_date: string | null;
          status: Database['public']['Enums']['announcement_status'] | null;
          title: string;
          updated_at: string | null;
        };
        Insert: {
          content?: string | null;
          created_at?: string | null;
          deleted_at?: string | null;
          expiration_date?: string | null;
          id?: string;
          publication_date?: string | null;
          status?: Database['public']['Enums']['announcement_status'] | null;
          title: string;
          updated_at?: string | null;
        };
        Update: {
          content?: string | null;
          created_at?: string | null;
          deleted_at?: string | null;
          expiration_date?: string | null;
          id?: string;
          publication_date?: string | null;
          status?: Database['public']['Enums']['announcement_status'] | null;
          title?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      cart_items: {
        Row: {
          cart_id: string;
          chapter_id: string | null;
          created_at: string | null;
          currency: Database['public']['Enums']['currency'] | null;
          deleted_at: string | null;
          delivery_fee: number | null;
          episode_id: string | null;
          good_id: string | null;
          id: string;
          is_selected: boolean | null;
          item_id: string;
          item_type: Database['public']['Enums']['order_item_type'];
          quantity: number | null;
          total_price: number | null;
          unit_price: number | null;
          updated_at: string | null;
          user_id: string | null;
          work_id: string | null;
        };
        Insert: {
          cart_id: string;
          chapter_id?: string | null;
          created_at?: string | null;
          currency?: Database['public']['Enums']['currency'] | null;
          deleted_at?: string | null;
          delivery_fee?: number | null;
          episode_id?: string | null;
          good_id?: string | null;
          id?: string;
          is_selected?: boolean | null;
          item_id: string;
          item_type?: Database['public']['Enums']['order_item_type'];
          quantity?: number | null;
          total_price?: number | null;
          unit_price?: number | null;
          updated_at?: string | null;
          user_id?: string | null;
          work_id?: string | null;
        };
        Update: {
          cart_id?: string;
          chapter_id?: string | null;
          created_at?: string | null;
          currency?: Database['public']['Enums']['currency'] | null;
          deleted_at?: string | null;
          delivery_fee?: number | null;
          episode_id?: string | null;
          good_id?: string | null;
          id?: string;
          is_selected?: boolean | null;
          item_id?: string;
          item_type?: Database['public']['Enums']['order_item_type'];
          quantity?: number | null;
          total_price?: number | null;
          unit_price?: number | null;
          updated_at?: string | null;
          user_id?: string | null;
          work_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'cart_items_cart_id_carts_id_fk';
            columns: ['cart_id'];
            isOneToOne: false;
            referencedRelation: 'carts';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'cart_items_chapter_id_chapters_id_fk';
            columns: ['chapter_id'];
            isOneToOne: false;
            referencedRelation: 'chapters';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'cart_items_episode_id_episodes_id_fk';
            columns: ['episode_id'];
            isOneToOne: false;
            referencedRelation: 'episodes';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'cart_items_good_id_goods_id_fk';
            columns: ['good_id'];
            isOneToOne: false;
            referencedRelation: 'goods';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'cart_items_user_id_users_id_fk';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'cart_items_work_id_works_id_fk';
            columns: ['work_id'];
            isOneToOne: false;
            referencedRelation: 'works';
            referencedColumns: ['id'];
          },
        ];
      };
      carts: {
        Row: {
          created_at: string | null;
          currency: Database['public']['Enums']['currency'] | null;
          deleted_at: string | null;
          id: string;
          total: number | null;
          total_delivery_fee: number | null;
          total_items: number | null;
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          currency?: Database['public']['Enums']['currency'] | null;
          deleted_at?: string | null;
          id?: string;
          total?: number | null;
          total_delivery_fee?: number | null;
          total_items?: number | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          currency?: Database['public']['Enums']['currency'] | null;
          deleted_at?: string | null;
          id?: string;
          total?: number | null;
          total_delivery_fee?: number | null;
          total_items?: number | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'carts_user_id_users_id_fk';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      categories: {
        Row: {
          created_at: string | null;
          deleted_at: string | null;
          description: string | null;
          id: string;
          parent_id: string | null;
          position: number | null;
          title: string;
          type: Database['public']['Enums']['category_type'] | null;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          deleted_at?: string | null;
          description?: string | null;
          id?: string;
          parent_id?: string | null;
          position?: number | null;
          title: string;
          type?: Database['public']['Enums']['category_type'] | null;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          deleted_at?: string | null;
          description?: string | null;
          id?: string;
          parent_id?: string | null;
          position?: number | null;
          title?: string;
          type?: Database['public']['Enums']['category_type'] | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'categories_parent_id_categories_id_fk';
            columns: ['parent_id'];
            isOneToOne: false;
            referencedRelation: 'categories';
            referencedColumns: ['id'];
          },
        ];
      };
      chapter_actions: {
        Row: {
          action: Database['public']['Enums']['chapter_action_type'];
          chapter_id: string;
          user_id: string;
        };
        Insert: {
          action: Database['public']['Enums']['chapter_action_type'];
          chapter_id: string;
          user_id: string;
        };
        Update: {
          action?: Database['public']['Enums']['chapter_action_type'];
          chapter_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'chapter_actions_chapter_id_chapters_id_fk';
            columns: ['chapter_id'];
            isOneToOne: false;
            referencedRelation: 'chapters';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'chapter_actions_user_id_users_id_fk';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      chapter_characters: {
        Row: {
          chapter_id: string;
          character_id: string;
          is_main: boolean | null;
        };
        Insert: {
          chapter_id: string;
          character_id: string;
          is_main?: boolean | null;
        };
        Update: {
          chapter_id?: string;
          character_id?: string;
          is_main?: boolean | null;
        };
        Relationships: [
          {
            foreignKeyName: 'chapter_characters_chapter_id_chapters_id_fk';
            columns: ['chapter_id'];
            isOneToOne: false;
            referencedRelation: 'chapters';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'chapter_characters_character_id_works_id_fk';
            columns: ['character_id'];
            isOneToOne: false;
            referencedRelation: 'works';
            referencedColumns: ['id'];
          },
        ];
      };
      chapters: {
        Row: {
          content: string | null;
          content_media_key: string | null;
          created_at: string | null;
          currency: Database['public']['Enums']['currency'] | null;
          deleted_at: string | null;
          id: string;
          introduction: string | null;
          is_published: boolean | null;
          name: string;
          position: number | null;
          price: number | null;
          tags: string[] | null;
          thumbnail_id: string | null;
          thumbnail_key: string | null;
          updated_at: string | null;
          work_id: string | null;
        };
        Insert: {
          content?: string | null;
          content_media_key?: string | null;
          created_at?: string | null;
          currency?: Database['public']['Enums']['currency'] | null;
          deleted_at?: string | null;
          id?: string;
          introduction?: string | null;
          is_published?: boolean | null;
          name: string;
          position?: number | null;
          price?: number | null;
          tags?: string[] | null;
          thumbnail_id?: string | null;
          thumbnail_key?: string | null;
          updated_at?: string | null;
          work_id?: string | null;
        };
        Update: {
          content?: string | null;
          content_media_key?: string | null;
          created_at?: string | null;
          currency?: Database['public']['Enums']['currency'] | null;
          deleted_at?: string | null;
          id?: string;
          introduction?: string | null;
          is_published?: boolean | null;
          name?: string;
          position?: number | null;
          price?: number | null;
          tags?: string[] | null;
          thumbnail_id?: string | null;
          thumbnail_key?: string | null;
          updated_at?: string | null;
          work_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'chapters_thumbnail_id_medias_id_fk';
            columns: ['thumbnail_id'];
            isOneToOne: false;
            referencedRelation: 'medias';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'chapters_work_id_works_id_fk';
            columns: ['work_id'];
            isOneToOne: false;
            referencedRelation: 'works';
            referencedColumns: ['id'];
          },
        ];
      };
      character_likes: {
        Row: {
          character_id: string;
          user_id: string;
        };
        Insert: {
          character_id: string;
          user_id: string;
        };
        Update: {
          character_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'character_likes_character_id_characters_id_fk';
            columns: ['character_id'];
            isOneToOne: false;
            referencedRelation: 'characters';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'character_likes_user_id_users_id_fk';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      character_medias: {
        Row: {
          character_id: string;
          media_id: string;
        };
        Insert: {
          character_id: string;
          media_id: string;
        };
        Update: {
          character_id?: string;
          media_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'character_medias_character_id_characters_id_fk';
            columns: ['character_id'];
            isOneToOne: false;
            referencedRelation: 'characters';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'character_medias_media_id_medias_id_fk';
            columns: ['media_id'];
            isOneToOne: false;
            referencedRelation: 'medias';
            referencedColumns: ['id'];
          },
        ];
      };
      characters: {
        Row: {
          age: number | null;
          avatar_id: string | null;
          avatar_key: string | null;
          bot_id: string | null;
          created_at: string | null;
          date_of_birth: string | null;
          deleted_at: string | null;
          full_name: string | null;
          gender: Database['public']['Enums']['gender'] | null;
          id: string;
          introduction: string | null;
          metadata: Json | null;
          name: string;
          nationality: string | null;
          occupation: string | null;
          place_of_birth: string | null;
          quote: string | null;
          total_likes: number | null;
          updated_at: string | null;
          work_id: string | null;
        };
        Insert: {
          age?: number | null;
          avatar_id?: string | null;
          avatar_key?: string | null;
          bot_id?: string | null;
          created_at?: string | null;
          date_of_birth?: string | null;
          deleted_at?: string | null;
          full_name?: string | null;
          gender?: Database['public']['Enums']['gender'] | null;
          id?: string;
          introduction?: string | null;
          metadata?: Json | null;
          name: string;
          nationality?: string | null;
          occupation?: string | null;
          place_of_birth?: string | null;
          quote?: string | null;
          total_likes?: number | null;
          updated_at?: string | null;
          work_id?: string | null;
        };
        Update: {
          age?: number | null;
          avatar_id?: string | null;
          avatar_key?: string | null;
          bot_id?: string | null;
          created_at?: string | null;
          date_of_birth?: string | null;
          deleted_at?: string | null;
          full_name?: string | null;
          gender?: Database['public']['Enums']['gender'] | null;
          id?: string;
          introduction?: string | null;
          metadata?: Json | null;
          name?: string;
          nationality?: string | null;
          occupation?: string | null;
          place_of_birth?: string | null;
          quote?: string | null;
          total_likes?: number | null;
          updated_at?: string | null;
          work_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'characters_avatar_id_medias_id_fk';
            columns: ['avatar_id'];
            isOneToOne: false;
            referencedRelation: 'medias';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'characters_work_id_works_id_fk';
            columns: ['work_id'];
            isOneToOne: false;
            referencedRelation: 'works';
            referencedColumns: ['id'];
          },
        ];
      };
      chat_rooms: {
        Row: {
          chapter_id: string | null;
          character_id: string | null;
          created_at: string | null;
          deleted_at: string | null;
          id: string;
          intimacy: number | null;
          is_pinned: boolean | null;
          last_accessed_at: string | null;
          last_message: string | null;
          metadata: Json | null;
          name: string | null;
          pinned_at: string | null;
          progress: number | null;
          room_id: string | null;
          session_id: string | null;
          theme_id: string | null;
          theme_key: string | null;
          type: Database['public']['Enums']['chat_room_type'] | null;
          universe_id: string | null;
          updated_at: string | null;
          user_id: string | null;
          work_id: string | null;
        };
        Insert: {
          chapter_id?: string | null;
          character_id?: string | null;
          created_at?: string | null;
          deleted_at?: string | null;
          id?: string;
          intimacy?: number | null;
          is_pinned?: boolean | null;
          last_accessed_at?: string | null;
          last_message?: string | null;
          metadata?: Json | null;
          name?: string | null;
          pinned_at?: string | null;
          progress?: number | null;
          room_id?: string | null;
          session_id?: string | null;
          theme_id?: string | null;
          theme_key?: string | null;
          type?: Database['public']['Enums']['chat_room_type'] | null;
          universe_id?: string | null;
          updated_at?: string | null;
          user_id?: string | null;
          work_id?: string | null;
        };
        Update: {
          chapter_id?: string | null;
          character_id?: string | null;
          created_at?: string | null;
          deleted_at?: string | null;
          id?: string;
          intimacy?: number | null;
          is_pinned?: boolean | null;
          last_accessed_at?: string | null;
          last_message?: string | null;
          metadata?: Json | null;
          name?: string | null;
          pinned_at?: string | null;
          progress?: number | null;
          room_id?: string | null;
          session_id?: string | null;
          theme_id?: string | null;
          theme_key?: string | null;
          type?: Database['public']['Enums']['chat_room_type'] | null;
          universe_id?: string | null;
          updated_at?: string | null;
          user_id?: string | null;
          work_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'chat_rooms_chapter_id_chapters_id_fk';
            columns: ['chapter_id'];
            isOneToOne: false;
            referencedRelation: 'chapters';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'chat_rooms_character_id_characters_id_fk';
            columns: ['character_id'];
            isOneToOne: false;
            referencedRelation: 'characters';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'chat_rooms_theme_id_medias_id_fk';
            columns: ['theme_id'];
            isOneToOne: false;
            referencedRelation: 'medias';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'chat_rooms_user_id_users_id_fk';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'chat_rooms_work_id_works_id_fk';
            columns: ['work_id'];
            isOneToOne: false;
            referencedRelation: 'works';
            referencedColumns: ['id'];
          },
        ];
      };
      coin_packages: {
        Row: {
          bonus: number | null;
          coins_credit: number;
          created_at: string | null;
          currency: Database['public']['Enums']['currency'] | null;
          deleted_at: string | null;
          description: string | null;
          id: string;
          name: string;
          position: number | null;
          price: number;
          status: Database['public']['Enums']['coin_package_status'] | null;
          updated_at: string | null;
        };
        Insert: {
          bonus?: number | null;
          coins_credit: number;
          created_at?: string | null;
          currency?: Database['public']['Enums']['currency'] | null;
          deleted_at?: string | null;
          description?: string | null;
          id?: string;
          name: string;
          position?: number | null;
          price: number;
          status?: Database['public']['Enums']['coin_package_status'] | null;
          updated_at?: string | null;
        };
        Update: {
          bonus?: number | null;
          coins_credit?: number;
          created_at?: string | null;
          currency?: Database['public']['Enums']['currency'] | null;
          deleted_at?: string | null;
          description?: string | null;
          id?: string;
          name?: string;
          position?: number | null;
          price?: number;
          status?: Database['public']['Enums']['coin_package_status'] | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      comment_likes: {
        Row: {
          comment_id: string;
          user_id: string;
        };
        Insert: {
          comment_id: string;
          user_id: string;
        };
        Update: {
          comment_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'comment_likes_comment_id_comments_id_fk';
            columns: ['comment_id'];
            isOneToOne: false;
            referencedRelation: 'comments';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'comment_likes_user_id_users_id_fk';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      comment_medias: {
        Row: {
          comment_id: string;
          media_id: string;
        };
        Insert: {
          comment_id: string;
          media_id: string;
        };
        Update: {
          comment_id?: string;
          media_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'comment_medias_comment_id_comments_id_fk';
            columns: ['comment_id'];
            isOneToOne: false;
            referencedRelation: 'comments';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'comment_medias_media_id_medias_id_fk';
            columns: ['media_id'];
            isOneToOne: false;
            referencedRelation: 'medias';
            referencedColumns: ['id'];
          },
        ];
      };
      comments: {
        Row: {
          content: string | null;
          created_at: string | null;
          deleted_at: string | null;
          id: string;
          updated_at: string | null;
          user_id: string;
          work_id: string;
        };
        Insert: {
          content?: string | null;
          created_at?: string | null;
          deleted_at?: string | null;
          id?: string;
          updated_at?: string | null;
          user_id: string;
          work_id: string;
        };
        Update: {
          content?: string | null;
          created_at?: string | null;
          deleted_at?: string | null;
          id?: string;
          updated_at?: string | null;
          user_id?: string;
          work_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'comments_user_id_users_id_fk';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'comments_work_id_works_id_fk';
            columns: ['work_id'];
            isOneToOne: false;
            referencedRelation: 'works';
            referencedColumns: ['id'];
          },
        ];
      };
      debug_logs: {
        Row: {
          created_at: string | null;
          id: number;
          message: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          message?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          message?: string | null;
        };
        Relationships: [];
      };
      episodes: {
        Row: {
          content_media_key: string | null;
          created_at: string | null;
          currency: Database['public']['Enums']['currency'] | null;
          deleted_at: string | null;
          id: string;
          name: string;
          position: number | null;
          price: number | null;
          updated_at: string | null;
          work_id: string | null;
        };
        Insert: {
          content_media_key?: string | null;
          created_at?: string | null;
          currency?: Database['public']['Enums']['currency'] | null;
          deleted_at?: string | null;
          id?: string;
          name: string;
          position?: number | null;
          price?: number | null;
          updated_at?: string | null;
          work_id?: string | null;
        };
        Update: {
          content_media_key?: string | null;
          created_at?: string | null;
          currency?: Database['public']['Enums']['currency'] | null;
          deleted_at?: string | null;
          id?: string;
          name?: string;
          position?: number | null;
          price?: number | null;
          updated_at?: string | null;
          work_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'episodes_work_id_works_id_fk';
            columns: ['work_id'];
            isOneToOne: false;
            referencedRelation: 'works';
            referencedColumns: ['id'];
          },
        ];
      };
      faq: {
        Row: {
          content: string | null;
          created_at: string | null;
          deleted_at: string | null;
          id: string;
          publication_date: string | null;
          status: Database['public']['Enums']['faq_status'] | null;
          title: string;
          updated_at: string | null;
        };
        Insert: {
          content?: string | null;
          created_at?: string | null;
          deleted_at?: string | null;
          id?: string;
          publication_date?: string | null;
          status?: Database['public']['Enums']['faq_status'] | null;
          title: string;
          updated_at?: string | null;
        };
        Update: {
          content?: string | null;
          created_at?: string | null;
          deleted_at?: string | null;
          id?: string;
          publication_date?: string | null;
          status?: Database['public']['Enums']['faq_status'] | null;
          title?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      good_categories: {
        Row: {
          category_id: string;
          good_id: string;
        };
        Insert: {
          category_id: string;
          good_id: string;
        };
        Update: {
          category_id?: string;
          good_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'good_categories_category_id_categories_id_fk';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'categories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'good_categories_good_id_goods_id_fk';
            columns: ['good_id'];
            isOneToOne: false;
            referencedRelation: 'goods';
            referencedColumns: ['id'];
          },
        ];
      };
      good_likes: {
        Row: {
          good_id: string;
          user_id: string;
        };
        Insert: {
          good_id: string;
          user_id: string;
        };
        Update: {
          good_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'good_likes_good_id_goods_id_fk';
            columns: ['good_id'];
            isOneToOne: false;
            referencedRelation: 'goods';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'good_likes_user_id_users_id_fk';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      good_storage_objects: {
        Row: {
          good_id: string;
          key: string;
        };
        Insert: {
          good_id: string;
          key: string;
        };
        Update: {
          good_id?: string;
          key?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'good_storage_objects_good_id_goods_id_fk';
            columns: ['good_id'];
            isOneToOne: false;
            referencedRelation: 'goods';
            referencedColumns: ['id'];
          },
        ];
      };
      goods: {
        Row: {
          created_at: string | null;
          currency: Database['public']['Enums']['currency'] | null;
          deleted_at: string | null;
          delivery_fee: number | null;
          description: string | null;
          free_shipping_threshold: number | null;
          id: string;
          is_pre_sale: boolean | null;
          metadata: Json | null;
          price: number;
          purchase_link: string | null;
          quantity: number | null;
          release_date: string | null;
          shipping_provider:
            | Database['public']['Enums']['shipping_provider']
            | null;
          status: Database['public']['Enums']['good_status'] | null;
          thumbnail_id: string | null;
          thumbnail_key: string | null;
          title: string;
          updated_at: string | null;
          url: string | null;
          work_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          currency?: Database['public']['Enums']['currency'] | null;
          deleted_at?: string | null;
          delivery_fee?: number | null;
          description?: string | null;
          free_shipping_threshold?: number | null;
          id?: string;
          is_pre_sale?: boolean | null;
          metadata?: Json | null;
          price?: number;
          purchase_link?: string | null;
          quantity?: number | null;
          release_date?: string | null;
          shipping_provider?:
            | Database['public']['Enums']['shipping_provider']
            | null;
          status?: Database['public']['Enums']['good_status'] | null;
          thumbnail_id?: string | null;
          thumbnail_key?: string | null;
          title: string;
          updated_at?: string | null;
          url?: string | null;
          work_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          currency?: Database['public']['Enums']['currency'] | null;
          deleted_at?: string | null;
          delivery_fee?: number | null;
          description?: string | null;
          free_shipping_threshold?: number | null;
          id?: string;
          is_pre_sale?: boolean | null;
          metadata?: Json | null;
          price?: number;
          purchase_link?: string | null;
          quantity?: number | null;
          release_date?: string | null;
          shipping_provider?:
            | Database['public']['Enums']['shipping_provider']
            | null;
          status?: Database['public']['Enums']['good_status'] | null;
          thumbnail_id?: string | null;
          thumbnail_key?: string | null;
          title?: string;
          updated_at?: string | null;
          url?: string | null;
          work_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'goods_thumbnail_id_medias_id_fk';
            columns: ['thumbnail_id'];
            isOneToOne: false;
            referencedRelation: 'medias';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'goods_work_id_works_id_fk';
            columns: ['work_id'];
            isOneToOne: false;
            referencedRelation: 'works';
            referencedColumns: ['id'];
          },
        ];
      };
      interfaces: {
        Row: {
          banner_key: string;
          blocks: Json | null;
          created_at: string | null;
          deleted_at: string | null;
          id: string;
          updated_at: string | null;
        };
        Insert: {
          banner_key: string;
          blocks?: Json | null;
          created_at?: string | null;
          deleted_at?: string | null;
          id?: string;
          updated_at?: string | null;
        };
        Update: {
          banner_key?: string;
          blocks?: Json | null;
          created_at?: string | null;
          deleted_at?: string | null;
          id?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      languages: {
        Row: {
          code: string;
          is_default: boolean | null;
          name: string;
        };
        Insert: {
          code: string;
          is_default?: boolean | null;
          name: string;
        };
        Update: {
          code?: string;
          is_default?: boolean | null;
          name?: string;
        };
        Relationships: [];
      };
      medias: {
        Row: {
          created_at: string | null;
          deleted_at: string | null;
          file_size: number | null;
          file_type: string | null;
          id: string;
          metadata: Json | null;
          mime_type: string | null;
          type: string;
          updated_at: string | null;
          uploader_id: string | null;
          url: string;
        };
        Insert: {
          created_at?: string | null;
          deleted_at?: string | null;
          file_size?: number | null;
          file_type?: string | null;
          id?: string;
          metadata?: Json | null;
          mime_type?: string | null;
          type: string;
          updated_at?: string | null;
          uploader_id?: string | null;
          url: string;
        };
        Update: {
          created_at?: string | null;
          deleted_at?: string | null;
          file_size?: number | null;
          file_type?: string | null;
          id?: string;
          metadata?: Json | null;
          mime_type?: string | null;
          type?: string;
          updated_at?: string | null;
          uploader_id?: string | null;
          url?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'medias_uploader_id_users_id_fk';
            columns: ['uploader_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      notification_tokens: {
        Row: {
          created_at: string | null;
          deleted_at: string | null;
          id: string;
          os: Database['public']['Enums']['notification_os'] | null;
          token: string | null;
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          deleted_at?: string | null;
          id?: string;
          os?: Database['public']['Enums']['notification_os'] | null;
          token?: string | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          deleted_at?: string | null;
          id?: string;
          os?: Database['public']['Enums']['notification_os'] | null;
          token?: string | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'notification_tokens_user_id_users_id_fk';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      notifications: {
        Row: {
          content: string | null;
          created_at: string | null;
          data: Json | null;
          deleted_at: string | null;
          expiration_date: string | null;
          id: string;
          is_read: boolean | null;
          receiver_id: string | null;
          sender_id: string | null;
          title: string | null;
          type: Database['public']['Enums']['notification_type'] | null;
          updated_at: string | null;
        };
        Insert: {
          content?: string | null;
          created_at?: string | null;
          data?: Json | null;
          deleted_at?: string | null;
          expiration_date?: string | null;
          id?: string;
          is_read?: boolean | null;
          receiver_id?: string | null;
          sender_id?: string | null;
          title?: string | null;
          type?: Database['public']['Enums']['notification_type'] | null;
          updated_at?: string | null;
        };
        Update: {
          content?: string | null;
          created_at?: string | null;
          data?: Json | null;
          deleted_at?: string | null;
          expiration_date?: string | null;
          id?: string;
          is_read?: boolean | null;
          receiver_id?: string | null;
          sender_id?: string | null;
          title?: string | null;
          type?: Database['public']['Enums']['notification_type'] | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'notifications_receiver_id_users_id_fk';
            columns: ['receiver_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'notifications_sender_id_users_id_fk';
            columns: ['sender_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      order_items: {
        Row: {
          chapter_id: string | null;
          created_at: string | null;
          deleted_at: string | null;
          delivery_fee: number | null;
          episode_id: string | null;
          good_id: string | null;
          id: string;
          item_id: string;
          item_snapshot: Json | null;
          item_type: Database['public']['Enums']['order_item_type'];
          order_id: string | null;
          quantity: number | null;
          total_price: number | null;
          unit_price: number | null;
          updated_at: string | null;
          user_id: string | null;
          work_id: string | null;
        };
        Insert: {
          chapter_id?: string | null;
          created_at?: string | null;
          deleted_at?: string | null;
          delivery_fee?: number | null;
          episode_id?: string | null;
          good_id?: string | null;
          id?: string;
          item_id: string;
          item_snapshot?: Json | null;
          item_type?: Database['public']['Enums']['order_item_type'];
          order_id?: string | null;
          quantity?: number | null;
          total_price?: number | null;
          unit_price?: number | null;
          updated_at?: string | null;
          user_id?: string | null;
          work_id?: string | null;
        };
        Update: {
          chapter_id?: string | null;
          created_at?: string | null;
          deleted_at?: string | null;
          delivery_fee?: number | null;
          episode_id?: string | null;
          good_id?: string | null;
          id?: string;
          item_id?: string;
          item_snapshot?: Json | null;
          item_type?: Database['public']['Enums']['order_item_type'];
          order_id?: string | null;
          quantity?: number | null;
          total_price?: number | null;
          unit_price?: number | null;
          updated_at?: string | null;
          user_id?: string | null;
          work_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'order_items_chapter_id_chapters_id_fk';
            columns: ['chapter_id'];
            isOneToOne: false;
            referencedRelation: 'chapters';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_items_episode_id_episodes_id_fk';
            columns: ['episode_id'];
            isOneToOne: false;
            referencedRelation: 'episodes';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_items_good_id_goods_id_fk';
            columns: ['good_id'];
            isOneToOne: false;
            referencedRelation: 'goods';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_items_order_id_orders_id_fk';
            columns: ['order_id'];
            isOneToOne: false;
            referencedRelation: 'orders';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_items_user_id_users_id_fk';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_items_work_id_works_id_fk';
            columns: ['work_id'];
            isOneToOne: false;
            referencedRelation: 'works';
            referencedColumns: ['id'];
          },
        ];
      };
      orders: {
        Row: {
          confirmed_at: string | null;
          created_at: string | null;
          currency: Database['public']['Enums']['currency'] | null;
          deleted_at: string | null;
          id: string;
          paid_at: string | null;
          payment_method: string | null;
          refunded_at: string | null;
          shipping_info: Json | null;
          status: Database['public']['Enums']['order_status'];
          toss_payment_id: string | null;
          total: number | null;
          total_delivery_fee: number | null;
          total_items: number | null;
          total_price: number | null;
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          confirmed_at?: string | null;
          created_at?: string | null;
          currency?: Database['public']['Enums']['currency'] | null;
          deleted_at?: string | null;
          id?: string;
          paid_at?: string | null;
          payment_method?: string | null;
          refunded_at?: string | null;
          shipping_info?: Json | null;
          status?: Database['public']['Enums']['order_status'];
          toss_payment_id?: string | null;
          total?: number | null;
          total_delivery_fee?: number | null;
          total_items?: number | null;
          total_price?: number | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          confirmed_at?: string | null;
          created_at?: string | null;
          currency?: Database['public']['Enums']['currency'] | null;
          deleted_at?: string | null;
          id?: string;
          paid_at?: string | null;
          payment_method?: string | null;
          refunded_at?: string | null;
          shipping_info?: Json | null;
          status?: Database['public']['Enums']['order_status'];
          toss_payment_id?: string | null;
          total?: number | null;
          total_delivery_fee?: number | null;
          total_items?: number | null;
          total_price?: number | null;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'orders_user_id_users_id_fk';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      plans: {
        Row: {
          code: string;
          coins_credit: number | null;
          created_at: string | null;
          currency: Database['public']['Enums']['currency'] | null;
          deleted_at: string | null;
          description: string | null;
          metadata: Json | null;
          monthly_price: number | null;
          name: string;
          position: number | null;
          status: Database['public']['Enums']['plan_status'] | null;
          trial_days: number | null;
          updated_at: string | null;
          yearly_price: number | null;
        };
        Insert: {
          code: string;
          coins_credit?: number | null;
          created_at?: string | null;
          currency?: Database['public']['Enums']['currency'] | null;
          deleted_at?: string | null;
          description?: string | null;
          metadata?: Json | null;
          monthly_price?: number | null;
          name: string;
          position?: number | null;
          status?: Database['public']['Enums']['plan_status'] | null;
          trial_days?: number | null;
          updated_at?: string | null;
          yearly_price?: number | null;
        };
        Update: {
          code?: string;
          coins_credit?: number | null;
          created_at?: string | null;
          currency?: Database['public']['Enums']['currency'] | null;
          deleted_at?: string | null;
          description?: string | null;
          metadata?: Json | null;
          monthly_price?: number | null;
          name?: string;
          position?: number | null;
          status?: Database['public']['Enums']['plan_status'] | null;
          trial_days?: number | null;
          updated_at?: string | null;
          yearly_price?: number | null;
        };
        Relationships: [];
      };
      shipping_addresses: {
        Row: {
          address: string;
          created_at: string | null;
          deleted_at: string | null;
          details: Json | null;
          email: string | null;
          id: string;
          is_default: boolean | null;
          note: string | null;
          phone_number: string | null;
          postal_code: string | null;
          receiver_name: string;
          updated_at: string | null;
          user_id: string | null;
        };
        Insert: {
          address: string;
          created_at?: string | null;
          deleted_at?: string | null;
          details?: Json | null;
          email?: string | null;
          id?: string;
          is_default?: boolean | null;
          note?: string | null;
          phone_number?: string | null;
          postal_code?: string | null;
          receiver_name: string;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          address?: string;
          created_at?: string | null;
          deleted_at?: string | null;
          details?: Json | null;
          email?: string | null;
          id?: string;
          is_default?: boolean | null;
          note?: string | null;
          phone_number?: string | null;
          postal_code?: string | null;
          receiver_name?: string;
          updated_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'shipping_addresses_user_id_users_id_fk';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      subscriptions: {
        Row: {
          billing_key: string | null;
          cancelled_at: string | null;
          created_at: string | null;
          cycle: Database['public']['Enums']['billing_cycle'];
          deleted_at: string | null;
          end_at: string | null;
          id: string;
          is_auto_renew: boolean | null;
          is_trial: boolean | null;
          metadata: Json | null;
          plan_code: string;
          start_at: string;
          status: Database['public']['Enums']['subscription_status'] | null;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          billing_key?: string | null;
          cancelled_at?: string | null;
          created_at?: string | null;
          cycle: Database['public']['Enums']['billing_cycle'];
          deleted_at?: string | null;
          end_at?: string | null;
          id?: string;
          is_auto_renew?: boolean | null;
          is_trial?: boolean | null;
          metadata?: Json | null;
          plan_code: string;
          start_at: string;
          status?: Database['public']['Enums']['subscription_status'] | null;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          billing_key?: string | null;
          cancelled_at?: string | null;
          created_at?: string | null;
          cycle?: Database['public']['Enums']['billing_cycle'];
          deleted_at?: string | null;
          end_at?: string | null;
          id?: string;
          is_auto_renew?: boolean | null;
          is_trial?: boolean | null;
          metadata?: Json | null;
          plan_code?: string;
          start_at?: string;
          status?: Database['public']['Enums']['subscription_status'] | null;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'subscriptions_plan_code_plans_code_fk';
            columns: ['plan_code'];
            isOneToOne: false;
            referencedRelation: 'plans';
            referencedColumns: ['code'];
          },
          {
            foreignKeyName: 'subscriptions_user_id_users_id_fk';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      toss_billings: {
        Row: {
          authenticated_at: string | null;
          billing_key: string | null;
          card: Json | null;
          card_company: string | null;
          card_number: string | null;
          created_at: string | null;
          customer_key: string | null;
          deleted_at: string | null;
          id: string;
          method: string | null;
          mid: string | null;
          raw_data: Json | null;
          updated_at: string | null;
        };
        Insert: {
          authenticated_at?: string | null;
          billing_key?: string | null;
          card?: Json | null;
          card_company?: string | null;
          card_number?: string | null;
          created_at?: string | null;
          customer_key?: string | null;
          deleted_at?: string | null;
          id?: string;
          method?: string | null;
          mid?: string | null;
          raw_data?: Json | null;
          updated_at?: string | null;
        };
        Update: {
          authenticated_at?: string | null;
          billing_key?: string | null;
          card?: Json | null;
          card_company?: string | null;
          card_number?: string | null;
          created_at?: string | null;
          customer_key?: string | null;
          deleted_at?: string | null;
          id?: string;
          method?: string | null;
          mid?: string | null;
          raw_data?: Json | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      toss_payments: {
        Row: {
          approved_at: string | null;
          balance_amount: number | null;
          created_at: string | null;
          currency: string | null;
          customer_key: string | null;
          deleted_at: string | null;
          id: string;
          last_transaction_key: string | null;
          metadata: Json | null;
          method: string | null;
          mid: string | null;
          order_id: string | null;
          order_name: string | null;
          payment_key: string | null;
          raw_data: Json | null;
          requested_at: string | null;
          status: string | null;
          total_amount: number | null;
          type: string | null;
          updated_at: string | null;
          vat: number | null;
        };
        Insert: {
          approved_at?: string | null;
          balance_amount?: number | null;
          created_at?: string | null;
          currency?: string | null;
          customer_key?: string | null;
          deleted_at?: string | null;
          id?: string;
          last_transaction_key?: string | null;
          metadata?: Json | null;
          method?: string | null;
          mid?: string | null;
          order_id?: string | null;
          order_name?: string | null;
          payment_key?: string | null;
          raw_data?: Json | null;
          requested_at?: string | null;
          status?: string | null;
          total_amount?: number | null;
          type?: string | null;
          updated_at?: string | null;
          vat?: number | null;
        };
        Update: {
          approved_at?: string | null;
          balance_amount?: number | null;
          created_at?: string | null;
          currency?: string | null;
          customer_key?: string | null;
          deleted_at?: string | null;
          id?: string;
          last_transaction_key?: string | null;
          metadata?: Json | null;
          method?: string | null;
          mid?: string | null;
          order_id?: string | null;
          order_name?: string | null;
          payment_key?: string | null;
          raw_data?: Json | null;
          requested_at?: string | null;
          status?: string | null;
          total_amount?: number | null;
          type?: string | null;
          updated_at?: string | null;
          vat?: number | null;
        };
        Relationships: [];
      };
      transactions: {
        Row: {
          amount: number;
          bonus: number | null;
          content: Database['public']['Enums']['transaction_content'];
          created_at: string | null;
          deleted_at: string | null;
          id: string;
          metadata: Json | null;
          status: Database['public']['Enums']['transaction_status'] | null;
          type: Database['public']['Enums']['transaction_type'] | null;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          amount?: number;
          bonus?: number | null;
          content: Database['public']['Enums']['transaction_content'];
          created_at?: string | null;
          deleted_at?: string | null;
          id?: string;
          metadata?: Json | null;
          status?: Database['public']['Enums']['transaction_status'] | null;
          type?: Database['public']['Enums']['transaction_type'] | null;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          amount?: number;
          bonus?: number | null;
          content?: Database['public']['Enums']['transaction_content'];
          created_at?: string | null;
          deleted_at?: string | null;
          id?: string;
          metadata?: Json | null;
          status?: Database['public']['Enums']['transaction_status'] | null;
          type?: Database['public']['Enums']['transaction_type'] | null;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'transactions_user_id_users_id_fk';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      translations: {
        Row: {
          key: string;
          language_code: string;
          translated_text: string;
        };
        Insert: {
          key: string;
          language_code: string;
          translated_text: string;
        };
        Update: {
          key?: string;
          language_code?: string;
          translated_text?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'translations_language_code_languages_code_fk';
            columns: ['language_code'];
            isOneToOne: false;
            referencedRelation: 'languages';
            referencedColumns: ['code'];
          },
        ];
      };
      users: {
        Row: {
          avatar_id: string | null;
          avatar_key: string | null;
          avatar_url: string | null;
          balance: number | null;
          coins: number | null;
          created_at: string | null;
          current_plan_code: string | null;
          date_of_birth: string | null;
          deleted_at: string | null;
          email: string;
          gender: Database['public']['Enums']['gender'] | null;
          id: string;
          language_code: string | null;
          last_login_at: string | null;
          last_login_provider: string | null;
          metadata: Json | null;
          name: string | null;
          nickname: string | null;
          notification_enabled: boolean | null;
          password: string | null;
          phone: string | null;
          role: Database['public']['Enums']['user_role'] | null;
          updated_at: string | null;
        };
        Insert: {
          avatar_id?: string | null;
          avatar_key?: string | null;
          avatar_url?: string | null;
          balance?: number | null;
          coins?: number | null;
          created_at?: string | null;
          current_plan_code?: string | null;
          date_of_birth?: string | null;
          deleted_at?: string | null;
          email: string;
          gender?: Database['public']['Enums']['gender'] | null;
          id?: string;
          language_code?: string | null;
          last_login_at?: string | null;
          last_login_provider?: string | null;
          metadata?: Json | null;
          name?: string | null;
          nickname?: string | null;
          notification_enabled?: boolean | null;
          password?: string | null;
          phone?: string | null;
          role?: Database['public']['Enums']['user_role'] | null;
          updated_at?: string | null;
        };
        Update: {
          avatar_id?: string | null;
          avatar_key?: string | null;
          avatar_url?: string | null;
          balance?: number | null;
          coins?: number | null;
          created_at?: string | null;
          current_plan_code?: string | null;
          date_of_birth?: string | null;
          deleted_at?: string | null;
          email?: string;
          gender?: Database['public']['Enums']['gender'] | null;
          id?: string;
          language_code?: string | null;
          last_login_at?: string | null;
          last_login_provider?: string | null;
          metadata?: Json | null;
          name?: string | null;
          nickname?: string | null;
          notification_enabled?: boolean | null;
          password?: string | null;
          phone?: string | null;
          role?: Database['public']['Enums']['user_role'] | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'users_avatar_id_medias_id_fk';
            columns: ['avatar_id'];
            isOneToOne: false;
            referencedRelation: 'medias';
            referencedColumns: ['id'];
          },
        ];
      };
      web_push_subscriptions: {
        Row: {
          browser: string | null;
          created_at: string | null;
          deleted_at: string | null;
          device_id: string | null;
          endpoint: string;
          id: string;
          keys: Json;
          platform: string | null;
          updated_at: string | null;
          user_agent: string | null;
          user_id: string | null;
        };
        Insert: {
          browser?: string | null;
          created_at?: string | null;
          deleted_at?: string | null;
          device_id?: string | null;
          endpoint: string;
          id?: string;
          keys: Json;
          platform?: string | null;
          updated_at?: string | null;
          user_agent?: string | null;
          user_id?: string | null;
        };
        Update: {
          browser?: string | null;
          created_at?: string | null;
          deleted_at?: string | null;
          device_id?: string | null;
          endpoint?: string;
          id?: string;
          keys?: Json;
          platform?: string | null;
          updated_at?: string | null;
          user_agent?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'web_push_subscriptions_user_id_users_id_fk';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      work_categories: {
        Row: {
          category_id: string;
          work_id: string;
        };
        Insert: {
          category_id: string;
          work_id: string;
        };
        Update: {
          category_id?: string;
          work_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'work_categories_category_id_categories_id_fk';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'categories';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'work_categories_work_id_works_id_fk';
            columns: ['work_id'];
            isOneToOne: false;
            referencedRelation: 'works';
            referencedColumns: ['id'];
          },
        ];
      };
      work_likes: {
        Row: {
          user_id: string;
          work_id: string;
        };
        Insert: {
          user_id: string;
          work_id: string;
        };
        Update: {
          user_id?: string;
          work_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'work_likes_user_id_users_id_fk';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'work_likes_work_id_works_id_fk';
            columns: ['work_id'];
            isOneToOne: false;
            referencedRelation: 'works';
            referencedColumns: ['id'];
          },
        ];
      };
      work_medias: {
        Row: {
          media_id: string;
          work_id: string;
        };
        Insert: {
          media_id: string;
          work_id: string;
        };
        Update: {
          media_id?: string;
          work_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'work_medias_media_id_medias_id_fk';
            columns: ['media_id'];
            isOneToOne: false;
            referencedRelation: 'medias';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'work_medias_work_id_works_id_fk';
            columns: ['work_id'];
            isOneToOne: false;
            referencedRelation: 'works';
            referencedColumns: ['id'];
          },
        ];
      };
      work_storage_objects: {
        Row: {
          key: string;
          work_id: string;
        };
        Insert: {
          key: string;
          work_id: string;
        };
        Update: {
          key?: string;
          work_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'work_storage_objects_work_id_works_id_fk';
            columns: ['work_id'];
            isOneToOne: false;
            referencedRelation: 'works';
            referencedColumns: ['id'];
          },
        ];
      };
      works: {
        Row: {
          bundle_id: string | null;
          characters_map_id: string | null;
          characters_map_key: string | null;
          content_media_key: string | null;
          created_at: string | null;
          currency: Database['public']['Enums']['currency'] | null;
          deleted_at: string | null;
          description: string | null;
          id: string;
          price: number;
          release_date: string | null;
          status: Database['public']['Enums']['work_status'] | null;
          tags: string[] | null;
          thumbnail_id: string | null;
          thumbnail_key: string | null;
          title: string | null;
          universe_id: string | null;
          updated_at: string | null;
        };
        Insert: {
          bundle_id?: string | null;
          characters_map_id?: string | null;
          characters_map_key?: string | null;
          content_media_key?: string | null;
          created_at?: string | null;
          currency?: Database['public']['Enums']['currency'] | null;
          deleted_at?: string | null;
          description?: string | null;
          id?: string;
          price?: number;
          release_date?: string | null;
          status?: Database['public']['Enums']['work_status'] | null;
          tags?: string[] | null;
          thumbnail_id?: string | null;
          thumbnail_key?: string | null;
          title?: string | null;
          universe_id?: string | null;
          updated_at?: string | null;
        };
        Update: {
          bundle_id?: string | null;
          characters_map_id?: string | null;
          characters_map_key?: string | null;
          content_media_key?: string | null;
          created_at?: string | null;
          currency?: Database['public']['Enums']['currency'] | null;
          deleted_at?: string | null;
          description?: string | null;
          id?: string;
          price?: number;
          release_date?: string | null;
          status?: Database['public']['Enums']['work_status'] | null;
          tags?: string[] | null;
          thumbnail_id?: string | null;
          thumbnail_key?: string | null;
          title?: string | null;
          universe_id?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'works_characters_map_id_medias_id_fk';
            columns: ['characters_map_id'];
            isOneToOne: false;
            referencedRelation: 'medias';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'works_thumbnail_id_medias_id_fk';
            columns: ['thumbnail_id'];
            isOneToOne: false;
            referencedRelation: 'medias';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      items: {
        Row: {
          created_at: string | null;
          currency: Database['public']['Enums']['currency'] | null;
          delivery_fee: number | null;
          description: string | null;
          free_shipping_threshold: number | null;
          id: string | null;
          item_type: string | null;
          price: number | null;
          quantity: number | null;
          raw_id: string | null;
          thumbnail_key: string | null;
          title: string | null;
          updated_at: string | null;
        };
        Relationships: [];
      };
      storage_objects: {
        Row: {
          bucket_id: string | null;
          created_at: string | null;
          id: string | null;
          key: string | null;
          last_accessed_at: string | null;
          level: number | null;
          metadata: Json | null;
          owner: string | null;
          owner_id: string | null;
          path_tokens: string[] | null;
          updated_at: string | null;
          user_metadata: Json | null;
          version: string | null;
        };
        Insert: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string | null;
          key?: string | null;
          last_accessed_at?: string | null;
          level?: number | null;
          metadata?: Json | null;
          owner?: string | null;
          owner_id?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          user_metadata?: Json | null;
          version?: string | null;
        };
        Update: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string | null;
          key?: string | null;
          last_accessed_at?: string | null;
          level?: number | null;
          metadata?: Json | null;
          owner?: string | null;
          owner_id?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          user_metadata?: Json | null;
          version?: string | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      is_admin: {
        Args: { uid: string };
        Returns: boolean;
      };
      is_sys_admin: {
        Args: { uid: string };
        Returns: boolean;
      };
      update_subscription_status: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
      update_user_current_plan_code: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
    };
    Enums: {
      announcement_status: 'draft' | 'published' | 'archived';
      billing_cycle: 'monthly' | 'yearly';
      category_type: 'work' | 'good';
      chapter_action_type: 'pin' | 'bookmark';
      chat_room_type: 'general' | 'chapter';
      coin_package_status: 'active' | 'inactive';
      currency: 'coins' | 'krw' | 'usd' | 'eur' | 'jpy' | 'cny';
      faq_status: 'draft' | 'published' | 'archived';
      gender: 'unknown' | 'male' | 'female';
      good_status: 'draft' | 'published' | 'archived';
      notification_os: 'ios' | 'android' | 'web';
      notification_type: 'new_message' | 'event' | 'chapter_published';
      order_item_type: 'chapter' | 'good' | 'work' | 'episode';
      order_status:
        | 'pending'
        | 'confirmed'
        | 'paid'
        | 'refunded'
        | 'cancelled'
        | 'payment_failed';
      plan_status: 'active' | 'inactive';
      shipping_provider: 'modive' | 'external';
      subscription_status: 'active' | 'cancelled' | 'expired';
      transaction_content:
        | 'subscription_payment'
        | 'regular_charge'
        | 'goods_purchase'
        | 'work_purchase';
      transaction_status: 'pending' | 'completed' | 'failed';
      transaction_type: 'payment' | 'purchase';
      user_role: 'user' | 'admin';
      work_status: 'draft' | 'published' | 'archived';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  'public'
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      announcement_status: ['draft', 'published', 'archived'],
      billing_cycle: ['monthly', 'yearly'],
      category_type: ['work', 'good'],
      chapter_action_type: ['pin', 'bookmark'],
      chat_room_type: ['general', 'chapter'],
      coin_package_status: ['active', 'inactive'],
      currency: ['coins', 'krw', 'usd', 'eur', 'jpy', 'cny'],
      faq_status: ['draft', 'published', 'archived'],
      gender: ['unknown', 'male', 'female'],
      good_status: ['draft', 'published', 'archived'],
      notification_os: ['ios', 'android', 'web'],
      notification_type: ['new_message', 'event', 'chapter_published'],
      order_item_type: ['chapter', 'good', 'work', 'episode'],
      order_status: [
        'pending',
        'confirmed',
        'paid',
        'refunded',
        'cancelled',
        'payment_failed',
      ],
      plan_status: ['active', 'inactive'],
      shipping_provider: ['modive', 'external'],
      subscription_status: ['active', 'cancelled', 'expired'],
      transaction_content: [
        'subscription_payment',
        'regular_charge',
        'goods_purchase',
        'work_purchase',
      ],
      transaction_status: ['pending', 'completed', 'failed'],
      transaction_type: ['payment', 'purchase'],
      user_role: ['user', 'admin'],
      work_status: ['draft', 'published', 'archived'],
    },
  },
} as const;
