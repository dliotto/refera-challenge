import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export const isLogged = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).json({ auth: false, message: "No token provided." });

  jwt.verify(token.toString(), process.env.SECRET, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .json({ auth: false, message: "Failed to authenticate token." });

    //req.userId = decoded.id;
    next();
  });
};
