import userRegistrationModel from "models/userRegistrationModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userLoginController = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    const user = await userRegistrationModel
      .findOne({ email: userData.email })
      .select("+password");

    if (!user) {
      return res.status(401).json("user with this email did not fined");
    }

    const isPasswordCorrect = await bcrypt.compare(
      userData.password,
      user.password
    );

    if (isPasswordCorrect) {
      const signData = {
        email: user.email,
        userId: user.id,
      };

      const token = jwt.sign(signData, process.env.JWT_SECRET!);

      return res.status(200).json({ ...signData, token });
    }
  } catch (error) {
    return res.status(401).json(error);
  }
};

export default userLoginController;
