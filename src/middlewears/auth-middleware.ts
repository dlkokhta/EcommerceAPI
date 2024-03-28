import jwt from "jsonwebtoken";
import { Request, Response } from "express";

const verifyToken = (req: Request, res: Response, next: any) => {
  const { authorization } = req.headers;
  console.log("authorization!!!!!", authorization);

  if (!authorization) {
    return res.status(401).json({ error: "Authorization header missing" });
  }

  let token = authorization.split(" ")[1];
  console.log("token", token);

  if (!token) {
    return res.status(401).json({ error: "Token missing" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET!);
    if (verified) {
      console.log("verifiesUser!!!");

      next();
    }
  } catch (error) {
    return res.status(401).json(error);
  }
};

export default verifyToken;
