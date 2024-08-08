import { Request, Response, NextFunction } from "express";
import userRegistrationModel from "../models/userRegistrationModel";

const checkEmailVerified = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userEmail = req.body["email"] as string;

  const user = await userRegistrationModel.findOne({ email: userEmail });

  if (user?.userVerified) {
    next();
  } else {
    res.status(403).json({ message: "Please verify your email to login" });
  }
};

export default checkEmailVerified;
