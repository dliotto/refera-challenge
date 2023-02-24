import Model from "../model/admin.model";
import { Request, Response } from "express";
import { Orders, Order } from "../types/order.interface";

const orderModel = new Model();

class Controller {
  findAll = async (req: Request, res: Response) => {
    try {
      const orders: Orders = await orderModel.findAll();

      res.status(200).send(orders);
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
      const order: Order = await orderModel.find(id);

      if (order) {
        return res.status(200).send(order);
      }

      res.status(404).send({ msg: "order not found" });
    } catch (e) {
      res.status(500).send({ msg: e.message });
    }
  };

  create = async (req: Request, res: Response) => {
    const obj: Order = {
      name: req.body.name,
      cellphone: req.body.cellphone,
      agency: req.body.agency,
      company: req.body.company,
      description: req.body.description,
      id_category: req.body.id_category,
      dt_deadline: req.body.dt_deadline,
      user_created: "1",
    };

    if (!obj.name) {
      return res.status(404).send({ msg: "Name not found" });
    }

    if (!obj.cellphone) {
      return res.status(404).send({ msg: "Cellphone not found" });
    }

    if (!obj.agency) {
      return res.status(404).send({ msg: "Agency not found" });
    }

    if (!obj.company) {
      return res.status(404).send({ msg: "Company not found" });
    }

    if (!obj.description) {
      return res.status(404).send({ msg: "description not found" });
    }

    if (!obj.id_category) {
      return res.status(404).send({ msg: "Category not found" });
    }

    if (!obj.dt_deadline) {
      return res.status(404).send({ msg: "Deadline not found" });
    }

    try {
      const order: Order = await orderModel.create(obj);

      if (order) {
        return res.status(200).send(order);
      }

      res.status(404).send({ msg: "order insert not found" });
    } catch (e) {
      res.status(500).send({ msg: e.message });
    }
  };

  update = async (req: Request, res: Response) => {
    const obj: Order = {
      id: parseInt(req.params.id),
      name: req.body.name,
      cellphone: req.body.cellphone,
      agency: req.body.agency,
      company: req.body.company,
      description: req.body.description,
      id_category: req.body.id_category,
      dt_deadline: req.body.dt_deadline,
      user_updated: "1",
    };

    if (!obj.name) {
      return res.status(404).send({ msg: "Name not found" });
    }

    if (!obj.cellphone) {
      return res.status(404).send({ msg: "Cellphone not found" });
    }

    if (!obj.agency) {
      return res.status(404).send({ msg: "Agency not found" });
    }

    if (!obj.company) {
      return res.status(404).send({ msg: "Company not found" });
    }

    if (!obj.description) {
      return res.status(404).send({ msg: "description not found" });
    }

    if (!obj.id_category) {
      return res.status(404).send({ msg: "Category not found" });
    }

    if (!obj.dt_deadline) {
      return res.status(404).send({ msg: "Deadline not found" });
    }

    try {
      const order: Order = await orderModel.update(obj);

      if (order) {
        return res.status(200).send(order);
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
      const order: Order = await orderModel.delete(obj);

      if (order) {
        return res.status(200).send(order);
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
      const order: Order = await orderModel.undelete(obj);

      if (order) {
        return res.status(200).send(order);
      }

      res.status(404).send({ msg: "order delete not found" });
    } catch (e) {
      res.status(500).send({ msg: e.message });
    }
  };
}

export default Controller;
