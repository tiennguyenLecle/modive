import { Database } from './supabase';

export enum GoodStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

export type GoodType = Database['public']['Tables']['goods']['Row'];
