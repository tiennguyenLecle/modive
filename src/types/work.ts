import { CategoryType } from './category';
import { CharacterType } from './character';

export type WorkType = {
  id: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
  title: string;
  thumbnail_id?: string;
  description: string;
  release_date: string;
  tags: string[];
  characters_map_id?: string;
  thumbnail_key?: string;
  characters_map_key?: string;
  universe_id?: string;
  status: string;
  bundle_id?: string;
  storage_objects: { key: string }[];
  characters: CharacterType[];
  categories: CategoryType[];
};
