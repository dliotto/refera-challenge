export interface ReturnDB {
  type: string;
  code: number;
  title: string;
  sql: string;
  binds: Array<String | Number | Date>;
  command: string;
  length: number;
  results: Array<any>;
}
