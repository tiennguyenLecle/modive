import { WorkType } from './work';

export type InterfaceType = {
  data: {
    id: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
    banner_key?: string;
    blocks: {
      title: string;
      sub_blocks: {
        work_id: WorkType['id'];
        work: WorkType;
      }[];
    }[];
  };
};
