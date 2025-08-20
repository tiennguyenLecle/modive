import { CharacterType } from './character';
import { WorkType } from './work';

export type ChatRoomType = {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  name?: string;
  type: 'general' | string;
  session_id: string;
  universe_id?: string;
  theme_id?: string;
  chapter_id?: string;
  user_id: string;
  last_message: string;
  last_accessed_at?: string;
  is_pinned: boolean;
  intimacy: number;
  progress: number;
  theme_key?: string;
  character_id: string;
  work_id: string;
  pinned_at?: string;
  room_id: string;
  metadata: Record<string, any>;
  work: Pick<WorkType, 'bundle_id' | 'universe_id'>;
  character: Pick<CharacterType, 'avatar_key' | 'bot_id' | 'id' | 'name'>;
};
