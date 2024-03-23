import userRegistrationModel from "models/userRegistrationModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

const userRegistrationController = async (req: Request, res: Response) => {
  const { name, email, password, repeatPassword } = req.body;

  if (password !== repeatPassword) {
    return res.status(401).json("passwords do not match");
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userRegistrationModel({
      name,
      email,
      password: hashedPassword,
    });
    newUser.save();
    return res.status(201).json("user registered succesfully");
  } catch (error) {
    return res.status(401).json(error);
  }
};

export default userRegistrationController;
