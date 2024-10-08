import userRegistrationModel from "models/userRegistrationModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userLoginSchema from "schemas/userLoginSchema";
import { userLoginTypes } from "types/userLoginTypes";

const userLoginController = async (req: Request, res: Response) => {
  try {
    const userData: userLoginTypes = req.body;
    // console.log("userDataa", userData);
    const { error } = userLoginSchema.validate(userData);

    if (error) {
      return res.status(401).json("Email or password is incorrect.");
    }
    console.log("isPasswordCorrect");
    const user = await userRegistrationModel
      .findOne({ email: userData.email })
      .select("+password");

    if (!user) {
      return res.status(401).json("Email or password is incorrect.");
    }

    const isPasswordCorrect = await bcrypt.compare(
      userData.password,
      user.password
    );

    const signData = {
      email: user.email,
      userId: user.id,
    };

    if (!isPasswordCorrect || !user)
      return res.status(401).json("Email or password is incorrect.");

    const token = jwt.sign(signData, process.env.JWT_SECRET!);
    const adminToken = jwt.sign(signData, process.env.JWT_SECRET_ADMIN!);

    if (user.role === "admin") {
      return res
        .status(200)
        .json({ ...signData, adminToken, name: user.name, role: user.role });
    } else {
      return res.status(200).json({ ...signData, token, name: user.name });
    }
  } catch (error) {
    return res.status(401).json(error);
  }
};

export default userLoginController;
