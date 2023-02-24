import express from "express";
import Controller from "../controllers/admin.controller";
import { isLogged } from "../../../main/middlewares/is-logged";
const orderRouter = express.Router();

const orderController = new Controller();

orderRouter.get(`/orders`, orderController.findAll); // return all orders
orderRouter.get(`/order/:id`, orderController.find); // return a order
orderRouter.post(`/order`, orderController.create); // create a order
orderRouter.put(`/order/:id`, orderController.update); // update a order
orderRouter.delete(`/order/:id`, orderController.delete); // delete a order
orderRouter.put(`/order/undelete/:id`, orderController.undelete); // undelete a order

export default orderRouter;
