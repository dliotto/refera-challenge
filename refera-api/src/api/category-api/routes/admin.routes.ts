import express from "express";
import Controller from "../controllers/admin.controller";
import { isLogged } from "../../../main/middlewares/is-logged";
const categoryRouter = express.Router();

const categoryController = new Controller();

categoryRouter.get(`/categories`, categoryController.findAll); // return all categories
categoryRouter.get(`/category/:id`, categoryController.find); // return a category
categoryRouter.post(`/category`, categoryController.create); // create a category
categoryRouter.put(`/category/:id`, categoryController.update); // update a category
categoryRouter.delete(`/category/:id`, categoryController.delete); // delete a category
categoryRouter.put(`/category/undelete/:id`, categoryController.undelete); // undelete a category

export default categoryRouter;
