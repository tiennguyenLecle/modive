export enum CategoryGroup {
  WORK = 'work',
  GOOD = 'good',
}

export type CategoryType = {
  id: string;
  type: CategoryGroup;
  title: string;
  position: number;
  parent_id?: string;
  created_at?: string;
  deleted_at?: string;
  updated_at?: string;
  description: string;
};
