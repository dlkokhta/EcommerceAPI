import { Request, Response } from "express";
import userRegistrationModel from "models/userRegistrationModel";
import CryptoJS from "crypto-js";
import { otpHeader } from "../email/edge";

const GenerateOTP = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    console.log("email recieved", email);

    const findUser = await userRegistrationModel.findOne({ email: email });

    console.log("findUser", findUser);

    if (!findUser) {
      return res.status(400).send({ message: "Email not found" });
    }

    const otp = CryptoJS.lib.WordArray.random(6).toString(CryptoJS.enc.Hex);
    console.log("typeof otp", typeof otp);
    findUser.otp = otp;
    await findUser.save();

    await otpHeader(
      findUser.email,
      findUser.name,
      `Your new password is: ${otp}`
    );
  } catch (error) {
    return res.status(401).json(error);
  }
};

export default GenerateOTP;
