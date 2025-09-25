import { Database } from './supabase';

export enum GoodStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

export type GoodType = Database['public']['Tables']['goods']['Row'];

export type GoodPlusType = GoodType & {
  is_liked: boolean;
  thumbnail_storage_objects: [{ key: string; type: 'thumbnail' }];
  detail_storage_objects: [{ key: string; type: 'detail' }];
};
