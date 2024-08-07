import jwt from "jsonwebtoken";
import { Request, Response } from "express";

const adminVerifyToken = (req: Request, res: Response, next: any) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization header missing" });
  }

  let token = authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token missing" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET_ADMIN!);
    if (verified) {
      console.log("verifiesUser!!!");
      next();
    }
  } catch (error) {
    return res.status(401).json(error);
  }
};

export default adminVerifyToken;
