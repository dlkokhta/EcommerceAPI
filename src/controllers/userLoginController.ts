import userRegistrationModel from "models/userRegistrationModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userLoginSchema from "schemas/userLoginSchema";

const userLoginController = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    // console.log("userData", userData);

    const { error } = userLoginSchema.validate(userData);

    // if (error) {
    //   console.log("error1", error?.details[0].message);
    // }

    if (error) return res.status(401).json(error.details[0].message);

    const user = await userRegistrationModel
      .findOne({ email: userData.email })
      .select("+password");

    if (!user) {
      return res.status(401).json("email or password is wrong");
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
      return res.status(401).json("email or password is wrong");

    const token = jwt.sign(signData, process.env.JWT_SECRET!);

    return res.status(200).json({ ...signData, token, name: user.name });
  } catch (error) {
    return res.status(401).json(error);
  }
};

export default userLoginController;
