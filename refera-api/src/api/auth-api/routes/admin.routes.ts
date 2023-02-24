import express from "express";
import Controller from "../controllers/admin.controller";

const loginRouter = express.Router();

const loginController = new Controller();

loginRouter.post(`/login`, loginController.login); // return a company
loginRouter.post(`/logout`, loginController.logout);

export default loginRouter;
