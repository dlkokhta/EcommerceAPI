import { Request, Response } from "express";
import userRegistrationModel from "../models/userRegistrationModel";
import userverifyModel from "../models/userVerifyModel";

const verifyUserController = async (req: Request, res: Response) => {
  try {
    const { param } = req.body;

    const verificationRecord = await userverifyModel.findOne({
      randomString: param,
    });

    if (verificationRecord) {
      const email = verificationRecord.email;
      const updateResult = await userRegistrationModel.updateOne(
        { email },
        { $set: { userVerified: true } }
      );

      await userverifyModel.deleteOne({ email });

      res.send({ message: "User verification status updated to true" });
    } else {
      res.status(400).send({ error: "Invalid verification key" });
    }
  } catch (error) {
    return res.status(401).json(error);
  }
};

export default verifyUserController;
