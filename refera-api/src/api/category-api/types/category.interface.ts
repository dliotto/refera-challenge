export interface Category {
  id?: number;
  name?: string;
  dt_created?: Date;
  user_created?: string;
  dt_updated?: Date;
  user_updated?: string;
  dt_deleted?: Date;
  user_deleted?: string;
}

export interface Categories {
  [key: number]: Category;
}
