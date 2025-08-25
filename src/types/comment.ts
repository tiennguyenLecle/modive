import { MetadataType } from '@/types/metadata';
import { UserType } from '@/types/user';

export type CommentType = {
  _loading?: boolean;
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  work_id: string;
  user_id: string;
  content: string;
  work: {
    id: string;
  };
  user: Pick<UserType, 'id' | 'name' | 'role' | 'nickname' | 'avatar_key'>;
  total_likes: number;
  is_liked: boolean;
};

export type CommentsResponseType = {
  data: CommentType[];
  metadata: MetadataType;
};
