export enum AnnouncementStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

export type AnnouncementRecord = {
  id: string;
  title: string;
  content: string;
  publication_date: string;
  expiration_date: string;
  status: AnnouncementStatus;
  created_at: string;
  updated_at: string;
};
