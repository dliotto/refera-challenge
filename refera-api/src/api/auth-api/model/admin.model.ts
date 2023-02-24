import Connection from "../../../main/configs/db/db";
import { Login } from "../types/login.interface";
import jwt from "jsonwebtoken";
import { hashPassword, comparePassword } from "../../../main/configs/bcrypt";

const sqlHelper = new Connection();

class Module {
  login = async (email: string, password: string): Promise<Login> => {
    const sql = `SELECT id, email, password, id_company FROM public.user WHERE email = $1`;
    const binds = [email];
    const login = await sqlHelper.execute(sql, binds);
    const error: string = "";

    if (login.results[0]) {
      const compare = await comparePassword(
        password,
        login.results[0].password
      );

      if (!compare) {
        return { auth: false, error: "Password not found" };
      }

      const id_company = login.results[0].id_company;
      const id = login.results[0].id;
      const token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 100,
      });

      return { auth: true, token: token, id, id_company };
    } else {
      return { auth: false, error: "E-mail not found" };
    }
  };

  login_gruppe = async (email: string, password: string): Promise<Login> => {
    const sql = `SELECT id, email, password FROM public.user WHERE email = $1`;
    const binds = [email];
    const login = await sqlHelper.execute(sql, binds);
    const error: string = "";

    if (login.results[0]) {
      const compare = await comparePassword(
        password,
        login.results[0].password
      );

      if (!compare) {
        return { auth: false, error: "Password not found" };
      }

      const id = login.results[0].id;
      const token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 100,
      });

      return { auth: true, token: token, id };
    } else {
      return { auth: false, error: "E-mail not found" };
    }
  };
}

export default Module;
