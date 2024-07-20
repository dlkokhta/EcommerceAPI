import userRegistrationModel from "models/userRegistrationModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import userRegistrationSchema from "schemas/userRegistrationSchema";
import { newUserTypes } from "types/newUserTypes";
// import CryptoJS from "crypto-js";

const userRegistrationController = async (req: Request, res: Response) => {
  // const randomString = CryptoJS.lib.WordArray.random(32).toString(
  //   CryptoJS.enc.Hex
  // );
  try {
    const userData: newUserTypes = req.body;
    const validator = await userRegistrationSchema(userData);

    const { value, error } = validator.validate(userData);

    if (error) {
      return res.status(400).send("Email already exist");
    }

    const { name, email, role } = value;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const newUser = new userRegistrationModel({
      name: name,
      email: email,
      password: hashedPassword,
      role,
    });
    newUser.save();

    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(401).json(error);
  }
};

export default userRegistrationController;
