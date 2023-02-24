import Model from "../model/admin.model";
import { Request, Response } from "express";
import { Categories, Category } from "../types/category.interface";

const orderModel = new Model();

class Controller {
  findAll = async (req: Request, res: Response) => {
    try {
      const categories: Categories = await orderModel.findAll();

      res.status(200).send(categories);
    } catch (e) {
      res.status(500).send({ msg: e.message });
    }
  };

  find = async (req: Request, res: Response) => {
    const id: string = req.params.id;

    if (!id) {
      return res.status(500).send({ msg: "Id not found" });
    }

    try {
      const category: Category = await orderModel.find(id);

      if (category) {
        return res.status(200).send(category);
      }

      res.status(404).send({ msg: "order not found" });
    } catch (e) {
      res.status(500).send({ msg: e.message });
    }
  };

  create = async (req: Request, res: Response) => {
    const obj: Category = {
      name: req.body.name,
      user_created: "1",
    };

    if (!obj.name) {
      return res.status(404).send({ msg: "Name not found" });
    }

    try {
      const category: Category = await orderModel.create(obj);

      if (category) {
        return res.status(200).send(category);
      }

      res.status(404).send({ msg: "order insert not found" });
    } catch (e) {
      res.status(500).send({ msg: e.message });
    }
  };

  update = async (req: Request, res: Response) => {
    const obj: Category = {
      id: parseInt(req.params.id),
      name: req.body.name,
      user_updated: "1",
    };

    if (!obj.name) {
      return res.status(404).send({ msg: "Name not found" });
    }

    try {
      const category: Category = await orderModel.update(obj);

      if (category) {
        return res.status(200).send(category);
      }

      res.status(404).send({ msg: "order update not found" });
    } catch (e) {
      res.status(500).send(e.message);
    }
  };

  delete = async (req: Request, res: Response) => {
    const obj: any = {
      id: req.params.id,
      user_deleted: "1",
    };

    if (!obj.id) {
      return res.status(404).send({ msg: "ID not found" });
    }

    try {
      const category: Category = await orderModel.delete(obj);

      if (category) {
        return res.status(200).send(category);
      }

      res.status(404).send({ msg: "order delete not found" });
    } catch (e) {
      res.status(500).send({ msg: e.message });
    }
  };

  undelete = async (req: Request, res: Response) => {
    const obj: any = {
      id: req.params.id,
      user_updated: "1",
    };

    if (!obj.id) {
      return res.status(404).send({ msg: "ID not found" });
    }

    try {
      const category: Category = await orderModel.undelete(obj);

      if (category) {
        return res.status(200).send(category);
      }

      res.status(404).send({ msg: "order delete not found" });
    } catch (e) {
      res.status(500).send({ msg: e.message });
    }
  };
}

export default Controller;
