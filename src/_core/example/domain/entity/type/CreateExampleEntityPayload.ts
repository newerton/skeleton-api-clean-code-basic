export type CreateExampleEntityPayload = {
  name: string;
  password: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
};
