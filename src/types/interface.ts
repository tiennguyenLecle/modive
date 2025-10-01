import { CategoryType } from './category';
import { CharacterType } from './character';
import { WorkType } from './work';

export type InterfaceType = {
  id: string;
  banner_key: string | null;
  blocks: Array<{
    title: string;
    sub_blocks: Array<{
      work_id: string;
      work: {
        id: string;
        title: string;
        description: string | null;
        price: number;
        currency: string; // e.g. "krw"
        status: 'published' | 'draft' | string;
        tags: string[];
        categories: Array<CategoryType>;
        characters: Array<CharacterType>;
        release_date: string | null; // ISO
        thumbnail_key: string | null;
        storage_objects?: Array<{ key: string }>;
        characters_map_key?: string | null;
        content_media_key?: string | null;
      };
    }>;
  }>;
  banner_storage_objects: Array<{
    interface_id: string;
    key: string;
    type: 'banner';
    url: string;
  }>;
  created_at: string; // ISO
  updated_at: string; // ISO
  deleted_at: string | null;
};
