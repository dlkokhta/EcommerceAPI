import userRegistrationModel from "models/userRegistrationModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import userRegistrationSchema from "schemas/userRegistrationSchema";

const userRegistrationController = async (req: Request, res: Response) => {
  const { body } = req;

  if (body.password !== body.repeatPassword) {
    return res.status(401).json("passwords do not match");
  }

  try {
    const validator = await userRegistrationSchema(body);

    const { value, error } = validator.validate(body);

    if (error) {
      return res.status(401).json(error.details);
    }

    const { name, email } = value;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

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
