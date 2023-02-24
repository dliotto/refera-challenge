export interface BaseLogin {
  name?: string;
  email?: string;
  id_company?: string;
}

export interface Login extends BaseLogin {
  id?: string;
  password?: string;
  auth?: boolean;
  token?: string;
  error?: string;
}
