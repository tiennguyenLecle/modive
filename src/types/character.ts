export enum GenderType {
  MALE = 'male',
  FEMALE = 'female',
  UNKNOWN = 'unknown',
}

export type CharacterType = {
  id: string;
  age: number;
  name: string;
  quote?: string;
  bot_id: string;
  gender: GenderType;
  work_id: string;
  metadata: string;
  avatar_id: string;
  full_name: string;
  avatar_key: string;
  created_at?: string;
  deleted_at?: string;
  occupation?: string;
  updated_at?: string;
  nationality: string;
  total_likes: number;
  introduction: string;
  date_of_birth?: string;
  place_of_birth?: string;
};
