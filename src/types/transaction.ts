export type Transaction = {
  id: string; // uuid
  created_at: string | null; // ISO timestamp
  updated_at: string | null; // ISO timestamp
  deleted_at: string | null; // ISO timestamp
  user_id: string; // uuid (FK to users.id)
  amount: number; // numeric
  content: string | null;
  metadata: Record<string, any>; // jsonb
  type: string | null; // varchar(255)
  bonus: number | null; // numeric
};
