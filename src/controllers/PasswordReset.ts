import userRegistrationModel from "models/userRegistrationModel";
import bcrypt from "bcrypt";

import { Request, Response } from "express";
const PasswordReset = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const findUser = await userRegistrationModel.findOne({ email: email });

    if (!findUser) {
      return res.status(400).json({ message: "Email not found" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    findUser.password = hashedPassword;

    await findUser.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred while updating the password" });
  }
};

export default PasswordReset;
