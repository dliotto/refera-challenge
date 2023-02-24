import Model from "../model/admin.model";
import { Request, Response } from "express";
import { Login } from "../types/login.interface";

const loginModel = new Model();

class Controller {
  login = async (req: Request, res: Response) => {
    const email: string = req.body.email;
    const password: string = req.body.password;

    if (!email) {
      return res.status(404).send({ msg: "E-mail not found" });
    }

    if (!password) {
      return res.status(404).send({ msg: "Password not found" });
    }

    try {
      const login: Login = await loginModel.login(email, password);

      if (login.auth) {
        //req.sessionStore.user = login;
        return res.status(200).send(login);
      } else {
        return res.status(404).send({ msg: login.error });
      }

      return res.status(404).send({ msg: "Login not found" });
    } catch (e) {
      return res.status(500).send({ msg: e.message });
    }
  };

  logout = async (req: Request, res: Response) => {
    try {
      res.status(404).send({ msg: "Login not found" });
    } catch (e) {
      res.status(500).send({ msg: e.message });
    }
  };
}

export default Controller;
