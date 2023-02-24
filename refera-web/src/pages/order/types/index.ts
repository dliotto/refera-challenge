export interface OrderType {
  id?: number;
  category: string;
  cellphone: string;
  agency: string;
  company: string;
  description: string;
  id_category: number;
  name: string;
  dt_deadline: string;
}

export interface CategoryType {
  id: number;
  name: string;
}
