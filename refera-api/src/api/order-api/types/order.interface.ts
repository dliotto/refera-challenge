export interface Order {
  id?: number;
  name?: string;
  cellphone?: string;
  agency?: string;
  company?: string;
  description?: string;
  id_category?: number;
  dt_deadline?: Date;
  dt_created?: Date;
  user_created?: string;
  dt_updated?: Date;
  user_updated?: string;
  dt_deleted?: Date;
  user_deleted?: string;
}

export interface Orders {
  [key: number]: Order;
}
